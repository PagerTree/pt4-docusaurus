---
date: 2024-01-08
authors: pagertree
description: >-
  Understanding Linux File System: A Comprehensive Guide to Common Directories
  - A detailed guide to the most common directories in the Linux file system.
---
# 🔡 Understanding Linux File System: A Comprehensive Guide to Common Directories

Welcome to an in-depth exploration of the Linux file system! In this comprehensive guide, we'll demystify the various directories found in a typical Linux distribution, explaining their purposes and functionalities. Whether you're a seasoned sysadmin or a curious newcomer, this article will enhance your understanding of the backbone of Linux's structure and operation.

<figure>![Linux Cheat Sheet](<.gitbook/assets/Linux File System.png>)<figcaption><p>Linux File System Structure</p></figcaption></figure>

<!-- truncate -->

## /bin

The `/bin` directory is a fundamental part of the Linux file system, playing a crucial role in system functionality. It contains essential user binary files, the basic programs and utilities necessary for the system to operate and for users to interact with it. These binaries include common commands like `ls`, `cp`, and `mv`, which are indispensable for file management, and `bash`, the default command-line shell for many Linux distributions. Unlike other directories that house more specialized or user-installed software, `/bin` is reserved for these core components, ensuring that the system remains operational and accessible, even in single-user modes or when other file systems are not yet mounted.

## /sbin

Similar to [`/bin`](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#bin) , but this directory contains applications that only the super user (hence prefixed `s`) will need. Applications in this directory need to be run with the `sudo` command. Typically this directory contains tools that can install, delete and format. As you can imagine, some of these programs can cause system damage if used improperly.

## /etc

The `/etc` directory is crucial for system configuration. It contains all the configuration files required by the system and other applications. Unlike [`/bin`](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#bin) or [`/sbin`](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#sbin), `/etc` does not hold executable programs, but rather static configuration files. Here, you'll find everything from user passwords (in `/etc/passwd`), to network configurations, to the services at boot. It's like the settings menu of your operating system, but in a folder. You can remember it with "everything to configure".

## /dev

Short for "device", the `/dev` directory is a bit unique. It's where Linux stores device files, representing hardware components or drivers. For example, `/dev/sda` typically represents the first hard disk in your system. These are not regular files - they are special files that help the system communicate with its hardware. It's a crucial part of the Linux file system, though not something a regular user would interact with directly.

## /proc

This is a virtual directory, meaning it doesn’t exist on your disk. It’s dynamically created by the system. The `/proc` directory contains information about system resources and the status of the operating system. Each running process has a folder here named by its process ID. You can peek into these folders to see detailed information about each process, but remember, it's mostly for viewing, not modifying.

## /var

Stands for "variable files". `/var` is where files that are expected to grow are stored. This includes things like logs (`/var/log`), mail (`/var/mail`), and spool files. It’s a dynamic folder, and its contents change as the system runs. This is where you'll look when troubleshooting or when trying to understand more about what's happening on your system.

## /tmp

Just as it sounds, `/tmp` is for temporary files. When applications or the system needs to store a file temporarily, it goes here. These files are usually deleted upon reboot or after a set period. It’s a scratch space for the system and applications.

## /usr

Short for "Unix System Resources," `/usr` is one of the largest directories. It contains additional user applications and their files. Think of it as a secondary hierarchy for user utilities and applications. `/usr/bin`, for example, has many user commands, while `/usr/lib` contains libraries for `/usr/bin` and `/usr/sbin`.

The _/usr_ directory _used to be_ where users’ home directories were originally kept back in the early days of UNIX. However, now [_/home_](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#home) is where users keep their stuff.

## /home

This is where the personal folders of each user on the system are located. If your username is “user”, you'll find your personal files in `/home/user`. It’s akin to the Users directory in Windows. This is where you'll spend most of your time: your documents, downloads, pictures, and personal data reside here.

## /boot

The `/boot` directory contains the files needed to start up the system - the boot loader, the kernel, and other files needed during the boot process. It's small but essential. Without these files, the system can't start properly.

## /lib

Similar to `/usr/lib`, `/lib` contains essential libraries needed for the binaries in [`/bin`](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#bin) and [`/sbin`](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#sbin). These libraries are fundamental to the operation of the system and the applications running on it.

## /opt

An abbreviation for "optional", `/opt` is used for storing additional software and packages that are not part of the default installation. Often, third-party applications are installed here. It's a common directory for software that’s not included in the standard distribution.

## /mnt

Short for "mount". This directory is a temporary mount point where system administrators can mount file systems before they are integrated into the system's file structure. Think of it as a place to plug in external resources temporarily.

## /media

Similar to [`/mnt`](understanding-linux-file-system-a-comprehensive-guide-to-common-directories.md#mnt), `/media` is used for mounting removable media like USB drives, CD-ROMs, etc. It’s a more modern version of `/mnt`, and many systems automatically mount external drives here.

## /srv

This stands for "service". `/srv` contains data related to services offered by the system. For instance, if your Linux machine is hosting a website, the website data might live here. It's not used in all distributions, but when it is, it's for service data.

***

And there you have it, a brief rundown of the most common directories in the Linux file system. Each serves a distinct purpose, and understanding them can be crucial for effective system management and navigation.
