---
description: >-
  Connect your Honeybadger error, uptime, and check-in events to PagerTree using
  our Honeybadger integration.
---

# Honeybadger

| Company                                                   | Estimated Time | Vendor Docs | Open Source                                                                                                                    |
| --------------------------------------------------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Honeybadger Industries LLC](https://www.honeybadger.io/) | 5 minutes      |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/honeybadger/v3.rb) |

## What is Honeybadger?

[Honeybadger](https://www.honeybadger.io/) provides exception and uptime monitoring to keep your web apps error-free.

## **How It Works**

Honeybadger triggers error, uptime, and check-in events.

* When a event message is received from a Honeybadger with an `event` value of `occurred || down || check_in_missing`, an alert is created in PagerTree automatically.
* When a event message is received from a Honeybadger with an `event` value of `resolved || up || check_in_reporting`, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Honeybadger into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Honeybadger account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Honeybadger logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Honeybadger**

1.  From your Honeybadger homepage, **select** the appropriate **project**.&#x20;

    <figure>![ Honeybadger Dashboard](<../.gitbook/assets/image (4) (2) (1).png>)<figcaption><p>Select the appropriate project in Honeybadger</p></figcaption></figure>
2.  From the Project page, **select** the **settings tab.**&#x20;

    <figure>![Honeybadger project page settings](<../.gitbook/assets/image (3) (2) (1).png>)<figcaption><p>On the Honeybadger project page, select the settings tab.</p></figcaption></figure>
3.  From the Settings page, **select** the **alerts and integrations** tab.&#x20;

    <figure>![Honeybadger settings page alert and integrations](<../.gitbook/assets/image (21) (1) (1).png>)<figcaption><p>On the Honeybadger settings page, select the alerts and integrations tab.</p></figcaption></figure>
4.  Under the **Add a Project Integration section**, **select PagerTree.**&#x20;

    <figure>![Honeybadger PagerTree integration](<../.gitbook/assets/image (1) (2) (1) (1).png>)<figcaption><p>Under the add a project integration section, select PagerTree.</p></figcaption></figure>
5. On the Setup PagerTree page
   1. **Paste** the **PagerTree Endpoint URL** you copied in the **Url field**.
   2. **Select** the following **events**:
      1. Error Events
         1. “When an error is initially reported or when reported again after being resolved”
         2. “When an error is resolved”
      2. Uptime Events
         1. “When my sites go down”
         2. “When my sites are back to normal”
         3. Make sure you check the sites you want to notify on (right side)
      3. Error Events
         1. “When a check-in is missing”
         2. “When a check-in is reporting again”
6.  **Click** the **Save Changes Button**&#x20;

    <figure>![Honeybadger PagerTree Configuration](<../.gitbook/assets/image (2) (1) (1) (1) (2).png>)<figcaption><p>Honeybadger PagerTree Configuration</p></figcaption></figure>

You have successfully completed the Honeybadger Integration.

## Integration Options

| Option            | Description                                                                                 | Default |
| ----------------- | ------------------------------------------------------------------------------------------- | ------- |
| Honeybadger Token | The Honeybadger-Token header can be used to authenticate requests from Honeybadger servers. |         |

***
