# Alerts

## What is an Alert?

* An alert should represent an actionable issue that needs [user](users.md) interaction.
* Alerts will notify users using the [alert workflow](architecture-guide.md#alert-workflow).
* Alerts are created by [Integrations](integrations.md) or [Account Users](users.md).
* Alerts have one or more "destinations". An alert destination can be a [Team](teams.md), Account User, or [Router](routers.md).

## User Interface

<figure>![annotated alert information](<.gitbook/assets/alert-ui-annotated.png>)<figcaption><p>Annotated Alert Information</p></figcaption></figure>

| Annotation # | Alert Property      | Description                                                                                                                                             |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1            | Incident Banner     | If the alert is an incident, will show severity and special message.                                                                                    |
| 2            | Status              | `queued\|open\|acknowledged\|resolved\|dropped` - The current state of the alert. See [alert states](alerts.md#alert-states)                            |
| 3            | Response Time       | The difference between when the alert was first created and when it was first acknowledged. (does not reset on a handoff)                               |
| 4            | Alert Source        | Integration or Account user that created the alert.                                                                                                     |
| 5            | Destinations        | Teams and Routers the alert was sent to.                                                                                                                |
| 6            | Responders          | Users that have acknowledged this alert.                                                                                                                |
| 7            | Title               | Should be concise and descriptive. It shows up on all notification channels                                                                             |
| 8            | Public Url          | The public shareable URL to this alert (default: disabled)                                                                                              |
| 9            | Urgency             | `low\|medium\|high\|critical` - Determines the push notification priority and can affect routers and notification rules.                                |
| 10           | Stakeholders        | Any stakeholders that are attached to the alert                                                                                                         |
| 11           | Third Party ID      | The unique identifier that maps this alert with and object in a 3rd party system                                                                        |
| 12           | Deduplication Count | An incrementing integer. Will increase if the Integration tries to create an alert with the same Third Party ID, another alert is created with the same |
| 13           | Tags                | Any tags that are attached to the alert. Alerts can then be searched by the tags on the alerts page.                                                    |
| 14           | Additional Data     | If created by an integration, additional data that was extracted by the integration.                                                                    |
| 15           | Source Log          | If created by an integration, the source log that created this alert.                                                                                   |

### Comments

Account users can comment on the alert. Comments are meant for human conversation.

<figure>![alert comments](<.gitbook/assets/alert-comments.png>)<figcaption><p>Alert Comments</p></figcaption></figure>

### Logs

Alert logs are created by PagerTree to document what happened during the alert's lifecycle.

<figure>![alert logs](<.gitbook/assets/alert-logs.png>)<figcaption><p>Alert Logs</p></figcaption></figure>

## Alert Actions

### Acknowledge

Acknowledging an alert indicates that the person acknowledging the alert will be responsible for addressing the alert. If the person is not able to adequately resolve the issue themselves, it is their responsibility to gather others who can help take this alert to resolution. The acknowledging user could also [handoff](alerts.md#handoff) the alert to another Account User or Team who could better address the alert.

To acknowledge an alert, the alert must be in the `open` status.

#### Methods to Acknowledge

| Channel    | Directions                                                                  |
| ---------- | --------------------------------------------------------------------------- |
| mobile app | Tap the push notification. On the alert page, click the acknowledge button. |
| email      | Click the acknowledge button.                                               |
| sms        | Reply A.                                                                    |
| voice      | Push 1.                                                                     |
| slack      | Click the acknowledge button.                                               |
| web ui     | Click the acknowledge button.                                               |

### Reject

Rejecting an alert indicates that the person rejecting the alert cannot address the alert at the current time. (ex: The rejecting user is stuck in traffic.)

To reject an alert, the account user must have an open alert workflow.

#### Methods to Reject

| Channel    | Directions                                                             |
| ---------- | ---------------------------------------------------------------------- |
| mobile app | Tap the push notification. On the alert page, click the reject button. |
| email      | Click the reject button.                                               |
| sms        | Reply R.                                                               |
| voice      | Push 2.                                                                |
| slack      | Click the reject button.                                               |
| web ui     | Click the reject button.                                               |

### Resolve

Resolving an alert indicates that the alert has been fully fixed (aka "resolved").

To resolve an alert it must be in the `acknowledged` state. Resolving an alert can only be done via the mobile app and web ui.

Integrations can auto-resolve alerts. In this case, an alert can go from `open` -> `resolved` directly.

#### Methods to Resolve

| Channel    | Directions                                                              |
| ---------- | ----------------------------------------------------------------------- |
| mobile app | Tap the push notification. On the alert page, click the resolve button. |
| web ui     | Click the resolve button.                                               |

### Handoff

You many handoff the alert to another [Team](teams.md) or [Router](routers.md) once the alert is in the `acknowledged` state. Handing off an alert can only be done via the mobile app or web ui.

#### Methods to Handoff

1. In the top right of the alert page, **Click Handoff**.
2. On the Alert Handoff form:
   1. Select a new destination for the alert.
   2. Provide a brief note as to why you are handing it off.
3. **Click Handoff**.

## Incident

Marking an alert as an incident communicates to your team members this alert is a greater degree of severity than a normal alert. It can be causing an outage or even customer facing. An incident represents a problem or an issue that needs to be addressed an resolved immediately.

* _Severity_ - Communicates the impact of an incident ([see below](alerts.md#severities)).
* _Incident Message_ - A short message to be displayed at the top of the alert page (ex: "Please join the war room https://zoom.us/123")

<figure>![alert incident banner](<.gitbook/assets/alert-incident-banner.png>)<figcaption><p>Alert Incident Banner</p></figcaption></figure>

### Severities

The incident severity level communicates the impact of the incident. It will be displayed on notification channels and in a red banner on top of the alert page.

If you are unsure which level an incident is (e.g. not sure if SEV-2 or SEV-1), treat it as the higher one (SEV-1).

| Level           | Description                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- |
| SEV-1 (highest) | Critical issue that warrants public notification and liaison with executive teams.                 |
| SEV-2           | Critical system issue actively impacting many customers' ability to use the product.               |
| SEV-3           | Stability or minor customer-impacting issues that require immediate attention from service owners. |
| SEV-4           | Minor issues requiring action, but not affecting customer ability to use the product.              |
| SEV-5 (lowest)  | Cosmetic issues or bugs, not affecting customer ability to use the product.                        |
| SEV-UNKNOWN     | Impact currently unknown (can be updated in the future)                                            |

## Alert States

| State        | Description                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| queued       | Initial state of an alert. At this point, the alert has not been routed to any destinations.                         |
| open         | The alert has been routed to its first destination. It has an open workflow and waiting to be actively acknowledged. |
| acknowledged | The alert has been acknowledged by all destinations.                                                                 |
| resolved     | The alert has been marked as resolved by a user or integration.                                                      |
| dropped      | The alert was dropped because there was no one on-call or the users that were on-call did not acknowledge the alert. |

<figure>![alert states](<.gitbook/assets/alert-states.png>)<figcaption><p>Alert States</p></figcaption></figure>

## FAQs

| Question                          | Answer                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Who can create an Alert?          | Any account user or integration may create an alert.                                                       |
| What does the urgency mean / do ? | The alert urgency determines the push notification priority and can affect routers and notification rules. |
