---
description: Connect your Grafana alerts to PagerTree.
---

# Grafana

| Company                              | Estimated Time | Vendor Docs                                 | Open Source                                                                                                                   |
| ------------------------------------ | -------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Grafana Labs](https://grafana.com/) | 10 minutes     | [view](https://apex.sh/docs/ping/webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/apex\_ping/v3.rb) |

## What is Grafana?

[Grafana](https://grafana.com/) is the open platform for beautiful analytics and monitoring.

## How It Works

Grafana triggers user defined alerts by monitoring time series metrics.

* When an alert is triggered (`'alerting'` state) in Grafana, an alert is created in PagerTree automatically.
* When the alert is resolved (`'ok'` state) in Grafana, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Grafana into PagerTree. The estimated time for this integration is 10 minutes. We assume that you already have a PagerTree account and Grafana setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Grafana logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Grafana**

#### **Create a Notification Channel**

1.  **Click Menu -> Alerting -> Notification Channels**

    <figure>![Grafana notification channels](<../.gitbook/assets/image (21).png>)<figcaption><p>Navigate to Notification Channels.</p></figcaption></figure>
2.  **Click** the **”+ New Channel”** button

    <figure>![Grafana new channel button](<../.gitbook/assets/image (5).png>)<figcaption><p>Click the New Channel button.</p></figcaption></figure>
3. On the New Channel Form
   1. Name - An appropriate Name (example: PagerTree Webhook)
   2. Type - `webhook`
   3. Send on all alerts - `checked`
   4. Include image - `checked`
   5. URL - **Paste** the **PagerTree Endpoint URL** you copied
   6. Http Method - `POST`
4.  **Click** the **Save** button

    <figure>![Grafana PagerTree Channel Configuration](<../.gitbook/assets/image (18).png>)<figcaption><p>Grafana PagerTree Channel Configuration</p></figcaption></figure>

#### Create an Alert

1.  **Click Menu -> Dashboards -> Home**

    <figure>![grafana dashboard](<../.gitbook/assets/image (4).png>)<figcaption><p>Navigate to your dashboard home.</p></figcaption></figure>
2.  **Click -> Home** then select the dashboard that has a metric you would like to alert on.

    <figure>![grafana dashboard](<../.gitbook/assets/image (3) (1).png>)<figcaption><p>Select a dashboard.</p></figcaption></figure>
3. **Click the component** you would like to add the alert to
   1.  **Click “Edit”**

       <figure>![grafana edit](<../.gitbook/assets/image (15).png>)<figcaption><p>Click the "Edit" tab.</p></figcaption></figure>
   2. **Click** the **Alert Tab**
   3.  **Click** the **“Create Alert” button**

       <figure>![grafana create alert](<../.gitbook/assets/image (19) (1).png>)<figcaption><p>Click the "Create Alert" button.</p></figcaption></figure>
   4. **Configure** the appropriate parameters under **Alert Config**
   5. **Click** the **Notifications Tab**
      1.  Ensure **Send to** has the **PagerTree Webhook** channel selected 

          <figure>![grafana  PagerTree Webhook](<../.gitbook/assets/image (17).png>)<figcaption><p>Configure the Alert to send to the PagerTree Webhook.</p></figcaption></figure>
4.  **Click** the **Save Icon** at the top of the page to save the dashboard

    <figure>![grafana save icon](<../.gitbook/assets/image (26).png>)<figcaption><p>Click the "Save" icon.</p></figcaption></figure>

You have successfully completed the Grafana Integration.

***
