# Notification Rules

* [Notification Rules](../notification-rules.md) are simple YAML configurations that dictate how PagerTree notifies [Account Users](account-users.md) regarding [Alerts](../alerts.md).
* Notification Rules must be assigned to the Account User object.

### The Notification Rule Object

| Property | Type    | Description                                                                                                                                     |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | string  | The name of the notification rule.                                                                                                              |
| enabled  | boolean | Boolean indicating if this notification rule is currently enabled. If false, it will just notify users via their default notification channels. |
| rules    | string  | YAML definition of the notification rule. See [notification rules documentation](../notification-rules.md).                                     |

## Create a Notification Rule

```
POST https://api.pagertree.com/api/v4/notification_rules
```

#### Allowed Parameters

```ruby
def notification_rule_params
  params.permit(
    :name,
    :enabled,
    :rules
  )
end
```

#### Required Parameters

* name

## Retrieve a Notification Rule

```
GET https://api.pagertree.com/api/v4/notification_rules/:id
```

## Update a Notification Rule

```
PUT https://api.pagertree.com/api/v4/notification_rules/:id
```

## Delete a Notification Rule

```
DELETE https://api.pagertree.com/api/v4/notification_rules/:id
```

## List all Notification Rules

```
GET https://api.pagertree.com/api/v4/notification_rules
```
