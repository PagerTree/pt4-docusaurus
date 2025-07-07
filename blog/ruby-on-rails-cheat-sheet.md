---
date: 2022-12-15
authors: amiller
description: >-
  Ruby on Rails Cheat Sheet - A quick reference guide to common ruby on rails
  commands and usage.
---

# 💎 Ruby on Rails Cheat Sheet

We’ve been doing some Ruby on Rails development lately, in preparation for [PagerTree 4](pagertree-4-has-arrived.md), and we wanted to put together a Ruby on Rails Cheat sheet. This is a quick reference guide to common ruby on rails commands and usage.

<!-- truncate -->

Table of Contents:

1. [Ruby Syntax](ruby-on-rails-cheat-sheet.md#ruby-syntax)
   1. [Hashes](ruby-on-rails-cheat-sheet.md#hashes)
   2. [Safe Navigation Operator](ruby-on-rails-cheat-sheet.md#safe-navigation-operator)
   3. [ERB](ruby-on-rails-cheat-sheet.md#erb)
2. [Rails Commands](ruby-on-rails-cheat-sheet.md#rails-commands)
3. [Rake Commands](ruby-on-rails-cheat-sheet.md#rake-commands)
4. [Rails Framework](ruby-on-rails-cheat-sheet.md#rails-framework)
   1. [Migration Data Types](ruby-on-rails-cheat-sheet.md#migration-data-types)
   2. [Controller Filters](ruby-on-rails-cheat-sheet.md#controller-filters)
   3. [Model Callbacks](ruby-on-rails-cheat-sheet.md#models-callbacks)
   4. [Model Queries](ruby-on-rails-cheat-sheet.md#model-queries)
   5. [Fastest Check For Existence](ruby-on-rails-cheat-sheet.md#fastest-check-for-existence)
   6. [Application Configuration](ruby-on-rails-cheat-sheet.md#application-configuration)
   7. [Application Secrets](ruby-on-rails-cheat-sheet.md#application-secrets)
5. [Useful Things](ruby-on-rails-cheat-sheet.md#useful-things)
   1. [Gems](ruby-on-rails-cheat-sheet.md#gems)
   2. [Frameworks](ruby-on-rails-cheat-sheet.md#frameworks)
   3. [Education](ruby-on-rails-cheat-sheet.md#education)

## Ruby Syntax

### Hashes

[Hashes](http://ruby-for-beginners.rubymonstas.org/built\_in\_classes/hashes.html) were one of the most confusing things to me when first starting ruby (not because they are a new concept, but because I found the syntax very hard to read). In newer versions, syntax is very similar to JSON notification. Just know there are two versions of syntax, an older and newer one.

```ruby
# Old Syntax
{ :one => "eins", :two => "zwei", :three => "drei" }

# New Syntax
{ one: "eins", two: "zwei", three: "drei" } 
```

Also, you can have [symbols](http://ruby-for-beginners.rubymonstas.org/built\_in\_classes/symbols.html) as keys for hashes, and they **do not** lookup the same values as strings.

```ruby
# notice the colon in front of our key
hash = {:one => "eins"} 

hash[:one] # results in "eins"
hash["one"] # results in nil
```

### Safe Navigation Operator

Instead of checking for nil or undefined values, you can use the safe navigation operator. There’s a nice article [here](https://mitrev.net/ruby/2015/11/13/the-operator-in-ruby/) that goes into more depth of explanation.

```ruby
# do this
if user&.email&.verified?

# instead of this
if user && user.email && user.email.verified?
```

### ERB

**Evaluation and Output**

Evaluation can be done with the `<% %>` syntax and output can be achieved with the `<%= %>` syntax.

```ruby
<% if user.is_subscribed? %>
  You are subscribed to the <%= user.plan.name %> plan!
<% end %>
```

#### **Partials**

You can render partials like so:

```erb
<%= render partial: "shared/_nav_links" %>
```

## Rails commands

Common rails commands. (Note: “rails g” stands for “rails generate”)

| Command                                                            | Description                                                                                    |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `rails g model user name:string age:integer account:references`    | Generates model and migration files                                                            |
| `rails g scaffold user name:string age:integer account:references` | Generates controller, model, migration, view, and test files. Also modifies `config/routes.rb` |
| `rails g scaffold_controller user`                                 | Generates controller and view files. Useful if you already have the model                      |

## Rake Commands

Common rake commands for database management and finding routes.

| Command                             | Description                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `rake routes`                       | View all routes in application (pair with `grep` command for some nifty searching) |
| `rake db:seed`                      | Seed the database using the `db/seeds.rb`                                          |
| `rake db:migrate`                   | Run any pending migrations                                                         |
| `rake db:rollback`                  | Rollback a database migration (add STEP=2 to remove multiple migrations)           |
| `rake db:drop db:create db:migrate` | Destroy the database, re-created it, and run migrations (useful for development)   |

## Rails Framework

### Migration Data Types

Migration data types. Here is the [source](https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add\_column) and a [stack overflow question](https://stackoverflow.com/questions/17918117/rails-4-list-of-available-datatypes) I commonly reference.

* :boolean
* :date
* :datetime
* :decimal
* :float
* :integer
* :primary\_key
* :references
* :string
* :text
* :time
* :timestamp

### Controller Filters

Filters are methods that are run “before”, “after” or “around” a controller action. See [full action controller filters documentation](https://guides.rubyonrails.org/action\_controller\_overview.html#filters) for details.

Before filters are registered via the `before_action` and **can** halt the request cycle.

```ruby title="controllers/application.rb"
class ApplicationController < ActionController::Base
  before_action :require_login

  private

  def require_login
    unless logged_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to new_login_url # halts request cycle

    end
  end
end
```

### Models Callbacks

Gusto has a really nice article one [best practices for model callbacks](https://engineering.gusto.com/the-rails-callbacks-best-practices-used-at-gusto/).

This table references the [ruby on rails documentation for active record callbacks](https://guides.rubyonrails.org/active\_record\_callbacks.html#available-callbacks). Check out the full documentation for other special callbacks like `after_touch`.

| New Record                      | Updating Record                 | Destroying Record               |
| ------------------------------- | ------------------------------- | ------------------------------- |
| save                            | save                            | destroy                         |
| save!                           | save!                           | destroy!                        |
| create                          | update\_attribute               |                                 |
| create!                         | update                          |                                 |
|                                 | update!                         |                                 |
|                                 |                                 |                                 |
| before\_validation              | before\_validation              |                                 |
| after\_validation               | after\_validation               |                                 |
| before\_save                    | before\_save                    |                                 |
| around\_save                    | around\_save                    |                                 |
| before\_create                  | before\_update                  | before\_destroy                 |
| around\_create                  | around\_update                  | around\_destroy                 |
| after\_create                   | after\_update                   | after\_destroy                  |
| after\_save                     | after\_save                     |                                 |
| after\_commit / after\_rollback | after\_commit / after\_rollback | after\_commit / after\_rollback |

```ruby title="models/user.rb"
class User < ApplicationRecord
  # Send a welcome email after they are created
  after_create :send_welcome_email
end
```

### Model Queries

A couple of basic (and most commonly used) queries are below. You can find the full documentation [here](https://guides.rubyonrails.org/active\_record\_querying.html#retrieving-objects-from-the-database).

| Command Example                              | Description                                                    |
| -------------------------------------------- | -------------------------------------------------------------- |
| `Model.find(10)`                             | Find model by id                                               |
| `Model.find_by({ name: "Austin" })`          | Find models where conditions                                   |
| `Model.where("name = ?", params[:name])`     | Find models where condition                                    |
| `Model.where.not("name = ?", params[:name])` | Find models where condition not true                           |
| `Model.first`                                | Get the first model in the collection (ordered by primary key) |
| `Model.last`                                 | Get the lst model in the collection (ordered by primary key)   |
| `Model.order(:created_at)`                   | Order your results or query                                    |
| `Model.select(:id, :name)`                   | Select only specific fields                                    |
| `Model.limit(10).offset(20)`                 | Limit and offset (great for pagination)                        |

### **Fastest Check For Existence**

Additionally, you are likely to want to check for an existence of a condition many times. There are many ways to do this, namely present?, any?, empty?, and exists? but the `exists?` method will be the fastest. This [semaphore article](https://semaphoreci.com/blog/2017/03/14/faster-rails-how-to-check-if-a-record-exists.html) explains nicely why `exists?` is the fastest method for checking if one of a query exists.

```ruby
Model.where().exists?
```

### Application Configuration

Application configuration should be located in `config/application.rb` with specific environment configurations in `config/environments/`. **Don’t put sensitive data in your configuration files, that’s what the secrets are for.** You can access configurations in your application code with the following:

```ruby
Rails.application.config.property_name
```

### Application Secrets

Application secrets are just that, **secret** (think API keys). You can edit the secrets file using the following commands `rails credentials:edit --environment=env_name`. This will create files in the `config/credentials/` folder. You’ll get two files:

1. `environment.yml.enc` - This is your secrets encrypted - This can be put this into git
2. `environment.key` - This contains the key that encrypts the file - **DO NOT** put this into git.

Additionally, when deploying, the key inside the `environment.key` file will need to be placed into the `RAILS_MASTER_KEY` environment variable. You can then access secrets in your rails code like so:

```ruby
Rails.application.credentials[:key_name]
```

## Useful Things

A short list of gems, frameworks and education materials that I have found useful in my Rails journey.

### Gems

* [Acts as Tenant](https://github.com/ErwinM/acts\_as\_tenant) - Easy multi-tenancy for rails database models.
* [Administrate](https://github.com/thoughtbot/administrate) - Rails engine for flexible admin dashboard.
* [Devise](https://github.com/heartcombo/devise) - Flexible authentication system.
* [Devise Masquerade](https://github.com/oivoodoo/devise\_masquerade) - Provides “Login As” another user functionality for Devise.
* [Faker](https://github.com/faker-ruby/faker) - Generate fake data like names, addresses, and phone numbers. Great for test data.
* [Hash Id](https://github.com/jcypret/hashid-rails) - Expose a hashid instead of primary id to your users.
* [Local Time](https://github.com/basecamp/local\_time) - Display friendly client side local time.
* [Lockbox](https://github.com/ankane/lockbox) - ~~Encryption for database fields (model attributes)~~. Just use Rails 7 native encryption. See [Active Record Encryption](https://guides.rubyonrails.org/active\_record\_encryption.html) and [Migrate attr\_encrypted to Rails 7 Active Record encrypts](migrate-attr\_encrypted-to-rails-7-active-record-encrypts.md).
* [Pagy](https://github.com/ddnexus/pagy) - Gold standard pagination gem.
* [Rack Attack](https://github.com/rack/rack-attack) - Rack middleware (before Rails) for blocking & throttling.
* [Recaptcha](https://github.com/ambethia/recaptcha) - A rails Google Recaptcha plugin - You’ll want this one especially for public facing forms to stop bot crawlers.
* [StimulusJS](https://stimulus.hotwire.dev/) - A tiny framework for sprinkles of Javascript for your front end.
* [Sequenced](https://github.com/derrickreimer/sequenced) - Generate scoped ids (ex: per tenant ids for models, aka friendly id).
* [Sidekiq](https://github.com/mperham/sidekiq) - Redis backed background processing for jobs.
* [Sidekiq Cron](https://github.com/ondrejbartas/sidekiq-cron) - A scheduler for Sidekiq (think running weekly email reports).
* [Turbolinks](https://github.com/turbolinks/turbolinks) - Makes web app feels faster (like single page application).

### Frameworks

* [Jumpstart Rails](https://jumpstartrails.com/) - A SaaS Framework already supporting login, payment (Stripe, Paypal, and Braintree) and multi-tenant setup.
* [tailwindcss](https://tailwindcss.com/) - A utility first CSS framework. Seems a little verbose at first, but you’ll really learn to love it. Just by reading the code, you’ll know exactly what the screen will look like.

### Education

* [Go Rails](https://gorails.com/) - Ruby on Rails tutorials, guides, and screencasts.

***

I hope you find some value in this cheat sheet. There’s probably a lot I missed on here, so if you have something to add you can reach out to me on [twitter](https://twitter.com/armiiller) and I will update the article with your suggestion.
