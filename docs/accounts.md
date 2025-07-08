# Accounts

### Billing

Account billing documentation can be found on the [billing page](billing.md).

### Single Sign On

Single Sign On (SSO) documentation can be found on the [Single Sign On page](single-sign-on-sso.md).

### Transfer

To transfer an account you must be the [account owner](architecture-guide.md#account-owner) and can only transfer the account to another account user. The account user you transfer the account to will immediately assume the [roles](users.md#roles) of account owner, admin, and billing.

1. Navigate to the [account settings page](https://app.pagertree.com/account/settings).
2. Scroll to the **Transfer ownership section**.
3. Select the [Account User](users.md) you would like to transfer the account to.
4. Click **Transfer**.
5. If you are sure you want to transfer the account, click **Confirm**.

<figure>![transfer account ownership](<.gitbook/assets/transfer-account.png>)<figcaption><p>Transfer Account Form</p></figcaption></figure>

### Delete

To delete an account you must be the account owner. If you delete the account, all data will be lost and cannot be restored. This affects all account users in this account (not just you).

If you are just trying to leave the organization try [transferring](accounts.md#transfer) the account and have the new account owner delete your account user.

1. Navigate to the [account settings page](https://app.pagertree.com/account/settings).
2. Scroll to the **Danger Zone section**.
3. Click **Delete**.
4. If you are sure you want to delete the account, click **Confirm**.

<figure>![delete account button](<.gitbook/assets/delete-account.png>)<figcaption><p>Delete Account Button</p></figcaption></figure>

### Create Another Account

Any user can create a new account.

1. From the profile menu, **click +Create New Account.**
2.  Provide a company name, and **click Create.** .

    <figure>![Pagertree create new account](<.gitbook/assets/image (1) (3).png>)<figcaption><p>Profile Menu -> Create New Account</p></figcaption></figure>

### Switch Accounts

Any user can switch between accounts, so as long as they belong to more than one account.

1.  From the profile menu, **click on the name of the company** you would like to switch to.&#x20;

    <figure>![pagertree switch accounts](<.gitbook/assets/image (2) (6).png>)<figcaption><p>Profile Menu -> Company Name</p></figcaption></figure>
