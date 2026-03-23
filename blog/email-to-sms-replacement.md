---
date: 2026-03-23
authors: pagertree
description: >-
  AT&T, T-Mobile, and Verizon have all shut down their free email-to-text gateways.
  PagerTree is the drop-in replacement - swap the address, keep everything else.
  Setup in 2 minutes.
---

# 📣 Email-to-SMS Replacement: Carrier Gateways Are Gone (AT&T, T-Mobile, Verizon)

AT&T, T-Mobile, and Verizon have all shut down their free email-to-text gateways.  These gateways powered what most teams think of as "email-to-SMS" - sending an email to a phone number to trigger a text message. If your scripts, monitoring systems, or alerting tools are still pointing at `@txt.att.net`, `@tmomail.net`, or `@vtext.com` - your alerts are silently failing.

**PagerTree is the drop-in replacement.** Just replace the domain. Everything else stays the same. PagerTree uses verified messaging infrastructure (A2P 10DLC), ensuring messages are delivered reliably instead of silently dropped like legacy gateways.

<!-- truncate -->

## Carrier Gateways Shutdown Timeline

| Carrier | Old Gateway Address | Status |
|---|---|---|
| Sprint | `@messaging.sprintpcs.com` | ❌ Shut down early 2022 |
| Boost Mobile | `@sms.myboostmobile.com` | ❌ Shut down 2022 |
| T-Mobile | `@tmomail.net` | ❌ Offline December 2024 |
| AT&T | `@txt.att.net` / `@mms.att.net` | [Shut down June 17, 2025](https://www.att.com/support/article/wireless/KM1061254/) |
| Cricket Wireless | `@sms.cricketwireless.net` | ❌ Shut down with AT&T |
| Verizon | `@vtext.com` / `@vzwpix.com` | ⚠️ Unreliable - [phasing out by March 31, 2027](https://www.verizon.com/support/vtext-vzwpix-shutdown/) |

## Why Did Carriers Shut Them Down?

The free carrier gateways became major spam and phishing vectors (aka ["smishing"](https://www.ibm.com/think/topics/smishing)), and carriers retired them rather than maintain them under modern A2P messaging regulations. **They're not coming back.**

## The Fix: Replace the Domain, Keep Everything Else

PagerTree gives your account a unique email domain to send alert emails to. You send an email to `[10-digit-phone]@your-domain.e2t.pagertree.com` (must be a verified phone number in PagerTree) and PagerTree sends an SMS to your phone. That's it.

If you had something like this working before:

```
alerts@yourserver.com → [10-digit-phone]@txt.att.net
```

You just change the domain to your PagerTree address:

```
alerts@yourserver.com → [10-digit-phone]@your-domain.e2t.pagertree.com
```

## How to Set It Up (2 Minutes)

1. **[Sign up for PagerTree](https://app.pagertree.com/signup)** - free 14-day trial, no credit card required.
2. **Enable Email-to-SMS** - Available on Pro and Elite plans. [Contact support](mailto:support@pagertree.com) to enable.
3. **Swap the domain** - Replace your old carrier gateway domain with your new PagerTree domain in the systems that are sending the emails.
4. **Test it** - Send a test email to your PagerTree email-to-text domain and confirm the SMS notification arrives.

Just like that, your existing setup works exactly as before!

## Works With Anything That Sends Email

- UPS / server hardware alert emails
- Cron job scripts
- Windows Task Scheduler / Event Log
- Custom applications
- Enterprise applications (PRTG, SolarWinds, etc.)

If it can send an email, it works with PagerTree.

[👉 See the docs](https://pagertree.com/docs/email-to-text)

## Pricing

Email-to-SMS is included on the **[Pro and Elite plans](https://pagertree.com/pricing/)**.

- No per-message SMS charges  
- No carrier gateway dependencies  
- No API or infrastructure required

[👉 See full pricing ](https://pagertree.com/pricing/)

## Want More? PagerTree Does That Too.

Email to SMS is the simplest way to use PagerTree, but the platform also supports [on-call schedules, escalation policies, team rotations, and integrations](https://pagertree.com/features/) like Grafana, PRTG, and other monitoring tools.

[👉 Start your free trial](https://app.pagertree.com/signup)

For setup help, [read the docs](https://pagertree.com/docs/) or email [support@pagertree.com](mailto:support@pagertree.com).
