---
description: >-
  PagerTree offers several providers for single sign-on (SSO), and uses the SAML
  2.0 protocol. SAML is an XML standard for exchanging authentication data
  between parties.
---

# Single Sign On (SSO)

## Definitions

* _Identity Provider (IdP)_ - This is your Identity Provider (Google, Okta, Azure AD).
* _Service Provider (SP)_ - This is PagerTree.

## SAML Required Attributes

* _Version_ - 2.0
* _Assertion Consumer URL (ACS)_ - `https://app.pagertree.com/public/saml/callback?sp_entity_id=<sp-entity-id>`
* _NameIDPolicy_ - urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
* _Encryption_ - false

1. Enable "advanced mode".
2. Navigate to the [Idp Configs page](https://app.pagertree.com/single\_sign\_on\_configs).
3. Click **New SSO Config** button.
4. In the new Idp Config form:
   1. Copy the **metadata xml** (or metadata url) from your **IdP to the PagerTree**
5. **Configure your IdP** with the provided **SP (PagerTree) information**.
   * _Service Provider (PagerTree) Entity ID_ - Sometimes called the "audience" by the IdP.
   * _Service Provider (PagerTree) Assertion Consumer Service (ACS) URL_
   * _Service Provider (PagerTree) Single Logout Service (SLO) URL_
6. Click **Enable** Button

Members of your account will now be required to sign-in using SSO via the [Single Sign-On login page](https://app.pagertree.com/sso)

## Configuring PagerTree with SSO

1. Enable ["advanced mode"](https://docs.pagertree.com/knowledge-base/users#advanced-mode).
2. Navigate to the [Idp Configs page](https://app.pagertree.com/single\_sign\_on\_configs).
3.  Click **New SSO Config** button.

    <figure>![new sso config button](<.gitbook/assets/idp-config-button.png>)<figcaption><p>New SSO Config Button</p></figcaption></figure>
4. In the new Idp Config form:
   1.  Copy the **metadata xml** (or metadata url) from your **IdP to the PagerTree**.

       <figure>![sso config form](<.gitbook/assets/idp-config-form.png>)<figcaption><p>SSO Config Form</p></figcaption></figure>
5. **Configure your IdP** with the provided **SP (PagerTree) information**.
   * _Service Provider (PagerTree) Entity ID_ - Sometimes called the "audience" by the IdP.
   * _Service Provider (PagerTree) Assertion Consumer Service (ACS) URL_
   *   _Service Provider (PagerTree) Single Logout Service (SLO) URL_

       <figure>![IDP](<.gitbook/assets/idp-config-data.png>)<figcaption><p>Identity Provider (IdP) Data</p></figcaption></figure>
6.  Click **Enable** Button.

    <figure>![enable sso config button](<.gitbook/assets/idp-config-enable-button.png>)<figcaption><p>Enable SSO Config Button</p></figcaption></figure>

Members of your account will now be required to sign-in using SSO via the [Single Sign-On login page](https://app.pagertree.com/sso)
