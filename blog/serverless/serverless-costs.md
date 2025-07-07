---
date: 2022-12-15
authors: amiller
description: >-
  Learn about the hidden costs of serverless, and how to perform a cost analysis
  to understand the total cost of a serverless application.
---

# 🧠 Serverless Costs

In Part 2: [Serverless Scales](serverless-scales.md) I briefly touched on how a [serverless architecture](serverless-scales.md#serverless-architecture) can have a cost benefit. In this post, I will go over

1. How to approach and analyze the cost of serverless
2. Two detailed examples of a cost analysis

**Note:** I will make assumptions on costs based on the AWS pricing as of 3/19/2018 (see [EC2](https://aws.amazon.com/ec2/pricing/on-demand/), [Load Balancer](https://aws.amazon.com/elasticloadbalancing/pricing/), [API Gateway](https://aws.amazon.com/api-gateway/pricing/) and [Lambda](https://aws.amazon.com/lambda/pricing/) pricing). Different cloud providers offer different pricing for different solutions and services. It’s always a good idea to explore your options. Here is a [nice calculator](http://serverlesscalc.com/) that compares 4 of the big cloud providers costs.

## How to Approach & Analyze the Cost of Serverless

As we’ll see below, there are several questions you’ll need to ask yourself when making the choice to go serverless. Some costs are easy to associate with dollars and cents, others not so much. Make you you consider these four things when analyzing the total cost of serverless.

#### Consider your Application Needs

This has to be by far the most important when performing an analysis. Does it make sense for your application to go serverless? If its a sporadic process (e.g. send a weekly report) it might make sense. However, if the application runs a consistent load (e.g. bit miner) it might not.

You’ll also want to consider what is acceptable performance for you application. There are some gotcha’s to serverless, specifically “[cold-starts](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f)” (AKA the time it takes to boot your code) that affect the performance of your application. There are ways to counter the gotcha’s, but you will have to incorporate these into your serverless design. I’ll talk more on how to combat these in Part 4: [Serverless Tools and Best Practices](serverless-tools-and-best-practices.md).

### Consider basic pricing differences

In the simple graph below, I made a chart showing the break even cost analysis.

* The blue line represents the cost of an EC2 (512MB)
* The grey line represents the cost of a Lambda function (512MB)
* The orange line represents the inverse Lambda cost. (This is just the reverse grey line. We use this to solve for the intersection.)

![EC2 vs Lambda Break Event Costs Analysis Graph](https://pagertree.com/assets/img/posts/2018/03/21/ec2-vs-lambda-break-even-cost-analysis-graph.png)

As you can see, if we consider apples to apples a 512MB server ($0.0058/hr) vs 512MB Lambda ($0.03/hr), the EC2 server is always cheaper (blue vs grey line). However, if you consider a sporadic nature of the serverless function, you can actually run a serverless function for up to 4 days of execution time, and still be more cost effective than running a server full time (blue vs orange line)

### Project API Requests

If you are hosting a serverless web application, you’ll want to take a look at the [total cost](https://medium.com/@amiram\_26122/the-hidden-costs-of-serverless-6ced7844780b) of ownership. If we look at a quick costs breakdown between API gateway and Lambda, it’s straightforward that if using serverless in conjunction with an API gateway, the API gateway service will be your biggest cost, especially if your app serves large files:

![Total Cost of a Serverless Web App](https://pagertree.com/assets/img/posts/2018/03/21/total-cost-serverless-web-app.png)

For smaller applications, you won’t have to worry about this, and can most likely run inside the cloud providers free tier. However, for request intense applications or applications serving big files, the costs can get out of hand fairly quickly. Make sure to do your own due diligence, and estimate what your request load could look like, then forecast your costs accordingly.

### Assess the cost of extra code maintenance

As much as the cloud providers want to advertise that the migration to serverless is a simple “Lift & Shift” there are many gotcha’s when it comes to going serverless. Application code will most likely need to be refactored, especially if the application relies on background processing. You will also need to factor in the cost of testing and having developers with a serverless skillset to diagnose any issues that might arise. In Part 4: [Serverless Tools & Best Practices](serverless-tools-and-best-practices.md), I will show you how to minimize code maintenance by using some tools and working through a tutorial.

## Detailed Cost Analysis

### Case for Serverless

You want to host a small web application that counts votes, similar to [this one](https://app.gh-polls.com/). On average, per month, you receive 3M votes each resulting in a 1KB response which take 300ms on a (256MB lambda).

#### **Example 1: Serverless Costs**

**API Gateway Cost** = 3M requests \* $3.50/1M requests = **$10.50**\
**API Gateway Data Transfer** = (3M requests \* 1KB) \* $.09/GB = **$0.27**\
**Lambda Charges** = 3M executions \* $0.000000417/100ms = **$3.75**\
**Total Cost** = **$14.52**\


That gets you a fully functioning voting application that is highly available.

#### **Example 1: Classic Costs**

A similar setup with a classic architecture that includes 1 load balancer and 3 of the smallest EC2 (t2.nano) instances (for high availability, see [Part 2: Serverless Scales](serverless-scales.md)) would cost you:

**EC2 Cost** = 3 servers \* $.0058/hour \* 730 hours = **$12.702**\
**Load Balancer** = $.0252/hour \* 730 hours = **$18.39**\
**LCU (Data flow)** = $.008/hour \* 730 hours = **$5.84**\
**Total Cost (2 tier)** = **$36.93**\
**Total Cost (3 tier)** = **$73.86**\


#### **Example 1: Analysis**

As you can see, it is actually _**more cost effective to run the voting application in a serverless environment**_. Depending on the architecture it can be anywhere from 2x to 5x more cost effective to run serverless.

### Case for Classic Architecture

You have a legacy application (meme generator) that your boss wants you to take serverless. The application receives some text, overlays it on an image and returns it to the user. The application needs a lot of memory (2GB) to run, and takes approximately 2 seconds to generate a meme thats about 1MB in size. You application is fairly popular and receives 30M requests per month.

#### **Example 2: Serverless Costs**

**API Gateway Cost** = 30M requests \* $3.50/1M Requests = **$105**\
**API Gateway Data Transfer** = (30M requests \* 1MB) \* $.09/GB = **$2700**\
**Lambda Charges** = 30M executions \* $0.000003334/ms = **$2000.40**\
**Total Cost** = **$4805.40**\


Notice how quickly the data transfer charges added up.

This setup will successfully run your legacy meme generator, be highly available and load balanced.

#### **Example 2: Classic Costs**

In order to architect a classic setup, we’ll need to figure out how much computed power we’ll need. On average, we’ll receive 11.57 requests per second (1M requests per day / 86,400 seconds per day).

Since each request takes approximately 2 seconds and 2GB of memory, we’ll need roughly the capacity to handle double that. Looking at the EC2 pricing page, we will use 23 t2.small instances to handle our load.

**EC2 Cost** = 23 servers \* $0.023/hour \* 730 hours = **$386.17**\
**Load Balancer** = $.0252/hour \* 730 hours = **$18.39**\
**LCU (Data flow)** = (\~41GB/hour) \* $.008/hour \* 730 hours = **$239.44**\
**Total Cost (2 tier)** = **$644**\
**Total Cost (3 tier)** = **$1288**\


#### **Example 2: Analysis**

In this example, it’s actually _**more expensive to run the meme generator application in a serverless environment**_. Depending on your architecture choice, between 4x to 7x more expensive.

### Summary

In summary, a serverless architecture can save you money, especially if your application has little traffic or is sporadic in nature. A serverless architecture can also be more expensive especially for network heavy or compute intensive applications. Always make sure you do your due diligence by analyzing your needs and the total cost of ownership for a serverless application.

Make sure to check out the next post in this series Part 4: [Serverless Tools and Best Practices](serverless-tools-and-best-practices.md) where I’ll show you how to build a serverless slack command.
