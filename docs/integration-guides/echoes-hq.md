---
description: Send your PagerTree alerts to Echoes HQ.
---

# Echoes HQ

| Company                                     | Estimated Time | Vendor Docs                                                                            | Open Source                                                                                                                |
| ------------------------------------------- | -------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Echoes HQ Inc.](https://www.echoeshq.com/) | 1 minute       | [view](https://echoeshq.stoplight.io/docs/public-api/51f6f1a2876ca-create-an-incident) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/echoes_hq/v3.rb) |

## What is Echoes HQ?

[Echoes HQ](https://www.echoeshq.com/) gives comprehensive insights into your teams to understand how they are progressing and spot bottlenecks and areas of improvement.

## **How It Works**

PagerTree sends your PagerTree alerts to Echoes HQ when:

* `alert.created`- When an alert is created in PagerTree, PagerTree will create an incident in Echoes HQ.
* `alert.acknowledged`- When an alert is acknowledged in PagerTree, PagerTree will update the incident in Echoes HQ.
* `alert.resolved`- When an alert is resolved in PagerTree, PagerTree will update the incident in Echoes HQ.

## Integration Walkthrough

This integration tutorial will show you how to connect PagerTree to Echoes HQ. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree and Echoes HQ account setup.

### In Echoes HQ

1. [Create an API Key](https://docs.echoeshq.com/api-authentication#ZB9nc) in Echoes HQ.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Echoes HQ logo**.
2. **Paste** your newly created Echoes HQ **API Key** into PagerTree.
3. Click **Create**.

***

You have successfully completed the Echoes HQ Integration.

***
