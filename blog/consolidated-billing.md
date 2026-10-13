---
date: 2026-10-13
authors: pagertree
description: "Consolidated billing lets multiple PagerTree accounts share one subscription, one invoice, and one payment method. Each person is billed once, no matter how many of your accounts they belong to."
keywords: ["pagertree consolidated billing", "unified billing", "multiple on-call accounts one invoice", "department billing", "on-call management enterprise billing", "incident management multiple accounts"]
---

# 📣 Consolidated Billing - One Invoice for All of Your PagerTree Accounts

Today we're launching **consolidated billing** for PagerTree. If your organization runs more than one PagerTree account, for separate departments, business units, subsidiaries, or customers, you can now pay for all of them with **one subscription, one invoice, and one payment method**.

Even better, **each person is only billed once**. If an engineer belongs to three of your accounts, they count as one seat, not three.

Consolidated billing is available on our [Enterprise plan](https://pagertree.com/pricing/?utm_source=blog&utm_medium=link&utm_campaign=consolidated_billing). To set it up, reach out to our [support team](mailto:support@pagertree.com).

<!-- truncate -->

---

## Why Separate Accounts?

Larger organizations rarely run on-call as a single team. IT, Facilities, Security, and Engineering each have their own alerts, schedules, escalation policies, and admins, and they usually don't want to see each other's incidents.

Separate PagerTree accounts are the cleanest way to keep those groups apart. Each account gets its own:

- [Teams](https://pagertree.com/docs/teams), [schedules](https://pagertree.com/docs/schedules), and [escalation policies](https://pagertree.com/docs/escalation-policies)
- [Integrations](https://pagertree.com/docs/integrations) and [alerts](https://pagertree.com/docs/alerts)
- Users, roles, and account administrators
- Account settings

Until now, the downside was billing. Every account needed its own subscription and its own credit card, and finance received a separate invoice for each one. If someone belonged to more than one account, you paid for them more than once.

Consolidated billing fixes that without giving up any of the isolation.

---

## How Consolidated Billing Works

One account is designated as the **billing account**. Your other accounts are **linked** to it.

- **One subscription** - Linked accounts share the billing account's plan, so every account in the group gets the same features.
- **One invoice and payment method** - All charges go to the billing account's Stripe customer. Finance gets one bill.
- **Billed once per person** - Seats are counted as the number of *distinct* users across all of the accounts in the group.
- **Separate everything else** - Each account still has its own data, users, and admins. Linking accounts for billing doesn't share anything else between them.

### Billing Example

Say your organization has three PagerTree accounts on a $15/user/month plan:

| Account     | Users |
| ----------- | ----- |
| IT          | 10    |
| Facilities  | 6     |
| Security    | 5     |

Four people (for example, your IT managers) belong to both IT and Security.

**Before (three separate subscriptions):** 10 + 6 + 5 = 21 seats x $15 = **$315 / month**, across three invoices.

**With consolidated billing:** 21 - 4 shared = 17 distinct users x $15 = **$255 / month**, on one invoice.

As with all PagerTree billing, adding or removing users is prorated automatically. See the [consolidated billing docs](https://pagertree.com/docs/billing#consolidated-billing) for full details.

---

## What You'll See in PagerTree

Billing administrators will find a new **Unified Billing** section on the [Account Settings page](https://app.pagertree.com/account/settings).

- **In the billing account**, it lists every linked account with its user count, plus the total number of billable users across the group.
- **In a linked account**, it shows which account the billing is managed through. The plan, payment method, and invoices are all managed from the billing account.

---

## Good to Know

- **Notification credits stay per account.** Each account keeps its own [notification credit](https://pagertree.com/docs/billing#notification-limits) balance, based on its own number of users. A busy account can't use up the credits of a quiet one.
- **User limits work across the group.** A [user limit](https://pagertree.com/docs/billing#user-limits) set on the billing account caps distinct users across all linked accounts. Linked accounts can also set their own limit to cap just themselves.
- **Linking is done by our support team.** Accounts that are on a trial or free plan can be linked right away. If an account has its own paid subscription, we'll cancel and credit it first so you aren't charged twice.
- **Unlinking is possible.** If a department needs to go its own way, we can unlink it. It will then choose a plan of its own.
- **The billing account can't be deleted** while it is paying for other accounts. Contact support first to move their billing.

---

## Getting Started

Consolidated billing is included with the [Enterprise plan](https://pagertree.com/pricing/?utm_source=blog&utm_medium=link&utm_campaign=consolidated_billing). To get set up:

1. Pick the account that should own billing for your organization.
2. Email [support@pagertree.com](mailto:support@pagertree.com) with the names of the accounts you'd like linked to it.
3. We'll upgrade the billing account if needed, link your accounts, and confirm when your new combined seat count is live.

If you don't have a PagerTree account yet, [start a free trial now](https://app.pagertree.com/signup?utm_source=blog&utm_medium=link&utm_campaign=consolidated_billing).

Questions or feedback? We'd love to hear from you at [support@pagertree.com](mailto:support@pagertree.com).
