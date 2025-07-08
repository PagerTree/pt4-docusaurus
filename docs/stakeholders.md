# Stakeholders

## What is a Stakeholder?

Stakeholders are groups of account users and email address who have "interest" in alerts, but might not necessarily need to be in an on-call rotation. Stakeholders are "attached" to alerts.

## Subscribers

| Object        | Description                                                                                                | Applicable Notification Channels |
| ------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Account Users | Any account user in your account. Useful if the stakeholder wants notifications on channels besides email. | push, email, sms, slack          |
| Email         | Useful for distributions groups or emails of persons that are not part of your PagerTree account.          | email                            |

### Interested Events

Stakeholders subscribe to a set of "interested events". Based on which events the stakeholder group is subscribed to determines when the stakeholder group will be notified of the alert it has been attached to.

| Event Name         | Description                                            |
| ------------------ | ------------------------------------------------------ |
| alert.assigned     | When an alert is assigned to a team.                   |
| alert.acknowledged | When an alert is acknowledged by an account user.      |
| alert.resolved     | When an alert is resolved by a user or an integration. |
| alert.dropped      | When an alert status is changed to dropped.            |

## Attaching Stakeholders to an Alert

### Manually via the alert form

Stakeholders can be manually attached to an alert via the alert form.

1. Navigate to the alert form.
2.  Click the **Show advanced options** button.&#x20;

    <figure>![show advanced options button](<.gitbook/assets/alert-show-advanced-options.png>)<figcaption><p>Show Advanced Options Button</p></figcaption></figure>
3.  You can now **select** the **stakeholders** to attach to this alert.&#x20;

    <figure>![stakeholders](<.gitbook/assets/alert-stakeholder-options.png>)<figcaption><p>Select the stakeholders to attach to the alert.</p></figcaption></figure>

### Attached via Teams

Stakeholders can be attached to all alerts sent to a team. Add the stakeholders to a team via the stakeholder or team form.

<figure>![assign alerts ](<.gitbook/assets/stakeholder-observed-teams.png>)<figcaption><p>Attach stakeholders to all alerts assigned to a team.</p></figcaption></figure>

### Attached via Routers

Stakeholders can be attached to alerts matching conditions using the stakeholder router action. Please see the router documentation for full details.
