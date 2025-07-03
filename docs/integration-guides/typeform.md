---
description: Connect your Typeform form submissions to PagerTree.
---

# Typeform

| Company                               | Estimated Time | Vendor Docs                                     | Open Source                                                                                                                 |
| ------------------------------------- | -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [Typeform](https://www.typeform.com/) | 5 minutes      | [view](https://www.typeform.com/help/webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/typeform/v3.rb) |

## What is Typeform?

[Typeform](https://www.typeform.com/) helps users build beautiful, engaging, and conversational online forms, surveys, quizzes, landing pages.

## **How It Works**

Typeform hosts forms that are submitted by users.

* When a form is submitted in Typeform, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send form submission from Typeform into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Typeform account setup. We will also assume that you know how to create a form, if not please see Typeform’s documentation [here](https://www.typeform.com/help/my-1st-typeform/).

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Typform logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Apex Ping**

1.  **Dashboard -> Select Desired Form**&#x20;

    <figure>![Apex Ping dashboard](<../.gitbook/assets/image (5) (1) (1) (3).png>)<figcaption><p>Select your desired form</p></figcaption></figure>
2. On the **Configure Tab -> Webhooks tab**
   1. **Paste** the **PagerTree Endpoint URL** you copied for the box under “Destination URL”
   2. **Click On/Off Toggle** at the bottom of the page to enable the webhook.
   3.  **Click “Save Changes** button&#x20;

       <figure>![Apex Ping Configure](<../.gitbook/assets/image (2) (1) (1) (1).png>)<figcaption><p>Configure the PagerTree Endpoint URL</p></figcaption></figure>
   4. **Click “View my typeform”** button in the upper right hand corner of the screen

***

You have successfully completed the Typeform Integration.

***
