---
description: >-
  Learn the differences between Service Level Agreements (SLAs), Service Level
  Objectives (SLOs), and Service Level Indicators (SLIs), and the purposes they
  serve.
---

# SLA vs SLO vs SLI: What's The Difference?



## Video-SLA, SLO and SLI Made Simple

::video-youtube[SLA, SLO and SLI Made Simple]{#-ECVHx239Ro}

Regardless of whether your service is free or paid, your customers expect a certain level of quality and availability, that's why it's important to establish clear expectations with both customers and your internal team. Doing so will help foster healthy relationships between service providers and customers, while also providing your team with measurable goals and deliverables to maintain high performance. This is where Service Level Agreements (SLAs), Service Level Objectives (SLOs), and Service Level Indicators (SLIs) come into the equation.

SLAs, SLOs, and SLIs all refer to the promises companies make to provide specific service levels to their customers but at different levels. These terms might sound technical, but they're essentially about setting clear expectations about how services are delivered and maintained, ensuring reliability, satisfaction, and continuous improvement. But what exactly are they, and what's the difference?

* **Service Level Agreements:** “The Customer Promise” - Sets the expectations between the service provider and the customer, describing the products or services guaranteed to be delivered.
* **Service Level Objectives:** “The Internal Goal” - are the objectives that must be achieved internally for each service activity, function, and process to meet the service levels promised in the SLA.
* **Service Level Indicators:** “The Actual Measured Performance” - The specific measurable metrics companies utilize to measure different aspects of the level of services they are providing to their customers.

<figure>![SLA vs SLO vs SLI](<../.gitbook/assets/SLA vs SLO vs SLI.png>)<figcaption><p>SLA vs SLO vs SLI Comparison</p></figcaption></figure>

These terms may seem vague at first glance, but each serves a specific purpose in maintaining the relationship between service providers and customers. Let's break down each term individually and see how they are related to and differ from one another.



## What is a Service Level Agreement (SLA)?

**A Service Level Agreement (SLA) is a formal agreement between a service provider and the customer that outlines the expected level of service.** No service, large or small, has [100% availability](https://pagertree.com/blog/sre-metrics-availability),  that is why SLAs set expectations upfront so customers know what they are getting while also holding the service provider accountable for maintaining the level of service they have promised. SLAs also outline the consequences for breaching the level of service promised which could include refunds, credits, or even legal action.

* **What is an SLA?:** The promise made by the service provider to the customer regarding services, performance, and consequences if service levels are breached.
* **Who Writes an SLA?:** Typically written by the legal department with input from product managers regarding actual performance.
* **Who sees the SLA?:** SLAs are customer-facing agreements.
* **Real-world example of an SLA:** [PagerTree](https://pagertree.com/), an OnCall software solution, promises customers a [99.9% monthly availability](https://pagertree.com/terms-of-service/#service-commitment).

<figure>![Service Level Agreement (SLA) Meaning](<../.gitbook/assets/Service Level Agreement SLA Definition.png>)<figcaption><p>Service Level Agreement (SLA) Definition</p></figcaption></figure>

Depending on the customer and provider's needs, SLAs can include as few or as many high-level components as desired. When writing an SLA, it is important to keep it as simple and clear as possible. When writing [SLOs](sla-vs-slo-vs-sli.md#what-is-a-service-level-objective-slo), you will have the opportunity to break down your SLA into specific measurable objectives.



## What is a Service Level Objective (SLO)?

**A Service Level Objective (SLO) is a specific, measurable deliverable that** [**internal teams**](https://pagertree.com/learn/devops/what-is-devops) **use to meet the commitment made in the** [**SLA**](sla-vs-slo-vs-sli.md#what-is-a-service-level-agreement-sla)**.** It represents the target level of service that a team commits to achieving internally. For instance, an SLO could specify 99.9% uptime or an average response time of 250 milliseconds. It defines the operational targets needed to meet or exceed the service levels agreed upon in the SLA.

* **What is an SLO?:** SLOs are internal goals set to meet or exceed the promise of the Service Level Agreement.
* **Who writes an SLO?:** SLOs are typically written by product managers with input from DevOps Teams and [SREs](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre) to meet SLA requirements.
* **Who sees the SLO?** Typically, SLOs are for internal use by the teams that need to achieve these objectives.
* **Real-world example of an SLO:** PagerTree promises customers  99.9% uptime but internally has a goal of 99.99% uptime. This is an internal error budget of almost 8 hours of uptime per year.

<figure>![Service Level Objective (SLO) Meaning](<../.gitbook/assets/Service Level Objective SLO Definition.png>)<figcaption><p>Service Level Agreement (SLO) Definition</p></figcaption></figure>

SLOs correspond directly with your SLA, giving teams the key metrics and deliverables they need to focus on to meet the performance outlined in the SLA. SLOs are also key for budgeting in planned and unplanned downtimes, which is referred to as [error budgeting](https://pagertree.com/learn/incident-management/common-metrics/#error-budget).

## What is a Service Level Indicator (SLI)?

**A Service Level Indicator (SLI), is a** [**specific, quantifiable, and measureable metric**](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre/four-golden-signals-sre-monitoring) **of the service that is provided.** Specifically, SLIs are the metrics that you [monitor ](https://pagertree.com/blog/system-monitoring-7-best-apm-tools)to determine if your SLOs are being met. SLIs are crucial for maintaining and improving service quality because they provide a foundation for [evaluating performance](https://pagertree.com/learn/devops/what-is-observability). They help teams identify issues, understand user experience, and make data-driven decisions to meet service-level commitments outlined in SLAs.&#x20;

* **What is an SLI?:** An SLI is the actual measured metric of the service provided. This includes stable services and new [deployments](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre/what-is-a-canary-deployment).
* **How do I monitor SLIs?:** SLIs can be monitored and measured with a host of tools, including [Prometheus](https://prometheus.io/), [Datadog](https://www.datadoghq.com/), and many more.
* **Who sees the SLI?:** SLIs are for use by both internal teams and customers to determine if promises made in the SLA have been met.
* **Real-world example of an SLI:** PagerTrees monitors its systems with both internal and external monitoring software, making this data [available to customers](https://status.pagertree.com/).

<figure>![Service Level Indicator (SLI) Meaning](<../.gitbook/assets/Service Level Indicator SLI Definition.png>)<figcaption><p>Service Level Indicator (SLI) Definition</p></figcaption></figure>

SLI metrics are wholly dependent on your SLAs and SLOs because they are the actual measured performance of your promised service. Service providers should aim to keep SLIs above both their SLAs and SLOs, though with a built-in error budget. Some SLIs may fall below internal SLOs.



## SLO vs SLA: What's the Difference?

SLAs are customer-facing documents typically written by legal teams and product managers. They contain the service provider's “Promise” to the customer regarding service and quality of service.

SLOs, on the other hand, are internal documents typically written by product managers that contain the internal “Goals” for the service to meet. This goal typically leaves room for feature testing as well as planned and unplanned downtimes.

<figure>![SLA vs SLO vs SLI Cheat Sheet](<../.gitbook/assets/SLA vs SLO vs SLI Cheat Sheet.png>)<figcaption><p>SLA vs SLO vs SLI Quick Reference</p></figcaption></figure>

## SLA and SLO vs SLI: What's the Difference?

SLAs and SLOs are both projections of the level of service that should be provided. They are both written by teams, usually based on historical performance data.

SLIs are the actual “Performance” of the service provided to the customer. SLIs are monitored and measured through tools like [Prometheus](/learn/prometheus/) and should be available to both internal teams and customers to ensure SLAs and SLOs are being met.&#x20;



## SLA vs SLO vs SLI in the Real World

The graph below shows the Service Level Indicator (blue), Service Level Agreement (yellow), and Service Level Objective (purple), along with examples A, B, and C.

The SLA shows a “Promised” performance of no more than 300ms response time between the customer and service provider. The SLO shows an internal goal of 250ms response time, giving the service provider a 50ms error budget.

<figure>![SLA vs SLO vs SLI Examples](<../.gitbook/assets/SLA vs SLO vs SLI graph (1).png>)<figcaption><p>SLA vs SLO vs SLI Examples</p></figcaption></figure>

Example A:  The SLI line is below the SLO and SLA, ranging from 180ms to 250ms response times. The "Performance" of the service being provided outperforms the SLO (Internal goal of 250) and the SLA (Customer Promise of 300).\
\
Example B: The SLI line is between the SLO and SLA, ranging from 250ms to 300ms response times. The "Performance" of the service being provided meets the “Promise” outlined in the SLA but is missing the internal “Goal” set in the SLO. The difference between the SLO and SLA (250ms-300ms) is called the error budget. Service providers give themselves error budgets to allow teams to adjust and improve performance before breaching an SLA, as well as to test experimental features and to account for planned/unplanned outages.

Example C: The SLI line has surpassed the SLO and SLA, ranging from 301ms to 340ms response times. The "Performance" of the service being provided is underperforming the “Promise” made in the SLA, and the internal “Goal” set in the SLO. This indicates that the service provider is in breach of the SLA, and the consequences for being in breach outlined in the SLA can come into effect. These consequences can range from refunds to legal action.

\
\


\


\
