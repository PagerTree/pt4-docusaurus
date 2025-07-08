# Escalation Policies

* [Escalation Policies define](../escalation-policies.md) the rule set of how an [Alert](../alerts.md) moves through a [Team's](../teams.md) on-call [Schedule](../schedules.md).
* Escalation Policies are independent objects. The Team object is responsible for assigning itself a primary Schedule and an Escalation Policy.

## The Escalation Policy Object <a href="#the-escalation-policy-object" id="the-escalation-policy-object"></a>

| Property                     | Type                                                              | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| name                         | string                                                            | The name of the escalation policy. (**Required**)                                               |
| repeat                       | integer                                                           | The amount of times to [repeat](../escalation-policies.md#repeat-option) the escalation policy. |
| reassign\_team\_ids          | string\[]                                                         | An array of Team IDs this escalation [reassigns](../escalation-policies.md#reassign-option) to. |
| reassign\_account\_user\_ids | string\[]                                                         | An array of Account User IDs this escalation reassigns to.                                      |
| team\_ids                    | string\[]                                                         | The team IDs currently using this escalation policy.                                            |
| escalation\_layers           | [EscalationLayer](../escalation-policies.md#escalation-layers)\[] | :account\_id, :id, :prefix\_id, :layer, :timeout, :timeout\_unit, :color\_hex                   |

## Create a Escalation Policy

```
POST https://api.pagertree.com/api/v4/escalation_policies
```

#### Allowed Parameters

```ruby
def escalation_policy_params
  params.permit(
    :name,
    :repeat,
    reassign_team_ids: [],
    reassign_account_user_ids: [],
    escalation_layers_attributes: [
      :id,
      :layer,
      :timeout,
      :timeout_unit,
      :color_hex,
      :_destroy
    ]
  )
end
```

#### Required Parameters

* name

## Retrieve an Escalation Policies

```
GET https://api.pagertree.com/api/v4/escalation_policies/:id
```

## Update an Escalation Policies

```
PUT https://api.pagertree.com/api/v4/escalation_policies/:id
```

## Delete an Escalation Policies

```
DELETE https://api.pagertree.com/api/v4/escalation_policies/:id
```

## List all Escalation Policies

```
GET https://api.pagertree.com/api/v4/escalation_policies
```
