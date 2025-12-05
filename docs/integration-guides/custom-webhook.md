---
description: >-
  Connect your custom webhooks to PagerTree using our Custom Webhook integration.
  This allows advanced rule-based processing with YAML configurations.
---

# Custom Webhook

| Company       | Estimated Time | Vendor Docs | Open Source                                                                                                                |
| ------------- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| PagerTree LLC | 15 minutes     |             | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/custom_webhook/v3.rb) |

## What Is the Custom Webhook Integration?

The Custom Webhook integration allows you to process arbitrary inbound
webhook payloads using a user-defined YAML configuration. This is useful
when you need conditional logic to automatically create, acknowledge, or
resolve alerts based on the webhook contents.

**Key features include:**

-   **MongoDB-style rule matching** (same [operators](../routers.md#operators) & syntax as
    [Routers](../routers.md)).
-   **Nested JSON support** via `log.data.<field>`.
-   **Handlebars templates** for dynamic fields (see [handlebars](https://handlebarsjs.com/guide/) and [handlebars-helpers](https://github.com/helpers/handlebars-helpers)).
-   **Actions**: `create`, `acknowledge`, `resolve`.
-   **Preprocessors** such as `parse_json` and `parse_sns`.

It integrates with tools like UptimeRobot, AWS SNS, Pingdom, and many more by parsing payloads and applying your rules.

:::info
This documentation is for _incoming custom_ webhooks (that need custom logic) into PagerTree. If you are looking for the PagerTree standard format webhooks, refer to the [webhook documentation](webhook.md). For outgoing webhooks, refer to the [outgoing webhook documentation](outgoing-webhook.md).
:::

## How It Works

1. Your external system sends a `POST` request to PagerTree’s integration endpoint.
2. PagerTree loads your YAML rules.
3. Preprocessors (if any) run first (e.g., `parse_json`, `parse_sns`).
4. Each rule’s `match` block is evaluated against the payload.
5. On the _first_ match, PagerTree performs the specified `actions`.
6. If no rule matches, the optional `default` rule applies.

**Important matching notes:**

- All JSON body payload fields are referenced under `log.data`.
- Supports operators such as:  
  `$eq`, `$regex`, `$gt`, `$in`, `$and`, `$or`, `$not`, `$exists`, and more. (see [routers#operators](../routers.md#operators))
- Handlebars templates allow injecting values directly from payload structure. (see [handlebars](https://handlebarsjs.com/guide/) and [handlebars-helpers](https://github.com/helpers/handlebars-helpers))

## Integration Walkthrough

In this tutorial, we'll set up the Custom Webhook integration in PagerTree and configure the YAML rules. We assume you have a PagerTree account and a custom tool that can send POST webhooks.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Webhook (Custom) logo**.
3. Enter your YAML configuration in the **Custom Definition** field (see examples below).
4. [Copy the PagerTree Endpoint URL](introduction.md#copy-the-endpoint-url) to configure in your source tool.

#### Configure YAML Rules
Define rules in YAML for matching and actions ([see examples below](#examples)). Prefix fields with `log.data` for payload data.


### In Your Source Tool
Configure your tool (e.g., UptimeRobot, AWS SNS, etc.) to send `POST` requests to PagerTree's endpoint URL. The payload will be processed using your YAML rules.

## Examples

### Example: New Relic Integration (YAML)
```yaml

---
rules:
  - match:
      log.data.currentState: "open"
      log.data.severity: "CRITICAL"
    actions:
      - type: create
        title: "{{log.data.accumulations.policyName.[0]}} - {{log.data.accumulations.conditionName.[0]}}"
        description: "{{log.data.annotations.description}} - Details: {{log.data.details}}"
        thirdparty_id: "{{log.data.incidentId}}"
        urgency: "high"
        additional_data:
          - format: link
            label: Incident URL
            value: "{{log.data.incidentUrl}}"
          - format: link
            label: Policy URL
            value: "{{log.data.policyUrl}}"
          - format: text
            label: Targets
            value: "{{log.data.targets.[0].name}} ({{log.data.targets.[0].type}})"

  - match:
      log.data.currentState: "closed"
    actions:
      - type: resolve
        thirdparty_id: "{{log.data.incidentId}}"

default:
  actions:
    - type: ignore
      reason: "Unhandled New Relic alert"
```

### Example: New Relic Integration (cURL)
```bash
curl -X POST https://api.pagertree.com/integration/int_ABC123 \
  -H "Content-Type: application/json" \
  -d '{
  "accumulations": {
    "policyName": [
      "Example Policy"
    ],
    "conditionName": [
      "High Error Rate"
    ]
  },
  "annotations": {
    "description": "Error rate > 5% for 5 minutes",
    "reason": "Threshold exceeded"
  },
  "closedViolations": [],
  "currentState": "open",
  "details": "Error rate is 7.2%",
  "eventType": "INCIDENT",
  "incidentId": "generic-incident-id",
  "incidentUrl": "https://example.com/alerts/generic-id",
  "openViolations": [
    {
      "createdAt": 1733126400000,
      "label": "High Error Rate",
      "violationId": "generic-violation-id"
    }
  ],
  "owner": "alerts@example.com",
  "policyUrl": "https://example.com/policies/generic-policy",
  "severity": "CRITICAL",
  "targets": [
    {
      "id": "generic-entity-id",
      "name": "Example App",
      "type": "Application",
      "link": "https://example.com/entities/generic-entity"
    }
  ],
  "timestamp": 1733126400000,
  "version": 3
}'
```

### Example: AWS SNS Cloudwatch (YAML)

```yaml
---
preprocess:
  - type: parse_sns
rules:
  - match:
      log.data.Type: "Notification"
      log.data.Message.NewStateValue: "ALARM"
    actions:
      - type: create
        title: "{{sanitize log.data.Subject}}"
        description: "{{log.data.Message.NewStateReason}}"
        thirdparty_id: "{{log.data.Message.AlarmArn}}"
        additional_data:
          - format: text
            label: Event Category
            value: "scheduledChange"
          - format: text
            label: Affected Resources
            value: "example-service|example-backend"
          - format: link
            label: Fargate Platform Docs
            value: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform-fargate.html"
          - format: link
            label: Task Maintenance Docs
            value: "https://docs.aws.amazon.com/AmazonECS/latest/userguide/task-maintenance.html"
          - format: link
            label: Service Definition Params
            value: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html#sd-deploymentconfiguration"
          - format: link
            label: Fargate Notifications Blog
            value: "https://aws.amazon.com/blogs/containers/improving-operational-visibility-with-aws-fargate-task-retirement-notifications/"
          - format: link
            label: Create Deployment CLI
            value: "https://docs.aws.amazon.com/cli/latest/reference/deploy/create-deployment.html"
          - format: link
            label: AWS Support
            value: "https://aws.amazon.com/support"

  - match:
      log.data.Type: "Notification"
      log.data.Message.NewStateValue: "OK"
    actions:
      - type: resolve
        thirdparty_id: "{{log.data.Message.AlarmArn}}"
default:
  actions:
    - type: ignore
      reason: "Unhandled AWS Health Event"
```

##### Example: AWS SNS Cloudwatch (cURL)

```bash
curl -X POST http://example.com \
  -H "Content-Type: text/plain" \
  --data-raw '{"Type": "Notification", "MessageId": "[REDACTED]", "TopicArn": "arn:aws:sns:us-west-2:[ACCOUNT_ID]:[TOPIC_NAME]", "Subject": "ALARM: \"[ALARM_NAME]\" in US West (Oregon)", "Message": "{\"AlarmName\": \"[ALARM_NAME]\", \"AlarmDescription\": null, \"AWSAccountId\": \"[ACCOUNT_ID]\", \"AlarmConfigurationUpdatedTimestamp\": \"2025-12-05T21:52:26.532+0000\", \"NewStateValue\": \"ALARM\", \"NewStateReason\": \"Threshold Crossed: 1 out of the last 1 datapoints [[DATAPOINT_VALUE] (05/12/25 21:50:00)] was not less than the threshold (1.0) (minimum 1 datapoint for OK -> ALARM transition).\", \"StateChangeTime\": \"2025-12-05T21:53:58.466+0000\", \"Region\": \"US West (Oregon)\", \"AlarmArn\": \"arn:aws:cloudwatch:us-west-2:[ACCOUNT_ID]:alarm:[ALARM_NAME]\", \"OldStateValue\": \"OK\", \"OKActions\": [\"arn:aws:sns:us-west-2:[ACCOUNT_ID]:[TOPIC_NAME]\"], \"AlarmActions\": [\"arn:aws:sns:us-west-2:[ACCOUNT_ID]:[TOPIC_NAME]\"], \"InsufficientDataActions\": [], \"Trigger\": {\"MetricName\": \"CallCount\", \"Namespace\": \"AWS/Usage\", \"StatisticType\": \"Statistic\", \"Statistic\": \"AVERAGE\", \"Unit\": null, \"Dimensions\": [{\"value\": \"API\", \"name\": \"Type\"}, {\"value\": \"SendLast24Hours\", \"name\": \"Resource\"}, {\"value\": \"SES\", \"name\": \"Service\"}, {\"value\": \"None\", \"name\": \"Class\"}], \"Period\": 60, \"EvaluationPeriods\": 1, \"DatapointsToAlarm\": 1, \"ComparisonOperator\": \"LessThanThreshold\", \"Threshold\": 1.0, \"TreatMissingData\": \"notBreaching\", \"EvaluateLowSampleCountPercentile\": \"\"}}", "Timestamp": "2025-12-05T21:53:58.509Z", "SignatureVersion": "1", "Signature": "[REDACTED]", "SigningCertURL": "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-[REDACTED].pem", "UnsubscribeURL": "https://sns.us-west-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-west-2:[ACCOUNT_ID]:[TOPIC_NAME]:[SUBSCRIPTION_ID]"}'
```

You have successfully completed the Custom Webhook Integration.

## YAML Syntax Reference

### Rule Structure

``` yaml
preprocess:
  # preprocessors
  # - type: parse_sns
rules:
  - match:
      # conditions (see your specific tool's payload)
      # log.data.state: "alarm"
    actions:
      - type: create|acknowledge|resolve
        thirdparty_id: "{{log.data.id}}"
default:
  actions:
    - type: ignore
```

### Preprocessors

 | Preprocessor | Description |
 | ------------ | ----------- |
 | `parse_json` | Converts a raw string into JSON. |
 | `parse_sns` | Processes AWS SNS payloads and parses the Notification `Message`. |

### Action Fields

| Field               |Type           | Purpose |
| ------------------- | ------------- | ----------------------------------------------- |
| `type`              | string | `create`, `acknowledge`, `resolve` |
| `thirdparty_id`     | string | Identifier used for alert correlation. (see [integrations@alert-aggregation](../integrations.md#alert-aggregation)) |
| `title`             | string | Alert title. |
| `description`       | string | Alert description. |
| `urgency`           | enum | `critical`, `high`, `medium`, `low`, `silent` |
| `tags`              | list/string | Alert tags. List (array). String (comma delimited) |
| `meta`              | object | Additional metadata (hash) |
| `additional_data`   | list | Supplemental visual fields (object) `{format: "text\|link\|img\|email\|phone\|datetime", label: "string", value: "string"}` |
| `dedup_keys` | list/string | Global deduplication keys. List (array). String (command delimiated) |
| `incident`| boolean | Boolean value `true\|false` if this alert should be flagged as an incident |
| `incident_severity` | string | `SEV-1`, `SEV-2`, `SEV-3`, `SEV-4`, `SEV-5` |
| `incident_message` | string | A custom message to be displayed at the top of the alert page |
