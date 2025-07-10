---
description: Connect your UptimeRobot monitors to PagerTree.
---

# UptimeRobot

| Company                                                        | Estimated Time | Vendor Docs                                                               | Open Source                                                                                                                      |
| -------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Uptime Robot Service Provider Ltd.](https://uptimerobot.com/) | 5 minutes      | [view](https://blog.uptimerobot.com/web-hook-alert-contacts-new-feature/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/uptime\_robot/v3.rb) |

## What is UptimeRobot?

[UptimeRobot](https://uptimerobot.com/) provides a free website monitoring service, supporting multiple monitoring types including HTTP, keyword, ping, and port.

## How It Works

UptimeRobot triggers user defined alerts by monitoring websites.

* When a monitor is Down (`alertTypeFriendlyName == 'Down'`) in UptimeRobot, an alert is created in PagerTree automatically.
* When a monitor is Up (`alertTypeFriendlyName == 'Up'`) in UptimeRobot, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from UptimeRobot into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and UptimeRobot account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **UptimeRobot logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

:::info
For this integration, the Endpoint URL should end with "/g?"
:::

### **In UptimeRobot**

1. Click [**My Settings**](https://uptimerobot.com/dashboard.php#mySettings) from the top navigation bar.
2.  On the right hand side, under the **Alert Contacts** section, click the **Add Alert Contact** button.

    <figure>![Uptime Robot](<../.gitbook/assets/image (17) (2) (1).png>)<figcaption><p>My Settings -> Alert Contacts -> Add Alert Contact</p></figcaption></figure>
3. On the **New Alert Contact Form**
   1. Alert Contact Type - **Webhook**
   2. Friendly Name - Name the Contact (e.g. “PagerTree Webhook”)
   3. URL to Notify - **Paste** the **PagerTree Endpoint URL** you copied for the **Endpoint URL**
   4. Enabled notifications for - **Up & down events**
   5.  **Click “Create Alert Contact”** button

       <figure>![UptimeRobot PagerTree Alert Contact Configuration](<../.gitbook/assets/image (16) (1) (2).png>)<figcaption><p>UptimeRobot PagerTree Alert Contact Configuration</p></figcaption></figure>
4.  From the left hand monitors menu, select the monitor you wish to forward to PagerTree and click **Edit**

    <figure>![Edit monitors that need to send PagerTree alerts.](<../.gitbook/assets/image (20) (1) (1).png>)<figcaption><p>Edit monitors that need to send PagerTree alerts.</p></figcaption></figure>
5. On the **Edit Monitor Form**
   1. Under the Select “Alert Contacts To Notify” section, ensure the **PagerTree** contact is **checked**
   2.  Click the **Save Changes** button

       <figure>![Add PagerTree as an alert contact on the monitor.](<../.gitbook/assets/image (19) (2).png>)<figcaption><p>Add PagerTree as an alert contact on the monitor.</p></figcaption></figure>

***

You have successfully completed the UptimeRobot Integration.

***
