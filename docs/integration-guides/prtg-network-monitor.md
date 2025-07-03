---
description: Connect your PRTG notifications to PagerTree.
---

# PRTG Network Monitor

| Company                                      | Estimated Time | Vendor Docs                                                          | Open Source                                                                                                           |
| -------------------------------------------- | -------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [Paessler AG](https://www.paessler.com/prtg) | 10 minutes     | [view](https://www.paessler.com/manuals/prtg/notifications_settings) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/prtg/v3.rb) |

## What is PRTG?

[PRTG](https://www.paessler.com/prtg) (Paessler Router Traffic Graphe&#x72;_)_ is _a_ network monitoring tool that helps you to ensure that your computer systems are running smoothly and that no outages occur. PRTG monitors your whole IT infrastructure 24/7 and alerts you to problems before users even notice.

## **How It Works**

PRTG triggers notifications when a sensor’s check fails.

* When the payload status is down (`status === "Down"`), an alert is created in PagerTree automatically.
* When the payload status contains “now: up” (`status contains "now: up"`), the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from PRTG into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and PRTG setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **PRTG logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In PRTG**

1.  **Menu -> Setup -> Account Settings -> Notification Templates**.&#x20;

    <figure>![PRTG Notification Templates](<../.gitbook/assets/image (9) (2).png>)<figcaption><p>Navigate to Notification Templates</p></figcaption></figure>
2.  Click the **Add Notification Template** button.&#x20;

    <figure>![PRTG Notification Templates Button](<../.gitbook/assets/image (1) (3) (1) (1).png>)<figcaption><p>Click the Add Notification Template Button</p></figcaption></figure>
3. On the Add Notification Template Page:
   1. Under **Basic Settings**
      1.  **Template Name** - PagerTree&#x20;

          <figure>![PRTG Notification Templates](<../.gitbook/assets/image (14) (2).png>)<figcaption><p>Name the Template "PagerTree"</p></figcaption></figure>
   2. Under **Notification Summarization**
      1.  **Method** - **Always notify ASAP, never summarize**.&#x20;

          <figure>![Notification summarization ](<../.gitbook/assets/image (2) (2) (1).png>)<figcaption><p>Never summarize notifications</p></figcaption></figure>
   3. Enable **Execute HTTP Action**
      1. **URL** - **Paste** the **PagerTree Endpoint URL** you previously copied.
      2. **HTTP Method** - **POST**
      3. **Payload** - Copy and paste the following. You can additionally add any other [placeholder variable](https://kb.paessler.com/en/topic/373-what-placeholders-can-i-use-with-prtg) and PagerTree will add it in the additional data section of the alert (sensorid and status are required).

```text title="prtg.payload"
sensorid=%sensorid&sensor=%sensor&status=%status
```

1. **Navigate to a sensor, device, or group** and under the **Notification Triggers**, click the pencil icon to edit, then select the following:
   1. When sensor state is **Down** for at least **30** seconds, perform **:// PagerTree**
   2. When sensor state is **Down** for at least **900** seconds, perform **no notification** and repeat every **0** minutes.
   3. When sensor leaves **Down** state after a notification was triggered, perform **:// PagerTree**
   4.  Click the **check mark icon button** to save.&#x20;

       <figure>![ PRTG Notification Triggers](<../.gitbook/assets/image (4) (5) (1).png>)<figcaption><p>Configure the PRTG Notification Triggers</p></figcaption></figure>

***

You have successfully completed the PRTG Integration.

## Other Helpful PRTG Resources

* [PRTG Notification Templates Documentation](https://www.paessler.com/manuals/prtg/notifications_settings)
* [List of Placeholders for Templates](https://kb.paessler.com/en/topic/373-what-placeholders-can-i-use-with-prtg)
