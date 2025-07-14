---
description: A DevOps and SRE Incident Management Guide
---

# What is Incident Management? Beginner's Guide

**Incident management** is the process used by [DevOps](devops/what-is-devops.md) and IT Operations teams of responding to an unplanned event or service interruptions (incidents) to restore service to normal as quickly as possible while minimizing business impact.

**Incident** is a broad term describing events that disrupt or reduce the quality of a service. Some examples of incidents:

* A business application going down (complete outage)
* A very slow web application (degradation in performance)
* A piece of software functionality that is broken (software bug)

Incidents can vary widely in [severity](incident-management/severity-levels.md), but usually require immediate response from [on-call teams](incident-management/on-call.md). An incident is resolved when the affected service resumes service and is restored to its intended state.

## Why is incident management important?

Incident management is a critical process for any organization that aims to provide a reliable service to its customers. Service outages can come with significant costs. Having a well-defined incident management process can help minimize those costs. The benefits of a well-defined process include:

* Faster response and resolution time
* Reduced costs and/or revenue losses
* Better communication both internally (response teams) and externally (customers)
* Continuous learning and improvement

## Steps of the incident management process

[Incident management processes](https://pagertree.com/learn/devops/what-is-devops/top-25-devops-interview-questions#id-23.-what-is-incident-management) can be slightly different depending on the size, type, and maturity of a company, but in general these are the steps:

1. [Detect](./#detect)
2. [Respond](./#respond)
3. [Resolve](./#resolve)
4. [Learn](./#learn)

:::tip
The key to good incident management is having a good process, clear communication, and a calm head.
:::

### Detect

#### Identify and Log

Incidents can come from anywhere. In most cases, incidents will come from [monitoring and alerting tools](https://pagertree.com/blog/system-monitoring-7-best-apm-tools) but could also be manually reported by an employee or a customer. No matter the source, the first two steps are 1) the incident is identified 2) the incident is logged in the incident management system.

Typically incident management systems will include:

* The source of the incident (monitoring system or person).
* The date and time the incident was first reported.
* A description of the incident (including screenshots and/or logs).
* A unique identification number for the incident.

#### Categorize & Prioritize

Not all incidents are created equally. Start by assessing the incident's impact on the business. A couple of things to consider:

* How many people are impacted?
* What are the potential financial, security, and compliance implications?

Incidents should be assigned a [severity](incident-management/severity-levels.md) that quickly and clearly communicates impact. Compare this incident to all other open incidents and determine its relative priority.

### Respond

* **Initial Diagnosis** - Ideally, your front-line support team or primary on-call can see the incident from detection to resolution, but if they can't they should escalate to any additional teams. At this point, all pertinent information should be logged and communication channels in a well-known place (like a chat tool channel or a video conference bridge) should be established.
* **Escalate** - At this point, the next team takes the logged data and continues the diagnosis. If this team can't diagnose the incident, the escalation process continues.
* **Communicate** - The team should regularly communicate and share status updates with impacted internal and external stakeholders.
* **Investigation and Diagnosis** - Investigation continues until the who, what, where, and why of the incident. Teams might need to bring in outside resources to help with the incident.

### Resolve

In the resolve step, the responding team(s) implement a repair for what was identified during the [Investigation and Diagnosis](https://pagertree.com/learn/devops/what-is-observability) phase. One or more repairs will result in the affected service returning to normal. The incident is usually considered "over"  when the customer impact ends. At this point, the measurement for [Mean Time To Recover (MTTR)](incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics.md#mean-time-to-recovery-mttr) ends.

### Learn

Lastly, it's important to ensure whatever caused the incident doesn't happen again in the future. A root cause analysis and postmortem should be written for all major incidents. Learning from an incident could show opportunities for improvement and/or automation in the technology and or processes. At this point, the measurement for [Mean Time To Resolve (MTTR)](incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics.md#mean-time-to-resolve-mttr) ends.

## Common Incident Management Tools

The following are common categories of tools used throughout the incident lifecycle:

* **Monitoring** - automated systems to alert you if something is wrong with your system.
* **Incident Tracking** - a tool to serve as a central location to document and track incidents across multiple services.
* **Alerting System** - a tool supporting [on-call schedules](https://pagertree.com/) and reliable notifications to always notify the right person on your team.
* **Chat Room** - real-time text communication is key for diagnosing and resolving incidents as a team.
* **Video Call** - to host a "war room" call with any responders that need to be involved.
* **Status Page** - to communicate incident updates both internally and externally.
