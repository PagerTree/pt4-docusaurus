---
description: Connect your ServerGuard24 monitors to PagerTree.
---

# ServerGuard24

| Company                                             | Estimated Time | Vendor Docs | Open Source                                                                                                                        |
| --------------------------------------------------- | -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [IT75 GmbH & Co. KG](https://www.serverguard24.de/) | 5 minutes      |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/server\_guard24/v3.rb) |

## What is ServerGuard24?

[ServerGuard24](https://www.serverguard24.de/) provides server and website monitoring.

## How It Works

ServerGuard24 triggers notifications when a problem is detected.

* When monitor is down (`check_result == "CRITICAL"`) in ServerGuard24, an alert is created in PagerTree automatically.
* When a monitor is up (`check_result == "OK"`) in ServerGuard24, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send notifications from ServerGuard24 into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and ServerGuard24 account setup. It is also assumed you have created at least 1 ServerGuard24 monitor.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **ServerGuard24 logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In ServerGuard24**

1.  **Menu -> Contacts -> Create New Contact**.

    <figure>![ServerGuard24 New contact button](<../.gitbook/assets/image (8) (3).png>)<figcaption><p>Click Create New Contact Button</p></figcaption></figure>
2. On the New Contact Page:
   1. **Name** - PagerTree
   2. **HTTP Push URL** - **Paste** the **PagerTree Endpoint URL** you copied for **URL**.
   3.  Click **Save**.

       <figure>![ServerGuard24 pagertree endpoint](<../.gitbook/assets/image (10) (3).png>)<figcaption><p>Configure the new contact to have a HTTP push URL of the PagerTree Endpoint URL.</p></figcaption></figure>
3. Select a check from the Server Tab.
4. **Edit** the **Contacts section**:
   1. Select **PagerTree** as a contact, and click **Save**.
   2.  Click **Save**.

       <figure>![ServerGuard24 Edit Check](<../.gitbook/assets/image (7) (1) (2) (1).png>)<figcaption><p>Edit the check.</p></figcaption></figure>

       <figure>![ServerGuard24 PAgerTree](<../.gitbook/assets/image (6) (4).png>)<figcaption><p>Attach PagerTree as a contact.</p></figcaption></figure>
5. Edit the **Notification Settings**:
   1.  Click **Edit** on the **Notification & Intervals** sections.

       <figure>![Edit the Notification &#x26; Intervals section.](<../.gitbook/assets/image (9) (3).png>)<figcaption><p>Edit the Notification &#x26; Intervals section.</p></figcaption></figure>
   2. **De-select Email, SMS, Push**.
   3. **HTTP Push** - select **Critical** and **OK**.
   4.  Click **Save**.

       <figure>![Select HTTP Push for Critical and OK.](<../.gitbook/assets/image (5) (3).png>)<figcaption><p>Select HTTP Push for Critical and OK.</p></figcaption></figure>

***

You have successfully completed the ServerGuard24 Integration.

***
