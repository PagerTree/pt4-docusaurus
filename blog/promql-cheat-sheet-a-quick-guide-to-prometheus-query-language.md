---
date: 2023-06-13
authors: amiller
description: >-
  A quick guide to Prometheus Query Language (PromQL) with examples for querying time series data, aggregation functions, and range vectors.
---

# ✨ PromQL Cheat Sheet: A Quick Guide to Prometheus Query Language

[Prometheus](https://prometheus.io/) is an open-source monitoring and alerting toolkit that has gained significant popularity in DevOps and systems monitoring. At the core of Prometheus lies [PromQL (Prometheus Query Language)](https://prometheus.io/docs/prometheus/latest/querying/basics/), a powerful and flexible query language used to extract valuable insights from the collected metrics. In this guide, we will explore the basics of PromQL and provide query examples for an example use case.

<!-- truncate -->

## Example Scenario

You have a [high availability](sre-metrics-availability.md) web app that you maintain. You'd like to have some observability into the traffic of your application. Your environment consists of 3 production web servers and 1 staging web server. Below is a table of instance vectors for your servers.

| Server Instance | environment | http\_requests\_total(t0) | http\_requests\_total(t1) |
| --------------- | ----------- | ------------------------- | ------------------------- |
| web\_prod\_1    | production  | 100                       | 110                       |
| web\_prod\_2    | production  | 200                       | 220                       |
| web\_prod\_3    | production  | 300                       | 330                       |
| web\_stg\_1     | staging     | 10                        | 20                        |

## Querying Time Series

[PromQL](https://pagertree.com/learn/prometheus/promql) allows you to query [time series data](https://pagertree.com/learn/prometheus/data-model#time-series), which consists of [metrics](https://pagertree.com/learn/prometheus/data-model#what-is-a-metric) and their corresponding [labels](https://pagertree.com/learn/prometheus/data-model#what-is-a-label). The basic syntax for querying time series is as follows:

```promql
<metric_name>{<label_name>=<label_value>, ...}
```

Example:

To query the total HTTP requests metric for your fleet of servers, you would use:

```promql
http_requests_total
```

The above example would return an instance vector for each server in your fleet.

```
{__name__="http_requests_total", server="web_prod_1", environment="production"} = [100, 110]
{__name__="http_requests_total", server="web_prod_2", environment="production"} = [200, 220]
{__name__="http_requests_total", server="web_prod_3", environment="production"} = [300, 330]
{__name__="http_requests_total", server="web_stg_1", environment="staging"} = [10, 20]
```

### Instance Vector Selectors

[Instance vector](https://pagertree.com/learn/prometheus/promql/series-selection#instant-vector) selectors allow you to filter and focus on specific labels to extract relevant metrics. To filter the time series, append a comma-separated list of label matchers in curly braces `{}`

```promql
http_requests_total{environment="production"}
```

The above example would return an instance vector for each production server in your fleet.

```
{__name__="http_requests_total", server="web_prod_1", environment="production"} = [100, 110]
{__name__="http_requests_total", server="web_prod_2", environment="production"} = [200, 220]
{__name__="http_requests_total", server="web_prod_3", environment="production"} = [300, 330]
```

### Label Matching Operators

Additionally, PromQL provides the following [label matching operators](https://pagertree.com/learn/prometheus/promql/series-selection#filter-by-label):

* `=`: Select labels that are exactly equal to the provided string.
* `!=`: Select labels that are not equal to the provided string.
* `=~`: Select labels that regex-match the provided string.
* `!~`: Select labels that do not regex-match the provided string.

:::info
Regex matches are fully anchored. A match of `env=~"foo"` is treated as `env=~"^foo$"`. You can [test your regex matches here](https://regex101.com/) using the Golang flavor.
:::

So, to select all of our staging servers, we could use the following query:

```promql
http_requests_total{server=~".*_stg_.*"}
```

## Aggregation Functions

PromQL provides various aggregation functions to summarize and aggregate time series data. Here are a few commonly used functions:

* `sum`: Calculates the sum of all matching time series.
* `avg`: Computes the average value of matching time series.
* `min`: Returns the minimum value among all matching time series.
* `max`: Returns the maximum value among all matching time series.

Example:

To calculate the average HTTP requests across all production instances, you can use:

```promql
avg(http_requests_total{environment="production"})
```

and The above would first return the instance vectors and then generate the average:

```
{__name__="http_requests_total", server="web_prod_1", environment="production"} = [100, 110]
{__name__="http_requests_total", server="web_prod_2", environment="production"} = [200, 220]
{__name__="http_requests_total", server="web_prod_3", environment="production"} = [300, 330]

  [100, 200]
  [200, 400]
  [300, 600]
+ ----------
  [600, 1200]
÷    3,    3
  -----------
= [200, 400]

{__name__="avg(http_requests_total{environment="production"})"} = [200, 400]
```

## Range Vectors and Functions

PromQL allows you to work with [range vectors](https://pagertree.com/learn/prometheus/promql/series-selection#range-vector), representing time series data over a specified time range. This is particularly useful for analyzing trends and patterns. Here are a few important range functions:

* `rate`: Calculates the "**per-second rate of increase"** of a time series over a specified time range.
* `irate`: Similar to `rate`, but calculates the "**instantaneous per-second rate of increase"** of a time series over a specified time range by only considering the last 2 points.
* `increase`: Computes the **"absolute increase"** in a time series value over a specified time range.

:::info
Enjoying this content? Check out our full article on Counter Rates and Increases here: [https://pagertree.com/learn/prometheus/promql/counter-rates-and-increases](https://pagertree.com/learn/prometheus/promql/counter-rates-and-increases)
:::

<figure>![PromQL: increase vs rate functions](<.gitbook/assets/promql-cheat-sheet-increase-vs-rate.jpg>)<figcaption><p>PromQL: increase vs rate functions</p></figcaption></figure>

<figure>![PromQL: rate vs irate functions](<.gitbook/assets/promql-cheat-sheet-rate-vs-irate.jpg>)<figcaption><p>PromQL: rate vs irate functions</p></figcaption></figure>

Example:

To calculate the number of HTTP requests you are getting for your entire production fleet.

```promql
sum(increase(http_requests_total{environment="production"}))
```

The above would first return the instance vectors, then calculate the difference between the vector values `t1-t0`, then sum them.

```
{__name__="http_requests_total", server="web_prod_1", environment="production"} = [100, 110]
{__name__="http_requests_total", server="web_prod_2", environment="production"} = [200, 220]
{__name__="http_requests_total", server="web_prod_3", environment="production"} = [300, 330]

  [100, 200] -> increase() = 200 - 100 ->   100
  [200, 400] -> increase() = 400 - 200 ->   200
  [300, 600] -> increase() = 600 - 300 ->   300
                                         + -----
                                         =  600

{__name__="increase(sum(http_requests_total{environment="production"}))"} = [600]
```

## Conclusion

PromQL is a versatile and powerful query language that empowers users to extract valuable insights from [Prometheus](https://pagertree.com/learn/prometheus/overview) metrics. By mastering the basics covered in this cheat sheet, you'll be well-equipped to explore and analyze your monitoring data effectively. Remember, this blog post only scratches the surface. Experiment with different [functions](https://prometheus.io/docs/prometheus/latest/querying/functions/) and [operators](https://prometheus.io/docs/prometheus/latest/querying/operators/) to make the most of PromQL's capabilities.

By keeping this cheat sheet handy, you'll be able to navigate PromQL queries efficiently and unlock the full potential of Prometheus for monitoring and alerting in your systems.

### PromQL Queries Used At PagerTree

At PagerTree we monitor our systems extensively; here are some of the common queries we use. The metrics (and metric names) we use are provided by the [discord/prometheus\_exporter gem](https://github.com/discourse/prometheus\_exporter) or our own metric label name.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs 
  defaultValue="http_response_count_by_status_code" 
  values={[
  { label: 'HTTP Response Count By Status Code', value: 'http_response_count_by_status_code' },
  { label: 'Alerts Total', value: 'alerts_total' },
  { label: 'Notifications Total By Channel', value: 'notifications_total_by_channel' },
  { label: 'Sidekiq Queue Latency By Queue', value: 'sidekiq_queue_latency_by_queue' }
  ]}
>
<TabItem value="http_response_count_by_status_code">
#### HTTP Response Count by Status Code

Query:

```promql
sum(increase(fly_app_http_responses_count{app="pt4-[[environment]]-web"})) by (status) > 0
```

Graphed Result

<figure>![PromQL Use](<.gitbook/assets/image (23).png>)<figcaption></figcaption></figure>
</TabItem>

<TabItem value="alerts_total">
#### Alerts Total

Query:

```promql
sum(increase(ruby_pagertree_alerts_total{app=~"pt4-[[environment]]-.*"}))
```

Graphed Result:

<figure>![](<.gitbook/assets/image (16).png>)<figcaption></figcaption></figure>


</TabItem>

<TabItem value="notifications_total_by_channel">
#### Notifications Total By Channel

Query:

```promql
sum(increase(ruby_pagertree_message_notifications_total{app=~"pt4-[[environment]]-.*"})) by (channel)
```

Graphed Result:

<figure>![](<.gitbook/assets/image (17).png>)<figcaption></figcaption></figure>


</TabItem>

<TabItem value="sidekiq_queue_latency_by_queue">
#### Sidekiq Queue Latency By Queue

Query:

```promql
avg(ruby_sidekiq_queue_latency_seconds{app="pt4-[[environment]]-worker"}) by (queue)
```

Graphed Result:

<figure>![](<.gitbook/assets/image (19).png>)<figcaption></figcaption></figure>
</TabItem>
</Tabs>



### Resources

- <figure>![Prometheus Cheat Sheet](<.gitbook/assets/prometheus-cheat-sheet.svg>)<figcaption><p>Prometheus Cheat Sheet</p></figcaption></figure>
- [Prometheus Cheat Sheet PDF](<.gitbook/assets/prometheus-cheat-sheet.pdf>)
- ⭐ [Link to full Prometheus Knowledge Hub](https://pagertree.com/learn/prometheus/overview)

### Additional PagerTree Cheat Sheets

* [Docker Command Cheat Sheet](http://pagertree.com/blog/docker-commands-cheat-sheet)
* [Powershell Cheat Sheet](https://pagertree.com/blog/powershell-cheat-sheet-essential-commands-for-efficient-scripting)
* [Ruby on Rails Cheat Sheet](https://pagertree.com/blog/ruby-on-rails-cheat-sheet)
