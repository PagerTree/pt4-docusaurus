# Broadcasts

* A [broadcast](../broadcasts.md) can be used to notify specific [Account Users](account-users.md) and [Teams](teams.md).

## The Broadcast Object

| Property                        | Type                       | Description                                                                               |
| ------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| title                           | string                     | The title of the broadcast.                                                               |
| description                     | string                     | The description of the broadcast.                                                         |
| tag\_list                       | string\[]                  | A list of tags.                                                                           |
| destination\_team\_ids          | string\[]                  | An array of [Team](teams.md) IDs this broadcast should be sent to.                        |
| destination\_account\_user\_ids | string\[]                  | An array of [Account User](account-users.md) IDs this broadcast should be sent to.        |
| status                          | string                     | The current status state of the broadcast. `queued\|open\|closed\|errored`                |
| response\_requested             | boolean                    | If a [response was requested](../broadcasts.md#response-options) from the destinations.   |
| response\_requested\_by         | timestamp                  | The deadline of when the destinations have to respond by.                                 |
| broadcast\_response\_options    | BroadcastResponseOption\[] | `:id, :value, :position, :broadcast_responses_count`                                      |
| broadcast\_responses            | BroadcastResponses\[]      | `:id, :prefix_id, :account_user_id, :broadcast_response_option_id, :channel, :created_at` |

## Create a Broadcast

```
POST https://api.pagertree.com/api/v4/broadcasts
```

#### Allowed Parameters

```ruby
def broadcast_params
  params.permit(
    :title,
    :description,
    :tag_list,
    :response_requested,
    :response_requested_by,
    destination_team_ids: [],
    destination_account_user_ids: [],
    broadcast_response_options_attributes: [
      :value
    ]
  )
end
```

#### Required Parameters

* title
* at least 1 destination (Team or Account User)
* if response requested, at least 1 response option

## Retrieve a Broadcast

```
GET https://api.pagertree.com/api/v4/broadcasts/:id
```

## Update a Broadcast

```
PUT https://api.pagertree.com/api/v4/broadcasts/:id
```

## Delete a Broadcast

```
DELETE https://api.pagertree.com/api/v4/broadcasts/:id
```

## List all Broadcasts

```
GET https://api.pagertree.com/api/v4/broadcasts
```

## Comment on a Broadcast

```
POST https://api.pagertree.com/api/v4/broadcasts/:id/comments
```

#### Required Parameters

* body

## List a Broadcast's Comments

```
GET https://api.pagertree.com/api/v4/broadcasts/:id/comments
```
