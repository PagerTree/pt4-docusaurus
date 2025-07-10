---
date: 2022-12-15
authors: amiller
description: >-
  Use the Email to Slack integration to keep an entire stakeholder channel up to
  date during on-going incidents.
---

# 🪄 Slack Channel Stakeholder Notifications

Recently, while working with a customer, I saw a really cool use of [PagerTree’s Stakeholder Notifications](https://docs.pagertree.com/knowledge-base/stakeholders) to send messages into a Slack channel. They did this by using the Slack’s [Email to Slack](https://pagertree.slack.com/apps/A0F81496D-email) integration along with PagerTree’s Stakeholder notifications. Today I’d like to share with you how they did it.

<!-- truncate -->

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

To get started, you’ll need several things.

1. A PagerTree subscription with the [elite plan](https://pagertree.com/pricing/?utm\_source=blog\&utm\_medium=link\&utm\_campaign=slack\_channel\_stakeholder\_notifications).
2. A [Slack](https://slack.com/) account with a [premium plan](https://slack.com/pricing).

## In Slack <a href="#create-a-stakeholder-channel" id="create-a-stakeholder-channel"></a>

### Create a Stakeholder Channel <a href="#create-a-stakeholder-channel" id="create-a-stakeholder-channel"></a>

From your Slack workspace:

1.  In the left hand menu, click the **+** button, next to the Channels.

    <figure>![Slack menu](<https://pagertree.com/assets/img/posts/2019/05/07/slack-add-a-channel.png>)<figcaption></figcaption></figure>
2.  In the Create a channel form, let’s add the name of the group to be **stakeholders**, then click the **Create Channel** button.

    <figure>![Create a channel](<https://pagertree.com/assets/img/posts/2019/05/07/create-a-stakeholder-channel.png>)<figcaption></figcaption></figure>

### Create the Slack Email Integration <a href="#create-the-slack-email-integration" id="create-the-slack-email-integration"></a>

1. In your browser, navigate to the [Slack Email Integration](https://pagertree.slack.com/apps/A0F81496D-email).
2.  Click the **Install** Button.

    <figure>![Slack email integration](<https://pagertree.com/assets/img/posts/2019/05/07/install-slack-email-integration.png>)<figcaption></figcaption></figure>
3.  Select the **#stakeholders** channel we just created above, then click **Add Email Integration**

    <figure>![add email integration](<https://pagertree.com/assets/img/posts/2019/05/07/configure-email-integration.png>)<figcaption></figcaption></figure>
4. **Copy** the **email address** that slack provides you.
5.  Click **Save Integration**

    <figure>![integration settings](<https://pagertree.com/assets/img/posts/2019/05/07/copy-slack-email.png>)<figcaption></figcaption></figure>

## In PagerTree

### Create a Stakeholder

1. Enable [Advanced Mode](https://docs.pagertree.com/knowledge-base/users#advanced-mode).
2. [Create a stakeholder](https://app.pagertree.com/stakeholders/new) group.
3. Paste the Slack email address in the additional emails section of the PagerTree stakeholder.
4. Click Create.

## Test it Out

🚀 Now test it out by manually creating an incident in PagerTree. You should see Slack shows a notification in the #stakeholder channel.

<figure>![stakeholder incident](<https://pagertree.com/assets/img/posts/2019/05/07/slack-stakeholder-communication.png>)<figcaption><p>Slack stakeholder channel communication</p></figcaption></figure>

I hope you found this useful, and can use it to keep stakeholders informed during ongoing incidents.

–Austin
