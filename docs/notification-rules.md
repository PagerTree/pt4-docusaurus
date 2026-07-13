# Notification Rules

## What are Notification Rules?

With notification rules, you can perform custom notification sequences. Notification rules are processed after PagerTree has selected the account user to notify, but before default notification channels are used. The diagram below shows the high level workflow for alerts and how they move within the PagerTree system.

* Notification rules are objects that can dynamically change a notification cycle.
* By default, notification rules apply to the Alert Open message. You can opt individual rules into other message types (such as Alert Acknowledged, Alert Resolved, or Broadcast Sent) using the `types` field. See [Message Types](notification-rules.md#message-types).
* Notification rules must be attached to an account user to be used.
* To access notification rules, you must enable "advanced mode".
* Notification rules are evaluated in top down order.
* If no rules are matched, the account user is notified on their default notification channels.
* Notification rules are written in YAML.

<figure>![high level alert workflow](<https://pagertree.com/assets/img/kb/routers/high-level-alert-workflow-notification-rules.png>)<figcaption><p>High Level Alert Workflow (Notification Rules)</p></figcaption></figure>

### Notification Rules Video

<iframe src="https://www.youtube-nocookie.com/embed/ZdIt5eODXHI" title="Notification Rules Tutorial Video (v4)" class="rds-video"></iframe>

## Rules Syntax

* The notification rules syntax is the same as routers.
* The match block works exactly the same (data and operators are the same)
* The actions block works exactly the same **but with different actions**.

Please see the routers documentation for rules syntax and match conditions.

:::info
_Remember to come back here for_ [_notification rule specific action types_](notification-rules.md#action-types).
:::

## Message Types

By default, a rule applies only to the **Alert Open** message (i.e. the initial escalation page). You can make a rule apply to other message types by adding a `types` field to the rule.

* _types_ - array - one or more of the message types below. If omitted, defaults to `["alert.open"]`.

| Type                 | Fires when...                                    |
| -------------------- | ------------------------------------------------- |
| `alert.open`          | An alert is opened and paging an account user (default). |
| `alert.acknowledged`  | Someone else acknowledges the alert.               |
| `alert.rejected`      | Someone else rejects the alert.                    |
| `alert.resolved`      | The alert is resolved.                             |
| `alert.dropped`       | The alert is dropped (no one responded in time).   |
| `alert.timeout`       | An escalation layer times out.                     |
| `alert.handoff`       | The alert is handed off to the account user.       |
| `broadcast.sent`      | A broadcast is sent to the account user.           |

:::info
Only `alert.open` supports escalation semantics ([notify](notification-rules.md#notify) actions with a _timeout_, plus [repeat](notification-rules.md#repeat)). Every other message type is a single, immediate notification: only the _channels_ of the first matching rule's `notify` action(s) are used, and any `timeout`/`repeat` are ignored.
:::

You do not need to rewrite existing rules to take advantage of this - rules without a `types` field keep behaving exactly as before (applying only to `alert.open`). Just add new rule entries with an explicit `types` list alongside your existing rules.

```yaml
# A quiet ping when someone else acknowledges or resolves the alert.
- types:
  - alert.acknowledged
  - alert.resolved
  match:
    always: true
  actions:
  - type: notify
    channels:
    - push
```

## Actions Block

### Action Types

* [notify](notification-rules.md#notify) - Notify the user on specific channels.
* [repeat](notification-rules.md#repeat) - Repeat the notification cycle.
* [ignore](notification-rules.md#ignore) - Suppress notifications from being sent.

#### Notify

The notify action will notify the account user on specified channels then wait for a timeout for next instructions.

**Parameters**

* _channels_ - array - any of the following: push, email, sms, voice, whatsapp, slack
* channel\_options - hash
  * email - string - primary, secondary, email address
  * email\_fallback - boolean - fallback to primary email address if email parameter not found?
  * sms - string - primary, secondary, phone number [(E.164 format)](https://www.twilio.com/docs/glossary/what-e164)
  * sms\_fallback - boolean - fallback to primary phone number if sms parameter not found?
  * voice - string - primary, secondary, phone number [(E.164 format)](https://www.twilio.com/docs/glossary/what-e164)
  * voice\_fallback - boolean - fallback to primary phone number if voice parameter not found?
  * whatsapp - string - primary, secondary, phone number [(E.164 format)](https://www.twilio.com/docs/glossary/what-e164)
  * whatsapp\_fallback - boolean - fallback to primary phone number if whatsapp parameter not found?
* _timeout_ - string - [ms](https://www.npmjs.com/package/ms) notation of the duration to wait before the next action.

```yaml
- type: notify
  channels:
  - email
  - sms
  - voice
  - slack
  channel_options:
    sms: "secondary"
    sms_fallback: true
    voice: "+155555555555"
  timeout: 1m
```

#### Repeat

The repeat action will repeat the above notify actions n times. You can repeat between 0 and 3 times.

**Parameters**

* _times_ - integer - the number of times to repeat the notification cycle.

```yaml
- type: repeat
  times: 1
```

#### Ignore

The ignore action will suppress sending any notifications to the account user when matched.

```yaml
- type: ignore
```

## Putting It All Together

### Attach the Notification Rules to your User

When you are happy with your notification rule definition **you must connect the Notification Rules to the User**.

1. Navigate to the [My Settings Page](https://app.pagertree.com/user/settings).
2. Scroll to the **Other Settings section**.
3.  Select the notification rule definition from the **Notification Rules** select box.

    <figure>![select the notification rule](<.gitbook/assets/select-notification-rules.png>)<figcaption><p>Select the notification rule.</p></figcaption></figure>
4. Click **Update**.

## Examples

### Example #1 Match Everything

* Matches everything
  1. Notify email, sms, slack (wait 1 minute)
  2. Notify voice (wait 5 minutes)
  3. Repeat the above cycle 1 more time

```yaml
# Notify me via email, sms, & slack. 
# If the alert is still open after 1 minute, notify me via voice. 
# If the alert is still open 5 minutes later, repeat this cycle.
---
rules:
  - match:
      always: true
    actions:
    - type: notify
      channels:
      - email
      - sms
      - slack
      timeout: 1m
    - type: notify
      channels:
      - voice
      timeout: 5m
    - type: repeat
      times: 1
```

### Example #2 Special Alerts and Working Hours

* Match alerts with title containing "special title" (case insensitive)
  1. Notify email, sms, slack (wait 1 minute)
  2. Notify voice (wait 5 minutes)
  3. Repeat the above cycle 1 more time
* Match medium or low urgency alert outside of working hours
  1. Ignore
* Else, notify via default notification channels.

```yaml
# match alerts with the title containing "special title" (case insensitive)
  # Notify me via email, sms, & slack. 
  # If the alert is still open after 1 minute, notify me via voice. 
  # If the alert is still open 5 minutes later, repeat this cycle.
# match alerts with urgency medium or low, and outside of working hours
  # do not notify me
# if none of the above match, notify my default channels (not written, implied)
---
rules:
  - match:
      alert.title:
        "$regex": "special title"
        "$options": "i"
    actions:
    - type: notify
      channels:
      - email
      - slack
      timeout: 1m
    - type: notify
      channels:
      - voice
      timeout: 5m
    - type: repeat
      times: 1

  # if the alert urgency is medium or low, and outside of working hours do not notify me
  - match:
      $and:
        - alert.urgency:
            "$in":
            - low
            - medium
        - $timeBetween:
            timeformat: 'hh:mm a'
            timezone: 'America/Los_Angeles'
            starttime: '05:00 pm'
            endtime: '08:00 am'
    actions:
    - type: ignore
```

### Example #3 Primary Secondary Phone

Matches everything

1. Notify primary voice (wait 1 minute)
2. Notify secondary voice, fallback to primary if secondary not found (wait 5 minutes)

```yaml
# Notify me via primary phone. 
# If the alert is still open after 1 minute, notify me via secondary phone. 
# Fallback to the primary phone number if the secondary is not found.
---
rules:
  - match:
      always: true
    actions:
    - type: notify
      channels:
      - voice
      timeout: 1m
    - type: notify
      channels:
      - voice
      channel_options:
        voice: "secondary"
        voice_fallback: true
      timeout: 5m
```

### Example #4 Beyond Alert Open

* Match Alert Open (the default escalation)
  1. Notify email, slack (wait 1 minute)
  2. Notify voice (wait 5 minutes)
  3. Repeat the above cycle 1 more time
* Match Alert Acknowledged, Alert Resolved, or Alert Dropped
  1. Notify push (single, immediate - no escalation)
* Match Broadcast Sent outside of working hours
  1. Ignore

```yaml
# Escalate loudly on the initial page: email + slack first, then voice if still unanswered.
# Just a quiet ping when someone else already handled it (or it timed out/dropped).
# Don't notify me about broadcasts overnight.
---
rules:
  - types:
    - alert.open
    match:
      always: true
    actions:
    - type: notify
      channels:
      - email
      - slack
      timeout: 1m
    - type: notify
      channels:
      - voice
      timeout: 5m
    - type: repeat
      times: 1

  - types:
    - alert.acknowledged
    - alert.resolved
    - alert.dropped
    match:
      always: true
    actions:
    - type: notify
      channels:
      - push

  - types:
    - broadcast.sent
    match:
      $timeBetween:
        timeformat: 'hh:mm a'
        timezone: 'America/Los_Angeles'
        starttime: '10:00 pm'
        endtime: '07:00 am'
    actions:
    - type: ignore
```

## Common Mistakes

### Forgot to Attach to User

Many times a customer has written the notification rule correctly but forgets to [attach the notification rule to the user](#attach-the-notification-rules-to-your-user).

_Don't forget to attach the notification rule to the user!_

### Bad Indentation

A common error when configuring notification rules is that the YAML is not formatted correctly (mostly always indentation). You can use the [JSON2YAML tool](https://www.bairesdev.com/tools/json2yaml/) to check your indentation.

## FAQs

| Question                                                                                        | Answer                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What happens if the escalation layer timeout is shorter than my entire notification rule cycle? | The notification rule cycle will stop after the escalation layer times out. It's possible that all notify actions are not reached because the escalation layer timing out. |
| Broadcasts don't seem to be respecting my notification rules, why?                              | By default, notification rules only apply to Alert Open. To have a rule apply to a broadcast, add `types: [broadcast.sent]` to that rule. See [Message Types](notification-rules.md#message-types). |
| Can I use timeout and repeat for message types other than Alert Open?                            | No. Escalation (`timeout`/`repeat`) is only supported for `alert.open`. Other message types send a single, immediate notification using the first matching rule's channels. |
