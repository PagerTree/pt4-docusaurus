---
description: Learn about outgoing webhooks and how events are triggered for your account.
---

# Outgoing Webhook

## What is the Outgoing Webhook Integration?

Outgoing Webhooks are requests made by PagerTree to a user-defined URL, the payload provided represents an alert. Webhooks allow you to extend PagerTree by performing any logic you wish.

:::info
This documentation is meant for webhooks that are _outgoing_ from PagerTree. If you are looking for incoming webhooks, please refer to the [incoming webhook documentation](webhook.md).
:::

### Create An Outgoing Webhook

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Outgoing Webhook logo**.
2.  Provide the **URL** you want PagerTree to send webhooks to.&#x20;

    <figure>![Webhooks integrations](<../.gitbook/assets/image (6) (1) (1).png>)<figcaption><p>Provide a URL where PagerTree should send webhooks to.</p></figcaption></figure>

## Data Structure

Outgoing webhooks will send data in a **POST** request in **JSON** format to your configured URL. Each request has the following format:

```json
{
  "type": "<event_type>",
  "data": "<object>"
}
```

Where `event_type` is an [applicable event](outgoing-webhook.md#applicable-events) and `data` is an alert.

### Example Payload

```json
{
  "type": "alert.resolved",
  "data": {
    "sid":"acc_H1fh_yx6z",
    "id":"alt_HJ3eGW-6M",
    "createdAt": "2018-04-27T00:02:50.419Z",
    "updatedAt": "2018-04-27T00:03:06.098Z",
    "meta": {
      "key": "value",
      ...
    },
    "tinyId": 1,
    "parent_id": "alt_xxxxxxxx",
    "thirdparty_id": "abc-123",
    "destination_ids": ["tem_xxxxxxxxx", "usr_yyyyyyyy", "rtr_zzzzzzzz"],
    "title":"CPU usage over 95%",
    "description":"PROD APP 1 CPU load over 95% for 5 minutes.",
    "type": "alert",
    "subtype": "alert",
    "status":"resolved",
    "urgency":"critical",
    "d_team_id":"tem_ByxQ3ukgTM",
    "d_user_id":"usr_r1mnuJg6z",
    "s_log_id": "log_xxxxxxxxx",

    "created":1524859374,
    "acknowledged":1524859483,
    "acknowledgedby": "usr_xxxxxxxx",
    "resolved":1524859487,
    "resolvedby": "usr_xxxxxxxx",
    "archived": 1524859488,
    "archivedby": "usr_xxxxxxxx",

    "livecall": "QU_XXXX",

    "source_id": "usr_r1mnuJg6z",

    "response_requested": false,
    "responses": ["Yes", "No", ...],
    "responses_recorded": {
      "usr_xxxxxxx": {
        "user_id": "usr_xxxxxxx",
        "value": 1,
        "recorded": 1524859488
      }
      ...
    },

    "tags": ["a", "tag"],
    "additional_data": [{
      "type": "text",
      "label": "Subject",
      "value": "Hello this is a subject"
    }, ...],

    "stakeholder_ids": ["stk_xxxxxxxxx", ...],
    "handoffs": [{
      "to": "usr_xxxxxxx",
      "from": "usr_yyyyyyy",
      "time": 1524859488,
      "acknowledged": 1524859488
    }, ...],
  }
}
```

### Custom Format

Outgoing webhooks can also send data in a custom format. The request is still a **POST** request and must be in **JSON** format.

You can edit the format in the **JSON Template** section of the integration settings.&#x20;

<figure>![ JSON template section.](<../.gitbook/assets/image (2) (1) (1) (1) (1).png>)<figcaption><p>Use a custom format by editing the JSON template section.</p></figcaption></figure>

Templates support Handlebars substitution with the `event` and `alert` objects. You can use any [handlebars-helpers](https://github.com/helpers/handlebars-helpers) to support any logic. Use [JSON dot notation selection](https://lodash.com/docs/4.17.10#get) to access deeply nested data (ex: `alert.d_user.name`).

The data you have access to are the following properties:

```json
{
  alert: {...}, // the PagerTree alert object
  event: {
    type: 'alert.rejected'
  },
}
```

### **Popular Templates**

#### Plain JSON (using triple-stash operator)

:::info
Use the triple-stash \{\{\{ \}\}\} operator to bypass URL encoding.
:::

```handlebars
{{{JSONstringify alert}}}
```

#### Slack (Incoming Webhook)

For the [Slack Incoming Webhook App](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks).

```json
{
  "text": "<https://app.pagertree.com/#/alert/{{alert.id}}|{{alert.title}}> has been {{replace event.type "alert." ""}}"
}
```

#### Referenced Objects

```json
{
  "text": "The alert has been acknowledged by {{alert.d_user.name}}."
}
```

### **Troubleshooting Templates**

If for any reason you do not receive the webhook with a custom template, it is likely you have a formatting error. On the integration page, look at the [integration’s logs](../integrations.md#integration-logs).

1. If you do not see a log, ensure the integration is enabled
2. If you do see a log, view the log by clicking the log link. An error should be provided in the `status` field in the **content** section on the right hand side.

### Linked Data

Linked data is a convenience option that embeds referenced objects. Linked data will send the following extra attributes.

| Extra Attribute | Referenced By |
| --------------- | ------------- |
| d\_team         | d\_team\_id   |
| d\_user         | d\_user\_id   |
| source          | source\_id    |
| s\_log          | s\_log\_id    |

If you are using a custom template you can access the linked data like so: `{{alert.d_user.name}}`.

## Applicable Events

Currently PagerTree support 8 events:

1. `alert.created` - fired exactly once, when the alert is created in the database.
2. `alert.open` - Fired exactly once, when the alert [transitions from queued -> open](../alerts.md#alert-states).
3. `alert.acknowledged` - fired 0-N times, when the alert is [acknowledged](../alerts.md#acknowledge) by a user.
4. `alert.rejected` - can be fired 0-N times, when the alert is [rejected](../alerts.md#reject) by a user.
5. `alert.timeout` - can be fired 0-M times, when an alert layer times out and moves to the next [escalation layer](../escalation-policies.md#escalation-layers).
6. `alert.resolved` - fired 0-1 times, when the alert is [resolved](../alerts.md#resolve).
7. `alert.dropped` - fired 0-1 times, when the alert is [dropped](../alerts.md#alert-states).
8. `alert.handoff` - fired 0-N times, when the alert is [handed off](../alerts.md#handoff).

## Outgoing Rules

You can suppress outgoing webhooks or modify the payload using rules. This feature uses the same engine as the [routers](../routers.md) and is also expressed in YAML. You can use all the same [operators](../routers.md#operators) as routers for matching conditions, but you can only use the [setval](../routers.md#setval) and [ignore](../routers.md#ignore) actions. The root element should always be `rules` (an array), with each rule having a `match` (hash) and `actions` (array).

### Rules Data

When routers are matching rules they are given access to data. Namely you are given access to the `alert`, `integration`, and `event` in context, and a special field `always` which is always true (especially useful for catch all rules).

```json
{
  always: true,
  alert: {...}, // the alert object
  integration: {...}, // the integration object
  event: string // the event name (ex: alert.resolved)
}
```

### Rules Examples

#### Suppress by Source ID

In our most basic example, we can suppress events when the alert is created by a specific integration.

```yaml
# example rule showing how to suppress the outgoing webhook of any alert that is not 'critical'
rules:
  - match:
      alert.source_id: "int_xxxxxxx"
    actions:
     - type: ignore
```

#### Suppress by Urgency

In a second example, we suppress any event that is not “critical”.

```yaml
# example rule showing how to suppress the outgoing webhook of any alert that is from a certain integration
rules:
  - match:
      alert.urgency:
        $ne: critical
    actions:
     - type: ignore
```

#### Set special values

In the next example, we are working with the [Slack (Post to Channel)](slack/post-to-channel.md) integration and we switch the channel PagerTree sends the notification to.

```yaml
# Example rules for the "Slack (Post to Channel)" integration
# To switch the channel the message is sent to.
# Note this won't work with private channels
rules:
  - match:
      alert.d_team_id: "tem_xxx" # Apps Team
    actions:
    - type: setval
      map:
        channel: "C3QCH7S7C" # apps channel
```

### Special Values

There is a special value `webhook_url` that if set using the [setval](../routers.md#setval) operator will change the URL that the webhook is sent to. You can use this to dynamically change where webhooks are sent to.

```yaml
# To switch the channel url the message is sent to.
rules:
  - match:
      alert.d_team_id: "tem_xxx" # Apps Team
    actions:
    - type: setval
      map:
        webhook_url: "https://hooks.slack.com/services/aaa/bbb/ccc" # apps channel webhook

  - match:
      alert.d_team_id: "tem_xxx" # Devops Team
    actions:
    - type: setval
      map:
        webhook_url: "https://hooks.slack.com/services/ddd/eee/fff" # devops channel webhook

  # else, send it to the default url on the webhook
```

## Successful Responses And Limitations

1. Responses in the 2xx family will be considered a success, any other response will be considered a failure.&#x20;
2. Webhooks retries will be attempted up to 14 times with exponential backoff.

***
