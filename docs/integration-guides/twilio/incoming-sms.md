# Incoming SMS

| Company                                 | Estimated Time | Vendor Docs                          | Open Source                                                                                                                          |
| --------------------------------------- | -------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [Twilio, Inc.](https://www.twilio.com/) | 5 minutes      | [view](https://www.twilio.com/docs/) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/twilio/incoming_sms/v3.rb) |

## What is Twilio Incoming SMS Integration

[Twilio](https://www.twilio.com/) is a cloud communications platform for building SMS, Voice & Messaging applications on an API built for global scale.

With Twilio Incoming SMS, PagerTree users can:

* Purchase and manage global phone numbers using [Twilio](https://www.twilio.com/).
* Create alerts from incoming SMS

## How It Works

* When a new SMS comes in from Twilio, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to route an incoming SMS from Twilio into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Twilio account setup.

### In PagerTree

1. [Create the integration](../introduction.md#create-an-integration) by clicking the **Twilio (Incoming SMS) logo**.
2. [Copy the Endpoint URL](../introduction.md#copy-the-endpoint-url)**.**

### **In Twilio**

1. If you haven’t already, [upgrade to a paid Twilio account](https://support.twilio.com/hc/en-us/articles/223183208-Upgrading-to-a-paid-Twilio-Account).
2. If you haven’t already, [buy a phone number](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console).
3.  Navigate to your purchased number **Develop -> Phone Numbers -> Manage -> Active Numbers**.

    <figure>![Twilio Active Number](<../../.gitbook/assets/image (9) (1) (1).png>)<figcaption></figcaption></figure>
4. Select the phone number that will be used for incoming SMS (this can be the same as a [Live Call Routing](live-call-routing.md) number).
5. On the Phone Number **Configure** Tab, under **Messaging -> A Message Comes In**
   1. **Paste** the **PagerTree Endpoint URL** you copied earlier
   2. Ensure the type is **Webhook**
   3. Ensure the action is **HTTP POST**
   4.  Click **Save**

       <figure>![Twilio Messages](<../../.gitbook/assets/image (8) (1) (1).png>)<figcaption><p>Confige the messaging endpoint for the incoming sms integration.</p></figcaption></figure>

***

You have successfully completed the Twilio (Incoming SMS) integration.

***

## Configure Twilio Media Access

If you plan to send images via MMS (Multimedia Messaging Service) to your phone number, you will likely want to disable authentication for media access in Twilio. By doing so, PagerTree will be able to display the images.

To disable HTTP Basic Authentication for media access in Twilio:

1. Navigate to **Develop -> Messaging -> Settings -> General**.
2.  Under the HTTP Basic Authentication for media access section, select **Disabled**.

    <figure>![In Twilio, select disabled for HTTP Basic Authentication for Media Access](<../../.gitbook/assets/image (78).png>)<figcaption><p>In Twilio, select disabled for HTTP Basic Authentication for Media Access</p></figcaption></figure>
3. Scroll to the bottom of the page and click **Save**.
