---
description: >-
  Learn what PromQL is and how to use it to query Prometheus. Learn how to
  select, filter, and aggregate time series.
---

# PromQL

## What is PromQL?

PromQL is the query language of the Prometheus monitoring system. It is a central feature of Prometheus that enables dashboarding, alerting, and ad-hoc querying of the collected [time series](../data-model.md#time-series) data.

PromQL allows you to select, aggregate, and otherwise transform and compute on time series data in a flexible way. The result of an expression can either be shown as a graph, viewed as tabular data in Prometheus's expression browser, or consumed by external systems via the [HTTP API](https://prometheus.io/docs/prometheus/latest/querying/api/).

PromQL is used only for reading data.

- [Series Selection](series-selection.md)
- [Counter Rates and Increases](counter-rates-and-increases.md)
