# Logs

* Logs are polymorphic objects and can be attached to any other object.
* Logs are meant to document information and movement of other objects within the PagerTree application.

## The Log Object <a href="#the-log-object" id="the-log-object"></a>

| Property    | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| format      | string | The format of the log.                  |
| level       | string | The level of the log.                   |
| owner\_id   | string | The owner ID of the log.                |
| owner\_type | string | The model type of the owner of the log. |
| details     | hash   | :message, :sublogs                      |

## Retrieve a Log <a href="#retrieve-a-log" id="retrieve-a-log"></a>

```
GET https://api.pagertree.com/api/v4/logs/:id
```

## List all Logs <a href="#list-all-logs" id="list-all-logs"></a>

```
GET https://api.pagertree.com/api/v4/logs
```
