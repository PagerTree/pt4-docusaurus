# Schedules

* [Schedules](../schedules.md) represent an on-call calendar. A schedule has many [Events](events.md).
* Schedules are independent objects. The [Team object](teams.md) is responsible for assigning itself a primary schedule and an [Escalation Policy](escalation-policies.md).

## The Schedule Object <a href="#the-schedule-object" id="the-schedule-object"></a>

| Property | Type   | Description              |
| -------- | ------ | ------------------------ |
| name     | string | The name of the schedule |

## Create a Schedule <a href="#create-a-schedule" id="create-a-schedule"></a>

```
POST https://api.pagertree.com/api/v4/schedules
```

#### **Allowed Parameters**

```ruby
def schedule_params
  params.permit(
    :name
  )
end
```

#### **Required Parameters**

* name

## Retrieve a Schedule <a href="#retrieve-a-schedule" id="retrieve-a-schedule"></a>

```
GET https://api.pagertree.com/api/v4/schedules/:id
```

## Update a Schedule <a href="#update-a-schedule" id="update-a-schedule"></a>

```
PUT https://api.pagertree.com/api/v4/schedules/:id
```

## Delete a Schedule <a href="#delete-a-schedule" id="delete-a-schedule"></a>

```
DELETE https://api.pagertree.com/api/v4/schedules/:id
```

## List all Schedules <a href="#list-all-schedules" id="list-all-schedules"></a>

```
GET https://api.pagertree.com/api/v4/schedules
```

## Flush a Schedule <a href="#flush-a-schedule" id="flush-a-schedule"></a>

Removes all events from the schedule. See [flush schedule documentation](../schedules.md#flush-schedule).

```
DELETE https://api.pagertree.com/api/v4/schedules/:id/flush
```

## Current On-Call <a href="#current-on-call" id="current-on-call"></a>

Returns on-call event attendees for now. (Handles repeating events and rotations)

```
GET https://api.pagertree.com/api/v4/schedules/:id/current_oncall
```

## Window Events <a href="#window-events" id="window-events"></a>

Return on-call event attendees for a specified time frame. (Handles repeating events and rotations)

| Query Parameter | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| start           | UTC string of start time to consider (ex: 2022-10-12 07:00:00) |
| end             | UTC string of end time to consider (ex: 2022-10-12 07:00:00)   |

```
GET https://api.pagertree.com/api/v4/schedules/:id/window_events?start=2022-10-12 07:00:00&end=2022-10-13 07:00:00
```

## Events <a href="#events" id="events"></a>

Return [Events](events.md) that are assigned to this schedule. (Does not handle repeating events and rotations. Unprocessed representation of events.)

```
GET https://api.pagertree.com/api/v4/schedules/:id/events

# example with parameters and operators
GET  https://api.pagertree.com/api/v4/schedules/:id/events?ops=start_datetime:gte,end_datetime:lte&start_datetime=2022-10-12 07:00:00&end_datetime=2022-10-13 07:00:00
```
