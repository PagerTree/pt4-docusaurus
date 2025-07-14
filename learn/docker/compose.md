---
description: >-
  Docker Compose is a tool for defining and running multi-container
  applications.
---

# Compose

## What is Docker Compose?

[Docker Compose](https://docs.docker.com/compose/) is a powerful tool that simplifies the management and orchestration of [multi-container](containers.md) Docker applications. It allows you to define and run multi-container applications using a single [YAML file](compose.md#the-docker-compose-file-docker-compose.yml), streamlining the development, deployment, and scaling of containerized environments.

### Key Benefits

* **Simplicity**: Docker Compose abstracts away the complexity of managing multiple containers, providing a simple and intuitive way to define and run applications.
* **Consistency**: With Docker Compose, you can define your application's configuration declaratively, ensuring consistency across different environments.
* **Scalability**: Docker Compose enables you to scale your application effortlessly by defining and running multiple instances of your containers with a single command.

### Common Use Cases

* **Development Environments**: Docker Compose is widely used for setting up development environments, allowing developers to spin up their application stack quickly and consistently.
* **Testing Environments**: Docker Compose facilitates the creation of isolated testing environments, enabling automated testing of multi-container applications (think GitHub Actions to build and test your application as part of it's CI/CD process).
* **Production Deployments**: While Docker Compose is primarily used for development and testing, it can also be leveraged for deploying small-scale production environments or prototyping solutions.

## How to Install Docker Compose?

The easiest and recommended way to install is to install Docker Compose as part of the Docker Desktop installation package, which provides a seamless experience for managing both Docker and Docker Compose on your local machine.

Installation Instructions: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## How Does Docker Compose Work?

Docker Compose reads a [YAML file](compose.md#the-docker-compose-file-docker-compose.yml) (commonly named `compose.yaml`) that defines the configuration of your multi-container application. You then interact with your Compose application through the [Compose CLI](https://docs.docker.com/compose/reference/). 

[Commands](compose.md#common-commands) like `docker compose up` are used to create and manage the containers specified in the Compose file, handling tasks such as container creation, [networking](compose.md#networking), [volume mounting](compose.md#volumes), and service dependencies. You can then use `docker compose down` to stop and remove the created containers and networks.

## Common Commands

Docker Compose provides [many commands](https://docs.docker.com/compose/reference/) for managing your multi-container application. Some common commands are listed below:

* `docker compose build` - Build or rebuild services.
* `docker compose up` - Create and start containers.
* `docker compose down` - Stop and remove containers and networks.
* `docker compose restart` - Restart service containers.
* `docker compose ps` - List containers.
* `docker compose run` - Run a one-off command on a service.
* `docker compose exec` - Execute a command in a running container.
* `docker compose top` - Display the running processes.

## The Docker Compose File (compose.yaml)

The Docker Compose file (`compose.yaml`) serves as the blueprint for your multi-container application. It defines the services, networks, volumes, and other configurations required to run your application stack. The Docker compose file follows the [Compose Specification](https://docs.docker.com/compose/compose-file/).

:::tip
The default path for a Compose file is `compose.yaml` (preferred) or `compose.yml` that is placed in the working directory. Compose also supports `docker-compose.yaml` and `docker-compose.yml` for backward compatibility with earlier versions. If both files exist, Compose prefers the canonical`compose.yaml`.
:::

Below is a sample Compose file:

```yaml title="compose.yaml" showLineNumbers
services:
  frontend:
    image: example/webapp
    ports:
      - "443:8043"
    networks:
      - appnet

  backend:
    image: example/database
    volumes:
      - dbdata:/etc/data
    networks:
      - appnet

volumes:
  dbdata:

networks:
  appnet:
```

### Environment Variables

Environment variables provide a flexible way to pass configuration information to containers at runtime. Docker Compose provides 7 different ways to [define environment variables](https://docs.docker.com/compose/environment-variables/). They are listed below with examples in the [highest to lowest priority](https://docs.docker.com/compose/environment-variables/envvars-precedence/).

:::warning
Environment variables should not be used to pass sensitive information (like passwords). [Secrets](https://docs.docker.com/compose/use-secrets/) should be used instead.
:::

#### 1) Use `docker compose run -e` in the CLI

Set environment variables as an explicit flag on the `docker compose run` command.

```bash
docker compose run -e DEBUG=1 web python console.py
```

#### 2) Environment variable substituted from your shell

Set environment variables from the command line environment when using `docker compose up`.

```bash
PG_VERSION=15 docker compose up
```

```yaml title="compose.yaml" showLineNumbers
db:
  image: "postgres:${PG_VERSION}"
```

#### 3) Use the `environment` attribute in the Compose file.

Set environment variables directly inside `compose.yaml`.

```yaml title="compose.yaml" showLineNumbers
web:
  environment:
    - DEBUG=1
```

#### 4) Use the `--env-file` argument in the CLI

Pass an [environment variable file](https://docs.docker.com/compose/environment-variables/env-file/) from the command line.

```bash
docker compose --env-file ./config/.env.dev up
```

```bash title="./config/.env.dev" showLineNumbers
DEBUG="1"
PG_VERSION="15"
```

#### 5) Use the `env_file` attribute in the Compose file

Specify the environment variable file from `compose.yaml`.

```yaml title="compose.yaml" showLineNumbers
web:
  env_file:
    - ./config/.env.dev
```

```bash title="./config/.env.dev" showLineNumbers
DEBUG="1"
PG_VERSION="15"
```

#### 6) Use a `.env` file placed at the root of your project directory

The `.env` file should be placed at the root of the project directory next to `compose.yaml`.

:::tip
The `.env` file is the default method for setting environment variables in containers.
:::

```bash title="./.env" showLineNumbers
DEBUG="1"
PG_VERSION="15"
```

#### 7) Set in a container image in the `ENV` directive.

Use the `ENV` directive in the [Dockerfile](dockerfile.md#common-keywords-and-instructions).

```docker title="Dockerfile" showLineNumbers
ENV DEBUG=1
```

### Volumes

Volumes in Docker Compose enable you to persist data generated by your containers across container restarts or deployments. They provide a reliable mechanism for managing and sharing data between containers.

Docker Engine manages [volumes](storage.md#volumes) and has the following behavior:

* `docker compose up` will automatically create volume(s) if they do not already exist.
* `docker compose up` will mount the volume(s).
* `docker compose down` will not remove or destroy the volume(s).

#### Volume Example

The following example shows how a volume can be connected to multiple containers simultaneously.

```yaml title="compose.yaml" showLineNumbers
services:
  backend:
    image: example/database
    volumes:
      - dbdata:/etc/data

  backup:
    image: backup-service
    volumes:
      - dbdata:/var/lib/backup/data

volumes:
  dbdata:
```

Running `docker compose up` will create the `dbdata` volume if it was not already created in Docker Engine. The `dbdata` volume would then be mounted to the `backend` container at `/etc/data` and to the `backup-service` container at `/var/lib/backup/data`.

#### Volume Attributes

Docker Compose supports several [volume attributes](https://docs.docker.com/compose/compose-file/07-volumes/#attributes), but an important one worth mentioning is the `external` attribute.

The external attribute tells Docker Compose the volume already exists and is managed outside of the Docker Compose lifecycle. If `docker compose up` is run, and the volume doesn't exist, Docker Compose will return an error.

### Networking

Docker Compose simplifies [container networking](network.md) by automatically creating a default network for your application stack. This network allows containers to discover and communicate with each other using service names defined in the `compose.yaml` file. The default network name is named based on the "project name" (root directory) the `compose.yaml` resides.

#### Networking Example

So as an example, let's imagine your app is in a directory called `myapp` and has the following `compose.yaml`:

```yaml title="compose.yaml" showLineNumbers
services:
  web:
    image: example/webapp
    ports:
      - "8000:8000"
  db:
    image: postgres
    ports:
      - "5432:5432"
```

Running `docker compose up` would result in:

1. A default network named `myapp_default` being created.
2. `web` and `db` service containers would be created and connected to the `myapp_default` network.

Containers could then look up services based on their names (`web` or `db`). For example, the connection string to the Postgres container would look like: `postgres://db:5432`.

### Port Mapping

Port mapping in Docker Compose enables you to expose container ports to the host system (`HOST_PORT`) or to other containers (`CONTAINER_PORT`) within the same Docker network. It allows external access to containerized services and facilitates communication between containers.

Docker Compose port mapping is specified by the pattern: `HOST_PORT:CONTAINER_PORT`

* The `HOST_PORT` is how services outside the network can connect to the service.
* The `CONTAINER_PORT` is how services inside the network can connect to the service.

#### Port Mapping Example

Let's use the following Compose file as an example:

```yaml title="compose.yaml" showLineNumbers
db:
    image: postgres
    ports:
      - "8001:5432"
```

Applications or users (outside the Docker Compose network) could use the `HOST_PORT` connect to the service. The connection URL to the database might look like `postgres://localhost:8001` if started locally.

Services (inside the Docker Compose network) would use the `CONTAINER_PORT` to connect to the service. The connection URL to the database would be `postgres://db:5432`.

### Healthcheck

Docker Compose supports [health checks](https://docs.docker.com/reference/dockerfile/#healthcheck) for containers, allowing you to define conditions for determining if a container is still working. Health checks can help detect unresponsive applications even though the process is still running.

#### Docker Compose Healtchcheck Options

* **test**: An array of strings specifying the command for checking health.
* **interval**: A duration of how often to run the check after the container has started.
* **timeout**: A duration of time to consider the test a failure.
* **retries**: Number of consecutive failures of the health check for the container to be considered unhealthy.
* **start\_period**: A duration of the allowed initialization time for the container. Failed health checks during this period will not count against the retries until after the first successful check.
* **start\_interval**: A duration of how often to run the check during the container initialization.

```yaml title="compose.yaml" showLineNumbers
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000"]
  interval: 1m30s
  timeout: 10s
  retries: 3
  start_period: 2m
```

## Frequently Asked Docker Compose Questions

### How is a Docker Compose File Different from a Dockerfile?

Dockerfiles and Docker Compose files serve complementary roles in the containerization process.

* [Dockerfiles](dockerfile.md) are used to define the contents and build process of individual Docker [images](images.md)
* [Docker Compose files](compose.md#the-docker-compose-file-compose.yaml) are used to define and manage [multi-container](containers.md) applications, orchestrating the deployment and management of multiple containers as a cohesive application stack.

### How is Docker Compose Different than Kubernetes?

While both Docker Compose and [Kubernetes](https://kubernetes.io/) are popular tools for managing containerized applications, they serve different purposes and are designed for different use cases.

**Docker Compose:**

* **Scope**: Docker Compose is primarily focused on simplifying the management of multi-container Docker applications on a single host or development environment.
* **Ease of Use**: Docker Compose provides a simple and intuitive way to define, run, and manage multi-container applications using a single YAML file (`compose.yaml`).
* **Features**: Docker Compose offers features such as service definition, container networking, volume management, and dependency management, making it well-suited for development and testing environments.
* **Scaling**: While Docker Compose supports scaling of container instances, it is limited compared to Kubernetes and is typically used for smaller-scale deployments.

#### Kubernetes:

* **Scope**: Kubernetes is a powerful container orchestration platform designed for deploying, managing, and scaling containerized applications across clusters of machines.
* **Complexity**: Kubernetes has a steeper learning curve than Docker Compose due to its extensive feature set and complex architecture.
* **Scaling**: Kubernetes excels at scaling containerized applications across multiple nodes in a cluster, providing features such as automatic scaling, self-healing, and rolling updates.
* **High Availability**: Kubernetes offers built-in support for high availability and fault tolerance, with features like pod replication, load balancing, and service discovery.
* **Production Deployments**: Kubernetes is well-suited for production deployments of containerized applications, offering advanced features for managing large-scale, mission-critical workloads.

#### Docker Compose vs Summary

* Docker Compose is ideal for local development, testing, and small-scale deployments where simplicity and ease of use are paramount.
* Kubernetes is better suited for production deployments, large-scale applications, and environments requiring high availability, scalability, and advanced orchestration features.

Ultimately, the choice between Docker Compose and Kubernetes depends on factors such as the size and complexity of your application, your deployment environment, and your organization's requirements for scalability, availability, and automation.
