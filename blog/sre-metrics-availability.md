---
date: 2022-12-15
authors: pagertree
description: >-
  Understanding SRE metrics and how they impact your platform's availability are
  fundamentals of Site Reliability Engineering.
---

# 🧠 SRE Metrics: Availability

How available is your website, service, or platform? What must you monitor and measure to ensure availability? How do you [translate uptime into availability](https://pagertree.com/learn/incident-management/common-metrics)? This chart has numbers that every Site Reliability Engineer (SRE) should know. Below the chart, you will find answers to [commonly asked questions about SRE](https://pagertree.com/blog/site-reliability-engineer-sre-interview-questions) and associated metrics.

| Uptime    | Downtime (Per Year)              |
| --------- | -------------------------------- |
| 99%       | 3 Days : 15 Hours : 39 Minutes   |
| 99.9%     | 8 Hour : 45 Minutes : 56 Seconds |
| 99.99%    | 52 Minutes : 35 Seconds          |
| 99.999%   | 5 Minutes : 15 Seconds           |
| 99.9999%  | 31 Seconds                       |
| 99.99999% | 3 Seconds                        |

<!-- truncate -->

<figure>![SRE Metrics](<.gitbook/assets/SRE Availability Metrics.png>)<figcaption></figcaption></figure>

## Site Availability <a href="#site-availability" id="site-availability"></a>

There is a saying in the NFL that goes, “A player’s best ability is his availability.” The same thing is true for websites, applications, and platforms. You can have a great website or the “best” cloud platform, but if it is not available for your customers when they need it, then your business and your reputation will suffer.

In this day and age, availability is everything, and it comes with a cost. Availability comes in many different forms, like redundancy, load balancing, multiple data centers, and engineering response, to name a few. To calculate availability, we typically look at how long service was unavailable during a specified period of time, taking into account planned maintenance and other planned downtime.

> Industry jargon refers to the number of “9’s” related to availability. For instance, one 9 would be 90%, while five 9’s would be 99.999%

## SRE Essential Metrics <a href="#sre-essential-metrics" id="sre-essential-metrics"></a>

Metrics have become the lifeblood of many organizations. Deciding what to and what not to [monitor](https://pagertree.com/blog/system-monitoring-7-best-apm-tools) can be just as important as the monitoring tools themselves ([Prometheus](https://pagertree.com/blog/prometheus-monitoring-tutorial), Grafana, systems, etc.). In many instances, there can be an overwhelming urge to gather metrics on every available function, potentially leading to information overload. To keep monitoring manageable and actionable, consider the following methods when determining your needs.

For hardware-related monitoring, consider the [**USE** Method](https://pagertree.com/learn/devops/what-is-observability/use-and-red-method#the-use-method).

* **U**tilization (% time that the resource was busy)
* **S**aturation (amount of work resource has to do, often queue length)
* **E**rrors (count of error events)

For services-related monitoring, consider the [**RED** Method](https://pagertree.com/learn/devops/what-is-observability/use-and-red-method#the-red-method).

* **R**ate (the number of requests per second)
* **E**rrors (the number of those requests that are failing)
* **D**uration (the amount of time those requests take)

For [Kubernetes](https://cloud.google.com/learn/what-is-kubernetes) related monitoring of services, consider the [Four Golden Signs](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre/four-golden-signals-sre-monitoring)

* Latency (time taken to serve a request)
* Traffic (how much demand is placed on your system)
* Errors (rate of requests that are failing)
* Saturation (how “full” your service is)

Tom Wilkie of GrafanaLabs did a great talk on these at GrafanaCon EU 2018. For more information on these methodologies watch the video below or check out this article by [Grafana Labs](https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/).

::video-youtube[Tom Wilkie of GrafanaLabs]{#zk77VS98Em8}

## History of SRE <a href="#history-of-sre" id="history-of-sre"></a>

[Site Reliability Engineering (SRE) dates back to 2003](https://thenewstack.io/site-reliability-engineering-cloud-native-operations/) when Google assigned a team of software engineers to design a concept that would make certain Google websites were efficient, scalable, and reliable. The concepts they used were so successful that other technology companies, like Netflix and Amazon, began using similar concepts as well as improving upon them. In short order, SRE became its tower within the IT architecture domain. SRE is meant to work in concert with [DevOps](https://pagertree.com/learn/devops/what-is-devops) but focuses on such things as capacity planning and [disaster recovery and response](https://pagertree.com/learn/incident-management/on-call). **Ultimately,** [**SRE focuses**](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre) **on the automation of operations endeavoring to remove the human element so that sites, applications, and platforms can be optimized.**

## Conclusion <a href="#conclusion" id="conclusion"></a>

Understanding how availability impacts the delivery of your chosen platform starts with knowing what those numbers look like. For instance, the difference between 2 9’s and 5 9’s goes from days to minutes, per year. Therefore, choosing the proper [observability methodology](https://pagertree.com/learn/devops/what-is-observability) such as RED, USE, or the Four Golden Signs will allow you to deliver high availability for your specific service. A good starting point to help you define your SRE operations can be found here, [Google’s guide to SRE Operations](https://sre.google/sre-book/table-of-contents/)

## Useful Resources <a href="#useful-resources" id="useful-resources"></a>

* [SRE Availability Metrics (PDF)](<.gitbook/assets/SRE Availability Metrics.pdf>)
* [Grafana Labs](https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/)
* [Site Reliability Engineering (SRE) dates back to 2003](https://thenewstack.io/site-reliability-engineering-cloud-native-operations/)
* [Google’s guide to SRE Operations](https://sre.google/sre-book/table-of-contents/)
* [Tim Wilkie’s GrafanaCon EU 2018 Presentation Slides](https://grafana.com/files/grafanacon\_eu\_2018/Tom\_Wilkie\_GrafanaCon\_EU\_2018.pdf)
* [Evolution of the Site Reliability Engineer](https://thenewstack.io/the-evolution-of-the-site-reliability-engineer-sre/)
