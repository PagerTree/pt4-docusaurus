---
description: >-
  A Dockerfile is the blueprint for building Docker images, providing a
  declarative and reproducible way to define the environment and dependencies
  for containerized applications.
---

# Dockerfile

## What is a Dockerfile?

A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an [image](images.md). A Dockerfile adheres to a specific format and set of instructions, which you can find in the [Dockerfile reference](https://docs.docker.com/reference/dockerfile/).

## Common Keywords and Instructions

Dockerfile allows users to specify various commands to build the image and configure the [container](containers.md) environment. Some common instruction keywords are:

* **FROM** - The `FROM` instruction creates a new build stage from a base image. It's usually one of the first lines in a Dockerfile.
* **WORKDIR -**`WORKDIR` sets the working directory for any subsequent `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` instructions in the Dockerfile. It simplifies file path references within the Dockerfile and improves readability.
* **COPY -** The `COPY` instruction in Dockerfile copies files and directories from the host machine to the image filesystem. It is commonly used to add application code, configuration files, and dependencies to the image.
* **RUN** - The `RUN` command in a Dockerfile is used to execute commands during the image build process. When you include a `RUN` instruction in your Dockerfile, Docker will execute the specified command within the container's filesystem at build time.
* **CMD** - The `CMD` command in a Dockerfile is used to specify the default command to run when a container based on the image starts. Unlike the `RUN` command, which executes commands during the image build process, the `CMD` command sets the default command that will be executed when the container is launched.
* **EXPOSE** - The `EXPOSE` keyword in a Dockerfile is used to document which ports a container listens on during runtime. It does not actually publish the port or make it accessible from outside the container. Instead, it serves as a form of documentation for developers, administrators, and container orchestration tools to understand which ports are intended to be used by the application running inside the container.
* **ENV -**`ENV` sets environment variables within the container. Environment variables can be used to pass configuration settings, specify runtime parameters, or customize the behavior of applications running in the container.

A full list of instruction keywords can be found in the [Dockerfile reference](https://docs.docker.com/reference/dockerfile/).

## Example Dockerfile

The following example shows a Dockerfile that containerizes a [NodeJS](https://nodejs.org/) application.

```docker title="Dockerfile" showLineNumbers
# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

## Building an Image From a Dockerfile

To build an image from a Dockerfile, use the `docker build` command followed by the path to the directory containing the Dockerfile. Docker builds the image layer by layer, executing each instruction in the Dockerfile and caching intermediate layers for faster subsequent builds.

Tagging Dockerfile builds provides a way to version and identify images, making managing and distributing them easier across different environments. Tags typically consist of an image name and version number or identifier.

```bash
docker build -t <image_name>:<tag> <path_to_Dockerfile_directory>
```

## Best Practices for Dockerfile

* **Use Minimal Base Images**: Start with a minimal base image to reduce image size and minimize dependencies.
* **Optimize Layers**: Combine related commands into a single `RUN` instruction to reduce the number of layers and improve build performance.
* **Leverage Caching**: Utilize layer caching to speed up build times by caching intermediate layers during subsequent builds.
* **Cleanup**: Remove unnecessary files and dependencies after installing packages to reduce image size and improve security.
* **Security**: Regularly update base images and dependencies to patch security vulnerabilities and ensure the integrity of the image.

The official Docker documentation provides [extensive best practices](https://docs.docker.com/develop/develop-images/instructions/) for Dockerfiles.
