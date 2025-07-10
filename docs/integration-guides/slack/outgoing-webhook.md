---
description: Connect your Slack workspace to PagerTree.
---

# Outgoing Webhook

| Company                                        | Estimated Time | Vendor Docs                                                | Open Source                                                                                                                      |
| ---------------------------------------------- | -------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Slack Technologies, Inc.](https://slack.com/) | 5 minutes      | [view](https://slack.com/apps/A0F7VRG6Q-outgoing-webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/slack/webhook/v3.rb) |

## **Important Information**

* Slack -> PagerTree (keyword trigger) - Continue reading this page.
* PagerTree -> Slack (post to channel) - See [Slack Post to Channel Integration](post-to-channel.md).

## How It Works

Slack Outgoing Webhooks triggers a webhook anytime a Slack message _starts with_ configured trigger words.

* An alert will be created in PagerTree when Slack sends an Outgoing Webhook to PagerTree.
* PagerTree will try to extract an urgency from the message text. Valid values are `low|medium|high|critical`. If the urgency is not found in the message text it will default to the integration urgency.

## Integration Walkthrough

In this integration tutorial we will show you how to connect your Slack Outgoing Webhooks integration with PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Slack account setup.

### In PagerTree

1. [Create the integration](../introduction.md#create-an-integration) by clicking the **Slack (Outgoing Webhook) logo**.
2. [Copy the Endpoint URL](../introduction.md#copy-the-endpoint-url)**.**

### **In Slack**

1. Go to [Slack Outgoing Webhooks App Page](https://slack.com/apps/A0F7VRG6Q-outgoing-webhooks)
2.  On the App page, **click “Add Configuration”**

    <figure>![Slack Webhooks](<../../.gitbook/assets/image (8) (1).png>)<figcaption><p>Click "Add Configuration".</p></figcaption></figure>
3.  On the New configuration page, **click “Add Outgoing Webhooks Integration”**

    <figure>![outgoing webhooks](<../../.gitbook/assets/image (5) (1).png>)<figcaption><p>Click "Add Outgoing Webhooks Integration".</p></figcaption></figure>
4. Scroll down the page to the **Integration Settings**
   1. Channel - Select an appropriate **channel** this will apply to, or any for all channels.
   2. Trigger Words - Select the words that trigger the webhook (e.g. outage, sev-1, down).
   3. URL(s) - **Paste** the **PagerTree Endpoint URL** you copied.
   4.  Descriptive Label - Easy to remember label on what this outgoing webhook does.

       <figure>![Slack Outgoing Webhook PagerTree Configuration](<../../.gitbook/assets/image (10).png>)<figcaption><p>Slack Outgoing Webhook PagerTree Configuration</p></figcaption></figure>
5. **Click “Save Settings”**

### **Bonus: Additional Security**

For security purposes, you can also provide PagerTree with the token Slack provides. If using this feature, PagerTree will not create an alert unless the token sent by Slack is the same token that is configured with the integration. This protects against spoofing attacks.

#### **In Slack**

1.  From the App Page, **Copy** the **Token**

    <figure>![Slack Token](<../../.gitbook/assets/image (11) (2).png>)<figcaption><p>Copy the token.</p></figcaption></figure>

#### **In PagerTree**

1. From the Integration Page, **Click Edit.**
2. **Paste** the **Token** that you copied from Slack to the **Token** field.
3. **Click “Update”.**

You have successfully completed the Slack (keyword trigger) Integration.

***
