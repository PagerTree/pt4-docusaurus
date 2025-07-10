---
description: >-
  In this quick start guide, we will cover the basics of getting started as a
  team admin within PagerTree.
---

# Team Admins

## Team Admin Video

::video-youtube[Team Admin QuickStart Guide]{#_SCn2-ZiBoc}

## Managing Teams and Team members

Team admins are responsible for managing a [team](https://pagertree.com/docs/teams) and its [schedule](https://pagertree.com/docs/schedules). Teams can be managed from the team page within the PagerTree app and on the PagerTree Web UI.

### Editing Your Team

1. Navigate to your team page.
2. In the top right, **Click** the **Edit Button**.
3. **Update** the **team** as needed, adding or removing users or modifying other team attributes.
4. **Click Update**.

<figure>![Editing Your Team](<../.gitbook/assets/Existing Team.png>)<figcaption><p>Editing Your Team</p></figcaption></figure>

## Scheduling Basics

Team admins are responsible for managing a team's on-call schedule within PagerTree.

<figure>![Regular Event](<../.gitbook/assets/regular-event.png>)<figcaption><p>PagerTree On-Call Calendar Regular Event</p></figcaption></figure>

### Create an On-Call Event

1. Navigate to your team page.
2. **Double-click** a **day** on the calendar to create a new event.
3. Follow the instructions on the "New Event" form
   * **Assign user(s)** to the **event** (required).
   * **Select** a **start date and end date**.
   * **Assign** a **layer** for the user(s).
   * **Click Create**.

<figure>![New Event Form](<../.gitbook/assets/event-form-required-attributes.png>)<figcaption><p>New Event Form</p></figcaption></figure>

### Override an Existing Event

From time to time, you might need to override an event because the person who is assigned to the event will be busy. In this case, you can “override” the event with another team member by doing the following:

1. Navigate to the team page.
2. **Click** an **existing event**.
3. **Click** the **Override Event Button**.
4. In the override event form, S**elect** a **new user**.
5. **Click Create**.

<figure>![Event Override](<../.gitbook/assets/event-override-button.png>)<figcaption><p>Event Override</p></figcaption></figure>

## Alert Escalation Process

A team's escalation policy defines the time each[ escalation layer](https://pagertree.com/docs/escalation-policies#escalation-layers) will have (timeouts) to either[ acknowledge](https://pagertree.com/docs/alerts#acknowledge) or[ reject](https://pagertree.com/docs/alerts#reject) an alert. Users on a team are assigned an escalation layer (referred to as “layer” when creating an event) when scheduled for an event. Alerts will work through layers until they are acknowledged or have run out of layers.

### Editing Your Team Escalation Policy

To edit your team's escalation policy:

1. **Click** the **Edit Button**.

<figure>![Edit Escalation Policy](<../.gitbook/assets/edit-escalation-policy-button.png>)<figcaption><p>Edit Escalation Policy</p></figcaption></figure>

2. **Modify** the **escalation policy** as needed.

<figure>![Escalation Policy Form](<../.gitbook/assets/edit-escalation-policy-form.png>)<figcaption><p>Escalation Policy Form</p></figcaption></figure>

3. **Click Update**.

You have now completed the PagerTree team admin quick start guide. For additional learning topics and more advanced user guides, you can visit [https://pagertree.com/docs](https://pagertree.com/docs)

## Additional Topics

* [How to Schedule (with examples)](https://pagertree.com/docs/schedules)
* [Escalation Policies (with examples)](https://pagertree.com/docs/escalation-policies)
* [Public Schedules](https://pagertree.com/docs/teams#public-team-calendar)
* [Alert Handoff](https://pagertree.com/docs/alerts#handoff)
