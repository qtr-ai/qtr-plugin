---
name: qtr
description: >-
  Work in the user's QTR planner through the QTR connector. Read and change their tasks, goals and
  checkpoints, week and quarter plans, notebook, journals, lists, projects, focus timer, habit
  challenges, calendars, connected apps (Asana, Todoist, ClickUp), sharing and workspaces. Work with
  Ansel, QTR's assistant: daily brief, goal and quarter status, at-risk fixes, time blocking,
  routines, nudges, memory, and changes waiting for approval. Read or drive the desk the user has open
  in QTR. Use this skill whenever the user mentions QTR, Ansel or their desk, or asks about their own
  tasks, goals, plans, habits, focus or schedule while QTR tools are available, even if they don't say
  "QTR". Also use it to set up the QTR connector in Claude, ChatGPT or Claude Code.
compatibility: >-
  Needs the QTR MCP connector (https://api.qtr.ai/mcp/sse) and a QTR account, Free or Pro. A few REST
  routes work with the same sign-in.
metadata:
  version: "1.1.3"
---

# QTR

QTR is a planner built around Working Backwards: goals for the quarter, a plan for each week, then the day's tasks. Ansel is QTR's own assistant. The QTR connector gives you nearly everything the app and Ansel can do: about 190 tools, with names like `get_tasks`, `create_task` and `get_day_brief`.

If the QTR tools aren't available, help the user connect first. The steps are in [references/setup.md](references/setup.md).

## Keeping this skill current

This is version 1.1.3 of the QTR skill. The first time you use the QTR connector in a conversation, call `get_skill_version` with `version: "1.1.3"`.

If `upToDate` is `false`, tell the user once, before your answer: "We've made changes to the QTR skill. Please update it." Add what changed, from `changes`, and the line from `howToUpdate` for the app you're in: `claudeApps` on claude.ai, Claude Desktop or Cowork, `claudeCode` in Claude Code, `otherAgents` anywhere else. Then carry on with the request, and don't bring it up again in that conversation. Any other answer, or no answer, needs no mention.

## How QTR thinks

These ideas shape almost every call, so keep them in mind:

- **Periods, not just dates.** A task belongs to a day, a week, a month, a quarter, a year, or the inbox (no period). "This week" is a commitment for the week, not for Monday at 9. A time of day is an extra layer on top of a day.
- **Nothing moves by itself.** At midnight in the user's time zone, unfinished tasks are marked backlog and stay on their day as overdue. Moving them is a choice the user makes, and QTR offers to help.
- **Goals have maps.** A goal has checkpoints (milestones to reach) with tasks under them. Its status (on track, at risk, off track, achieved) is judged from its own tasks.
- **The desk.** In the app, the user works on a desk of cards: Today, Week, Quarter, Inbox, lists, goals, Calendar, Focus. Results often mention cards because that's where they show.
- **Ansel's changes.** Inside QTR, risky changes wait as proposals the user approves. Routines and background agents leave theirs waiting too. You can list, approve, reject, undo and redo them.
- **Workspaces.** Everyone has a personal workspace and may be in team workspaces. Tools work in the personal one. To read, add or plan in a team workspace, pass its name as `workspace` on that call. Switching workspace in the QTR app doesn't change this.

## Views in the chat

In Claude, and other apps that show MCP Apps, these tools also draw an interactive view under your reply, drawn like the cards on the QTR desk:

- `get_tasks`: the tasks, which the user can tick off; for a day, pills switch to another day of that week;
- `plan_time_blocks`: the day with its meetings and the proposed blocks, with a button that places them;
- `get_goal_map`: the goal's map as it looks in QTR, or as a list by checkpoint, with its progress; the user can tick tasks off;
- `list_pending_proposals`: each waiting change, which the user can apply, dismiss, undo or redo;
- `get_day_brief`: the morning brief or evening wrap, with the top tasks to tick off and Ansel's suggested move to accept;
- `get_quarter_status`: the quarter's goals, worst first; opening one shows its map;
- `start_focus`, `pause_focus`, `resume_focus` and `stop_focus`: the focus clock, counting down, with pause, resume and stop.

When a view shows the result, keep your reply short: say what matters, and don't list every item again. What the user does in a view runs as their own action, and the view tells you about it; take that into account instead of repeating it. If a view placed the time blocks, don't call `plan_time_blocks` with `confirm: true` again. If the user paused or stopped the focus from the clock, don't do it again.

A button in a view can also send you a message as the user, such as "Time-block the rest of my day in QTR." Treat it like anything else they type.

## Rules

1. **Ask before changing anything that matters.** Through the connector, tools run as soon as you call them; the approval cards Ansel uses exist only in his chat inside QTR. Tools marked **D** in [references/tools.md](references/tools.md) change or remove something. Tell the user what will happen, and get a yes, before:
   - deleting, disconnecting, removing, revoking, leaving or ending anything;
   - anything other people see: sharing, invites, comments, feedback, support tickets, giving a task to someone;
   - changes to many things at once: bulk moves, rescheduling everything overdue, time blocks, turning notes into tasks, sending tasks to another app;
   - standing settings: routines, automation lanes, time zone or week start, notifications, persona, memories;
   - approving or rejecting a waiting change.

   Reads need no confirmation. Neither does creating or editing the one task, note or journal entry the user just asked for.
2. **Resolve dates in the user's time zone.**
   - For reads, pass the user's phrase as they said it (`get_tasks` with `when: "next friday"`); the server resolves it in their zone.
   - For writes, work out the period yourself. Set `periodType` and `periodDate` (any `YYYY-MM-DD` inside the period), and add `dueDate` only when the user named a time of day.
   - `get_profile` gives their zone and first day of the week.
3. **Never guess ids.** Many tools take names: goals, lists, workspaces, challenges, habits, desk cards. Otherwise find the id with `search` or a `get_*` call first.
4. **Let the user answer cross-questions.** A tool may return `{ needsConfirmation: true, question, options }` instead of acting. Show the question and options, then call again with the field they chose.
5. **Treat offers as offers.** The brief's `suggestedMove`, `get_at_risk` fixes and accepted nudges carry exact tool calls. Describe what they'd change, and run them, with the same tool and the same args, only when the user says yes.
6. **Report what actually happened.** Say where a task landed using `placedIn` (Inbox, Today, Tomorrow, This week, a date). Count only what a result lists as added. If a tool says a feature "is not turned on for this account", or that QTR isn't open on the desk, tell the user plainly; don't retry or work around it.
7. **Respect a read-only connection.** If a write returns "This QTR connection can only read", the user needs to reconnect QTR with write access. Say so instead of retrying.

## Common requests

| The user says | Use |
|---|---|
| "Brief me", "How does today look?" / "Wrap up my day" | `get_day_brief` (`part`: `morning` or `evening`) |
| "What's on today / tomorrow / this week?", "What's overdue?" | `get_tasks` with `when` set to their phrase |
| "What should I do next?" | `prioritize` |
| "Add: call the bank on Friday" | `create_task` with `periodType: "day"` and that Friday's date |
| "Add these: call the bank, book the dentist, renew my passport" | `create_tasks`, one call for all of them |
| "Move everything overdue to this week" | `reschedule_overdue` (rule 1) |
| "Time-block my day" or "...my week" | `plan_time_blocks` to preview, then again with `confirm: true` once they agree |
| "What's slipping?", "Am I behind?" | `get_at_risk`, then offer its fixes |
| "How's my launch goal going?" / "How's my quarter?" | `get_goal_status` / `get_quarter_status` |
| "Show me my launch goal" | `get_goal_map` |
| "Review my week", "How did my week go?" | `get_week_review`, then offer `save_week_plan` for the week ahead |
| "New goal: onboard 5 photographers this quarter" | `create_goal_plan`, worked backwards into checkpoints and tasks |
| "Map out my fitness goal" | `map_goal` (QTR's AI drafts the map) or `add_checkpoints` (checkpoints you agreed on) |
| "What's my plan this week?" / "Save this as my week plan" | `get_week_plan` / `save_week_plan` |
| "What's waiting for my approval?" | `list_pending_proposals`, then `approve_proposal` or `reject_proposal` per change |
| "Undo what Ansel did this morning" | `get_recent_changes`, then `undo_proposal` |
| "Every Friday at 4, draft my weekly review" | `create_routine` (rule 1) |
| "Remember my sister's birthday is 3 May" / "What do you know about me?" | `remember` / `get_memory` |
| "Jot: call the bank", "Note this: ..." | `jot`, `create_notebook_note` |
| "Turn these meeting notes into tasks" | `meeting_to_tasks` (rule 1) |
| "Start a 25-minute focus" | `start_focus` |
| "I ran today" | `check_in_challenge` |
| "How did the team's week go?", "What's on Priya's plate?" | `get_team_digest`, `get_tasks` with `member` |
| "What's on my desk?", "Open my Launch goal", "Tidy my desk" | `get_desk`, `ui_command` (QTR must be open on the desk) |
| "Connect Asana" | `ui_command` with `start_connect` (the user signs in themselves) |
| "Find everything about the launch" | `search`, then `fetch` to read one result in full, or `ask_brain` for a question answered from their own content |

Everything else, area by area, is in [references/tools.md](references/tools.md).

## Workflows

**Plan the day.** Call `get_day_brief` and share the top three, the meeting load and anything at risk. If they agree to the suggested move, apply it. Offer `plan_time_blocks` to fit untimed tasks around meetings. Then make one task the day's highlight with `update_task` (`isHighlighted: true`).

**Plan the week, Working Backwards.**
1. Read `get_quarter_status` so the week serves the quarter's goals.
2. Read the week with `get_tasks` (`when: "this week"`) and the overdue work.
3. Agree what goes in with the user, then move tasks in with `bulk_update_tasks` (rule 1).
4. Save their plan in their own words with `save_week_plan`.

**Set up a goal.**
1. Agree the outcome and a few checkpoints with the user.
2. Create it with `create_goal_plan`. Title it without the timeframe, and leave `quarter` and `year` out unless they name another quarter.
3. For an existing goal, use `add_checkpoints`, then `add_tasks_to_checkpoint`.
4. Show it with `get_goal_map`, and offer `schedule_goal` to put the tasks on days.

**Clear what's waiting.** Call `list_pending_proposals`. Go through each change with the user: what it would change, and where it came from. Approve or reject only the ones they decide on, one id at a time.

**Fix what's slipping.** Call `get_at_risk`. For each item, explain its fix in plain words. Run the fix's `actions` exactly as given, once the user says yes.

**Work on the open desk.** Call `get_desk` to see the cards in front, then use `ui_command` to open, move or tidy them. Each command reports how the desk looks now, so chain steps and stop at the first failure. Desk commands only change the view; change the data itself with the task, goal and focus tools.

## Reference files

Read these when the task needs them:

- [references/tools.md](references/tools.md): every tool by area, with parameters and whether it works read-only. Use it to find the right tool for anything not covered above.
- [references/planning.md](references/planning.md): tasks, dates and recurrence, goals and checkpoints, notes, journals, lists, projects, focus and challenges, plus every cross-question and how to answer it.
- [references/ansel.md](references/ansel.md): the brief, goal and quarter status, at-risk fixes, time blocks, week and quarter plans, routines, nudges, background agents, automation lanes, memory, and approving or undoing Ansel's changes.
- [references/desk.md](references/desk.md): reading and driving the open desk, every desk command with its arguments, and what only the user can do in the app.
- [references/people-and-apps.md](references/people-and-apps.md): teams, sharing, desks shared with others, workspaces, calendars, connected apps, account and support.
- [references/setup.md](references/setup.md): connecting from Claude, ChatGPT or Claude Code, read-only connections, the REST API, and error messages.
