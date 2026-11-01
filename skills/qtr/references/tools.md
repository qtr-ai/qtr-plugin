# QTR connector tools

Every tool the QTR connector offers, by area. Generated from the connector's own tool list; the connector sends each tool's full description and parameter schema to the AI app, so use this file to find the right tool, then read its schema.

- **R** reads, and works on a read-only connection. **W** adds something new to the user's account. **D** changes or removes something, so Claude and ChatGPT ask before each call.
- `*` marks a required parameter.

## Contents

- [Tasks: read](#tasks-read) (15)
- [Tasks: write](#tasks-write) (12)
- [Search, answers and suggestions](#search-answers-and-suggestions) (7)
- [Goals and checkpoints](#goals-and-checkpoints) (18)
- [Ansel: brief, status, risks and plans](#ansel-brief-status-risks-and-plans) (10)
- [Ansel: changes waiting for approval, undo and redo](#ansel-changes-waiting-for-approval-undo-and-redo) (6)
- [Ansel: routines, nudges, background agents and automation](#ansel-routines-nudges-background-agents-and-automation) (12)
- [Ansel: memory](#ansel-memory) (8)
- [The open desk](#the-open-desk) (2)
- [Teams](#teams) (3)
- [Notebook and meeting notes](#notebook-and-meeting-notes) (20)
- [Period notes and journals](#period-notes-and-journals) (8)
- [Lists and projects](#lists-and-projects) (9)
- [Focus](#focus) (9)
- [Habit challenges](#habit-challenges) (11)
- [Calendars](#calendars) (6)
- [Connected apps (Asana, Todoist, ClickUp)](#connected-apps-asana-todoist-clickup) (8)
- [Sharing and desks](#sharing-and-desks) (11)
- [Workspaces](#workspaces) (11)
- [Account, settings and support](#account-settings-and-support) (15)

## Tasks: read

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_tasks` | R | `when`, `in`, `member`, `period`, `assignedBy`, `quadrant` | Get the user's tasks. |
| `get_tasks_for_date` | R | `date`* | Get the user's tasks for a specific day. |
| `get_today_tasks` | R | none | Get the user's tasks scheduled for today |
| `get_week_tasks` | R | none | Get the user's tasks for this week |
| `get_month_tasks` | R | none | Get the user's tasks for this month |
| `get_quarter_tasks` | R | none | Get the user's tasks for this quarter |
| `get_year_tasks` | R | none | Get the user's tasks for this year |
| `get_inbox_tasks` | R | none | Get unscheduled tasks (inbox / no specific period) |
| `get_overdue_tasks` | R | none | Get the user's overdue tasks |
| `get_flagged_tasks` | R | `quadrant`* | Get the user's open tasks by their important and urgent marks, across every period (inbox, today, this week and on), as the Important, Urgent and Matrix cards show them. |
| `get_project_tasks` | R | `id`* | Get all tasks inside a specific project |
| `get_task_comments` | R | `id`* | What people have said on a task: its newest 50 comments, oldest first, as { authorName, createdAt, text }. |
| `get_task_links` | R | `id`* | Where a task is linked in a connected app (Asana, Todoist, ClickUp): the app, the link to open the task there, and its sync state. |
| `get_app_comments` | R | `taskId`* | The comments on a task that came from a connected app (Asana, ClickUp or Todoist), oldest first, with who wrote each and when. |
| `get_event_details` | R | `taskId`* | A calendar event's full details, read live from Google or Outlook: when, where, the meeting link, the organizer, who is invited and how each replied, and its description. |

## Tasks: write

| Tool | | Parameters | What it does |
|---|---|---|---|
| `create_task` | W | `title`*, `description`, `periodType`, `periodDate`, `period`, `dueDate`, `endDateTime`, `duration`, `priority`, `isUrgent`, `isTopPriority`, `listId`, `projectId`, `goalId`, `parentTaskId`, `recurrenceRule`, `recurrenceStartDate`, `recurrenceEndDate`, `recurrenceTimezone`, `forceSchedule`, `calendarId`, `assignee` | Create a new task. |
| `create_recurring_task` | W | `title`, `frequency`, `daysOfWeek`, `interval`, `startDate`, `endDate`, `time`, `goalId`, `listId`, `projectId`, `timezone` | Create a recurring task interactively. |
| `update_task` | D | `id`*, `title`, `description`, `dueDate`, `endDateTime`, `duration`, `priority`, `isUrgent`, `isTopPriority`, `isHighlighted`, `status`, `periodType`, `periodDate`, `period`, `listId`, `projectId`, `assignee`, `removeFromList`, `removeFromProject`, `removeFromGoal`, `removeRecurrence`, `recurrenceRule`, `recurrenceEndDate`, `recurrenceTimezone`, `updateAllOccurrences`, `forceSchedule` | Update a task's properties. |
| `complete_task` | D | `id`* | Mark a task as complete (done) |
| `delete_task` | D | `id`*, `scope` | Delete a task. |
| `restore_task` | D | `id`, `title` | Bring back a task the user deleted ("bring it back", "undo the delete", "restore the task I deleted"). |
| `duplicate_task` | W | `id`* | Create a copy of an existing task with all its properties |
| `bulk_update_tasks` | D | `ids`*, `changes`* | Change several tasks at once, as the selection dock on the desk does: mark them done, move them to a day, week, month, quarter, year or the inbox, set or clear important, urgent and top priority,… |
| `reschedule_overdue` | D | `to` | Move every overdue task at once and clear their times. |
| `reorder_tasks` | D | `ids`*, `position`*, `anchorId` | Change the order tasks appear in their lists, e.g. |
| `assign_task_to_list` | D | `taskTitle`, `taskId`, `listName`, `listId`, `createListIfNotFound`, `showInboxTasks` | Assign a task to a list — fully interactive. |
| `add_task_comment` | D | `id`*, `text`* | Comment on a task shared with other people, as the user: "tell them the venue is booked". |

## Search, answers and suggestions

| Tool | | Parameters | What it does |
|---|---|---|---|
| `search` | R | `q`* | Semantic search across the user's tasks, goals, notes, journals and notebook (notebook hits have type Notebook). |
| `ask_brain` | R | `question`* | Answer a question about the user's own content by retrieving the most relevant tasks/goals/notes/journals/notebook notes as citeable sources. |
| `find_tag` | R | `tag`* | Everything tagged with one #tag, grouped by where it lives: notebook notes and jots, tasks, goals and period notes. |
| `prioritize` | R | none | Recommend what the user should focus on now/next, reasoning over today's tasks, overdue items, goals, and working hours. |
| `summarize` | R | `scope`, `query` | Produce a concise narrative summary of the user's work, or the data to write one from. |
| `suggest_time_for_task` | R | `durationMinutes`*, `date`, `maxSlots` | Find the best available time slots for a task of a given duration. |
| `help` | R | none | Show all available QTR actions and how to use them |

## Goals and checkpoints

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_goals` | R | none | Get the user's active goals |
| `get_goal_tasks` | R | `id`* | Get all tasks linked to a specific goal |
| `get_goal_progress` | R | `goalId`* | How one goal is going: tasks done and left, percent complete, its hill (height 0 to 1 and whether its score is climbing, flat or sliding) and its score this week. |
| `create_goal_plan` | W | `title`*, `description`, `color`, `quarter`, `year`, `nodes`* | Create a quarterly goal with a visual roadmap. |
| `map_goal` | D | `goalId`*, `answers`, `asked` | Have QTR map out a goal the user already has, in one go: checkpoints, the tasks for each, and steps for the tasks that need them, all added to its map. |
| `add_checkpoints` | W | `goalId`*, `checkpoints`* | Add checkpoints to the map of a goal the user already has, each optionally with its first tasks. |
| `update_goal` | D | `id`*, `title`, `description`, `color`, `isCompleted`, `achieveBy`, `begin` | Update a goal — title, description, color, completion, or its begin/achieve-by timeframe |
| `delete_goal` | D | `name`, `id`, `deleteTasks` | Delete a goal — fully interactive. |
| `reorder_goals` | D | `ids`*, `position`*, `anchorId` | Change the order of the user's goals, e.g. |
| `move_goal_to_next_quarter` | D | `goalId`* | Push a goal into the next quarter, the same as the desk's "Move to next quarter": its achieve-by date and its begin date (if set) move forward one quarter, and the goal's tasks planned for the… |
| `link_task_to_goal` | D | `taskId`*, `goalId`*, `forceReplace` | Link a task to a goal. |
| `link_sub_goal` | D | `childGoalId`*, `parentGoalId`*, `forceReparent` | Make a goal a sub-goal of another goal. |
| `schedule_goal` | D | `goalId`, `goalTitle`, `mode`, `schedules` | Schedule all tasks in a goal onto the calendar. |
| `add_tasks_to_checkpoint` | D | `goalId`*, `checkpoint`*, `tasks`*, `periodType`, `periodDate` | Add tasks under a checkpoint on a goal's map. |
| `update_checkpoint` | D | `goalId`*, `checkpoint`*, `title`, `completed` | Rename one of a goal's checkpoints, or mark it done or not done. |
| `reorder_checkpoints` | D | `goalId`*, `checkpoints`* | Change the order of a goal's checkpoints, the order the goal card lists them in. |
| `delete_checkpoint` | D | `goalId`*, `checkpoint`* | Delete one of a goal's checkpoints from its map. |
| `move_task_to_checkpoint` | D | `goalId`*, `taskId`*, `checkpoint`* | Move a task under another of the goal's checkpoints, as dragging it there does. |

## Ansel: brief, status, risks and plans

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_day_brief` | R | `part` | The user's day in one read, built from their own data in their time zone. |
| `get_week_review` | R | none | The weekly review in one read: what got done and what slipped in the week under review, the goals that need a look (off track or at risk, with reasons), where the quarter stands, and the week to… |
| `get_goal_status` | R | `goalId`* | How one goal is going, judged from its own tasks: status (on_track, at_risk, off_track or achieved), the reasons and the evidence behind it (tasks done against planned, checkpoints, this week, the… |
| `get_quarter_status` | R | none | How the quarter is going across the user's goals: the week of the quarter, days left, a count by status, and each goal with its status, reasons, evidence and next week's focus, the ones that need… |
| `get_at_risk` | R | none | What is at risk right now, each with a concrete fix: overdue work, an overloaded day or week, goals that are slipping or due with nothing planned, a task moved again and again, times that end… |
| `plan_time_blocks` | D | `scope`, `date`, `taskIds`, `minutes`, `replan`, `notBefore`, `overflow`, `confirm` | Time-block the user's day or week: places their untimed tasks into free time inside their working hours, around every meeting and timed task they already have, highest priority first. |
| `get_week_plan` | R | `week` | Read the user's plan for a week: the write-up on the week's plan strip that the week ritual saves. |
| `save_week_plan` | D | `week`, `plan`, `goalNames`, `taskTitles`, `ramble`, `replace` | Save the user's plan for a week onto the week's plan strip, the same place the week ritual saves it. |
| `get_period_plan` | R | `period`*, `when` | Read the plan written for a week or a quarter: the text on that card's plan strip on the desk. |
| `set_period_plan` | D | `period`*, `when`, `plan`*, `replace` | Write the plan for a week or a quarter, the text shown on that card's plan strip. |

## Ansel: changes waiting for approval, undo and redo

| Tool | | Parameters | What it does |
|---|---|---|---|
| `list_pending_proposals` | R | none | List the changes waiting for the user's approval in QTR, newest first, across their workspaces: what each would change, where it came from (chat is Ansel in the app, agent a background agent;… |
| `approve_proposal` | D | `id`* | Apply one change that is waiting for the user's approval, by its id from list_pending_proposals. |
| `reject_proposal` | D | `id`*, `reason` | Drop one waiting change, by its id from list_pending_proposals, when the user says no to it. |
| `get_recent_changes` | R | `range` | List the changes Ansel made for the user that were applied or undone (approved chat proposals and background agent changes), newest first. |
| `undo_proposal` | D | `id`* | Undo a change Ansel applied for the user, from its chat, a routine or a background agent, by its id from get_recent_changes. |
| `redo_proposal` | D | `id`* | Apply again a change that was undone, by its id from get_recent_changes. |

## Ansel: routines, nudges, background agents and automation

| Tool | | Parameters | What it does |
|---|---|---|---|
| `list_routines` | R | none | The user's Ansel routines: what each does, when it runs, whether it is on, its approval mode, and its last runs with their outcome. |
| `create_routine` | D | `template`, `name`, `instruction`, `days`, `hour`, `minute`, `mode` | Set up a routine Ansel runs on a schedule, like "every Friday at 4, draft my weekly review" or "every weekday at 8, plan my day". |
| `update_routine` | D | `routine`*, `enabled`, `name`, `instruction`, `days`, `hour`, `minute`, `mode` | Change a routine: pause or resume it (enabled), its name, instruction, days, time or approval mode. |
| `delete_routine` | D | `routine`* | Delete a routine. |
| `list_nudges` | R | `status` | List the nudges (the reminders and suggestions QTR shows the user), most important and newest first, with the tasks each one is about and the choices it offers. |
| `act_on_nudge` | D | `id`*, `choice` | Record the user's answer to a nudge: accept ("sure", "do it"), later (snoozes it for a few hours) or dismiss ("keep as is"). |
| `dismiss_nudge` | D | `id`* | Dismiss a nudge the user does not want to see any more. |
| `mark_nudge_seen` | D | `id`* | Mark a nudge as seen without answering it, for example after you have told the user what it says. |
| `run_agent_now` | D | `agent`* | Run one of QTR's background agents now, in the workspace the user is in. |
| `get_lanes` | R | none | Get how much QTR's background agents may do on their own in each area of the workspace the user is in (calendar, tasks, goals, integrations, notes): OFF, PROPOSE (ask first) or AUTO_SAFE (apply… |
| `set_lane_mode` | D | `lane`*, `mode`* | Set how much QTR's background agents may do on their own in one area of the workspace the user is in. |
| `set_persona` | D | `persona`* | Change the voice Ansel uses with the user, by persona name or slug. |

## Ansel: memory

| Tool | | Parameters | What it does |
|---|---|---|---|
| `recall` | R | `query`, `from`, `to` | Look back at what the user and Ansel talked about and what Ansel remembers, with dates: day recaps (what was planned, decided and left open) and memory items, including ones that were replaced or… |
| `get_memory` | R | `topic` | What Ansel remembers about the user, from both places it is kept: - memories: the memory graph (traits, routines, patterns, people and focus areas, learned from their activity or told by them),… |
| `remember` | W | `fact`*, `kind`, `slot`, `until` | Remember a fact the user tells you about themself, e.g. |
| `correct_memory` | D | `nodeId`*, `text`* | Correct a memory that is wrong, e.g. |
| `pin_memory` | D | `nodeId`* | Pin a memory so QTR keeps it exactly as it is and stops changing or fading it, e.g. |
| `unpin_memory` | D | `nodeId`* | Unpin a memory so QTR may update or fade it again as it learns, e.g. |
| `forget_memory` | D | `nodeId`* | Forget one memory, e.g. |
| `forget_preference` | D | `category`*, `key`* | Forget a preference QTR remembered for the user, e.g. |

## The open desk

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_desk` | R | `cardId` | Read the desk the user has open in QTR right now: its name, the cards on it front to back, and what each card shows (tasks, goals, notes). |
| `ui_command` | D | `command`*, `args` | Do something on the desk the user has open in QTR, the way they would by hand: open, focus, tuck, move, resize, snap or full-screen a card, deal or tidy the desk, flip a goal card between list and… |

## Teams

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_member_tasks` | R | `member`*, `period`, `assignedBy` | In a team workspace, the tasks one person has: "what's on Priya's plate this week?", "what has Kim got open?", "what did Priya give me?". |
| `get_team_tasks` | R | `period` | In a team workspace, everyone's plate at once: for each member, how many tasks they have open and done in the period and what the open ones are, plus the tasks no one has. |
| `get_team_digest` | R | none | The team workspace's week in one read: each person's open and finished tasks this week and their timed hours (heavy when over 40), how each team goal moved (its status and reason, what was… |

## Notebook and meeting notes

| Tool | | Parameters | What it does |
|---|---|---|---|
| `search_notebook` | R | `text`, `tags`, `book`, `from`, `to`, `source` | Search the user's notebook, its notes and jots, by words, #tags, a saved book, a date range or where it was written. |
| `get_notebook_note` | R | `id`* | Read one notebook note in full, with its tags, linked tasks, clipped links (each page's title and description), its photos by id and caption (you can't see the photos), whether it starts a page,… |
| `list_notebook_tags` | R | none | Every #tag in the notebook with how many notes carry it, most used first. |
| `list_books` | R | none | The user's notebook books. |
| `jot` | W | `text`* | Quick capture into Jot, the notebook quick-capture pad. |
| `create_notebook_note` | W | `body`*, `tags`, `book` | Write a note in the user's notebook. |
| `append_to_note` | W | `id`*, `text`* | Add text to the end of a notebook note. |
| `update_notebook_note` | D | `id`*, `body`, `tags`, `baseUpdatedAt` | Replace a notebook note's text or tags. |
| `delete_notebook_note` | D | `id`* | Delete a notebook note. |
| `link_note_to_task` | D | `noteId`*, `taskId`* | Link a task to a notebook note, so the note shows the task and the task shows the note. |
| `unlink_note_task` | D | `noteId`*, `taskId`* | Unlink a task from a notebook note. |
| `note_to_tasks` | D | `noteId`*, `titles` | Turn a notebook note's lines into tasks in the inbox and link them back to the note. |
| `meeting_to_tasks` | D | `title`, `noteId`, `decisions`, `actions`* | Turn meeting notes, a transcript, or pasted text into tasks. |
| `add_link_to_note` | W | `id`*, `url`* | Clip a web link onto a notebook note, with the page preview the notebook shows. |
| `delete_note_photo` | D | `noteId`*, `photoId`* | Delete a photo from a notebook note. |
| `start_new_page` | D | `id`*, `on` | Make a notebook note start a new page, so it begins on a fresh page in the notebook. |
| `move_note` | D | `id`*, `targetId`*, `where`* | Move a note above or below another note written the same day, as the user sees them: the notebook lists notes oldest first, and Jot lists jots newest first. |
| `create_book` | W | `name`*, `tags`, `words` | Create a notebook book: a saved search that gathers notes by tags and words. |
| `rename_book` | D | `book`*, `name`* | Rename a notebook book. |
| `delete_book` | D | `book`* | Delete a notebook book. |

## Period notes and journals

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_notes` | R | none | Get the user's period notes: notes pinned to a day, week, month, quarter or year. |
| `create_note` | W | `content`*, `title`, `periodType`, `periodDate`, `period` | Pin a note to a period when the user asks for a note on one, like "a note for this week". |
| `update_note` | D | `id`*, `title`, `content`, `periodType`, `periodDate`, `period` | Update a period note, or move it to a different period. |
| `delete_note` | D | `id`* | Delete a period note. |
| `get_journals` | R | none | Get the user's recent journal entries |
| `create_journal` | W | `content`*, `title`, `type`, `periodType`, `periodDate`, `period` | Create a journal entry. |
| `update_journal` | D | `id`*, `title`, `content`, `periodType`, `periodDate`, `period` | Update a journal entry, or move it to a different period |
| `delete_journal` | D | `id`* | Delete a journal entry |

## Lists and projects

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_lists` | R | none | Get the user's task lists |
| `get_list_tasks` | R | `id`* | Get tasks inside a specific list |
| `create_list` | W | `name`*, `description`, `color` | Create a new task list |
| `update_list` | D | `id`*, `name`, `description`, `color` | Rename or update a list's color or description |
| `delete_list` | D | `name`, `id`, `deleteTasks` | Delete a list — fully interactive. |
| `get_projects` | R | none | Get the user's projects |
| `create_project` | W | `name`*, `description`, `color` | Create a new project |
| `update_project` | D | `id`*, `name`, `description`, `color` | Rename or update a project's color or description |
| `delete_project` | D | `id`*, `deleteTasks` | Delete a project. |

## Focus

| Tool | | Parameters | What it does |
|---|---|---|---|
| `start_focus` | W | `minutes`, `name`, `taskIds` | Start a focus session on the user's own focus timer. |
| `pause_focus` | D | none | Pause the user's running focus session. |
| `resume_focus` | D | none | Resume the user's paused focus session from where it stopped. |
| `stop_focus` | D | none | Stop the user's focus session now and record how many minutes they focused, paused time left out. |
| `get_focus_sessions` | R | `date` | Get recent focus/Pomodoro sessions |
| `start_focus_session` | W | `name`, `duration`, `notes`, `forceNew` | Start a focus (Pomodoro) session. |
| `end_focus_session` | D | `id`*, `actualDuration`, `notes` | End / complete an active focus session |
| `add_tasks_to_focus_session` | D | `tasks`* | Add tasks to the currently active focus session. |
| `add_note_to_focus_session` | D | `note`* | Add or replace the notes on the currently active focus session. |

## Habit challenges

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_challenges` | R | `challengeId`, `date` | The user's habit challenges and the habits due on a day, today by default: each habit with whether it is done that day, how many times this week, and whether that day can still be marked. |
| `list_challenges` | R | none | Every habit challenge the user is in, upcoming, active or finished: its dates, length, whether they started it, how many people do it and cheer, and whether its join link is on. |
| `get_challenge_week` | R | `challenge`*, `week` | One challenge as its card shows a week: the habits, who does which, how many days each person marked each habit that week, and the invites still open. |
| `check_in_challenge` | D | `habit`*, `challenge`, `date`, `answer` | Mark a habit in one of the user's challenges done for a day, mark it not done, or clear the mark, as the user does on the challenge card: "I ran today", "I didn't read yesterday". |
| `create_challenge` | W | `name`*, `startDate`, `length`, `habits`*, `myHabits` | Start a habit challenge the user leads: a name, a start day (today unless they say), a length (open, 4w or 30d; 4w unless they say) and one to a few habits. |
| `update_challenge` | D | `challenge`*, `name`, `startDate`, `length`, `link`, `whoInvites` | Change a challenge the user started: rename it, move its start or change its length (only before it starts), turn its join link on or off, or let every member invite people. |
| `change_challenge_habits` | D | `challenge`*, `add`, `change`, `remove` | Add, change or remove habits in a challenge the user started. |
| `choose_my_habits` | D | `challenge`*, `habits`* | Set which habits the user does in a challenge, as the whole list. |
| `invite_to_challenge` | D | `challenge`*, `emails`*, `note` | Email people an invite to join a challenge, with an optional short note. |
| `leave_challenge` | D | `challenge`* | Take the user out of a challenge someone else started. |
| `end_challenge` | D | `challenge`* | End a challenge the user started, for everyone in it. |

## Calendars

| Tool | | Parameters | What it does |
|---|---|---|---|
| `list_calendars` | R | none | List the user's connected Google and Outlook calendars. |
| `set_calendar_visibility` | D | `calendarId`*, `on`* | Turn a connected calendar on or off. |
| `set_default_calendar` | D | `calendarId`, `for`, `clear` | Choose which calendar new events, or new timed tasks, are added to. |
| `sync_calendar_now` | D | `calendarId` | Pull the latest events from a connected calendar now instead of waiting for the next automatic sync. |
| `discover_calendars` | D | `calendarId` | Look for calendars added to a connected Google or Outlook account since it was connected, and add them to QTR, e.g. |
| `disconnect_calendar` | D | `calendarId`*, `scope`, `removeEvents` | Disconnect a calendar from QTR. |

## Connected apps (Asana, Todoist, ClickUp)

| Tool | | Parameters | What it does |
|---|---|---|---|
| `list_connections` | R | none | List the user's connected task apps (Asana, Todoist, ClickUp): each connection's id, status, whether it is paused or needs reconnecting, two-way sync, last sync, the QTR workspace it syncs with,… |
| `browse_integration` | R | `connectionId`*, `what`, `workspaceId` | Look inside a connected app: its workspaces, its projects (Asana; in Todoist the workspaces are its projects, in ClickUp its lists), or the tasks in one of them. |
| `sync_integration_now` | D | `connectionId`* | Pull the latest tasks from a connected app now instead of waiting for the next automatic sync. |
| `pause_integration` | D | `connectionId`* | Pause syncing with a connected app ("pause my Asana sync for today"). |
| `resume_integration` | D | `connectionId`* | Resume syncing with a paused connected app. |
| `update_integration_settings` | D | `connectionId`*, `workspaceId`, `projects`, `lists`, `defaultProjectId`, `twoWay` | Change what a connected app syncs: the QTR workspace it syncs with, which of its projects or lists sync, the project new QTR tasks go to, and two-way sync. |
| `export_tasks_to_integration` | D | `connectionId`*, `taskIds`, `include` | Send QTR tasks to a connected app: the chosen tasks (up to 25), or every open task in the workspace the connection syncs with (include: recent, the default, means touched in the last 30 days or… |
| `disconnect_integration` | D | `connectionId`*, `removeTasks` | Disconnect a connected app. |

## Sharing and desks

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_sharing` | R | `cardType`*, `cardName`, `cardId` | Who has access to a list or goal: each person, their role and whether they have accepted, the desks it is on, and whether its link is on (anyone with the link can open it). |
| `shared_with_me` | R | none | Lists, goals and desks other people shared with the user, newest first: who shared each, the user's role, and whether they have seen it; plus shares that ended recently (removed, left, or made… |
| `mark_shared_seen` | D | `items`, `ended`, `all` | Mark shared items as seen and acknowledge ended shares, so they stop showing as new. |
| `keep_shared_item` | D | `link`* | Keep a list, goal or desk the user opened from a share link: they join it as a viewer, or an editor when the link allows editing. |
| `share_with` | D | `cardType`*, `cardName`, `cardId`, `person`*, `role` | Share a list or goal with someone the user already knows (a workspace teammate or someone they have shared with before), as an editor or a viewer. |
| `invite_to_card` | D | `cardType`*, `cardName`, `cardId`, `email`*, `role` | Invite someone by email to a list or goal, as an editor or a viewer. |
| `set_share_link` | D | `cardType`*, `cardName`, `cardId`, `on`*, `canEdit` | Turn a list's or goal's link on or off. |
| `remove_from_card` | D | `cardType`*, `cardName`, `cardId`, `person`* | Remove someone from a list or goal, or cancel their pending invitation. |
| `stop_sharing_with_desk` | D | `cardType`*, `cardName`, `cardId`, `desk`* | Stop sharing a list or goal with everyone on a desk; it leaves their desk, and people it was shared with one by one keep it. |
| `list_desks` | R | none | The user's saved desks in this workspace, their own and the ones shared with them: each desk's name, the user's role on it (owner, editor or viewer), who owns it, how many people it is shared… |
| `share_desk` | D | `deskName`, `deskId`, `email`*, `role` | Share one of the user's desks with someone by email, as an editor (the default) or a viewer. |

## Workspaces

| Tool | | Parameters | What it does |
|---|---|---|---|
| `list_workspaces` | R | none | The workspaces the user belongs to: their personal workspace and any team workspaces, with the user's role in each and which one is active (the one these tools act in). |
| `list_members` | R | `workspace` | The members of a workspace with their roles (owner or member), plus pending invites. |
| `create_workspace` | W | `name`*, `color` | Create a new team workspace; the user becomes its owner. |
| `rename_workspace` | D | `workspace`, `name`* | Rename a team workspace. |
| `set_workspace_icon` | D | `workspace`, `color`, `removePicture` | Change a workspace icon: its color, or remove its uploaded picture so the colored initial shows. |
| `invite_member` | D | `workspace`, `email`* | Invite someone by email to a team workspace. |
| `create_invite_link` | D | `workspace` | Turn on the invite link of a team workspace: anyone with it can join as a member. |
| `revoke_invite_link` | D | `workspace`, `replace` | Turn off the invite link of a team workspace so it stops working, or replace it with a new one (replace: true). |
| `remove_member` | D | `workspace`, `member`* | Remove a member from a team workspace, or withdraw a pending invite. |
| `change_member_role` | D | `workspace`, `member`*, `role`* | Make another member the owner of a team workspace. |
| `leave_workspace` | D | `workspace` | Leave a team workspace. |

## Account, settings and support

| Tool | | Parameters | What it does |
|---|---|---|---|
| `get_profile` | R | none | Get the user's profile — name, email, timezone, theme, first day of the week, general preferences and Ansel's persona |
| `update_profile` | D | `name`, `theme`, `calendarView`, `showCompletedTasks` | Update the user's display name, theme, or general preferences (calendar view, showing completed tasks). |
| `update_week_and_time_settings` | D | `firstDayOfWeek`, `timeZone` | Change which day the user's week starts on, or their time zone ("start my week on Monday", "I moved to London"). |
| `get_score` | R | none | Get the user's current score, level, and credibility factor |
| `get_streak` | R | none | Get the user's current activity streak and freeze days |
| `get_plan` | R | none | Get the user's plan (PRO, TRIAL or FREE), when a trial ends, and how much of the monthly AI allowance and the task and goal limits is used and left (limit null means unlimited). |
| `get_referral_link` | R | none | Get the link and code the user shares to refer friends to QTR, with how many people they invited, how many signed up, and the credit earned. |
| `get_notifications` | R | `unseenOnly`, `limit` | The user's notification bell, newest first: mentions, comments on their tasks, shares, workspace and challenge invites and their answers, notes and replies people sent. |
| `get_notification_settings` | R | none | Get the user's notification settings: when the daily pending-tasks email goes out (or off), the weekly review email day, the product update and tips emails, and the notification types switched off… |
| `update_notification_settings` | D | `dailyPendingTasksEmail`, `weeklyReviewEmail`, `productUpdates`, `timeTips`, `type`, `channel`, `enabled` | Change the user's notification settings; only the fields you pass change. |
| `send_feedback` | D | `message`* | Send the user's feedback about QTR to the QTR team, in the user's own words. |
| `report_problem` | D | `description`*, `subject`, `category`, `severity` | Report a problem or bug with QTR to the QTR support team as a ticket. |
| `get_my_tickets` | R | `id` | The support tickets the user sent QTR and their status, newest first; pass id for one ticket with its latest replies from support. |
| `reply_to_ticket` | D | `id`*, `body`* | Reply to one of the user's support tickets, as the user. |
| `get_skill_version` | R | `version` | The newest version of the QTR skill, what changed in it, and how to update it in each app. |
