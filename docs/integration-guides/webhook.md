---
description: >-
  Connect your custom webhooks to PagerTree using our Webhook integration.
  Connects with most devops and monitoring tools.
---

# Webhook

| Company       | Estimated Time | Vendor Docs | Open Source                                                                                                                |
| ------------- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| PagerTree LLC | 10 minutes     |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/webhook/v3.rb) |

## What is the Webhook Integration?

Webhooks are user defined HTTP callbacks. They are usually triggered by some event, and when that event occurs, the source site makes an HTTP request to the URI configured for the webhook.

If your tool is not listed on our integrations page, the webhook integration is a great choice to use as an integration point since most tools support sending webhooks for alerts and alarms.

:::info
This documentation is meant for webhooks that are _incoming_ into PagerTree. If you are looking for outgoing webhooks, please refer to the [outgoing webhook documentation](outgoing-webhook.md).
:::

## How It Works

Webhooks are versatile user-defined callbacks that many applications support.

* When the payload event\_type is create (`event_type === "create"`), an alert is created in PagerTree automatically.
* When the payload event\_type is acknowledge (`event_type === "acknowledge"`), an alert is acknowledged in PagerTree automatically.
* When the payload event\_type is resolved (`event_type === "resolve"`), the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send a Webhook into PagerTree. The estimated time for this integration is 10 minutes. We assume that you already have a PagerTree account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Webhook logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url).

### In Other Application - Configure the Webhook

The calling application must send a **POST** request with a **Content-Type: application/json**. The body of the request should have the following values.

| Field       | Type         | Valid Values                 |
| ----------- | ------------ | ---------------------------- |
| event\_type | string       | create\|acknowledge\|resolve |
| Id          | string       | a unique id                  |
| Title       | string       | (non-empty)                  |
| Description | string       | (non-empty)                  |
| Tags        | string array | (optional)                   |
| Meta        | map          | (optional)                   |

#### Example Request # 1

```
POST /integration/int_ODCWagoG9 HTTP/1.1
Host: api.pagertree.com
Content-Type: application/json

{
	"event_type": "create",
	"Id": "example-id-123",
	"Title": "Example Incident Title",
	"Description": "Example Incident Description"
}
```

#### Example Request #2

```
POST /integration/int_ODCWagoG9 HTTP/1.1
Host: api.pagertree.com
Content-Type: application/json

{
	"event_type": "create",
	"Id": "example-id-123",
	"Title": "Example Incident Title",
	"Description": "Example Incident Description",
	"Tags": [
		"a",
		"b",
		"c"
	],
	"Meta": {
		"incident": true,
		"incident_severity": "SEV-1",
		"incident_message": "Please join conference bridge 1-800-123-4567"
	}
}
```

You have successfully completed the Webhook Integration.

## Integration Options

| Option                  | Description                                                                                                                  | Default |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- |
| Token                   | The token can be used to authenticate request. Must be passed in by requesting clients in the `pagertree-token` HTTP header. |         |
| Capture Additional Data | Should PagerTree capture and display other data sent?                                                                        | False   |
