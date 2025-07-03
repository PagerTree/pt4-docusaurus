# Architecture Guide

The Architecture Guide will give you an overview of the most important concepts in PagerTree. This documentation is meant give you the "big picture" of how objects are connected, related and move in PagerTree.

For detailed documentation of each object, please see it's respective documentation page.

## Key Definitions <a href="#key-definitions" id="key-definitions"></a>

* [**User**](users.md) - Represents an actual person. A user can have many [phones](users.md#phone-numbers) and [emails](users.md#emails). A user has their own notification preferences.
* [**Account**](accounts.md) - Represents an organization. This can usually be a company but could also be a department. Accounts are responsible for billing.
* [**Account User**](users.md) - A link between a User and Account. Account Users have specific [security roles (admin, billing, ...)](users.md#roles).
* [**Team**](teams.md) - Represents a group of Account Users. Teams have 1..n team admins, 1..n team members,1 on-call schedule and 1 escalation policy.
* [**Integration**](integrations.md) - Connects PagerTree to 3rd party applications. Integrations are responsible for transforming 3rd party webhook data into Alerts.
* [**Alerts**](alerts.md) - Represent and urgent notice (state of alarm). Alerts are created by Integrations or Account Users. Alerts can be sent to Account Users, Teams, or Routers to ultimately notify a User.
* [**Notifications**](notifications.md) - Represent a message sent on a single notification channel (push, email, sms, voice, ...).

## Account Organization <a href="#account-organization" id="account-organization"></a>

PagerTree has two global objects, Accounts and Users, they are joined by an Account User object. This allows **users to be part of many accounts**. Every other model, belongs to the Account model. So it can be said:

* "A team belongs to an account"
* "An integration belongs to an account"
* "A user has many accounts"
* "An account has many users"

<figure>![Pagertree high level account organization](<.gitbook/assets/high-level-account-organization.png>)<figcaption><p>PagerTree High Level Account Organization</p></figcaption></figure>

## Permissions <a href="#permissions" id="permissions"></a>

### Global Permissions <a href="#global-permissions" id="global-permissions"></a>

There are 4 global roles in PagerTree:

* **admin** - Admins manage any object with the exception of managing [billing](billing.md).
* **billing** - Can manage Account's PagerTree subscription.
* **broadcaster** - Has the special ability to manage [Broadcasts](broadcasts.md).
* **communicator** - Has the special ability to create [Stakeholder](stakeholders.md) Communications.

If not assigned one of the above permission, the account user is then a **regular member**. Regular members can:

* view all objects
* acknowledge/reject Alerts

### Team Permissions <a href="#team-permissions" id="team-permissions"></a>

There are [2 roles](teams.md#team-roles) for a PagerTree Team:

* **team admin** - Can manage the team, team members, team admins, schedule, and escalation policy. Can schedule account users on-call.
* **team member** - No special permissions

### Account Owner <a href="#account-owner" id="account-owner"></a>

* There is only ever 1 account owner (usually the person who created the account, but could have also had the account transferred to them).
* The account owner always has the admin and billing permission
* The account owner is the only person that can [transfer](accounts.md#transfer) the account to another account user.

## Alert Workflow <a href="#alert-workflow" id="alert-workflow"></a>

The diagram below is the most common alert workflow. It shows how data is ingested from 3rd Party systems, transformed, and moves through PagerTree to ultimately notify Account Users.

<figure>![alert workflow](<https://pagertree.com/assets/img/kb/high-level-alert-workflow.png>)<figcaption><p>Alert Workflow</p></figcaption></figure>

1. A 3rd party software sends PagerTree data.
2. The PagerTree integration accepts the data, transforming it to an alert.
3. (Optional) A [router](api/routers.md), matches conditions and performs actions on the alert.
4. The alert is routed to a team.
5. The alert uses the team's on-call schedule, notifying account users current on-call for the escalation layers.
6. (Optional) [Notification Rules](notification-rules.md) can customize notification channels to notify the user on.
7. The user will be notified via their default notification preferences.
8. A Notification is created and sent to the user via our communication providers.

Check out the following video, for a more in-depth explanation of the above diagram.

### Alert Workflow Video

::video-youtube[PagerTree Alert Workflow Video (v4)]{#6-_hScwSlMg}

## On-Call Schedule Workflow <a href="#on-call-schedule-workflow" id="on-call-schedule-workflow"></a>

<figure>![oncall schedule workflow](<.gitbook/assets/on-call-schedule-workflow.png>)<figcaption><p>On-Call Schedule Workflow</p></figcaption></figure>

1. The [alert status](alerts.md#alert-states) changes to `open`.
2. The alert is sent to a team.
3. PagerTree determines who is on-call for Layer 1 for the team's schedule.
   * After determining who is on-call, PagerTree _notifies_ the Account Users on-call for Layer 1
   * The Account Users get a timeout period to either acknowledge or reject the alert. The timeout period is configurable and determined by the team's escalation policy.
   * If an account users acknowledges the alert, the workflow stops and no other layers are notified.
   * If all account users on Layer 1 reject the alert, the remaining time for the layer is ignored and the alert is escalated to Layer 2.
   * If account users don't respond (either acknowledge or reject) and the timeout elapses, the alert is said to have "timed out" and is escalated to Layer 2.
4. Layer 2 follows the same pattern as bullet #3.
5. If the alert times out of Layer 2 or is rejected by all users on Layer 2 it is determined there are no more escalation layers
6. PagerTree determines if there is a [repeat](escalation-policies.md#repeat-option) or [reassign](escalation-policies.md#reassign-option) configured for the escalation policy (in this priority order).
   * If a repeat is configured this process will start over at Layer 1 for the repeat amount of times (1-3x).
   * If a reassign destination is configured, the alert will be sent to that team and this process will begin again at Layer 1 respecting the new teams schedule and escalation policy.
   * If there are not repeat or reassign destinations configured, the alert's status is changed to `dropped`.

For full documentation and more examples please see [schedules documentation](schedules.md).
