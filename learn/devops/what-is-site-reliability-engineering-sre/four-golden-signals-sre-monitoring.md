---
description: >-
  In this article, we will learn about The Four Golden Signals, how to use and
  implement them, and explore tools for monitoring them.
---

# Four Golden Signals: SRE Monitoring

[Google’s Site Reliability Engineering book](https://sre.google/) introduced the Four Golden Signals, one of the most effective system monitoring and observability frameworks. This framework helps new and experienced Site Reliability Engineers (SREs) focus on the most critical metrics: latency, traffic, errors, and saturation. The Four Golden Signals overlap with the [USE and RED methods](https://pagertree.com/learn/devops/what-is-observability/use-and-red-method), emphasizing their significance for monitoring and observability. Understanding and utilizing these signals effectively can significantly enhance your ability to detect, diagnose, and resolve issues, ensuring [reliable service](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre/what-is-a-canary-deployment) and [high availability](https://pagertree.com/blog/sre-metrics-availability).

## What are the Four Golden Signals?

The Four Golden Signals are latency, traffic, errors, and saturation. If resources are limited and you can only monitor a select number of metrics, these should be your focus.

### Latency

**Latency measures the time it takes for a request to travel from the client to the server and back.** It's a critical indicator of the responsiveness of a system. High latency can signal bottlenecks or performance issues that may affect user experience. There are two main types of latency:

* **Request Latency:** The time taken to process a single request.
* **End-to-End Latency:** The total time a request takes to complete, including network delays and processing times.

Monitoring latency can help identify slowdowns in a system. For instance, if users report that a web application is slow, checking the latency can reveal whether the delay is due to server processing time or network issues.

### Traffic

**Traffic measures the demand placed on your system and is typically measured in requests per second.** Monitoring traffic helps understand the load on the system and can help anticipate potential scalability issues. Traffic patterns can provide insights into user behavior, peak usage times, and aid in capacity planning and resource allocation. Awareness of these patterns allows you to scale your infrastructure accordingly to handle an increased load without compromising performance.

### Errors

**Errors track the rate of failed requests, including HTTP 500 errors, timeouts, or other application-specific failures.** Monitoring errors is essential for identifying and diagnosing issues that could impact your service's functionality and reliability or lead to [downtime](https://pagertree.com/learn/incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics#downtime). A high error rate often signifies underlying problems that need immediate attention.

For instance, an increase in error rates might indicate issues such as database connectivity problems, bugs in the application code, or third-party service failures. By monitoring error metrics closely, you can quickly pinpoint and address the root causes of these issues.

### Saturation

**Saturation measures how "full" your system is, reflecting the utilization of resources like CPU, memory, disk space, and network bandwidth.** High saturation levels can lead to resource contention and declining performance. Monitoring saturation helps ensure your system operates within optimal thresholds and prevents overloading.

<figure>![The Four Golden Signals ](<../../.gitbook/assets/The Four Golden Signals SRE Monitoring (4).png>)<figcaption><p>The Four Golden Signals</p></figcaption></figure>

## How to Use The Four Golden Signals

To use the Four Golden Signals effectively, it is important to set up comprehensive monitoring and alerting for your system. This begins by:&#x20;

1. **Defining Baselines and Thresholds:** Establish normal operating ranges or [Service Level Objectives](https://pagertree.com/learn/incident-management/sla-vs-slo-vs-sli) for each signal. SLOs help identify anomalies and set up meaningful alerts. For instance, you might set a latency threshold of 200ms, beyond which an alert is triggered.
2. **Implementing Alerting:** Configure alerts to notify your [oncall team](https://pagertree.com/learn/incident-management/on-call) when signals exceed predefined thresholds, ensuring that you can respond to issues promptly. Use tools like [PagerTree](https://pagertree.com/) to manage and escalate alerts and notifications.
3. **Analyzing Trends:** Review historical data regularly to understand trends and patterns. Regular reviews can help with proactive capacity planning and identifying areas for optimization. Tools like [Google Data Studio](https://cloud.google.com/looker-studio?hl=en) or [Power BI](https://www.microsoft.com/en-us/power-platform/products/power-bi) can [aggregate](https://pagertree.com/learn/incident-management/data-aggregation-and-aggregators) and present this data in a consumable format.
4. **Automating Responses:** Where possible, automate responses to common issues. For instance, auto-scaling can help manage traffic spikes, and [automated runbooks](https://www.ibm.com/docs/en/runbook-automation?topic=started-what-is-runbook-automation) can resolve recurring issues quickly.

## SRE Monitoring Tools

Several tools can help you monitor and manage the Four Golden Signals effectively. When selecting a monitoring tool for your systems, you should consider many factors, including reliability, scalability, integrations, pricing, and ease of use.&#x20;

Learn more about monitoring tools and our top picks in our [7 Best APM Tools](https://pagertree.com/blog/system-monitoring-7-best-apm-tools) article.&#x20;

A short list of these tools include:

* [Grafana](https://grafana.com/): A visualization tool that integrates well with [Prometheus](https://pagertree.com/learn/prometheus/overview) and other data sources. It provides customizable dashboards to visualize metrics and trends.
* [Datadog](https://www.datadoghq.com/): A cloud-based monitoring and analytics platform that provides comprehensive visibility into your infrastructure, applications, and logs.
* [New Relic](https://newrelic.com/): An [observability](https://pagertree.com/learn/devops/what-is-observability) platform that offers real-time monitoring, tracing, and analytics to help you understand and improve the performance of your applications.

By leveraging these tools and focusing on the 4 Golden Signals, new and experienced [DevOps](https://pagertree.com/learn/devops/what-is-devops) and [SRE](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre) professionals can ensure their systems remain healthy, performant, and reliable. The key is to maintain a proactive approach to monitoring, continuously refine your observability practices, and respond quickly to any signs of trouble.
