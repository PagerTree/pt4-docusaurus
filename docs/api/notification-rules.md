# Notification Rules

* [Notification Rules](../notification-rules.md) are simple YAML configurations that dictate how PagerTree notifies [Account Users](account-users.md) regarding [Alerts](../alerts.md).
* Notification Rules must be assigned to the Account User object.

### The Notification Rule Object <a href="#the-maintenance-window-object" id="the-maintenance-window-object"></a>

| Property | Type    | Description                                                                                                                                     |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | string  | The name of the notification rule.                                                                                                              |
| enabled  | boolean | Boolean indicating if this notification rule is currently enabled. If false, it will just notify users via their default notification channels. |
| rules    | string  | YAML definition of the notification rule. See [notification rules documentatio](../notification-rules.md)n.                                     |

## Create a Notification Rule <a href="#create-a-notification-rule" id="create-a-notification-rule"></a>

```
POST https://api.pagertree.com/api/v4/notification_rules
```

#### **Allowed Parameters**

```ruby
def notification_rule_params
  params.permit(
    :name,
    :enabled,
    :rules
  )
end
```

#### **Required Parameters**

* name

## Retrieve a Notification Rule <a href="#retrieve-a-notification-rule" id="retrieve-a-notification-rule"></a>

```
GET https://api.pagertree.com/api/v4/notification_rules/:id
```

## Update a Notification Rule <a href="#update-a-notification-rule" id="update-a-notification-rule"></a>

```
PUT https://api.pagertree.com/api/v4/notification_rules/:id
```

## Delete a Notification Rule <a href="#delete-a-notification-rule" id="delete-a-notification-rule"></a>

```
DELETE https://api.pagertree.com/api/v4/notification_rules/:id
```

## List all Notification Rules <a href="#list-all-notification-rules" id="list-all-notification-rules"></a>

```
GET https://api.pagertree.com/api/v4/notification_rules
```
