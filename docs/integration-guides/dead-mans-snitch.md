---
description: Connect your Dead Man’s Snitch snitches to PagerTree.
---

# Dead Man's Snitch

| Company                                        | Estimated Time | Vendor Docs                                                   | Open Source                                                                                                                       |
| ---------------------------------------------- | -------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [Collective Idea](https://deadmanssnitch.com/) | 5 minutes      | [view](https://deadmanssnitch.com/docs/integrations/webhooks) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/dead_mans_snitch/v3.rb) |

## What is Dead Man's Snitch?

[Dead Man’s Snitch](https://deadmanssnitch.com/) is a cron job monitoring tool that keeps an eye on your periodic processes and notifies you when something doesn’t happen.

## How It Works

Dead Man’s Snitch triggers notifications when a snitch does not report in (aka goes “missing”).

* When snitch is missing (`type === "snitch.missing"`) in Dead Man’s Snitch, an alert is created in PagerTree automatically.
* When snitch is reporting after being missing (`type === "snitch.reporting"`) in Dead Man’s Snitch, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send notifications from Dead Man’s Snitch into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Dead Man’s Snitch account setup. It is also assumed you have created at least 1 Dead Man’s Snitch snitch.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Dead Man's Snitch logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Dead Man's Snitch**

1.  From the navigation menu, click **Integrations**.

    <figure>![Dead Man&#x27;s Snitch integrations](<../.gitbook/assets/image (14) (3).png>)<figcaption><p>Click Integrations.</p></figcaption></figure>
2.  Click the **+ Add** button next to the webhooks integration type.

    <figure>![Dead Man&#x27;s Snitch Webhooks integration](<../.gitbook/assets/image (7) (2) (3).png>)<figcaption><p>Click the add button next to the webhooks integration type.</p></figcaption></figure>
3.  **Paste** the **PagerTree Endpoint URL** you copied for **Hook URL**.

    <figure>![Dead Man&#x27;s Snitch Pagertree endpoint url](<../.gitbook/assets/image (9) (4).png>)<figcaption><p>Paste your PagerTree endpoint URL.</p></figcaption></figure>

***

You have successfully completed the Dead Man's Snitch Integration.

***
