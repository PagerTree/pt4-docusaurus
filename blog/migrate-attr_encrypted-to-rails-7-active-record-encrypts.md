---
date: 2022-12-15
authors: amiller
description: >-
  In this guide, I’ll show you how to migrate away from attr_encrypted to the
  new Active Record encrypts.
---

# 💎 Migrate attr_encrypted to Rails 7 Active Record encrypts

Rails 7 has introduced [Active Record Encryption](https://edgeguides.rubyonrails.org/active\_record\_encryption.html), functionality to transparently encrypt and decrypt data before storing it in the database. This is awesome news for any developer who has ever had to encrypt data before storing it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Now arriving in Rails 7: Active Record Encryption, created by <a href="https://twitter.com/jorgemanru?ref_src=twsrc%5Etfw">@jorgemanru</a>. Designed for, and extracted from, <a href="https://twitter.com/heyhey?ref_src=twsrc%5Etfw">@heyhey</a> email. <a href="https://t.co/PMW0ROojX1">https://t.co/PMW0ROojX1</a></p>&mdash; Jeremy Daer (@bitsweat) <a href="https://twitter.com/bitsweat/status/1377737091396759554?ref_src=twsrc%5Etfw">April 1, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

In this guide, I will walk you through an example to migrate from away from using attr\_encrypted gem to the new Rails 7 Active Record encrypts. We will do this using [strong migrations](https://github.com/ankane/strong\_migrations) and also maintain the ability to perform a database rollback without data loss.

<!-- truncate -->

## TLDR <a href="#tldr" id="tldr"></a>

If you are short on time, below is the crux of this article. If you are actually implementing this, I would highly encourage you to read on, this can be a **fairly complex migration**.

### Important notes <a href="#important-notes" id="important-notes"></a>

* This article is written on 13 April 2021 - Currently Rails 7 is Edge (aka alpha). This tutorial makes certain assumptions based on that. I will publish updates when Rails 7 is officially released.
* attr\_encrypted and Active Record encrypts are not compatible - you’ll need to use a [fork of attr\_encrypted](https://github.com/PagerTree/attr\_encrypted)
* devise - currently needs the `patch-2` branch to work with Rails 7

### Basic Process <a href="#basic-process" id="basic-process"></a>

1. Upgrade to Rails 7
2. Add dynamic attributes to model
3. Perform Migrations
4. Delete attr\_encrypted gem dependency

## Background <a href="#background" id="background"></a>

Most applications at some point in time need to encrypt data before storing it to the database (and conversely decrypt it before using it in the application). Historically there have been 2 gems that were fairly popular for this sort of functionality, namely [attr\_encrypted](https://github.com/attr-encrypted/attr\_encrypted) and [lockbox](https://github.com/ankane/lockbox). I personally have preferred lockbox since its still actively maintained and used less columns, but if you are like me you can’t always choose whats handed to you.

Unfortunately, the attr\_encrypted gem is no longer maintained has a lot of name clashes with the Rails 7 Active Record encrypts functionality. To work around this, we had to create a fork and rename many of the function calls and properties (namely encrypt, decrypt, ect.). **You too will need to use the** [**PagerTree fork**](https://github.com/PagerTree/attr\_encrypted) **of the attr\_encrypted gem during your migration process (but don’t worry, you can delete it after your migration).**

## Upgrade to Rails 7 <a href="#upgrade-to-rails-7" id="upgrade-to-rails-7"></a>

You’ll first need to upgrade to Rails 7. As of this writing (13 April 2021), Rails 7 is Edge. This tutorial will use syntax and functionality that is currently in alpha.

In your gem file you’ll need to change:

```ruby title="Gemfile"
# Use edge rails, currently 7.0
gem 'rails', github: 'rails/rails'
# Until this is officially release in devise, we need to use the fixed branch
gem "devise", github: "ghiculescu/devise", branch: 'patch-2'
# attr_encrypted is no longer maintained. There are lots of function names that clash with 
# Rails 7 encrypts functionality. This branch has renamed the conflicting functions 
# you will be able to remove this after the migration
gem "attr_encrypted", github: "PagerTree/attr_encrypted", branch: "rails-7-0-support"
```

And then make sure to install the new dependencies, and update any others.

```bash
bundle install
bundle update
```

At this point, we now have Rails 7 installed, with a compatible version of attr\_encrypted.

### Add Rails 7 Active Record encrypts keys <a href="#add-rails-7-active-record-encrypts-keys" id="add-rails-7-active-record-encrypts-keys"></a>

Following encrypts documentation, you’ll need to [add some keys to your rails credentials file](https://edgeguides.rubyonrails.org/active\_record\_encryption.html#setup).

```bash
bin/rails db:encryption:init
```

Copy the output YAML and paste it into your credentials file. It should look something like this:

```yaml
active_record_encryption:
  primary_key: EGY8WhulUOXixybod7ZWwMIL68R9o5kC
  deterministic_key: aPA5XyALhf75NNnMzaspW7akTfZp0lPY
  key_derivation_salt: xEY0dt6TZcAMg52K7O84wYzkjvbA62Hz
```

You’ll need to do this once for each environment (normally development, staging, production).

```bash
rails credentials:edit --environment=development
```

At this point, the Active Record encrypts should be ready to go.

## Migrate attr\_encrypted <a href="#migrate-attr_encrypted" id="migrate-attr_encrypted"></a>

The next steps will be to migrate any data that was previously using attr\_encrypted to use the new encrypts methods. Because we want to be secure and also use strong migrations our process should look like this:

1. Modify our model to dynamically define attributes to use during our migration
2. Create a new temporary column for our old encrypted data (attr\_encrypted)
3. Copy old encrypted data to new temporary column, and delete old column
4. Add a new column for our Rails 7 Active Record encrypts data
5. Run a migration to programmatically decrypt attr\_encrypted temporary column and put it in Rails 7 Active Record encrypts column
6. Delete temporary column

Seems like a lot of overkill, but we do it this way so we don’t perform any dangerous database activity and make strong migrations happy. This process will also keep our migrations backward compatible and prevent data loss in case we ever need to rollback.

### Assumption <a href="#assumption" id="assumption"></a>

I’m going to make the assumption you are fairly dangerous when it comes to coding, and you are relatively familiar with the rails framework. Please use this example as a guide. You’ll need to make modifications to your own code to make this work for you..

Below, is what I will assume is our starting point. We have a `User` model that has an attribute called `otp_secret` (stands for “one time password secret”, for two factor authentication).

```ruby
class User < ApplicationRecord
    ...
    attr_encrypted :otp_secret, key: Base64.decode64(Rails.application.credentials.otp_secret_encryption_key)
end
```

The `otp_secret` property currently uses attr\_encrypted. This means in our database we should have the following columns:

| column\_name               | column\_type |
| -------------------------- | ------------ |
| encrypted\_otp\_secret     | :string      |
| encrypted\_otp\_secret\_iv | :string      |

We’ll take advantage of the fact that attr\_encrypted prefixed its column names with “encrypted”. By copying our data into a temporary column, we can avoid name clashes, and use the encrypts functionality almost transparently (you’ll see below how the names will come full circle).

### Modify model to use dynamic attributes <a href="#modify-model-to-use-dynamic-attributes" id="modify-model-to-use-dynamic-attributes"></a>

We need to add some extra code to dynamically define attributes. During the migration, only two of these columns will ever exist at a time, making it so that we can migrate our columns without name clashing.

```ruby
class User < ApplicationRecord
...
  if column_names.include? "encrypted_otp_secret"
    attr_encrypted :otp_secret, key: Base64.decode64(Rails.application.credentials.otp_secret_encryption_key)
  end

  if column_names.include? "encrypted_otp_secret_2"
    attr_encrypted :otp_secret_2, key: Base64.decode64(Rails.application.credentials.otp_secret_encryption_key)
  end

  if column_names.include? "otp_secret"
    encrypts :otp_secret 
  end
end
```

### Create a Temporary Column <a href="#create-a-temporary-column" id="create-a-temporary-column"></a>

The temporary column will just hold a copy of our existing attr\_encrypted field. We move data here for strong migrations and so the Rails 7 encrypts column doesn’t conflict with the attr\_encrypted accessor.

```bash-session
rails g migration AddEncryptedColumnToUsers
```

```ruby
class AddEncryptedColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :encrypted_otp_secret_2, :string
    add_column :users, :encrypted_otp_secret_2_iv, :string
  end
end
```

### Copy attr\_encrypted columns <a href="#copy-attr_encrypted-columns" id="copy-attr_encrypted-columns"></a>

You’ll want to create a new migration that copies the original attr\_encrypted column to the one we just created, but you’ll want to make sure you define both `up` and `down` so that you can have backward compatibility.

```bash-session
rails g migration CopyEncryptedColumnsOnUsers
```

```ruby
class CopyEncryptedColumnsOnUsers < ActiveRecord::Migration[7.0]
  def up
    User.update_all("encrypted_otp_secret_2=encrypted_otp_secret")
    User.update_all("encrypted_otp_secret_2_iv=encrypted_otp_secret_iv")
    safety_assured {
      remove_column :users, :encrypted_otp_secret
      remove_column :users, :encrypted_otp_secret_iv
    }
  end

  def down
    add_column :users, :encrypted_otp_secret, :string
    add_column :users, :encrypted_otp_secret_iv, :string
    User.update_all("encrypted_otp_secret=encrypted_otp_secret_2")
    User.update_all("encrypted_otp_secret_iv=encrypted_otp_secret_2_iv")
  end
end
```

### Add Rails 7 Active Record encrypts columns <a href="#add-rails-7-active-record-encrypts-columns" id="add-rails-7-active-record-encrypts-columns"></a>

Now we’ll add a new column, where we will store the Rails 7 Active Record encrypts data.

It’s important that the column be of type `:text`. The [rails guides specify that the column should be at least 510 bytes](https://edgeguides.rubyonrails.org/active\_record\_encryption.html#declaration-of-encrypted-attributes).

```
rails g migration AddOtpSecretToUsers
```

```ruby
class AddOtpSecretToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :otp_secret, :text
  end
end
```

This takes full advantage of the previous attr\_encrypted nomenclature. After the migration, we should be able to access the opt\_secret still by using `user.otp_secret`. See how that just came full circle :wink:

### Migration data from attr\_encrypted to encrypts <a href="#migration-data-from-attr_encrypted-to-encrypts" id="migration-data-from-attr_encrypted-to-encrypts"></a>

In this step, we generate a migration to move data from the attr\_encrypted property to the Rails 7 Active Record encrypts property. We have to do this programmatically (and can’t do a shortcut db command) because it is the rails engine is what is actually doing the `encrypt` and `decrypt` work for us.

Additionally, we do some special reloading of the `User` model because of how we have dynamically defined attributes (Again, this is meant just to be temporary while we migrate).

```bash-session
rails g migration PortAttrEncryptedToEncrypts
```

```ruby showLineNumbers
class PortAttrEncryptedToEncrypts < ActiveRecord::Migration[7.0]
  def up
    reload_user_model
    User.all.each do |u|
      # takes the attr_encrypted properties and puts in the Rails 7 properties
      # must do this programmatically because thats how encryption happens.
      # We can't shortcut this via a db command
      u.otp_secret = u.otp_secret_2
      u.save!
    end
    reload_users_model
  end

  def down
    reload_users_model
    User.all.each do |u|
      # takes the Rails 7 properties and puts in the attr_encrypted properties
      # must do this programmatically because thats how encryption happens.
      # We can't shortcut this via a db command
      u.otp_secret_2 = u.otp_secret
      u.save!
    end
    reload_users_model
  end

  def reload_users_model
    # We must do this because of how the User model is
    # dynamically defined
    User.reset_column_information
    Object.send(:remove_const, "User")
    load "app/models/user.rb"
  end
end
```

### Remove Temporary Column <a href="#remove-temporary-column" id="remove-temporary-column"></a>

Our last step is to remove our temporary column, so our database is kept nice and clean. Again, we define the `up` and `down` methods in this migration so we are backward compatible, and if for any reason we can go back in time and re-create our data.

```bash
rails g migration RemoveAttrEncryptedColumnsFromUsers
```

```ruby
class RemoveAttrEncryptedColumnsFromUsers < ActiveRecord::Migration[7.0]
  def up
    safety_assured {
      remove_column :users, :encrypted_otp_secret_2
      remove_column :users, :encrypted_otp_secret_2_iv
    }
  end

  def down
    add_column :users, :encrypted_otp_secret_2, :string
    add_column :users, :encrypted_otp_secret_2_iv, :string
  end
end
```

## Run your migrations <a href="#run-your-migrations" id="run-your-migrations"></a>

Now you should be able to run all your newly created migrations with one swift command.

```bash
rails db:migrate
```

If it worked, congrats :smile: If for some reason it doesn’t work, check the error output. It could be a simple syntax error, or something specific to your setup. Here is where I am counting on you to be dangerous and figure out what could have happened.

## Remove attr\_encrypted dependancy <a href="#remove-attr_encrypted-dependancy" id="remove-attr_encrypted-dependancy"></a>

You can now safely remove the attr\_encrypted dependancy in your gem file. However, be aware that this will break existing process of `rails db:create db:setup` (for example in development). You’ll likely want to use `rails db:setup` instead so that it loads from the schema file and at some point [squash your migrations](https://www.google.com/search?q=rails+squash+migrations) directory.

***

I hope you find some value in this tutorial and it can save you time and effort when it comes to migrating away from attr\_encrypted. There’s probably a lot I missed on here, so if you have something to add you can reach out to me on [twitter](https://twitter.com/armiiller) and I will update the article with your suggestion.

***

## Other Notes <a href="#other-notes" id="other-notes"></a>

Some other notes on snags I came across during development.

**Problems when creating a database with Devise and Rails 7 Active Record Encrypts**

The Rails 7 Active record encrypts seems to break `db:create` when used in conjunction with Devise. Didn’t dig too far into this, but Rails complains that the encrypts modifier can’t properly check the database column size. Makes sense since there currently is no database, but it did force me to create a hack on the user model. It didn’t seem to affect other models that didn’t interact with Devise.

I assume this will get fixed at some point and is just a Devise + Edge (alpha) thing.

```ruby
# Only declare encrypts attributes when we have a database
if (::ActiveRecord::Base.connection_pool.with_connection(&:active?) rescue false)
  encrypts :otp_secret
end
```
