---
description: >-
  Connect your Freshservice tickets to PagerTree using our Freshservice
  Integration.
---

# Freshservice

## What is Freshservice?

[Freshservice](https://freshservice.com/) is a cloud based ITSM software for your service desk. It provides automation tools to manage incidents, assets, and more.

## **How It Works**

Freshservice creates tickets.

* When a ticket is created in Freshservice, an alert is created in PagerTree automatically.
* When a ticket is pending (`ticket_status === 'Pending'`) in Freshservice, the alert is acknowledged in PagerTree automatically.
* When a ticket is resolved or closed (`ticket_status === 'Resolved' || ticket_status === 'Closed'`) in Freshservice, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send tickets from Freshservice into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Freshservice account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Freshservice logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Freshservice**

1. **Click** the **Gear Icon** in the left side navigation menu to go to the admin page.
2.  On the admin page, **navigate to Automation & Productivity -> Workflow Automator.**&#x20;

    <figure>![Freshservice Automation and Productivity](<../.gitbook/assets/image (7) (3) (1).png>)<figcaption><p>Navigate to Automation &#x26; Productivity -> Workflow Automator</p></figcaption></figure>
3.  **Click** the **New Automator button** and select **Ticket**.&#x20;

    <figure>![Freshservice new Automator](<../.gitbook/assets/image (5) (2) (1).png>)<figcaption><p>Click the New Automator button and select Ticket</p></figcaption></figure>
4.  On the New Ticket Automator form:

    1. Title - PagerTree
    2. **Click Create**&#x20;

    <figure>![Freshservice PagerTree Automator](<../.gitbook/assets/image (8) (2).png>)<figcaption><p>Freshservice PagerTree Automator</p></figcaption></figure>
5.  In the new Event form:

    1. When any of these events occur:
       1. **Ticket is raised**
       2. **Status is changed** from **Any Status** to **Any Status**
    2. These events can be performed by **Anyone**
    3. Name - **Ticket is Created or Updated**
    4. **Click Done.**

    <figure>![Freshservice Ticket Automator Event](<../.gitbook/assets/image (4) (4).png>)<figcaption><p>Ticket Automator Event</p></figcaption></figure>
6. &#x20;**Drag** the **Web Request action,** connecting it to your event. ![Freshservice web request](<../.gitbook/assets/image (13) (2) (1).png>)
7. On the Web Request Form:
   1. Request Type - **POST**
   2. Endpoint - Paste the **PagerTree endpoint URL** you copied earlier.
   3. Credentials - **Inline Credential**
   4. Authentication Type - **No Auth**
   5. Body - **Copy and paste** the [Freshservice Webhook Format (see below)](freshservice.md#freshservice-webhook-format) into the text box.
   6. Label - PagerTree Webhook
   7.  **Click Done.**&#x20;

       <figure>![Freshservice PagerTree Web Request](<../.gitbook/assets/image (9) (2) (1).png>)<figcaption><p>Freshservice PagerTree Web Request</p></figcaption></figure>
8.  **Click Activate.**&#x20;

    <figure>![Freshservice Ticket Automator](<../.gitbook/assets/image (11) (2) (1).png>)<figcaption><p>Click active on the Ticket Automator</p></figcaption></figure>
9.  **Click Confirm.**&#x20;

    <figure>![confirm button](<../.gitbook/assets/image (1) (2) (3).png>)<figcaption><p>Click confirm</p></figcaption></figure>

You have successfully completed the Freshservice Integration.

## Freshservice Webhook Format

:::info
The root node of this payload "freshdesk" is not a mistake. The Freshservice application used to send webhooks in this format. For legacy reasons, it has been kept as "freshdesk".
:::

```json
{
  "freshdesk_webhook":{
    "ticket_id":"{{ticket.id}}",
    "ticket_status":"{{ticket.status}}",
    "ticket_subject":"{{ticket.subject}}",
    "ticket_description":"{{ticket.description | sanitize_html}}",
    "ticket_url":"{{ticket.url}}",
    "ticket_public_url":"{{ticket.public_url}}",
    "ticket_priority":"{{ticket.priority}}",
    "ticket_email":"{{ticket.from_email}}"
  }
}
```

## Troubleshooting

If you are running into issues where the rules are not firing, please check the following in Freshservice:

1. Ensure you created the rules by clicking the New Ticket Automator button.
2. Ensure you are diagnosing only **new tickets**. Old tickets will not be processed by new automators.
3. Try disabling and reenabling the rule.

***
