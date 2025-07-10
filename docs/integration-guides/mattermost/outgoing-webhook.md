---
description: Connect your Mattermost workspace to PagerTree.
---

# Outgoing Webhook

| Company                                    | Estimated Time | Vendor Docs                                                          | Open Source                                                                                                                                  |
| ------------------------------------------ | -------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mattermost Inc.](https://mattermost.com/) | 5 minutes      | [view](https://docs.mattermost.com/developer/webhooks-outgoing.html) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/mattermost/outgoing_webhook/v3.rb) |

## Important Information

* Mattermost -> PagerTree (keyword trigger) - Continue reading this page.
* PagerTree -> Mattermost (post to channel) - See [Mattermost Integration](post-to-channel.md).

## How It Works

Mattermost Outgoing Webhooks triggers a webhook anytime a Mattermost message _starts with_ configured trigger words.

* An alert will be created in PagerTree when Mattermost sends an Outgoing Webhook to PagerTree.
* PagerTree will try to extract an urgency from the message text. Valid values are `low|medium|high|critical`. If the urgency is not found in the message text it will default to the integration urgency.

## Integration Walkthrough

In this integration tutorial we will show you how to connect your Mattermost Outgoing Webhooks integration with PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Mattermost account setup.

### In PagerTree

1. [Create the integration](../introduction.md#create-an-integration) by clicking the **Mattermost (Outgoing Webhook) logo**.
2. [Copy the Endpoint URL](../introduction.md#copy-the-endpoint-url)**.**

### In Mattermost

1.  Go to Menu and choose **Integrations.**

    <figure>![Mattermost navigation](<../../.gitbook/assets/image (19) (5).png>)<figcaption><p>Navigate to integrations.</p></figcaption></figure>
2.  At the following screen choose **Outgoing Webhooks.**

    <figure>![Mattermost Outgoing Webhooks](<../../.gitbook/assets/image (9) (5).png>)<figcaption><p>Click on "Outgoing Webhooks".</p></figcaption></figure>
3.  Click the button on the top right **Add Outgoing Webhook.**

    <figure>![Mattermost Add Outgoing Webhook](<../../.gitbook/assets/image (2) (2) (2).png>)<figcaption><p>Click "Add Outgoing Webhook" button.</p></figcaption></figure>
4. Setup the outgoing webhook
   1. Content Type - Specify **application/json**.
   2. Channel - Select an appropriate **channel** this will apply to, or any for all channels.
   3. Trigger Words - Select the words that trigger the webhook (e.g. outage, sev-1, down).
   4.  URL(s) - **Paste** the **PagerTree Endpoint URL** you copied.

       <figure>![Mattermost Outgoing Webhook PagerTree Configuration.](<../../.gitbook/assets/image (7) (3).png>)<figcaption><p>Mattermost Outgoing Webhook PagerTree Configuration.</p></figcaption></figure>
5. Click **Save.**
6. On the next screen **Copy** the **Token** value, as this can be used for the [additional security step](outgoing-webhook.md#bonus-additional-security) below. ![Copy Token](<../../.gitbook/assets/image (22).png>)

### Bonus: Additional Security

For security purposes, you can also provide PagerTree with the token Mattermost provides. If using this feature, PagerTree will not create an alert unless the token sent by Mattermost is the same token that is configured with the integration. This protects against spoofing attacks.

#### In PagerTree

1. From the Integration Page, **Click Edit.**
2. **Paste** the **Token** that you copied from Mattermost to the **Token** field.
3. **Click “Update”.**

You have successfully completed the Mattermost (keyword trigger) Integration.

***
