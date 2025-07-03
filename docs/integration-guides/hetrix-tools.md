---
description: >-
  Connect your HetrixTools uptime monitors, blacklist monitors, and resource
  usage monitors to PagerTree using our Hetrix Tools integration.
---

# HetrixTools

| Company                                       | Estimated Time | Vendor Docs | Open Source                                                                                                                      |
| --------------------------------------------- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [HetrixTools, Inc.](https://hetrixtools.com/) | 1 minute       |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/hetrix\_tools/v3.rb) |

## What is HetrixTools?

[HetrixTools](https://hetrixtools.com/) is a simple, effective, and free solution for uptime monitoring and blacklist monitoring.

## **How It Works**

HetrixTools triggers webhook notifications:

* When an [uptime monitor](https://docs.hetrixtools.com/uptime-monitoring-webhook-notifications/) goes `offline`, an alert is created in PagerTree automatically.
* When an [uptime monitor](https://docs.hetrixtools.com/uptime-monitoring-webhook-notifications/) goes `online`, the associated alert is resolved in PagerTree automatically.
* When a [blacklist monitor webhook](https://docs.hetrixtools.com/blacklist-monitoring-webhook-notifications/) is received, an alert is created in PagerTree automatically.
* When a [server monitor resource usage webhook ](https://docs.hetrixtools.com/server-monitoring-resource-usage-webhook-notifications/)is received, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from HetrixTools into PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree and HetrixTools account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **HetrixTools logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In HetrixTools**

1. In the left navigation menu, **click Contact Lists.**
2.  For the contact list you wish to edit, **click the Pencil Button.**&#x20;

    <figure>![Navigate to Contact Lists and then click the Pencil button.](<../.gitbook/assets/hetrix-navigate-to-contact-lists.png>)<figcaption><p>Navigate to Contact Lists and then click the Pencil button.</p></figcaption></figure>
3.  In the webhook section, **Paste** the **PagerTree Endpoint URL** you copied into the **Webhook URL field**.&#x20;

    <figure>![Paste the PagerTree Endpoint URL into the Webhook URL field.](<../.gitbook/assets/hetrix-webhook-configuration.png>)<figcaption><p>Paste the PagerTree Endpoint URL into the Webhook URL field.</p></figcaption></figure>
4. Click **Edit button** to save.

You have successfully completed the HetrixTools Integration.

## Integration Options

| Option               | Description                                                                                                                                                   | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Authentication Token | The [Authentication Token header](https://docs.hetrixtools.com/webhook-authentication-token/) can be used to authenticate requests from Hetrix Tools servers. |         |

***
