---
description: >-
  Docker networking refers to the ability for containers to connect to and
  communicate with each other, or to non-Docker workloads.
---

# Network

## What is a Docker Network?

A [Docker network](https://docs.docker.com/network/) is a virtualized network that allows [containers](containers.md) to communicate with each other and external networks. It provides isolation, security, and flexibility for [containerized applications](overview.md#containerization-process), enabling efficient data exchange and container connectivity.

## Docker Network Driver Types

Docker provides [6 different types of network drivers](https://docs.docker.com/network/drivers/) applicable to various scenarios.

<figure>![Docker Network Types](<../.gitbook/assets/docker-network-types.png>)<figcaption><p>Docker Network Types</p></figcaption></figure>

### Bridge

The [bridge network driver](https://docs.docker.com/network/drivers/bridge/) is the most common driver type. It uses a software bridge that lets containers connected to the same bridge network communicate while providing isolation from containers that aren't connected to that bridge network.

* Default network driver in Docker. When you first install docker, a [default bridge network](https://docs.docker.com/network/drivers/bridge/#use-the-default-bridge-network) (called `bridge`) is created automatically. Newly started containers connect to it unless otherwise specified.
* Creates an internal bridge network on the Docker host, allowing containers to communicate with each other.
* Each running container is assigned its own IP address.
* Provides network address translation (NAT) for outbound traffic and internet connectivity.

### Host

The [host network driver](https://docs.docker.com/network/drivers/host/) allows containers to share the host's network stack without isolation. Containers are not allocated their own IP address, and port bindings will be published directly to the host's network interface.

* Removes network isolation between the container and the Docker host.
* Containers share the network namespace with the host, using the host's network interfaces directly. For example, if you run a container that binds to port 80 will bind to `<host_ip>:80`
* Offers improved networking performance but reduces isolation.

### None

The [none network driver](https://docs.docker.com/network/drivers/none/) completely isolates a container from the host and other containers.

* Disables networking for the container.
* Useful for scenarios where network access is not required or should be restricted.

### Overlay

[Overlay networks](https://docs.docker.com/network/drivers/overlay/) are distributed networks that span multiple Docker hosts. When using overlay networks, Docker transparently handles routing traffic to and from the correct Docker hosts and the correct destination containers. When [encryption is enabled](https://docs.docker.com/network/drivers/overlay/#encrypt-traffic-on-an-overlay-network), overlay networks allow containers to communicate securely.

* Enables communication between containers across multiple Docker hosts (Docker Swarm).
* Offers IPsec encryption at the level of the Virtual Extensible LAN (VXLAN). **Note: Encryption imposes a noticeable performance penalty, so test this option before using it in production.**

:::warning
Don't attach Windows containers to encrypted overlay networks.

Overlay network encryption isn't supported on Windows.

Docker Swarm does not report an error when a Windows host attempts to connect to an encrypted overlay network, but networking for the Windows containers is affected in the following ways:

* Windows containers cannot communicate with Linux containers on the network.
* Data traffic between Windows containers on the network isn't encrypted.
:::

### IPvlan

The [IPvlan network driver](https://docs.docker.com/network/drivers/ipvlan/) gives users complete control over both IPv4 and IPv6 addressing. The IPvlan driver is helpful when you are integrating containerized services with an existing physical network, need high-performance, or want fine-grained control over IP address assignment.

* Provides high-performance, native connectivity for containers.
* Allows each container to have its own unique IP address on the host network.
* Suitable for scenarios requiring high throughput and low latency.

### Macvlan

The [Macvlan network driver](https://docs.docker.com/network/drivers/macvlan/) allows containers to appear as physical devices on your network. It works by assigning each container on the network a unique [MAC address](https://en.wikipedia.org/wiki/MAC\_address).

* Enables each container to have its own MAC address and IP address on the host network.
* Offers network connectivity similar to physical hosts.
* Ideal for applications requiring direct host-like networking capabilities.

The Macvlan driver is helpful, especially for legacy applications or applications that need to monitor network traffic.

The Macvlan network type requires you to dedicate one of your host's physical interfaces to the virtual network. The network should be appropriately configured to support the potentially large number of MAC addresses that could be created by running many containers. See the warnings provided in [Docker documentation](https://docs.docker.com/network/drivers/macvlan/).

## Which Network Type Should I Use?

[Bridge networks](network.md#bridge) are the optimal choice for most scenarios encountered in Docker. Containers within this network communicate using individual IP addresses and DNS names. Moreover, they possess access to your host’s network, granting them connectivity to the internet and your local area network (LAN).

[Host networks](network.md#host) excel when direct binding of ports to your host’s interfaces is necessary, without concern for network isolation. They enable containerized applications to network like they are running directly on your host.

[Overlay networks](network.md#overlay) become essential when communication between containers on different Docker hosts is required (think Docker Swarm). These networks facilitate the establishment of distributed environments, ensuring high availability across the network.

[IPvlan networks](network.md#ipvlan) are an advanced option, catering to specific requirements concerning container IP addresses, tags, and routing. They offer fine-grained control over network configurations, making them suitable for complex network setups.

[Macvlan](network.md#macvlan) networks should be used when containers must emulate a physical device on your host’s network. This functionality proves beneficial, particularly when running applications tasked with monitoring network traffic.

## Docker Network Commands

### Create a Docker Network

You can create a Docker network using the `docker network create` command, specifying the network driver type and any additional configuration options.

```bash
# syntax
docker network create -d <driver_type> <name>

# example
docker network create -d bridge db
```

### Run a Container in a Network

You can run a Docker container in a specified network using the `--network=<network_name>` flag using the `docker run` command.

```bash
# syntax
docker run --network=<network_name> -itd --name=<container_name> <image_name>
    
# example
docker run --network=db -itd --name=app1 busybox
```

### Connect a Running Container to a Network

To connect a running container to a network, you can use the `docker network connect` command specifying the container ID or name and the network name.

```bash
# syntax
docker network connect <network_name> <container>

# example
docker network connect db app1
```

### Disconnect a Container from a Network

You can disconnect a container from a network using the `docker network disconnect` command. Containers are immediately disconnected and do not need to be restarted.

```bash
# syntax
docker network disconnect <network_name> <container>

# example
docker network disconnect db app1
```

### List Docker Networks

List all your Docker networks with the `docker network ls` command.

```bash
docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
aba8a070c077   bridge    bridge    local
2ef1e444c7ed   host      host      local
eb88d5417a3f   none      null      local
```

## Frequently Asked Docker Network Questions

### How to Use Networks with Docker Compose?

In [Docker Compose](compose.md), you can define networks in the `networks` section of your `docker-compose.yml` file. This allows you to [specify network configurations](https://docs.docker.com/compose/networking/#specify-custom-networks) for multi-container applications.

```yaml
services:
  app:
    image: busybox
    networks:
      - db
  postgres:
    image: postgres:latest
    networks:
      - db
networks:
  db:
```

### How Do Docker Networks Work?

Docker leverages your host’s network stack to establish its networking infrastructure. This involves [manipulating iptables rules](https://docs.docker.com/network/packet-filtering-firewalls/#add-iptables-policies-before-dockers-rules) to route traffic to your containers efficiently, ensuring isolation between Docker networks and your host.

[iptables](https://linux.die.net/man/8/iptables), the standard Linux packet filtering tool, dictates how traffic traverses your host’s network stack. Docker networks add filtering rules that route matching traffic to your container's application. Docker automatically configures these rules and eliminates the need for manual interaction with iptables.

Each Docker container is allocated its own [network namespace,](#user-content-fn-1)[^1] leveraging a Linux kernel feature to create isolated virtual network environments. Additionally, containers generate virtual network interfaces on your host, enabling communication beyond their namespace using your host’s network.

While Docker's networking implementation involves complex and low-level details, it abstracts them away from end users, delivering a seamless container networking experience that is predictable and efficient. For complete documentation, see [Docker's packet filtering and firewalls documentation](https://docs.docker.com/network/packet-filtering-firewalls/).

[^1]: A network namespace is a feature provided by the Linux kernel that allows processes to have their own isolated view of the network stack. Essentially, it creates a separate instance of the network stack for each namespace, providing a unique network environment for processes within that namespace.

    In the context of Docker, each container is assigned its own network namespace. This means containers have their own isolated networking configuration, including network interfaces, routing tables, firewall rules, and network sockets. As a result, containers can run their own network services without interfering with or being affected by other containers or the host system's network configuration.
