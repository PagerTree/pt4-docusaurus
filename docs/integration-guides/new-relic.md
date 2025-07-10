---
description: Connect your New Relic alerts to PagerTree.
---

# New Relic

| Company                                  | Estimated Time | Vendor Docs                                                                                                                                           | Open Source                                                                                                                   |
| ---------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [New Relic, Inc.](https://newrelic.com/) | 5 minutes      | [view](https://docs.newrelic.com/docs/alerts/new-relic-alerts/managing-notification-channels/notification-channels-control-where-send-alerts#webhook) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/new\_relic/v3.rb) |

## What is New Relic?

[New Relic](https://newrelic.com/) is a digital intelligence platform that lets developers, ops, and tech teams measure and monitor the performance of their applications and infrastructure.

## How It Works

New Relic creates alerts.

* When an incident is created (`event_type == "INCIDENT_OPEN" || (event_type == "INCIDENT" && current_state == "open") || (state == "CREATED" || state == "ACTIVATED")`) in New Relic, an alert is created in PagerTree automatically.
* When an incident is acknowledged (`event_type == "INCIDENT_ACKNOWLEDGED" || (event_type == "INCIDENT" && current_state == "acknowledged")`) in New Relic, an alert is acknowledged in PagerTree automatically.
* When an incident is resolved (`event_type == "INCIDENT_RESOLVED" || (event_type == "INCIDENT" && current_state == "closed") || state == "CLOSED"`) in New Relic, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from New Relic into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and New Relic account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **New Relic logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In New Relic

#### Add a Webhook Destination

1.  Navigate to **Alerts & AI -> Destinations -> Webhook**

    <figure>![New Relic Webhook](<../.gitbook/assets/image (3).png>)<figcaption><p>Navigate to Alerts &#x26; AI -> Destinations -> Webhook</p></figcaption></figure>
2. In the Add a destination form
   1. Webhook Name - PagerTree
   2. Endpoint URL - **Paste** the **PagerTree Endpoint URL** you copied
   3.  Click **Save Destination**

       <figure>![New Relic PagerTree Configuration](<../.gitbook/assets/image (27).png>)<figcaption><p>New Relic PagerTree Configuration</p></figcaption></figure>

#### Connect Webhook Destination To Alert Policy

1.  Navigate to **Alerts & AI -> Alert conditions (Policies) -> Notification Settings.**

    <figure>![New Relic Alert](<../.gitbook/assets/image (28).png>)<figcaption><p>Navigate to Alerts &#x26; AI -> Alert conditions (Policies) -> Notification Settings</p></figcaption></figure>
2. **Click "Create workflow" button.**
3.  **Click "Webhook"**

    <figure>![New Relic Webhook](<../.gitbook/assets/image (19).png>)<figcaption><p>In the new workflow, click Webhook.</p></figcaption></figure>
4. In the Edit notification message form
   1. Name - PagerTree
   2. Destination - **PagerTree** (this is the Webhook destination you created above)
   3. Payload Template - Use the default.
   4.  **Click "Save Message"**

       <figure>![PagerTree Notification](<../.gitbook/assets/image (7).png>)<figcaption><p>Configure the PagerTree Notification</p></figcaption></figure>
5.  Click the **"..." ellipses on the right to change the "Notify when.."**

    1. **Select** only **activated, acknowledged, and closed**.

    <figure>![Select when to notify.](<../.gitbook/assets/image (11).png>)<figcaption><p>Select when to notify.</p></figcaption></figure>

You have successfully completed the New Relic Integration.

***
