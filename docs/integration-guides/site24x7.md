---
description: Connect your Site24x7 monitors to PagerTree.
---

# Site24x7

| Company                                                 | Estimated Time | Vendor Docs                                                                       | Open Source                                                                                                                 |
| ------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Zoho Corporation Pvt. Ltd.](https://www.site24x7.com/) | 5 minutes      | [view](https://www.site24x7.com/help/admin/third-party-integration/webhooks.html) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/site24x7/v3.rb) |

## What is Site24x7?

[Site24x7](https://www.site24x7.com/) is a full stack performance monitoring solutions company. The company provides monitoring solutions such as mobile, website and web application monitoring, server and network monitoring, public and private cloud monitoring, and application performance monitoring in one console.

## **How It Works**

Site24x7 triggers user defined alerts by monitoring website uptime, downtime, and performance.

* When monitor is down (`STATUS == "DOWN"`) in Site24x7, an alert is created in PagerTree automatically.
* When monitor is up (`STATUS == "UP"`) in Site24x7, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alarms from Site24x7 into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Site24x7 account setup. It is also assumed you have created at least 1 Site24x7 monitor. If you need more information on how to create a new monitor, please see [Site24x7’s documentation](https://www.site24x7.com/help/admin/adding-a-monitor.html).

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Site24x7 logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Site 24x7**

1.  **Admin -> Third Party Integration**.&#x20;

    <figure>![Site24x7](<../.gitbook/assets/image (1) (2) (1) (3) (1).png>)<figcaption><p>Navigate to Admin -> Third Party Integration</p></figcaption></figure>
2.  On the Integrations Page **click “Add Third Party Integration”**.&#x20;

    <figure>![Third Party Integration button](<../.gitbook/assets/image (5) (2) (2).png>)<figcaption><p>Click the Add Third Party Integration button.</p></figcaption></figure>
3.  On the Integrations Type Page **click “Webhooks”**.&#x20;

    <figure>![Webhooks](<../.gitbook/assets/image (2) (3) (1).png>)<figcaption><p>Click Webhooks</p></figcaption></figure>
4. On the Webhooks Page
   1. Integration Name - **PagerTree**
   2. Hook URL - **Paste** the **PagerTree Endpoint URL** you copied for **URL**
   3. HTTP Method - **POST**
   4. Post as JSON - **checked**
   5. Send Incident Parameters - **checked**
   6.  **Click Save**.&#x20;

       <figure>![Site 24x7 PagerTree Integration Configuration](<../.gitbook/assets/image (6) (1).png>)<figcaption><p>Site 24x7 PagerTree Integration Configuration</p></figcaption></figure>

***

You have successfully completed the Site 24x7 Integration.

***
