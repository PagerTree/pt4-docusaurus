---
description: Connect your Freshdesk tickets to PagerTree using our Freshdesk Integration.
---

# Freshdesk

| Company                                   | Estimated Time | Vendor Docs                                                                                            | Open Source                                                                                                                  |
| ----------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| [Freshworks Inc.](https://freshdesk.com/) | 5 minutes      | [view](https://support.freshdesk.com/support/solutions/articles/132589-using-webhooks-in-the-observer) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/freshdesk/v3.rb) |

## What is Freshdesk?

[Freshdesk](https://freshdesk.com/) is an online cloud-based customer service software providing helpdesk support with smart automations to get things done faster.

## **How It Works**

Freshdesk creates tickets.

* When a ticket is created in Freshdesk, an alert is created in PagerTree automatically.
* When a ticket is pending (`ticket_status === 'Pending'`) in Freshdesk, the alert is acknowledged in PagerTree automatically.
* When a ticket is resolved or closed (`ticket_status === 'Resolved' || ticket_status === 'Closed'`) in Freshdesk, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send tickets from Freshdesk into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Freshdesk account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Freshdesk logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Freshdesk**

1. **Click** the **Gear Icon** in the left side navigation menu to go to the admin page.
2.  On the admin page, **navigate to Workflows -> Automations.**&#x20;

    <figure>![Freshdesk automations](<../.gitbook/assets/image (17) (3).png>)<figcaption><p>Navigate to Workflows -> Automations</p></figcaption></figure>

#### Rule - Ticket Creation

1.  On the tab of "Ticket Creation", **ensure "Executing all matching rules" is selected**.&#x20;

    <figure>![Freshdesk matching rules](<../.gitbook/assets/image (29).png>)<figcaption><p>Ensure "executing all matching rules" is selected.</p></figcaption></figure>
2.  **Click New Rule button.**&#x20;

    <figure>![Freshdesk new rule](<../.gitbook/assets/image (28) (1).png>)<figcaption><p>Click New Rule Button</p></figcaption></figure>
3. On the New rule for Ticket creation form:
   1. Rule Name - PagerTree
   2. On tickets with these properties:
      1. Match **ANY** of the below
      2. **Tickets Status is Open**
   3. Perform these actions:
      1. Trigger webhook
      2. Request type - **POST**
      3. URL - Paste the **PagerTree endpoint URL** you copied earlier
      4. Encoding - **JSON**
      5. Content - **Advanced**
      6. **Copy and paste** the [Freshdesk Webhook Format (see below)](freshdesk.md#freshdesk-webhook-format) into the text box.
4.  **Click Preview and Save**.&#x20;

    <figure>![Freshdesk PagerTree Rule for ticket creation](<../.gitbook/assets/image (25) (2).png>)<figcaption><p>Freshdesk PagerTree Rule for ticket creation</p></figcaption></figure>
5.  In the confirmation dialog, **click** **Save and enable**.&#x20;

    <figure>![Pagertree confirmation](<../.gitbook/assets/image (18) (3).png>)<figcaption><p>In the confirmation dialog, click Save and enable.</p></figcaption></figure>
6.  Your rules that run on ticket creation should now have the PagerTree rule enabled.&#x20;

    <figure>![PagerTree rule enabled](<../.gitbook/assets/image (3) (1) (1) (1).png>)<figcaption></figcaption></figure>

#### Rule - Ticket Updates

1.  On the tab of "Ticket Updates", **ensure "Executes all matching rules" is selected**.&#x20;

    <figure>![Freshdesk executes all matching rules](<../.gitbook/assets/image (1) (1) (1) (1).png>)<figcaption><p>Ensure "executes all matching rules" is selected.</p></figcaption></figure>
2.  **Click New Rule button.**&#x20;

    <figure>![Freshdesk New Rule](<../.gitbook/assets/image (30).png>)<figcaption><p>On the ticket updates tab, click new rule button.</p></figcaption></figure>
3. On the New rule for Ticket update form:
   1. Rule Name - PagerTree
   2. When an action performed by - **Agent or requester**
   3. Involves any of these events:
      1. **Status is changed**
      2. From - **Any status**
      3. To - **Any status**
   4. On tickets with these properties:
      1. Match **ALL** of the below:
      2. In **Tickets**
      3. If **Status**
      4. **Is**
      5. **Open, Pending, Resolved**
   5. Perform these actions:
      1. Trigger webhook
      2. Request type - **POST**
      3. URL - Paste the **PagerTree endpoint URL** you copied earlier
      4. Encoding - **JSON**
      5. Content - **Advanced**
      6. **Copy and paste** the [Freshdesk Webhook Format (see below)](freshdesk.md#freshdesk-webhook-format) into the text box.
   6.  **Click Preview and Save**.&#x20;

       <figure>![Freshdesk PagerTree Ticket Update Form](<../.gitbook/assets/image (6) (2) (1).png>)<figcaption><p>Freshdesk PagerTree Ticket Update Form</p></figcaption></figure>
4.  In the confirmation dialog, click **Save and enable**.&#x20;

    <figure>![PagerTree confirmation dialog](<../.gitbook/assets/image (4) (1) (1).png>)<figcaption><p>In the confirmation dialog, click save and enable.</p></figcaption></figure>
5.  Your rules that run on ticket updates should now have the PagerTree rule enabled.&#x20;

    <figure>![Pagertree new rule](<../.gitbook/assets/image (23) (2).png>)<figcaption></figcaption></figure>

You have successfully completed the Freshdesk Integration.

## Freshdesk Webhook Format

```json
{
  "freshdesk_webhook":{
    "ticket_id":"{{ticket.id}}",
    "ticket_status":"{{ticket.status}}",
    "ticket_subject":"{{ticket.subject}}",
    "ticket_description":"{{ticket.description}}",
    "ticket_url":"{{ticket.url}}",
    "ticket_due_by_time":"{{ticket.due_by_time}}",
    "ticket_source":"{{ticket.source}}",
    "ticket_requester_name":"{{ticket.contact.name}}",
    "ticket_requester_email":"{{ticket.contact.email}}",
    "ticket_requester_phone":"{{ticket.contact.phone}}",
    "ticket_company_name":"{{ticket.company.name}}"
  }
}
```

## Troubleshooting

If you are running into issues where the rules are not firing, please check the following in Freshdesk:

1. Ensure you created the rules by clicking the New Rule button.
2. Ensure execute ALL matching rules was select.
3. Try disabling and reenabling the rule.

***
