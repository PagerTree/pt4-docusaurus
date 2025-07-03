---
description: Connect your Healthchecks alerts to PagerTree.
---

# Healthchecks.io

| Company                                              | Estimated Time | Vendor Docs                           | Open Source                                                                                                                     |
| ---------------------------------------------------- | -------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Monkey See Monkey Do SIA](https://healthchecks.io/) | 3 minutes      | [view](https://healthchecks.io/docs/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/healthchecks/v3.rb) |

## What is Healthchecks?

[Healthchecks](https://healthchecks.io/) provides monitoring and alerting for when cronjobs fail. It is a free alternative to [Cronitor](https://cronitor.io/) and [Dead Man’s Snitch](https://deadmanssnitch.com/).

## **How It Works**

Healthchecks triggers user defined alerts by monitoring cronjob checks.

* When a check is down in Healthchecks, an alert is created in PagerTree automatically.
* When a check comes back up in Healthchecks, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Healthchecks into PagerTree. The estimated time for this integration is 3 minutes. We assume that you already have a PagerTree and Healthchecks account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Healthchecks logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Healthchecks**

1.  From the navigation menu, **Click Integrations.**&#x20;

    <figure>![Healthchecks.io integrations](<../.gitbook/assets/image (4) (5).png>)<figcaption><p>Naviage to Integrations</p></figcaption></figure>
2.  On the Integrations Page find the PagerTree row and **click “Add Integration”**.&#x20;

    <figure>![Healthchecks.io pagertree integrations](<../.gitbook/assets/image (1) (4) (1).png>)<figcaption><p>In Healthchecks, add the PagerTree integration.</p></figcaption></figure>
3.  On the Add PagerTree Integration Page

    1. **Paste** the **PagerTree Endpoint URL** you copied in the **URL** field.
    2. **Click “Save Integration”**.

    <figure>![PagerTree Endpoint URL](<../.gitbook/assets/image (33).png>)<figcaption><p>Paste the PagerTree Endpoint URL and click Save Integration.</p></figcaption></figure>

***

You have successfully completed the Healthchecks Integration.

***
