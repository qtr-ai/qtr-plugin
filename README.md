# QTR for Claude

[QTR](https://qtr.ai) is a planner built around Working Backwards: goals for the quarter, a plan for each week, then the day's tasks. This plugin lets Claude work in your QTR account. Claude can read and change your tasks, goals, notes, lists, focus sessions, calendars and connected apps, and work with Ansel, QTR's assistant: the daily brief, goal and quarter status, time blocks, routines, memory and the changes waiting for your approval.

You need a QTR account on the Pro plan or a Pro trial.

## What's inside

- **The QTR connector**: QTR's remote MCP server at `https://prodapi.qtr.ai/mcp/sse`. You sign in to QTR with Google the first time Claude uses it.
- **The `qtr` skill**: how QTR works (periods, goal maps, the desk, Ansel's proposals), the rules Claude follows before changing anything, and a list of every tool, by area.

The plugin has no hooks, scripts or local servers. It runs nothing on your machine.

## Install

**Claude Code**

```
claude plugin marketplace add qtr-ai/qtr-plugin
claude plugin install qtr@qtr-ai
```

Then run `/mcp` and sign in to QTR.

**Codex, Cursor, GitHub Copilot and other agents that read skills**

```
npx skills add qtr-ai/qtr-plugin
```

Then add the connector `https://prodapi.qtr.ai/mcp/sse` in that agent's MCP settings.

## Updates

When we change the skill, the QTR connector tells Claude, and Claude lets you know once, with what changed and how to update.

- **claude.ai, Claude Desktop and Cowork** update the plugin by themselves.
- **Claude Code**: run `claude plugin update qtr@qtr-ai`, or turn on auto-update under `/plugin` → Marketplaces → `qtr-ai` → Enable auto-update.
- **Other agents**: run `npx skills update`.

What changed in each version is in [CHANGELOG.md](CHANGELOG.md).

## What data goes where

- Claude talks to QTR only through the connector, over HTTPS, signed in with OAuth. The token lets Claude act as you in QTR, and nothing else.
- Requests go to `prodapi.qtr.ai`. QTR stores your data as described in its [privacy policy](https://qtr.ai/privacy).
- Tool calls run as soon as Claude makes them. Ansel's approval cards exist only inside the QTR app. The skill tells Claude to ask you before anything that deletes, changes many things at once, or reaches other people. Tools that change or remove data are marked so Claude and ChatGPT ask before each call.
- To disconnect, remove the connector in Claude. You can also connect with read-only access, which lists only the tools that read.

## Help

- Help center: [help.qtr.ai](https://help.qtr.ai)
- Terms: [qtr.ai/terms](https://qtr.ai/terms)
- Privacy: [qtr.ai/privacy](https://qtr.ai/privacy)

## License

MIT
