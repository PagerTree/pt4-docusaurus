# Alerts

* An [alert](../alerts.md) represents an urgent notice (state of alarm)
* Alerts are created by [Integrations](../integrations.md) or [Account Users](../users.md)

## The Alert Object <a href="#the-alert-object" id="the-alert-object"></a>

| Property         | Type      | Description                                                                                                                         |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| title            | string    | The title of the alert.                                                                                                             |
| description      | string    | The description of the alert.                                                                                                       |
| tag\_list        | string\[] | A list of tags.                                                                                                                     |
| urgency          | string    | The urgency of the alert. `low\|medium\|high\|critical`                                                                             |
| status           | string    | The [current status](../alerts.md#alert-states) state of the alert.                                                                 |
| source\_id       | string    | The source identifier.                                                                                                              |
| source\_type     | string    | The source model type (usually an [Integration](integrations.md) or [Account User](account-users.md)).                              |
| source\_log\_id  | string    | The [Log](logs.md) identifier that created this alert (only when created by an integration).                                        |
| thirdparty\_id   | string    | A unique identifier mapping this to a third party system.                                                                           |
| acknowledged\_at | timestamp | A timestamp of when the alert was first acknowledged. (Does not get reset if handed off or the alert was routed to multiple teams.) |
| resolved\_at     | timestamp | A timestamp of when the alert was resolved.                                                                                         |
| dedup\_keys      | string\[] | Unique identifiers that group alerts within the account.                                                                            |

### **Notes**

* Set the `meta.incident` to true to flag this alert as an [incident](../alerts.md#incident).
* Set the `meta.incident_severity` to set the [severity](../alerts.md#severities). `SEV-1|SEV-2|SEV-3|SEV-4|SEV-5|SEV-UNKNOWN`
* Set the `meta.incident_message` to set the special incident message.

## Create an Alert <a href="#create-a-alert" id="create-a-alert"></a>

```
POST https://api.pagertree.com/api/v4/alerts
```

#### **Allowed Parameters**

```ruby
def alert_params
  params.permit(
    :title,
    :description,
    :urgency,
    meta: [
      :incident,
      :incident_severity,
      :incident_message
    ],
    destination_team_ids: [],
    destination_router_ids: [],
    destination_account_user_ids: [],
    tags: []
  )
end
```

#### **Required Parameters**

* title
* urgency
* at least 1 destination (Team, Router, or Account User)

## Retrieve an Alert <a href="#retrieve-a-alert" id="retrieve-a-alert"></a>

```
GET https://api.pagertree.com/api/v4/alerts/:id
```

## Update an Alert <a href="#update-a-alert" id="update-a-alert"></a>

```
PUT https://api.pagertree.com/api/v4/alerts/:id
```

## Delete an Alert <a href="#delete-a-alert" id="delete-a-alert"></a>

```
DELETE https://api.pagertree.com/api/v4/alerts/:id
```

## List all Alerts <a href="#list-all-alerts" id="list-all-alerts"></a>

```
GET https://api.pagertree.com/api/v4/alerts
```

## Acknowledge an Alert <a href="#acknowledge-an-alert" id="acknowledge-an-alert"></a>

[Acknowledge](../alerts.md#acknowledge) an alert. Must be in the open|dropped|suppressed state.

```
POST https://api.pagertree.com/api/v4/alerts/:id/acknowledge
```

## Reject an Alert <a href="#reject-an-alert" id="reject-an-alert"></a>

[Reject](../alerts.md#reject) an alert. API Key user must have an open workflow for this alert.

```
POST https://api.pagertree.com/api/v4/alerts/:id/reject
```

## Resolve an Alert <a href="#resolve-an-alert" id="resolve-an-alert"></a>

[Resolve](../alerts.md#resolve) an alert. Must be in the open|dropped|acknowledged state.

```
POST https://api.pagertree.com/api/v4/alerts/:id/resolve
```

## Comment on an Alert

```
POST https://api.pagertree.com/api/v4/alerts/:id/comments
```

#### Required Parameters

* body

## List an Alert's Comments

```
GET https://api.pagertree.com/api/v4/alerts/:id/comments
```
