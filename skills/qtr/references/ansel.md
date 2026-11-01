# Ansel: QTR's assistant, through the connector

Ansel is the assistant inside QTR. Most of what it does is also a connector tool, so you can do it for the user from here.

## Contents

- [Brief, status and risks](#brief-status-and-risks)
- [Time blocks and plans](#time-blocks-and-plans)
- [Changes waiting for approval, undo and redo](#changes-waiting-for-approval-undo-and-redo)
- [Routines](#routines)
- [Nudges](#nudges)
- [Background agents and automation lanes](#background-agents-and-automation-lanes)
- [Memory](#memory)
- [Persona](#persona)
- [Features that can be off](#features-that-can-be-off)

## Brief, status and risks

- **`get_day_brief`**: the day in one read, in the user's time zone.
  - `part: "morning"` gives today's plan, the top 3, meeting load, overdue and at-risk work, what changed in connected apps and from teammates, and one `suggestedMove`.
  - `part: "evening"` gives what got done, what's left, how tomorrow starts, and one question about tomorrow.
  - Leave `part` out to follow the time of day.
  - The `suggestedMove` is an offer: apply it with `bulk_update_tasks`, using its args, only when the user says yes.
- **`get_goal_status`**: one goal's status (on track, at risk, off track, achieved), with the reasons and the evidence from its tasks.
- **`get_quarter_status`**: every goal's status, the week of the quarter and the days left. Lead with the goals off track or at risk, plainly and without judging the user.
- **`get_at_risk`**: overdue work, overloaded days or weeks, slipping goals, tasks moved again and again, and times that end before they start. Each item has a fix, with `changes` (what it would do) and `actions` (the exact tool calls). Explain the change, then run the actions as given once the user agrees.
- **`prioritize`**: a ranked "what next" list.
- **`summarize`** (`scope`: `week`, `goal` or `project`): a narrative summary.

## Time blocks and plans

- **`plan_time_blocks`** places untimed tasks into free time inside the user's working hours, around meetings, highest priority first. It never moves meetings.
  - `scope` is `day` or `week`, and `date` is any day in it.
  - `minutes` sets the length for tasks with no duration (30 by default).
  - `replan: true` re-places today's blocks the user missed.
  - The first call only previews the blocks. Show them to the user, then call again with `confirm: true` to place them.
- **Week and quarter plans.** The plan text on the week or quarter card's plan strip, in the user's own words:
  - `get_week_plan` and `save_week_plan` for a week;
  - `get_period_plan` and `set_period_plan` with `period` `week` or `quarter`.

  A period that already has a plan keeps it; pass `replace: true` only when the user wants the new one. These save text only. Move tasks with the task tools.
- **`suggest_time_for_task`**: free slots for a task of a given length.

## Changes waiting for approval, undo and redo

Inside QTR, Ansel holds back risky changes as proposals the user approves on a card. Routines in `propose` mode and background agents leave proposals too.

1. **`list_pending_proposals`** shows what's waiting, across workspaces, newest first. For each change it gives:
   - what would change, and how many changes;
   - where it came from: `chat` (Ansel in the app), `agent` (a background agent), or what set it off, such as `scheduled review` or `goal drift`;
   - the workspace it's in.
2. **`approve_proposal`** (`id`) applies one, and **`reject_proposal`** (`id`, optional `reason`) drops one.
   - Do either only after the user has seen what that change does and decided on it. Approving applies real changes.
   - A change that has expired or was already decided can't be approved; the result says so.
3. **`get_recent_changes`** lists what Ansel applied or undid, with ids.
   - **`undo_proposal`** (`id`) reverses an applied change. Parts edited again since are left alone, and the result says how many.
   - **`redo_proposal`** (`id`) re-applies an undone change.

Changes you make through the connector are not proposals. Undo them with the matching tool, for example `restore_task` for a deleted task.

## Routines

A routine is something Ansel does on a schedule.

- **Read:** `list_routines` shows each routine, its schedule, whether it's on, its mode and its last runs, plus the templates.
- **Create** with `create_routine` (rule 1):
  - **`template`:** `plan_my_day`, `plan_my_week`, `weekly_review`, `evening_wrap`, `notes_to_tasks`, `goal_check_in`, `clear_overdue`, or `custom` with an `instruction` in plain words.
  - **`days`:** 1 (Monday) to 7 (Sunday). `[]` means every day.
  - **`hour` and `minute`:** in the user's time zone. A routine runs at most 3 times a day.
  - **`mode`:** `propose` (every change waits for the user) or `apply_safe` (only risky changes wait).
- **Change or delete:** `update_routine` changes or pauses one (`enabled: false`); `delete_routine` removes it.

Example: "every Friday at 4, draft my weekly review" is `template: "weekly_review"`, `days: [5]`, `hour: 16`.

## Nudges

Nudges are QTR's reminders and suggestions.

- `list_nudges` shows them, most important first, with the tasks each is about.
- **`act_on_nudge`** records the user's answer: `accept`, `later` (snoozes a few hours) or `dismiss`.
  - Accepting only records the answer; do the suggested work yourself with the other tools.
  - If the result has `stagedFix`, the fix is already on the nudge's card in QTR, so don't apply it again.
- `dismiss_nudge` hides one for good. `mark_nudge_seen` marks one seen after you've told the user what it says.

## Background agents and automation lanes

- **`run_agent_now`** runs an agent on demand:
  - `morning-briefing`: today's rundown;
  - `weekly-review`: sums up the week;
  - `plan-repair`: fixes conflicts and overloads;
  - `drift-forecast`: flags slipping goals;
  - `inbox-to-plan`: plans the inbox;
  - `integration-reconciler`: reconciles connected apps.

  An agent's suggested changes come back as proposals or a nudge.
- **Lanes** decide how much the agents may do on their own in each area: `CALENDAR`, `TASK`, `GOAL`, `INTEGRATION`, `NOTES`. There are three modes:
  - `OFF`;
  - `PROPOSE` (ask first);
  - `AUTO_SAFE` (apply low-risk changes on its own).

  Read them with `get_lanes` and set them with `set_lane_mode` (rule 1). "Stop asking me, just do it" means `AUTO_SAFE`.

## Memory

Ansel remembers facts and preferences about the user.

| The user says | Use |
|---|---|
| "Remember my sister's birthday is 3 May" | `remember` (`fact`; `kind` trait, entity, preference or focus_area) |
| A fact that changes over time ("I live in Pune") | `remember` with a `slot` such as `home_city`; a new fact in the same slot replaces the old |
| A fact with an end ("travelling until 2 Nov") | `remember` with `until` |
| "What do you know about me?" | `get_memory` |
| "What did we decide last Tuesday?" | `recall` with `from` and `to` |
| "That's wrong, I moved to Pune" | `correct_memory` (find the `nodeId` with `get_memory`) |
| "Always remember I work 9 to 5" / "that can change" | `pin_memory` / `unpin_memory` |
| "Forget where I work", "stop assuming I work mornings" | `forget_memory` / `forget_preference` (rule 1) |

For something to do later, create a task, not a memory.

## Persona

`set_persona` changes the voice Ansel uses with the user. Switching the coach Ansel draws on (a fitness or money coach, for example) happens in Ansel's chat in the app.

## Features that can be off

Some Ansel features can be switched off for an account or for everyone. The tool then answers with an error such as:
- "The daily brief is not turned on for this account."
- "Goal status is not turned on for this account."
- "Background agents are switched off."

Tell the user plainly, and don't rebuild the feature from other tools.
