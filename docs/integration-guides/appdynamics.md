---
description: Connect your AppDynamics actions to PagerTree.
---

# AppDynamics



| Company                                     | Estimated Time | Vendor Docs | Open Source                                                                                                                      |
| ------------------------------------------- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [AppDynamics](https://www.appdynamics.com/) | 30 minutes     |             | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/app\_dynamics/v3.rb) |

## What is AppDynamics?

[AppDynamics](https://www.appdynamics.com/) provides application and database performance management, monitoring, and analytic tools to help you identify and resolve performance issues, drive business outcomes, increase user engagement, and deliver amazing web user experiences.

## How It Works

AppDynamics triggers user defined events by monitoring applications.

* When a monitor event is triggered (`event_type === "trigger"`) in AppDynamics, an alert is created in PagerTree automatically.
* When a monitor event is resolved (`event_type === "resolve"`) in AppDynamics, the alert is resolved in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send alerts from AppDynamics into PagerTree. The estimated time for this integration is 30 minutes. We assume that you already have a PagerTree and AppDynamics account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **AppDynamics logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In AppDynamics**

#### Create an HTTP Request Template

1.  Go to the **Alert & Respond** tab, then **HTTP Request Templates**, then **click “+ New”**

    <figure>![AppDynamics HTTP Request Template](<../.gitbook/assets/image (2) (5).png>)<figcaption><p>New HTTP Request Template</p></figcaption></figure>
2.  In the “Create HTTP Request Template” box

    1. First Section
       1. Name the template appropriately (ex: “PagerTree Integration Template”)
    2. Custom Templating Variables
       1. Add 1 custom templating variable
          1.  **pt\_event\_type** with value **trigger**

              <figure>![AppDynamics Custom Template variable](<../.gitbook/assets/image (1) (2) (4).png>)<figcaption><p>Add the custom template variable</p></figcaption></figure>
    3. Request URL Section
       1. Select **Method** as **POST**
       2. **Paste** the **PagerTree Endpoint URL** you copied for **Raw URL**
       3.  Select **URL Encoding** as **UTF-8**

           <figure>![AppDynamics PagerTree Webhook Configuration](<../.gitbook/assets/image (5) (6).png>)<figcaption><p>AppDynamics PagerTree Webhook Configuration</p></figcaption></figure>
    4. Authentication Section
       1. Select **Type** as **NONE**
    5.  Payload Section

        1. Select **MIME Type** as **application/json**
        2. Select **Payload Encoding** as **UTF-8**
        3. In the text area below Payload encoding, **paste** the below code





```json title="appdynamics_payload.json"
{    
   "incident_key": "${latestEvent.node.name} - ${latestEvent.application.name}",
   "event_type": "${pt_event_type}",
   "description": "${latestEvent.displayName} on ${latestEvent.node.name}",
   "client": "AppDynamics",
   "client_url": "${controllerUrl}",
   "details": {
     "event_name": "${latestEvent.displayName}",
     "summary": "${latestEvent.summaryMessage}",
     "event_id": "${latestEvent.id}",
     "guid": "${latestEvent.guid}",
     "event_time": "${latestEvent.eventTime}",
     "event_type": "${latestEvent.eventType}",
     "event_type_key": "${latestEvent.eventTypeKey}",
     "application_name": "${latestEvent.application.name}",
     "node_name": "${latestEvent.node.name}",
     "message": "${latestEvent.eventMessage}",
     "severity": "${latestEvent.severity}"
   },
   "contexts":[
     {
       "type": "image",
       "src": "${latestEvent.severityImage.deepLink}",
       "alt": "${latestEvent.severity}"
     },
     {
       "type": "link",
       "href": "${latestEvent.deepLink}",
       "text": "View this transaction in AppDynamics"
     }
   ]
}
```

1. Response Handling Criteria Section
   1. Under **Success Criteria**, click **Add Success Criteria**.
      1. Select **200** from the **Status Code** list
      2. **Check Expect Payload checkbox**
      3.  Select **application/json** from the **Content/Type** list

          <figure>![Response Handling Criteria](<../.gitbook/assets/image (18) (4).png>)<figcaption><p>Response Handling Criteria</p></figcaption></figure>
2. Settings Section
   1.  **Check “One Request Per Event”**

       <figure>![AppDynamics settings](<../.gitbook/assets/image (22) (2).png>)<figcaption><p>One Request Per Event</p></figcaption></figure>
   2. Once your template is saved you can test it to make sure an alert is created in PagerTree. Click the **Test** button, then click **Add Event Type** and select an event you want to test (our example uses “Health Rule Violation Started – Warning”, but you can pick any event type), then click **Run Test**. If you executed all steps correctly, PagerTree should have created an alert and notified the team member on-call. If you see that PagerTree did not create an alert, scroll to the very bottom of the **Test Transcript** and check the **Response Payload** for any errors.

#### Create Trigger Action

1.  Click **Actions** on the left menu, select an application or database to create actions for, then click “**+ Create**”

    <figure>![AppDynamics new action](<../.gitbook/assets/image (5) (5).png>)<figcaption><p>Create a new action.</p></figcaption></figure>
2.  Select **Make an HTTP Request** from the list and **click OK**.

    <figure>![Appdynamics HTTP Request action](<../.gitbook/assets/image (21) (1).png>)<figcaption><p>Select the HTTP Request action.</p></figcaption></figure>
3.  Give the action a **Name** (ex: “PagerTree Trigger”) and then **select** the **template** you just created from the list, then click **Save**.

    <figure>![Appdynamics action](<../.gitbook/assets/image (24).png>)<figcaption><p>Name the action.</p></figcaption></figure>

#### Create Resolve Action

1.  Create another action that will be used for resolving alerts. Give the action a **Name** (ex: “PagerTree Resolve”) and select the template you just created again. When the form populates, change the **pt\_event\_type** for this new action to **resolve**, then click **Save**.

    <figure>![appdynamics resolve action](<../.gitbook/assets/image (13) (2).png>)<figcaption><p>Create the "resolve" action.</p></figcaption></figure>

#### Create Trigger Policy

1.  Lastly, we need to add these new actions to your desired policies. Click **Policies** on the left menu, and either **edit or create** a new **policy**.

    <figure>![appdynamics new policy](<../.gitbook/assets/image (19) (4).png>)<figcaption><p>Create a new Policy.</p></figcaption></figure>
2. At the top of the Create Policy dialog box **Name** the policy (ex: “Critical or Warn”).
3.  On the **Trigger Tab**, check the conditions with “**Health Rule Violation Started**” in the name.

    <figure>![Configure the policy triggers](<../.gitbook/assets/image (23).png>)<figcaption><p>Configure the policy triggers</p></figcaption></figure>
4.  On the **Actions Tab**, click the **“+” button** to add an action to execute. **Name** the policy (ex: “Critical or Warn”). **Click** the **Trigger Action** you recently created, and then click Select. In the Create Policy Dialog **click Save**.

    <figure>![AppDynamics policy action](<../.gitbook/assets/image (25).png>)<figcaption><p>Set the policy action.</p></figcaption></figure>

#### Create Resolve Policy

1.  Create another policy that triggers when any conditions with “**Health Rule Violation Ended**” in the name. Assign the **Resolve Action** to this policy.

    <figure>![Create another policy for the resolve action.](<../.gitbook/assets/image (20) (3).png>)<figcaption><p>Create another policy for the resolve action.</p></figcaption></figure>

***

You have successfully completed the AppDynamics Integration.

***
