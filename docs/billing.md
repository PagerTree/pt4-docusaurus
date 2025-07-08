---
description: PagerTree partners with Stripe to support simplified billing.
---

# Billing

## How Billing Works

* PagerTree charges per user per interval (monthly or yearly) basis.
* The account is charged based on the number of [users](users.md).
* All billing is prorated, and you only pay for the time the user is in your account.
* Billing administrators can manage billing via the [Stripe Billing portal](https://app.pagertree.com/billing).
* [Notification credits](billing.md#notification-limits) are reset monthly (on renewal for monthly subscriptions and the 1st of every month for annual subscriptions).

### Accepted Payment Methods

* US Bank Transfer
* All Major Credit Cards
* Wire Transfer (including SWIFT)

### Discounts

* We only offer discounts for annual commitments.
* The annual commitment discount is a flat 2 months free off list price.
* We do not offer any other discounts (this includes non-profit).

## User Limits

By default, we do not cap the number of [users](users.md) in your account (unless on a pricing plan with user limits).

If you would like to set a cap on the number of users that can be added to your account (to protect from unexpected bills):

1. Navigate to the [Account Settings page](https://app.pagertree.com/account/settings)
2. Scroll to the section titled "General"
3. In the **user limit field**, input the _maximum_ amount of users you would like to allow in your account.
4. **Click Update**

After setting a maximum number of users for your account, PagerTree will prevent new users being added or invited to this account if the user count would exceed the configured amount.

<figure>![account user limit option](<.gitbook/assets/user-limits.png>)<figcaption><p>Account User Limit Option</p></figcaption></figure>

## Notification Limits

**You shouldn't have to worry about notification limits if your users are primarily in the US and Canada.**

SMS and Voice Notifications can be terribly expensive in some parts of the world. In order to keep our prices low and pass the savings on to you, we impose fair usage limits. Please see the [FAQ on notification limits](https://pagertree.com/notification-limits/) and how to calculate them.

:::info
Hint: If your country has high costs of SMS, consider using WhatsApp messages as an alternative.
:::

### Auto Recharge

Auto Recharge is functionality to top up your notification credits in-case your account operates in a high notification cost country. By default the auto-recharge functionality is disabled. Auto recharge is an opt-in feature.

To enable auto recharge:

1. Navigate to the [Account Settings page](https://app.pagertree.com/account/settings)
2. Scroll to the Section titled "Auto Recharge"
3. **Check** the checkbox on the left of Auto Recharge
   * _Auto Recharge Threshold_ - We will charge your primary payment method on file when your credit amount drops below this amount. (Setting this to 0 could mean some notifications are not sent if there is a problem or delay charging your payment method. We recommend setting this at least $1.00)
   * _Auto Recharge Amount_ - We will charge this amount to your primary payment method on file (minimum $10.00).
4. **Click Update**.

<figure>![auto recharge option](<.gitbook/assets/auto-recharge.png>)<figcaption><p>Auto Recharge Option</p></figcaption></figure>

You can always disable the auto recharge functionality. If you have questions as to what's being charged to your account, please see the [Credit Line Items page](https://app.pagertree.com/credit\_line\_items?direction=desc\&sort=created\_at).

## Billing FAQ

| Question                                                     | Answer                                                                                   |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Can you extend my trial?                                     | Yes, please reach out to our [support team](mailto:support@pagertree.com).               |
| Can I get an estimate?                                       | Yes, but you you must have already started a free trial with intent to purchase.         |
| Do you charge for users who go on-call?                      | We charge for the total number of users in your account, whether or not they go on-call. |
| Can I get a discount because my users aren't always on-call? | No. See previous question.                                                               |

## Billing Examples

Below you will find some very simplified billing examples. All proration is handled by Stripe. PagerTree does not calculate the proration, we only report to Stripe how many users you have in your account after you add or delete a user.

### Billing Example #1 (Simple)

* You have 10 users in your account
* You are subscribed to a plan that costs ($15/user/month)

Grand Total = 10 users x $15 user/month = **$150.00 / month**

### Billing Example #2 (Prorated, Scale Up)

* You have 10 users in your account
* You are subscribed to a plan that costs ($15/user/month)
* You **add** 5 users in the middle of your billing cycle, bringing the total user count to 15 users.

Grand Total = (10 users x $15 user/month x 0.5) + (5 user x $15 user/month x 0.5) = $150/month + $37.50/month = **$187.50 / month**

### Billing Example #3 (Prorated, Scale Down)

* You have 10 users in your account
* You are subscribed to a plan that costs ($15/user/month)
* You **remove** 5 users in the middle of your billing cycle, bringing the total user count to 5 users.

Grand Total = (5 users x $15 user/month x 0.5) + (5 user x $15 user/month x 0.5) = $75/month + $37.50/month = **$112.50 / month**

### Billing Example #4 (Prorated, Upgrade Plan)

* You have 10 users in your account
* You are subscribed to a plan that costs ($15/user/month)
* You **upgrade** your plan in the middle of the month to a plan that costs ($20/user/month)

Grand Total = (10 users x $15 user/month x 0.5) + (10 user x $20 user/month x 0.5) = $75/month + $100/month = **$175.00 / month**

### Billing Example #5 (Prorated, Downgrade Plan)

* You have 10 users in your account
* You are subscribed to a plan that costs ($15/user/month)
* You **downgrade** your plan in the middle of the month to a plan that costs ($10/user/month)

Grand Total = (10 users x $15 user/month x 0.5) + (10 user x $10 user/month x 0.5) = $75/month + $50/month = **$125.00 / month**

### Billing Example #6 (Annual)

* You have 10 users in your account
* You are subscribed to a plan that costs ($150/user/year)

Grand Total = (10 users x $150 user/year) = **$1,500 / year**

### Billing Example #7 (Annual, Prorated, Scale Up)

* You have 10 users in your account
* You are subscribed to a plan that costs ($150/user/year)
* You **add** 10 users in the middle of your annual billing cycle, bringing the total user count to 20 users.

| Month | Charge  | Description                                               |
| ----- | ------- | --------------------------------------------------------- |
| 0     | $ 1,500 | 10 users x $150/user/year                                 |
| 6     | $ 750   | You add 10 users. 10 users x $150/user/year x 0.5 year    |
| 11    | $ 3,000 | Renewal for 20 users. 20 users x $150/user/year x 1 year. |

### Billing Example #8 (Annual, Prorated, Scale Down)

* You have 10 users in your account
* You are subscribed to a plan that costs ($150/user/year).
* You **remove** 5 users in the middle of your annual billing cycle, bringing the total user count to 5 users.

| Month | Charge         | Description                                                            |
| ----- | -------------- | ---------------------------------------------------------------------- |
| 0     | $1,500         | 10 users x $150/user/year                                              |
| 6     | ($375, credit) | You remove 5 users. 5 users x $150/user/year x 0.5 year x -1           |
| 11    | $375           | Renewal for 5 users. 5 users x $150/user/year x 1 year - $375, credit. |
