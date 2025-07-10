---
description: Connect your Azure Monitor alerts to PagerTree.
---

# Azure Monitor

| Company                                                                      | Estimated Time | Vendor Docs                                                                                            | Open Source                                                                                                                       |
| ---------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| [Microsoft Corporation](https://azure.microsoft.com/en-us/services/monitor/) | 10 minutes     | [view](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/alerts-common-schema-definitions) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/azure\_monitor/v3.rb) |

## What is Azure Monitor?

[Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/) is a full stack monitoring service in [Azure](https://azure.microsoft.com/) that provides a complete set of features to monitor your Azure resources in addition to resources in other clouds and on-premises.

## How It Works

Azure Monitor triggers user defined alerts by watching metrics.

* When an alert is fired (`Fired` state) in Azure Monitor, an alert is created in PagerTree automatically.
* When the alert is resolved (`Resolved` state) in Azure Monitor, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alarms from Azure Monitor to PagerTree. The estimated time for this integration is 10 minutes. We assume that you already have a PagerTree and Azure account setup. Additionally, we assume you already have some resources available to monitor in your Azure account.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Azure logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Azure**

1.  **Navigate** to **Azure Monitor**

    <figure>![ Azure Monitor](<../.gitbook/assets/image (1) (2) (2) (1).png>)<figcaption><p>Navigate to Azure Monitor</p></figcaption></figure>

#### **Create an Action Group**

1.  **Click** the **Alerts Tab** from the Monitor Navigation.

    <figure>![Azure Monitor Alerts](<../.gitbook/assets/image (35).png>)<figcaption><p>Navigate to the Alerts tab.</p></figcaption></figure>
2.  **Click** the **Manage Actions Tab** from the Alerts page.

    <figure>![Azure Monitor Manage Actions](<../.gitbook/assets/image (36).png>)<figcaption><p>Click the Manage actions tab.</p></figcaption></figure>
3.  **Click** the **Add action group** from the Manage Actions page.

    <figure>![Azure Monitor Manage Actions](<../.gitbook/assets/image (19) (3).png>)<figcaption><p>Click the Add action group button.</p></figcaption></figure>
4. In the create action group form, add the following:
   1. Select an appropriate **subscription** and **resource group** to add this action group to.
   2.  For the **action group name** and **display name** enter **PagerTree**.

       <figure>![action group in Azure Monitor](<../.gitbook/assets/image (11) (1) (1).png>)<figcaption><p>Create the action group in Azure Monitor</p></figcaption></figure>
5. **Click** the **Next: Notifications >** button.
6. In the actions form, add the following:
   1. **Action Type** - **Webhook**
   2. **Name** - **PagerTree**
   3. **Webhook URI** - **Paste** the **PagerTree Endpoint URL** you copied earlier
   4. **\*\*VERY IMPORTANT\*\*** - **Enable the common alert schema** - **Yes**
   5.  **Click OK**

       <figure>![webhook pointing to your PagerTree endpoint URL](<../.gitbook/assets/image (34).png>)<figcaption><p>Configure the action to be a webhook pointing to your PagerTree endpoint URL.</p></figcaption></figure>
7. **Click** the **Review + Create** button.
8. **Click** the **Create** button.

#### **Attach Action Group to Alert Rules**

1.  From the Azure Monitor Dashboard, **Click** the **Manage alert rules tab**.

    <figure>![Azure Monitor Manage alert rules](<../.gitbook/assets/image (13) (1) (2).png>)<figcaption><p>Click the Manage alert rules tab.</p></figcaption></figure>
2. If you already have alert rules, you can attach the Action Group directly to your alerts by adding the **PagerTree Action Group** to the **Alert Rule Actions**. If you don’t have any Alert Rules yet, follow the steps below:
   1.  **Click** the **+ New alert rule** button

       <figure>![Manage alert rules](<../.gitbook/assets/image (5) (1) (1) (2).png>)<figcaption><p>Click the New alert rule button.</p></figcaption></figure>
   2. In the Create Alert Rule form, do the following:
      1. Select the **Scope** (resource) to monitor
      2. Select the **Condition** to Fire an alert on
      3. Under the **Actions** select the **PagerTree Action Group**, click **Select**
      4. Add the **Alert Rule Details**
      5.  Click **Create Alert Rule**

          <figure>![ Azure Monitor Alert Rule to perform the PagerTree action.](<../.gitbook/assets/image (16) (1) (1).png>)<figcaption><p>Configure the Azure Monitor Alert Rule to perform the PagerTree action.</p></figcaption></figure>

***

You have successfully completed the Azure Monitor Integration.

***
