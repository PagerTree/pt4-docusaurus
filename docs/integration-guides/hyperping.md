---
description: Connect your Hyperping events to PagerTree using our Hyperping Integration. Start benefiting from PagerTree's rich alert notification system now.
---

# Hyperping

| Company                                   | Estimated Time | Vendor Docs                                                                                            | Open Source                                                                                                                  |
| ----------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| [Hyperping](https://hyperping.io/) | 5 minutes      | [view](https://hyperping.io/docs/integrations/webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/hyperping/v3.rb) |

## What is Hyperping?
[Hyperping](https://hyperping.io/) provides uptime monitoring for websites and APIs.

## How Hyperping users benefit from PagerTree
Hyperping triggers alerts by monitoring website & API uptime. PagerTree acts as the dispatcher for these alerts, determining the right people to notify based on on-call schedules. PagerTree notifies them via email, sms, voice, and/or push notifications until the alert is acknowledged or closed.

## How It Works
The Hyperping integration is one-way, meaning:
* When a `check.down` event is received from a Hyperping monitor, an alert is created in PagerTree automatically.
* When a `check.up` event is received from a Hyperping monitor, the alert is resolved in PagerTree automatically.

## Integration Walkthrough
In this integration tutorial we will show you how to send alerts from Hyperping into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Hyperping account setup.


#### In PagerTree
1. [Create the integration](introduction.md#create-an-integration) by clicking the **Hyperping logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

#### In Hyperping
1. In the upper left hand corner project select, **Select** the appropriate **project**.
![Select Project](https://pagertree.com/assets/img/integrations/hyperping/select-project.png)
1. In the navigation menu on the left **click** the **Project Settings** link.
![Select Project Settings](https://pagertree.com/assets/img/integrations/hyperping/select-project-settings.png)
1. In the **Webhook** input box, **Paste** the **PagerTree Endpoint URL** you copied.
![Paste Endpoint URL](https://pagertree.com/assets/img/integrations/hyperping/paste-endpoint-url.png)
1. **Click “Save Changes”**
![Save Changes Button](https://pagertree.com/assets/img/integrations/hyperping/save-changes-button.png)

