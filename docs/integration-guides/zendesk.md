---
description: Connect your Zendesk tickets to PagerTree.
---

# Zendesk

| Company                             | Estimated Time | Vendor Docs                                                                           | Open Source                                                                                                                |
| ----------------------------------- | -------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Zendesk](https://www.zendesk.com/) | 5 minutes      | [view](https://support.zendesk.com/hc/en-us/articles/4408839108378-Creating-webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/zendesk/v3.rb) |

## What is Zendesk?

[Zendesk](https://www.zendesk.com/) is a cloud-based customer service software and support ticketing system.

## How It Works

Zendesk creates tickets.

* When a ticket is created (`event_type == "create"`) in Zendesk, an alert is created in PagerTree automatically.
* When a ticket is acknowledged (`event_type == "acknowledge"`) in Zendesk, an alert is acknowledged in PagerTree automatically.
* When a ticket is resolved (`event_type == "resolve"`) in Zendesk, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send tickets from Zendesk into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Zendesk account setup.

:::danger
Cloning targets and/or triggers in Zendesk could lead to unexpected behavior. We recommend always creating new targets and triggers.
:::

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Zendesk logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Zendesk**

#### **Create a Webhook**

1. **Navigate** to **Menu -> Admin Gear -> Go to Admin Center**. ![Navigate to Admin Gear](<../.gitbook/assets/Navigate to Admin Gear (1).webp>)
2.  In the Admin center, search "webhooks", and **click** the **Webhooks** link.

    <figure>![Admin Center webhooks](<../.gitbook/assets/In the Admin Center, click Webhooks..webp>)<figcaption><p>In the Admin Center, click Webhooks.</p></figcaption></figure>
3.  **Click the Create webhook button.**

    <figure>![Zendesk Create Webhook](<../.gitbook/assets/Click the create webhook button..webp>)<figcaption><p>Click the create webhook button.</p></figcaption></figure>
4.  Select **Trigger or automation** and **click Next**.

    <figure>![Zendesk trigger or automation](<../.gitbook/assets/image (1) (1) (1) (3).png>)<figcaption><p>Select Trigger or automation.</p></figcaption></figure>
5. Enter in the following details:
   1. Name - PagerTree
   2. Endpoint Url – **Paste** the **PagerTree Endpoint URL** you copied earlier
   3. Request method – **Select POST**
   4. Request format – **Select JSON**
   5. Authentication - **None**
   6.  **Click Create webhook button**.

       <figure>![Zendesk PagerTree Webhook](<../.gitbook/assets/Zendesk PagerTree Webhook.webp>)<figcaption><p>Zendesk PagerTree Webhook</p></figcaption></figure>
6. Click the **Admin Center link** to connect the webhook to a trigger.

#### **Connect the Webhook in a Trigger**

1.  In the Business Rules -> Triggers page, click **Add Trigger**.

    <figure>![Zendesk Add Trigger](<../.gitbook/assets/Click the Add trigger button.webp>)<figcaption><p>Click the Add trigger button</p></figcaption></figure>
2. In the New Trigger form
   1. Trigger name – Name the target appropriately (ex: “PagerTree Create”)
   2. Meets _**any**_ of the following conditions: **Ticket is created**.
   3. Perform these actions
      1. **Notify active webhook: PagerTree**
      2. **Paste** the following in **JSON body**

```json title="zendesk_payload.create.json" showLineNumbers
{
  "event_type": "create",
  "id":"{{ticket.id}}",
  "title":"{{ticket.title}}",
  "created_at_with_timestamp":"{{ticket.created_at_with_timestamp}}",
  "description":"{{ticket.description}}",
  "ticket_type":"{{ticket.ticket_type}}",
  "link":"{{ticket.link}}",
  "priority":"{{ticket.priority}}",
  "status":"{{ticket.status}}",
  "via":"{{ticket.via}}",
  "assignee_name":"{{ticket.assignee.name}}"
}
```

1.  **Click “Create”** button.

    <figure>![Zendesk PagerTree Create Trigger](<../.gitbook/assets/Zendesk PagerTree Create Trigger (1).webp>)<figcaption><p>Zendesk PagerTree Create Trigger</p></figcaption></figure>

You have successfully completed the Zendesk Integration.

### Additional Triggers

Additional triggers can be added if you would like the ability to acknowledge and resolve PagerTree alerts from Zendesk. You'll need to follow the steps again to [create a trigger](zendesk.md#connect-the-webhook-in-a-trigger) for your different conditions. Make sure to change the JSON payloads to the below.

#### Acknowledge

```json title="zendesk_payload.acknowledge.json" showLineNumbers
{
  "event_type": "acknowledge",
  "id":"{{ticket.id}}",
  "title":"{{ticket.title}}",
  "created_at_with_timestamp":"{{ticket.created_at_with_timestamp}}",
  "description":"{{ticket.description}}",
  "ticket_type":"{{ticket.ticket_type}}",
  "link":"{{ticket.link}}",
  "priority":"{{ticket.priority}}",
  "status":"{{ticket.status}}",
  "via":"{{ticket.via}}",
  "assignee_name":"{{ticket.assignee.name}}"
}
```

#### Resolve

```json title="zendesk_payload.resolve.json" showLineNumbers
{
  "event_type": "resolve",
  "id":"{{ticket.id}}",
  "title":"{{ticket.title}}",
  "created_at_with_timestamp":"{{ticket.created_at_with_timestamp}}",
  "description":"{{ticket.description}}",
  "ticket_type":"{{ticket.ticket_type}}",
  "link":"{{ticket.link}}",
  "priority":"{{ticket.priority}}",
  "status":"{{ticket.status}}",
  "via":"{{ticket.via}}",
  "assignee_name":"{{ticket.assignee.name}}"
}
```

***
