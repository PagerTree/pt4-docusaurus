---
date: 2022-12-15
authors: amiller
description: >-
  In this blog post you’ll learn how to build a polymorphic select box in Ruby
  on Rails. Seems trivial, but isn’t. Let me save you some time.
---

# 💎 Ruby on Rails Polymorphic Select Dropdown

Today I want to show you how to build a polymorphic select box in Ruby on Rails. Seems trivial, but it’s not. Let me show you the way and save you some time.

<!-- truncate -->

### TLDR

If you don’t have time to spare and read the background, jump down to [The Solution - The Right Way](rails-polymorphic-select-box.md#the-solution---the-right-way). The solution involves SGIDs and a utility accessor method, plus a form helper.

### Background and Why

It’s no secret, as we build out [PagerTree 4](https://pagertree.com/roadmap/2021/#major-revision-4) we’ve made the design decision to use [Ruby on Rails](https://rubyonrails.org/) as our framework of choice. Why you ask? Ruby on Rails is a stable, battle-tested, and relatively simple MVC framework. Some of the largest companies ([Stripe](https://stripe.com/), [Instacart](https://www.instacart.com/), [Shopify](https://www.shopify.com/), and [Zendesk](https://www.zendesk.com/) just to name a few) use the Ruby on Rails framework for their application. As we think about the next chapter of PagerTree, the ease for new developers to work on PagerTree should follow standard conventions and tools.

Now to the PagerTree specific issue at hand. In PagerTree, we have many models (think alerts, broadcasts, ect.). Those objects can be assigned/routed to many different other objects. So for this example, a broadcast message can be sent to users, teams, and stakeholders; we’ll call these “broadcast recipients”.

With as mature as Ruby on Rails framework is, one would make the assumption that there was a standard and simple way to implement this, however, what I found that there was not (at least in this use-case, with a linker model, namely our broadcast recipient). I spent a couple hours researching and fumbling through some code when I decided I would ask Chris Oliver for some help on this issue (Chris, also known as [@excid3](https://twitter.com/excid3) on the internet, is the founder of [GoRails - a great educational platform for the Ruby on Rails community](https://gorails.com/)). As you can see below, I thought this would be a 10 minute call, turns out it turned into a 45 minute call with a solution that was way more complex than I expected.

The solution involves using signed global ids and a utility method to set the broadcast recipients. Today I write this blog post in helps that it can save you time, and you can implement a polymorphic select box in Rails in a clean and secure manner.

### Initial Setup - The Wrong Way

My initial setup looked something like this: A broadcast can be created with many broadcast recipients. The broadcast recipient could be a user, team, ect. The broadcast controller only accepts “permitted” params, builds the broadcast and saves it to the database.

```ruby title="app/models/broadcast.rb"
class Broadcast < ApplicationRecord
  # more properties here, ommitted for brevity...
  has_many :broadcast_recipients, dependent: :destroy # users, teams, stakeholders, ect.
  accepts_nested_attributes_for :broadcast_recipients, allow_destroy: true
end
```

```ruby title="app/models/broadcast_recipient.rb"
class BroadcastRecipient < ApplicationRecord
  belongs_to :broadcast
  belongs_to :recipient, polymorphic: true
end
```

```ruby title="app/controllers/broadcasts_controller.rb"
class BroadcastsController < ApplicationController
  # more properties here, ommitted for brevity...

  # POST /broadcasts
  def create
    @broadcast = Broadcast.new(broadcast_params)

    if @broadcast.save
      redirect_to @broadcast, notice: t(".success")
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def broadcast_params
    params.require(:broadcast).permit(:title, :description, broadcast_recipients: [:recipient])
  end

  # ...
end
```

```erb
# /app/views/broadcasts/_form.html.erb
<%= form.select :broadcast_recipients, grouped_options_for_select({ "Users" => current_account.users, "Teams" => current_account.teams}) %>
```

It’s a pretty standard setup. I would have expected that Rails would know what do when our end-user selected a user or a team, but it didn’t. What was actually sent back by the form were the `id` of the User/Team. Well that’s a big problem. Server-side we don’t know what kind of object it was, and therefore don’t know was it User #1 or Team #1. You get the point.

I also made the assumption, that Rails would automatically just know the type of object, and it probably would have in a normal situation. The problem stems from the fact that the broadcast recipient is a linker model, **Rails didn’t know how to populate the polymorphic linker model**.

### The Solution - The Right Way

Enter [Global Ids](https://github.com/rails/globalid) (I believe this is already included in Rails 6.2+). It looks like `gid://YourApp/Some::Model/id`. It has the ability to uniquely identify a model by keeping its type and id.

> A Global ID is an app wide URI that uniquely identifies a model instance

So essentially, I could make a select box with Global Ids, then the user could pick what they wanted and submit them back to our server. That’s a great start, but what happens if they modify the HTML and inject a different kind of model that shouldn’t be able to receive a broadcast (ex: an integration)? Even worse, what if the user is malicious, and starts injecting random models to see what they can poke around with (ex: AdminUser)? Eeek! We don’t want that.

Luckily though, there is also a version of Global Ids that are signed, namely Signed Global Ids (SGIDs). This would make it really hard for a malicious user to figure out the global id, or to inject their own. What’s even better is that Secure Global Ids are signed with a expire time. This means, they are not forever, and they will never generate the same SGID with repeated calls.

> It’s worth noting that expiring SGIDs are not idempotent because they encode the current timestamp; repeated calls to to\_sgid will produce different results.

The final solution looks like the following (notice the utility function to set the recipient\_users and recipient teams).

```ruby title="app/models/broadcast.rb"
class Broadcast < ApplicationRecord
  # more properties here, ommitted for brevity...
  BROADCAST_RECIPIENT_CLASSES = [User, Team]
  has_many :broadcast_recipients, dependent: :destroy # users, teams, stakeholders, ect.
  has_many :recipient_users, through: :broadcast_recipients, source: :recipient, source_type: 'User'
  has_many :recipient_teams, through: :broadcast_recipients, source: :recipient, source_type: 'Team'

  # Setter method, taking in SGIDs
  def recipient_sgids=(sgids)
    array_sgids = Array.wrap(sgids).reject(&:empty?)
    recipients = GlobalID::Locator.locate_many_signed(array_sgids, only: BROADCAST_RECIPIENT_CLASSES)
    grouped = recipients.group_by(&:class)
    
    # We need to manually specify this here by class, so we don't get any bad actors injecting any classes
    BROADCAST_RECIPIENT_CLASSES.each do |klass|
      self.send("recipient_#{klass.name.underscore.pluralize}=", grouped[klass] || [])
    end
  end

  # Getter method to get the signed ids for the select box
  def recipient_sgids
    broadcast_recipients.map{|r| r.recipient.to_sgid.to_s }
  end
end
```

```ruby title="app/models/broadcast_recipient.rb"
class BroadcastRecipient < ApplicationRecord
  belongs_to :broadcast
  belongs_to :recipient, polymorphic: true
end
```

```ruby title="app/controllers/broadcasts_controller.rb"
class BroadcastsController < ApplicationController
  # more properties here, ommitted for brevity...
  private

  # Only allow a list of trusted parameters through.
  def broadcast_params
    params.require(:broadcast).permit(:title, :description, recipient_sgids: [])
  end

  # ...
end
```

```erb title="app/views/broadcasts/_form.html.erb.rb"
<%= form.select(:recipient_sgids, grouped_options_for_select(broadcastable_options(current_account, broadcast)), { }, multiple: true, "data-slim-select-target": "input") %>
```

We also need to add a helper for our view, that sets the selected property. Because the SGIDs change on every call, we have to manually check if the broadcast had them already selected. Yes, this is not very efficient, but its a sacrifice we are willing to pay for security.

```ruby
module BroadcastsHelper
  def broadcastable_options(account, broadcast)
    { 'Users' => account.users.map{|u| [u.name, u.to_sgid.to_s, {selected: broadcast.recipient_user_ids.include?(u.id) }] } },
    { 'Teams' => account.teams.map{|t| [t.name, t.to_sgid.to_s, {selected: broadcast.recipient_team_ids.include?(t.id) }] } }
  end
end
```

### Conclusion

In short, a polymorphic select box using linker models in Ruby on Rails is not so trivial. Using SGIDs and a utility accessor method we can make a polymorphic select box that simple and secure. I hope you’ve found value in this article and it has saved you some time :)
