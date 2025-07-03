---
description: >-
  A Docker image is a read-only template with instructions for creating a Docker
  container.
---

# Images

[Docker](overview.md#what-is-docker) images are the building blocks of [containerized applications](overview.md#containerization-process), providing a standardized and portable way to package and distribute software.

## What are Docker Images?

Docker images are read-only templates that contain everything needed to run a containerized application. This includes the application code, runtime, libraries, dependencies, and configuration files. Images are created from a [Dockerfile](dockerfile.md), which specifies the steps to build the image layer by layer.

Frequently, an image is derived from another image and customized. For instance, you might create an image based on the [Ubuntu image](https://hub.docker.com/\_/ubuntu) but enhance it by installing the [NGINX](https://www.nginx.com/) web server, your application, and the configuration details for its execution.

You can create your own images or utilize those created by others and share them in a registry. To create your own image, you compose a Dockerfile using a straightforward syntax to outline the required steps for its construction and execution. Each directive in a Dockerfile generates a layer within the image. Only the changed layers are rebuilt after modifying the Dockerfile and recompiling the image. This efficiency contributes to Docker images' lightweight, compact, and swift nature, distinguishing them from other virtualization technologies.

## How are Docker Images Different from Containers?

While Docker images serve as the blueprint for [containers](containers.md), containers are the runtime instances of those images. Containers are ephemeral, isolated environments that run the application specified in the image. In essence, images are static, immutable artifacts, while containers are dynamic, running instances that can be started, stopped, and destroyed.

## Where are Docker Images Stored?

Docker images are stored in repositories known as Docker registries. These registries can be public or private and serve as centralized locations for storing and sharing Docker images. Docker Hub is a popular public registry, while organizations often use private registries for proprietary or sensitive images.

## What are Alpine Images?

[Alpine images](https://hub.docker.com/\_/alpine) refer to Docker images based on the [Alpine Linux distribution](https://www.alpinelinux.org/). Alpine Linux is renowned for its minimalism and small footprint, making Alpine images significantly smaller than their counterparts based on other Linux distributions. These lightweight images are ideal for reducing container size and improving resource efficiency.

## How to Optimize Images?

Optimizing Docker images is crucial for enhancing performance, reducing resource consumption, and accelerating container deployment. Several strategies can help optimize images:

* **Use Minimal Base Images**: Start with a minimal base image, such as [Alpine](images.md#what-are-alpine-images), to minimize the image size and reduce dependencies.
* **Leverage Multi-Stage Builds**: Use multi-stage builds to separate build dependencies from the final application image, resulting in smaller, more efficient images.
* **Remove Unnecessary Files**: Remove unnecessary files, dependencies, and build artifacts from the image to reduce bloat and improve security.
* **Layer Caching**: Leverage layer caching during the image build process to speed up subsequent builds by reusing cached layers.
* **Optimize Dockerfile Instructions**: Optimize Dockerfile instructions to minimize the number of layers and reduce image size. Use techniques like combining multiple commands into a single RUN instruction and cleaning up temporary files.
