# Integrations

* An [integration](../integrations.md) connects PagerTree to 3rd party applications.
* Integrations are Open Source. Adapter source code can be found on [GitHub](https://github.com/PagerTree/pager\_tree-integrations).
* Integrations are responsible for transforming 3rd party webhook data into [Alerts](../alerts.md).
* If able to successfully transform the 3rd party webhook data into an Alert and determining the webhook was a `create` action, the integration will send the alert to any of [Account Users](account-users.md), [Routers](../routers.md), or [Teams](../teams.md).

## The Integration Object

| Property           | Type      | Description                                                                     |
| ------------------ | --------- | ------------------------------------------------------------------------------- |
| name               | string    | The name of the integration.                                                    |
| enabled            | boolean   | Boolean indicating if this integration is currently enabled.                    |
| urgency            | string    | Default urgency for the alerts this integration creates.                        |
| integration\_type  | object    | The integration type object of this integration.                                |
| options            | hash      | Options for the integration type.                                               |
| account\_user\_ids | string\[] | IDs of [Account Users](account-users.md) this integration routes to by default. |
| router\_ids        | string\[] | IDs of [routers](routers.md) this integration routes to by default.             |
| team\_ids          | string\[] | IDs of [teams](teams.md) this integration routes to by default.                 |

## Create an Integration

```
POST https://api.pagertree.com/api/v4/integrations
```

#### Allowed Parameters

```ruby
def integration_params
    option_keys = params.to_unsafe_h.keys.select { |key| key.to_s.starts_with?("option_") }.map(&:to_sym)
    params.permit(
      :name,
      :enabled,
      :urgency,
      :integration_type_id,
      *option_keys,
      account_user_ids: [],
      router_ids: [],
      team_ids: []
    )
  end
```

#### Required Parameters

* name
* urgency
* integration\_type\_id (see how to get a [list of Integration Types](#list-all-integration-types) below)
* at least 1 destination (Account User, Router, or Team)

#### **Example Request**

```
POST https://api.pagertree.com/api/v4/integrations/
{
    "name": "Retails Site Uptime Monitor",
    "integration_type_id": "01GDBEYARHS4W4QM6X370Z5TMB",
    "urgency": "high",
    "team_ids": ["01GDKK569YVD2EB6E9V80VXWY1"]
}
```

## Retrieve an Integration

```
GET https://api.pagertree.com/api/v4/integrations/:id
```

## Update an Integration

```
PUT https://api.pagertree.com/api/v4/integrations/:id
```

## Delete an Integration

```
DELETE https://api.pagertree.com/api/v4/integrations/:id
```

## List all Integrations

```
GET https://api.pagertree.com/api/v4/integrations
```

## Retrieve an Integration Type

```
GET https://api.pagertree.com/api/v4/integration_types/:id
```

## List all Integration Types

```
GET https://api.pagertree.com/api/v4/integration_types
```
