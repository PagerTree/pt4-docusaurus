---
description: Connect your Pingdom monitors to PagerTree.
---

# Pingdom

| Company                                | Estimated Time | Vendor Docs                                        | Open Source                                                                                                                |
| -------------------------------------- | -------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Pingdom AB](https://www.pingdom.com/) | 5 minutes      | [view](https://www.pingdom.com/resources/webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/pingdom/v3.rb) |

## What is Pingdom?

[Pingdom](https://www.pingdom.com/) is a service that tracks the uptime, downtime, and performance of websites.

## How It Works

Pingdom triggers user defined alerts by monitoring website uptime, downtime, and performance.

* When an check is down (`previous_state == "UP" && current_state == "DOWN"`) in Pingdom, an alert is created in PagerTree automatically.
* When an check is up (`previous_state == "DOWN" && current_state == "UP"`) in Pingdom, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Pingdom into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Pingdom account setup. It is also assumed you have created at least 1 Pingdom check. If you need more information on how to create a new Pingdom check, please see [Pingdom’s documentation](https://www.pingdom.com/resources/tutorials/how-to-add-check).

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Apex Ping logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Pingdom

1.  **Click Menu -> Integrations -> Integrations**.

    <figure>![Pingdom integrations](<../.gitbook/assets/image (1) (1) (3).png>)<figcaption><p>Navigate to Menu -> Integrations -> Integrations</p></figcaption></figure>
2.  On the Integrations Page **click “Add Integration”**.

    <figure>![Pingdom Add integrations](<../.gitbook/assets/image (2) (3).png>)<figcaption><p>Click the add integration button.</p></figcaption></figure>
3. In the Add Alert box
   1. **Select** Type **“Webhook”**
   2. Name the integration appropriately (ex: PagerTree Integration)
   3. **Paste** the **PagerTree Endpoint URL** you copied for **URL**
   4. Ensure the **Active** checkbox is **checked**
   5.  **Click “Save integration”**

       <figure>![Pingdom PagerTree Integration Configuration](<../.gitbook/assets/image (4) (8).png>)<figcaption><p>Pingdom PagerTree Integration Configuration</p></figcaption></figure>
4. **Navigate** to a **check** and **click “Edit”**.
5. **Scroll** to the **bottom** of the “Edit Check” dialog
   1. Ensure the **integration checkbox** next to your new integration is **checked**.
   2.  **Click “Modify check”.**

       <figure>![Connect checks to PagerTree.](<../.gitbook/assets/image (5) (4).png>)<figcaption><p>Connect checks to PagerTree.</p></figcaption></figure>

***

You have successfully completed the Pingdom Integration.

***
