---
description: Connect your SolarWinds alerts to PagerTree.
---

# SolarWinds

| Company                                                  | Estimated Time | Vendor Docs                                                                                                                                                                                 | Open Source                                                                                                                     |
| -------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [SolarWinds Worldwide, LLC](https://www.solarwinds.com/) | 10 minutes     | [view](https://support.solarwinds.com/Success\_Center/Orion\_Platform/Orion\_Documentation/Orion\_Platform\_Administrator\_Guide/Available\_alert\_actions/Send\_a\_GET\_or\_POST\_request) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/solar\_winds/v3.rb) |

## What is SolarWinds?

[SolarWinds](https://www.solarwinds.com/) gives you the tools to monitor your applications and environment through a single web console.

## How It Works

SolarWinds triggers user defined alerts when (configured) network events occur.

* When an alert in SolarWinds is `triggered`, an alert is created in PagerTree automatically.
* When an alert in SolarWinds is `reset`, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from SolarWinds into PagerTree. The estimated time for this integration is 10 minutes. We assume that you already have a PagerTree account and SolarWinds installation setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **SolarWinds logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### In SolarWinds

1. Navigate to **Alerts & Activity -> Alerts**.
2. In the upper right hand corner, click the **Manage Alerts** button to go to the Alert Manager.
3. In Alert Manager click **Add New Alert**.
4. In the Add New Alert Wizard
   1. Properties
      1. Name of the alert definition - An appropriate name (e.g. High CPU)
      2. Choose the severity of the alert. (PagerTree automatically maps the SolarWinds severity to the PagerTree urgency)
      3.  Click **Next**

          <figure>![SolarWinds Alert Properties](<../.gitbook/assets/image (3) (4).png>)<figcaption><p>SolarWinds Alert Properties</p></figcaption></figure>
   2. Trigger Condition
      1. Select conditions that will trigger an alert (create an alert)
      2.  Click **Next**

          <figure>![SolarWinds Trigger Condition](<../.gitbook/assets/image (40).png>)<figcaption><p>SolarWinds Trigger Condition</p></figcaption></figure>
   3. Reset Condition
      1. Select conditions that will reset and alert (resolve and alert)
      2.  Click **Next**

          <figure>![SolarWinds Reset Condition](<../.gitbook/assets/image (39).png>)<figcaption><p>SolarWinds Reset Condition</p></figcaption></figure>
   4. Time of Day
      1. Select time of day conditions (if only applicable during certain times)
      2.  Click **Next**

          <figure>![Solarwinds Time of Day](<../.gitbook/assets/image (10) (4).png>)<figcaption><p>Solarwinds Time of Day</p></figcaption></figure>
   5. Trigger Action
      1. Message - Create an appropriate message (this will be displayed in the `title` of the alert created in PagerTree)
      2. Trigger Actions
         1. Click **Add Action**
         2.  Select the **Send a GET or POST Request to a Web Server** option, then click **Configure Action**.



             <figure>![](<../.gitbook/assets/image (7) (2) (2).png>)<figcaption></figcaption></figure>

             1. Name of action - An appropriate name (e.g. PagerTree Trigger Action)
             2. Under HTTP request settings:
                1. **Paste** the **PagerTree Endpoint URL** you copied for the **URL**
                2. Select **Use HTTP/S POST**
                3. Body to POST - copy and paste the [solarwinds\_action\_payload (below)](solarwinds.md#solarwinds-action-payload)
                4.  Click **Add Action**

                    <figure>![Solarwinds PagerTree HTTP/S action configuration.](<../.gitbook/assets/image (42).png>)<figcaption><p>Solarwinds PagerTree HTTP/S action configuration.</p></figcaption></figure>
             3.  Click **Next**

                 <figure>![Solarwinds PagerTree HTTP/S action configuration.](<../.gitbook/assets/image (2) (1) (1) (1) (3).png>)<figcaption></figcaption></figure>
         3. Reset Action
            1. Click **Add Action**
            2. Select the **Send a GET or POST Request to a Web Server** option, then click **Configure Action**.
               1. Name of action - An appropriate name (e.g. PagerTree Reset Action)
               2. Under HTTP request settings:
                  1. **Paste** the **PagerTree Endpoint URL** you copied for the **URL**
                  2. Select **Use HTTP/S POST**
                  3. Body to POST - copy and paste the [solarwinds\_reset\_payload (below)](solarwinds.md#solarwinds-reset-payload)
                  4.  Click **Add Action**

                      <figure>![Solarwinds PagerTree Reset Action](<../.gitbook/assets/image (38).png>)<figcaption><p>Solarwinds PagerTree Reset Action</p></figcaption></figure>
               3. Click **Next**
               4. Summary
                  1.  Review all configuration details and if correct, click **Submit**

                      <figure>![Review alert configuration](<../.gitbook/assets/image (41).png>)<figcaption><p>Review alert configuration</p></figcaption></figure>

You have successfully completed the SolarWinds Integration.

#### SolarWinds Action Payload

```text title="solarwinds_action_payload.url"

ActionType=Create&NodeName=${NodeName}&AlertID=${N=Alerting;M=AlertID}&AlertMessage=${N=Alerting;M=AlertMessage}&AlertDescription=${N=Alerting;M=AlertDescription}&AlertDetailsUrl=${N=Alerting;M=AlertDetailsUrl}&AcknowledgeUrl=${N=Alerting;M=AcknowledgeUrl}&AlertTriggerCount=${N=Alerting;M=AlertTriggerCount}&AlertTriggerTime=${N=Alerting;M=AlertTriggerTime;F=DateTime}&Severity=${N=Alerting;M=Severity}
```

If you prefer JSON, make sure to set the Content-Type to "application/json" and use this body payload instead:

```json title="solarwinds_action_payload.json" showLineNumbers
{
    "ActionType": "Create",
    "NodeName": "${NodeName}",
    "AlertID": "${N=Alerting;M=AlertID}",
    "AlertMessage": "${N=Alerting;M=AlertMessage}",
    "AlertDescription": "${N=Alerting;M=AlertDescription}",
    "AlertDetailsUrl": "${N=Alerting;M=AlertDetailsUrl}",
    "AcknowledgeUrl": "${N=Alerting;M=AcknowledgeUrl}",
    "AlertTriggerCount": "${N=Alerting;M=AlertTriggerCount}",
    "AlertTriggerTime": "${N=Alerting;M=AlertTriggerTime;F=DateTime}",
    "Severity": "${N=Alerting;M=Severity}"
}
```

#### SolarWinds Reset Payload

```text title="solarwinds_reset_payload.url"
ActionType=Resolve&AlertID=${N=Alerting;M=AlertID}
```

If you prefer JSON, make sure to set the Content-Type to "application/json" and use this body payload instead:

```json
{
    "ActionType": "Resolve",
    "AlertID": "${N=Alerting;M=AlertID}"
}
```

## Troubleshooting

If you don't see integration logs being generated on the PagerTree side, check the SolarWind log files. Customers with self-managed instances have reported the following types of errors:

* Invalid Root Certificates (TLS)

***
