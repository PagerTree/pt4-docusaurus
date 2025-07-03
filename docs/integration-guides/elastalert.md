---
description: Connect your ElastAlert alerts to PagerTree.
---

# ElastAlert

| Company                            | Estimated Time | Vendor Docs                                          | Open Source                                                                                                                     |
| ---------------------------------- | -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Yelp Inc.](https://www.yelp.com/) | 5 minutes      | [view](https://elastalert.readthedocs.io/en/latest/) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/elast\_alert/v3.rb) |

## What is ElastAlert?

[ElastAlert](https://github.com/Yelp/elastalert) is a simple framework for alerting on anomalies, spikes, or other patterns of interest from data in Elasticsearch.

## **How It Works**

ElastAlert triggers alerts when alerting rule conditions are met.

* When ElastAlert sends PagerTree an alert with (`event_type === "create"`), an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to send notifications from ElastAlert into PagerTree. The estimated time for this integration is 5 minutes. We assume that you already have a PagerTree and ElastAlert setup ([version v0.1.38](https://github.com/Yelp/elastalert/releases/tag/v0.1.38) or higher) and generally understand how to create rules. If you don’t, make sure to check out the [docs](https://elastalert.readthedocs.io/en/latest/index.html).

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **ElastAlert logo**.
2. [Copy the Endpoint URL](introduction.md#copy-the-endpoint-url)**.**

### **In ElastAlert**

1. In your ElastAlert rules YAML file add the following, replacing `<PagerTree Endpoint URL>` with the **PagerTree Endpoint URL** you copied earlier.

```yaml title="elastalert_pagertree_sample_rule.yaml" showLineNumbers
# Alert when the rate of events exceeds a threshold

# (Optional)
# Elasticsearch host
#es_host: localhost

# (Optional)
# Elasticsearch port
#es_port: 9200

# (Required)
# PagerTree Integration URL
pagertree_integration_url:  <PagerTree Endpoint URL>

# (OptionaL) Connect with SSL to Elasticsearch
#use_ssl: True

# (Optional) basic-auth username and password for Elasticsearch
#es_username: someusername
#es_password: somepassword

# (Required)
# Rule name, must be unique
name: pagertree_rule

# (Required)
# Type of alert.
# the frequency rule type alerts when num_events events occur with timeframe time
type: frequency

# (Required)
# Index to search, wildcard supported
index: logstash-*

#doc_type: "golog"

# (Required, frequency specific)
# Alert when this many documents matching the query occur within a timeframe
num_events: 50

# (Required, frequency specific)
# num_events must occur within this amount of time to trigger an alert
timeframe:
  hours: 2

# (Required)
# A list of Elasticsearch filters used for find events
# These filters are joined with AND and nested in a filtered query
# For more info: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl.html
filter:
- query:
    query_string:
      query: "@message: *hihi*"

# (Required)
# The alert is use when a match is found
alert:
- "pagertree"
```

1. Save the rules YAML file
2. Restart ElastAlert

You have successfully completed the ElastAlert Integration.

***
