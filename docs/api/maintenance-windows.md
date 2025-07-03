# Maintenance Windows

* A [maintenance window](../maintenance-windows.md) is used to ignore incoming requests from [integrations](../integrations.md) during a specified time frame.
* A maintenance window can be attached to one or more integrations.

### The Maintenance Window Object <a href="#the-maintenance-window-object" id="the-maintenance-window-object"></a>

| Property         | Type      | Description                                                                                                                                                      |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name             | string    | The name of the maintenance window.                                                                                                                              |
| start\_datetime  | datetime  | The start datetime of this maintenance window.                                                                                                                   |
| end\_datetime    | datetime  | The end datetime of this maintenance window.                                                                                                                     |
| time\_zone       | string    | The time zone this maintenance window will respect. (See [event time zones](events.md#list-all-event-time-zones) for the list of all available time zone names.) |
| integration\_ids | string\[] | The IDs of the [integrations](integrations.md) this maintenance window affects during the specified time frame.                                                  |

## Create a Maintenance Window <a href="#create-a-maintenance-window" id="create-a-maintenance-window"></a>

```
POST https://api.pagertree.com/api/v4/maintenance_windows
```

#### **Allowed Parameters**

```ruby
def maintenance_window_params
  params.permit(
    :name,
    :description,
    :start_datetime,
    :end_datetime,
    :time_zone,
    integration_ids: []
  )
end
```

#### **Required Parameters**

* name
* start\_datetime
* end\_datetime
* time\_zone
* at least 1 integration\_id

## Retrieve a Maintenance Window <a href="#retrieve-a-maintenance-window" id="retrieve-a-maintenance-window"></a>

```
GET https://api.pagertree.com/api/v4/maintenance_windows/:id
```

## Update a Maintenance Window <a href="#update-a-maintenance-window" id="update-a-maintenance-window"></a>

```
PUT https://api.pagertree.com/api/v4/maintenance_windows/:id
```

## Delete a Maintenance Window <a href="#delete-a-maintenance-window" id="delete-a-maintenance-window"></a>

```
DELETE https://api.pagertree.com/api/v4/maintenance_windows/:id
```

## List all Maintenance Windows <a href="#list-all-maintenance-windows" id="list-all-maintenance-windows"></a>

```
GET https://api.pagertree.com/api/v4/maintenance_windows
```
