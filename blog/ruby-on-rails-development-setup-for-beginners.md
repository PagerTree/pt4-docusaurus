---
date: 2022-12-15
authors: rhasinsky
description: >-
  In this blog post I will assist you in installing a Ruby on Rails development
  environment with a simple step-by-step process.
---

# 💎 Ruby on Rails Development Setup for Beginners

Today we will install Ruby on Rails (RoR) on a Debian Linux operating system ([Ubuntu 18.04](https://releases.ubuntu.com/18.04/) LTS). With that said, RoR is compatible with other operating systems with just a few tweaks. This blog will assist you in installing RoR with a simple step-by-step process. Your installation may differ, for other operating systems refer to [this site](https://gorails.com/setup).

<!-- truncate -->

## Introduction <a href="#introduction" id="introduction"></a>

I am new to developing and have been using [Ubuntu 18.04](https://releases.ubuntu.com/18.04/) LTS, a flavor of Debian Linux, for my projects. This blog will provide the steps and information needed to get the environment and dependencies installed for RoR so you can get your first project going.

Ruby on Rails is an excellent framework for web application development. For those of you who are new to RoR, like me, you will need to install several different applications (referred to as dependencies) to ensure this runs smoothly.

### Tools You Will Need <a href="#tools-you-will-need" id="tools-you-will-need"></a>

Here are the packages, tools, and databases we will be installing:

* [git](ruby-on-rails-development-setup-for-beginners.md#install-git) - A distributed version control system.
* Create a GitHub account - Our preferred vendor that allows us to host git repositories in the cloud.
* [SSH Key](ruby-on-rails-development-setup-for-beginners.md#create-ssh-key) - Secure Shell is a protocol that allows users to control and modify their remote servers over the Internet while ensuring security.
* [HomeBrew](ruby-on-rails-development-setup-for-beginners.md#install-homebrew) - Software package manager that simplifies the installation process for Mac OSX and Linux.
* [rbenv](ruby-on-rails-development-setup-for-beginners.md#install-rbenv) - A tool that manages, installs and runs multiple versions of Ruby.
* [Visual Studio Code](ruby-on-rails-development-setup-for-beginners.md#install-visual-studio-code) - My preferred code editor.
* [Postgres](ruby-on-rails-development-setup-for-beginners.md#install-postgres) - A [relational database](https://www.codecademy.com/articles/what-is-rdbms-sql) used for long term storage.
* [Redis](ruby-on-rails-development-setup-for-beginners.md#install-redis)- A [key-value database](https://en.wikipedia.org/wiki/Key%E2%80%93value\_database) used for short term storage (caching).
* [NodeJS](ruby-on-rails-development-setup-for-beginners.md#install-nodejs) - Javascript runtime environment. Runs on the Chrome V8 engine and executes javascript code outside of a web browser.
* [yarn](ruby-on-rails-development-setup-for-beginners.md#install-yarn) - A more secure npm (node package manager - gets installed with NodeJS).

## Step-By-Step Directions <a href="#step-by-step-directions" id="step-by-step-directions"></a>

Here we will be navigating through the steps to get your Ruby on Rails development environment setup and all of the dependencies installed.

### Install git <a href="#install-git" id="install-git"></a>

You will need to run the commands below in your terminal to install git.

```shell-session
$ sudo add-apt-repository ppa:git-core/ppa -y
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install git -y
```

Remember git is the program for distributed version control, and [GitHub](https://github.com/) is our preferred vendor. So, if you haven’t already, create an account with GitHub.

### Create SSH Key <a href="#create-ssh-key" id="create-ssh-key"></a>

You will need to [create an SSH key](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and connect it to GitHub. We will first check to see if there are any existing SSH keys. Run this command to see if there are any pre-existing SSH keys.

```shell-session
$ ls -al ~/.ssh
```

If there are none, you will then run the next commands to generate a new one.

```shell-session
$ ssh-keygen -t ed25519 -C "[email protected]"
```

Next, press **ENTER**.

```shell-session
> Enter a file in which to save the key (/home/you/.ssh/id_ed25519): [Press enter]
```

Next you will be giving it your information.

```shell-session
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again] 
```

Once you have the SSH key generated you will need to add it to the ssh-agent to manage. In the command line enter:

```shell-session
$ eval "$(ssh-agent -s)
> Agent pid 59566
```

To add it, **ENTER**.

```shell-session
$ ssh-add ~/.ssh/id_ed25519
```

The final step is to add it to GitHub. Follow [this guide](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) to do so.

### Install HomeBrew <a href="#install-homebrew" id="install-homebrew"></a>

[Homebrew](https://brew.sh/) is a package manager (similar to apt-get) that helps us install other packages to our system. To get the Homebrew package installed, you will have to run the below command:

```shell-session
$ sudo apt install linuxbrew-wrapper
```

### Installing Ruby Environment <a href="#installing-ruby-environment" id="installing-ruby-environment"></a>

#### Install rbenv <a href="#install-rbenv" id="install-rbenv"></a>

Remember, [rbenv](https://github.com/rbenv/rbenv) is a tool that will help us manage installing and running multiple version of Ruby. To install rbenv, run the following:

```shell-session
$ brew install rbenv ruby-build
```

Now rbenv should be installed, but we also need to add some startup scripts to your bash profile, so that your terminal uses rbenv instead of the system wide Ruby version.

```shell-session
$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile
```

#### Install Ruby 3.0.1 <a href="#install-ruby-301" id="install-ruby-301"></a>

For our setup, let’s run the latest and greatest (as of this writing) version of Ruby (3.0.1). To install this version of Ruby, we will use rbenv. Run the following in your terminal:

```shell-session
$ rbenv install 3.0.1 -v
$ rbenv rehash
$ rbenv global 3.0.1 # set the global
$ ruby -v
```

### Install Visual Studio Code <a href="#install-visual-studio-code" id="install-visual-studio-code"></a>

You can follow the directions in the [Visual Studio Code](https://code.visualstudio.com/) link to get the correct version installed on your device.

### Install Postgres <a href="#install-postgres" id="install-postgres"></a>

[Postgres](https://www.postgresql.org/) will be our relational database preference for our RoR setup. To install:

```shell-session
$ brew install postgresql
```

### Install Redis <a href="#install-redis" id="install-redis"></a>

[Redis](https://redis.io/) is our key value database that RoR uses for caching.

```shell-session
$ brew install redis
```

### Install NodeJS <a href="#install-nodejs" id="install-nodejs"></a>

The link will take you through the steps to get the correct version of [NodeJS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04) installed to your device and will give a thorough understanding.

### Install Yarn <a href="#install-yarn" id="install-yarn"></a>

For the final step we will be installing the package manager [Yarn](https://yarnpkg.com/)) by running the command below.

```shell-session
$ brew install yarn
```

## Conclusion <a href="#conclusion" id="conclusion"></a>

Now that your environment is ready, you can dive into your first project. All in all, Ruby on Rails is a great development environment. It is easy to navigate, scalable, and is excellent for team projects. Looking for more useful information for Ruby on Rails? Check out this [cheat sheet](ruby-on-rails-cheat-sheet.md).
