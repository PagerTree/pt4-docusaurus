---
description: Connect your Prometheus alerts to PagerTree.
---

# Prometheus

| Company                                                   | Estimated Time | Vendor Docs                                           | Open Source                                                                                                                   |
| --------------------------------------------------------- | -------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [Cloud Native Computing Foundation](https://www.cncf.io/) | 5 minutes      | [view](https://prometheus.io/docs/alerting/overview/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/prometheus/v3.rb) |

## What is Prometheus?

[Prometheus](https://prometheus.io/) is an open-source systems monitoring and alerting toolkit.

## How It Works

Prometheus Alertmanager creates alerts.

* When an alert is firing (`status == "firing"`) in Prometheus, an alert is created in PagerTree automatically.
* When an alert is resolved (`status == "resolved"`) in Prometheus, the alert is resolved in PagerTree automatically.

:::info
PagerTree will only make 1 alert per `groupKey` [(see docs)](https://prometheus.io/docs/alerting/configuration/#webhook\_config), until the alert is resolved by Prometheus.
:::

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from Prometheus Alertmanager into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and Prometheus Alertmanager setup.

:::info
The `group_wait` and `group_interval` will affect the delay of alerts sent into PagerTree. See [this documentation](https://prometheus.io/docs/alerting/configuration/#route) for details.
:::

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Prometheus logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In Prometheus

1. In your Prometheus Alertmanager receiver configuration, **Copy & Paste** the following, replacing **\<Copied PagerTree Endpoint URL>** with your **Endpoint URL.**

```yaml title="prometheus_alertmanager_pagertree.config.yaml" showLineNumbers
 route:
   # A default receiver
   receiver: pagertree_issues

 receivers:
 - name: 'pagertree_issues'
   webhook_configs:
   - url: '<Copied PagerTree Endpoint URL>'
```

1. Start the Alertmanager, or restart it for your configuration changes to take effect if was already running.

***

You have successfully completed the Prometheus Integration.

***
