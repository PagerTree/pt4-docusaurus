---
date: 2022-12-15
authors: amiller
description: >-
  Discover what serverless technology is, what it is not, and some of the pros &
  cons of a serverless architecture.
---

# 🧠 What is Serverless?

In this post we’ll answer the following questions:

* What is serverless architecture? (and what it’s not)
* What are the pros & cons of serverless?

If you already know these things, feel free to skip ahead to other posts in this series:

* [serverless-scales.md](serverless-scales.md "mention")
* [serverless-costs.md](serverless-costs.md "mention")
* [serverless-tools-and-best-practices.md](serverless-tools-and-best-practices.md "mention")

<!-- truncate -->

## What is Serverless? <a href="#what-is-serverless" id="what-is-serverless"></a>

Depending where on the internet you go to, you’ll get different answers. For example:

* [Wikipedia](https://en.wikipedia.org/wiki/Serverless\_computing) defines serverless computing as a _“cloud computing execution model in which the cloud provider dynamically manages the allocation of machine resources. Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity”_.
* [Amazon Web Services](https://aws.amazon.com/serverless/) defines serverless computing and applications as _“Build and run applications without thinking about servers”_.

## Serverless Defined <a href="#serverless-defined" id="serverless-defined"></a>

In my opinion I think serverless could best be summarized as:

> **Serverless is a cloud architecture in where resource allocation, maintenance, and highly availability is managed by the cloud provider.**

Serverless is not Docker, nor a virtual machine, and its not code that runs without a server. The term “serverless” is a misnomer, since any application still has to run on some sort of computing machine. The name is catchy, but really should convey that _serverless abstracts away server resource allocation_. It’s a nice thought, to be able to run applications without servers, but as of this writing, the technology is there yet. One must still think about certain structural components when developing serverless apps.

## Serverless Pros & Cons <a href="#serverless-pros--cons" id="serverless-pros--cons"></a>

There are many pros & cons to the serverless architecture, and whether you are a startup or a large organization you can benefit from a serverless application.

### Pros <a href="#pros" id="pros"></a>

* **Zero downtime deployment** - This is perhaps one of the biggest pros to serverless, the fact that you don’t have to think about or architect high available services. High availability is baked in. In fact, I think this is so important I wrote another blog post just that. Make sure to checkout out Part 2: [Serverless Scales](serverless-scales.md).
* **Faster deployments and quicker time to market** - Because you don’t have to worry about infrastructure or maintenance you can focus more of your time on business logic and quick iterations. This means a quicker time to market, naturally a leaner lifecycle.
* **Reduced costs** - This is a double edged sword. In most cases you can reduce your costs by [several factors](https://read.acloud.guru/how-going-serverless-helped-us-reduce-costs-by-70-255adb87b093), but if you have a consistent load it could also be more expensive. Make sure to read Part 3: [Serverless Costs](serverless-costs.md) to understand the total cost of a serverless application.
* **Less Infrastructure & Maintenance** - Another really big pro is you don’t have to maintain the infrastructure. Your cloud provider handles updates and network management. It most cases you’ll get security updates fixed before you event know they exist. For example, many serverless applications were protected against the [Spectre Vulnerability](https://aws.amazon.com/security/security-bulletins/AWS-2018-013/) before owners of these applications knew it existed.
* **Great for event-driven applications** - Serverless is a perfect use case for event driven applications. By chaining events you only pay for the execution time in response to those events. In a classic setup, you would pay for a server to be available 24/7 until an event needed processing.

### Cons <a href="#cons" id="cons"></a>

* **Multi-Tenancy (Security)** - For many businesses and applications this can be a big drawback. When running serverless, you are never on a dedicated machine, you share physical resources with other customers. This can be a big deal, especially for sensitive data.
* **Vendor lock in** - You’ll want to make sure your application is not dependent on any one vendor. In Part 4: [Serverless Tools & Best Practices](serverless-tools-and-best-practices.md) I’ll talk about how to keep your application insulated from specific vendors. You want to make sure you application can run anywhere, both in a serverless and classic environment.
* **System wide limits** - Depending on your application, it can be easy to reach system wide limits, such as concurrent serverless executions. This is especially common when using the same cloud account for development and production. Many people have accidently DDoS themselves by running load tests on the development environment, effectively starving the production environment of resources.
* **Background processing** - You can’t run jobs like polling (e.g. [SQS](https://aws.amazon.com/sqs/)) or services that need a constant connection (e.g. [socket.io](https://socket.io/)). Maximum execution time in a serverless environment is limited.
* **No dedicated hardware options** - If you need specific hardware for your application, serverless does not offer you any choices beyond the amount of RAM.
* **Debugging** - While not impossible, debugging can be challenging especially if you rely on monitoring agents.

While there are many pros & cons, don’t feel daunted by the task of evaluating if serverless is right for you.

## Summary <a href="#summary" id="summary"></a>

In conclusion, serverless can be defined as **a cloud architecture in where resource allocation, maintenance, and high availability is managed by the cloud provider**. There are many pros & cons to a serverless architecture, and as we’ll see in my next post Part 2: [Serverless Scales](serverless-scales.md), serverless can actually simplify many elements of the traditional architecture.
