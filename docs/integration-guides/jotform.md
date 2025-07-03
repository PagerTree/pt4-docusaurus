---
description: Connect your JotForm forms to PagerTree.
---

# JotForm

| Company                                  | Estimated Time | Vendor Docs                                                                  | Open Source                                                                                                                   |
| ---------------------------------------- | -------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [JotForm Inc.](https://www.jotform.com/) | 5 minutes      | [view](https://www.jotform.com/help/245-How-to-Setup-a-Webhook-with-JotForm) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/apex\_ping/v3.rb) |

## What is JotForm?

[JotForm](https://www.jotform.com/) helps users create online forms for generating leads, distributing surveys, collecting payments and more.

## **How It Works**

JotForm hosts forms that are submitted by users.

* When a form is submitted in JotForm, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send form submission from JotForm into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and JotForm account setup. We will also assume that you know how to create a form, if not please see JotForm’s documentation [here](https://www.jotform.com/help/2-How-to-Create-Your-First-Web-Form).

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **JotForm logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In JotForm**

1.  **Dashboard -> Select Desired Form -> Edit Form**&#x20;

    <figure>![JotForm dashboard](<../.gitbook/assets/image (17) (4).png>)<figcaption><p>Select the desired JotForm.</p></figcaption></figure>
2. On the **Settings Tab -> Integrations**
   1. **Search “webhook”** in the search box
   2.  **Click** the **“WebHooks” box**&#x20;

       <figure>![Jotform webhook integration](<../.gitbook/assets/image (1) (2) (2).png>)<figcaption><p>Click the webhook integration.</p></figcaption></figure>
   3. **Paste** the **PagerTree Endpoint URL** you copied for the box under “Add Webhook”
   4.  **Click “Complete Integration”** button&#x20;

       <figure>![webhooks PagerTree Endpoint URL.](<../.gitbook/assets/image (16) (4).png>)<figcaption><p>Add the PagerTree Endpoint URL.</p></figcaption></figure>
   5.  **Click “Finish”** button&#x20;

       <figure>![webhooks integrations ready](<../.gitbook/assets/image (2) (1) (1) (2).png>)<figcaption><p>Click Finish.</p></figcaption></figure>

***

You have successfully completed the JotForm Integration.

***
