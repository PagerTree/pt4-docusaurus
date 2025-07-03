# Integrations

## What is an Integration?

Integrations allow you to connect PagerTree to other 3rd party tools. Integrations create alerts and assign them to a [account user](users.md), [router](routers.md) or [team](teams.md).

<figure>![High level alert workflow](<.gitbook/assets/high-level-alert-workflow-integration.png>)<figcaption><p>High Level Alert Workflow (Integrations)</p></figcaption></figure>

For a full list of our supported integrations, please see the [integrations page](https://app.pagertree.com/integration_types?direction=asc\&limit=50\&sort=name).

Integrations are open sourced and can be found on [GitHub](https://github.com/PagerTree/pager_tree-integrations).

## Integration Options <a href="#integration-options" id="integration-options"></a>

Every integration type will have different integration options that can be selected. At a minimum the following must be selected:

* _Name_ - A friendly name for your integration.
* _Urgency_ - The urgency of alerts created by the integration.
* _Destinations_ - Where alerts should be sent after they are created by the integration.

For integration specific options, follow the instructions on the new integration form.

<figure>![example integration](<.gitbook/assets/integration-options.png>)<figcaption><p>An example of integration options.</p></figcaption></figure>

## Auto Aggregate and Resolve

:::info
The auto aggregate and resolve functionality are only available in the [Elite pricing plan](https://pagertree.com/pricing).
:::

### Auto Aggregate

You can configure an integration to aggregate incoming alerts by title to reduce noise. The scope of the aggregation is limited to alerts created by the integration in the `queued|open|acknowledged|dropped` [alert states](alerts.md#alert-states) with an exact match on the title string.&#x20;

The timeout value is the amount of time PagerTree will look back for alerts with the same title created by the integration and must be between 15 minutes (15m) and 30 days (30d) specified in [ms notation](https://github.com/vercel/ms).

This feature is useful for integration types like [email](integration-guides/email.md) or [webhook](integration-guides/webhook.md), where you want to deduplicate based on the title of an alert instead of the `third_party_id` (see [general alert aggregation below](integrations.md#alert-aggregation)).

<figure>![PagerTree Auto Aggregate By Title Option](<.gitbook/assets/aggregate-by-title-option.jpg>)<figcaption><p>Auto Aggregate by Title Option</p></figcaption></figure>

### Auto Resolve

You can configure integrations to auto-resolve alerts after a period of time. This is useful if your users might not always resolve alerts or if an integration doesn't support resolving an alert natively (ex: [email integration)](integration-guides/email.md).&#x20;

The timeout value is the amount of time to wait after the alert has been created before auto-resolving the alert. The timeout must be between 15 minutes (15m) and 30 days (30d) specified in [ms notation.](https://github.com/vercel/ms)

<figure>![PagerTree Auto Resolve After Timeout Option](<.gitbook/assets/auto-resolve-option.jpg>)<figcaption><p>Auto Resolve After Timeout Option</p></figcaption></figure>

## Templates <a href="#templates" id="templates"></a>

Each integration supports customizing the alert title and description using handlebars substitution.

* Use any [handlebars-helpers](https://github.com/helpers/handlebars-helpers) to support any logic.
* Use [JSON dot notation selection](https://lodash.com/docs/4.17.10#get) to access deeply nested data (ex: `data.alarm.region`). If you are unsure of the data being received by your integration, make sure to check the [logs](broken-reference).

### Data <a href="#data" id="data"></a>

```json
{
  integration: {...} // the integration object
  data: {
    ... // what was sent by the integration
    
    // email integration special attributes
    to: //the recipients of the email joined by a semi-colon
    from: // the sender of the email joined by a semi-colon
    subject: // the email subject
    message: // the sanitized body of the e-mail
  } 
}
```

#### Email Example

<figure>![Email example](<.gitbook/assets/integration-title-option.png>)<figcaption><p>You can use handlebars markup to modify the alert title and description by using the integration title and description templates.</p></figcaption></figure>

#### Webhook Example #1 - Referencing JSON body payload

The following example shows how to use the JSON body of the HTTP payload.

```json title="example_payload.json"
{
    "event_type": "create",
    "Id": "example-id-123",
    "Title": "Example Incident Title",
    "Description": "Example Incident Description",
    "extra": "I want to use this data"
}
```

<figure>![Webhook example](<.gitbook/assets/image (67).png>)<figcaption></figcaption></figure>

**The above would render**: "Custom Data - I want to use this data"

:::warning
C**ommon Mistake**: Make sure to use `data.<json_body_key>`.  Do not use `data.params.<key>` or `params.<key>`.
:::

#### Webhook Example #2 - Referencing an integration log <a href="#troubleshooting" id="troubleshooting"></a>

The following example shows how to use integration templates while referencing an [integration source log](integrations.md#integration-logs).

```json title="example_integratoin_log.json"
{
  "url": "https://api.pagertree.com/integration/int_xxxx",
  "method": "POST",
  "headers": {
    "HTTP_VERSION": "HTTP/1.1",
    "HTTP_CF_RAY": "abc123-LHR",
    ...
  },
  "params": {
    "device": "ABC-DEF-GHIJ-01",
    "sensorid": "1234",
    "sensor": "Free Disk Space (Multi Drive) (WMI Free Disk Space (Multi Disk))",
    "status": "Down (previous: Up)",
    "pagertree_integration_id": "int_xxxx"
  },
  "body": "device=...",
  "remote_ip": "0.0.0.0"
}
```

<figure>![](<.gitbook/assets/image (1).png>)<figcaption></figcaption></figure>

**The above would render:** "Sensor 1234 is DOWN!"

:::warning
C**ommon Mistake**: Make sure to use `data.<json_body_key>`.  Do not use `data.params.<key>` or `params.<key>`.
:::



## Troubleshooting Integrations <a href="#troubleshooting" id="troubleshooting"></a>

### Integration Logs <a href="#integration-logs" id="integration-logs"></a>

1. See the **logs section** on the integration page to see what PagerTree has received from your 3rd party tool.
2. **Click any log** to see more details of what was received.

<figure>![integrations logs](<.gitbook/assets/integration-logs.png>)<figcaption><p>Integration Logs</p></figcaption></figure>

<figure>![single integration log](<.gitbook/assets/integration-log.png>)<figcaption><p>A single integration log.</p></figcaption></figure>

If you don't see any logs, check your 3rd Party Configuration. A couple of common issues:

* The endpoint url was not correctly copy & pasted.
* The 3rd party tool does not have access to the internet.
* Internal firewall is blocking traffic.

If the logs aren't showing up, it's because PagerTree never received requests from your tool. If you do see logs, but it is still not behaving as expected, please [check the source](integrations.md#check-the-source).

### Check the Source <a href="#check-the-source" id="check-the-source"></a>

Check the [source code](https://github.com/PagerTree/pager_tree-integrations) for your specific integration to see why it might not be working the way you expect.

Integration adapters can be [found in this folder](https://github.com/PagerTree/pager_tree-integrations/tree/main/app/models/pager_tree/integrations). Specifically you should check the `adapter_action` function. It's normally close to the top of the file and looks like this:

```ruby
def adapter_action
  if _is_create?
    :create
  elsif _is_resolve?
    :resolve
  else
    :other
  end
end

def _is_create?
  _state == "triggered"
end

def _is_resolve?
  _state == "resolved"
end

def _state
  adapter_incoming_request_params.dig("state")
end
```

## Alert Aggregation <a href="#alert-aggregation" id="alert-aggregation"></a>

To reduce noise PagerTree will try to aggregate incoming alerts by `thirdparty_id`. The thirdparty\_id will differ for each integration, see the [source code](https://github.com/PagerTree/pager_tree-integrations/tree/main/app/models/pager_tree/integrations) for your integration to see what the thirdparty\_id consists of.

When a "create" request comes in from a 3rd party system, PagerTree check's to see if there is another alert (from the same integration) with the same thirdparty\_id in the (queued|open|acknowledged|dropped) state. If there is, PagerTree will increment the dedup count on the existing alert. Else, PagerTree will proceed to create the new alert.

Below is pseudo code showing how PagerTree tries to aggregate the alerts.

```ruby
alert = integration.alerts
          .order(created_at: :desc)
          .find_by(thirdparty_id: thirdparty_id)

case action
  when :create
    if alert && (alert.status_queued? || 
        alert.status_open? || 
        alert.status_acknowledged? || 
        alert.status_dropped?)
      # alert already exists, increment dedup count
      alert.dedup_count += 1
    else
      # create a new alert
      alert = Alert.new
    end
  end
  # ...
end
```

Most integrations should handle unique ids for you, but if your integration requires you (ex: webhook integration) or your system (ex: Datadog) to manage the thirdparty\_ids. Make sure the following are true:

1. The 3rd party system is sending the "resolved" message to PagerTree. This will auto "resolve" the alert in PagerTree.
2. Make sure your team is marking the alert as "resolved" in PagerTree. This will allow the system to create a new alert with the same ID.

### Alert Aggregation Example #1 (Simple) <a href="#alert-aggregation-example-1-simple" id="alert-aggregation-example-1-simple"></a>

This example shows how a properly working integration would send information. Sequentially opening and resolving alerts.

1. Integration I1 sends "create" request with thirdparty\_id 123.
2. Alert A1 is created.
3. Integration I1 sends "resolve" request with thirdparty\_id 123.
4. Alert A1 is resolved.
5. Integration I1 sends "create" request with thirdparty\_id 123.
6. A new alert (Alert A2) is created.

### Alert Aggregation Example #2 (Dedup) <a href="#alert-aggregation-example-2-dedup" id="alert-aggregation-example-2-dedup"></a>

This example shows how a noisy integration might send information. Duplicating create events.

1. Integration I1 sends "create" request with thirdparty\_id 123.
2. Alert A1 is created.
3. Integration I1 sends "create" request with thirdparty\_id 123.
4. Existing alert (Alert A1) is found. The existing alert's dedup count is incremented.
5. Integration I1 sends "resolve" request with thirdparty\_id 123.
6. Alert A1 is resolved.
7. Integration I1 sends "create" request with thirdparty\_id 123.
8. A new alert (Alert A2) is created.

### Alert Aggregation Example #3 (Multiple Integrations) <a href="#alert-aggregation-example-3-multiple-integrations" id="alert-aggregation-example-3-multiple-integrations"></a>

This example shows how integrations thirdparty\_id namespace is unique.

1. Integration I1 sends "create" request with thirdparty\_id 123.
2. Alert A1 is created.
3. Integration I2 sends "create" request with thirdparty\_id 123.
4. Alert A2 is created.
5. Integration I1 sends "resolve" request with thirdparty\_id 123.
6. Alert A1 is resolved.
7. Integration I2 continuously sends "create" requests with thirdparty\_id 123.
8. Alert A2 dedup count is incremented until it is resolved by "Integration I2" or manually by a User.

### Alert Aggregation Example #4 (User Intervention) <a href="#alert-aggregation-example-4-user-intervention" id="alert-aggregation-example-4-user-intervention"></a>

This example shows how a user can mark the alert as resolved to reset the deduplication flow.

1. Integration I1 sends "create" request with thirdparty\_id 123.
2. Alert A1 is created.
3. User acknowledges Alert A1.
4. Integration I1 sends "create" request with thirdparty\_id 123.
5. Existing Alert A1 is found. The existing alert's dedup count is incremented.
6. User manually resolves the alert.
7. Alert A1 is resolved.
8. Integration I1 sends "create" request with thirdparty\_id 123.
9. A new alert (Alert A2) is created...
