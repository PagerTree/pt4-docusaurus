---
description: >-
  Route incoming phone calls to the right person with the on-call schedules and
  escalation policies you already use. Add real-time conversations to your
  support workflow!
---

# Live Call Routing

| Company                                 | Estimated Time | Vendor Docs                          | Open Source                                                                                                                               |
| --------------------------------------- | -------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [Twilio, Inc.](https://www.twilio.com/) | 7 minutes      | [view](https://www.twilio.com/docs/) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/live_call_routing/twilio/v3.rb) |

<figure>![PagerTree Live Call Routing](<../../.gitbook/assets/image (18) (1) (1).png>)<figcaption><p>Twilio Live Call Routing</p></figcaption></figure>

## What is Twilio Live Call Routing Integration?

[Twilio](https://www.twilio.com/) is a cloud communications platform for building SMS, Voice & Messaging applications on an API built for global scale.

With Twilio [Live Call Routing](https://pagertree.com/features/live-call-routing/), PagerTree users can:

* Purchase and manage global phone numbers using [Twilio](https://www.twilio.com/).
* Route incoming phone calls to PagerTree [teams](../../teams.md) with on-call [schedules](../../schedules.md) and [escalation layers](../../escalation-policies.md#escalation-layers).
* Have the caller leave a voicemail if for some reason the on-call can’t answer.
* Customize “hold music” and “voicemail message”.

Additionally, live call routing can be configured to route to multiple teams. When configured to route to multiple teams, callers will be presented with team options. For example: “Press 1 for Devops, Press 2 for Network Operations, Press 3 for Security”.

## How It Works

Twilio users can route incoming phone calls to on-call customer support.

* When a new call comes in from Twilio, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to route an incoming phone call from Twilio into PagerTree. The estimated time for this integration is 7 minutes. We assume that you already have a PagerTree and Twilio account setup.

### In Twilio - Create API Credentials

1. Open a text editor, as we’ll need to copy several pieces of data.
2.  In the top right menu bar, **navigate to Account -> Keys & Credentials -> API Keys & tokens**.

    <figure>![Twilio API](<../../.gitbook/assets/image (11) (1) (1) (1).png>)<figcaption><p>Click API keys &#x26; tokens</p></figcaption></figure>
3.  Ensure the **United States (US1) Region is selected** and **click Create API key** button. _(Other regions can be used, but you must make sure that the configured routing regions for the phone number, API Key and Secret, and PagerTree API region all match)._

    <figure>![Twilio Create API](<../../.gitbook/assets/image (7) (1) (1).png>)<figcaption><p>Ensure the United States (US1) Region is selected and click Create API key button.</p></figcaption></figure>
4. Give your key the following:
   1. Friendly name - Something you will easily remember
   2. Region - This must be United States (US1)
   3.  Key type - Standard

       <figure>![Twilio Create API](<../../.gitbook/assets/image (7) (2) (1).png>)<figcaption><p>When you create the API Key, make sure you've set all the correct settings.</p></figcaption></figure>
5. **Copy the SID and Secret** to your text editor.
6.  Check the "Got it! I have saved my API..." and click Done.

    <figure>![Twilio Copy Secret Key](<../../.gitbook/assets/image (3) (1) (1) (1) (1).png>)<figcaption><p>Copy the Twilio API Key SID and Secret</p></figcaption></figure>
7.  Your text editor should now have the API Key SID and Secret.

    <figure>![Notepad](<../../.gitbook/assets/image (1) (1) (1) (1) (1).png>)<figcaption><p>Text editor with our API Key SID and Secret</p></figcaption></figure>

#### Find the Twilio Account SID

:::warning
Please note the _**API Key SID is different from the Account SID**_, so do not get them confused.
:::

1.  From the [Twilio dashboard](https://console.twilio.com/), under account info, **copy the Account SID.** (It should begin with "AC")

    <figure>![Twilio Dashbaord](<../../.gitbook/assets/image (19) (1) (1).png>)<figcaption><p>Copy the Twilio Account SID</p></figcaption></figure>
2. Your text editor should now have:
   1. API Key SID and Secret
   2.  Account SID

       <figure>![](<../../.gitbook/assets/image (5) (1) (1) (1) (1).png>)<figcaption></figcaption></figure>

### In PagerTree - Create the Integration

1. [Create the integration](../introduction.md#create-an-integration) by clicking the **Twilio Live Call Routing logo**.
2. In the Options section, edit each option accordingly
   1. **Paste** the API Key **SID** you copied earlier to the **Twilio API Key** field. (Should start with "SK")
   2. **Paste** the API **Secret** you copied earlier to the **Twilio API Secret** field.
   3.  **Paste** the **Account SID** you copied earlier to the **Twilio Account SID** field. (Should start with "AC")

       <figure>![Twilio Live Call Routing](<../../.gitbook/assets/image (15) (1).png>)<figcaption><p>Your Twilio live call routing integration should look like the above.</p></figcaption></figure>
3. **Click “Create”**
4. [Copy the Endpoint URL](../introduction.md#copy-the-endpoint-url)**.**

### In Twilio - Configure a Phone Number

1. If you haven’t already, [upgrade to a paid Twilio account](https://support.twilio.com/hc/en-us/articles/223183208-Upgrading-to-a-paid-Twilio-Account).
2. If you haven’t already, [buy a phone number](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console).
3.  Navigate to your purchased number **Develop -> Phone Numbers -> Manage -> Active Numbers**.

    <figure>![Twilio active number](<../../.gitbook/assets/image (9) (1) (1).png>)<figcaption></figcaption></figure>
4. Select the phone number that will be used for Live Call Routing.
5. On the Phone Number **Configure** Tab, under **Voice & Fax -> A Call Comes In**
   1. **Paste** the **PagerTree Endpoint URL** you copied earlier
   2. Ensure the type is **Webhook**
   3. Ensure the action is **HTTP POST**
   4.  Click **Save**

       <figure>![Twilio Configure](<../../.gitbook/assets/image (14) (1) (1).png>)<figcaption><p>Configure the Twilio phone number to send incoming calls to PagerTree.</p></figcaption></figure>

You have successfully completed the Twilio (Live Call Routing) Integration.

## Prompt the caller for a team selection

You can set the destinations of the Live Call Routing integration to be multiple teams. When this is done, the caller will be prompted to select the team they wish to connect to. The team name will be used when reading the presentable options. Team names will be read in alphabetical order.

> Push 1 for Customer Support. Push 2 for DevOps - api.pagertree.com.

<figure>![Twilio destinations](<../../.gitbook/assets/image (16) (1) (1) (1).png>)<figcaption><p>Set the destinations to multiple teams to prompt the user for a selection.</p></figcaption></figure>

## Integration Options

| Option                             | Description                                                                                                                                                              | Default                                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Welcome Recording                  | A recording that will be played first to caller (ex: "Hello, you have reached the Devop's on-call support line.")                                                        |                                                                                                                    |
| Before Wait Music Recording        | A recording to be played before wait music music.                                                                                                                        | [Please Wait](https://app.pagertree.com/audios/please-wait.mp3)                                                    |
| Wait Music Recording               | A recording or wait music to be played while the caller waits for someone to acknowledge the alert.                                                                      | [Old Dog Endless Goodbye](http://com.twilio.sounds.music.s3.amazonaws.com/oldDog_-_endless_goodbye_\(instr.\).mp3) |
| Before Connect Recording           | A recording played before connecting the caller to the acknowledger.                                                                                                     | [You are now being connected](https://app.pagertree.com/audios/you-are-now-being-connected.mp3)                    |
| Voicemail                          | Record a voicemail when no one acknowledges the call [(see Configure Twilio Media Access)](live-call-routing.md#configure-twilio-media-access)?                          | False                                                                                                              |
| Voicemail Greeting Recording       | A recording to be played when no one answers.                                                                                                                            | [No answer](https://app.pagertree.com/audios/no-answer.mp3)                                                        |
| After Voicemail Greeting Recording | A recording played after the caller leaves a voicemail.                                                                                                                  | [Thanks for your message](https://app.pagertree.com/audios/thanks-for-message.mp3)                                 |
| Voicemail Emails                   | A list of emails to send a notification to when the caller leaves a voicemail [(see Configure Twilio Media Access)](live-call-routing.md#configure-twilio-media-access). |                                                                                                                    |
| Force Caller Input                 | Should PagerTree force caller input even if there is only one team assigned as a destination?                                                                            | False                                                                                                              |
| API Region                         | Should PagerTree use a specific Twilio region? If so, API Key + Secret and configured routing region (Twilio phone number) must match.                                   | US1 (Ashburn)                                                                                                      |
| Banned Phones                      | List of phone number in [E.164 Format](https://www.twilio.com/docs/glossary/what-e164) to block from calling this number.                                                |                                                                                                                    |

## Configure Twilio Media Access

If you elect to enable the voicemail option, you will likely want to disable authentication for media access in Twilio. By doing so, users can access the voicemail recording without logging in to Twilio.

To disable HTTP Basic Authentication for media access in Twilio:

1. Navigate to **Develop -> Voice -> Settings -> General**.
2.  Under the HTTP Basic Authentication for media access section, select **Disabled**.

    <figure>![In Twilio, select disabled for HTTP Basic Authentication for Media Access](<../../.gitbook/assets/image (68).png>)<figcaption><p>In Twilio, select disabled for HTTP Basic Authentication for Media Access</p></figcaption></figure>
3. Scroll to the bottom of the page and click **Save**.

## Special uses with routers

The Twilio Live Call Routing can be used with \***limited\*** [router](../../routers.md) functionality for dynamic selection of teams to be present to the caller.

* When using this configuration, set the destinations of the integration to be only the router.
* You can only use the [assign](../../routers.md#assign) action.
* Team options will be read out in the order they are assigned (not alpha order)

#### Example - Time of day router to present different teams to the caller

```yaml
---
rules:
  - match:
      $timeBetween:
          timeformat: 'hh:mm a'
          timezone: 'America/New_York'
          starttime: '12:00 pm'
          endtime: '12:00 am'
    actions:
    - type: assign
      receiver: tem_aaaaa # Team A
    - type: assign
      receiver: tem_bbbbb # Team B
      
  - match:
      $timeBetween:
          timeformat: 'hh:mm a'
          timezone: 'America/New_York'
          starttime: '12:00 am'
          endtime: '12:00 pm'
    actions:
    - type: assign
      receiver: tem_ccccc # Team C
    - type: assign
      receiver: tem_ddddd # Team D
```
