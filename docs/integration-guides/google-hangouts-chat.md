---
description: Connect your Google Hangouts Chat rooms to PagerTree.
---

# Google Hangouts Chat

| Company                                                   | Estimated Time | Vendor Docs                                                          | Open Source                                                                                                                       |
| --------------------------------------------------------- | -------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [Alphabet Inc.](https://gsuite.google.com/products/chat/) | 5 minutes      | [view](https://developers.google.com/hangouts/chat/how-tos/webhooks) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/channel/hangouts/v3.rb) |

## What is Google Hangouts Chat?

[Google Hangouts Chat](https://gsuite.google.com/products/chat/) makes it easy for teams to be able to get their work done in one place. From direct messages to group conversations, Chat helps teams collaborate easily and efficiently.

## How It Works

Messages are sent to Google Hangouts Chat chat rooms, making sure the right rooms are notified of alerts.

* When an alert in PagerTree is opened/acknowledged/resolved/dropped, PagerTree will post a message to a room of your choice.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from PagerTree into Google Hangouts Chat room. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Google Hangouts Chat account setup.

### In Google Hangouts Chat

1.  In the left hand navigation **select a room**.

    <figure>![Google hangout room](<../.gitbook/assets/image (10) (2).png>)<figcaption><p>Select a room.</p></figcaption></figure>
2.  In the top navbar, click the **room options menu**, then select **Configure webhooks**.

    <figure>![google hangouts Configure webhooks](<../.gitbook/assets/image (10) (6).png>)<figcaption><p>Click "Configure webhooks".</p></figcaption></figure>
3. In the form:
   1. **Name** - PagerTree
   2. **Avatar URL** - https://pagertree.com/assets/img/logo/pagertree-icon-256-256.png
   3.  **Click Save**.

       <figure>![google hangouts PagerTree webhook](<../.gitbook/assets/image (1) (2) (1) (4).png>)<figcaption><p>Configure the incoming PagerTree webhook.</p></figcaption></figure>
4.  **Click Copy Button**.

    <figure>![Google Hangouts Chat URL](<../.gitbook/assets/image (4) (2) (2).png>)<figcaption><p>Copy the Google Hangouts Chat URL.</p></figcaption></figure>

### **In PagerTree**

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Google Hangouts Chat logo**.
2. In the New integration form:
   1. Name - Input a friendly name
   2. **URL -** Paste the Google Hangouts Chat URL you copied earlier.
   3. **Events -** Select the events you would like to get notified of. ![PagerTree Integrations](<../.gitbook/assets/image (21) (3).png>)
3. **Click Create.**

***

You have successfully completed the Google Hangouts Chat Integration.

#### Outgoing Rules

You can suppress outgoing messages by using the integration outgoing rules (ex: You only want a certain teams messages to a channel). Please see [Outgoing Webhook - Outgoing Rules](outgoing-webhook.md#outgoing-rules) for full documentation on the functionality.

***
