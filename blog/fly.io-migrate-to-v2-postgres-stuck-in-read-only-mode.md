---
date: 2023-07-31
authors: amiller
description: >-
  A postmortem describing the issue, root cause, and remediation of our outage
  on July 30, 2023 00:30 - 01:15 (UTC)
---

# 📜 Fly.io migrate-to-v2 Postgres stuck in read-only mode

## TL;DR

### Fly.io Postgres stuck in read-only mode

* During the migration to the Fly.io platforms v2, the provided command (`migrate-to-v2`) times out if a Postgres cluster doesn't replicate and failover fast enough.
* The `migrate-to-v2` command first puts the database in a read-only state. When the timeout occurs, the command fails to remember to put the database back in a writable state.
* After the database is read-only, new and existing connections will not be able to write to the database. This caused PagerTree to functionally fail for approximately 45 minutes on July 30, 2023 from 00:30 -> 01:15 UTC.
* The Postgres cluster can be put back into a writable state with the following commands:

```bash showLineNumbers
# connect to postgres psql
fly postgres connect -a <postgres_fly_app_name>
# This will show false for the postgres DB
SHOW default_transaction_read_only; 
# connect to the production db
\connect <production_db_name>
# This will now show the root cause of issue
SHOW default_transaction_read_only;
# the following command will only work for the current connection
SET default_transaction_read_only TO off;
# connect back to postgres
\connect postgres
# fix the real problem
alter database <production_db_name> set default_transaction_read_only=off;
```

<!-- truncate -->

:::warning
Note that on lines 9 & 10, the command will only work for the current connection. You need to use line 14 to solve the root cause.
:::

### Runway WAL log

Additionally, we ran into another issue of a [runway WAL log](https://community.fly.io/t/no-keeper-available-runaway-wal/7153). The WAL log is responsible for replica databases to catch up to the leader. If the leader believes a replica has not caught up, it will continue to keep the WAL log around; this can fill up the database's entire hard drive, causing the database cluster to fail.

In the [Fly.io](https://fly.io/) monitoring page of your app, you might see output like this: `2023-07-31T16:52:25.689Z WARN cmd/sentinel.go:276 no keeper info available {"db": <db_id>, "keeper": <keeper_id>}`. What this is trying to tell you is that the leader thinks there is a replica somewhere out there that hasn't been updated. In our case, an orphan (dead) VM was never unregistered.

To fix this, you need to connect to the Postgres cluster and tell it to forget the orphan VM.

```bash
# connect to postgres machine
fly ssh console -a <postgres_fly_app_name>
# set the environment variables
export $(cat /data/.env | xargs)
# check the stolon status
stolonctl status
# kill the runway stolon.
stolonctl removekeeper <keeper-id>
```

## Incident Postmortem

:::info
All times are UTC and any references to communication or actions taken by PagerTree were performed by Austin Miller.
:::

### Events leading up to the Postgres Migration



1. Monday, July 24, 2023 at 22:04 the PagerTree team was notified by an automated email that Fly.io would need to migrate our staging and production Postgres apps from the deprecated Nomad (v1) to the Machines (v2) platform the following week. It was advertised that the command `flyctl migrate-to-v2` [should "Just Work"](https://community.fly.io/t/fly-migrate-to-v2-postgres-edition/12140), but in our experience, we had run into issues during upgrades on Fly.io. We decided to proactively upgrade the application to be able to address any issues ahead of time.
2. Tuesday, July 25th, 2023 at 15:30 we attempted to migrate our staging Postgres cluster and found errors. We ran into the timeout error (but didn't understand it as the root cause), and once replicated an migrated used the  migrate-to-v2 troubleshoot command to kill the Nomad VMs and mark the application as V2. Additionally, we started troubleshooting why the staging database was left in a read-only state. We found the psql command `SHOW default_transaction_read_only;` to show the applications database in a read only state. We restarted the database using `fly postgres restart -a <postgres_fly_app_name>` and killed any active sessions using `select pg_terminate_backend(pid) from pg_stat_activity where application_name like '/app%' or application_name like 'side%'; and` the database went back into a read/write state and we thought everything had been fixed.
3. Tuesday, July 25 2023 at 16:32 (almost in parallel to the previous bullet point) we reached out to Fly support team stating the issue we had found with the migration of the staging postgres cluster. At 17:06 we replied reporting killing the sessions will fix the issue. Sam Wilson from Fly support responded 5 hours later at 21:37, reporting they were glad we were able to work around it and our app had been successfully migrated to v2 and they were also seeing read/write enabled on the staging primary.
4. Thursday, July 27 at 03:30 we attempted to perform the `migrate-to-v2` command with failure (unspecified error code). Applications were turned off between 03:30->03:40 resulting in 10 minutes of application downtime.
5. Thursday, July 27 at 03:58 we reported our findings to Fly. The Postgres cluster was also left in a strange state (ophaned VM) with lots of errors. (This would later be found to be the [runway WAL log issue](fly.io-migrate-to-v2-postgres-stuck-in-read-only-mode.md#runway-wal-log)). We asked the Fly support team to look into the issue and advise.
6. Thursday, July 27 at 17:50 UTC we asked for an update on the ticket since we noted our database hard drive filling up and we had not yet received a response from Fly support.![](<.gitbook/assets/image (25).png>)
7. Thursday, July 27, 2023 at 18:38 Nina Vyedin from the Fly support staff responded with a very generic error and referenced us to try running the `migrate-to-v2` command again and troubleshooting with [this post](https://community.fly.io/t/fly-migrate-to-v2-postgres-edition/12140).
8. Thursday, July 27, 2023 at 23:15 we were reminded via an automatic email that our production Postgres cluster was still scheduled for an automatic upgrade the following week.
9. Friday, July 28, 2023 at 22:30 we attempted the migration again without success, but now with an error "Page Not Found". There was approximately 5 minutes of downtime for the PagerTree app.
10. Friday, July 28, 2023 at 22:52 we emailed the Fly support team with the new "Page not found" error. We asked if they could look into their logs to see what could be happening. We also expressed concern for the automatic migration of apps the following week when the migration command was failing.
11. Saturday, July 29 at 05:09 Brian Li from the Fly support staff suggested we try deleting a volume from an orphaned VM, then using the `LOG_LEVEL=debug` on the `migrate-to-v2 command`. We deleted the orphan volume.
12. Sunday, July 30 at 00:30 we attempted to migrate the cluster with Brian Li's suggestion. The PagerTree application was taken offline and a service outage began. The migration looked to be going smoothly now that the orphaned volume had been deleted.
13. Sunday, July 30 at 00:35 the migrate command had timed out. At this point the new v2 machines had been created but were still replicating from the leader. We decide to wait until replication had been completed before running the troubleshooting command and deleting the v1 VMs (similar to what we had done with our staging Postgres cluster, bullet #2).
14. Sunday, July 30 at 00:40 replication had completed, so we tried to bring the PagerTree application back online. We immediately started to see errors in Honeybadger `ActiveRecord::StatementInvalid: PG::ReadOnlySqlTransaction: ERROR: cannot execute INSERT in a read-only transaction`
15. The following describes the actions taken between Sunday July 30 at 00:40 and 01:16 without specific timestamps.
    1. We tried killing the connections using `select pg_terminate_backend(pid) from pg_stat_activity where application_name like '/app%' or application_name like 'side%';` in hopes that a new connection would be in read/write mode. This failed and at this point, we knew that database was in a read-only mode.
    2. Logging into the Postgres cluster an running `SHOW default_transaction_read_only;` on the application database confirmed our suspicion. We tried running `SET default_transaction_read_only TO off;` to fix the issue. With a successful command run, we believed the database would now be in a read/write mode. We would later learn this only set the option for the current connection.
    3. We restarted the PagerTree application but again saw the errors regarding the read-only transactions.
    4. We searched the internet how to make the appropriate change to all new connections. After searching for 5 or 10 minutes we found a working solution `alter database application_db_name set default_transaction_read_only=off;`
    5. We restarted the PagerTree application and confirmed that the database was now in a writable state.
16. Sunday, July 30 at 01:16 we posted an update to our [status page](https://status.pagertree.com/) that the incident had been recovered and we were monitoring.
17. Sunday, July 30 at 01:43 we declared the incident resolved.&#x20;



### Review

* Impact - The PagerTree application was down for 46 minutes and impacted all customers and integrations. Incoming requests, alerts, and notifications were all impacted during these 46 minutes.
* Root Cause - `migrate-to-v2` timeout and database left in read-only state.
* Recurrence - This also happened in our staging Postgres upgrade, but we thought a Postgres restart and killing existing connections fixed the issue.
* Corrective actions - `alter database application_db_name set default_transaction_read_only=off;` is the authoritative fix for the read-only state of the database.
* Future Monitoring - We have added writing to the database a check in our monitoring. A write test is performed every minute now.
