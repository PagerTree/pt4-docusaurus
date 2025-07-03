---
description: Connect your Auvik alerts to PagerTree.
---

# Auvik

| Company                                       | Estimated Time | Vendor Docs                                                                                    | Open Source                                                                                                              |
| --------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Auvik Networks Inc.](https://www.auvik.com/) | 5 minutes      | [view](https://support.auvik.com/hc/en-us/articles/216977386-Integrating-Auvik-with-a-webhook) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/auvik/v3.rb) |

## What is Auvik?

[Auvik](https://www.auvik.com/) is a cloud-based network monitoring & management software to automate complex network tasks.

## **How It Works**

Auvik triggers user defined alerts by monitoring network devices.

* When an alert is triggered (`'Triggered'` state) in Auvik, an alert is created in PagerTree automatically.
* When an alert is resolved (`'Cleared'` state) in Auvik, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Auvik into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Auvik account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Auvik logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Auvik**

#### **Add Integration**

1. From the navigation menu **Click Menu -> Integrations**.
2.  On the Integrations Page **click “Add Integration” button**.&#x20;

    <figure>![Auvik dashboard](<../.gitbook/assets/image (6) (1) (2).png>)<figcaption><p>Click the add integration button.</p></figcaption></figure>
3.  Select the **Webhook** as the integration type.&#x20;

    <figure>![Auvik webhooks integrations](<../.gitbook/assets/image (4) (6).png>)<figcaption><p>Select webhook as the integration type.</p></figcaption></figure>
4. In the Add Webhook Integration box:
   1. Title your integration (ex: “PagerTree”)
   2.  **Paste** the **PagerTree Endpoint URL** you copied for the **Webhook URL**.&#x20;

       <figure>![webhook pagertree integration](<../.gitbook/assets/image (32).png>)<figcaption><p>Paste the PagerTree Endpoint URL as the Webhook URL.</p></figcaption></figure>
5. **Click “Save”**.

#### Add Notification Channel

1. From the navigation menu **Click Menu -> Manage Alerts -> Notification Channels**.
2.  On the Notification Channels Page **click “Add Notification Channel” button**.&#x20;

    <figure>![Auvik Dashboard](<../.gitbook/assets/image (18) (1).png>)<figcaption><p>Click the add notification channel button.</p></figcaption></figure>
3. In the Add Notification Channel box
   1. Name your notification channel (ex: “PagerTree”)
   2. Contact Method (1) - **Webhook**
   3.  Contact Method (2) - **PagerTree** (what you titled your integration in step 4.1 above)&#x20;

       <figure>![Auvik PagerTree Notification Channel](<../.gitbook/assets/image (1) (1) (1) (2).png>)<figcaption><p>Auvik PagerTree Notification Channel</p></figcaption></figure>
4. **Click “Save”**.

#### **Associate Notification Channel With Alerts**

In this example we’ll show you how to create a new alert type for demo purposes, the important idea is to _associate the notification channel with an alert_.

1. From the navigation menu **Click Menu -> Manage Alerts -> Alerts**.
2.  On the Alerts Page **click “Add Alert” button**.&#x20;

    <figure>![Auvik alert dashboard](<../.gitbook/assets/image (20) (1).png>)<figcaption><p>Click the add alert button</p></figcaption></figure>
3.  Select the **Collector** as the alert type.&#x20;

    <figure>![Select Collector as the alert type.](<../.gitbook/assets/image (14) (1).png>)<figcaption><p>Select Collector as the alert type.</p></figcaption></figure>
4. In the Add Collector Alert box fill in basic information, below is important information:
   1. Trigger Condition
      1. Condition - **Auvik collector connection status**
      2. is - **equal to**
      3. Value - **Connected**
   2. Notification Channels
      1. **Select From Existing Channels**
      2. **Add PagerTree (Webhook)** as a notification channel
      3.  Email Frequency - **Immediately**&#x20;

          <figure>![Auvik Collector Alert PagerTree Configuration](<../.gitbook/assets/image (3) (2).png>)<figcaption><p>Auvik Collector Alert PagerTree Configuration</p></figcaption></figure>
5. **Click “Save”**

:::info
_After clicking save you should immediately get an alert in PagerTree from Auvik. If you receive more than one, you have received one per Auvik Site._
:::

You have successfully completed the Auvik Integration.

***
