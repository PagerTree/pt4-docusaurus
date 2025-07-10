---
description: >-
  In this article we will explore what a canary deployment is, as well as
  discuss the pros and cons of using the canary deployment method.
---

# What is A Canary Deployment?

Imagine being a coal miner in the early 1900’s. When you ventured into the depths of the mines, you would bring a small yellow canary in a cage. This tiny bird served as your early warning system for dangerous toxins and gasses in the mines. If this bird showed signs of distress or fell silent and motionless, you knew there was danger and pulled out quickly. A canary deployment in DevOps works in the same way.

**Canary deployments are a release method where code updates are released to a small, controlled group of users before being deployed to the entire user base.** This slow rollout helps [SREs](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre) and developers detect issues early, reducing the likelihood of [downtime](https://pagertree.com/learn/incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics#downtime) and maintaining [high availability](https://pagertree.com/blog/sre-metrics-availability) for your users. Canary deployments ensure potential problems are caught and fixed before they affect the entire user base, making the [DevOps Lifecycle](https://pagertree.com/learn/devops/what-is-devops#devops-lifecycle) safer and more reliable.

<figure>![Canary Deployment](<../../.gitbook/assets/Canary Deployment (3).png>)<figcaption><p>Canary Deployment</p></figcaption></figure>

## How Does A Canary Deployment Work?

A canary deployment works by gradually rolling out a new software update to a small, selected group of users (the ”canary group”) before deploying it to the entire user base. The process for a canary deployment is straightforward and includes:

1. **Duplicating Infrastructure:** Duplicate or split your current infrastructure to run a stable version of the software on a majority and the “canary version” on a minority of your infrastructure. Use a [load balancer](https://aws.amazon.com/what-is/load-balancing/) to direct targeted traffic to the canary version.\

2. **Select the Canary Group:** Choose a small and _diverse_ group of users to receive the new update. This group should include various user types with varying use cases to provide a more comprehensive test of the canary release.\

3. **Deploy the Update:** Roll out the new version to the selected canary group using [feature flags](https://www.optimizely.com/optimization-glossary/feature-flags). These flags allow you to enable or disable features for specific users or target specific user segments through your deployment infrastructure.\

4. **Monitor Performance:** Once the update is deployed, closely monitor its performance with the canary group. Key performance indicators (KPIs), such as the [Four Golden Signals](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre/four-golden-signals-sre-monitoring), should be tracked. [Automated monitoring tools](https://pagertree.com/blog/system-monitoring-7-best-apm-tools) can help identify any deviations from expected behavior.\

5. **Analyze the Results:** After collecting data from the canary group, analyze the results to determine the update's impact. Compare the new version's performance with the previous one as well as your [Service Level Objectives](https://pagertree.com/learn/incident-management/sla-vs-slo-vs-sli), looking for improvements or regressions. User feedback should be gathered and reviewed to identify usability issues or bugs.\

6. **Full Rollout:** If the canary deployment is successful and no critical issues are found, roll out the update to the entire user base. Depending on the confidence in the new version, this can be done gradually, increasing the rollout percentage step-by-step or all at once.

<figure>![How Does A Canary Deployment Work?](<../../.gitbook/assets/SRE Key Metrics (4).png>)<figcaption><p>How Does A Canary Deployment Work?</p></figcaption></figure>

## What are the Benefits of Canary Deployment?

Whether you plan to use blue/green, rolling, or canary deployment, every deployment type has pros and cons. Canary deployments offer several advantages:

1. **Risk Mitigation:** By limiting the initial rollout, you minimize the impact of potential issues, making it easier to address problems before a full release. This approach reduces the likelihood of widespread outages or severe bugs affecting all users, enhancing the stability of your system.\

2. **Improved User Experience:** Users are less likely to encounter widespread issues, maintaining their trust and satisfaction with your product. A smooth, stable update process ensures users enjoy new features and improvements without disruptions.\

3. **Data-Driven Decisions:** A controlled rollout partnered with good [observability practices](https://pagertree.com/learn/devops/what-is-observability) helps you make informed decisions about proceeding with the update. Observability methods like the [USE method](https://pagertree.com/learn/devops/what-is-observability/use-and-red-method#the-use-method) should be utilized to troubleshoot hardware-related performance, while the [RED method](https://pagertree.com/learn/devops/what-is-observability/use-and-red-method#the-red-method) to troubleshoot service-related issues.\

4. **Scalability:** Canary deployments can be scaled up gradually, allowing a smoother transition from old to new versions. This gradual rollout approach helps manage resources effectively, ensuring any issues are identified and addressed before affecting the entire user base.

## What are the Downsides of Canary Deployment?

Despite its advantages, canary deployments have some challenges:

1. **Resource Intensive:** Canary deployments demand more time, effort, and tools to ensure smooth execution and monitoring. Additional resources may be needed to set up automated monitoring, error tracking, user feedback systems, and comparative analysis.\

2. **Overhead:** Managing multiple software versions can add overhead to the development and operations teams. Ensuring compatibility, maintaining version control, and handling rollback scenarios require additional effort and coordination.\

3. **Inconsistent User Experience:** Users selected for a canary group may receive a vastly different experience than those still utilizing the stable version of your software. Implementing opt-ins for testing may be necessary to reduce negative user experience.

Canary deployments effectively balance [embracing and managing risk](https://pagertree.com/blog/site-reliability-engineer-sre-interview-questions#id-2.-what-are-the-key-principles-of-sre). By deploying updates to a small group of users first, you allow time for teams to catch and fix issues before all users become affected. Just like coal miners using canaries as an early warning system, canary deployments help ensure that when an update finally reaches all users, it is safe and reliable.

\
