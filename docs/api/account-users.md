# Account Users

* An Account User represent a [User](../users.md) associated with an [Account](../accounts.md).
* A User represent a physical person.
* A User can have many [Emails](../users.md#emails) and [Phones](../users.md#phone-numbers).

### The Account User Object

| Property                  | Type      | Description                                                                                                    |
| ------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| roles                     | hash      | [Roles](../users.md#roles) hash (boolean values). Valid keys are :admin, :billing, :broadcaster, :communicator |
| notification\_rule\_id    | string    | The ID of the [notification rule](notification-rules.md) this account user is currently using.                 |
| user.id                   | string    | The ID of the user.                                                                                            |
| user.prefix\_id           | string    | Prefix ID of user.                                                                                             |
| user.name                 | string\[] | The user's full name.                                                                                          |
| user.time\_zone           | string\[] | The user's time zone.                                                                                          |
| user.emails\[].id         | string    | The ID of the email object.                                                                                    |
| user.emails\[].email      | string    | The email address.                                                                                             |
| user.emails\[].primary    | string\[] | Boolean indicating if this is the user's primary email address.                                                |
| user.phones\[].id         | string    | ID of phone object.                                                                                            |
| user.phones\[].prefix\_id | string    | Prefix ID of phone object.                                                                                     |
| user.phones\[].phone      | string    | [E.164 format](https://www.twilio.com/docs/glossary/what-e164) phone number.                                   |
| user.phones\[].primary    | boolean   | Boolean indicating if this is the user's primary phone number.                                                 |
| user.phones\[].country    | string    | ISO 3166 alpha-2 country code of the number (determined by PagerTree).                                         |
| user.phones\[].blocked    | boolean   | Boolean indicating whether this phone has been blocked.                                                        |

### Create a Account User

```
POST https://api.pagertree.com/api/v4/account_users
```

**Allowed Parameters**

```ruby
def account_user_params
  params.permit(
    :notification_rule_id,
    roles: {},
    member_team_ids: [],
    user_attributes: [
      :id,
      :name,
      :notify_push,
      :notify_email,
      :notify_sms,
      :notify_voice,
      emails_attributes: [
        :id,
        :email,
        :primary,
        :_destroy,
      ],
      phones_attributes: [
        :id,
        :phone,
        :primary,
        :_destroy,
      ]
    ]
  )
end
```

**Required Parameters**

* user\_attributes
  * name
  * emails\_attributes
    * email

:::info
A default secure password will be created by PagerTree and assigned to the user (not applicable if using SSO on the account). The user will receive an email containing their username and password. If a user already exists in PagerTree they will receive an invite email where they can approve or deny joining your account. When the user logs in to PagerTree for the first time they will be guided through a setup process to confirm their phone number.
:::

**Example Request**

```
POST https://api.pagertree.com/api/v4/account_users
{
  "user_attributes": {
    "name": "Bobby Hill",
    "emails_attributes": [
      {
        "email": "[email protected]"
      }
    ]
  }
}
```

### Retrieve a Account User

```
GET https://api.pagertree.com/api/v4/account_users/:id
```

### Update a Account User

```
PUT https://api.pagertree.com/api/v4/account_users/:id
```

### Delete a Account User

```
DELETE https://api.pagertree.com/api/v4/account_users/:id
```

### List all Account Users

```
GET https://api.pagertree.com/api/v4/account_users
```
