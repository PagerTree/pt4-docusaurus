# Teams

* [Teams](../teams.md) represent a group of [account users](account-users.md). Every team has one active [schedule](../schedules.md) and one active [escalation policy](../escalation-policies.md).

## The Team Object <a href="#the-team-object" id="the-team-object"></a>

| Property                                  | Type      | Description                                                                                            |
| ----------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| name                                      | string    | The name of the team                                                                                   |
| escalation\_policy\_id                    | string    | The ID of the active [escalation policy](escalation-policies.md) for this team.                        |
| schedule\_id                              | string    | The ID of the active [schedule](schedules.md) for this team.                                           |
| member\_account\_user\_ids                | string\[] | IDs of [account users](account-users.md) the take on the member role for this team.                    |
| admin\_account\_user\_ids                 | string\[] | IDs of the account users that take on the admin role for this team.                                    |
| drop\_notifications                       | string    | `none\|team_all\|team_admins\|oncall_rotation\|specific_users`                                         |
| handoff\_notifications                    | string    | `none\|team_all\|team_admins\|oncall_rotation\|specific_users`                                         |
| drop\_notification\_account\_user\_ids    | string\[] | If drop\_notifications set to `specific_users`, the account user IDs to send drop notifications to.    |
| handoff\_notification\_account\_user\_ids | string\[] | If handoff\_notifications set to `specific_users`, the account user IDs to send drop notifications to. |
| notes                                     | string    | Notes to be displayed for this team.                                                                   |
| attachments                               | hash      | :filename, :url                                                                                        |

## Create a Team <a href="#create-a-team" id="create-a-team"></a>

```
POST https://api.pagertree.com/api/v4/teams
```

#### **Allowed Parameters**

```ruby
def team_params
  params.permit(
    :meta,
    :name,
    :notes,
    :drop_notifications,
    :handoff_notifications,
    member_account_user_ids: [],
    admin_account_user_ids: [],
    drop_notification_account_user_ids: [],
    handoff_notification_account_user_ids: []
  )
end
```

#### **Required Parameters**

* name
* at least 1 account user as a [member role](../teams.md#team-roles)
* at least 1 account user as an [admin role](../teams.md#team-roles)

:::info
A default schedule and escalation policy will be created by PagerTree.
:::

## Retrieve a Team <a href="#retrieve-a-team" id="retrieve-a-team"></a>

```
GET https://api.pagertree.com/api/v4/teams/:id
```

## Update a Team <a href="#update-a-team" id="update-a-team"></a>

```
PUT https://api.pagertree.com/api/v4/teams/:id
```

## Delete a Team <a href="#delete-a-team" id="delete-a-team"></a>

```
DELETE https://api.pagertree.com/api/v4/teams/:id
```

## List all Teams <a href="#list-all-teams" id="list-all-teams"></a>

```
GET https://api.pagertree.com/api/v4/teams
```

## Current On-Call <a href="#current-on-call" id="current-on-call"></a>

Returns on-call event attendees for now for this team. (Handles repeating events and rotations)

Shortcut for [schedule current on-call method](/docs/api/schedules.md#current-on-call).

```
GET https://api.pagertree.com/api/v4/teams/:id/current_oncall
```

## List a Team's Alerts

Return alerts that have been assigned to this team.

```
GET https://api.pagertree.com/api/v4/teams/:id/alerts
```
