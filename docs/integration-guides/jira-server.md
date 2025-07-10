---
description: Connect your Jira Server issues to PagerTree.
---

# Jira Server

| Company                                 | Estimated Time | Vendor Docs                                                            | Open Source                                                                                                                     |
| --------------------------------------- | -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Atlassian](https://www.atlassian.com/) | 5 minutes      | [view](https://developer.atlassian.com/server/jira/platform/webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/jira\_server/v3.rb) |

## What is Jira Server?

[Jira Server](https://www.atlassian.com/) is an application that helps agile teams plan, track, and release great software.

## How It Works

Jira Server creates issues.

* When an issue in Jira Server is created, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send issues from Jira Server into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Jira Server account/server setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Jira Software logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Apex Ping**

1.  Navigate to the Jira administration console under the main menu: **Jira Software -> Settings -> System -> Advanced -> Webhooks**. If you know your server url, webhooks can be found at the following path: `<Jira Server URL>/plugins/servlet/webhooks`

    <figure>![Jira Webhooks](<../.gitbook/assets/image (4) (1) (3).png>)<figcaption><p>In Jira, navigate to WebHooks.</p></figcaption></figure>
2. In the upper right hand corner, click the **Create a Webhook** button.
3. On the create webhook form, fill out the following:
   1. **Name** - An appropriate name (ex: “PagerTree Webhook Listener”)
   2. **Url** – **Paste** the **PagerTree Endpoint URL** you copied earlier
   3. Issue Related events
      1.  Check **Issue Created**

          <figure>![Jira PagerTree Webhook Configuration](<../.gitbook/assets/image (1) (3) (2).png>)<figcaption><p>Jira PagerTree Webhook Configuration</p></figcaption></figure>
   4. **Click “Save”** button.

***

You have successfully completed the Jira Server Integration.

***
