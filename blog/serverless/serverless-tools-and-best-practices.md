---
date: 2022-12-15
authors: amiller
description: >-
  Learn by example in this tutorial creating a serverless slack command using
  Node.js and Up. Learn best practices for developing serverless applications.
---

# ✨ Serverless Tools and Best Practices

Throughout this series we have been exploring how to use serverless architectures to our advantage. In this article I will show you:

1. How to [create a serverless slack command](serverless-tools-and-best-practices.md#create-the-slack-command) using Node.js & Up
2. [Best Practices](serverless-tools-and-best-practices.md#best-practices) when developing serverless applications
3. A [curated list](serverless-tools-and-best-practices.md#curated-list-of-resources) of serverless resources

<!-- truncate -->

When I first started experimenting with serverless technology, I was amazed at the complexity of managing individual functions and environments. At first I scratched my head, and thought, “how can the cloud providers actually believe people will really adopt this”? Now that was 2015, documentation was light and tools were in their infancy. Since then, things have changed dramatically. Today, I am excited to show you just how much easier the serverless development experience has become.

## Tutorial: Create a Serverless Slack Command

In the following tutorial we will be creating a serverless slack command that pings a url and checks how long the website takes to respond. We will be writing the code using [Node.js](https://nodejs.org/) and using a tool called [Up](https://github.com/apex/up) to manage our serverless application deployment.

### All things Up

I love Up for many reasons:

1. Learning curve is ultra low
2. Common uses cases like static sites or REST APIs are its bread and butter
3. Supports common Languages like [Node.js](https://nodejs.org/), [Go](https://golang.org/), [Python](https://www.python.org/) & [Java](https://java.com/)
4. For existing projects, this is the most simple “Lift & Shift” operation I have seen
5. It’s Free & Open Source

The project is maintained by [TJ Holowaychuk](https://twitter.com/tjholowaychuk), he’s built a ton of other tools that you have most likely either directly/indirectly used. He offers a Pro version for $20/month ($10/month forever with this coupon code: **am-376E79B073F3**) that I think is well worth the money. I specifically like the active warming feature (combats “[cold-starts](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f)”); it come with a slew of other features like encrypted environment variables, instant rollbacks, asset acceleration, and alerting that the free version just doesn’t have. You can find all the details [here](https://github.com/apex/up#pro-features).

### Setup

For this tutorial you will need accounts on these two platforms:

* [Slack](https://slack.com/)
* [AWS](https://aws.amazon.com/)

And for brevity of this blog post I’ll just trust that you can get these setup items done:

* [Install Up](https://up.docs.apex.sh/#installation)
* [Set Permissions](https://up.docs.apex.sh/#aws\_credentials)

### Create the Slack Command

The first thing we’ll do is create our Slack app. For this you’ll want to create a new app by going to [https://api.slack.com/apps](https://api.slack.com/apps) and clicking the **Create New App** button. Give your app a name, and select the workspace it should live in. Then click **Create App**.

![Create a new Slack App](https://pagertree.com/assets/img/posts/2018/03/21/slack-create-new-app-2.png)

Once your app is created, click the **Slack Commands** from the left hand navigation menu. Then click the **Create New Command** button. Fill in the details like so:

![Fill in the Slack Command Details](https://pagertree.com/assets/img/posts/2018/03/21/slack-create-new-command-2.png)

:::info
Keep this window up, we’ll come back to this
:::

### Download & Deploy Code

To keep this tutorial simple, I have posted all the code on [github](https://github.com/armiiller/up-slack-bot-ping). If you really enjoy reading the code, the two main files are:

* [app.js](https://github.com/armiiller/up-slack-bot-ping/blob/master/app.js) - code that actually handles the http request from slack, and pings the url
* [up.json](https://github.com/armiiller/up-slack-bot-ping/blob/master/up.json) - configuration for our project

Once you have downloaded the code, make let’s make sure we install it’s dependencies:

`npm install`

You’ll now want to run the following commands:

```shell-session
# this will deploy the project to the production environment (first time could take 60s)
up deploy production

# this will copy the url of our api to our clipboard
up url production -c
```

### Finish the Slack Command

Now that we have our API endpoint copied, go back to the Slack slash command page and paste the url in the **Request URL** field, and then click the **Save** button.

Next click the **Install App** from the left hand menu and click the **Install App to Workspace** button. You’ll be redirected to an authorization page. Click the **Authorize** button.

![Install the App](https://pagertree.com/assets/img/posts/2018/03/21/slack-install-app-1.png)

Now go to your slack workspace and give it a try. The first time it might fail because of a “cold start” taking too long to respond to but the invocations after that should work just fine.

![Test your command](https://pagertree.com/assets/img/posts/2018/03/21/slack-command-execute-1.png)

## Best Practices

From my experience working with serverless code, here are some tips and best practices when writing your serverless code:

* **Write libraries, not functions** - This will compartmentalize logic in a library that you can take to other projects. The serverless code, should really only be an adapter to the serverless platform
* **Don’t count on background processing** - If your an async fan, make sure all your deferred executions have finished before your function finishes. (This is a common mistake during “Lift & Shift” operations)
* **Minimize cold starts** - If your application is customer facing, minimize cold starts by investing in a [warming solution](https://up.docs.apex.sh/#configuration.lambda\_settings.active\_warming). It’s a terrible customer experience to have a request timeout or be slow.

## Curated List of Resources

Below I have put together a curated list of resources for your serverless knowledge:

* [Up](https://github.com/apex/up) - Deploy infinitely scalable serverless apps, apis, and sites in seconds.
* [Serverless Framework](https://github.com/serverless/serverless) - This was the first tool I used, it fairly quick to get setup, but IMHO you have to configure too many settings.
* [Apex](http://apex.run/) - Another tool by TJ, but this is a toolset more for functions, rather than an entire apps
* [How Cold Starts Really Work](https://hackernoon.com/im-afraid-you-re-thinking-about-aws-lambda-cold-starts-all-wrong-7d907f278a4f)
* [Serverless Pros & Cons](https://devops.com/go-serverless-pros-cons/)
* [Serverless Cost Calculator](http://serverlesscalc.com/)

### Summary

In this tutorial you should have successfully created a slack command using Node.js and Up, learned best practices when it comes to developing serverless applications, and now have resources to do further reading.

I really hope you have enjoyed reading this series and were able to learn something. If you liked this one, and didn’t get a chance to read the others in the series make sure you do.
