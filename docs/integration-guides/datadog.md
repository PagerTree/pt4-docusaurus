---
description: Connect your Datadog alerts to PagerTree.
---

# Datadog

| Company                               | Estimated Time | Vendor Docs                                               | Open Source                                                                                                                |
| ------------------------------------- | -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Datadog](https://www.datadoghq.com/) | 5 minutes      | [view](https://docs.datadoghq.com/integrations/webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/datadog/v3.rb) |

## What is Datadog?

[Datadog](https://www.datadoghq.com/) is a monitoring service for cloud-scale applications, bringing together data from servers, databases, tools, and services to present a unified view of an entire stack.

## How It Works

Datadog triggers user defined alerts by monitoring services and applications.

* When a monitor alert is triggered (`ALERT_TRANSITION === "Triggered"`) in Datadog, an alert is created in PagerTree automatically.
* When a monitor alert is resolved (`ALERT_TRANSITION === "Recovered"`) in Datadog, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Datadog into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Datadog account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Datadog logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Datadog

#### Create the Integration

1.  **Click Menu -> Integrations -> Integration**.

    <figure>![Datadog integrations](<../.gitbook/assets/image (28) (2).png>)<figcaption><p>Navigate to Integrations</p></figcaption></figure>
2.  **Type “webhook”** in the **search bar**, then **click “+Available”**.

    <figure>![datadog webhook integrations](<../.gitbook/assets/image (16) (1).png>)<figcaption><p>Search for the webhook integration.</p></figcaption></figure>
3.  **Click** the **“Configuration” tab**.

    <figure>![webhook configurations](<../.gitbook/assets/image (3) (1) (2).png>)<figcaption><p>Click the configuration tab for the webhook integration.</p></figcaption></figure>
4. Scroll to the bottom and enter in the following values
   1. Name – Give you integration an appropriate name (e.g. “pt\_retail\_team\_integration”)
   2. URL – **Paste** the **PagerTree Endpoint URL** you copied
   3. **Check “Use custom payload”**
   4. **Copy & Paste** the following

```json title="datadog_payload.json" showLineNumbers
{
  "ID": "$ID",
  "EVENT_TITLE": "$EVENT_TITLE",
  "TEXT_ONLY_MSG": "$TEXT_ONLY_MSG",
  "EVENT_TYPE": "$EVENT_TYPE",
  "LAST_UPDATED": "$LAST_UPDATED",
  "AGGREG_KEY": "$AGGREG_KEY",
  "DATE": "$DATE",
  "USER": "$USER",
  "SNAPSHOT": "$SNAPSHOT",
  "LINK": "$LINK",
  "PRIORITY": "$PRIORITY",
  "TAGS": "$TAGS",
  "ALERT_ID": "$ALERT_ID",
  "ALERT_TITLE": "$ALERT_TITLE",
  "ALERT_METRIC": "$ALERT_METRIC",
  "ALERT_SCOPE": "$ALERT_SCOPE",
  "ALERT_QUERY": "$ALERT_QUERY",
  "ALERT_STATUS": "$ALERT_STATUS",
  "ALERT_TRANSITION": "$ALERT_TRANSITION"
}
```

1.  **Click “Install Integration”.**

    <figure>![Datadog PagerTree Integration Configuration](<../.gitbook/assets/image (23) (1).png>)<figcaption><p>Datadog PagerTree Integration Configuration</p></figcaption></figure>
2. **Click outside the modal** to exit.

#### Attach the Integration to a Monitor

:::info
Its necessary the integration be attached to a monitor. The monitor will create an alert that is sent to PagerTree. In this example we actually create a new monitor, but you could just as easily attach it to an existing monitor.
:::

1.  **Click Menu -> Monitors -> New Monitor**.

    <figure>![Datadog new monitor](<../.gitbook/assets/image (31).png>)<figcaption><p>Navigate to new monitor</p></figcaption></figure>
2.  **Click** the appropriate **monitor type** for your scenario (e.g. “Host”).

    <figure>![datadog host monitor type](<../.gitbook/assets/image (4) (1) (2).png>)<figcaption><p>Select the host monitor type.</p></figcaption></figure>
3. Enter in appropriate monitor values for your situation.
   1. Under the “Notify your team” section
      1.  **Select** the **Webhook Integration** you just created (e.g. @webhook-pt\_retail\_team\_integration)

          <figure>![Notify PagerTree when monitor in Datadog fails.](<../.gitbook/assets/image (2) (1) (1) (2) (1).png>)<figcaption><p>Notify PagerTree when monitor in Datadog fails.</p></figcaption></figure>
4. **Click “Save”.**

***

You have successfully completed the Datadog Integration.

***
