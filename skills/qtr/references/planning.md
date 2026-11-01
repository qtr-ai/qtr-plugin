# Planning in QTR: tasks, goals, notes and habits

## Contents

- [Tasks](#tasks)
- [Goals and checkpoints](#goals-and-checkpoints)
- [Notebook, period notes and journals](#notebook-period-notes-and-journals)
- [Lists and projects](#lists-and-projects)
- [Focus](#focus)
- [Habit challenges](#habit-challenges)
- [Cross-questions](#cross-questions)

## Tasks

### Reading

- **`get_tasks`** is the main read.
  - `when` takes the user's phrase: today, tomorrow, a weekday, "next friday", a date, this week, this month, this quarter, this year, inbox or overdue.
  - `in` reads one project, list or goal instead.
  - `quadrant` reads the important and urgent marks across every period: `important`, `urgent`, `both` or `neither`.
  - In Claude and other apps that show views, the result appears as a task list the user can tick off.
- **One item in full:** `fetch` with an id from `search` reads a task, goal, journal, note or notebook note with its whole text.
- **Around a task:**
  - `get_task_comments` reads comments from people in QTR; `get_app_comments` reads comments from Asana, Todoist or ClickUp.
  - `get_task_links` gives the task's link in the connected app.
  - `get_event_details` reads a calendar event live: attendees, meeting link and description.

### Creating

The commitment matters more than the clock:

| The user says | Set |
|---|---|
| "this week" | `periodType: "week"`, `periodDate` = any day this week |
| "Friday", "tomorrow" | `periodType: "day"`, `periodDate` = that day |
| "at 3pm tomorrow" | `dueDate` = that date and time (and `duration` if given) |
| "sometime", "later", no time at all | leave the period out: it lands in Today, or say `inbox` for no period |

- **Repeating tasks:** `create_task` takes `recurrenceRule` as an RRULE, for example `FREQ=WEEKLY;BYDAY=MO`, with `recurrenceStartDate`, `recurrenceEndDate` and `recurrenceTimezone`. `create_recurring_task` builds one step by step.
- **Several at once:** `create_tasks` takes up to 50 tasks, each set up as `create_task` would be, in one call. It makes each one on its own and lists any it couldn't, with why; a Free plan limit stops the rest.
- **Subtasks:** pass `parentTaskId`.
- **Placement:**
  - `listId`, `projectId` and `goalId` place the task.
  - `goalId` links the task to a goal but doesn't put it on the goal's map; use `add_tasks_to_checkpoint` for that.
  - In a team workspace, or on a shared list or goal, `assignee` gives the task to someone, and they're told (rule 1).
- **Time clashes:** a `dueDate` that clashes returns free slots. Use `forceSchedule: true` only if the user accepts the overlap.

Afterwards, tell the user where the task went using the result's `placedIn`.

### Changing

- **`update_task`** changes:
  - a task's title, notes, period or time, duration, priority (`important` or `normal`), `isUrgent` and `isTopPriority`;
  - its status: `wip` (in progress), `backlog` (parked), or `rescheduled` with a period;
  - its list, project or goal, or `removeFrom...` any of them;
  - its repeat, or `removeRecurrence`;
  - and `isHighlighted` for the day's one highlight.
- **Moving a task to a period without a `dueDate`** clears its time slot, which is usually what the user wants.
- **Many tasks at once:** `bulk_update_tasks` with ids and one `changes` object. Use `reschedule_overdue` for "everything overdue", and `reorder_tasks` to change the order within a list.
- **Done, deleted and restored:**
  - Finish a task with `complete_task`.
  - Delete with `delete_task`. A repeating task asks "this one or all?".
  - Bring a deleted task back with `restore_task`, and copy one with `duplicate_task`.
- **Comments:** `add_task_comment` posts as the user to everyone who can see the task (rule 1).

### End of a period

Nothing moves on its own. Overdue work waits on its day, marked backlog. Use `reschedule_overdue`, or the fixes from `get_at_risk`, when the user wants it moved.

## Goals and checkpoints

### Creating a goal

Use `create_goal_plan` for every new goal, big or small:

1. **Title** the goal without the timeframe: "Onboard 5 photographers", not "...this quarter".
2. **Description:** one sentence saying what it looks like when achieved.
3. **Work backwards:** from the outcome to the checkpoints (milestones to reach) and the tasks under each.
   - Checkpoints can chain to each other or connect straight to the goal.
   - Tasks hang under a checkpoint or another task.
4. **Quarter and year:** leave them out unless the user names another quarter. They default to the current one.

### Mapping an existing goal

- **`map_goal`:** QTR's own AI drafts checkpoints and tasks into the map in one go. If the goal is too thin it returns one question; call again with `answers` and `asked`.
- **`add_checkpoints`:** adds checkpoints you agreed with the user, each optionally with first tasks. Names already on the map are skipped.
- **`add_tasks_to_checkpoint`:** adds tasks under an existing checkpoint.

Tasks added to a map land in the goal's quarter without a day. Don't call them scheduled. Offer `schedule_goal` instead, which has three modes:
- `auto` spreads them over weekdays;
- `manual` asks per task;
- `confirm` applies the schedule the user chose.

### Working with goals

| Need | Tool |
|---|---|
| The user's active goals | `get_goals` |
| The goal's checkpoints and the tasks under each | `get_goal_map`, shown as the goal's map where the app can |
| Progress numbers, its hill and score | `get_goal_progress` |
| On track or not, and why | `get_goal_status` |
| Rename, tick off, reorder or delete a checkpoint | `update_checkpoint`, `reorder_checkpoints`, `delete_checkpoint` |
| Move a task to another checkpoint | `move_task_to_checkpoint` |
| Change dates or mark done | `update_goal` (`begin`, `achieveBy`, `isCompleted`) |
| Push to next quarter | `move_goal_to_next_quarter` |
| Link a task or a sub-goal | `link_task_to_goal`, `link_sub_goal` |
| Change the goals' order | `reorder_goals` |
| Delete | `delete_goal` asks whether to keep the goal's tasks and sub-goals (rule 1) |

## Notebook, period notes and journals

QTR has three kinds of writing:

- **Notebook and Jot.** Free notes, found by words, #tags, books and dates.
  - **Write:** `jot` for quick capture. `create_notebook_note` for "note this"; #tags in the body become tags.
  - **Add or rewrite:** `append_to_note` adds to a note and never overwrites newer typing. To rewrite, read the note with `get_notebook_note`, then `update_notebook_note`.
  - **Find:** `search_notebook` (words, tags, book, dates), `find_tag` (everything with one #tag across QTR), `list_notebook_tags`, `list_books`.
  - **Turn into tasks:** `note_to_tasks` for a note. For meeting notes, read the text yourself and pass the decisions and actions to `meeting_to_tasks` (rule 1).
  - **Tidy:**
    - `link_note_to_task` and `unlink_note_task`;
    - `add_link_to_note` (clips a page preview);
    - `start_new_page`, `move_note`;
    - `delete_notebook_note` (rule 1);
    - `delete_note_photo`: you can't see photos, so go by their captions;
    - `create_book`, `rename_book`, `delete_book`.
- **Period notes.** A note pinned to a day, week, month, quarter or year. Use `create_note` with `periodType` and `periodDate`, and `get_notes`, `update_note` and `delete_note`.
- **Journals.** Reflections, with `create_journal`. Set the period for a weekly or monthly reflection. Read and change them with `get_journals`, `update_journal` and `delete_journal`.

For a week's or quarter's plan, use the plan tools in [ansel.md](ansel.md), not notes.

## Lists and projects

- **Lists:** `get_lists`, `get_tasks` with `in.listId`, `create_list`, `update_list`, `delete_list`. Deleting asks whether to keep the tasks.
- **Adding a task to a list:** `assign_task_to_list` finds the list by name and offers to create it.
- **Projects:** `get_projects`, `get_tasks` with `in.projectId`, `create_project`, `update_project`, `delete_project`.

## Focus

- `start_focus` runs the timer on the user's desk, and `pause_focus`, `resume_focus` and `stop_focus` control it.
- `add_tasks_to_focus_session` and `add_note_to_focus_session` add to the running session.
- `get_focus_sessions` shows recent sessions.
- `start_focus_session` and `end_focus_session` are older tools that record a session without the desk timer; prefer `start_focus`.

## Habit challenges

- **Reading:**
  - `get_challenges` shows the habits due on a day.
  - `list_challenges` shows every challenge the user is in.
  - `get_challenge_week` shows how everyone did that week.
- **Marking a habit:** `check_in_challenge` with `answer` `yes`, `no` or `clear`. Only days this week, or yesterday, can be marked.
- **Running a challenge:** `create_challenge`, `update_challenge`, `change_challenge_habits`, `choose_my_habits`, `invite_to_challenge`, `leave_challenge`, `end_challenge`. Invites and endings reach other people (rule 1).

## Cross-questions

When a tool returns `needsConfirmation`, show its `question` and `options`, then call again with:

| Situation | Call again with |
|---|---|
| Updating or deleting a repeating task | `updateAllOccurrences: true/false`, or `scope: "this"` / `"all"` |
| A new time clashes with another task | `forceSchedule: true` only if the user accepts the overlap; otherwise one of the free slots returned |
| Deleting a goal that has tasks or sub-goals | `deleteTasks: true` (delete them) or `false` (keep them, unlinked) |
| Deleting a list or project that has tasks | `deleteTasks: true` or `false` |
| Linking a task that is already on another goal | `forceReplace: true` |
| Moving a sub-goal that already has a parent | `forceReparent: true` |
| `status: "rescheduled"` with no period | `periodType` and `periodDate` |
| A list that doesn't exist yet | `createListIfNotFound: true` |
| A focus session with no length, or while one runs | `duration`, or `forceNew: true` |
| More than one person matches a name | the name or email from `options` |
| `schedule_goal` in `manual` mode | `mode: "confirm"` with the `schedules` the user chose |
| A week or quarter that already has a plan | `replace: true`, only if the user wants the new plan instead |
