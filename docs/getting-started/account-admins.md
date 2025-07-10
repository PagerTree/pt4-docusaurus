---
description: >-
  In this quick start guide, we will cover the basics of getting started as an
  account admin within PagerTree.
---

# Account Admins

## Account Admin Video

::video-youtube[Account Admin QuickStart Guide]{#eHGHzjZYXqI}

## Required Reading

Please read the [Architecture Guide](https://pagertree.com/docs/architecture-guide) before starting this training. It is a 5-minute read that will give you a strong foundation of how PagerTree is organized and how [alerts flow](https://pagertree.com/docs/architecture-guide#alert-workflow) through the system.

## Users, Roles, and Permissions

Account admins are the only users within your account who can add [users](https://pagertree.com/docs/users) and [teams](https://pagertree.com/docs/teams), which are the backbone of the PagerTree on-call system.

### Inviting Users

1. Navigate to the [Users page](https://app.pagertree.com/users).
2.  **Click** the **New User Button** in the top right corner.\


    <figure>![Create User Button](<../.gitbook/assets/image (2).png>)<figcaption><p>Create User Button</p></figcaption></figure>
3.  Follow the instructions on the New User form:

    * **Name** - Full Name (Required).
    * **Email** - Work Email (Required).
    * **Roles** - Roles this user should have in this PagerTree account.
    * **Team** - Team this user should be a member of.

    <figure>![Create User Form](<../.gitbook/assets/create-user-form.png>)<figcaption><p>Create User Form</p></figcaption></figure>

    * **Click** the **Create Button.**

If successful, you should be directed to the newly created user page. A notice at the top of the page will inform you either:

* **Created** - The user was successfully created.
* **Invited** - The user was successfully invited (this user is already part of another PagerTree account).

In each case, the created or invited user will receive an email with directions on how to log in.

<figure>![User Invite Email](<../.gitbook/assets/create-user-invite-email.png>)<figcaption><p>User Invite Email</p></figcaption></figure>

### Roles and Permissions

Giving users roles and permissions allows them to perform special tasks within PagerTree.

There are [4 global roles](https://pagertree.com/docs/architecture-guide#global-permissions) in PagerTree:

* **Admin** - Admins manage any object except [billing](https://pagertree.com/docs/billing).
* **Billing** - Can manage the Account's PagerTree subscription.
* **Broadcaster** - Has the special ability to manage [Broadcasts](https://pagertree.com/docs/broadcasts).
* **Communicator** - Has the special ability to create [Stakeholder](https://pagertree.com/docs/stakeholders) communications.

There are [2 roles](https://pagertree.com/docs/teams#team-roles) for a PagerTree [team](https://pagertree.com/docs/teams):

* [Team admin](https://pagertree.com/docs/getting-started/team-admins) - Can manage the team, team members, team admins, on-call schedules, and escalation policy.
* [Team member](https://pagertree.com/docs/getting-started/oncall-users) - No special permissions.

## Integrations

[Integrations](https://pagertree.com/docs/integrations) connect PagerTree to 3rd party applications and are responsible for transforming 3rd party webhook data into [alerts](https://pagertree.com/docs/alerts). All integrations are [open source](https://github.com/PagerTree/pager_tree-integrations).

<figure>![Alert Workflow (Integrations)](<../.gitbook/assets/high-level-alert-workflow-integration.png>)<figcaption><p>Alert Workflow (Integrations)</p></figcaption></figure>

### Create an Integration

1. Navigate to the [integrations page](https://app.pagertree.com/integrations?direction=asc\&limit=10\&sort=tiny_id).
2. **Click** the **New Integration Button.**

<figure>![New Integration Button](<../.gitbook/assets/create-integration-button.png>)<figcaption><p>New Integration Button</p></figcaption></figure>

3. **Click** on the **Logo** of the tool you wish to integrate.

<figure>![Tool Integration Icons](<../.gitbook/assets/create-integration-logo.png>)<figcaption><p>Tool Integration Icons</p></figcaption></figure>

4. On the new integration form, **Click** the **Integration Guide Documentation Link.**
5. Follow the integration guide.

<figure>![Integration Guide](<../.gitbook/assets/integration-guide-link.png>)<figcaption><p>Integration Guide</p></figcaption></figure>

### Generic Integration

Can't find your integration? That's ok, there are two great generic options:

1. [Email Integration](https://pagertree.com/docs/integration-guides/email)—The email integration is the most generic integration as most tools support sending emails for alerts and alarms.
2. [Webhook Integration](https://pagertree.com/docs/integration-guides/webhook) - The webhook integration is also very flexible, with most tools supporting sending webhooks. Your tool will need to be able to use a [custom format](https://pagertree.com/docs/integration-guides/webhook#how-it-works) so PagerTree can understand the data being sent.

## Teams

Teams represent actual teams within your organization. They logically group together:

* [Account Users](https://pagertree.com/docs/users)
* [Schedules](https://pagertree.com/docs/schedules)
* [Escalation Policies](https://pagertree.com/docs/escalation-policies)
* [Alerts](https://pagertree.com/docs/alerts)

### Scheduling

Oncall schedules are composed of calendar [events](https://pagertree.com/docs/schedules#events). Each calendar event is associated with one or more users and one or more [escalation layers](https://pagertree.com/docs/escalation-policies#escalation-layers). [Team admins](https://pagertree.com/docs/getting-started/team-admins) are responsible for maintaining on-call calendars in PagerTree, but account admins can also maintain calendars.

#### Create a Single-Day Event

1. Navigate to your team page.
2. **Double-click** a **day** on the calendar to create a new event.
3. Follow the instructions on the "New Event" form.
   * **Assign user(s)** to the event (required).
   * **Select** a **start date and end date**.
   * **Assign** a **layer** for the user(s).
   * **Click Create.**

<figure>![Annotated New Event](<../.gitbook/assets/event-form-required-attributes.png>)<figcaption><p>Annotated New Event</p></figcaption></figure>

#### Create a Multi-Day Event

1. Navigate to your team page.
2. **Click** and **drag** the calendar (in the white space) to create a multi-day event.
3. Follow the instructions on the "New Event" form.
   * **Assign user(s)** to the event (required).
   * **Select** a **start date and end date.**
   * **Assign** a **layer** for the user(s).
   * **Click Create.**

<figure>![Multi-Day Event](<../.gitbook/assets/click-and-drag-multi-day.png>)<figcaption><p>Multi-Day Event</p></figcaption></figure>

#### Event Override

To override an event for a duration of time:

1. **Single-click** the **Event** to show the event details.
2. **Click** the **Event Override Button.**

<figure>![Event Override Button](<../.gitbook/assets/event-override-button.png>)<figcaption><p>Event Override Button</p></figcaption></figure>

3. On the event override form:
   * **Select** the **user** that will be overriding.
   * **Scope** the **dates and times** of when the user will be overriding.
   * **Click** the **Create Button.**

<figure>![Annotated Override Form ](<../.gitbook/assets/event-override-form.png>)<figcaption><p>Annotated Override Form </p></figcaption></figure>

\


<figure>![Overridden Event](<../.gitbook/assets/event-override.png>)<figcaption><p>Overridden Event</p></figcaption></figure>

## Notifications

* Notifications represent a message sent to an [account user](https://pagertree.com/docs/users) via a channel (push, email, sms, voice or Slack).
* Notifications are generated by [alerts](https://pagertree.com/docs/alerts), [broadcasts](https://pagertree.com/docs/broadcasts), and the PagerTree system.
* Notifications cannot be manually created.

### Default Notification Channels

Users can elect from the following [default notification channels](https://pagertree.com/docs/getting-started/oncall-users#user-preferences) in their personal account settings:

* Push ([Android](https://play.google.com/store/apps/details?id=com.pagertree.app\&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)/[iPhone](https://itunes.apple.com/us/app/pagertree/id1266437807?platform=iphone) app notification)
* Email
* SMS (text message)
* Voice (automated call)
* Slack

<figure>![Default Notification Channels](<../.gitbook/assets/default-notification-channels.png>)<figcaption><p>Default Notification Channels</p></figcaption></figure>

### Do Not Disturb Bypass

Users can bypass their [Apple](https://apps.apple.com/us/app/pagertree/id1266437807?platform=iphone) and [Android](https://play.google.com/store/apps/details?id=com.pagertree.app\&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1\&pli=1) devices' DND to receive push, SMS, and voice notifications while their phones are in DND mode.\
\
Instructions for both can be found in the [Notifications](https://pagertree.com/docs/notifications#bypass-do-not-disturb-1) documentation.

### Notification Persistence (Push)

When a user has persistent notifications, push notifications will be sent every 90 seconds up to 1 hour.

1. Navigate to the [My Settings Page](https://app.pagertree.com/user/settings).
2. **Scroll** to the **Other Settings section.**
3. **Select** the **Alert Urgency** that should have persistent notifications.

<figure>![Notification Persistence](<../.gitbook/assets/select-persistent-notification-setting.png>)<figcaption><p>Notification Persistence</p></figcaption></figure>

4. **Click Update.**

## Advanced Features

By default, PagerTree hides many of the more "advanced" functionalities. To view advanced objects, you must enable advanced mode.

1. Navigate to the [My Settings Page](https://app.pagertree.com/user/settings).
2. **Scroll** to the **Other Settings section.**
3. **Check** the **Advanced Mode checkbox.**

<figure>![Advanced Mode Checkbox](<../.gitbook/assets/advanced-mode.png>)<figcaption><p>Advanced Mode Checkbox</p></figcaption></figure>

4. **Click Update.**

You should now see the advanced options in the navigation menu.

<figure>![Advanced Mode Dropdown](<../.gitbook/assets/advanced-options-in-the-menu-bar.png>)<figcaption><p>Advanced Mode Dropdown</p></figcaption></figure>

### Routers

With [routers](https://pagertree.com/docs/routers), you can perform complex [matching](https://pagertree.com/docs/routers#match-block) and [actions](https://pagertree.com/docs/routers#actions-block) on alerts. Routers consist of many router rules that are processed after the integration has transformed the 3rd party data into an alert, but before the alert has been assigned to the team.

<figure>![Workflow (Routers)](<../.gitbook/assets/alert-worklfow-routers.png>)<figcaption><p>Work Flow (Routers)</p></figcaption></figure>

Routers can [route](https://pagertree.com/docs/routers#assign), [suppress](https://pagertree.com/docs/routers#ignore), and [aggregate](https://pagertree.com/docs/routers#aggregate) alerts based on matching conditions. Matching conditions include, but are not limited to:

* Regular Expression Matching
* Logic matching (ex: “value > threshold”)
* Time of Day matching

You can see the full documentation [here](https://pagertree.com/docs/routers).

### Notification Rules

With [notification rules](https://pagertree.com/docs/notification-rules), you can perform custom notification sequences. Notification rules are processed after PagerTree has selected the account user to notify but before [default notification channels](account-admins.md#default-notification-channels) are used.

<figure>![Alert Workflow (Notification Rules)](<../.gitbook/assets/alert-workflow-notification-rules.png>)<figcaption><p>Alert Workflow (Notification Rules)</p></figcaption></figure>

Notification rules are useful for defining custom notification sequences for different types of alerts. (For example, if the alert urgency is critical, notify me via voice every minute. If the urgency is low and it is the weekend, suppress the notification.)

Notification Rules are specific to a user's preference but can be re-used by all account users in your account.

You can find the full documentation for notification rules [here](https://pagertree.com/docs/notification-rules).

:::hint
**When to use Routers vs Notification Rules?**

Routers would be used if you would like to route an alert to your after-hours team when it comes in during non-business hours.

Notification rules would be used if you had a specific cycle you would like to be contacted in, i.e., call the primary phone first, call the secondary, then send an SMS, and repeat.
:::

## SSO

PagerTree offers several providers for single sign-on (SSO), and uses the SAML 2.0 protocol. SAML is an XML standard for exchanging authentication data between parties. Account admins must [enable advanced mode](account-admins.md#advanced-features) to see the [SSO Configs](https://pagertree.com/docs/single-sign-on-sso) option in the advanced feature dropdown.

* **SSO Bypass** - For security purposes, account admins can bypass SSO. If needed, they can log into their PagerTree account via username and password instead of through SSO.
* **Authorized Users-** Users will only be able to sign into a PagerTree account through SSO if they have been given access to PagerTree through your SSO IDP.
* **User Provisioning and Deprovisioning-** User accounts are not automatically provisioned or de-provisioned. They are only provisioned upon their first login and must be manually deleted in the user dashboard by an account admin.

You have now completed the PagerTree account admin quick start guide. For additional learning topics and more advanced user guides, you can visit [https://pagertree.com/docs](https://pagertree.com/docs).

## Additional Topics

* [User Quick Start Guide](https://pagertree.com/docs/getting-started/oncall-users)
* [Team Admin Quick Start Guide](https://pagertree.com/docs/getting-started/team-admins)
* [Architecture Guide](https://pagertree.com/docs/architecture-guide)
* [Common UI Design Patterns](https://pagertree.com/docs/common-ui-design-patterns)
* [Alert States](https://pagertree.com/docs/alerts#alert-states)
* [Billing](https://pagertree.com/docs/billing)
* [Notification Limits](https://pagertree.com/docs/billing#notification-limits)
* [Reports](https://pagertree.com/docs/reports)
* [Maintenance Windows](https://pagertree.com/docs/maintenance-windows)
* [Broadcasts](https://pagertree.com/docs/broadcasts)
* [Stakeholders](https://pagertree.com/docs/stakeholders)
