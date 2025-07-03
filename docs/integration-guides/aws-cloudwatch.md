---
description: >-
  Connect your AWS CloudWatch alarms to PagerTree using our AWS CloudWatch
  Integration.
---

# AWS CloudWatch

| Company                                        | Estimated Time | Vendor Docs                                              | Open Source                                                                                                                     |
| ---------------------------------------------- | -------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Amazon Web Services](https://aws.amazon.com/) | 15 minutes     | [view](https://aws.amazon.com/documentation/cloudwatch/) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/aws_cloudwatch/v3.rb) |

## What is AWS CloudWatch?

[AWS CloudWatch](https://aws.amazon.com/cloudwatch/) provides monitoring for [Amazon Web Services (AWS)](https://aws.amazon.com/) and the applications that run on AWS. CloudWatch metrics play a critical role in the monitoring of the applications running on AWS cloud. A CloudWatch alarm can watch a single metric over a specified time period and execute automated actions based on the value of the watched metric and given threshold.

## **How It Works**

AWS CloudWatch triggers user defined alarms by watching metrics.

* When an alarm is triggered (`ALARM` state) in AWS CloudWatch, an alert is created in PagerTree automatically.
* When the alarm is closed (`OK` state) in AWS CloudWatch, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alarms from AWS CloudWatch to [AWS Simple Notification Service (SNS)](https://aws.amazon.com/sns/) into PagerTree. The estimated time for this integration is 15 minutes. We assume that you already have a PagerTree and AWS account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Amazon Web Services logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In AWS SNS Console**

1.  In the SNS Console, **click “Create Topic”**.&#x20;

    <figure>![AWS SNS console](<../.gitbook/assets/image (4) (3).png>)<figcaption><p>In the AWS SNS console, click create topic.</p></figcaption></figure>
2.  Enter a **Topic name** (ex: “pagertree\_integration”) and a **Display name** (ex: “pagertree”), then **click “Create Topic”**.&#x20;

    <figure>![New SNS topic form.](<../.gitbook/assets/image (26) (1).png>)<figcaption><p>New SNS topic form.</p></figcaption></figure>
3.  Now that your topic has been created, **click “Create Subscription”**.&#x20;

    <figure>![create subscription button](<../.gitbook/assets/image (3) (3) (1).png>)<figcaption><p>Click create subscription button.</p></figcaption></figure>
4.  **Select HTTPS** as the **Protocol** and **paste** the **PagerTree Endpoint URL** as the **Endpoint**. Ensure the "**Enable raw message delivery**" is **disabled**.

    <figure>![HTTPS protocol and paste your PagerTree endpoint URL.](<../.gitbook/assets/aws-sns-create-subscription.png>)<figcaption><p>Select the HTTPS protocol and paste your PagerTree endpoint URL.</p></figcaption></figure>
5.  Your subscription should be automatically confirmed. **Click** the **refresh** icon and ensure the **Subscription ID** is **not&#x20;**_**PendingConfirmation**_.&#x20;

    <figure>![Pagertree subscription confirmation](<../.gitbook/assets/image (17) (2).png>)<figcaption><p>The subscription will automatically be confirmed by PagerTree.</p></figcaption></figure>

### In AWS EC2 Console

1.  Go to your EC2 Instances Console. **Right click** on the **instance** that you would like to monitor, and select **CloudWatch Monitoring -> Add/Edit Alarms**.&#x20;

    <figure>![AWS cloudwatch alarm ](<../.gitbook/assets/image (24) (1).png>)<figcaption><p>Add an alarm to an EC2 instance.</p></figcaption></figure>
2.  Click **Create Alarm**.&#x20;

    <figure>![AWS Create Alarm](<../.gitbook/assets/image (25) (1).png>)<figcaption><p>Click the create alarm button.</p></figcaption></figure>
3.  **Select** your new notification **topic** from the drop down menu, configure the settings that would like to trigger the alarm, and **click “Create Alarm”**.&#x20;

    <figure>![Select your newly created SNS Topic as the alarm destination.](<../.gitbook/assets/image (20) (2).png>)<figcaption><p>Select your newly created SNS Topic as the alarm destination.</p></figcaption></figure>
4.  At this point you PagerTree will create an alert if the alarm fires. To configure auto-resolve **click** the **Alarm Link** in the dialog box.&#x20;

    <figure>![CloudWatch alarm link](<../.gitbook/assets/image (16) (2).png>)<figcaption><p>In the success box click the CloudWatch alarm link.</p></figcaption></figure>
5.  With the new alarm selected, **click Actions -> Modify**.&#x20;

    <figure>![CloudWatch alarm](<../.gitbook/assets/image (23) (1) (1).png>)<figcaption><p>Modify your newly created CloudWatch alarm.</p></figcaption></figure>
6.  In the Actions section of the Modify Alarm window, **click “+ Notification”**.&#x20;

    <figure>![AWS Notification button](<../.gitbook/assets/image (1) (2) (2) (1) (1).png>)<figcaption><p>Click the + Notification button.</p></figcaption></figure>
7. **Select** the following values
   1. Whenever this alarm: **State is OK**
   2. Send notification to: your new notification **topic**
8.  **Click “Save Changes”.**&#x20;

    <figure>![Modify the alarm to send OK messages to PagerTree.](<../.gitbook/assets/image (1) (2) (1) (2).png>)<figcaption><p>Modify the alarm to send OK messages to PagerTree.</p></figcaption></figure>

***

You have successfully completed the AWS Cloudwatch integration.

***
