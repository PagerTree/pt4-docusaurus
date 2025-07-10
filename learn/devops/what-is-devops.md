---
description: >-
  DevOps is a partnership between software development and IT teams that
  emphasizes communication, collaboration, integration, and automation.
---

# What is DevOps?

DevOps is a set of tools, practices, and philosophies that integrate and [automate](https://pagertree.com/learn/devops/what-is-devops/devops-infrastructure-and-automation) the work of software development and IT operations teams to improve and shorten the software development cycle.

[DevOps represents](https://pagertree.com/learn/devops/what-is-devops/top-25-devops-interview-questions#id-5.-what-are-the-benefits-of-devops) a change in the mindset for IT culture. DevOps focuses on incremental development and rapid delivery of software. Success relies on the ability to create a culture of accountability, improved collaboration, and joint responsibility for business outcomes.

DevOps encourages shared responsibilities. [Development](https://pagertree.com/learn/devops/what-is-devops/what-is-a-devops-engineer) and [Operations](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre) staff are both responsible for the success or failure of a product. Developers are expected to do more than just build and hand off to operations -- they are expected to share the responsibility of a product over it's lifetime, adopting a "you build it, you run it" mentality.

## 3 Key DevOps Principles

### Collaboration

Development and Operations teams work together as a single functional team that communicates, shares feedback, and collaborates throughout the entire software development and deployment cycle.

### Automation

A key practice of DevOps is to automate as much of the development and deployment lifecycle as possible. Automation is a key element of a [CI/CD pipeline](what-is-devops.md#continuous-integration-ci) that helps reduce human error while increasing productivity.

### Continuous Improvement

Continuous improvement is the practice of focusing on customer needs, reducing waste, and optimizing for speed, cost, and ease of delivery.

DevOps teams use short feedback loops with end users to develop products and services tailored to their needs. With shorter feedback loops, DevOps teams get immediate visibility into how end users interact with a software system, enabling them to develop further improvements.

## DevOps Lifecycle

<figure>![](<../.gitbook/assets/devops-loop.webp>)<figcaption><p>DevOps Lifecycle Infiniti Loop</p></figcaption></figure>

1. **Plan** - Teams identify the business needs and collect user feedback. They explore, [organize](https://pagertree.com/learn/devops/best-devops-tools/best-devops-planning-tools), and prioritize ideas to be worked on during this sprint.
2. **Code** -Teams write the code for the tasks they have prioritized. Using [tools](https://pagertree.com/learn/devops/best-devops-tools/best-devops-coding-tools) like git, code is stored in a central repository to be worked on collaboratively.
3. **Build** - Once the developers finish their task, they commit code to the central repository to be packaged by build tools like Maven, Gradle, or Docker.
4. **Test**- Automated tests check code to make sure it works correctly. Tools like Selenium, JUnit, and MiniTest can all be used to run tests in parallel and to ensure software quality. Additionally, during this phase, the packaged software can be pushed to a testing (or staging) environment for user acceptance tests, [performance testing](https://pagertree.com/learn/devops/what-is-site-reliability-engineering-sre), security testing, etc.
5. **Release** - The build is marked as "release" and then stored in a central image repository. A central image repository ensures there is always a releasable version. The team schedules the deployment based on the organization's needs.
6. **Deploy**- The packaged code is deployed to the production servers. Using [Infrastructure as Code (IaC)](#infrastructure-as-code-iac) tools, like Terraform and Chef, software can safely and predictably be deployed without downtime to end users. Deployment methods include [canary]/learn/devops/what-is-site-reliability-engineering-sre/what-is-a-canary-deployment.md) and blue-green deployment.
7. **Operate** - The release is now live and in use by customers. Teams may use software like feature flags to slowly release new features to customers.
8. **Monitor** - Data is collected from customer behavior, [application performance](https://pagertree.com/blog/system-monitoring-7-best-apm-tools), etc. The ability to [observe](https://pagertree.com/learn/devops/what-is-observability) can help identify bottlenecks affecting performance or user adoption. Feedback is then used to start the next planning stage.

## DevOps Practices

### Continuous Integration (CI)

Developers regularly merge code changes into a [central repository](https://pagertree.com/learn/devops/what-is-devops/best-ci-cd-tools#continuous-integration-ci-tools), after which automatic builds and tests are run. The key goal is to find and address bugs quicker, improve software quality, and reduce the time to validate and release new software updates.

### Continuous Delivery (CD)

Code changes are automatically built, tested, and prepared for release. Continuous Delivery comes after continuous integration and deploys all the code changes to a staging and/or production environment after the build stage.

### Infrastructure as Code (IaC)

Developers and system administrators use code to automate system configurations and operational tasks. The use of code makes configuration changes repeatable and standardized.

### Monitoring

Monitoring [applications' performance](https://pagertree.com/blog/system-monitoring-7-best-apm-tools) and logs to measure the impact and better understand how changes affect their end users. Monitoring and logging can show insights into the root causes of problems. Monitoring becomes more important as [services are increasingly expected to be available 24/7](../incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics.md).  Performing real-time analysis helps organizations more proactively monitor their services.

### Communication and Collaboration

DevOps is an agile approach to organizational change that seeks to bridge traditionally siloed divides between teams and establish new processes that facilitate increased transparency and greater [collaboration](https://pagertree.com/learn/devops/what-is-devops/what-are-the-benefits-of-devops#id-2.-enhanced-collaboration-and-communication). The goal being to align teams, people, and processes toward a more unified customer focus.

## Benefits of DevOps

### Speed

Teams that practice DevOps can release deliverables more frequently, with higher quality and stability. With more speed you can innovate for customers faster and better adapt to changing markets.

### Scale

[Infrastructure as code (IaC)](what-is-devops.md#infrastructure-as-code-iac) can help you manage your development, staging, and production environments in a repeatable and efficient manner.

### Improved Collaboration

At its core, DevOps is the collaboration between development and operations teams, who share responsibilities and combine work. Fewer handoffs and code that is designed for the environment for which it runs, makes teams more efficient and saves time.

### Security

DevOps teams can perform security audits and security testing during automated workflows to [integrate security](https://pagertree.com/learn/devops/what-is-devops/what-is-devsecops) into the end product. Automated deployments can prevent unauthorized access to production systems.

### Reliability

Using practices like [Continuous Integration (CI)](https://pagertree.com/learn/devops/what-is-devops/what-is-ci-cd#what-is-continuous-integration-ci) and [Continuous Delivery (CD)](https://pagertree.com/learn/devops/what-is-devops/what-is-ci-cd#what-is-continuous-delivery-cd), DevOps teams can more reliably ensure the quality of application updates while maintaining a positive experience for end users.
