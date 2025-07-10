---
description: Connect your Hydrozen monitors to PagerTree.
---

# Hydrozen

| Company                              | Estimated Time | Vendor Docs                                                     | Open Source                                                                                                                 |
| ------------------------------------ | -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Hydrozen LLC](https://hydrozen.io/) | 1 minute       | [view](https://docs.hydrozen.io/overview/integrations/webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/hydrozen/v3.rb) |

## What is Hydrozen?

[Hydrozen](https://hydrozen.io/) is a simple uptime monitoring and status page software.

## How It Works

Hydrozen triggers user-defined notifications by monitoring websites.

* When a website, ping, port, or heartbeat monitor is down ("not ok") in Hydrozen, an alert is created in PagerTree automatically.
* When a website, ping, port, or heartbeat monitor is up ("ok")  in Hydrozen, the alert is resolved in PagerTree automatically.
* When a domain or SSL monitor triggers an expiration notification in Hydrozen, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send notifications from Hydrozen into PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree and Hydrozen account set up.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Hydrozen logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Hydrozen**

#### Create the Notification Handler

1.  From the **Left Menu, click Notification handlers.**

    <figure>![From the Left Menu, click Notification handlers. ](<../.gitbook/assets/hydrozen-navigate-to-notification-handlers.png>)<figcaption><p>From the Left Menu, click Notification handlers.</p></figcaption></figure>
2.  Click **Create notification handler button**.

    <figure>![Click Create notification handler button.](<../.gitbook/assets/create-notification-handler-button.png>)<figcaption><p>Click Create notification handler button.</p></figcaption></figure>
3. In the create a new notification handler form
   1. Name - Something descriptive (ex: "PagerTree")
   2. Notification type - Webhook
   3. Webhook URL - Paste the PagerTree Endpoint URL you copied
4.  **Click Create.**

    <figure>![New Notification Handler Form](<../.gitbook/assets/create-notification-handler-form.png>)<figcaption><p>New Notification Handler Form</p></figcaption></figure>

#### Attach Notification Handler to Monitors

1. From the **Left Menu, navigate to any of your monitors** (e.g., Uptime monitors).
2. **Select a monitor**.
3.  **Click** the **Edit button**.

    <figure>![Click edit monitor button.](<../.gitbook/assets/click-edit-website-button.png>)<figcaption><p>Click edit monitor button.</p></figcaption></figure>
4.  **Check** the newly created **Notification Handler** and **click Update**.

    <figure>![Attach notification handler to uptime check.](<../.gitbook/assets/edit-website-check.png>)<figcaption><p>Attach notification handler to uptime check.</p></figcaption></figure>

You have successfully completed the Hydrozen integration.

***
