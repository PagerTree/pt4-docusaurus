# Teams

## What is a Team? <a href="#overview" id="overview"></a>

Teams represent actual teams within your organization. They logically group together:

* [Account Users](users.md)
* [Schedules](schedules.md)
* [Escalation Policies](escalation-policies.md)
* [Alerts](alerts.md)

The following are true about teams:

* must always have at least 1 team member and 1 team admin (even if they are the same account user). See [team roles section](teams.md#team-roles) below.
* always has an active on-call schedule (even if no one is scheduled on-call).
* always has an active escalation policy with at least 1 layer

<figure>![High level alert workflow](<.gitbook/assets/high-level-alert-workflow-team.png>)<figcaption><p>High Level Alert Workflow (Team)</p></figcaption></figure>

### Tutorial Video <a href="#tutorial-video" id="tutorial-video"></a>

::video-youtube[PagerTree Teams Tutorial Video (v4)]{#bZ5cyFv27r0}

## Team Roles <a href="#team-roles" id="team-roles"></a>

There are 2 roles regarding teams:

1. _Team Admin_
   * Ability to manage the team (add remove other team admins or members).
   * Ability to schedule members on-call.
   * Ability to change the team's escalation policy.
   * Not to be confused with global admin.
2. _Team Member_
   * No special roles.
   * Team members show up in the event attendees dropdown when creating on-call events for this team.

## On-Call Schedule <a href="#on-call-schedule" id="on-call-schedule"></a>

The team's on-call schedule determines who is on-call for this team at any given moment.

Please see the [schedules documentation](schedules.md) for full details.

<figure>![oncall schedule](<.gitbook/assets/on-call-schedule.png>)<figcaption><p>On-Call Schedule</p></figcaption></figure>

## Escalation Policy <a href="#escalation-policy" id="escalation-policy"></a>

The team's escalation policy defines how alerts will move through the team's on-call schedule.

Please see the [escalation policies documentation](escalation-policies.md) for full details.

<figure>![escalation policy](<.gitbook/assets/escalation-policy.png>)<figcaption><p>Escalation Policy</p></figcaption></figure>

## Advanced Options <a href="#advanced-options" id="advanced-options"></a>

Options for [stakeholder notifications](teams.md#stakeholder-notifications), [drop notification](teams.md#drop-notifications), and [handoff notifications](teams.md#handoff-notifications) can be configured under the "Advanced Options" of the team form.

1. Navigate to the Team Edit page.
2.  Click the **Show advanced options** button.&#x20;

    <figure>![show advanced option button](<.gitbook/assets/show-advanced-options-button.png>)<figcaption><p>Show advanced options button.</p></figcaption></figure>
3.  You will then see the advanced options appear.&#x20;

    <figure>![advanced options](<.gitbook/assets/advanced-options.png>)<figcaption><p>Advanced Options</p></figcaption></figure>

### Stakeholder Notifications <a href="#stakeholder-notifications" id="stakeholder-notifications"></a>

A team can have team stakeholders. Subsequently every alert that is assigned to this team will also automatically attach the stakeholders to the alert. Stakeholders will then receive notifications about the alert for the events that they have opted in to.

See [stakeholders documentation](stakeholders.md) for full details on the functionality.

### Drop Notifications <a href="#drop-notifications" id="drop-notifications"></a>

A team can elect to have "drop notifications" sent out when an alert that was assigned to this team is "dropped".

Drop notifications can be sent to any of the following:

* _None_ - No one is notified (default) .
* _Entire Team_ - The entire team is notified.
* _Team Admins_ - Only team admins are notified.
* _Current On-Call Rotation_ - The current on-call rotation (all layers) ar notified. _(Warning: if no one is on-call, no one will be notified)_
* _Specific Users_ - Account users that can be selected.

### Handoff Notifications <a href="#handoff-notifications" id="handoff-notifications"></a>

A team can elect to have "handoff notifications" sent out when an alert that was handed off to this team.

Handoff notifications can be sent to any of the following:

* _None_ - No one is notified (default) .
* _Entire Team_ - The entire team is notified.
* _Team Admins_ - Only team admins are notified.
* _Current On-Call Rotation_ - The current on-call rotation (all layers) ar notified. _(Warning: if no one is on-call, no one will be notified)_
* _Specific Users_ - Account users that can be selected.

### Public Team Calendar <a href="#public-team-calendar" id="public-team-calendar"></a>

Public calendars can let you expose a team's on-call calendar (and additional user info) to the public internet. By default all team's calendars are private. Once enabled, the public team calendar url can be found at the top of team page (next to the IDs)

#### **Enable Public Team Calendar**

1. Navigate to the Team Edit page.
2. Click the **"Share Publicly"** checkbox.
3. Additionally you can select the following options:
   * _Password_ - A password that is required to access the public team calendar
   * _Share team members_ - Should team members be shown?
   * _Show user phones_ - Should user phone numbers be shared?
   * _Show user emails_ - Should user emails be shared?
   * _Show team schedule_ - Should the team's on-call schedule be shared?
   * _Show escalation policy_ - Should the team's escalation policy be shared?

<figure>![public team calendar url](<.gitbook/assets/public-team-calendar-url.png>)<figcaption><p>Public Team Calendar URL</p></figcaption></figure>

#### **Example Public Team Calendar**

<figure>![annotated public team calendar](<.gitbook/assets/public-team-calendar.png>)<figcaption><p>Annotated Public Team Calendar</p></figcaption></figure>

| Annotation # | Option                 |
| ------------ | ---------------------- |
| 1            | Team Members           |
| 2            | User phones & emails   |
| 3            | Team Schedule          |
| 4            | Team Escalation Policy |

## ICal URL <a href="#i-cal-url" id="i-cal-url"></a>

PagerTree offers the ability to export on-call calendars via iCalendar (.ics) format via a URL. This allows you to see who is on-call via your [Google Calendar](teams.md#google-calendar), [Outlook Calendar](teams.md#outlook-calendar), or [iCal (Mac) Calendar](teams.md#i-cal-mac-calendar).

For any of the below instructions, you'll need to copy the ICal URL from the PagerTree Team page.

<figure>![Ical url](<.gitbook/assets/ical-url.png>)<figcaption><p>ICal URL</p></figcaption></figure>

### Google Calendar <a href="#google-calendar" id="google-calendar"></a>

1.  In [Google Calendar](https://calendar.google.com/), from the left hand navigation bar, click the **+** button next to the "Add a coworker's calendar".&#x20;

    <figure>![add calendar](<https://pagertree.com/assets/img/kb/schedules/ical/google/add-a-coworkers-calendar.png>)<figcaption></figcaption></figure>
2.  Select the **From URL** option.&#x20;

    <figure>![from url](<https://pagertree.com/assets/img/kb/schedules/ical/google/select-from-url.png>)<figcaption></figcaption></figure>
3.  Paste the **PagerTree ICal URL** you copied earlier into the "**From URL**" input field and then click **ADD CALENDAR**.&#x20;

    <figure>![Pagertree Ical url](<https://pagertree.com/assets/img/kb/schedules/ical/google/paste-url-to-from-url-field.png>)<figcaption></figcaption></figure>
4.  Click the back arrow button.&#x20;

    <figure>![settings button](<https://pagertree.com/assets/img/kb/schedules/ical/google/back-button.png>)<figcaption></figcaption></figure>

### Outlook Calendar <a href="#outlook-calendar" id="outlook-calendar"></a>

1. From the Calendar Ribbon, click **Add Calendar -> From Internet...** ![Click Add Calendar From Internet](https://pagertree.com/assets/img/kb/schedules/ical/outlook/click-add-calendar-from-internet.png)
2.  Paste the **PagerTree ICal URL** you copied earlier into the "**New Internet Calendar Subscription**" input field and then click **OK**.&#x20;

    <figure>![New internet calendar](<https://pagertree.com/assets/img/kb/schedules/ical/outlook/paste-url-to-new-internet-calendar-subscription.png>)<figcaption></figcaption></figure>

### iCal (Mac) Calendar <a href="#i-cal-mac-calendar" id="i-cal-mac-calendar"></a>

1. From the menu bar, click **File -> New Calendar Subscription...** ![Click New Calendar Subscription](https://pagertree.com/assets/img/kb/schedules/ical/ical/click-file-new-calendar-subscription.png)
2.  Paste the **PagerTree ICal URL** you copied earlier into the "**Calendar URL**" input field and then click **Subscribe**.&#x20;

    <figure>![Pagertree Ical URL](<https://pagertree.com/assets/img/kb/schedules/ical/ical/paste-url-to-subscribe-to.png>)<figcaption></figcaption></figure>
3. Configure the **Auto-refresh** to **Every hour** then click **OK**. ![Configure AUto Refesh](https://pagertree.com/assets/img/kb/schedules/ical/ical/configure-settings.png)

### Special Notes Regarding 3rd Parties Importing Calendars <a href="#special-notes-regarding-3rd-parties-importing-calendars" id="special-notes-regarding-3rd-parties-importing-calendars"></a>

Third party applications poll the PagerTree servers for new data usually every 1 hour or so. However, we have seen some tools take as long as 1 day.

Please be patient! You will not see your changes from PagerTree immediately. This behavior is the result of the polling mechanism of the third party tools. PagerTree cannot do anything about this.

If you absolutely need the third party updated immediately you can try removing the calendar and re-importing. Take note that some third party tools cache urls, so even if you re-import you could be seeing a stale calendar.
