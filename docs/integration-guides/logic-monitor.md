---
description: Connect your Logic Monitor alerts to PagerTree.
---

# LogicMonitor

| Company                                            | Estimated Time | Vendor Docs                                                                           | Open Source                                                                                                                       |
| -------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [LogicMonitor Inc.](https://www.logicmonitor.com/) | 5 minutes      | [view](https://www.logicmonitor.com/support/alerts/integrations/custom-http-delivery) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/logic\_monitor/v3.rb) |

## What is LogicMonitor?

[LogicMonitor](https://www.logicmonitor.com/) provides IT observability and monitoring for physical, virtual, and cloud-based IT infrastructures

## **How It Works**

LogicMonitor triggers alerts when alerting rule conditions are met.

* When LogicMonitor sends PagerTree an alert with ("alertstatus"`=== "active" || "alertstatus" === "test"`), an alert is created in PagerTree automatically.
* When LogicMonitor sends PagerTree an alert with ("alertstatus"`=== "ack"`), the alert is acknowledged in PagerTree automatically.
* When LogicMonitor sends PagerTree an alert with ("alertstatus"`=== "clear"`), the alert is resolved in PagerTree automatically.

Additionally, PagerTree can automatically acknowledge alerts in LogicMonitor to keep your data in sync. Please see the [Alert Sync](logic-monitor.md#alert-sync) section below.

## Integration Walkthrough

In this integration tutorial we will show you how to send notifications from LogicMonitor into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and LogicMonitor account setup and generally understand how to create alerting rules.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **LogicMonitor logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In LogicMonitor**

1. Create a Custom HTTP Delivery (Settings -> Integrations -> Click "Add" -> Custom HTTP Delivery)
2. In the form, select all of the following:
   1. **Use the same URL and data to notify on various alert activities**
   2. Events - **New Alerts, Cleared**
   3. HTTP Method - **POST**
   4. URL - Select **HTTPS**. **Paste** the **PagerTree Endpoint URL** you copied (and remove https:// if needed).
   5. Alert Data
      1. **Raw**
      2. Format - **JSON**
      3. Use the template below

```json title="logic_monitor_template.json" showLineNumbers
{
  "service": "##SERVICE##",
  "alertid": "##ALERTID##",
  "alerttype": "##ALERTTYPE##",
  "alertstatus": "##ALERTSTATUS##",
  "level": "##LEVEL##",
  "host": "##HOST##",
  "datasource": "##DATASOURCE##",
  "eventsource": "##EVENTSOURCE##",
  "batchjob": "##BATCHJOB##",
  "group": "##GROUP##",
  "datapoint": "##DATAPOINT##",
  "start": "##START##",
  "finish": "##FINISH##",
  "duration": "##DURATION##",
  "value": "##VALUE##",
  "threshold": "##THRESHOLD##",
  "userdata": "##USERDATA##",
  "cmdline": "##CMDLINE##",
  "exitCode": "##EXITCODE##",
  "stdout": "##STDOUT##",
  "stderr": "##STDERR##",
  "agent": "##AGENT_DESCRIPTION##",
  "checkpoint": "##CHECKPOINT##",
  "datapointdesc": "##DPDESCRIPTION##",
  "hostdesc": "##HOSTDESCRIPTION##",
  "hostinfo": "##system.sysinfo##",
  "hostips": "##system.ips##",
  "hosturl": "##DEVICEURL##",
  "instance": "##INSTANCE##",
  "dsidesc": "##DSIDESCRIPTION##",
  "batchdesc": "##BJDESCRIPTION##",
  "dsdesc": "##DSDESCRIPTION##",
  "eventmsg": "##LIMITEDMESSAGE##",
  "eventlogmsg": "##MESSAGE##",
  "eventcode": "##EVENTCODE##",
  "eventtype": "##TYPE##",
  "eventuser": "##USER##",
  "eventlogfile": "##LOGFILE##",
  "eventsource": "##SOURCENAME##",
  "servicedetail": "##DETAIL##",
  "serviceurl": "##URL##",
  "servicegroup": "##SERVICEGROUP##",
  "date": "##DATE##",
  "clearvalue": "##CLEARVALUE##",
  "hostname": "##system.hostname##",
  "internalid": "##INTERNALID##"
}
```

You have successfully completed the LogicMonitor integration.

## Alert Sync

PagerTree can automatically acknowledge alerts in LogicMonitor when they are acknowledged in PagerTree.

1. [Create an LMv1 Token](https://www.logicmonitor.com/support/settings/users-and-roles/api-tokens#h-creating-lmv1-tokens) in Logic Monitor, make sure to save your Access **ID** & **Key**.
2. In PagerTree, edit the integration and provide the following:
   1. Acknowledge In Logic Monitor - **Enabled**
   2. Logic Monitor Account Name - Your Logic Monitor account name. (ex: https://**account\_name**.logicmonitor.com)
   3. Logic Monitor Access ID - Logic Monitor Access **ID**
   4. Logic Monitor Access Key - Logic Monitor Access **Key**
3. **Click Update.**

Now, when an alert is acknowledged in PagerTree, it will automatically also be acknowledged in LogicMonitor.

***
