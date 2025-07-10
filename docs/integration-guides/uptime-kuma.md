---
description: Connect your Uptime Kuma monitors to PagerTree.
---

# Uptime Kuma

| Company                                                | Estimated Time | Vendor Docs                      | Open Source                                                                                                                  |
| ------------------------------------------------------ | -------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [Open Source](https://github.com/louislam/uptime-kuma) | 5 minutes      | [view](https://uptime.kuma.pet/) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/uptime_kuma/v3.rb) |

## What is Uptime Kuma?

Uptime Kuma is an easy-to-use self-hosted monitoring tool.

## How It Works

Uptime Kuma triggers user defined notifications by monitoring websites.

* When a monitor is Down in Uptime Kuma, an alert is created in PagerTree automatically.
* When a monitor is Up in Uptime Kuma, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Uptime Kuma into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Uptime Kuma instance setup.

:::info
The Uptime Kuma integration will only work if your version of Uptime Kuma includes [this pull request](https://github.com/louislam/uptime-kuma/pull/2728).
:::

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Uptime Kuma logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Uptime Kuma

1.  From the **Profile Menu, click Settings.**

    <figure>![Uptime Kuma Settings](<../.gitbook/assets/image (2) (2).png>)<figcaption><p>Profile Menu -> Settings</p></figcaption></figure>
2.  Click the **Notifications Tab**, then click **Setup Notification button**.

    <figure>![Uptime Kuma notifications](<../.gitbook/assets/image (6).png>)<figcaption><p>Notifications -> Setup Notification</p></figcaption></figure>
3. In the Setup Notification box
   1. Notification Type - PagerTree
   2. Friendly Name - Something descriptive (ex: "Notify PagerTree")
   3. Integration URL - Paste the PagerTree Endpoint URL you copied
   4. Urgency - An appropriate urgency
   5. Auto Resolve - Auto Resolve
   6. Default Enabled - Checked
   7.  Apply on all existing monitors - Checked

       <figure>![Uptime Kuma PagerTree Notification Configuration](<../.gitbook/assets/image (2) (7).png>)<figcaption><p>Uptime Kuma PagerTree Notification Configuration</p></figcaption></figure>
4. **Click Save.**

You have successfully completed the Uptime Kuma Integration.

***
