# People, workspaces, calendars, apps and account

## Contents

- [Teams](#teams)
- [Sharing lists, goals and desks](#sharing-lists-goals-and-desks)
- [Workspaces](#workspaces)
- [Calendars](#calendars)
- [Connected apps](#connected-apps)
- [Account, notifications and support](#account-notifications-and-support)

Most of these reach other people or change connections. Confirm before each change (rule 1 in SKILL.md).

## Teams

These need a team workspace:

| The user says | Use |
|---|---|
| "How did the team's week go?" | `get_team_digest`: each person's open and done tasks and hours, how each team goal moved, and what was handed to the user |
| "What's on Priya's plate?", "What did Priya give me?" | `get_member_tasks` with `member` (name, username, email or "me"), and optionally `period` and `assignedBy` |
| "Everyone's load this week" | `get_team_tasks` |
| "Give this to Kim" | `update_task` with `assignee`. `"nobody"` unassigns |

## Sharing lists, goals and desks

- **Read:**
  - `get_sharing` shows who has access to a list or goal, their role, and whether its link is on.
  - `shared_with_me` shows what others shared with the user; `mark_shared_seen` clears the "new" marks.
- **Share:**
  - `share_with` shares with someone the user already knows (a teammate, or someone shared with before).
  - `invite_to_card` invites by email.
  - `set_share_link` turns the link on or off (`canEdit` lets link visitors edit).
- **Stop sharing:** `remove_from_card` takes someone off, or cancels an invite. `stop_sharing_with_desk` stops sharing with everyone on a desk.
- **Join:** `keep_shared_item` joins a list, goal or desk the user opened from a share link.
- **Desks:** `list_desks` shows saved desks and roles; `share_desk` shares one by email.
- **Names:** cards are named by `cardType` (`list` or `goal`) and `cardName` or `cardId`. People are named by name or email.

## Workspaces

- **Read:** `list_workspaces` shows the user's workspaces, their role and which one is current. `list_members` shows a workspace's members and pending invites.
- **Create and edit:** `create_workspace`, `rename_workspace`, and `set_workspace_icon` (owner only).
- **Invite:** `invite_member` sends an email invite. `create_invite_link` and `revoke_invite_link` manage the invite link (owner only).
- **Members:**
  - `remove_member` removes someone. What they made passes to the owner.
  - `change_member_role` hands ownership to another member, and the user becomes a member.
  - `leave_workspace`: an owner must hand the workspace over first.

Tools act in the user's current workspace. To work in another one, ask the user to switch, or use `ui_command` with `switch_workspace` while QTR is open.

## Calendars

- **Read:** `list_calendars` lists connected Google and Outlook calendars, which are on, and where new events and timed tasks go. Answer "how many calendars?" from its summary.
- **Settings:**
  - `set_calendar_visibility` shows or hides a calendar.
  - `set_default_calendar` chooses where new events or timed tasks go.
  - `create_task` with `calendarId` puts one timed task on a chosen calendar.
- **Sync:** `sync_calendar_now` pulls the latest events. `discover_calendars` adds calendars created since connecting.
- **Disconnect:** `disconnect_calendar` disconnects one calendar or a whole account (rule 1).
- **Connect:** connecting needs the user's sign-in. With QTR open, `ui_command` with `start_connect` (`provider: "google"` or `"outlook"`) starts it.

## Connected apps

Asana, Todoist and ClickUp:

- **Read:** `list_connections` shows status, paused or needs-reconnect, two-way sync, and what syncs. `browse_integration` looks at an app's workspaces, projects or lists, and their tasks.
- **Sync:** `sync_integration_now` syncs now. `pause_integration` and `resume_integration` pause and resume.
- **Settings:** `update_integration_settings` sets the QTR workspace it syncs with, which projects or lists sync, the default project, and two-way sync.
- **Sending tasks:** `export_tasks_to_integration` sends chosen tasks, or every open task, to the app (rule 1).
- **Disconnect:** `disconnect_integration`. Its tasks stay in QTR unless `removeTasks` is true (rule 1).
- **Connect:** `ui_command` with `start_connect` (`provider` `asana`, `todoist` or `clickup`) while QTR is open.

## Account, notifications and support

| The user says | Use |
|---|---|
| "What's my time zone?" | `get_profile` (also the first day of the week, theme and preferences) |
| "Change my name", "dark theme", "hide completed tasks" | `update_profile` (`name`, `theme`, `calendarView`, `showCompletedTasks`) |
| "Start my week on Monday", "I moved to London" | `update_week_and_time_settings` (rule 1) |
| "What plan am I on?", "How much AI do I have left?" | `get_plan` |
| "What's my score?", "...my streak?" | `get_score`, `get_streak` |
| "What's my referral link?" | `get_referral_link` |
| "Anything new for me?" | `get_notifications` (the bell) |
| "Stop the daily email" | `get_notification_settings`, then `update_notification_settings` |
| "Tell the QTR team..." | `send_feedback` (rule 1) |
| "Something's broken" | `report_problem` (rule 1) |
| "Did support reply?" | `get_my_tickets`, then `reply_to_ticket` (rule 1) |
