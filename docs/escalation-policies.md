# Escalation Policies

## What is an Escalation Policy?

A team's escalation policy defines the time each [escalation layer](escalation-policies.md#escalation-layers) will have (timeouts) to either [acknowledge](alerts.md#acknowledge) or [reject](alerts.md#reject) an alert.

<figure>![Escalation policy](<.gitbook/assets/escalation-policy.png>)<figcaption><p>A team's escalation policy.</p></figcaption></figure>

* If an [account user](users.md) acknowledges the alert (or the alert is auto resolved by an [integration](integrations.md)), no further escalation layers will be notified.
* If all users reject an alert or the timeout elapses it will be escalated to the next layer.
* When there are no more layers, PagerTree will
  1. check to see if there is a [repeat option](escalation-policies.md#repeat-option) defined
  2. check to see if there is a [reassign option](escalation-policies.md#reassign-option) defined
  3. If no repeat or reassign options have been exhausted, the alert will enter the [`dropped` state](alerts.md#alert-states).

**Note**: All repeat cycles will be performed before attempting to reassign the alert.

### Escalation Layers

* An escalation policy can have 1..n escalation layers.
* Each escalation layer has configurable timeout associated with it.

### Repeat Option

* If an alert has been escalated through all layers, PagerTree will check to see if a repeat should be performed.
* An alert can repeat an escalation policy between 0-3 times.
* If a repeat of 1-3 is defined, the alert will repeat the escalation layers starting at layer 1.

:::info
If a repeat is defined, the alert will move through the escalation N + 1 times. First, for the initial escalation policy, plus the number of repeats defined.
:::

### Reassign Option

* If an alert has been escalated through all layers and all repeats, PagerTree will check for the reassign option.
* If the reassign option is defined, the alert will be sent to the reassign destination. The alert will then flow through the reassign destinations workflow.

### Edit Escalation Policy

To edit an escalation policy for a team:

1.  Click the **Edit** button.&#x20;

    <figure>![edit escalation policy button](<.gitbook/assets/edit-escalation-policy-button.png>)<figcaption><p>Edit Escalation Policy Button</p></figcaption></figure>
2.  Modify the escalation policy as needed.&#x20;

    <figure>![edit escalation policy forms](<.gitbook/assets/edit-escalation-policy-form.png>)<figcaption><p>Edit Escalation Policy Form</p></figcaption></figure>
3. Click **Update**.

## Examples

Alice, Bob, and Charlie are currently on-call for their team (Devops Team). Below is the definition of who is on-call for what layer, and the respective layer timeouts.

Devops Team Current On-Call Schedule and Escalation Policy:

* Layer 1 - 5m - Alice
* Layer 2 - 10m - Bob
* Layer 3 - 15m - Charlie
* Repeat 0x
* Reassign Destinations - None

### Example 1 (Acknowledge)

* \[minute 0] - The alert is routed to the team. Alice is notified of the alert.
* \[minute 1] - Alice acknowledges the alert. The workflow stops and no other layers are notified.

### Example 2 (Reject)

* \[minute 0] - The alert is routed to the team. Alice is notified of the alert.
* \[minute 1] - Alice rejects the alert. The alert is escalated to layer 2. Bob is notified of the alert.
* \[minute 2] - Bob acknowledges the alert. The workflow stops and no other layers are notified.

### Example 3 (Timeout)

* \[minute 0] - The alert is routed to the team. Alice is notified of the alert.
* \[minute 5] - Alice never responds to the alert. The alert times out of layer 1 and is escalated to layer 2. Bob is notified of the alert.
* \[minute 7] - Bob acknowledges the alert. The workflow stops and no other layers are notified.

### Example 4 (Drop)

* \[minute 0] - The alert is routed to the team. Alice is notified of the alert.
* \[minute 5] - Alice never responds to the alert. The alert times out of layer 1 and is escalated to layer 2. Bob is notified of the alert.
* \[minute 15] - Bob never responds to the alert. The alert times out of layer 2 and is escalated to layer 3. Charlie is notified of the alert.
* \[minute 30] - Charlie never responds to the alert. The alert times out of layer 3 and is escalated. Since, there are no more layers, and a repeat of 0x is defined, the alert status is changed to dropped.

### Example 5 (No one on-call)

* \[minute 0] - No one is on-call. The alert status is changed to dropped.

### Example 6 (Repeat)

The follow example uses the above definition, with the exception that the Repeat is set to 1x.

* \[minute 0] - The alert is routed to the team. Alice is notified of the alert.
* \[minute 5] - Alice never responds to the alert. The alert times out of layer 1 and is escalated to layer 2. Bob is notified of the alert.
* \[minute 15] - Bob never responds to the alert. The alert times out of layer 2 is escalated to layer 3. Charlie is notified of the alert.
* \[minute 30] - Charlie never responds to the alert. The alert times out of layer 3 is escalated. Since, there are no more layers, and a repeat of 1x is defined, the alert is escalated to layer 1. Alice is notified of the alert.
* \[minute 31] - Alice acknowledges the alert. The workflow stops and no other layers are notified.

### Example 7 (Reassign)

The follow example uses the above definition, with the exception that the Reassign Destination is set to Executive Team.

* \[minute 0] - The alert is routed to the team. Alice is notified of the alert.
* \[minute 5] - Alice never responds to the alert. The alert times out of layer 1 and is escalated to layer 2. Bob is notified of the alert.
* \[minute 15] - Bob never responds to the alert. The alert times out of layer 2 and is escalated to layer 3. Charlie is notified of the alert.
* \[minute 30] - Charlie never responds to the alert. The alert times out of layer 3 and is escalated. Since, there are no more layers, and a repeat of 0x is defined, the alert is reassigned to the Executive Team. The alert will then notify users based on the Executive Team's schedule and escalation policy.
