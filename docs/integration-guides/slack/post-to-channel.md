---
description: Connect your Slack channels to PagerTree.
---

# Post to Channel

| Company                                        | Estimated Time | Vendor Docs                                                | Open Source                                                                                                                      |
| ---------------------------------------------- | -------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Slack Technologies, Inc.](https://slack.com/) | 5 minutes      | [view](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/channel/slack/v3.rb) |

## **Important Information**

* PagerTree -> Slack (post to channel) - Continue reading this page.
* Slack -> PagerTree (keyword trigger) - See [Slack Outgoing Webhooks](outgoing-webhook.md).

## **How It Works**

Messages are sent to Slack Incoming Webhooks that post to channels, making sure the right channels are notified of alerts.

* When an alert in PagerTree is opened/acknowledged/resolved/dropped, PagerTree will post a message to a channel of your choice.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from PagerTree into Slack. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Slack account setup.

### In Slack

1. Go to [Slack Incoming Webhooks App Page](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)
2.  On the App page, **click “Add to Slack”** button.&#x20;

    <figure>![Add the incoming webhook integration to Slack.](<../../.gitbook/assets/image (14).png>)<figcaption><p>Add the incoming webhook integration to Slack.</p></figcaption></figure>
3. On the new app page:
   1. **Select the channel** you want PagerTree to post to.
   2.  **Click Add Incoming Webhooks Integration**&#x20;

       <figure>![Select the channel messages should post to.](<../../.gitbook/assets/image (4) (1).png>)<figcaption><p>Select the channel messages should post to.</p></figcaption></figure>
4. **Scroll down** to the **Integration Settings Section**.
   1. **Customize Name** - PagerTree
   2. **Customize Icon** - [download this image](https://pagertree.com/assets/img/logo/pagertree-icon-256-256.png) and upload it.
   3. Click the **Copy URL** link next to the **Webhook URL**.
   4.  **Click Save Settings Button**.&#x20;

       <figure>![Copy the Slack Webhook URL.](<../../.gitbook/assets/slack-post-to-channel-slack-integration-settings.png>)<figcaption><p>Copy the Slack Webhook URL.</p></figcaption></figure>

### In PagerTree

1. [Create the integration](../introduction.md#create-an-integration) by clicking the **Slack (Post to Channel) logo**.
2. In the New integration form:
   1. Name - Input a friendly name
   2. **URL -** Paste the Slack URL you copied earlier.
   3.  **Events -** Select the events you would like to get notified of.&#x20;

       <figure>![Copy the Slack Webhook URL.](<../../.gitbook/assets/slack-post-to-channel-integration-configuration (1).png>)<figcaption></figcaption></figure>
3. **Click Create.**

You have successfully completed the Slack (post to channel) Integration.

#### Outgoing Rules

You can suppress outgoing messages by using the integration outgoing rules (ex: You only want a certain teams messages to a channel). Please see [Outgoing Webhook - Outgoing Rules](../outgoing-webhook.md#outgoing-rules) for full documentation on the functionality.

***
