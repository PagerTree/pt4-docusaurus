# Routers

## What are Routers?

With routers, you can perform complex matching and actions on alerts. Routers consist of many router rules that are processed after the integration has transformed the 3rd party data into an alert, but before the alert has been assigned to the team.

* Routers are objects that can dynamically route alerts based on match conditions.
* Alerts are sent to a router either by an Integration or Account User.
* To access routers, you must enable "advanced mode".
* Router rules are evaluated in top down order.
* If no rules are matched, alerts are routed to the default receiver.
* Routers are written in YAML.

<figure>![high level alert workflow](<https://pagertree.com/assets/img/kb/routers/high-level-alert-workflow-routing-rules.png>)<figcaption><p>High Level Alert Workflow (Routers)</p></figcaption></figure>

### Routers Video

<iframe src="https://www.youtube-nocookie.com/embed/DTCqJnQPPJI" title="PagerTree Routers Tutorial Video (v4)" class="rds-video"></iframe>

## Rules Syntax

* _rules_ - array - Always the root element - 1..n
  * _match_ - hash - 1 match condition (object) - 1
  * _actions_ - array - 1 or more actions to perform - 1..n

```yaml
---
rules:
  # array of rules
  - match:
    # ... properties to match
    actions:
    # ... array of actions
```

## Match Block

The match block will attempt to match [data](routers.md#data) using [operators](routers.md#operators).

### Data

When routers are matching rules they are given access to data.

```
{
  always: true, // will always be true
  alert: {...}, // the alert object being evaluated
  log: { // the source log of the alert (if one exists)
    // if the log was from a webhook based integration 
    // it will have the following properties
    data: {...}, // the body of the request
    headers: {...}, // the headers of the request

    // if the log was from an email integration 
    // it will have the following properties
    from: ["..."], // array of email addresses (but usually just one)
    to: ["...", "..."], // array of email addresses
    subject: "...", // text
    body: "..." // raw body text
  }, 
  log_parsed: boolean, // a boolean indicating if PagerTree was able to parse the log to an object
}
```

### Operators

Internally PagerTree uses the [sift package](https://github.com/crcn/sift.js) to do rule matching. It follows the familiar MongoDB syntax.

* [$in](https://github.com/crcn/sift.js#in)
* [$nin](https://github.com/crcn/sift.js#nin)
* [$exists](https://github.com/crcn/sift.js#exists)
* [$gte](https://github.com/crcn/sift.js#gte)
* [$gt](https://github.com/crcn/sift.js#gt)
* [$lte](https://github.com/crcn/sift.js#lte)
* [$lt](https://github.com/crcn/sift.js#lt)
* [$eq](https://github.com/crcn/sift.js#eq)
* [$ne](https://github.com/crcn/sift.js#ne)
* [$mod](https://github.com/crcn/sift.js#mod)
* [$all](https://github.com/crcn/sift.js#all)
* [$and](https://github.com/crcn/sift.js#and)
* [$or](https://github.com/crcn/sift.js#or)
* [$nor](https://github.com/crcn/sift.js#nor)
* [$size](https://github.com/crcn/sift.js#size)
* [$type](https://github.com/crcn/sift.js#type)
* [$regex](https://github.com/crcn/sift.js#regex)
* [$elemMatch](https://github.com/crcn/sift.js#elemmatch)
* [$not](https://github.com/crcn/sift.js#not)

There are 3 special functions that are supplemental.

* [$day](#day)
* [$now](#now)
* [$timeBetween](#timebetween)

#### $day

* **Returns** - [ISO day of the week](https://momentjs.com/docs/#/get-set/iso-weekday/) (1 Monday, 7 Sunday): integer.
* **Parameters**
  * _timezone_ - A valid [momentjs timezone](https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json), default: Etc/UTC

```yaml
$day:
  timezone: "America/Los_Angeles"
  $in:
  - 6
  - 7
```

#### $now

* **Returns** - Current datetime in the specified format: string.
* **Parameters**
  * _timezone_ - A valid [momentjs timezone](https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json), default: Etc/UTC
  * _format_ - A valid [momentjs string formats](https://momentjs.com/docs/#/parsing/string-format/), default: YYYY-MM-DD

```yaml

$now:
  timezone: "America/Chicago"
  format: "MM-DD"
  $in:
  - "01-01" # New Years
  - "12-25" # Christmas
```

#### $timeBetween

* **Returns** - A boolean if the current time is between (inclusive) the time provided :boolean
* **Parameters**
  * _timezone_ - A valid [momentjs timezone](https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json), default: Etc/UTC
  * _timeformat_ - A valid [momentjs string formats](https://momentjs.com/docs/#/parsing/string-format/), default: "hh:mm a"
  * _starttime_ - The start time to consider.
  * _endtime_ - The end time to consider.

Note: If the start time is after the end time, this simulates checking the over night time span.

```yaml
$timeBetween:
  timezone: "America/Los_Angeles"
  timeformat: "hh:mm a"
  starttime: "08:00 am"
  endtime: "05:00 pm"
```

## Actions Block

### Action Types

* [aggregate](routers.md#aggregate) - Aggregate alerts based on fields.
* [assign](routers.md#assign) - Assign the alert to a team, router, or account user.
* [ignore](routers.md#ignore) - Suppress the alert.
* [incident](routers.md#incident) - Mark the alert as an incident.
* [setval](routers.md#setval) - Set a value on the alert.
* [stakeholder](routers.md#stakeholder) - Attach a stakeholder to the alert.

#### Aggregate

The aggregate function will aggregate alerts by the specified _by_ properties for _timeout_ amount of time. The first alert will be immediately routed to the _receiver_ and all subsequent alerts that arrive matching the aggregate by will be added as a child to the first alert and immediately discarded.

**Parameters**

* _by_ - array - properties to generate a fingerprint from
* _timeout_ - string - [ms](https://www.npmjs.com/package/ms) notation of the duration to aggregate alerts for.
* _receiver_ - string - account user, router, or team Prefix ID to route the initial alert to.

```yaml
- type: aggregate
  by:
  - alert.urgency
  timeout: 5m
  receiver: tem_xxxxxx
```

#### Assign

The assign function will assign the alert to an account user, router or team.

**Parameters**

* _receiver_ - string|array - account user, router, or team Prefix ID to route the alert to.
* _delay_ - string - [ms](https://www.npmjs.com/package/ms) notation of the duration to delay the initial routing. (Useful if alerts tend to self heal)

```yaml
# default syntax, assign to one value (user, team, router, schedule)
- type: assign
  receiver: usr_xxxxxx1
  
# advanced syntax, assign to multiple receivers, and add a delay
- type: assign
  receiver:
  - usr_xxxxxx1
  - tem_xxxxxx1
  delay: 5m
```

#### Ignore

The ignore function will change the alert's status to `suppressed` and stop routing.

```yaml
- type: ignore
```

#### Incident

The incident action will mark the alert as an incident.

**Parameters**

* _severity_ - string - A valid severity level of the incident (SEV-1|SEV-2|SEV-3|SEV-4|SEV-5|SEV-UNKNOWN)
* _message_ - string - The special incident message that will be displayed at the top of the alert page.
* _handlebars_ - boolean - Boolean indicating _severity_ and _message_ should use handlebars notation.

```yaml
# simple example
- type: incident
  severity: SEV-2
  message: Please join the call - https://mycallsoftware.com/call/123

# example using handlebars notation
- type: incident
  handlebars: true
  severity: "{{log.data.commonLabels.severity}}"
  message: Please join the call - https://mycallsoftware.com/call/123
```

#### Setval

The setval action will assign data to the alert. Define a custom title, description, tags, or urgency.

**Parameters**

* _map_ - hash - Allowed keys: title, description, tags, and/or urgency.
* _handlebars_ - boolean - Boolean indicating _title_ and _description_ should use handlebars notation.

```yaml
# simple example
- type: setval
  map:
    title: I just changed the title!
    tags:
    - some
    - cool
    - tags

# example using handlebars notation
- type: setval
  handlebars: true
  map:
    title: I just changed the title!
    description: "See the alert {{log.data.external_url}}"
    tags:
    - some
    - cool
    - tags
```

#### Stakeholder

The stakeholder action will attach stakeholders to the alert.

**Parameters**

* _ids_ - array - Stakeholder Prefix IDs

```yaml
- type: stakeholder
  ids:
  - stk_xxxxx1
```

## Putting It All Together

### Attach the Router to your Integration

When you are happy with your router definition **you must connect the Integration to the Router**.

For each integration that should use your routers logic:

1. **Edit** the Integration
2. Change the **Destinations** to be your new router
3. **Click Save**

## Examples <a href="#examples" id="examples"></a>

### Example #1 Always Aggregate By Source

* Matches everything
* Aggregates by unique alert.source\_id (usually a integration or user) for a period of 1 hour
* Assigns the alert to team tem\_xxxxxx1

```yaml
# match always, grouping by the source (integration or account user) for 1 hour. Send it to tem_xxxxxx1.
---
rules:
- match:
    always: true
  actions:
  - type: aggregate
    by:
    - alert.source_id
    timeout: 1h
    receiver: tem_xxxxxx1
```

### Example #2 Critical System Down Router

* Matches any alert with "Critical Systems Down" (case insensitive) in the title and the urgency of high or critical.
* Attaches stakeholder stk\_xxxxx1 to the alert.
* Assigns the alert to team tem\_xxxxxx1 with 5 minute delay to allow for self healing.

```yaml
# match critical system alerts (w/ urgency high or critical). Attach stakeholders and assign to tem_xxxxxx1 with a 5 minute delay
---
rules:
- match:
    alert.title:
      "$regex": "Critical Systems Down"
      "$options": "i" # case insensitive
    alert.urgency:
      "$in":
      - high
      - critical  
  actions:
  - type: stakeholder
    ids:
    - stk_xxxxx1
  - type: assign
    receiver: tem_xxxxxx1
    delay: 5m
```

### Example #3 Aggregate by Title

* Matches any alert with "staging" (case sensitive) in the title.
* Aggregates by unique alert.title for a period of 1 day.
* The first occurrence of each unique title will be routed to tem\_xxxxxx1.

```yaml
# Aggregate staging alert by unique title everyday. Send to tem_xxxxxx1.
---
rules:
- match:
    alert.title:
      $regex: "staging" # case sensitive
  actions:
  - type: aggregate
    by:
    - alert.title
    timeout: 1d
    receiver: tem_xxxxxx1
```

### Example #4 Office Hours

* Matches current time of day between 8a-5p, M-F (Europe/London) and routes to tem\_xxxxxx1.
* If outside of office hours, the alert is ignored.

This router makes use of the `$and`, `$timeBetween`, `$day` and `$in` operators.

```yaml
# Send alerts created between 8a-5p M-F Europe/London time to team tem_xxxxxx1. Ignore everything else.
---
rules:
- match:
    $and:
    - $timeBetween:
        timezone: "Europe/London"
        timeformat: "hh:mm a"
        starttime: "08:00 am"
        endtime: "05:00 pm"

    # Monday - Friday
    - $day:
        timezone: "Europe/London"
        $in:
        - 1
        - 2
        - 3
        - 4
        - 5

  actions:
    - type: assign
      receiver: tem_xxxxxx1

- match:
    always: true
  actions:
    - type: ignore
```

## Common Errors

Routers are some of the most complex pieces of PagerTree. If you run into issues make sure to check out the [Router Workflows](https://app.pagertree.com/workflows?direction=desc\&sort=created\_at\&type=Workflow::AlertRouter) and their logs.

### Forgot to Set Integration Destination

Many times a customer has written the router correctly but forgets to set the integration destination as the router.

_Don't forget to point the integrations that should use the router logic to point to your router!_

### Bad Indentation

A common error when configuring routers is that the YAML is not formatted correctly (mostly always indentation). You can use the [JSON2YAML tool](https://www.bairesdev.com/tools/json2yaml/) to check your indentation.

<div>

<figure>![Good router indentation](<https://pagertree.com/assets/img/kb/routers/good-indentation-example.png>)<figcaption><p>Good Router Indentation</p></figcaption></figure>

 

<figure>![bad router indentation](<https://pagertree.com/assets/img/kb/routers/bad-indentation-example.png>)<figcaption><p>Bad Router Indentation</p></figcaption></figure>

</div>
