# Common Model Attributes

In order to keep our documentation clear and concise, it should be assumed that all models have the following properties:

| Property    | Type      | Description                                                                                                                                             |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account\_id | string    | The [Account](../accounts.md) identifier this object belongs to.                                                                                        |
| id          | string    | Unique identifier for the object. (Globally unique.)                                                                                                    |
| prefix\_id  | string    | Unique identifier for the object with a friendly prefix. (Globally unique. Ex: "alt\_xxxxxxxx")                                                         |
| tiny\_id    | integer   | The numeric identifier for this object in the account. (Unique to the scope of the account and model type)                                              |
| created\_at | timestamp | When the object was created.                                                                                                                            |
| updated\_at | timestamp | When the object was last updated.                                                                                                                       |
| meta        | hash      | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. |
