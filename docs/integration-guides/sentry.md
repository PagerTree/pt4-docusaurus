---
description: Connect your Sentry issues to PagerTree.
---

# Sentry

| Company                                                | Estimated Time | Vendor Docs                                                                        | Open Source                                                                                                               |
| ------------------------------------------------------ | -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Functional Software Inc.](https://sentry.io/welcome/) | 1 minute       | [view](https://docs.sentry.io/product/integrations/integration-platform/webhooks/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/sentry/v3.rb) |

## What is Sentry?

[Sentry](https://sentry.io/welcome/) is a developer-first error tracking and performance monitoring platform that helps developers see what actually matters, solve quicker, and learn continuously about their applications.

## **How It Works**

Sentry triggers user-defined alerts by monitoring website performance, errors, and issues.

* When an issue or error is created in Sentry, an alert is created in PagerTree automatically.
* When an issue is resolved in Sentry, the alert is resolved in PagerTree.

## Integration Walkthrough

In this integration tutorial, we will show you how to send issues from Sentry into PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree and Sentry account setup.

### In PagerTree

1. Ensure you are logged in to the PagerTree app in the account to which you wish to add the Sentry integration.

### In Sentry

1. Navigate to **Settings -> Integrations.**
2. **Search "PagerTree".**
3.  **Click on "PagerTree".**&#x20;

    <figure>![Sentry Settings](<../.gitbook/assets/image (54).png>)<figcaption><p>Settings -> Integrations -> PagerTree</p></figcaption></figure>
4.  **Click the "Accept & Install" button.** _(This will redirect you to the PagerTree New Integration page.)_

    <figure>![Pagertree install](<../.gitbook/assets/image (55).png>)<figcaption><p>Click "Accept &#x26; Install"</p></figcaption></figure>
5.  On the PagerTree New Integration page, **provide at minimum, a name and destinations** for the Sentry issues that will be sent to this integration. **Click "Create"**.&#x20;

    <figure>![Sentry PagerTree Integration](<../.gitbook/assets/image (56).png>)<figcaption><p>Provide name and destinations. Click Create.</p></figcaption></figure>
6.  _You will be redirected back to Sentry_ and can confirm that the integration was installed correctly.&#x20;

    <figure>![Confirm that the PagerTree Sentry app is installed correctly.](<../.gitbook/assets/image (57).png>)<figcaption><p>Confirm that the PagerTree Sentry app is installed correctly.</p></figcaption></figure>

### Testing

If you would like to test that an alert will be created in PagerTree when a new issue comes into Sentry you can use our docker image to generate a fake issue.

You will need:

1. Docker running on your machine.
2. Your SENTRY\_DSN[^1].

To Test:

In your terminal run the following:

```bash
docker run -e SENTRY_DSN="<YOUR_SENTRY_DSN>" pagertree/sentry-error-faker:latest
```

This will generate an issue in Sentry similar to "CVE-2023-12345".

## Webhooks (Legacy)

PagerTree also supports Sentry's legacy webhooks.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Sentry logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Sentry**

#### Create Webhook Integration

1.  **Settings -> Integrations -> Webhooks**.&#x20;

    <figure>![Sentry Webhooks](<../.gitbook/assets/image (43).png>)<figcaption><p>Settings -> Integrations -> Webhooks</p></figcaption></figure>
2.  On the Webhook Integration Page **click “Add to Project”**.&#x20;

    <figure>![Sentry Add Project](<../.gitbook/assets/image (44).png>)<figcaption><p>Click "Add to Project" button.</p></figcaption></figure>
3.  **Paste** the **PagerTree Endpoint URL** you copied in the **Callback URLs field**. Then click, **Save Changes**.&#x20;

    <figure>![Sentry save changes](<../.gitbook/assets/image (47).png>)<figcaption><p>Paste the PagerTree Endpoint URL you copied into the Callback URLs field.</p></figcaption></figure>
4.  Click **Enable Plugin**.&#x20;

    <figure>![Sentry Enable Plugin](<../.gitbook/assets/image (46).png>)<figcaption><p>Click enable plugin.</p></figcaption></figure>

#### Add Alert Conditions

1.  Navigate to **Alerts**, and click the **"Create Alert" button**.&#x20;

    <figure>![Sentry Create Alert](<../.gitbook/assets/image (51).png>)<figcaption><p>Navigate to Alerts and click "Create Alert" button.</p></figcaption></figure>
2.  Select **Issues,** and click "**Set Conditions " button.**

    <figure>![Sentry Issues](<../.gitbook/assets/image (50).png>)<figcaption><p>Select Issues and click "Set Conditions" button.</p></figcaption></figure>
3. On the New Alert Rule Page, select the following
   1. When **any** of the following happens
      1. A new issue is created
      2. The issue changes state from resolved to unresolved
   2. Then perform these actions
      1.  Send a notification via **WebHooks**

          <figure>![Sentry Webhooks](<../.gitbook/assets/image (53).png>)<figcaption><p>Configure the new Alert rule to trigger on new issues and old issues going from resolved -> unresolved.</p></figcaption></figure>
   3. Provide an Alert Name (ex: **Report Issues to PagerTree**)
4.  **Click Save Rule**&#x20;

    <figure>![Sentry Save Rule](<../.gitbook/assets/image (52).png>)<figcaption><p>Click "Save Rule" button.</p></figcaption></figure>



***

You have successfully completed the Sentry Integration.

***

[^1]: This can be found on your Project Settings -> Client Keys page (https://\<org\_slug>.sentry.io/settings/projects/\<project\_name>/keys/) the DSN will have a domain of ingest.sentry.io
