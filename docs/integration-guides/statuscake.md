---
description: Connect your StatusCake alerts to PagerTree.
---

# StatusCake

| Company                                             | Estimated Time | Vendor Docs                                                                       | Open Source                                                                                                                     |
| --------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [TrafficCake Limited.](https://www.statuscake.com/) | 5 minutes      | [view](https://www.statuscake.com/kb/knowledge-base/how-to-use-the-web-hook-url/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/status\_cake/v3.rb) |

## What is StatusCake?

[StatusCake](https://www.statuscake.com/) provides a website monitoring service, providing you various kinds of statistics, analytics and information about your website\`s downtime.

## How It Works

StatusCake triggers user defined alerts by monitoring websites.

* When a test alert status is Down (`Status == 'Down'`) in StatusCake, an alert is created in PagerTree automatically.
* When a test alert status is Up (`Status == 'Up'`) in StatusCake, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from StatusCake into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and StatusCake account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **StatusCake logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In StatusCake

#### Create the Contact Group

1. **Click Menu -> Alerting -> Contact Groups -> New Contact Group**
2. **Paste** the **PagerTree Endpoint URL** you copied for the **Webhook URL**
3. Ensure the **Webhook Method** is **POST**
4.  **Click “Save Now”** button

    <figure>![StatusCake PagerTree Contact Group](<../.gitbook/assets/image (2) (4) (2).png>)<figcaption><p>StatusCake PagerTree Contact Group</p></figcaption></figure>

#### Attach Contact Group to Test

1. **Click Menu -> Monitoring -> Uptime . New Uptime test**
2. On the **Test Page**
   1. Enter the Required Details as applicable to your situation
   2. **Select** the **Contact Groups** you created previously (e.g. “PagerTree”)
   3.  **Click "Create test"** button

       <figure>![Connect the PagerTree contact group to the StatusCake test.](<../.gitbook/assets/image (1) (4) (2).png>)<figcaption><p>Connect the PagerTree contact group to the StatusCake test.</p></figcaption></figure>

You have successfully completed the StatusCake Integration.

***
