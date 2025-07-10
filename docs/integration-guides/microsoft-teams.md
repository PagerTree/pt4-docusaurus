---
description: Connect your Microsoft Team channels to PagerTree.
---

# Microsoft Teams

| Company                                                                                                    | Estimated Time | Vendor Docs | Open Source                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [Microsoft Corporation](https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software) | 5 minutes      |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/channel/microsoft\_teams/v3.rb) |

## What is Microsoft Teams?

[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/group-chat-software) is a unified communication and collaboration platform that combines persistent workplace chat, video meetings, file storage, and application integration.

## How It Works

Messages are sent to Microsoft Teams channels, making sure the right channels are notified of alerts.

* When an alert in PagerTree is opened/acknowledged/resolved/dropped, PagerTree will post a message to a channel of your choice.

## Integration Walkthrough

In this integration tutorial, we will show you how to send alerts from PagerTree into Microsoft Teams channel. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Microsoft Teams account setup.

### In Microsoft Teams

1.  From the left hand menu bar, navigate to the team channel you would like PagerTree to post to: **Teams -> Team -> Channel -> Workflows.**

    <figure>![Select the team channel you would like PagerTree to post to.](<../.gitbook/assets/image (69).png>)<figcaption><p>Select the team channel you would like PagerTree to post to.</p></figcaption></figure>
2.  **Search and Select** for the following: "**Post to a channel when a webhook request is received.**"

    <figure>![Search and select for the &#x22;Post to a channel when a webhook request is received&#x22;.](<../.gitbook/assets/image (70).png>)<figcaption><p>Search and select for the "Post to a channel when a webhook request is received".</p></figcaption></figure>
3.  Give the workflow a name. (e.g. PagerTree). Click "Next".

    <figure>![Give the workflow a name.](<../.gitbook/assets/image (71).png>)<figcaption><p>Give the workflow a name.</p></figcaption></figure>
4.  Confirm the Team and Channel. Click "Add workflow".

    <figure>![Confirm the Team and Channel this will post to.](<../.gitbook/assets/image (72).png>)<figcaption><p>Confirm the Team and Channel this will post to.</p></figcaption></figure>
5.  **Copy the webhook URL**. Click "Done".

    <figure>![Copy the webhook URL.](<../.gitbook/assets/image (73).png>)<figcaption><p>Copy the webhook URL.</p></figcaption></figure>

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Microsoft Teams logo**.
2. In the New integration form:
   1. Name - Input a friendly name
   2. **URL -** Paste the Microsoft Teams URL you copied earlier.
   3.  **Events -** Select the events you would like to get notified of.

       <figure>![Paste the Webhook URL and select the events you are interested in.](<../.gitbook/assets/image (74).png>)<figcaption><p>Paste the Webhook URL and select the events you are interested in.</p></figcaption></figure>
3. **Click Create.**

***

You have successfully completed the Microsoft Teams Integration.

***

### Converting from Legacy MS Teams Integration (V3 to V4)

1. Follow steps 1-5 above in the [Microsoft Teams section](microsoft-teams.md#in-microsoft-teams).
2. In PagerTree:
   1. Edit your existing Legacy MS Teams Integration.
   2. Save your old webhook URL somewhere safe (in case you need to contact support to roll back).
   3. Paste the new webhook URL. Click Update.
   4.  Add "/convert" to the end of integration page URL in your browser window. (e.g. https://app.pagertree.com/integrations/123/convert). Click enter.

       <figure>![](<../.gitbook/assets/image (75).png>)<figcaption><p>Add /"convert" to the end of your integration page url.</p></figcaption></figure>

If successful, you will be redirected, and you will see the adapter class show "Channel::MicrosoftTeams::V4".

<figure>![Conversion Success](<../.gitbook/assets/image (76).png>)<figcaption><p>Conversion Success</p></figcaption></figure>
