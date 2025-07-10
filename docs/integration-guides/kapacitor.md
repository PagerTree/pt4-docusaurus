---
description: Connect your Kapacitor alerts to PagerTree using our Kapacitor Integration.
---

# Kapacitor

| Company                                         | Estimated Time | Vendor Docs                                                                | Open Source                                                                                                                  |
| ----------------------------------------------- | -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [InfluxData, Inc.](https://www.influxdata.com/) | 5 minutes      | [view](https://docs.influxdata.com/kapacitor/v1.5/nodes/http\_post\_node/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/kapacitor/v3.rb) |

## What is Kapacitor?

[Kapacitor](https://www.influxdata.com/) is an open source data processing framework that makes it easy to create alerts, run ETL jobs and detect anomalies. It can process both stream and batch data from InfluxDB. It lets you plug in your own custom logic or user-defined functions to process alerts with dynamic thresholds, match metrics for patterns, compute statistical anomalies, and perform specific actions based on these alerts like dynamic load rebalancing.

## How It Works

Kapacitor triggers alerts when alert rules are triggered.

* When an alert is **not** OK (`level !== 'OK'`) in Kapacitor, an alert is created in PagerTree automatically.
* When an alert is OK (`level === 'OK'`) in Kapacitor, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Kapacitor into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Kapacitor setup. We also assume you are familiar with the [TICK stack](https://www.influxdata.com/time-series-platform/) since we will be using several of these components to setup the Kapacitor integration.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Kapacitor logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In Kapacitor**

1.  From your Chronograph dashboard, in the left hand menu, select **Alerting -> Manage Tasks**.

    <figure>![Manage Tasks](<../.gitbook/assets/image (21) (2).png>)<figcaption><p>Navigate to Alerting -> Manage Tasks</p></figcaption></figure>
2.  Click the **Write TICKscript** button.

    <figure>![ Write TICKscript button](<../.gitbook/assets/image (16) (3).png>)<figcaption><p>Click the Write TICKscript button.</p></figcaption></figure>
3. In the TICKscript editor:
   1.  Select a database.

       <figure>![database](<../.gitbook/assets/image (18) (2).png>)<figcaption><p>Select a database.</p></figcaption></figure>
   2. Title your TICKscript (e.g. “high\_cpu”).
   3. Copy and paste the following code, replacing the **pagertree\_url** value with the **PagerTree Endpoint URL** you copied earlier.

```javascript title="cpu_alert.tick.js" showLineNumbers
var pagertree_url = '<PagerTree Endpoint URL>'
var period = 1m
var crit = 90
var warn = 80
var info = 70


var data = stream
   |from()
       .database('telegraf')
       .retentionPolicy('autogen')
       .measurement('win_cpu')
   |window()
       .period(period)
       .every(period)
   |mean('Percent_User_Time')
   |eval(lambda: "mean")
       .as('value')

var trigger = data
   |alert()
       .info(lambda: "value" > info)
       .warn(lambda: "value" > warn)
       .crit(lambda: "value" > crit)
       .stateChangesOnly()
       .message(' is  value: ')
       .id('high_cpu')
       .idTag('alertID')
       .levelTag('level')
       .messageField('message')
       .post(pagertree_url)
```

1.  Click the **Save New TICKscript** button.

    <figure>![TICKscript](<../.gitbook/assets/image (27) (1).png>)<figcaption><p>Save the TICKscript.</p></figcaption></figure>

:::info
This tick script, uses InfluxDB’s sample Telegraph collector that merely collects CPU usage on your local machine. You’ll need to apply the alert to your own tickscripts to alert on metrics you wish to monitor.
:::

The **important pieces** to this script are:

```javascript title="cpu_alert.important.tick.js" showLineNumbers
...
// will look at windows of data so you are not spammed by every datapoint
|window()
    .period(period)
    .every(period)
...
// send the alert to PagerTree with different levels. Only report state changes.
|alert()
    .info(lambda: "value" > info)
    .warn(lambda: "value" > warn)
    .crit(lambda: "value" > crit)
    .stateChangesOnly() // *very important*
    .message('{{.ID}} is {{.Level}} value: {{ index .Fields "value" }}')
    .id('high_cpu')
    .idTag('alertID')
    .levelTag('level')
    .messageField('message')
    .post(pagertree_url)
```

You have successfully completed the Kapacitor Integration.

***
