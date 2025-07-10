---
description: Connect your Meta Workplace Groups to PagerTree.
---

# Meta Workplace

| Company                            | Estimated Time | Vendor Docs                                                                     | Open Source                                                                                                                       |
| ---------------------------------- | -------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [Meta](https://www.workplace.com/) | 5 minutes      | [view](https://developers.facebook.com/docs/workplace/custom-integrations-new/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/meta/workplace/v3.rb) |

## What is Meta Workplace?

[Workplace](https://www.workplace.com/) is the all-in-one business communication platform from Meta that securely combines chat, video, groups and your intranet with the work tools you already use.

## How It Works

Posts and comments are sent to Workplace groups, making sure the right groups are notified of alerts.

* When an alert in PagerTree is opened PagerTree will create a post to a group of your choice.
* When an alert in PagerTree is acknowledged, rejected, resolved, dropped, handed off, or commented on PagerTree will comment on the post associated with the alert.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from PagerTree into a Meta Workplace group. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Meta Workplace account setup.

### In Meta Workplace

#### Copy the Group

:::info
Open up a text editor app to more easily save the fields you will copy below.
:::

1. Navigate to the group page. (If you have not yet created a group, [create a group](https://www.workplace.com/help/work/130715040597872).)
2.  In the URL bar, **copy the Group ID** into your text editor app.

    <figure>![Workplace Dash](<../.gitbook/assets/image (58).png>)<figcaption><p>In Workplace, copy the Group ID where you want PagerTree to post to.</p></figcaption></figure>

#### Create the Workplace Integration

1. In the left-hand menu bar, **navigate to Admin Panel -> Integrations**.
2.  Click the **Create custom integration button**.

    <figure>![workplace custom integrations](<../.gitbook/assets/image (59).png>)<figcaption><p>In Workplace, create a custom integration.</p></figcaption></figure>
3.  In the create custom integration form, **name the integration and optionally give it a description**.

    <figure>![workplace create custom integrations](<../.gitbook/assets/image (60).png>)<figcaption><p>Fill in the custom integration form.</p></figcaption></figure>
4. Click **Create.**
5.  On the integration details page, click the **Create access token button**.

    <figure>![Workplace create access token](<../.gitbook/assets/image (61).png>)<figcaption><p>Click the create access token.</p></figcaption></figure>
6. On the new token created, click "Copy". Add this to your text editor app.
7. Click I understand and done.
8. Click the **Permissions Tab** and select the following:
   1. **Mention bot**
   2. **Read group content**
   3. **Manage group content**
9.  **Click Save.**

    <figure>![Give the Worplace app the appropriate permissions.](<../.gitbook/assets/image (63).png>)<figcaption><p>Give the Worplace app the appropriate permissions.</p></figcaption></figure>

### **In PagerTree**

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Meta Workplace logo**.
2. In the New integration form:
   1. Name - Input a friendly name
   2. Workplace Group ID - The Group ID you copied earlier
   3. Workplace Integration Access Token - The access token you copied earlier.
3.  **Click Create.**

    <figure>![Pagertree Workplace integration](<../.gitbook/assets/image (65).png>)<figcaption><p>In PagerTree, create the integration pasting the values you copied earlier.</p></figcaption></figure>

***

You have successfully completed the Meta Workplace Integration. Now when an alert is created, acknowledged, commented on, etc. posts and comments will be sent to workplace.

<figure>![An example Post in Workplace sent by PagerTree](<../.gitbook/assets/image (66).png>)<figcaption><p>An example Post in Workplace sent by PagerTree</p></figcaption></figure>

***

#### Outgoing Rules

You can suppress outgoing messages by using the integration outgoing rules (ex: You only want a certain teams messages to a channel). Please see [Outgoing Webhook - Outgoing Rules](outgoing-webhook.md#outgoing-rules) for full documentation on the functionality.



```yaml title="only_send_alerts_with_security_in_title.yml" showLineNumbers
rules:
  - match:
      "$not":
        alert.title:
          "$regex": "security"
          "$options": "i"
    actions:
     - type: ignore
```

```yaml title="only_send_to_if_assigned_to_specific_team.yml" showLineNumbers
rules:
  - match:
      "$not":
        alert.d_team_id:
          "$in":
          - "tem_abc123" # Devops Team
    actions:
     - type: ignore
```
