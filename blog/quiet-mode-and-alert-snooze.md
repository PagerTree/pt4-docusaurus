---
date: 2026-11-09
authors: pagertree
description: "PagerTree now has quiet mode, to pause your own notifications for a while, and alert snooze, to pause paging on a single alert. Plus, the Android app now plays alert sounds even when your phone is on vibrate."
keywords: ["pagertree quiet mode", "snooze alert", "pause on-call notifications", "snooze incident alert", "on-call do not disturb", "alert fatigue", "on-call management", "incident management snooze"]
---

# 📣 Quiet Mode, Alert Snooze, and Louder Android Alerts

Being on call shouldn't mean being interrupted for things you already know about. Today we're launching two features that give you more control over *when* PagerTree pages you:

- **[Quiet Mode](#quiet-mode)** - Pause *your own* notifications for a while, without signing out or editing your schedule.
- **[Alert Snooze](#alert-snooze)** - Pause paging on *one alert* for a set amount of time, then pick right back up where it left off.

And on Android, [alert sounds now play even when your phone is on vibrate](#also-new-louder-android-alerts).

<!-- truncate -->

---

## Quiet Mode

Say you're at church or in a meeting. You don't want your phone going off for the next hour, but you also don't want to sign out of PagerTree or rearrange the on-call schedule. Quiet mode pauses your PagerTree notifications for a while, and always has an end time, so you never forget to turn them back on.

<iframe src="https://www.youtube-nocookie.com/embed/wJkbvaXgHWQ" title="Quiet Mode in PagerTree: Pause Your Notifications (Silence vs Auto-Reject)" class="rds-video"></iframe>

### How It Works

1. Click the **bell-slash** icon in the top navigation bar (web or mobile app).
2. Pick a duration (5 minutes to 8 hours), or click **Custom…** for more options.

While quiet mode is on, the icon turns indigo and a banner at the top of every page lets you **Edit** or **Turn off** quiet mode. It only applies to you, in the current account.

You can choose what happens to new alerts while you're quiet:

- **Silence** (default) - Your notifications are skipped. Alerts still escalate on timeout as usual, so the next person gets paged.
- **Auto-reject** - New alerts are rejected for you right away, so they move to the next person without waiting for the timeout.

### Built for Teams

- **Visible to admins** - Team admins can see who's in quiet mode on a team's on-call list.
- **Logged** - The alert log shows when someone was silenced or auto-rejected, so nothing is a mystery after an incident.
- **Persistent push pauses too** - [Persistent push notifications](https://pagertree.com/docs/notifications#notification-persistence-push) pause while you're quiet, and start again if quiet mode ends while the alert is still open.

Quiet mode is available on every plan. A custom end time (up to 7 days), choosing which channels to silence, letting critical alerts break through, and auto-reject are available on the Pro, Elite, and Enterprise [plans](https://pagertree.com/pricing/?utm_source=blog&utm_medium=link&utm_campaign=quiet_mode_snooze). See the [quiet mode docs](https://pagertree.com/docs/notifications#quiet-mode) for full details.

---

## Alert Snooze

You got paged, you looked at it, and you know the fix will take an hour (or the deploy that's rolling out will clear it). Until now, your choices were to acknowledge it and hope you remember, or let it keep paging you.

**Snooze** pauses paging on an alert for a set amount of time. While an alert is snoozed, it's in the new `snoozed` state and nobody is paged.

### Picks Up Where It Left Off

When the snooze ends, the alert goes back to `open` and the escalation picks up **on the same layer it was on**. It pages whoever is on call for that layer *at that moment*, so if the shift changed while the alert was snoozed, the new on-call person gets paged instead of the person who went off call.

- **Unsnooze** an alert to end the snooze early and resume paging right away.
- **Acknowledging, resolving, or deleting** a snoozed alert ends the snooze. It won't page again.
- **Duplicates stay quiet.** If the same alert comes in again while it's snoozed, it's deduplicated into the snoozed alert and doesn't page anyone.

### Snooze From Anywhere

Snooze works everywhere you already respond to alerts:

| Channel  | How to snooze                                                                              |
| -------- | ------------------------------------------------------------------------------------------ |
| Web app  | Click **Snooze** on the alert and pick a duration (5 minutes to 24 hours).                 |
| Bulk     | Select alerts in the alerts table, open **Actions**, then **Snooze**.                      |
| Email    | Click the **Snooze** button in the alert email, then pick a duration.                      |
| Slack    | Pick a duration from the snooze menu on the alert message, or send `/pt z 123 1h`.         |
| SMS      | Reply `z 123 1h` (or just `z 30m` if you only have one open alert).                        |
| WhatsApp | Same as SMS.                                                                               |
| Voice    | Push 5 to snooze for 30 minutes.                                                           |
| API      | `POST /api/v4/alerts/:id/snooze` with a `duration` in seconds (up to 7 days).               |

Text commands accept minutes (`30m`), hours (`2h`), or days (`1d`).

Snooze is available on the Pro, Elite, and Enterprise [plans](https://pagertree.com/pricing/?utm_source=blog&utm_medium=link&utm_campaign=quiet_mode_snooze). See the [snooze docs](https://pagertree.com/docs/alerts#snooze) and the [API reference](https://pagertree.com/docs/api/alerts#snooze-an-alert) for full details.

---

## Quiet Mode vs. Snooze

The two features solve different problems, and work well together:

|                      | Quiet Mode                                   | Snooze                                         |
| -------------------- | -------------------------------------------- | ---------------------------------------------- |
| **What it pauses**   | Your notifications, for every alert          | Paging on one alert, for everyone              |
| **Who it affects**   | Only you                                     | Everyone the alert would page                  |
| **Good for**         | "I'm at church or in a meeting for an hour"   | "I know about this one, check back in an hour" |
| **When it ends**     | You get notified again as usual              | The alert re-pages the current on-call layer   |

---

## Also New: Louder Android Alerts

The PagerTree Android app now plays your alert sound even when your phone is set to vibrate, so a page in your pocket is harder to miss. Update to the latest version from the [Google Play Store](https://play.google.com/store/apps/details?id=com.pagertree.app) to get it.

To make sure alerts also get through Do Not Disturb, see [Bypass DnD on Android](https://pagertree.com/docs/notifications#bypass-dnd--android).

---

## Getting Started

Quiet mode and snooze are live now. Look for the **bell-slash** icon in the top navigation bar, and the **Snooze** button on any open alert.

If you don't have a PagerTree account yet, [start a free trial now](https://app.pagertree.com/signup?utm_source=blog&utm_medium=link&utm_campaign=quiet_mode_snooze).

Questions or feedback? We'd love to hear from you at [support@pagertree.com](mailto:support@pagertree.com).
