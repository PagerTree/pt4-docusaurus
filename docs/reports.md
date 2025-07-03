---
description: >-
  Reports can give you a "big picture" overview on how your users, teams, and
  company is performing.
---

# Reports

## Common Filters <a href="#common-filters" id="common-filters"></a>

* _Start time_ - The start datetime to consider (inclusive).
* _End time_ - The end datetime to consider (inclusive).
* _Time zone_ - The time zone to report in.

## Export to CSV

Report data can be exported to CSV format. To export your data:

1. Filter your data.
2. Click the **Download CSV** button.

<figure>![Download CSV button for reports.](<.gitbook/assets/download-csv-button.jpg>)<figcaption><p>Download CSV button for reports</p></figcaption></figure>

## Alerts Report <a href="#alerts-report" id="alerts-report"></a>

The [alerts](alerts.md) report can show volume (total) alerts over a specified period of time.

<figure>![alert reports](<.gitbook/assets/alerts-report.png>)<figcaption><p>Alerts Report</p></figcaption></figure>

#### **Additional Options**

* _Filter by Team_ - Filter by selected teams (leave blank for all).
* _Group by_ - Options: urgency, status, source, team.
* _Period_ - Unit of time bucket the x-axis.

## Teams Reports <a href="#team-reports" id="team-reports"></a>

The [teams](teams.md) reports shows (on a per team basis):

* Total number of alerts
* Total number of alerts acknowledged
* Total number of alerts dropped
* A team's mean time to acknowledge

<figure>![team reports](<.gitbook/assets/teams-report.png>)<figcaption><p>Teams Report</p></figcaption></figure>

#### **Additional Options**

* _Filter by Team_ - Filter by selected teams (leave blank for all).

## Users Reports <a href="#user-reports" id="user-reports"></a>

The [users](users.md) report shows (on a per user basis):

* Total Time On-Call (total man days, overlapping events do not count twice).
* Total number of alerts the user was notified about.
* Total number of alerts the user acknowledged.
* Mean time to acknowledge.
* Total number of rejects.
* Total number of timeouts.

<figure>![user reports](<.gitbook/assets/users-report.png>)<figcaption><p>Users Report</p></figcaption></figure>

#### **Additional Options**

* _Filter by User_ - Filter by selected users (leave blank for all).

## Notifications Report <a href="#notifications-report" id="notifications-report"></a>

The [notifications](notifications.md) report can show volume (total) of notifications for a period of time.

<figure>![notification reports](<.gitbook/assets/notifications-report.png>)<figcaption><p>Notifications Report</p></figcaption></figure>

#### **Additional Options**

* _Group by_ - Options: channel, provider, status.
* _Period_ - Unit of time bucket the x-axis.

