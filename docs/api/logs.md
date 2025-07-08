# Logs

* Logs are polymorphic objects and can be attached to any other object.
* Logs are meant to document information and movement of other objects within the PagerTree application.

## The Log Object

| Property    | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| format      | string | The format of the log.                  |
| level       | string | The level of the log.                   |
| owner\_id   | string | The owner ID of the log.                |
| owner\_type | string | The model type of the owner of the log. |
| details     | hash   | :message, :sublogs                      |

## Retrieve a Log

```
GET https://api.pagertree.com/api/v4/logs/:id
```

## List all Logs

```
GET https://api.pagertree.com/api/v4/logs
```
