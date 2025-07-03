# Users

* A User represent a physical person.
* A User can have many [Emails](../users.md#emails) and [Phones](../users.md#phone-numbers).
* A User is associated with one to many [Account Users](account-users.md).

### The User Object <a href="#the-account-user-object" id="the-account-user-object"></a>

| Property             | Type      | Description                                                                  |
| -------------------- | --------- | ---------------------------------------------------------------------------- |
| name                 | string\[] | The user's full name.                                                        |
| time\_zone           | string\[] | The user's time zone.                                                        |
| preferred\_language  | string    | The user's preferred language.                                               |
| last\_sign\_in\_at   | timestamp | A timestamp of when the user last logged in via the web interface.           |
| emails\[].id         | string    | The ID of the email object.                                                  |
| emails\[].email      | string    | The email address.                                                           |
| emails\[].primary    | string\[] | Boolean indicating if this is the user's primary email address.              |
| phones\[].id         | string    | ID of phone object.                                                          |
| phones\[].prefix\_id | string    | Prefix ID of phone object.                                                   |
| phones\[].phone      | string    | [E.164 format](https://www.twilio.com/docs/glossary/what-e164) phone number. |
| phones\[].primary    | boolean   | Boolean indicating if this is the user's primary phone number.               |
| phones\[].country    | string    | ISO 3166 alpha-2 country code of the number (determined by PagerTree).       |
| phones\[].blocked    | boolean   | Boolean indicating whether this phone has been blocked.                      |

### Create a User <a href="#create-a-account-user" id="create-a-account-user"></a>

```
POST https://api.pagertree.com/api/v4/users
```

**Allowed Parameters**

```ruby
def user_params
  params.permit(
    :name,
    :email,
    :notify_push,
    :notify_email,
    :notify_sms,
    :notify_voice,
    emails_attributes: [
      :id,
      :email,
      :primary
    ],
    phones_attributes: [
      :id,
      :phone,
      :confirmation_method,
      :primary
    ]
  )
end
```

**Required Parameters**

* name
* email

:::info
A default secure password will be created by PagerTree and assigned to the user (not applicable if using SSO on the account). The user will receive an email containing their username and password. If a user already exists in PagerTree they will receive an invite email where they can approve or deny joining your account. When the user logs in to PagerTree for the first time they will be guided through a setup process to confirm their phone number.
:::

**Example Request**

```
POST https://api.pagertree.com/api/v4/users
{
  "name": "Bobby Hill",
  "email": "bobby@example.com"
}
```

### Retrieve a User <a href="#retrieve-a-account-user" id="retrieve-a-account-user"></a>

```
GET https://api.pagertree.com/api/v4/users/:id
```

### Update a User <a href="#update-a-account-user" id="update-a-account-user"></a>

```
PUT https://api.pagertree.com/api/v4/users/:id
```

### Delete a User <a href="#delete-a-account-user" id="delete-a-account-user"></a>

:::danger
This action is not supported. Please see the [Delete a Account User](account-users.md#delete-a-account-user) method.
:::

### List all Users <a href="#list-all-account-users" id="list-all-account-users"></a>

```
GET https://api.pagertree.com/api/v4/users
```
