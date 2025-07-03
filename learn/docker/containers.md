---
description: >-
  A Docker container image is a lightweight, standalone, executable package of
  software that includes everything needed to run an application: code, runtime,
  system tools, system libraries and settings.
---

# Containers

## What are Docker Containers?

[Docker](overview.md#what-is-docker) containers are lightweight, portable, and self-contained environments that encapsulate an application and its dependencies.

Docker containers provide a consistent runtime environment across different systems, enabling applications to run seamlessly in various environments, regardless of the host machine's configuration.

Docker containers run on top of a shared OS the host system provides.

<figure>![Docker Container](<../.gitbook/assets/docker-container.png>)<figcaption><p>Docker Container</p></figcaption></figure>

## How do Docker Containers Work?

Docker containers leverage operating system (OS) level virtualization to isolate applications from the underlying host system. Each container shares the host operating system's (OS) kernel but has its own filesystem, processes, network interfaces, and resource limits. This isolation ensures that containers remain independent and do not interfere with each other or the host system.

## How are Docker Containers Different from Images?

* **Containers**: Containers are instances of Docker images running as isolated processes on a host system. They include the application code, runtime, libraries, and dependencies required to run the application.
* **Images**: [Images](images.md) are read-only templates used to create containers. They contain all the files and configurations needed to run an application. Images are typically built from a [Dockerfile](dockerfile.md) and can be shared and reused to create multiple containers.

##
