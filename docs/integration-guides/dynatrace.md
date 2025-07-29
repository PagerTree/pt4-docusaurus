---
description: Connect your Dynatrace problems to PagerTree.
---

# Dynatrace

| Company                             | Estimated Time | Vendor Docs                                     | Open Source                                                                                                                 |
| ----------------------------------- | -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Dynatrace](https://www.dynatrace.com/) | 5 minutes      | [view](https://docs.dynatrace.com/docs/analyze-explore-automate/notifications-and-alerting/problem-notifications/webhook-integration) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/dynatrace/v3.rb) |

## What is Dynatrace?

[Dynatrace](https://www.dynatrace.com/) is a software intelligence platform that provides monitoring and analytics for applications, infrastructure, and user experience. It helps organizations optimize their digital performance and resolve issues quickly.

## How It Works

Dynatrace triggers user-defined problem notifications when problems are detected.

* When a problem notification is `OPEN` in Dynatrace, an alert is created in PagerTree automatically.
* When the problem notification is `RESOLVED` in Dynatrace, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send problem notifications from Dynatrace into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Dynatrace account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Dynatrace logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)

### In Dynatrace

1. Go to **Settings > Integration > Problem notifications**.
2. Select **Add notification**.
3. Select **Custom integration** from the available notification types.
4. Configure the webhook settings:
   - **Display Name**: Enter a name for the integration (e.g., "PagerTree").
   - **Webhook URL**: Paste the **PagerTree Endpoint URL** you copied.
   - **Custom Payload**: Use the following JSON template:

```json
{
    "ImpactedEntities": {ImpactedEntities},
    "ImpactedEntity": "{ImpactedEntity}",
    "PID": "{PID}",
    "ProblemDetailsHTML": "{ProblemDetailsHTML}",
    "ProblemDetailsJSON": {ProblemDetailsJSON},
    "ProblemID": "{ProblemID}",
    "ProblemImpact": "{ProblemImpact}",
    "ProblemTitle": "{ProblemTitle}",
    "Problem URL": "{ProblemURL}",
    "State": "{State}",
    "Tags": "{Tags}"
}
```

:::tip
Payload variables are documented in the [Dynatrace documentation](https://docs.dynatrace.com/docs/discover-dynatrace/references/dynatrace-api/environment-api/settings/schemas/builtin-problem-notifications) under the `WebHookNotification` object.
:::

***

You have successfully completed the Dynatrace Integration.

***
