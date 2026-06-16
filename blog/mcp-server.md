---
date: 2026-06-16
authors: pagertree
description: "The PagerTree MCP server connects AI assistants like Claude and Cursor directly to your PagerTree account. Acknowledge alerts, manage on-call schedules, and respond to incidents using plain English."
keywords: ["pagertree mcp server", "incident management mcp", "ai on-call management", "claude pagerduty integration", "mcp server incident response", "on-call ai assistant"]
---

# 📣 PagerTree MCP Server - AI-Powered Incident Management with Claude, Cursor, and More

We just launched the **PagerTree MCP server** - an open source [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that connects AI assistants like Claude, Cursor, and Windsurf directly to your PagerTree account.

Instead of logging into dashboards, copying alert IDs, and navigating menus, you can now just ask your AI assistant: *"Who is on call right now?"* or *"Acknowledge the database alert"* - and it happens.

<!-- truncate -->

[Get started on GitHub →](https://github.com/pagertree/pagertree-mcp-server)

---

## What is the PagerTree MCP Server?

The PagerTree MCP server is a [Model Context Protocol](https://modelcontextprotocol.io) server that acts as a bridge between your AI assistant and the PagerTree API. MCP is an open standard developed by Anthropic that lets AI tools connect to external services - think of it as a universal plugin system for AI assistants.

With the PagerTree MCP server installed, your AI assistant gains direct access to your entire PagerTree account: alerts, on-call schedules, teams, integrations, maintenance windows, escalation policies, routers, notification rules, and more.

The result is an AI-powered incident management copilot that understands your on-call operations and can take action on your behalf.

---

## What Can the PagerTree MCP Server Do?

The PagerTree MCP server exposes over 80 tools covering the full PagerTree API. Here are the most common workflows:

### Incident Response

Ask your AI to surface and act on active alerts without leaving your editor or chat window:

- *"Show me all open critical alerts"*
- *"Acknowledge the most recent database alert"*
- *"Resolve all alerts that have been acknowledged for more than an hour"*
- *"Add a comment to alert 12345 - looking into this now"*

### On-Call Management

Check coverage, find gaps, and make schedule changes in seconds:

- *"Who is currently on call for the platform team?"*
- *"Show me the engineering team's on-call schedule for next week"*
- *"Override Alice's Friday shift with Bob for the SRE team"*
- *"Add a weekly repeating rotation for the backend team starting Monday"*

### Maintenance Windows

Schedule suppression windows without navigating the UI:

- *"Create a maintenance window for all Datadog integrations this Saturday from 2am to 4am UTC"*
- *"Show me all active and upcoming maintenance windows"*
- *"Delete the maintenance window scheduled for next Tuesday"*

### Team and User Management

Onboard new team members and update configurations conversationally:

- *"Create a new team called SRE with Alice and Bob as members"*
- *"Add Charlie to the platform team"*
- *"Update Alice's notification rule to call her phone after 5 minutes"*
- *"List all account users and their roles"*

### Integrations and Routing

Inspect and manage your alert pipeline:

- *"List all integrations and show which ones are disabled"*
- *"Enable the Datadog integration"*
- *"Show me the routing rules for the main router"*

---

## Why Use AI for Incident Management?

Incident response is high-stakes and time-sensitive. Every second spent navigating dashboards, looking up IDs, or switching between tools is a second not spent resolving the incident.

The PagerTree MCP server removes that friction. Your AI assistant already has context from your conversation - it knows what you're working on, what error you're investigating, and what you need. Giving it direct access to PagerTree means it can surface the right alert, check who is on call, and acknowledge the issue without breaking your flow.

For on-call engineers using AI-assisted editors like Cursor or Windsurf, this is especially powerful. You can investigate an incident, review the alert history, check escalation policies, and update the on-call schedule - all without leaving your editor.

---

## How to Set Up the PagerTree MCP Server

Getting started takes about two minutes.

### Step 1: Pull the Docker Image

```bash
docker pull ghcr.io/pagertree/pagertree-mcp-server:latest
```

### Step 2: Get Your API Token

Find your API token in your [PagerTree account settings](https://app.pagertree.com/user/settings).

### Step 3: Configure Your AI Assistant

For **Claude Desktop**, add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pagertree": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-e", "PAGERTREE_API_TOKEN=your-api-token-here",
        "ghcr.io/pagertree/pagertree-mcp-server:latest"
      ]
    }
  }
}
```

The server also supports **Cursor**, **Windsurf**, **VS Code**, **Zed**, **Claude Code**, and **Windows WSL2**. See the [full installation guide](https://github.com/pagertree/pagertree-mcp-server#installation) for platform-specific instructions.

### Step 4: Start Using It

Restart your AI assistant and ask: *"Show me my open alerts."*

---

## Read-Only Mode by Default

The PagerTree MCP server runs in **read-only mode by default** for safety. In read-only mode, your AI assistant can query and inspect your PagerTree data - alerts, schedules, teams, logs - but cannot make changes.

To enable write operations like acknowledging alerts, creating maintenance windows, or modifying schedules, set `PAGERTREE_READ_ONLY=false` in your configuration:

```json
{
  "mcpServers": {
    "pagertree": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-e", "PAGERTREE_API_TOKEN=your-api-token-here",
        "-e", "PAGERTREE_READ_ONLY=false",
        "ghcr.io/pagertree/pagertree-mcp-server:latest"
      ]
    }
  }
}
```

This gives you full control over what your AI assistant can and cannot do.

---

## Compatible AI Assistants and Editors

The PagerTree MCP server works with any MCP-compatible AI tool:

| Tool | Config File |
| --- | --- |
| Claude Desktop | `claude_desktop_config.json` |
| Cursor | `~/.cursor/mcp.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| VS Code (Copilot) | `.vscode/mcp.json` |
| Zed | `~/.config/zed/settings.json` |
| Claude Code | CLI command |

---

## Open Source on GitHub

The PagerTree MCP server is open source under the MIT license. The full source code, installation instructions, and contribution guide are available at [github.com/pagertree/pagertree-mcp-server](https://github.com/pagertree/pagertree-mcp-server).

We welcome contributions - whether that's new tools, bug fixes, or documentation improvements.

---

## Frequently Asked Questions

### Does the PagerTree MCP server work with PagerDuty?

No - the PagerTree MCP server is built specifically for [PagerTree](https://pagertree.com). If you are currently using PagerDuty and looking for a more affordable alternative with AI-native tooling, [PagerTree starts at a fraction of the cost](https://pagertree.com/pagerduty-alternative) with the same core incident management features.

### Is the PagerTree MCP server free?

Yes - the MCP server itself is free and open source. You will need an active [PagerTree account](https://app.pagertree.com/signup) to use it.

### Do I need Docker to use the PagerTree MCP server?

Docker is the recommended installation method as it requires no runtime dependencies. If you prefer to run from source, clone the [GitHub repository](https://github.com/pagertree/pagertree-mcp-server) and run `npm install && npm run build`.

### Is my PagerTree data safe?

Yes. The MCP server communicates directly between your local machine and the PagerTree API using your existing API token. No data passes through any third-party servers. The server runs locally in a Docker container on your machine.

### Can I limit what the AI assistant can do?

Yes. Set `PAGERTREE_READ_ONLY=true` (the default) to restrict the AI to read-only operations. This prevents any modifications to your PagerTree account while still allowing full visibility into alerts, schedules, and team data.

### Which version of PagerTree API does it use?

The MCP server uses the PagerTree API v4. All endpoints require a valid API token with appropriate permissions.

---

## Get Started Today

The PagerTree MCP server is available now. Pull the Docker image, configure your AI assistant, and give your incident response workflow a serious upgrade.

- [GitHub Repository](https://github.com/pagertree/pagertree-mcp-server)
- [PagerTree API Docs](https://pagertree.com/docs/api/introduction)
- [Start a Free PagerTree Trial](https://app.pagertree.com/signup)

Questions or feedback? Reach us at [support@pagertree.com](mailto:support@pagertree.com).