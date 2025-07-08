# Comments

* A comment can be attached to [Alerts](alerts.md) or [Broadcasts](broadcasts.md).

## The Comment Object

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| body     | string | The title of the broadcast. |

## Create a Comment

```
POST https://api.pagertree.com/api/v4/comments
```

#### Allowed Parameters

```ruby
def comment_params
  params.permit(
    :body
  )
end
```

#### Required Parameters

* body

## Retrieve a Comment <a href="#retrieve-a-broadcast" id="retrieve-a-broadcast"></a>

```
GET https://api.pagertree.com/api/v4/comments/:id
```

## List all Comments <a href="#list-all-broadcasts" id="list-all-broadcasts"></a>

```
GET https://api.pagertree.com/api/v4/comments
```

## Comment on a Comment

```
POST https://api.pagertree.com/api/v4/comments/:id/comments
```

#### Required Parameters

* body

## List a Comment's Comments

```
GET https://api.pagertree.com/api/v4/comments/:id/comments
```
