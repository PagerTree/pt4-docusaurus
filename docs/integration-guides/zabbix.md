---
description: >-
  Connect your Zabbix monitoring tool to PagerTree. Send alerts from Zabbix to
  PagerTree for incident management and on-call scheduling.
---

# Zabbix

| Company | Estimated Time | Vendor Docs | Open Source |
| ------- | -------------- | ----------- | ----------- |
| [Zabbix LLC](https://www.zabbix.com/) | ~5 minutes | [Docs](https://www.zabbix.com/documentation/current/en/manual/config/notifications/media/webhook) | [v3.rb](https://github.com/PagerTree/pager_tree-integrations/blob/main/app/models/pager_tree/integrations/zabbix/v3.rb) |

## What is the Zabbix Integration?

The [Zabbix](https://www.zabbix.com/) integration allows you to forward alerts from Zabbix into PagerTree. PagerTree then routes these alerts to the appropriate on-call engineer or team.

## How It Works
- Zabbix detects problems and generates alerts.  
- These alerts trigger **webhooks** that send data to PagerTree.  
- PagerTree processes the alert and creates or resolves an incident.  

### Event Mapping
- `TRIGGER`, `SERVICE`, `INTERNAL` → create/resolve alerts in PagerTree  
- `DISCOVERY`, `AUTOREGISTRATION` → create alerts in PagerTree  

## Integration Walkthrough

Estimated setup time: **~5 minutes**.

Prerequisites:  
- A PagerTree account  
- A running Zabbix instance  

### In PagerTree
1. [Create the integration](introduction.md#create-an-integration) by selecting the **Zabbix logo**.  
2. Copy the **Endpoint URL** (e.g. `https://api.pagertree.com/integration/int_xxxyyyzzz`).  

### In Zabbix

#### Create the Global Macro
1. Go to *Administration → Macros*.  
2. Add a global macro `{$ZABBIX.URL}` containing the Zabbix frontend URL.  
   - Must include protocol (`http://` or `https://`).  
   - Port is optional.  
   - You may need `/zabbix` at the end, depending on your setup.  

✅ Good examples:  
- `http://zabbix.com`  
- `https://zabbix.lan/zabbix`  
- `http://127.0.0.1:8080`  

❌ Bad examples:  
- `zabbix.com`
- `https://zabbix.com/`
- `http://zabbix/`  

#### Install the PagerTree Media Type
1. Go to *Alerts → Media types*.  
2. Import [`media_pagertree.yaml`](https://github.com/PagerTree/zabbix/blob/feat-pagertree-integration/templates/media/pagertree/media_pagertree.yaml).
<figure>![Import the PagerTree Media Type](<../.gitbook/assets/zabbix-media-types-import-yaml.png>)<figcaption><p>In the Admin Center, click Webhooks.</p></figcaption></figure>
3. Enable it by checking the box and clicking **Enable**.
<figure>![Enable the PagerTree Media Type](<../.gitbook/assets/zabbix-media-types-enable.png>)<figcaption><p>In the Admin Center, click Webhooks.</p></figcaption></figure>

#### Create a Zabbix User & Add Media
1. Go to *Users → Users* → **Create user**.  
   - Fill in the required fields on the *User* tab.  
2. On the *Media* tab:  
   - Add new media, select **PagerTree** as the type.  
   - In **Send to**, paste the PagerTree endpoint URL you copied earlier.  
   <figure>![Zabbix User Configured Media Type](<../.gitbook/assets/zabbix-user-configured-media-type.png>)<figcaption><p>In the Admin Center, click Webhooks.</p></figcaption></figure>
3. Ensure this user has access to all hosts where you want alerts forwarded.  

### Test the Integration
1. In Zabbix, create a **test trigger** (e.g. CPU load > 0.01) on a monitored host.  
2. Verify that Zabbix sends an alert through the PagerTree media type.  
3. In PagerTree, confirm that a new alert appears in your dashboard.  

✅ If the alert shows up, the integration is working correctly.  

---

🎉 Done! Zabbix is now sending alerts into PagerTree for incident management.
