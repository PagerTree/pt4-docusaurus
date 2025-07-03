---
description: Connect your Cronitor alerts to PagerTree.
---

# Cronitor

| Company                             | Estimated Time | Vendor Docs                                     | Open Source                                                                                                                 |
| ----------------------------------- | -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Cronitor.io](https://cronitor.io/) | 5 minutes      | [view](https://cronitor.io/docs/using-webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/cronitor/v3.rb) |

## What is Cronitor?

[Cronitor](https://cronitor.io/) is a web-based tracking application that monitors, alerts, and analyzes scheduled computer processes. The application informs its users when their computer processes do not run on time, take too long to run, and gets completed too quickly.

## **How It Works**

Cronitor triggers user defined alerts when monitors fail.

* When a check is failing in Cronitor, an alert is created in PagerTree automatically.
* When a check comes back to a passing state in Cronitor, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Cronitor into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Cronitor account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Apex Ping logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Cronitor**

1.  Navigate to **Settings -> Alerts**.&#x20;

    <figure>![Cronitor Dashboard](<../.gitbook/assets/image (13) (1) (3).png>)<figcaption><p>Navigate to Settings -> Alerts</p></figcaption></figure>
2.  **Click Edit** on the **Default notification list**.&#x20;

    <figure>![Cronitor Default notifications ](<../.gitbook/assets/image (11) (3).png>)<figcaption><p>Edit the default notification list.</p></figcaption></figure>
3.  **Paste** the **PagerTree Endpoint URL** you copied into **Webhook Endpoints.**&#x20;

    <figure>![Cronitor PagerTree Webhook Configuration](<../.gitbook/assets/image (1) (6).png>)<figcaption><p>Cronitor PagerTree Webhook Configuration</p></figcaption></figure>
4. **Click Save Notification List**.

You have successfully completed the Cronitor Integration.

***
