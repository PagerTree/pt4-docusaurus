---
date: 2023-08-01
authors: amiller
description: >-
  Tutorial showing how to implement multi-tenant single sign-on (SSO) using Ruby
  on Rails, Devise, and SAML. Works with identity providers like Okta, Google,
  Azure, etc.
---

# 💎 Multi-Tenant SSO using Devise

Recently while scrolling on Twitter I saw this tweet by John Nunemaker.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Who knows things about multi-tenant SSO (SAML or Okta, etc.) + ruby on rails and is willing to do a call with me? Happy to barter or pay.</p>&mdash; John Nunemaker (@jnunemaker) <a href="https://twitter.com/jnunemaker/status/1659204066508144642?ref_src=twsrc%5Etfw">May 18, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Since we had implemented [multi-tenant SSO at PagerTree](https://pagertree.com/docs/single-sign-on-sso), I thought I could help out. After all, I [claimed it was only \~100 lines of code](https://twitter.com/armiiller/status/1677113409136132096) (turns out it is closer to 400). After sharing a raw gist, I realized a blog post would be more helpful to the community.

In this blog post, I want to describe how we implemented multi-tenant SSO at PagerTree to work with any SAML2 identity provider (Okta, Google, Azure, etc.).

<!-- truncate -->

:::danger
**STOP HERE** - This is not a Copy Pasta™ blog post. Some things are very specific to the PagerTree implementation. You'll need to adapt the code to work for your project. This post is to help do most of the heavy lifting.
:::

## Stack Setup and Assumptions

This blog post will make a lot of assumptions about its implementation (it's a highly niche implementation).

* [Ruby on Rails](https://rubyonrails.org/) is the framework (7.0.4)
* [devise](https://github.com/heartcombo/devise) gem is used for authentication (4.8.1)
* [ruby-saml](https://github.com/SAML-Toolkits/ruby-saml) gem for SAML parsing (1.14)
* [acts\_as\_tenant](https://github.com/ErwinM/acts\_as\_tenant) gem for tenant management (0.5.1)

### Important Notes

* This implementation uses the emailAddress attribute of SAML as the primary identifier for Users.
* Checkout our [SSO docs](https://pagertree.com/docs/single-sign-on-sso) on how this looks in practice.
* We've snipped a lot of PagerTree specific code for the purposes of brevity and staying focused.

## SSO Keywords and Jargon

Some of the most confusing things in SSO implementation is that there is no "standard" naming convention. I have seen many aliases and synonyms all over the web.

* `idp` - **Identity Provider (IdP)** - Your customer's authentication provider (ex: Okta, Google, Azure, etc.)
* `idp_entity_id` - The unique tenant identifier in the IdP's database.
* `idp_sso_service_url` - The URL your app needs to redirect the user to with the AuthNRequest. It will be at the IdP's domain.
* `sp` - **Service Provider (SP)** - Your app, the one you are building (ex: PagerTree)
* `sp_entity_id` - A unique tenant identifier in the SP's database.
* `assertion_consumer_service_url` - The endpoint on the SP where the IdP should send the user after they have authenticated.
* `authnrequest` - Programmatic authentication request.
* `slo` - Single Logout
* `saml` - (Security Assertion Markup Language) is an XML-based standard for exchanging authentication and authorization data between parties, enabling Single Sign-On (SSO) functionality.

## SSO Workflow Overview

If you are not familiar with SSO that's ok, I am going to go over the basic ideas (a full explanation is outside the scope of this article).&#x20;

If you've ever logged in to an app using your Microsoft, Google, or work account, it likely used SAML to exchange information about your authentication. **The IdP is responsible for the authentication of users (aka verifying users are who they say they are)**.

The basic workflow looks like this:

1. with The user comes to the SP application (aka your application).
2.  The user provides the SP application with the authentication email (usually their work email).

    <figure>![SSO Login](<.gitbook/assets/image (18).png>)<figcaption></figcaption></figure>
3. The SP looks up the user and an IdP configuration this user is associated with. The user is then redirected to the IdP (`idp_sso_service_url`) with an authentication request in the format of an AuthNRequest.
4. At this point, the user either must provide valid credentials to the IdP. Once valid credentials are provided, and the the IdP confirms the user should have access to the SP application, the user is redirected by to the SP application at the `assertion_consumer_service_url`.
5. The SP is then responsible for granting access to the application based on the trusted response.

### Two Entry Points

1. SP initiated - When a user comes to your app and clicks "Login using SSO" providing you their email address. This is probably the most common workflow and was described above.
2. IdP initiated - When a user logs in via their "app portal" from the IdP. Not very common, never have used it myself, but we need to support it. It doesn't change the code, but I am including it here for completeness.

## Code

### Migration

We need to add a model to hold each tenant's SSO configuration(s). I will briefly explain what each property is:

* `account_id` - The tenant this belongs to.
* `meta` - Free form hash where we can store any future data.
* `sp_entity_id` - The unique identifier for this configuration.
* `name` - A user friendly name so they can remember this configuration (ex: "Okta Config", "Okta Dev Config")
* `vendor` - Enum identifier the IdP vendor. When debugging with customers why their configuration doesn't work, it's helpful to know the vendor (some vendors do some wonky stuff).
* `metadata_url` - The URL to the IdP's metadata XML.
* `metadata_xml` - The raw metadata XML (some vendors don't provide a metadata URL). The user should be able to copy and paste it into our app.
* `settings` - A JSON representation of the parsed XML.
* `assertion_response_options` - A hash of configurable options (per tenant) that we can pass into the Ruby SAML library.

```ruby showLineNumbers
class CreateIdpConfigs < ActiveRecord::Migration[7.0]
  def change
    create_table :idp_configs, id: false do |t|
      t.binary :id, limit: 16, primary_key: true
      t.references :account, type: :binary, limit: 16, null: false, foreign_key: true
      t.string :prefix_id, null: false
      t.integer :tiny_id, null: false

      t.jsonb :meta, null: false, default: {}

      t.string :sp_entity_id, null: false
      t.string :name, null: false

      t.integer :vendor, null: false, default: 0

      t.string :metadata_url, null: true, default: nil
      t.string :metadata_xml, null: true, default: nil

      t.jsonb :settings, null: false, default: {}
      t.datetime :settings_cached_until, null: true, default: nil
      t.jsonb :assertion_response_options, null: false, default: {}

      t.datetime :discarded_at

      t.timestamps
      t.index :discarded_at
      t.index [:account_id, :tiny_id], unique: true
      t.index :prefix_id, unique: true
      t.index :sp_entity_id, unique: true
    end

    add_column :accounts, :sso_config_id, :binary, limit: 16, null: true, foreign_key: {to_table: :idp_configs}
  end
end

```

### Model

Our IdPConfig model will hold a SSO configuration. Each account can have many IdPConfigs, but there will only ever be 0 or 1 active IdPConfigs for an account at a time.

A couple of important notes:

* Line 78 - We use `SecureRandom.hex` and not a UUID. Azure does not like dashes in the sp\_entity\_id; a hex key will work across all known providers.
* Line 95 - We use `OneLogin::RubySaml::IdpMetadataParser` to parse the XML provided by the user or the IdP's metadata\_url.

```ruby title="app/models/idp_config.rb" showLineNumbers
# == Schema Information
#
# Table name: idp_configs
#
#  id                         :binary           not null, primary key
#  assertion_response_options :jsonb            not null
#  discarded_at               :datetime
#  meta                       :jsonb            not null
#  metadata_url               :string
#  metadata_xml               :string
#  name                       :string           not null
#  settings                   :jsonb            not null
#  settings_cached_until      :datetime
#  vendor                     :integer          default("saml2"), not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  account_id                 :binary           not null
#  prefix_id                  :string           not null
#  sp_entity_id               :string           not null
#  tiny_id                    :integer          not null
#
# Indexes
#
#  index_idp_configs_on_account_id              (account_id)
#  index_idp_configs_on_account_id_and_tiny_id  (account_id,tiny_id) UNIQUE
#  index_idp_configs_on_discarded_at            (discarded_at)
#  index_idp_configs_on_prefix_id               (prefix_id) UNIQUE
#  index_idp_configs_on_sp_entity_id            (sp_entity_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
class IdpConfig < ApplicationRecord
  include Discardable
  include PrefixIdable
  include Publishable
  include Searchable
  include TinyIdable

  META_KEYS = [:v]
  store_accessor :meta, *META_KEYS

  # these are the options we can send into the Ruby SAML library
  store_accessor :assertion_response_options, [:skip_authnstatement, :skip_conditions, :skip_subject_confirmation, :skip_recipient_check, :skip_audience]

  acts_as_tenant :account

  enum vendor: {saml2: 0, saml1: 1, adfs: 2, azure_ad: 3, google: 4, okta: 5, one_login: 6, ping_identity: 7}, _prefix: true

  has_one :sso_account, class_name: "Account", foreign_key: "sso_config_id", dependent: :nullify

  before_validation :callback_clear_settings, on: [:update], if: -> { metadata_xml_changed? || metadata_url_changed? }

  attribute :skip_validate_subscription, :boolean, default: false

  validates :name, presence: true
  validates :vendor, presence: true
  validates :sp_entity_id, presence: true, uniqueness: true
  validates :metadata_url, url: {allow_blank: true, no_local: true}
  validate :validate_metadata
  validate :validate_subscription, on: :create, unless: :skip_validate_subscription?

  after_discard do
    deactivate! if active?
  end

  pg_search_scope :pg_search_default, against: :name

  def prefix_id_prefix
    "idp"
  end

  after_initialize do
    self.v ||= 4
    self.settings ||= {}
    self.assertion_response_options ||= {}
    self.sp_entity_id ||= SecureRandom.hex
  end

  def active?
    account.sso_config_id == id
  end

  def activate!
    account.sso_config_id = id
    account.save!
  end

  def deactivate!
    account.sso_config_id = nil
    account.save!
  end

  def idp_metadata_parser
    OneLogin::RubySaml::IdpMetadataParser.new
  end

  def parse_metadata
    saml_settings = {}
    if metadata_xml.present?
      saml_settings = idp_metadata_parser.parse_to_hash(metadata_xml)
    elsif metadata_url.present?
      saml_settings = idp_metadata_parser.parse_remote_to_hash(metadata_url)
    end
    saml_settings
  rescue
    {}
  end

  def settings
    # update the settings cache
    if persisted? && (self[:settings].blank? || settings_cached_until.nil? || Time.current >= settings_cached_until)
      self.settings = parse_metadata
      self.settings_cached_until = Time.current + 1.day
      save
    end

    super
  end

  def callback_clear_settings
    self.settings = {}
    self.settings_cached_until = nil
  end

  def assertion_consumer_service_url
    Rails.application.routes.url_helpers.saml_callback_url(sp_entity_id: sp_entity_id)
  end

  def saml_metadata_url
    Rails.application.routes.url_helpers.saml_metadata_url(sp_entity_id: sp_entity_id, format: :xml)
  end

  def saml_slo_url
    Rails.application.routes.url_helpers.saml_logout_url(sp_entity_id: sp_entity_id)
  end

  def validate_metadata
    errors.add(:base, "metadata_url OR metadata_xml (not both) is required") unless metadata_url.present? ^ metadata_xml.present? # exclusive or
    errors.add(:base, "unable to parse metadata") if parse_metadata.blank?
  end

  def validate_subscription
    # gotta make sure we are on https://sso.tax/ (its good for SEO)
    errors.add(:base, I18n.t("consider_upgrading_for_create", model: I18n.t("plural.idp_config", count: 2))) unless account.subscription_feature_sso?
  end
end
```

### Routes

The important paths are as follows:

* `/sso` - Where the user comes in the SP initiated workflow. We ask them for their email here.&#x20;
* `/saml_callback` - Alias for `/public/saml/consume` (see below). We had to support some legacy URLs when [upgrading to v4](pagertree-4-has-arrived.md).
* `/public/saml/consume` - Where the IdP redirects the user to after they have provided their credentials to the IdP. This is the `assertion_consumer_url`. The payload of the request will be the assertion of who the user is.
* `/public/saml/metadata` - A convenience endpoint for users to get information in XML format about the SP. IdP's sometimes will ask for this. Its a programmatic way for the SP to provide the IdP with details like the `assertion_consumer_service_url`
* `/public/saml/slo` - The IdP will make a request here if the user is logged out. This is known as single logout. We need to destroy the users session when this URL is called.

```ruby title="config/routes.rb" showLineNumbers
devise_for :users, path: "",
  controllers: {
    registrations: "users/registrations",
    sessions: "users/sessions",
  },
  path_names: {
    sign_in: "login", sign_out: "logout", sign_up: "signup",
    password: "forgot-password"
  }
# opt-in saml_authenticatable
devise_scope :user do
  scope "" do
    match :sso, controller: "users/sessions", via: [:get, :post, :patch]
    match :saml_callback, path: "public/saml/callback", controller: "users/sessions", via: [:get, :post]
    match :consume, path: "public/saml/consume", controller: "users/sessions", action: "saml_callback", via: [:get, :post], as: "saml_consume" # legacy route
    get :saml_metadata, path: "public/saml/metadata", controller: "users/sessions"
    match :saml_logout, path: "public/saml/slo", controller: "users/sessions", via: [:get, :post]
  end
end
```

### Sessions Controller

You'll need to read through the sessions controller, but I will give a brief summary:

* Line 6 - `skip_before_action :verify_authenticity_token` - On requests from the IdP, don't verify the [authenticity token (a Rails security feature)](https://stackoverflow.com/questions/941594/understanding-the-rails-authenticity-token).
* Line 7 - `before_action :set_idp_config` - Set the IdP Config for SSO methods.
* Line 10 - `def destroy` - Override the Devise destroy method. Send the IdP a logout request if our user logsout from our app.
* Line 27 - `def sso` - Render the SSO page to capture the users email.
* Line 28 - `user = User.find_by_email(email)` - [We use the emailAddress as the primary identifier](multi-tenant-sso-using-devise.md#important-notes) between IdP and SP.
* Line 82 - `def saml_callback` - Process the IdP response. This is the `assertion_consumer_service_url`.
* Line 91 - `if !user` - Create a user if they don't exist in our database but were authenticated by the trusted IdP. This can occur when a SSO administrator adds access to your application and it's the users first time to login to your app.
* Line 118 - `def saml_metadata` - The convenience method providing metadata that describes the SP configuration.
* Line 126 - `def saml_logout` - Process the IdP initiated single logout request.
* Line 164 - `def verify_can_username_password` - SSO users should be forced to use SSO

```ruby title="app/controllers/users/sessions_controller.rb" showLineNumbers
class Users::SessionsController < Devise::SessionsController
  include Devise::Controllers::Rememberable

  skip_before_action :verify_authenticity_token, only: [:saml_callback, :saml_logout, :consume]
  before_action :set_idp_config, only: [:saml_callback, :saml_metadata, :saml_logout]

  # override the destroy method, and do special single logout stuff if they have it configured
  def destroy
    idp_config = current_account.sso_config
    user = current_user
    super do
      if idp_config.present?
        saml_sp_logout_request(idp_config, user)
      end
    end
  end

  def respond_to_on_destroy
    # if we are doing single logout (SLO) don't redirect,
    # the saml_sp_logout_request function handles the redirect
    super unless session[:transaction_id]
  end

  # Handle the logic around the email input form and redirecting to their IdP
  def sso
    email = params[:email]&.downcase
    if email
      user = User.find_by_email(email)
      if user
        sso_accounts = user.accounts.sso_enabled.order(name: :asc)
        sso_accounts = sso_accounts.where(id: params[:account_id]) if params[:account_id]

        if sso_accounts.size == 0
          # set an error message saying they have no accounts configured w/ sso
          redirect_to sso_url(host: Rails.application.routes.default_url_options[:host]), alert: t(".sso_account_not_found"), allow_other_host: true
        elsif sso_accounts.size == 1
          # set the current tentant
          account = sso_accounts.first
          if account.subscription_feature_value(:sso) != true
            flash.now[:alert] = t(".please_upgrade")
          elsif account.sso_config.present?
            request = OneLogin::RubySaml::Authrequest.new
            settings = get_saml_settings(account.sso_config)

            # Special settings for Microsoft products
            # Azure AD will produce the following error if the subject is provided:
            # AADSTS900236: The SAML authentication request property 'Subject' is not supported and must not be set.
            unless settings.idp_entity_id&.starts_with?("https://sts.windows.net/")
              settings.name_identifier_value_requested = email
              settings.name_identifier_format = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
            end

            redirect_to(request.create(settings), allow_other_host: true)
          else
            flash.now[:alert] = t(".primary_idp_not_set")
          end
        else
          # ask them which account to sign into
          @email = email
          @accounts = sso_accounts
          flash.now[:alert] = t(".select_account")
        end
      else
        flash.now[:alert] = t(".user_not_found")
      end
    end
  end

  def assertion_response_options
    idp_options = {}

    # we can put any nasty vendor work arounds here
    idp_options = {skip_subject_confirmation: true} if @idp_config.vendor_one_login?

    {
      allowed_clock_drift: Rails.env.test? ? 100.years : 5.seconds
    }.merge(idp_options).merge(@idp_config.assertion_response_options.symbolize_keys)
  end

  def saml_callback
    return redirect_to sso_url(host: Rails.application.routes.default_url_options[:host]), alert: t("users.sessions.saml_callback.not_found"), allow_other_host: true unless @idp_config
    return redirect_to new_user_session_url(host: Rails.application.routes.default_url_options[:host]), alert: t("consider_upgrading") unless @idp_config.account.subscription_feature_sso?

    response = OneLogin::RubySaml::Response.new(params[:SAMLResponse], settings: get_saml_settings(@idp_config), **assertion_response_options)

    collect_errors = true
    if response.is_valid?(collect_errors)
      email = response.name_id&.downcase
      user = User.find_by_email(email)

      if !user
        # if the user was not in the database, this was likely a IdP initiated
        # create an account for them, and give them a temp password
        user = User.new(
          email: email,
          password: ::Devise.friendly_token[0, 20],
          terms_of_service: true,
          name: email
        )
        user.set_new_user_default_preferences
        user.skip_confirmation!
        user.account_users.new(account: @idp_config.account)
        user.save!
      end

      # remember the users to they don't have to login again
      user.remember_me = true
      sign_in(user)
      session[:account_id] = @idp_config.account_id
      session[:sso] = true
      redirect_to root_url(host: Rails.application.routes.default_url_options[:host]), allow_other_host: true # force them back to the main site
    else
      redirect_to sso_url(host: Rails.application.routes.default_url_options[:host]), alert: t("users.sessions.saml_callback.invalid_response", message: response.errors.join(", ")), allow_other_host: true
    end
  end

  # See https://github.com/onelogin/ruby-saml#service-provider-metadata
  def saml_metadata
    raise ActionController::RoutingError.new(t(".not_found")) unless @idp_config
    settings = get_saml_settings(@idp_config)
    meta = OneLogin::RubySaml::Metadata.new
    render xml: meta.generate(settings), content_type: "application/samlmetadata+xml"
  end

  # Trigger SP and IdP initiated Logout requests
  def saml_logout
    if params[:SAMLRequest]
      # If we're given a logout request, handle it in the IdP logout initiated method
      saml_idp_logout_request
    elsif params[:SAMLResponse]
      # We've been given a response back from the IdP, process it
      saml_process_logout_response
    end
  end

  # 2FA code snipped for example brevity

  def find_user
    if sign_in_params[:email].present?
      resource_class.find_by_email(sign_in_params[:email].downcase)
    end
  end

  def get_saml_settings(idp_config)
    settings = OneLogin::RubySaml::Settings.new(idp_config.settings)
    # From the gem docs - "The use of settings.issuer is deprecated in favour of settings.sp_entity_id since version 1.11.0"
    # Sett IdpConfig model for the branching of the logic between v3 and v4
    settings.assertion_consumer_service_url = idp_config.assertion_consumer_service_url
    settings.sp_entity_id = idp_config.sp_entity_id

    settings
  end

  def set_idp_config
    sp_entity_id = params[:sp_entity_id]
    if sp_entity_id.present?
      Rails.logger.debug "SSO set_idp_config - sp_entity_id: #{sp_entity_id}"
      @idp_config = IdpConfig.find_by(sp_entity_id: sp_entity_id)
    end
  end

  def verify_can_username_password
    user = find_user
    return unless user&.requires_sso_signin?
    redirect_to sso_url(host: Rails.application.routes.default_url_options[:host], email: sign_in_params[:email]), alert: "Please log in using SSO", allow_other_host: true
  end

  # Method to handle IdP initiated logouts
  def saml_idp_logout_request
    settings = get_saml_settings(@idp_config)
    logout_request = OneLogin::RubySaml::SloLogoutrequest.new(params[:SAMLRequest])

    if !logout_request.is_valid?
      error_message = "IdP initiated LogoutRequest was not valid!"
      Rails.logger.error error_message
      return render inline: error_message
    end

    email = logout_request.name_id.downcase
    Rails.logger.debug "IdP initiated saml_idp_logout_request for #{email}"

    # Actually log out this session
    user = User.find_by_email(email)
    sign_out(user) if user

    # Generate a response to the IdP.
    logout_request_id = logout_request.id
    logout_response = OneLogin::RubySaml::SloLogoutresponse.new.create(settings, logout_request_id, nil, RelayState: params[:RelayState])
    redirect_to logout_response, allow_other_host: true
  end

  # Create a SP initiated SLO
  def saml_sp_logout_request(idp_config, user)
    # LogoutRequest accepts plain browser requests w/o paramters
    settings = get_saml_settings(idp_config)

    if settings.idp_slo_service_url.present?
      email = user.email

      logout_request = OneLogin::RubySaml::Logoutrequest.new
      Rails.logger.debug "New SP SLO for userid '#{email}' transactionid '#{logout_request.uuid}'"

      settings.name_identifier_value = email

      # Save the transaction_id to compare it with the response we get back
      session[:transaction_id] = logout_request.uuid

      relay_state = saml_logout_url
      redirect_to(logout_request.create(settings, RelayState: relay_state), allow_other_host: true)
    end
  end

  def saml_process_logout_response
    return redirect_to sso_url(host: Rails.application.routes.default_url_options[:host]), alert: t(".not_found"), allow_other_host: true unless @idp_config

    settings = get_saml_settings(@idp_config)

    if session.has_key?(:transaction_id)
      logout_response = OneLogin::RubySaml::Logoutresponse.new(params[:SAMLResponse], settings, matches_request_id: session[:transaction_id])
      session.delete(:transaction_id)
    else
      logout_response = OneLogin::RubySaml::Logoutresponse.new(params[:SAMLResponse], settings)
    end

    # Validate the SAML Logout Response, but we don't do anything besides basically log it (we can't do anything about it)
    collect_errors = true
    if !logout_response.validate(collect_errors)
      Rails.logger.error "The SAML logout response is invalid: #{logout_response.errors.join(", ")}"
    end

    redirect_to sso_url(host: Rails.application.routes.default_url_options[:host]), allow_other_host: true
  end
end

```

### Gotchas

#### Switching Accounts

In PagerTree, [a user can belong to many accounts](https://pagertree.com/docs/architecture-guide#account-organization). However, we don't want users to be able to have a personal account and login via username and password and then switch to an SSO enabled account. **For SSO enabled accounts, a user should always be required to authenticate via SSO.**

So in `/app/controllers/accounts_controller.rb` we have something like this:

```ruby
def switch
# ... snip ...
      if @account.sso_config_id.present?
            # log them out and make them auth against SSO
            email = current_user.email
            sign_out(current_user)
            redirect_to sso_url(email: email, account_id: @account.id, script_name: nil), **options
      end
# ... snip ...
end
```

## Feedback

The Multi-Tenant SSO setup is a fairly advanced topic. Having done this several times before, I am sure I missed some things and could likely make other things clearer. If you have any constructive feedback you can [reach out to me on Twitter](https://twitter.com/armiiller). I can't address every comment, but with your input I will try my best to update this content to make it even clearer for others in the community.



