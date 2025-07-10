---
description: Connect your Pulsetic monitors to PagerTree.
---

# Pulsetic

| Company                               | Estimated Time | Vendor Docs                                                                            | Open Source                                                                                                                 |
| ------------------------------------- | -------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Designmodo](https://designmodo.com/) | 1 minute       | [view](https://help.pulsetic.com/article/20-how-to-set-up-alert-notifications#webhook) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/pulsetic/v3.rb) |

## What is Pulsetic?

Pulsetic is a website uptime monitoring service that offers a user-friendly website monitoring tool.

## How It Works

Pulsetic triggers alerts by monitoring website uptime and certificates.

* When a monitor is offline (`alert_type == "monitor_offline"`) in Pulsetic, an alert is created in PagerTree automatically.
* When a monitor is online (`alert_type == "monitor_online"`) In Pulsetic, the alert is resolved automatically in PagerTree.
* When a check certificate is expiring soon (`alert_type == "certificate_expires_soon"`) in Pulsetic, an alert is created in PagerTree automatically.

## Integration Walkthrough

This integration tutorial will show you how to send alerts from Pulsetic into PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree and Pulsetic account setup. It is also assumed you have created at least 1 Pulsetic monitor. If you need more information on creating a new Pulsetic monitor, please see [Pulsetic's documentation](https://help.pulsetic.com/article/30-get-started-with-pulsetic).

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Pulsetic logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Pusletic

1. **Click Menu -> Monitors**
2.  **Click on a monitor**

    <figure>![Pulsetic Monitor](<../.gitbook/assets/pulsetic-monitors.jpg>)<figcaption><p>Click on your Pulsetic Monitor</p></figcaption></figure>
3. **Click Alerts Tab -> Webhook**
4. **Paste** the **PagerTree Endpoint URL** you copied
5.  **Click Save**

    <figure>![Configure the Pulsetic integration to point to PagerTree](<../.gitbook/assets/pulsetic-configure-webhook.jpg>)<figcaption><p>Configure the Pulsetic webhook to point to PagerTree</p></figcaption></figure>

***

#### Testing

You can test the integration by:

1. Click "Send Offline Request" button (Create)
2. Click "Send Online Request" button (Resolve)
3.  Click "Send Ssl Expires Soon Request" button (Create)

    <figure>![Test your Pulsetic to PagerTree integration](<../.gitbook/assets/pulsetic-test.jpg>)<figcaption><p>Test your Pulsetic to PagerTree Integration</p></figcaption></figure>

***

You have completed the Pulsetic Integration.
