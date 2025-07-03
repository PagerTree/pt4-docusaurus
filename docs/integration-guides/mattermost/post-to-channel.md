---
description: Connect your Mattermost channels to PagerTree.
---

# Post to Channel

| Company                                    | Estimated Time | Vendor Docs                                                            | Open Source                                                                                                                           |
| ------------------------------------------ | -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Mattermost Inc.](https://mattermost.com/) | 5 minutes      | [view](https://developers.mattermost.com/integrate/incoming-webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/channel/mattermost/v3.rb) |

## **Important Information**

* PagerTree -> Mattermost (post to channel) - Continue reading this page.
* Mattermost -> PagerTree (keyword trigger) - See [Mattermost Outgoing Webhooks](outgoing-webhook.md).

## **How It Works**

Messages are sent to Mattermost channels, making sure the right channels are notified of alerts.

* When an alert in PagerTree is opened/acknowledged/resolved/dropped, PagerTree will post a message to a channel of your choice.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from PagerTree into Mattermost channel. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Mattermost account setup.

### In Mattermost

1.  In the top left, click the **hamburger menu icon**, then select **Integrations**.&#x20;

    <figure>![Mattermost Navigation](<../../.gitbook/assets/image (11) (1).png>)<figcaption><p>Navigate to integrations.</p></figcaption></figure>
2.  On the integrations page, click the **Incoming Webhooks**.&#x20;

    <figure>![Mattermost integrations](<../../.gitbook/assets/image (3) (1) (3).png>)<figcaption><p>Click on the incoming webhooks integration.</p></figcaption></figure>
3.  On the Incoming Webhooks page, click the **Add Incoming Webhook** button.&#x20;

    <figure>![mattermost webhook](<../../.gitbook/assets/image (5) (1) (1).png>)<figcaption><p>Click the add incoming webhook button.</p></figcaption></figure>
4. In the Add Form:
   1. **Title** - PagerTree
   2. **Channel** - Select the channel you want PagerTree to post messages to
   3. **Username** - pagertree
   4. **Profile Picture** - https://pagertree.com/assets/img/logo/pagertree-icon-256-256.png
   5.  **Click Save**.&#x20;

       <figure>![Mattermost PagerTree Configuration.](<../../.gitbook/assets/image (8) (4).png>)<figcaption><p>Mattermost PagerTree Configuration.</p></figcaption></figure>
5.  **Click Copy Icon Button**.&#x20;

    <figure>![Webhook URL.](<../../.gitbook/assets/image (13) (1).png>)<figcaption><p>Copy the Webhook URL.</p></figcaption></figure>
6. **Click Done**.

### In PagerTree

1. [Create the integration](../introduction.md#create-an-integration) by clicking the **Mattermost logo**.
2. In the New integration form:
   1. Name - Input a friendly name
   2. **URL -** Paste the Mattermost URL you copied earlier.
   3. **Events -** Select the events you would like to get notified of.&#x20;
3. **Click Create.**

***

You have successfully completed the Mattermost (post to channel) Integration.

#### Outgoing Rules

You can suppress outgoing messages by using the integration outgoing rules (ex: You only want a certain teams messages to a channel). Please see [Outgoing Webhook - Outgoing Rules](../outgoing-webhook.md#outgoing-rules) for full documentation on the functionality.

***
