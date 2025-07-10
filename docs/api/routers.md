# Routers

* [Routers](../routers.md) are simple YAML configurations that dictate how to route and transform [Alerts](../alerts.md).
* Alerts can be sent to routers by [Integrations](../integrations.md) or [Account Users](account-users.md).
* Routers are part of the [Advanced Functionality](../users.md#advanced-mode) in PagerTree. Please see the [routers documentation](../routers.md) in-depth details on how to use them.

## The Router Object

| Property                             | Type    | Description                                                                                                   |
| ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------- |
| name                                 | string  | The name of the router                                                                                        |
| enabled                              | boolean | Boolean indicating if this router is currently enabled. If false, it will just route to the default receiver. |
| rules                                | string  | YAML definition of the router. See routers documentation.                                                     |
| default\_receiver\_account\_user\_id | string  | The ID of the [Account User](account-users.md) to receive the alert if no rules match.                        |
| default\_receiver\_router\_id        | string  | The ID of the [Router](routers.md) to receive the alert if no rules match.                                    |
| default\_receiver\_team\_id          | string  | The ID of the [Team](teams.md) to receive the alert if no rules match.                                        |

## Create a Router

```
POST https://api.pagertree.com/api/v4/routers
```

#### Allowed Parameters

```ruby
def router_params
  params.permit(
    :name,
    :enabled,
    :rules,
    :default_receiver_account_user_id,
    :default_receiver_router_id,
    :default_receiver_team_id,
  )
end
```

#### Required Parameters

* name
* at least 1 default\_receiver

## Retrieve a Router

```
GET https://api.pagertree.com/api/v4/routers/:id
```

## Update a Router

```
PUT https://api.pagertree.com/api/v4/routers/:id
```

## Delete a Router

```
DELETE https://api.pagertree.com/api/v4/routers/:id
```

## List all Routers

```
GET https://api.pagertree.com/api/v4/routers
```
