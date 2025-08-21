---
description: Connect your Microsoft System Center Operations Manager (SCOM) alerts to PagerTree.
---

# SCOM (Microsoft System Center Operations Manager)

| Company                                    | Estimated Time | Vendor Docs                                                                                   | Open Source                                                                                                           |
| ------------------------------------------ | -------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [Microsoft](https://www.microsoft.com/) | 10 minutes     | [view](https://learn.microsoft.com/en-us/system-center/scom/) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/scom/v3.rb) |

## What is SCOM?

[Microsoft System Center Operations Manager (SCOM)](https://www.microsoft.com/) is a monitoring and management platform that provides deep visibility into the health, performance, and availability of applications, services, and infrastructure across on-premises and cloud environments.

## How It Works

SCOM triggers user-defined alerts by monitoring system performance, errors, and issues.

- When an alert is created in SCOM, an alert is created in PagerTree automatically.
- When an alert is resolved or closed in SCOM, the related alert is closed in PagerTree.

## Supported Versions

The integration supports the following versions of Windows:

- Windows Server 2012 R2 (Windows Server 2012 works too)
- Windows Server 2016
- Windows Server 2019
- Windows Server 2022

The integration supports the following versions of SCOM:

- System Center Operations Manager 2012 R2 (SCOM 2012 works too)
- System Center Operations Manager 2016
- System Center Operations Manager 2019
- System Center Operations Manager 2022

:::warning
The integration has not been tested on SCOM 1801 or 1807, but it may work on these versions.
:::

## Integration Walkthrough

In this integration tutorial, we will show you how to send alerts from SCOM into PagerTree. The estimated time for this integration is 10 minutes. We assume that you already have a PagerTree account and SCOM instance set up.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **SCOM logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url).

### In SCOM

#### Configure PowerShell Script

1. On each SCOM application host in your cluster, create a new folder named `pagertree` under your root scripts directory. The path should be `C:\scripts\pagertree`.
2. Download the [SCOM PowerShell Script](https://github.com/PagerTree/pager_tree-integrations/tree/main/app/models/pager_tree/integrations/scom/pagertree.ps1) and copy it into the directory created in Step 1. Ensure the script file is named `pagertree.ps1` and its path is `C:\scripts\pagertree\pagertree.ps1`.

    :::warning
    The minimum version of PowerShell required for the script to work is 3.0. If you’re using an older version, you’ll need to develop the PowerShell script code for converting values into JSON and posting the HTTP request to PagerTree yourself.
    :::

3. Install the PowerShell script:

    a. Open an elevated command prompt.

    b. Unblock the script file if you haven’t done so already by running the following command:

    ```powershell
    Powershell -command "Unblock-File C:\scripts\pagertree\pagertree.ps1"
    ```

    c. Run the following command, replacing **[integration url]** with the **Endpoint URL copied from PagerTree**:

    ```powershell
    Powershell -ExecutionPolicy bypass -file C:\scripts\pagertree\pagertree.ps1 -Url [integration url] -install
    ```

4. Repeat these steps on all SCOM application hosts in your cluster.

#### Testing
To test the integration, you can simulate an alert in SCOM to verify that it creates an alert in PagerTree. Ensure your SCOM environment is configured to trigger alerts based on your monitoring rules.

Trigger a test alert in SCOM (e.g., by simulating a system issue or using a test rule).
Verify that an alert is created in PagerTree.
Resolve the alert in SCOM and confirm that the corresponding alert in PagerTree is updated accordingly.

***
You have successfully completed the SCOM Integration.
***