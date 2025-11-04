# Users

## What is a User?

A user represents an actual person. Each user will have their own contact information and notification preferences.

Users are independent objects in PagerTree and are associated to Accounts via the Account User relationship. Please see [account organization](architecture-guide.md#account-organization) for full details on how this relationship works.

### Roles

Roles are specific to the Account context. Please see [roles section](users.md#roles) regarding permissions within an account.

## Settings

| Option                       | Scope   | Description                                                                                                                                |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Time Zone                    | Global  | The preferred time zone of the user. Affects how times are displayed in the UI.                                                            |
| Preferred Language           | Global  | The preferred language of the user. Affects how the UI is translated. Supported languages are English, Spanish, French, German, and Dutch. |
| Notification Rules           | Account | The [notification rules](users.md#notification-rules) to use when getting notified about alerts for this account.                          |
| Going On-Call Notifications  | Account | Going On-Call notification settings. See [going on-call docs](users.md#going-on-call-notifications) below.                                 |
| Going Off-Call Notifications | Account | Going Off-Call notification settings. See [going on-call docs](users.md#going-on-call-notifications) below.                                |
| Emoji Mode                   | Global  | Display Emojis in the navbar.                                                                                                              |
| Advanced Mode                | Global  | Display "advanced" models. See [advanced mode](users.md#advanced-mode) below.                                                              |
| Debug Mode                   | Global  | Display "debug" models. (usually only used for support).                                                                                   |
| App Notification Persistent  | Global  | [Persistent notification](notifications.md#notification-persistence-push) setting for the mobile application.                              |
| App Notification Sound       | Global  | [Notification sounds](notifications.md#custom-sounds-push) setting for the mobile application.                                             |

### Advanced Mode

By default PagerTree hides many of the more "advanced" functionality. To view advanced objects you will need to enable advanced mode.

1. Navigate to the [My Settings Page](https://app.pagertree.com/user/settings).
2. Scroll to the **Other Settings section**.
3.  Check the **Advanced Mode checkbox**.

    <figure>![advanced mode check box](<.gitbook/assets/advanced-mode.png>)<figcaption><p>Advanced Mode Checkbox</p></figcaption></figure>
4. Click **Update**.

You should now see the advanced options in the navigation menu.

<figure>![advanced options in menu bar](<.gitbook/assets/advanced-options-in-the-menu-bar.png>)<figcaption><p>Advanced options in the menu bar.</p></figcaption></figure>

## Emails

* A user can have 1 or more emails.
* An email address must be deliverable.
* Email addresses that bounce, report a spam complaint, or are not deliverable will be blocked and receive no further notifications.

## Phone Numbers

* A user can have 1 or more phones.
* A phone must be verified before PagerTree will begin sending notifications.

### Phone Verification

1. Navigate to the [My Settings Page](https://app.pagertree.com/user/settings).
2. Input your **mobile phone number** and choose a **verification channel**.
3.  Click **Update**.

    <figure>![phone input form](<.gitbook/assets/phone-input.png>)<figcaption><p>Phone Input Form</p></figcaption></figure>
4.  Click **Verify**.

    <figure>![phone verify button](<.gitbook/assets/phone-verify-button.png>)<figcaption><p>Phone Verify Button</p></figcaption></figure>
5.  Input your **verification code** and click **Update**.

    <figure>![phone verification form](<.gitbook/assets/phone-verify-form.png>)<figcaption><p>Phone Verification Form</p></figcaption></figure>

be redirectedIf successful, you will be redirected to the My Settings page with the message "Phone verified successfully".

## Notifications

<figure>![High level alert workflow](<.gitbook/assets/high-level-alert-workflow-notification.png>)<figcaption><p>High Level Alert Workflow (Notifications)</p></figcaption></figure>

### Default Notification Channels

User's can elect from the following default notification channels:

* Push (app notification)
* Email
* SMS (text message)
* Voice (automated call)
* WhatsApp (text message)
* Slack

:::info
Voice notifications only apply to the alert open message.
:::

<figure>![default notification channels](<.gitbook/assets/default-notification-channels.png>)<figcaption><p>Default notification channels.</p></figcaption></figure>

### Notification Rules

Notification rules allow custom notification sequences to be built for the alert open message. Please see the [notification rules documentation](notification-rules.md) for full details.

### Going On-Call Notifications

Users can elect to get going on-call reminder notifications a configurable amount of time before their on-call shift starts. Additionally, users can specify which layers they would like to be reminded about (leave blank for all).

<figure>![going oncall notification](<.gitbook/assets/going-on-call-notifications.png>)<figcaption><p>Going On-Call Notifications</p></figcaption></figure>

## API Tokens

Users can use API Tokens to access the [PagerTree API](https://pagertree.com/docs/api/). API Tokens are scoped to the [account](accounts.md).

### Create an API Token

1. Scroll to the **"API Tokens" section**.
2.  **Click** the **New API Token** button.

    <figure>![new api token button](<.gitbook/assets/api-token-button.png>)<figcaption><p>New API Token Button</p></figcaption></figure>
3.  Provide a **Name** and **click Create** button.

    <figure>![api token form](<.gitbook/assets/api-token-form.png>)<figcaption><p>API Token Form</p></figcaption></figure>
4.  Copy your **Token**. 

    <figure>![copy your api token](<.gitbook/assets/api-token.png>)<figcaption><p>Copy your API token.</p></figcaption></figure>

You can now use your API Token to access the PagerTree API. Check out the [API docs](https://pagertree.com/docs/api) for full documentation.

## Security

All of the following security options can be found from the [My Settings Page](https://app.pagertree.com/user/settings).

### Two Factor Authentication

PagerTree supports two factor authentication (2FA). To enable two factor authentication:

1. Scroll to the **"Two-factor Authentication" section**.
2.  Click the **Enable two-factor authentication** button.

    <figure>![Enable two factor authentication button](<.gitbook/assets/enable-two-factor-authentication-button.png>)<figcaption><p>Enable Two Factor Authentication Button</p></figcaption></figure>
3.  **Copy the recovery codes** and store them somewhere secure.

    <figure>![backup codes](<.gitbook/assets/enable-two-factor-authentication-codes.png>)<figcaption><p>Copy the 2FA backup codes and store somewhere secure.</p></figcaption></figure>
4.  With your 2FA app, **scan the bar code** and **enter the six digit code**.

    <figure>![qr code](<.gitbook/assets/enable-two-factor-authentication-qr.png>)<figcaption><p>2FA QR Code</p></figcaption></figure>
5. If successful, you will be redirected the the My Settings page with a notice stating "Two-factor authentication was enabled successfully".

You will now be required to use 2FA when logging in.

### Single Sign-On

If a user is part of an account that is using Single Sign-On (SSO), they will be required to sign in via SSO to access the account.

Only account users that have the admin role can bypass the SSO login for SSO enabled accounts.

For instructions on how to configure SSO for an account, please see [SSO docs](single-sign-on-sso.md).

### Reset Password

To reset your password you will need to know your current password. If you have forgotten your current password, please see [forgot-password](users.md#forgot-password) documentation.

1. Scroll to the **"Password Settings" section**.
2. On the "Password Settings" Form
   * Provide your current password
   * Provide a new password
   * Confirm your new password
3.  Click **Update**.

    <figure>![reset password form](<.gitbook/assets/reset-password-form.png>)<figcaption><p>Reset Password Form.</p></figcaption></figure>

### Forgot Password

If you have forgotten your password, you can reset it from the [application forgot password page](https://app.pagertree.com/forgot-password/new).
