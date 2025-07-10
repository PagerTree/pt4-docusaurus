---
description: Connect your Uptime monitors to PagerTree.
---

# Uptime

| Company                           | Estimated Time | Vendor Docs                                                                                                | Open Source                                                                                                               |
| --------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Uptime.com](https://uptime.com/) | 5 minutes      | [view](https://support.uptime.com/hc/en-us/articles/115002560845-Configuring-Custom-Postback-URL-Webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/uptime/v3.rb) |

## What is Uptime?

[Uptime](https://uptime.com/) checks your website availability at one minute intervals from 30 different locations across 6 continents. Uptime & performance monitoring made easy.

## How It Works

Uptime triggers user defined alerts by monitoring websites.

* When a check is Down (`type == 'alert_raised'`) in Uptime, an alert is created in PagerTree automatically.
* When a check is Up (`type == 'alert_cleared'`) in Uptime, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Uptime into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Uptime account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Uptime logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Uptime

1.  Click **Notifications -> Integrations** from the navigation bar.

    <figure>![Uptime Add an Integration Profile](<../.gitbook/assets/image (3) (5).png>)<figcaption><p>Add an Integration Profile</p></figcaption></figure>
2. In the upper right hand corner, click **Add Integration Profile**
   1. Select the Provider Type - **Custom Postback URL (Webhook)**
   2. Name - Name the Integration Profile (e.g. “PagerTree”)
   3. Assign to Contacts - **Default**
   4. URL - **Paste** the **PagerTree Endpoint URL** you copied for the **Endpoint URL**
   5.  **Click “Save”** button

       <figure>![Uptime PagerTree Integration Profile](<../.gitbook/assets/image (15) (2).png>)<figcaption><p>Uptime PagerTree Integration Profile</p></figcaption></figure>

***

You have successfully completed the Uptime Integration.

***
