---
description: Connect your StatusGator alerts to PagerTree.
---

# StatusGator

| Company                                             | Estimated Time | Vendor Docs                                                                       | Open Source                                                                                                                     |
| --------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Nimble Industries, Inc.](https://statusgator.com/) | 1 minute      | [view](https://support.statusgator.com/support/solutions/articles/47001278989-webhook-version-3-0) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/status\_gator/v3.rb) |

## What is StatusGator?

[StatusGator](https://statusgator.com/) monitors all your cloud services and websites, notifies you before official status pages do, and helps you communicate outages to reduce support tickets.

## How It Works

StatusGator triggers user defined alerts by monitoring websites.
* When a monitor status is Down (`status == 'down'`) in StatusGator, an alert is created in PagerTree automatically.
* When a monitor status is Up (`status == 'up'`) in StatusGator, the alert is resolved in PagerTree automatically.
* When a monitor status is Warn (`status == 'warn'`) in StatusGator **AND** the `Create on WARN status` option is enabled, an alert is created in PagerTree automatically.
* When a monitor status is Maintenance (`status == 'maintenance'`) in StatusGator **AND** the `Create on MAINTENANCE status` option is enabled, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from StatusGator into PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree and StatusGator account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **StatusGator logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In StatusGator

1. [Create a Webhook Integration](https://statusgator.com/webhook_integrations/new) by going to **Menu -> Integrations -> Webhook** and click **Add**
    <figure>![StatusGator PagerTree Webhook Integration](<../.gitbook/assets/status-gator-webhook-integration.png>)<figcaption><p>StatusGator PagerTree Webhook Integration</p></figcaption></figure>
2. **Paste** the **PagerTree Endpoint URL** you copied for the **Webhook URL**. Remove any signing secret or HTTP headers if present.
    <figure>![StatusGator PagerTree Webhook Integration](<../.gitbook/assets/status-gator-webhook-integration-details.png>)<figcaption><p>StatusGator PagerTree Webhook Integration Details</p></figcaption></figure>
3.  **Click “Save”** button.

You have successfully completed the StatusGator Integration.

***
