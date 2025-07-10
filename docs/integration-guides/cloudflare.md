---
description: Connect your Cloudflare webhook notifications to PagerTree.
---

# Cloudflare



| Company                                         | Estimated Time | Vendor Docs                                                                             | Open Source                                                                                                                   |
| ----------------------------------------------- | -------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Cloudflare, Inc.](https://www.cloudflare.com/) | 2 minutes      | [view](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/cloudflare/v3.rb) |

## What is Cloudflare?

[Cloudflare](https://www.cloudflare.com/) provides content delivery network (CDN) services, cloud cybersecurity, DDoS mitigation, and domain registration services.

## How It Works

Cloudflare triggers notifications when account conditions are met.

* When a notification is sent by Cloudflare, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send notifications from Cloudflare into PagerTree. The estimated time for this integration is 2 minutes. We assume that you already have a PagerTree and Cloudflare account set up.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Cloudflare logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Cloudflare

#### Create the Webhook Destination

1. Navigate to **Cloudflare dashboard -> Notifications**.
2.  Under **Destinations, click Create**.

    <figure>![Cloudflare Integration: Click create webhook destination button.](<../.gitbook/assets/integration-cloudflare-create-webhook-destination-button.jpg>)<figcaption><p>Click create webhook destination button.</p></figcaption></figure>
3.  **Paste** the **PagerTree Endpoint URL** you copied into the **URL** field. 

    <figure>![Cloudflare Integration - Create Webhook Destination in Cloudflare](<../.gitbook/assets/integration-cloudflare-create-webhook-destination.jpg>)<figcaption><p>Create Webhook Destination in Cloudflare</p></figcaption></figure>
4. **Click Save and Test**.

#### Connect Notification to Webhook

1. Under **Notifications**, add or edit an existing notification.
2.  Click **Save**.

    <figure>![Cloudflare Integration: Connect Cloudflare Notification to PagerTree Webhook](<../.gitbook/assets/integration-cloudflare-connect-notification-to-webhook.jpg>)<figcaption><p>Connect Cloudflare Notification to PagerTree Webhook</p></figcaption></figure>

You have successfully completed the Cloudflare Integration.

***
