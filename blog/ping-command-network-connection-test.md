---
date: 2023-12-04
authors: pagertree
description: >-
  Test network connectivity and troubleshoot issues with the ping command.
---

# 🔡 Ping Command: A Comprehensive Guide to Network Connectivity Tests

The [ping](https://linux.die.net/man/8/ping) network test, a core utility since the 80s, plays a crucial role in confirming connectivity between IP-networked devices. In this guide, we'll delve into what the ping command is, how to run a ping network test, common IP addresses to ping, interpreting results, and troubleshooting errors.

<!-- truncate -->

## Understanding Ping: More Than Just a Sound

### **What is Ping Exactly?**&#x20;

Ping is a command available on [Windows](https://ss64.com/osx/ping.html), [Mac, and Linux systems](https://linux.die.net/man/8/ping) that sends data packets to a specific IP address, gauging the existence of connectivity between devices. Originating from sonar technology, where a sound wave is emitted and an echo is awaited, ping measures the round-trip time for data requests, revealing network health and potential issues.

### How to Run a Ping Network Test

Executing a ping test varies by operating system. For Windows, open the Command Prompt, type "ping," and enter the desired IP address or domain. Mac users can use Network Utility, while Linux users employ the Terminal and [traceroute](https://linux.die.net/man/8/traceroute) command for more in-depth analysis.

<figure>![Ping Test](<.gitbook/assets/cmd-ping.png>)<figcaption><p>ping running in CMD window</p></figcaption></figure>

<figure>![Ping Test](<.gitbook/assets/bsh-ping.png>)<figcaption><p>ping running in a bash terminal</p></figcaption></figure>

## Navigating Ping Tests: Common Addresses and Results

### **Common Addresses to Ping**

Performing ping tests involves checking your internet connectivity. Reliable addresses to ping include:

* Cloudflare ([1.1.1.1](https://1.1.1.1/) and 1.0.0.1)
* Google DNS ([8.8.8.8](https://8.8.8.8) and 8.8.4.4)

Failure to receive a response from these addresses may indicate a problem on your end.

### **Understanding Ping Results**

Interpreting ping results is crucial. Analyzing server hostnames, response times, Time to Live (TTL), and packet loss provides insights into network performance. Troubleshooting connection issues becomes more effective when armed with this information.

Below is what the ping command will return:

* **Host name confirmation**: The first line displays the server's hostname translated to an IP address. It also confirms an active connection to the server was made.
* **Bytes sent to server** - The number of bytes sent to the server.
* **Response times** - Total roundtrip time for the response to return.
* **TTL (Time to Live)** - The total number of routers the packet will travel through.
* **Ping Statistics** - Overall statistics for the ping test. It includes number of packets sent, received, and lost.
* **Approximate Round Trip Times** - Minimum, maximum, and average times for the ping test. Higher times indicate a poorer quality connection or servers that are far away.

<figure>![Ping test results](<.gitbook/assets/image.png>)<figcaption><p>ping results interpretation and explaination</p></figcaption></figure>

## Troubleshooting Ping Connectivity Errors

### **Common Errors and Solutions**&#x20;

* **Request Timed Out**: There is a problem in establishing a connection. This occurs when the destination host is either non-existent, powered off, or disconnected from the network.
* **Firewall Impact**: Firewalls, based on port numbers and IP addresses, may permit or restrict traffic. In some instances, ping might be blocked as a precaution against potential reconnaissance by malicious actors.
* **Destination Host Unreachable**: The "destination host unreachable" error points to a failure in finding the route to the intended destination. This could emanate from issues within the local host or the default gateway. To resolve this, check your IP settings and verify the default gateway address.
* **Unknown Host**: This error indicates a challenge in translating the hostname to the corresponding IP address, suggesting a potential DNS server problem.

In addition to the above errors, there are instances of packet data loss, where some requests receive replies while others do not. Possible culprits for this issue include malfunctioning network cards, damaged cables, or problems with switches and routers.

