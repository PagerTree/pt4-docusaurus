---
description: Connect your Apex Ping alerts to PagerTree.
---

# Apex Ping

| Company                           | Estimated Time | Vendor Docs                                 | Open Source                                                                                                                   |
| --------------------------------- | -------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Apex Software](https://apex.sh/) | 5 minutes      | [view](https://apex.sh/docs/ping/webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/apex\_ping/v3.rb) |

## What is Apex Ping?

[Apex Ping](https://apex.sh/ping/) provides uptime monitoring for websites and APIs. It has flexible alerting, rich reporting, and weekly summaries.

## How It Works

Apex Ping triggers user defined alerts by monitoring website & API uptime.

* When a monitor alert is triggered (`'Triggered'` state) in Apex Ping, an alert is created in PagerTree automatically.
* When a monitor alert is resolved (`'Resolved'` state) in Apex Ping, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Apex Ping into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Apex Ping account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Apex Ping logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Apex Ping**

1.  **Click Menu -> Alerts**

    <figure>![Apex Ping Alerts](<https://pagertree.com/assets/img/integrations/apex-ping/click-alerts.png>)<figcaption></figcaption></figure>
2.  On the Alerts Page **click “Add Alert +”**

    <figure>![Apex Ping Add Alert](<https://pagertree.com/assets/img/integrations/apex-ping/click-add-alert.png>)<figcaption></figcaption></figure>
3. In the Add Alert box
   1. **Select “Webhook”**
   2. **Paste** the **PagerTree Endpoint URL** you copied
   3. **Select** the **APEX Ping check** you would like to apply this to
   4. **Configure** the **parameters** that are appropriate to fire this alert ![Add Alert](https://pagertree.com/assets/img/integrations/apex-ping/add-alert.png)
4. **Click “Save”**

***

You have successfully completed the Apex Ping Integration.

***
