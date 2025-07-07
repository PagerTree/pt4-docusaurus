---
date: 2025-05-05
authors: amiller
description: >-
  The PagerTree Command Line Interface (CLI) is here! Manage alerts and
  integrations from your terminal with this open-source tool. Try it today!
---

# 📣 Meet the PagerTree CLI: Your New On-Call Sidekick!

Today, we are excited to release the all-new **PagerTree Command Line Interface (CLI)**, a slick tool for managing alerts and integrations from your terminal.

The PagerTree CLI is all about speed and "scriptability". Automate alert handling in scripts, manage integrations in seconds, and stay in your terminal flow. Plus, it’s [open-source on GitHub](https://github.com/PagerTree/pager_tree-cli) so you can tweak it to your heart’s content. Check out the [docs](https://pagertree.com/docs/cli/command-line-interface) to dive in!

![PagerTree Command Line Interface (CLI) screenshot](<.gitbook/assets/image (26).png>)

<!-- truncate -->

## Command Line Interface (CLI) Features

Here’s an overview of what the PagerTree CLI can do:

* **Windows and Linux Support**: Written in Python and wrapped as an executable, the CLI can be run on Windows (`pagertree.exe` ) and Linux (`pagertree`) for cross-platform support.
* **Clean Outputs**: List and search commands support paginated results (`--limit` and `--offset`) and tidy tables.
* **Search**: List commands support search.
* **Alerts**: Create, list, show, acknowledge, and resolve alerts easily. Filter by status to cut through the noise. Search by title or tag to find the alert you are looking for.
* **Broadcasts**: Create broadcasts from the terminal.
* **Integrations**: Enable or disable integrations.
* **Teams**: Check who is oncall for a given team.
* **Users**: Add or delete users from your PagerTree account.

### Command Examples

```bash
# Show all the integrations that are enabled
pagertree integrations list --enabled
# Disable a specific integration
pagertree integrations disable 01JTGHFAK9T4B069Y2DDYQ3471

# List the open alerts
pagertree alerts list --status open
# Search for alerts with "datadog" in the title
pagertree alerts list --search datadog

# Show me the teams in my pagertree account
pagertree teams list
# Show me who is currently oncall for a specific team
pagertree teams current-oncall 01JTGJC37Y5MZ9EQWWGTP00AWM
```

## Get Started Now

1. Download the [latest release](https://github.com/PagerTree/pager_tree-cli/releases).
2. Add your `.env` file with your `PAGERTREE_API_KEY` - [See documentation](https://pagertree.com/docs/cli/command-line-interface#env).
3. Run: `pagertree integrations list`

Let’s make on-call life easier together. Try the PagerTree CLI today!
