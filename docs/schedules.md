# Schedules

## What is a Schedule?

On-call schedules are composed of calendar [events](schedules.md#events). Each calendar event is associated with one or more users and one [escalation layers](escalation-policies.md#escalation-layers).

* A schedule has many events.
* Each schedule event is associated with exactly one escalation layer, but can have many [attendees](users.md).
* Alerts will [notify](notifications.md) users on-call for an escalation layer for any given moment.
* If multiple users are on-call for the same layer, the notifications are said to _"fan out"_.
* If multiple users are on-call, and a user [acknowledges](alerts.md#acknowledge) the alert, the rest of the users that did not acknowledge the alert will receive a notification stating that another user has acknowledged the alert.

<figure>![High level alert workflow](<.gitbook/assets/high-level-alert-workflow-schedule.png>)<figcaption><p>High Level Alert Workflow (Schedules)</p></figcaption></figure>

### Schedules Tutorial Video

<iframe src="https://www.youtube-nocookie.com/embed/xaCrRCvQud8" title="PagerTree On-Call Schedules Video (v4)" class="rds-video"></iframe>

## Basic Calendar Interactions

### Create a Single Day Event

Double click the calendar (in the white space) to create a single day event.

<figure>![Single day event](<.gitbook/assets/double-click-single-day.png>)<figcaption><p>Double click for a single day event.</p></figcaption></figure>

### Create a Multi-Day Event

Click and drag the calendar (in the white space) to create a multi-day event.

<figure>![drag-n-drop calendar](<.gitbook/assets/click-and-drag-multi-day.png>)<figcaption><p>Click and drag to create a multi-day event.</p></figcaption></figure>

### Show Event Details

Click the event to show it's details.

<figure>![show event details](<.gitbook/assets/click-event-for-details.png>)<figcaption><p>Click the event to show the event details.</p></figcaption></figure>

### Drag and Drop Events

You can drag and drop events to modify them on the fly. This only works for regular events (not repeating or rotations).

<figure>![Drop-n-drop events](<.gitbook/assets/drag-and-drop-event.png>)<figcaption><p>You can drag and drop regular (non-repeating) events to modify them on the fly.</p></figcaption></figure>

### Event Actions

Click the event to show it's details. You can then use the action buttons to work on the event.

<figure>![annotated event actions](<.gitbook/assets/event-actions.png>)<figcaption><p>Event actions (annotated).</p></figcaption></figure>

### Flush Schedule

"Flushing" a schedule will remove all events from the calendar. Be careful, once events are deleted they will be lost and cannot be restored.

<figure>![Flush schedule](<.gitbook/assets/flush-schedule.png>)<figcaption><p>"Flush" an on-call schedule. Aka, remove all events.</p></figcaption></figure>

## Scheduling Users On-Call <a href="#scheduling-users-on-call" id="scheduling-users-on-call"></a>

## Events

When creating events you must always select the following:

* At least 1 user
* Start Date & Time
* End Date & Time
* Escalation Layer

<figure>![Event form](<.gitbook/assets/event-form-required-attributes.png>)<figcaption><p>Event form required attributes (annotated).</p></figcaption></figure>

<figure>![Date picker](<.gitbook/assets/date-picker.png>)<figcaption><p>PagerTree date and time picker.</p></figcaption></figure>

### Regular Event

A regular event is one that doesn't repeat or rotate. It has a start and end date.

<figure>![Regular event form](<.gitbook/assets/regular-event-form.png>)<figcaption><p>Regular event form.</p></figcaption></figure>

<figure>![regular event on a calendar](<.gitbook/assets/regular-event.png>)<figcaption><p>Regular event on a calendar.</p></figcaption></figure>

### Repeating Event

A repeating event is one that has an initial occurrence start and end date. It will then repeat based on the options selected.

Options for repeating events are the following:

* _Frequency_ - An integer number (ex: 1).
* _Frequency Unit_ - Hours/Days/Weeks/Months/Years.
* _Applicable Days of the Week_ - Only days of the week this event should occur. (Only works with frequency unit Days)
* _Repeat End (Inclusive)_ - The last day this event should occur on. (If you set this to be Oct 31, the last occurrence will be Oct 31-> Nov 1)

#### Example: Simple Repeating Event

<figure>![simple repeating event](<.gitbook/assets/repeating-event-form.png>)<figcaption><p>Simple repeating event form</p></figcaption></figure>

<figure>![simple repeating event on a calendar](<.gitbook/assets/repeating-event.png>)<figcaption><p>Simple repeating event on a calendar.</p></figcaption></figure>

#### Example: Repeating Event During Working Hours

<figure>![repeating event](<.gitbook/assets/repeating-event-working-hours-form.png>)<figcaption><p>Repeating event (working hours) form.</p></figcaption></figure>

<figure>![repeating event on a calendar](<.gitbook/assets/repeating-event-working-hours.png>)<figcaption><p>Repeating event (working hours) on a calendar.</p></figcaption></figure>

#### Example: Repeating Event With End Date

<figure>![repeating event with end date](<.gitbook/assets/repeating-event-with-repeat-end-form.png>)<figcaption><p>Repeating event (with end date) form.</p></figcaption></figure>

<figure>![repeating event with end date on calendar](<.gitbook/assets/repeating-event-with-repeat-end.png>)<figcaption><p>Repeating event (with end date) on a calendar.</p></figcaption></figure>

### Rotating Event

A rotating event is similar to a repeating event, but it will rotate users for every occurrence.

<figure>![rotating event form](<.gitbook/assets/rotating-event-form.png>)<figcaption><p>Rotating event form.</p></figcaption></figure>

<figure>![rotating event on a calendar](<.gitbook/assets/rotating-event.png>)<figcaption><p>Rotating event on a calendar.</p></figcaption></figure>

## Advanced Calendar Interactions

### Event Override

To override and event for a duration of time:

1. Single click the Event to show the event details.
2.  Click the **Event Override** button.

    <figure>![event override button](<.gitbook/assets/event-override-button.png>)<figcaption><p>Event Override Button</p></figcaption></figure>
3. On the event override form:
   1. Select the **user** that will be overriding.
   2. Scope the **dates and times** of when the user will be overriding.
   3.  Click **Create** button.

       <figure>![event override form](<.gitbook/assets/event-override-form.png>)<figcaption><p>Event Override Form</p></figcaption></figure>

<figure>![event override on calendar](<.gitbook/assets/event-override.png>)<figcaption><p>Event override on a calendar.</p></figcaption></figure>

### Event Clone

1. Single click the Event to show the event details.
2.  Click the **Event Clone** button.

    <figure>![Event clone button](<.gitbook/assets/event-clone-button.png>)<figcaption><p>Event Clone Button</p></figcaption></figure>
3. On the event clone form:
   1. Make any appropriate changes.
   2.  Click **Create** button.

       <figure>![event clone form](<.gitbook/assets/event-clone-form.png>)<figcaption><p>Event Clone Form</p></figcaption></figure>

<figure>![event clone on calendar](<.gitbook/assets/event-clone.png>)<figcaption><p>Event clone on a calendar.</p></figcaption></figure>

### Repeating Event Question

For repeating events you may be asked which how you would like to edit the event.

* _This event_ - Uses the single occurrence clicked on for point of operation. Only modifies this occurrence.
* _This event and following events_ - Uses the single occurrence clicked on for starting point of operation, modifying the occurrence itself and all future occurrences.
* _All events (in this series)_ - Uses the initial occurrence (regardless of which event was clicked on) for starting point of operation. Modifies all past, present, and future occurrences.

<figure>![repeating event question](<.gitbook/assets/repeating-event-question.png>)<figcaption><p>Repeating event question.</p></figcaption></figure>
