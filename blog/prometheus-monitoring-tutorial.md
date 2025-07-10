---
date: 2022-12-15
authors: amiller
description: >-
  A simple 10 minute tutorial to setup a Prometheus monitoring stack. Create a
  Docker stack that includes Prometheus, Grafana, and AlertManager with a
  PagerTree integration.
---

# ✨ Prometheus Monitoring Tutorial

In this post, I will walk you through creating a simple [Prometheus](http://prometheus.io/) monitoring stack, connecting it to [Grafana](https://grafana.com/) for pretty dashboards, and finally configuring alerts via PagerTree.

_If you would like a video to follow along instead, you can see it on_ [_YouTube_](https://youtu.be/-STqqJZG36w)_. You can find all the code for this stack on_ [_Github_](https://github.com/PagerTree/prometheus-grafana-alertmanager-example)_._

<!-- truncate -->

::video-youtube[Prometheus Monitoring Tutorial]{#-STqqJZG36w}

## Setup Docker Environment

The first thing we’ll do is a machine up and running for this solution. **This tutorial assumes you will be using Ubuntu 16.04**.

I like [Digital Ocean](https://www.digitalocean.com/) for small tutorials like this one.

:::info
If you don’t already have an account, use [this link](https://m.do.co/c/ab4304b8ca5a) to create an account and get **$10 in credits**.
:::

If you don’t know how to create a Digital Ocean droplet or SSH into the machine you can follow [this article on Medium](https://medium.com/@armiiller/create-a-docker-droplet-on-digital-ocean-f19db2b4be53).

## Build the Prometheus Stack

Once you’ve created the Ubuntu server, run the following command in the shell terminal:

```shell-session
curl https://raw.githubusercontent.com/PagerTree/prometheus-grafana-alertmanager-example/master/install.sh -H 'Cache-Control: no-cache' | sudo sh; cd prometheus-grafana-alertmanager-example;
```

At this point you’ll have automagically deployed the entire Prometheus, Grafana, and Alert Manager stack. You can now access the Grafana dashboard from your browser at:

* Address: `http://<Host IP Address>:3000`
* Username: `admin`
* Password: `9uT46ZKE`

### Add the Prometheus Datasource to Grafana <a href="#add-the-prometheus-datasource-to-grafana" id="add-the-prometheus-datasource-to-grafana"></a>

Since the release of Grafana 5.x, Grafana supports [auto provisioning](http://docs.grafana.org/administration/provisioning/) data sources and dashboards. We’ve updated the repo for Grafana to auto provision the Prometheus data source and dashboards. Please continue to the next section, [Grafana Dashboards](prometheus-monitoring-tutorial.md#grafana-dashboards).

#### Grafana Dashboards

Awesome! Now if you navigate to the Dashboards in Grafana you will see data populating and some nice looking graphs.

![Grafana Dashboards](https://pagertree.com/assets/img/posts/2017/12/01/grafana-dashboards-5.x.gif)

At this point you’ll then 2 dashboards. They are pretty cool. Check them out. When your ready, head down to the [Configure Alerts Section](prometheus-monitoring-tutorial.md#configure-alerts).

**Ping Dashboard**

This dashboard monitors a couple websites for uptime.

<figure>![](<https://pagertree.com/assets/img/posts/2017/12/01/dashboard-ping.png>)<figcaption><p>Ping Dashboard</p></figcaption></figure>

**System Monitor Dashboard**

This dashboard monitors the load on the machine that is running your Prometheus stack.

<figure>![](<https://pagertree.com/assets/img/posts/2017/12/01/dashboard-system-monitoring.png>)<figcaption><p>System Dashboard</p></figcaption></figure>

## Configure Alerts

Now while the dashboards are cool, it would be even cooler if we were able to get alerted when something went wrong. Luckily for us, this project will create an alert after 30 seconds of high CPU. So let’s try to make use of it.

### Create a Prometheus Integration in PagerTree

1. Create a [new integration](https://app.pagertree.com/integrations/new).
2.  Click the Prometheus Logo.

    <figure>![](<.gitbook/assets/image (6).png>)<figcaption></figcaption></figure>
3. Fill out the following:
   1. Name
   2. Appropriate urgency for the Prometheus alerts
   3. A team alerts from Prometheus should be assigned to
4. Click Create button
5.  Copy the endpoint URL

    <figure>![](<.gitbook/assets/image (3).png>)<figcaption></figcaption></figure>

:::info
Ensure that for the team you are assigning alerts to, you are the Layer 1 on-call and that you have at least 1 notification method setup.
:::

### Modify the Alert Manager Configuration

Now we want to modify the alert manager configuration to make use of our PagerTree Webhook. Run the following command and make sure to replace `<Your PagerTree Webhook URL>` with the you copied.

```shell-session
./util/alertmanager-configure-pagertree.sh <Your PagerTree Webhook URL>;
```

After you have run the configuration script, restart the stack with the following command:

:::info
Sometimes this command fails. If it does, just run the command again.
:::

### Simulate an Alert Worthy Incident

In order for us to get an alert we’ll wan to simulate some sort of Alert Worthy Incident. From the shell terminal, run the following command:

```shell-session
./util/high-load.sh;
```

Now we’ll wait for 30 seconds or so, and if you’ve followed all the steps correctly you should get a notification saying something like `Instance {{ $labels.instance }} under high load`.

## Congrats! You’re done!

If you are reading this give yourself a pat on the back. Good job! You’ve successfully deployed a Prometheus monitoring system, hooked it up to Grafana, and configured and alerts to go to your PagerTree account.

This project is intended just to be a quick tutorial. Before being production worthy, several [security considerations](https://github.com/PagerTree/prometheus-grafana-alertmanager-example#security-considerations) should be implemented.
