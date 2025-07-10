---
description: Connect your Stackdriver alerts to PagerTree.
---

# Stackdriver

| Company                                             | Estimated Time | Vendor Docs                                                                       | Open Source                                                                                                                    |
| --------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Google LLC](https://cloud.google.com/stackdriver/) | 5 minutes      | [view](https://cloud.google.com/monitoring/support/notification-options#webhooks) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/stackdriver/v3.rb) |

## What is Stackdriver?

[Stackdriver](https://cloud.google.com/stackdriver/) aggregates metrics, logs, and events from infrastructure, giving developers and operators a rich set of observable signals that speed root-cause analysis and reduce mean time to resolution (MTTR).

## How It Works

Stackdriver triggers alerts when monitoring policies are breached.

* When an alert is Open (`incident.state == 'open'`) in Stackdriver, an alert is created in PagerTree automatically.
* When an alert is Closed (`incident.state == 'closed'`) in Stackdriver, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Stackdriver into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Stackdriver account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Stackdriver logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Stackdriver

1.  From the top navigation menu click **\[Workspace Name] -> Workspace Settings**.

    <figure>![Stackdriver Workspace](<../.gitbook/assets/image (12) (2).png>)<figcaption><p>Navigate to Workspace settings.</p></figcaption></figure>
2. From the **Settings Page**
   1. Select **Notifications -> Webhooks**.
   2.  Click the **Add Webhook** button.

       <figure>![Stackdriver Webhooks](<../.gitbook/assets/image (7) (4).png>)<figcaption><p>Click the add webhook button.</p></figcaption></figure>

       1. **Endpoint URL** - **Paste** the **PagerTree Endpoint URL** you copied earlier
       2. **Webhook Name** - Name the webhook appropriately (e.g. “PagerTree Webhook”)
       3. Click **Test Connection**
       4.  Click **Save**

           <figure>![Stackdriver webhooks endpoint url](<../.gitbook/assets/image (1) (3) (1).png>)<figcaption><p>Stackdriver PagerTree Webhook Configuration</p></figcaption></figure>
3.  From the left navigation menu click **Alerting -> Create a Policy**

    <figure>![Create an alerting policy.](<../.gitbook/assets/image (1) (5).png>)<figcaption><p>Create an alerting policy.</p></figcaption></figure>

    1. **Conditions** - Select conditions for when this alerting policy will be breached
    2. **Notifications** - Select the type **Webhook** and then select the **PagerTree Webhook** we created earlier.
    3. **Name this policy** - Give an appropriate name (e.g. PagerTree Alerting Policy)
    4.  Click **Save Policy**.

        <figure>![Set the notification policy to notify the PagerTree webhook.](<../.gitbook/assets/image (11) (1) (2).png>)<figcaption><p>Set the notification policy to notify the PagerTree webhook.</p></figcaption></figure>

***

You have successfully completed the Stackdriver Integration.

***
