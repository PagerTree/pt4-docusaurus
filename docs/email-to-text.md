---
description: "Send SMS via email with PagerTree's Email To Text. Convert emails to text messages using your unique gateway domain."
---

# Email to Text

## What is Email to Text?

Email to Text lets you send SMS text messages by sending an email. Convert emails to SMS instantly using your unique gateway domain.

**Key Features:**
* Send SMS via email from any email client
* Unique gateway domain per account (`[your-id].e2t.pagertree.com`)
* Recipients must have verified phone numbers in your account
* All messages logged in PagerTree interface

:::info
Email to Text is currently in beta and will require enabling for your account. Please contact support to enable.
:::

## How to Send SMS via Email

**Email Format:**
```
To: [phone-number]@[your-gateway-domain].e2t.pagertree.com
Subject: Your message
Body: SMS content
```

**Example:**
```
To: 5551234567@abc123.e2t.pagertree.com
Subject: Server Alert
Body: Database backup completed successfully
```

**Phone Number Format:**
* US: 10 digits (e.g., `5551234567`)
* International: Include country code (e.g., `441234567890`)
* No spaces, dashes, or formatting

## Setup

1. **Find your gateway domain** on the [Email to Text page](https://app.pagertree.com/e2t_inbound_emails?direction=desc&sort=tiny_id) in PagerTree:
    1. In the navigation menu, go to **Advanced** > **Email2Texts**
    <figure>![email-2-text page](<.gitbook/assets/email-2-text-page.png>)<figcaption><p>Email to Text Page</p></figcaption></figure>
    2. Copy your unique gateway domain (e.g., `abc123.e2t.pagertree.com`)
    <figure>![email-2-text gateway domain](<.gitbook/assets/email-2-text-domain.png>)<figcaption><p>Email to Text Gateway Domain</p></figcaption></figure>
2. **Add recipients:**
:::info
Recipients' phone numbers must be verified first. See [phone verification guide](users.md#phone-verification).
:::
    - Go to [Users page](users.md)
    - Add phone numbers to user profiles
    - Complete [phone verification](users.md#phone-verification)
 
:::tip
Test with your own verified number first before sending to others.
:::

## Message Tracking

View all Email to Text activity on the [**Email to Text** page](https://app.pagertree.com/e2t_inbound_emails?direction=desc&sort=tiny_id):
* Incoming emails and delivery status  
* Message history and timestamps
* Delivery errors and troubleshooting info

## Troubleshooting

**Messages not delivering?**
* ✅ Phone number verified in user profile
* ✅ Correct gateway domain used
* ✅ Phone number format (no spaces/dashes)  
* ✅ Email to Text enabled for your account
* ✅ Subscription plan supports Email to Text

**Message Limits:**
* Subject + body combined for SMS
* Long messages split into multiple SMS
* HTML converted to plain text
