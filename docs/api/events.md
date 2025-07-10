# Events

* Events represent a [single](../schedules.md#regular-event), [repeating](../schedules.md#repeating-event), or [rotating](../schedules.md#rotating-event) on-call occurrence for a group of [Account Users](account-users.md).
* Events are tied to a single [Escalation Layer](../escalation-policies.md#escalation-layers).
* Events can belong to multiple [Schedules](schedules.md).

## The Event Object

| Property              | Type              | Description                                                                                                                           |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| start\_datetime       | datetime          | The start datetime of the event.                                                                                                      |
| end\_datetime         | datetime          | The end datetime of the event.                                                                                                        |
| layer                 | integer           | The escalation layer number this event is assigned to.                                                                                |
| time\_zone            | string            | The [valid time zone name](#valid-time-zone-names) the event will respect.                                                   |
| repeat                | boolean           | Flag dictating whether or not this is a [repeating](../schedules.md#repeating-event) event.                                           |
| frequency             | integer           | A the scalar unit of how often this event repeats.                                                                                    |
| frequency\_unit       | string            | The unit of the frequency scalar. `hourly\|daily\|weekly\|monthly\|yearly`                                                            |
| days\_of\_week        | integer\[]        | Array of integers representing the days of the week this event is applicable to. Sunday = 0, Monday=1, ..., Saturday = 6.             |
| repeat\_end\_datetime | datetime          | The datetime the repeating end stops. This datetime is inclusive (meaning if the event falls on this day, it will occur on this day). |
| rotation              | boolean           | Flag dictating whether or not this is a [rotation](../schedules.md#rotating-event) event.                                             |
| parent\_id            | string            | The parent Event ID (if this is an override).                                                                                         |
| schedule\_ids         | string\[]         | The [schedule](schedules.md) IDs this event belongs to.                                                                               |
| event\_attendees      | EventAttendee\[]  | :id, :attendee\_id, attendee\_type, :position                                                                                         |
| exceptions            | EventException\[] | :id, :start\_datetime                                                                                                                 |

## Create a Event

```
POST https://api.pagertree.com/api/v4/events
```

**Allowed Parameters**

```ruby
def event_params
  params.permit(
    :parent_id,
    :start_datetime,
    :end_datetime,
    :layer,
    :time_zone,
    :repeat,
    :frequency,
    :frequency_unit,
    :repeat_end_datetime,
    :rotation,
    days_of_week: [],
    schedule_ids: [],
    account_user_ids: [],
  )
end
```

**Required Parameters**

* start\_datetime
* end\_datetime
* layer
* time\_zone
* at least 1 Account User ID
* if repeat is true
  * frequency
  * frequency\_unit

## Retrieve an Event

```
GET https://api.pagertree.com/api/v4/events/:id
```

## Update an Event

```
PUT https://api.pagertree.com/api/v4/events/:id
```

## Delete an Event

```
DELETE https://api.pagertree.com/api/v4/events/:id
```

## List all Events

```
GET https://api.pagertree.com/api/v4/events
```

## Override an Event

[Overrides](../schedules.md#event-override) an existing event with a new one (handles breaking up the event, just like the UI).

```
POST https://api.pagertree.com/api/v4/events/:id/override
```

#### Required Parameters

| Body Parameter     | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| start\_time        | Start time for the override in format "YYYY-MM-DD HH:mm".                    |
| end\_time          | End time for the override in format "YYYY-MM-DD HH:mm".                      |
| layer              | Layer of the override.                                                       |
| time\_zone         | A [valid time zone name](#valid-time-zone-names) that the override will respect.   |
| account\_user\_ids | Array of [Account User](account-users.md) IDs that will attend the override. |
| action\_time       | The start time of the occurrence to override (iso8601 format).               |

#### Example Request

```
POST https://api.pagertree.com/api/v4/events/:id/override
{
  "start_time": "2022-11-01 08:00",
  "end_time": "2022-11-01 17:00",
  "layer": 1,
  "time_zone": "Arizona",
  "account_user_ids": ["01GGR2FB6045ZAXXXXXXXXXXXX"],
  "action_time": "2022-11-01T00:00:00.000-07:00"
}
```

## Add an Event Exception

Adds an exception for a **repeating event** (aka "delete a single occurrence").

```
POST https://api.pagertree.com/api/v4/events/:id/add_exception
```

#### Required Parameters

| Body Parameter | Description                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| action\_time   | The start time of the occurrence to add as an exception (aka "delete a single occurrence") (iso8601 format) |

#### Example Request

```
POST https://api.pagertree.com/api/v4/events/:id/add_exception
{
  "action_time": "2022-11-01T00:00:00.000-07:00"
}
```

## Terminate an Event

Deletes the occurrence and all future occurrences of a **repeating event**.

```
POST https://api.pagertree.com/api/v4/events/:id/terminate_on
```

#### Required Parameters

| Body Parameter | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| action\_time   | The start time of the first occurrence to delete (iso8601 format) |

#### Example Request

```
POST https://api.pagertree.com/api/v4/events/:id/terminate_on
{
  "action_time": "2022-11-01T00:00:00.000-07:00"
}
```

## List all Event Time Zones

Returns the list of all valid time zones currently supported by PagerTree.

:::info
It's possible these change over time as new time zones are added and removed from the world.
:::

```
GET https://api.pagertree.com/api/v4/events/time_zones
```

### Valid Time Zone Names

As a convenience, we have listed supported time zones (as of September 25, 2022) below:

* International Date Line West
* American Samoa
* Midway Island
* Hawaii
* Alaska
* Pacific Time (US & Canada)
* Tijuana
* Arizona
* Chihuahua
* Mazatlán
* Mountain Time (US & Canada)
* Central America
* Central Time (US & Canada)
* Guadalajara
* Mexico City
* Monterrey
* Saskatchewan
* Bogota
* Eastern Time (US & Canada)
* Indiana (East)
* Lima
* Quito
* Atlantic Time (Canada)
* Caracas
* Georgetown
* La Paz
* Puerto Rico
* Santiago
* Newfoundland
* Brasilia
* Buenos Aires
* Greenland
* Montevideo
* Mid-Atlantic
* Azores
* Cape Verde Is.
* Edinburgh
* Lisbon
* London
* Monrovia
* UTC
* Amsterdam
* Belgrade
* Berlin
* Bern
* Bratislava
* Brussels
* Budapest
* Casablanca
* Copenhagen
* Dublin
* Ljubljana
* Madrid
* Paris
* Prague
* Rome
* Sarajevo
* Skopje
* Stockholm
* Vienna
* Warsaw
* West Central Africa
* Zagreb
* Zurich
* Athens
* Bucharest
* Cairo
* Harare
* Helsinki
* Jerusalem
* Kaliningrad
* Kyiv
* Pretoria
* Riga
* Sofia
* Tallinn
* Vilnius
* Baghdad
* Istanbul
* Kuwait
* Minsk
* Moscow
* Nairobi
* Riyadh
* St. Petersburg
* Volgograd
* Tehran
* Abu Dhabi
* Baku
* Muscat
* Samara
* Tbilisi
* Yerevan
* Kabul
* Ekaterinburg
* Islamabad
* Karachi
* Tashkent
* Chennai
* Kolkata
* Mumbai
* New Delhi
* Sri Jayawardenepura
* Kathmandu
* Almaty
* Astana
* Dhaka
* Urumqi
* Rangoon
* Bangkok
* Hanoi
* Jakarta
* Krasnoyarsk
* Novosibirsk
* Beijing
* Chongqing
* Hong Kong
* Irkutsk
* Kuala Lumpur
* Perth
* Singapore
* Taipei
* Ulaanbaatar
* Osaka
* Sapporo
* Seoul
* Tokyo
* Yakutsk
* Adelaide
* Darwin
* Brisbane
* Canberra
* Guam
* Hobart
* Melbourne
* Port Moresby
* Sydney
* Vladivostok
* Magadan
* New Caledonia
* Solomon Is.
* Srednekolymsk
* Auckland
* Fiji
* Kamchatka
* Marshall Is.
* Wellington
* Chatham Is.
* Nuku'alofa
* Samoa
* Tokelau Is.
