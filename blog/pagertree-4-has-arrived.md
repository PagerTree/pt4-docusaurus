---
date: 2022-12-15
authors: amiller
description: >-
  New features including reduced pricing, a crisp UI, and better alert
  aggregation are finally here.
---

# 📣 PagerTree 4.0 is finally here!

Today I am excited to announce we have officially shipped PagerTree 4.0!

Here are the highlights:

1. **Reduced Pricing** - [Elite pricing](https://pagertree.com/pricing/) has been reduced from $20 to $15.
2. **Better UI** - Both desktop and mobile, your eyes (and mine) can be relieved.
3. **Better Docs** - New docs (with improved search) that are more clear and concise than before. [https://pagertree.com/docs/](https://pagertree.com/docs/)
4. **Multiple Accounts Per User** - Users can now be a part of multiple accounts.
5. **2FA** - [Two Factor Authentication](https://pagertree.com/docs/users#two-factor-authentication) will keep your account safer.

<!-- truncate -->

This effort has been a year and half in development and I sincerely want to thank each and every one of our customers for the constructive feedback, ideas, and countless hours on Zoom calls. Without you this journey wouldn’t be possible.

We are excited to get this major release shipped, just in time for the holidays. You can check out the full details of the upgrade [below](pagertree-4-has-arrived.md#full-upgrade-breakdown). Over the coming months we will continue to add features from our [original list](https://github.com/PagerTree/pt4-spec).

If you have any other features you think we could add or improve on, make sure to give us a shout! We love it when customers suggest new ideas.

Sincerely,

Austin

<iframe src="https://www.youtube-nocookie.com/embed/Gfgw7ah2Xt4" title="PagerTree 4.0 Release" class="rds-video"></iframe>

<figure>![PagerTree Alert Dashboard](<https://pagertree.com/assets/img/posts/2022/10/09/desktop-view.png>)<figcaption></figcaption></figure>

<figure>![PagerTree Alert](<https://pagertree.com/assets/img/posts/2022/10/09/mobile-view.png>)<figcaption></figcaption></figure>

## Full Upgrade Breakdown

* General
  * Search - Is now powered by ElasticSearch and is way more relevant.
  * I18n - We now support English, Spanish, French, German, and Dutch languages in the UI.
  * Documentation - Better documentation. Less redundant, clearer, and more concise. [https://pagertree.com/docs/](https://pagertree.com/docs/)
  * Tagging - Most models now support tags that can be used when searching.
  * Better UI - Both desktop and mobile have been redone. Better organization. Clear call to action.
  * Billing - Now handled through Stripe Billing Portal.
* Pricing
  * Reduced to our original pricing model (Elite $15 - Pro $10 - Basic $0).
  * We’ve introduced a new “Enterprise” package (Enterprise $25).
* Authentication and Security
  * 2FA - [Two Factor Authentication](https://pagertree.com/docs/users#two-factor-authentication) has been added.
  * SSO - [SSO](https://pagertree.com/docs/single-sign-on-sso) has been simplified.
* Accounts - [Users can now be a part of multiple PagerTree Accounts](https://pagertree.com/docs/architecture-guide#account-organization)
* Alerts
  * Better [alert aggregation](https://pagertree.com/docs/integrations#alert-aggregation)
  * Public Pages - You can now make alerts public to the internet (default: false)
  * [Comments](https://pagertree.com/docs/alerts#comments) - Alerts can now be commented on by users.
* Users
  * Multiple emails per user
  * Multiple phones per user
* [Integrations](https://pagertree.com/docs/integrations) - Open Source - Check out [the repo](https://github.com/PagerTree/pager\_tree-integrations).
* [Teams](https://pagertree.com/docs/teams) - Notes and Attachments Section
* [Schedules](https://pagertree.com/docs/schedules) - Many scheduling bugs have been fixed
* [Stakeholders](https://pagertree.com/docs/stakeholders) - Better messaging - known as “Communications”
* [Reporting](https://pagertree.com/docs/reports) - Easier and Faster Filtering
* [Billing](https://pagertree.com/docs/billing)
  * [Auto Recharge](https://pagertree.com/docs/billing#auto-recharge) - Option to enable auto recharge forever
