---
date: 2022-12-15
authors: amiller
description: >-
  Docker Commands Cheat Sheet - A quick reference guide to Docker CLI commands
  used on a daily basis: usage, examples, snippets and links.
---

# ✨ Docker Commands Cheat Sheet

In this article I will highlight the **6 key docker commands** I use on a daily basis while using [Docker](https://www.docker.com/) in the real world.

By no means is this an extensive list of docker commands. I kept it short on purpose so you could use it as a quick reference guide. I’ve also omitted the topic of building images and the commands that are associated with that.

At the bottom of the page, I’ll also put some good links to other Docker resources I like or frequently use as well as other PagerTree cheat sheet documents. For a full crash course, check out our [Learn Docker Series](https://pagertree.com/learn/docker)!

| Command                                    | Short Description                                |
| ------------------------------------------ | ------------------------------------------------ |
| `docker ps`                                | List running containers                          |
| `docker exec -it <container name> /bin/sh` | SSH into container                               |
| `docker restart <container name>`          | Restart a container                              |
| `docker stats`                             | Show running container stats                     |
| `docker system df`                         | Check docker daemon disk space usage             |
| `docker system prune -af`                  | Remove images, networks, containers, and volumes |

<!-- truncate -->

<figure>![Docker Command Cheat Sheet](<.gitbook/assets/docker-commands-cheat-sheet.png>)<figcaption><p>See download link below for PDF</p></figcaption></figure>

## Check Running Containers <a href="#check-running-containers" id="check-running-containers"></a>

* Command: `docker ps`
* Description: Show running containers.
* Official Docs: [https://docs.docker.com/engine/reference/commandline/ps/](https://docs.docker.com/engine/reference/commandline/ps/)

Normally I will use this command just as often as I use `ls` command on a \*NIX terminal. It’s especially useful when you first SSH to a machine to check what’s running. It’s also useful during the development and configuration process since you’ll likely have containers stopping/starting/crashing.

<figure>![Docker PS Example Output](<https://pagertree.com/assets/img/posts/2020/01/06/docker-ps.png>)<figcaption><p>docker ps Example Output</p></figcaption></figure>

## SSH Into Container <a href="#ssh-into-container" id="ssh-into-container"></a>

* Command: `docker exec -it <container name> /bin/sh`
* Description: SSH into a container.
* Official Docs: [https://docs.docker.com/engine/reference/commandline/exec/](https://docs.docker.com/engine/reference/commandline/exec/)

This is probably my 2nd most popular command. Normally I am using this while trying to debug a container and need to shell into the container. Just note the `-i` flag means **interactive** and `-t` means **TTY** (aka a teletype terminal).

Also, you can use any command instead of `/bin/sh`; I only put that here because I frequently am SSHing into an alpine image which doesn’t support bash.

<figure>![Docker Cheat sheet exec](<https://pagertree.com/assets/img/posts/2020/01/06/docker-exec-it.png>)<figcaption><p>docker exec -it Example Output</p></figcaption></figure>

## Restart A Container <a href="#restart-a-container" id="restart-a-container"></a>

* Command: `docker restart <container name>`
* Description: Restart a container.
* Official Docs: [https://docs.docker.com/engine/reference/commandline/restart/](https://docs.docker.com/engine/reference/commandline/restart/)

I debated putting this command in here, since I don’t use it all that often, but it’s a nice to have. Great example of when to use this - you change your [prometheus configuration](https://pagertree.com/blog/prometheus-monitoring-tutorial) and need it to pick up the changes in your config file. You might also use this when [resizing a volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html).

Other commands you might use often, but I didn’t think were so worthy of their own section are `docker start` ([see docs](https://docs.docker.com/engine/reference/commandline/start/)) and `docker stop` ([see docs](https://docs.docker.com/engine/reference/commandline/stop/)). You’ll use these commands normally when setting up or testing images and you’ll likely use a lot of flags. I didn’t think they were so applicable because you should honestly be using [docker compose](https://docs.docker.com/compose/) or some other orchestration system (like [Amazon ECS](https://aws.amazon.com/ecs/) or [Kubernetes](https://kubernetes.io/)) to launch your containers.

## Check CPU and Memory Usage <a href="#check-cpu-and-memory-usage" id="check-cpu-and-memory-usage"></a>

* Command: `docker stats`
* Description: Display a live stream of running containers usage statistics.
* Official Docs: [https://docs.docker.com/engine/reference/commandline/stats/](https://docs.docker.com/engine/reference/commandline/stats/)

I’m normally using this command when I am trying to figure out optimal [soft/hard limits](https://docs.docker.com/config/containers/resource\_constraints/) for containers. You might also use this if you are debugging which container is using most of your host’s resources.

<figure>![Docker Stats Example Output](<https://pagertree.com/assets/img/posts/2020/01/06/docker-stats.png>)<figcaption><p>docker stats Example Output</p></figcaption></figure>

## Check Disk Space Usage <a href="#check-disk-space-usage" id="check-disk-space-usage"></a>

* Command: `docker system df`
* Description: Display information about disk space being used by your containers.
* Official Docs: [https://docs.docker.com/engine/reference/commandline/system\_df/](https://docs.docker.com/engine/reference/commandline/system\_df/)

This one doesn’t come up to often, but it has, especially when you are building lots of images on a box or you are storing lots of data (like [prometheus](https://pagertree.com/blog/prometheus-monitoring-tutorial)). If you are, you might consider setting up a cron job to [prune your images and volumes on a recurring basis](https://nickjanetakis.com/blog/docker-tip-32-automatically-clean-up-after-docker-daily).

<figure>![Docker command cheat sheet System Off](<https://pagertree.com/assets/img/posts/2020/01/06/docker-system-df.png>)<figcaption><p>docker system df Example Output</p></figcaption></figure>

## Prune Images and Volumes <a href="#prune-images-and-volumes" id="prune-images-and-volumes"></a>

* Command: `docker system prune -af`
* Description: Remove all unused images (dangling and unreferenced), containers, networks, and volumes.
* Official Docs: [https://docs.docker.com/engine/reference/commandline/system\_prune/](https://docs.docker.com/engine/reference/commandline/system\_prune/)

You’ll probably only use this command on a Docker build machine or on your dev box, nevertheless take note, cause you are likely to use it.

<figure>![Docker command cheat sheet image prune](<https://pagertree.com/assets/img/posts/2020/01/06/docker-system-prune-af.png>)<figcaption><p>docker system prune -af Example Output</p></figcaption></figure>

Also, just like mentioned above, if this is a build box consider setting up a cron job to prune your images. If you’re a cron syntax noob like me, you might find [crontab.guru](https://crontab.guru/) of use in understanding the syntax and shortcuts for [popular time intervals](https://crontab.guru/examples.html).

<figure>![Docker command cheat sheet crontab](<https://pagertree.com/assets/img/posts/2020/01/06/crontab-l.png>)<figcaption><p>crontab -l Example Output</p></figcaption></figure>

## Docker Links You Might Find Useful <a href="#docker-links-you-might-find-useful" id="docker-links-you-might-find-useful"></a>

### Images <a href="#images" id="images"></a>

* [VPN](https://github.com/hwdsl2/docker-ipsec-vpn-server) - Run an IPsec VPN server. Super useful if you work from cafes like Starbucks.
* [Prometheus + Grafana Setup](https://github.com/stefanprodan/dockprom) - Out of the box Prometheus and Grafana setup. We actually use a fork of this for monitoring the [PagerTree](https://pagertree.com/) platform.
* [Alpine Image](https://hub.docker.com/\_/alpine/) - Slim OS image for Node.js apps in production.
* [GitLab Runner](https://docs.gitlab.com/runner/install/docker.html) - A GitLab Runner inside a docker container. We use this at PagerTree to build our images.

### Blog Articles <a href="#blog-articles" id="blog-articles"></a>

* [Learn Docker Series](https://pagertree.com/learn/docker) - A quick and concise overview of all the peices of Docker you need to know.
* [Docker Crash Course](https://blog.sourcerer.io/a-crash-course-on-docker-learn-to-swim-with-the-big-fish-6ff25e8958b0) - If you’re new to Docker this is a great crash course. Starts from installing Docker all the way to docker compose. It can be a lot to take in so you might have to read it a couple times.
* [Deployment Automation with GitLab Runner](https://medium.com/@alfianeffendy/deployment-automation-with-gitlab-runner-aws-ecs-docker-c3007908f358) - Super helpful writeup on setting up the GitLab Runner for your own CI/CD pipeline. Used this tutorial extensively when setting up PagerTree’s CI/CD.

### PagerTree Cheat Sheets

* [PromQL Cheat Sheet](https://pagertree.com/blog/promql-cheat-sheet-a-quick-guide-to-prometheus-query-language)
* [Ruby On Rails Cheat Sheet](https://pagertree.com/blog/ruby-on-rails-cheat-sheet)
* [PowerShell Cheat Sheet](https://pagertree.com/blog/powershell-cheat-sheet-essential-commands-for-efficient-scripting)

### Cheat Sheets (PDFs) <a href="#cheat-sheets" id="cheat-sheets"></a>

You can download this entire blog article with the "Export as PDF" link in the top right of this page (you might have to be on the desktop version. Additionally, below I've provided some PDFs from the web I have found useful.

[pagertree.com docker commands cheat sheet](<.gitbook/assets/docker-commands-cheat-sheet.pdf>)

[Official Docker Cheat Sheet](<.gitbook/assets/docker_official_cheat_sheet.pdf>)

[Red Hat Developer Docker Cheat Sheet](<.gitbook/assets/red_hat_developer_docker_cheat_sheet.pdf>)

[Docker Cheat Sheet V2 by @dockerlux](<.gitbook/assets/cheat-sheet-v2.pdf>)
