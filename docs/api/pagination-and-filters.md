# Pagination and Filters

All top-level API resources have support for bulk fetches via the "list" API methods. These list API methods share a common structure, taking at least these two parameters: `limit` and `offset`.

Alternatively you may request pages by providing these two parameters: `limit` and `page`.

## Pagination Parameters

| Parameter | Default | Description                                                                |
| --------- | ------- | -------------------------------------------------------------------------- |
| limit     | 10      | A limit on the number of objects to be returned, between 1 and 100         |
| offset    | 0       | A cursor to use in pagination. The number of elements to skip.             |
| page      | 1       | A cursor to use in pagination. Uses the limit to calculate current offset. |

## Response Format <a href="#response-format" id="response-format"></a>

| Parameter    | Type    | Description                                                                                                              |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| data         | array   | The array of objects requested.                                                                                          |
| has\_more    | boolean | Whether or not there are more elements available after this request. If `false`, this list comprises the end of the set. |
| total\_count | number  | Number of total elements that exist.                                                                                     |

## Filter Parameters <a href="#filter-parameters" id="filter-parameters"></a>

For any resource you are querying via the top-level API you can pass any attributes of those objects to filter on.

An example query url might look like the following:

```
GET https://api.pagertree.com/api/v4/alerts?title=test
```

You can also pass modifiers to modify the filters. The modifiers must be in the query parameter `ops` and have the format `<attribute_name>:<operation>`, where operation is any of the following:

## Operators <a href="#operators" id="operators"></a>

| Name       | Type                     | Comparison                  |
| ---------- | ------------------------ | --------------------------- |
| equals     | `===`                      | `attribute === value`         |
| ne         | `!==`                      | `attribute !== value`         |
| lt         | `<`                        | `attribute < value`           |
| lte        | `<=`                       | `attribute <= value`          |
| gt         | `>`                        | `attribute > value`           |
| gte        | `>=`                       | `attribute >= value`          |
| beginsWith | string begins with       | attribute.beginsWith(value) |
| contains   | string or array contains | attribute.contains(value)   |

Multiple operators can be applied by separating each token with a comma: `<attribute_name1>:<operation1>,<attribute_name2>:<operation2>`

An example query url might look like the following:

```
# Single operation
GET https://api.pagertree.com/api/v4/alerts?title=test&ops=title:beginsWith

# Combining operations
GET https://api.pagertree.com/api/v4/schedules/:id/events?ops=start_datetime:gte,end_datetime:lte&start_datetime=2022-10-12 07:00:00&end_datetime=2022-10-13 07:00:00
```

## Sorting <a href="#sorting" id="sorting"></a>

For any resource you are querying via the top-level API you can pass the `sort` and `direction` parameters.

An example query url might look like the following:

```
GET https://api.pagertree.com/api/v4/alerts?sort=created_at&direction=asc
```

The direction query parameter can be either `asc` or `desc`.
