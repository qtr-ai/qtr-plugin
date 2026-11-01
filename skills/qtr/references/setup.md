# Connecting to QTR

## Contents

- [The connector](#the-connector)
- [Connect from Claude, ChatGPT or Claude Code](#connect-from-claude-chatgpt-or-claude-code)
- [Read-only connections](#read-only-connections)
- [Plan limits](#plan-limits)
- [The REST API](#the-rest-api)
- [Errors](#errors)

## The connector

The QTR connector is an MCP server at:

```
https://api.qtr.ai/mcp/sse
```

The same address takes the Streamable HTTP transport (POST) and the older SSE transport (GET). Any QTR account can connect, Free or Pro. A Free account has the Free plan's limits on tasks, goals and monthly AI use.

Sign-in is OAuth. QTR opens its own page, shows which site asked and the access level, and the user continues with Google. The sign-in requires PKCE with S256, and the callback must be on claude.ai, claude.com, chatgpt.com or localhost.

## Connect from Claude, ChatGPT or Claude Code

- **Claude or ChatGPT:** Settings → Connectors → add a custom connector with the address above, then sign in when asked.
- **Claude Code with the QTR plugin:** the plugin brings the connector with it. Run `/mcp` and sign in.
- **Claude Code without the plugin:**
  ```
  claude mcp add --transport http qtr https://api.qtr.ai/mcp/sse
  ```
  Then run `/mcp` and sign in.

To disconnect, remove the connector in the app. QTR has no hand-made API tokens; the sign-in is the only way in.

## Read-only connections

There are two ways to connect read-only:

- Add `https://api.qtr.ai/mcp/readonly` instead of `/mcp/sse`. That address lists only the read tools, whatever the sign-in allows.
- An app may ask for read-only access (`scope=read`). That connection lists only the read tools too.

On a read-only connection, a write tool answers "This QTR connection can only read. Reconnect QTR with write access to make changes." To make changes, the user removes the connector and connects again with read and write, at `/mcp/sse`.

## Plan limits

The Free plan has the same limits through the connector as in the app:

| What | Free | Pro |
|---|---|---|
| Tasks | 50 a month | No limit |
| Goals | 10 in total | No limit |
| Projects | 3 a month | No limit |
| Notes | 50 a month | No limit |
| QTR's own AI, when a tool uses it | 5,000 tokens a month | No limit |

Tasks that come in from calendars and connected apps don't count. A tool that would go over a limit refuses with the reason, and creates nothing past it. Moving from Free to Pro counts from the next call, with no need to reconnect.

The connector has no rate limit of its own.

## The REST API

For scripts, send the sign-in's access token as `Authorization: Bearer <token>`. The base URL is `https://api.qtr.ai`.

```
GET   /ai/tasks/today
GET   /ai/tasks/week
GET   /ai/tasks/overdue
GET   /ai/goals
GET   /ai/search?q=<words>
POST  /ai/tasks             {"title":"...","dueDate":"2026-11-03T09:00:00","priority":"important","isUrgent":true}
POST  /ai/notes             {"content":"...","title":"optional"}
POST  /ai/journals          {"content":"...","title":"optional"}
PATCH /ai/tasks/<id>        {"title":"...","dueDate":"...","priority":"important"}
PATCH /ai/tasks/<id>/complete
```

A read-only token can only use the GET routes. Everything else goes through the connector.

## Errors

| What you get | What it means | What to do |
|---|---|---|
| 401 | The sign-in expired or was revoked | Ask the user to reconnect QTR |
| 402, or a message that a limit is reached | A Free account used up its tasks, goals or monthly AI use | Say which limit; Pro lifts it (`open_upgrade`, or app.qtr.ai) |
| "This QTR connection can only read" | A read-only connection | They reconnect with write access |
| "...is not turned on for this account", "Background agents are switched off" | That feature is off | Say so; don't retry |
| "QTR isn't open on the user's desk" | `get_desk` or `ui_command` with no QTR open | Ask them to open QTR, then try again |
| `{ error: "..." }` from a tool | The tool refused, with a reason | Tell the user the reason in plain words; search again if an id was wrong |
| 403 on a REST call | A read-only token on a write route, or someone else's item | Don't retry |
