---
date: 2026-04-28
authors: amiller
title: 🧠 Minimal Downtime Postgres Migration Using Logical Replication (with Scripts)
description: >-
  How to migrate a large Postgres database with minimal downtime using logical replication, pgcopydb, and a staged cutover. Includes complete scripts for migrate, monitor, and cutover.
---

# Minimal Downtime Postgres Migration Using Logical Replication (with Scripts)

If you have a large Postgres database and need to migrate it to a new host - whether that's Fly.io to AWS RDS, self-hosted to managed, or any provider-to-provider move - a simple dump-and-restore will take your app offline for hours. For PagerTree, that amount of downtime was not acceptable. Instead, I used Postgres's built-in logical replication to stream data continuously from the old database to the new one while the app stayed live. This approach allowed me to keep downtime to about 10 minutes - just long enough to stop the app, verify replication is caught up, reset sequences, and point the app at the new database.

<!-- truncate -->

This post walks through the approach I used to migrate a production Postgres database with about 10 minutes of actual downtime: logical replication for continuous streaming, a monitored catch-up phase, and a clean cutover procedure. I'm using a Fly.io → AWS RDS migration as the concrete example, but every technique here works between any two Postgres instances - as long as both sides support it (more on that below).

---

## The Strategy: Logical Replication + Staged Cutover

The core idea is simple:

1. **Copy the schema** to the destination up front.
2. **Set up logical replication** from source to destination - Postgres streams every write in real time.
3. **Let replication catch up** while your app is still running normally on the source.
4. **Stop the app**, wait for replication lag to hit zero, then **cut over** by pointing your app at the new database.

Total downtime = however long it takes to stop your app processes, verify lag is zero, reset sequences, migrate Redis, and redeploy. Done cleanly, this is well under 10 minutes. My actual downtime was about 10 minutes - more on that at the end.

---

## Prerequisites

You'll need these tools installed and accessible:

- [`pgcopydb`](https://pgcopydb.readthedocs.io/) - for sequence sync and schema comparison
- `psql` / `pg_dump` - standard Postgres CLI tools
- [`riot` (via Docker)](https://github.com/redis/riot) - for Redis replication (only if you use Redis)
- Access to both source and destination databases

You'll also need logical replication enabled on your **source** Postgres:

```sql
-- Check these settings on source
SHOW wal_level;           -- should be 'logical'
SHOW max_replication_slots;
SHOW max_wal_senders;
```

If `wal_level` isn't `logical`, you'll need to reconfigure your source DB and restart Postgres before proceeding. Most managed providers enable this on the source side by default. Self-hosted instances may need `wal_level = logical` set in `postgresql.conf`.

### Does your destination provider support this?

This is the most important thing to verify before you start. Creating a logical replication subscription requires superuser or `pg_create_subscription` privileges on the **destination** - and many managed providers don't grant these.

| Provider | Subscriber support |
|---|---|
| AWS RDS / Aurora | ✅ Yes - via `rds_replication` role |
| AWS Aurora Serverless v2 | ✅ Yes |
| Self-hosted Postgres | ✅ Yes - full superuser |
| Supabase | ✅ Yes - supported |
| Neon | ✅ Yes - supported |
| DigitalOcean Managed Postgres | ❌ No - `CREATE SUBSCRIPTION` not permitted |
| Fly.io Managed Postgres | ❌ No - restricted |

I specifically chose AWS RDS as the destination because it supports this. If your destination provider isn't on the ✅ list, this approach won't work - you'd need to fall back to a `pg_dump`/`pg_restore` maintenance window or a tool like [`pgcopydb`](https://github.com/dimitri/pgcopydb).

---

## Step 1: Set Up Replication (`migrate.sh`)

This script handles the initial setup: schema copy, publication on source, subscription on destination.

```bash
#!/usr/bin/env bash
set -euo pipefail

: "${PG_URI_SRC:?Need to set PG_URI_SRC (source Postgres URI)}"
: "${PG_URI_DST:?Need to set PG_URI_DST (target Postgres URI)}"

echo "SRC: $PG_URI_SRC"
read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "DST: $PG_URI_DST"
read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

pgcopydb ping --source "$PG_URI_SRC" --target "$PG_URI_DST"

echo "=== STEP 1: Ensure logical replication enabled on source ==="
psql "$PG_URI_SRC" -v ON_ERROR_STOP=1 <<'SQL'
SHOW wal_level;
SHOW max_replication_slots;
SHOW max_wal_senders;
SQL

read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "=== STEP 2: Dump schema from SOURCE DB and restore into DESTINATION DB ==="
pg_dump --schema-only --no-owner --no-privileges "$PG_URI_SRC" > ./schema.sql
psql "$PG_URI_DST" -f ./schema.sql

echo "=== STEP 3: Create publication on SOURCE DB ==="
psql "$PG_URI_SRC" -v ON_ERROR_STOP=1 <<'SQL'
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'fly_pub') THEN
      CREATE PUBLICATION fly_pub FOR ALL TABLES;
   END IF;
END
$$;
SQL

echo "=== STEP 4: Create subscription on DESTINATION DB ==="
psql "$PG_URI_DST" -c "DROP SUBSCRIPTION IF EXISTS fly_sub;"
psql "$PG_URI_DST" -c "CREATE SUBSCRIPTION fly_sub CONNECTION '$PG_URI_SRC' PUBLICATION fly_pub WITH (copy_data = true, create_slot = true, enabled = true);"

echo "=== STEP 5: Check initial replication status ==="
echo "Source replication slots:"
psql "$PG_URI_SRC" -c "SELECT slot_name, active, restart_lsn FROM pg_replication_slots;"

echo "Target subscription status:"
psql "$PG_URI_DST" -c "SELECT * FROM pg_stat_subscription;"

cat <<'EOM'

====================================================
✅ Migration setup complete.

- Schema has been copied via pg_dump/pg_restore.
- Data is now being streamed via logical replication.
- Monitor replication: run ./monitor.sh
- When ready for cutover, run ./cutover.sh
====================================================
EOM
```

### What's happening here

- **Schema-only dump**: `pg_dump --schema-only` copies your table definitions, indexes, constraints, etc. but no data. Logical replication handles the data.
- **Publication**: `CREATE PUBLICATION fly_pub FOR ALL TABLES` tells the source to publish all changes. You can narrow this to specific tables if needed.
- **Subscription with `copy_data = true`**: This is key - when the subscription is created, Postgres initiates an initial data copy (snapshot) of all existing rows, then switches to streaming live changes. For 86 GB, this initial copy takes hours, but your source is still fully operational the entire time.

:::tip
**AWS RDS permissions**: On RDS, your destination user needs the `rds_replication` role: `GRANT rds_replication TO myuser;`. On self-hosted Postgres, make sure the user has the `REPLICATION` attribute: `ALTER ROLE myuser REPLICATION;`. Check your provider's docs if the subscription creation step fails with a permissions error.
:::

---

## Step 2: Monitor Replication (`monitor.sh`)

Run this in a separate terminal while replication is catching up. It polls `pg_subscription_rel` every 30 seconds and shows the per-table status.

```bash
#!/bin/bash
set -euo pipefail

: "${PG_URI_DST:?Need to set PG_URI_DST (target Postgres URI)}"

INTERVAL=30

CLEAR_SCREEN=$(tput clear)
HOME_CURSOR=$(tput cup 0 0)
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

tput civis
trap 'tput cnorm; echo -e "\nExiting monitoring..."; exit' EXIT INT TERM

echo "Monitoring logical replication subscription 'fly_sub' on destination..."
echo "Press Ctrl+C to stop."
sleep 1

while true; do
    printf '%s%s' "$CLEAR_SCREEN" "$HOME_CURSOR"

    echo "${BOLD}==================================================================${NORMAL}"
    echo "${BOLD}PostgreSQL Logical Replication Status - $(date '+%Y-%m-%d %H:%M:%S')${NORMAL}"
    echo "${BOLD}==================================================================${NORMAL}"

    psql "$PG_URI_DST" -v ON_ERROR_STOP=1 -P pager=off <<'SQL'
SELECT
    srrelid::regclass AS table_name,
    srsubstate AS code,
    CASE srsubstate
        WHEN 'i' THEN '🟡 Initializing'
        WHEN 'd' THEN '🔄 Copying data'
        WHEN 'f' THEN '✅ Finished copy'
        WHEN 's' THEN '🔄 Synchronizing'
        WHEN 'r' THEN '✅ Ready (replicating)'
        ELSE '❓ Unknown'
    END AS status,
    srsublsn
FROM pg_subscription_rel
WHERE srsubid = (SELECT oid FROM pg_subscription WHERE subname = 'fly_sub')
ORDER BY
    CASE srsubstate
        WHEN 'i' THEN 1
        WHEN 'd' THEN 2
        WHEN 's' THEN 3
        WHEN 'f' THEN 4
        WHEN 'r' THEN 5
        ELSE 6
    END,
    table_name;
SQL

    echo "${BOLD}==================================================================${NORMAL}"
    echo "Next refresh in ${INTERVAL} seconds... (Ctrl+C to quit)"

    sleep $INTERVAL
done
```

### Reading the status codes

| Code | Meaning |
|------|---------|
| `i`  | Initializing - waiting to start |
| `d`  | Copying data - initial snapshot in progress |
| `f`  | Finished copy - snapshot done for this table |
| `s`  | Synchronizing - final sync before live replication |
| `r`  | Ready - fully caught up, streaming live changes |

You want **all tables in `r` state** before you proceed to cutover. With 86 GB, expect the initial copy phase (`d`) to take several hours depending on network throughput between your source and destination.

---

## Step 3: Cutover (`cutover.sh`)

Once everything is in `r` state, you're ready to cut over. This is where the (brief) downtime happens.

```bash
#!/usr/bin/env bash
set -euo pipefail

: "${PG_URI_SRC:?Need to set PG_URI_SRC (source Postgres URI)}"
: "${PG_URI_DST:?Need to set PG_URI_DST (target Postgres URI)}"
: "${REDIS_URL_SRC:?Need to set REDIS_URL_SRC (source Redis URI)}"
: "${REDIS_URL_DST:?Need to set REDIS_URL_DST (target Redis URI)}"

# Confirm all four URIs before doing anything destructive
echo "SRC: $PG_URI_SRC"
read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "DST: $PG_URI_DST"
read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "SRC Redis: $REDIS_URL_SRC"
read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "DST Redis: $REDIS_URL_DST"
read -p "Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "=== STEP 1: Stop all application processes ==="
# Replace these with your actual app/process management commands.
# The goal: zero writes to the source DB from this point forward.
# Examples for Fly.io:
#   fly scale count 0 -a my-app-api -y
#   fly scale count 0 -a my-app-worker -y
# Examples for other platforms:
#   kubectl scale deployment my-app --replicas=0
#   systemctl stop my-app
echo "TODO: Stop your app processes here."
read -p "Press Y once all apps are stopped and writes have ceased... " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

read -p "Confirm replication is fully caught up (all tables 'r' in monitor.sh). Press Y to continue... " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "=== STEP 2: Drop subscription on DESTINATION ==="
if psql "$PG_URI_DST" -tAc "SELECT 1 FROM pg_subscription WHERE subname = 'fly_sub'" | grep -q 1; then
  psql "$PG_URI_DST" -c "DROP SUBSCRIPTION fly_sub;"
else
  echo "No subscription named fly_sub found on target."
fi

echo "=== STEP 3: Drop publication on SOURCE DB ==="
psql "$PG_URI_SRC" -v ON_ERROR_STOP=1 <<'SQL'
DO $$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'fly_pub') THEN
      DROP PUBLICATION fly_pub;
   END IF;
END
$$;
SQL

echo "=== STEP 4: Drop replication slots on SOURCE DB ==="
psql "$PG_URI_SRC" -v ON_ERROR_STOP=1 <<'SQL'
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT slot_name
        FROM pg_replication_slots
        WHERE slot_name LIKE 'fly_sub%'
    LOOP
        EXECUTE format('SELECT pg_drop_replication_slot(%L);', r.slot_name);
    END LOOP;
END
$$;
SQL

echo "=== STEP 5: Reset sequences on DESTINATION ==="
# Logical replication does NOT replicate sequence state - only row data.
# pgcopydb copies the current sequence values from source to destination.
rm /tmp/pgcopydb/* -rf
pgcopydb copy sequences --source "$PG_URI_SRC" --target "$PG_URI_DST"
echo "Sequences reset on target."

# Sanity check: compare schemas between source and destination
pgcopydb compare schema --source "$PG_URI_SRC" --target "$PG_URI_DST"

read -p "Schema comparison complete. Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "=== STEP 6: Verify replication slot cleanup on SOURCE ==="
psql "$PG_URI_SRC" -c "SELECT slot_name, active FROM pg_replication_slots;"

echo "=== STEP 7: Migrate Redis data from SOURCE to DESTINATION ==="
docker run riotx/riot replicate "$REDIS_URL_SRC" "$REDIS_URL_DST"

read -p "Redis migration complete. Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "=== STEP 8: Update app secrets/config to point to DESTINATION ==="
# Replace with your platform's mechanism for updating env vars.
# Examples for Fly.io:
#   fly secrets set DATABASE_URL="$PG_URI_DST" REDIS_URL="$REDIS_URL_DST" -a my-app-web --stage
# Examples for other platforms:
#   Update your .env or secret manager (AWS Secrets Manager, etc.)
echo "TODO: Update DATABASE_URL and REDIS_URL in your apps."
read -p "Secrets updated. Type Y to continue: " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

echo "=== STEP 9: Bring applications back up ==="
# Replace with your actual deploy/start commands.
echo "TODO: Start/deploy your app processes here."
read -p "Press Y once apps are back up and verified healthy... " c && [[ "$c" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

cat <<'EOM'

====================================================
✅ Cutover complete.

- Apps are now pointed at the DESTINATION DB.
- Replication slots have been cleaned up on the source.
- You can now safely decommission the old source Postgres.
- You can also remove the old Redis instance if no longer needed.
====================================================
EOM
```

### The sequence reset gotcha

This tripped me up the first time I thought about it: **Postgres logical replication does not replicate sequences**. It replicates row-level changes (INSERT/UPDATE/DELETE), but sequences are not tables - they're separate objects that track auto-increment state.

If you don't reset sequences on the destination after replication completes, your next `INSERT` will try to use a sequence value that already exists in the data, causing a primary key violation.

`pgcopydb copy sequences` handles this cleanly - it reads the current value of every sequence on the source and sets the destination sequences to match.

---

## The Full Flow, Visualized

```
SOURCE (old host)                 DESTINATION (new host)
─────────────────────────         ──────────────────────

1. pg_dump --schema-only ──────►  psql -f schema.sql

2. CREATE PUBLICATION my_pub      CREATE SUBSCRIPTION my_sub
   (on source)              ◄──── CONNECTION source PUBLICATION my_pub

3. App running normally           Initial snapshot copying...
   Writes continue ──────────────► (copy_data = true)

4. All tables reach 'r' state     Live streaming ✅

5. *** STOP APP PROCESSES ***

6. DROP SUBSCRIPTION my_sub       (cleans up replication slot on source)
   DROP PUBLICATION my_pub
   DROP REPLICATION SLOTS

7. pgcopydb copy sequences ──────► Sequences synced

8. docker run riotx/riot replicate Redis data ──────►

9. Update DATABASE_URL ──────────► Point apps at new host

10. *** START APP PROCESSES ***
```

---

## Things to Watch Out For

**Replication slot WAL accumulation**: While replication is active, the source Postgres holds onto WAL (write-ahead log) files until the subscriber confirms it has consumed them. If replication falls behind or stalls, this can [fill your source disk](./fly.io-migrate-to-v2-postgres-stuck-in-read-only-mode.md#runway-wal-log). Monitor `pg_replication_slots` on the source and set `max_slot_wal_keep_size` as a safety valve.

**Foreign key constraints during initial copy**: `pgcopydb` handles table ordering intelligently, but bare `pg_dump` schema restores can sometimes fail if you have circular foreign keys. Watch for errors during the schema restore step.

**Extensions**: `pg_dump --schema-only` includes extension declarations, but the extensions need to actually be installed on the destination. Most managed providers support common extensions (`uuid-ossp`, `pg_trgm`, `hstore`, etc.) but you may need to enable them manually before running the schema restore: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`. Check your destination provider's list of supported extensions if the schema restore step throws errors.

**`copy_data = true` is slow by design**: The initial snapshot copies data row by row through the logical replication protocol. For large databases, this is slower than a direct `pg_restore`. That's fine - the whole point is that your source stays live during this phase.

**Schema changes during replication**: Don't run DDL migrations while replication is active. Logical replication doesn't replicate DDL - only DML. A schema change on the source won't be reflected on the destination and will likely break replication entirely.

**Redis**: Logical replication only covers Postgres. If your app uses Redis for session storage, caching, or job queues, you need to migrate it separately. In my case I was also changing regions - moving from Fly.io in SJC (San Jose, CA) to IAD (Ashburn, VA) + AWS us-east-1 (Virginia) - so keeping the old Redis instance wasn't an option anyway. Latency between SJC and us-east-1 would have made it noticeably slower. I used [RIOT](https://github.com/redis/riot) (`riotx/riot` Docker image) to replicate the live Redis instance to the new one in a single command. If you're staying in the same region and your Redis is reachable from both old and new infrastructure, you may be able to skip this step entirely and just update the `REDIS_URL` env var.

---

## The Result

The 86 GB initial snapshot took several hours while the app continued running normally on the source. By the time I was ready to cut over, replication lag was at zero and all tables were in `r` state.

**Actual downtime: ~10 minutes.** Not because the technique requires it - it doesn't - but because I made a couple of procedural errors during the cutover window.

---

## What I'd Do Differently (Lessons Learned)

**Have the redeploy commands fully tested before the cutover window.** I had the commands ready to paste, but I hadn't fully validated the `fly deploy` flags against the current state of my production apps. Some flags that worked in staging didn't play nicely with the production app configuration, and I spent several minutes debugging that under pressure. The fix: do a complete dry run of the redeploy step - without actually taking the app down - the day before the migration, just to confirm the commands execute cleanly end-to-end.

Done with that in place, the actual maintenance window for this migration should be 3–5 minutes.

---

## Environment Variables

All three scripts use the same env var convention:

```bash
export PG_URI_SRC="postgres://user:password@source-host:5432/mydb"
export PG_URI_DST="postgres://user:password@destination-host:5432/mydb"
export REDIS_URL_SRC="redis://source-host:6379"
export REDIS_URL_DST="redis://destination-host:6379"
```

Run them in order:

```bash
./migrate.sh    # Set up replication (run once)
./monitor.sh    # Watch progress (run in a separate terminal, check periodically)
./cutover.sh    # Execute when ready (the night/time of migration)
```

---

Logical replication is genuinely powerful for this use case. The ability to keep both databases synchronized in real time - with the source fully operational - means the actual cutover window is just the time it takes to restart your app. The hours of data transfer happen invisibly, while your users notice nothing.

If you're migrating from Fly.io to AWS RDS specifically, the scripts above should work largely as-is. For any other platform combination, the Postgres steps are identical - only the "stop your app" and "update your config" commands in `cutover.sh` need to be swapped for your deployment platform's equivalents.