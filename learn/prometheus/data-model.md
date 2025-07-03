---
description: >-
  Learn about the Prometheus time series data model. Understand what metrics and
  labels are. Learn best practices for naming conventions and base units.
---

# Data Model

## Time Series

Prometheus stores all data as [_time series_](https://en.wikipedia.org/wiki/Time\_series)_:_ streams of numeric values sampled at ongoing timestamps.

<figure>![Prometheus Time Series Data Model](<../.gitbook/assets/prometheus-time-series-data-model.png>)<figcaption><p>Prometheus Time Series Data Model</p></figcaption></figure>

Every time series is uniquely identified by its [metric name](data-model.md#what-is-a-metric) and [optional labels](data-model.md#what-is-a-label).

```markdown
| Series                                           | Value |
| ------------------------------------------------ | ----- |
| http_requests_total{method="POST", status="200"} | 4130  |
| http_requests_total{method="POST", status="500"} | 2     |
```

## What is a Metric?

In Prometheus, everything revolves around metrics. A metric is a feature (i.e., a characteristic) of a system being measured. Typical examples of metrics are:

* http\_requests\_total
* http\_request\_size\_bytes
* system\_memory\_used\_bytes
* node\_network\_receive\_bytes\_total

## What is a Label?

In Prometheus, metric labels are sets of key-value pairs that help categorize and differentiate subdimensions.

Typical examples of labels for the `http_requests_total` metric include:

* method: `GET|PUT|POST|DELETE`
* status: `100..599`
* path: `/api/v4/alerts`

:::warning
**CAUTION:** Remember that every unique combination of key-value label pairs represents a new time series, which can dramatically increase the amount of data stored. Do not use labels to store dimensions with high cardinality (many different label values), such as user IDs, IP addresses, email addresses, or other unbounded values.
:::

## Samples

Samples form the bulk data and are appended to a [series](data-model.md#time-series) over time.

* **Timestamps -** 64-bit integers in millisecond precision.
* **Sample values** - 64-bit floating point numbers.

## Naming Conventions

Metric names should follow these rules:

1. Use a single-word application prefix ("namespace") for the application's domain (e.g., **pagertree**\_notifications\_total, **process**\_cpu\_seconds\_total, **http**\_request\_duration\_seconds).
2. Use a single unit specified in [base units](data-model.md#base-units).
3. Use a suffix describing the unit (e.g., pagertree\_notifications\_**total**, node\_memory\_usage\_**bytes**, process\_cpu\_**seconds\_total**).
4. Represent a logical thing being measured (e.g., number of notifications sent, bytes of data transfer, request duration).

## Base Units

Prometheus does not have any hard-coded units. Base units should be used for better compatibility. The following lists some metrics families with their base units. The list is not exhaustive.

| Category         | Base Unit |
| ---------------- | --------- |
| Time             | seconds   |
| Temperature      | celcius   |
| Length           | meters    |
| Bytes            | bytes     |
| Bits             | bytes     |
| Percent          | ratio     |
| Voltage          | volts     |
| Electric current | amperes   |
| Energy           | joules    |
| Mass             | grams     |
