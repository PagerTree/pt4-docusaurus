---
description: >-
  Send emails to PagerTree to create alerts. Connects with most devops and
  monitoring tools.
---

# Email

| Company       | Estimated Time | Vendor Docs | Open Source                                                                                                              |
| ------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| PagerTree LLC | 1 minute       |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/email/v3.rb) |

## What is the Email Integration?

The email integration is an email inbox provided by PagerTree that will create alerts when an email is received.

If your tool is not listed on our integrations page, the email integration is a great choice to use as an integration point since most tools support sending emails for alerts and alarms.

If you need to alias your email address to something more memorable (ex: outages@example.com), make sure to check out the [Custom Email Address section](email.md#custom-email-address) below.

## How It Works

* When an email is received, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to create an email integration PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Email logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url). For the email integration this should be an email address (ex: a+01GM8N3GZZGTAN4QHV85XBBBBB@alerts.pagertree.com)

### Test the Integration

1. In any email client, compose a **new email**
2. In the email, enter in the following:
   1. To - **Paste** the **PagerTree Endpoint URL you copied**
   2. Subject - Something descriptive
   3. Body - Some more details on the issue
3.  **Click Send**

    <figure>![PagerTree email endpoint](<../.gitbook/assets/image (4) (1) (1) (1).png>)<figcaption><p>Send an email to the PagerTree email endpoint.</p></figcaption></figure>

You have successfully completed the Email Integration.

## Integration Options

| Option         | Description                                                                                                                                                                                                                                | Default |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| Allow Spam     | Should PagerTree allow emails that have been marked as spam?                                                                                                                                                                               | False   |
| Dedup Threads  | Should PagerTree ignore replies to emails (so you don't get alerts for "RE: RE: RE: ..."?                                                                                                                                                  | True    |
| Sanitize Level | <p>The level we should sanitize incoming emails. Please see <a href="https://github.com/rgrove/sanitize#configuration">sanitize docs</a> for full details.<br/><br/>"Relaxed 2" will strip out inline style tags from Microsoft Outlook.</p> | Relaxed |

## Custom Email Address

Many customers have expressed the need for a custom email address (ex: alias@mycompany.com). This can easily be achieved using either [forwarding rules](email.md#forwarding-rules) or [distribution groups](email.md#distribution-group). The setup process is different per vendor (Gmail, Outlook, ect) but the concepts are the same. In each case this allows emails to go from alias@mycompany.com -> a+\<integration email>@alerts.pagertree.com.

### Forwarding Rules

1. In your email client, create a forwarding rule to send emails from your alias address to the PagerTree address.

<figure>![Example of a forwarding address in Gmail](<../.gitbook/assets/image (10) (1) (1).png>)<figcaption><p>Example of a forwarding address in Gmail</p></figcaption></figure>

### Distribution Group

1. Create a distribution group and add the PagerTree email address as member of the group.

:::info
Remember, if the members of the group are those people going on-call, it might make sense that the PagerTree email is the only member of the group.
:::
