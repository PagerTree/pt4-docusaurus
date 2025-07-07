---
description: >-
  Integrating Prometheus with remote storage systems allows you to achieve
  better scalability, durability, outsourcing of storage operations, or
  additional use cases for your Prometheus metrics.
---

# Remote Storage

Remote write allows [Prometheus](overview.md) servers to push [time series data](data-model.md#time-series) to remote storage systems or other systems that can accept Prometheus's data format. This feature is particularly useful for long-term storage, data aggregation, or integrating Prometheus with other monitoring or analytics systems.

## Why Remote Storage?

1. **Scalability** - By default, Prometheus stores all data on the local filesystem and thus is limited to the size of the single node's filesystem. Remote storage is especially helpful in scenarios with a large volume of metrics or if you need to retain data for a long period of time.
2. **Long-Term Retention** - Remote storage solutions are typically designed to handle long-term retention of metrics data efficiently. By using remote storage, you can retain historical metrics data for weeks, months, or even years without impacting the performance of your Prometheus server.
3. **Cost Effectiveness -** Some remote storage solutions, such as cloud-based object storage services like [Amazon S3](https://aws.amazon.com/s3/) or [Google Cloud Storage](https://cloud.google.com/storage), offer cost-effective storage options. Storing metrics data in these services can be more economical than storing it on local disks or in-memory storage solutions.
4. **High Availability** - Remote storage solutions often provide built-in redundancy and high availability features, ensuring your metrics data is resilient to hardware failures or other issues. This improves the reliability of your monitoring infrastructure.
5. **Features** - Prometheus is focused on storing its own [labeled data model](data-model.md) but doesn't offer a solution for processing data in other formats or not in time series form. Remote storage solutions may offer advanced querying, aggregation, rate limiting, and analysis capabilities that go beyond what Prometheus itself provides.
6. **Multi-Tenant Support** - If you're running a multi-tenant environment or providing monitoring services to multiple teams or customers, remote storage solutions can offer features for isolating and managing metrics data for different users or tenants.

Rather than trying to solve all these limitations, Prometheus allows you to integrate with third-party remote storage solutions that can compete to offer the best tradeoffs around storage features, scalability, redundancy, and cost.

## Architecture

<figure>![Prometheus Remote Storage Architecture](<../.gitbook/assets/prometheus-remote-storage.png>)<figcaption><p>Prometheus Remote Storage Architecture</p></figcaption></figure>

Prometheus allows you to send all, or a subset, of the sampled data to a remote HTTP endpoint using a "remote write" protocol defined by Prometheus. Prometheus only buffers sampled data for a few seconds before forwarding it, so transfer to third-party systems is [near real-time (NRT)](https://en.wikipedia.org/wiki/Real-time\_computing#Near\_real-time).

When Prometheus performs a [remote write](remote-storage.md#remote-write), it uses an adapter to send time series data in a format the third-party storage can understand. The data can then be read back (for use with [PromQL](promql/#what-is-promql)) later using the [remote read](remote-storage.md#remote-read) feature.

## Configuration

You can configure Prometheus to use remote\_write and remote\_read at the top-level configuration sections of the Prometheus configuration file.

### Remote Write

The [remote\_write](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote\_write) section allows for the definition of one or more URLs to which Prometheus should send sample data.

Additionally, you can configure many additional parameters, such as authentication, relabeling, parallelism, and batch sizes.

```yaml title="prometheus.yml"
remote_write:
  - url: "http://localhost:9009/api/prom/push"
    # Only keep metric names starting with "demo_".
    write_relabel_configs:
    - action: keep
      source_labels: [__name__]
      regex: 'demo_.*'
```

### Remote Read

The [remote\_read](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote\_read) section allows defining one or more URLs from which to read samples when executing PromQL.

Like the remote write, you can configure additional parameters for filtering and authentication.

```yaml title="prometheus.yml"
remote_read:
  - url: "http://localhost:9009/api/prom/api/v1/read"
    # Only query this endpoint for selectors containing the matcher job="demo".
    required_matchers:
      job: "demo"
```

## FAQ

### What are some remote storage options?

Remote storage options include and are not limited to the following:

* [Cortex](https://cortexmetrics.io/)
* [Thanos](https://thanos.io/)
* [Mimir](https://github.com/grafana/mimir)
* [VictoriaMetrics](https://victoriametrics.com/)

### What protocol does Prometheus use for remote storage?

Remote write and read protocols are based on the [protocol buffer ("protobuf")](https://protobuf.dev/) and sent over HTTP. Requests and responses are [snappy encoded](https://en.wikipedia.org/wiki/Snappy\_\(compression\)) to reduce over-the-wire size.
