# The open desk

In the QTR app, the user works on a desk of cards. Two connector tools reach the desk they have open right now, in the browser or the QTR Mac app:

- **`get_desk`** reads it: the desk's name, the cards front to back, and what each card shows (tasks, goals, notes). Pass `cardId` to read one card.
- **`ui_command`** acts on it the way the user would by hand: open, move, resize, tidy or tuck cards, flip a goal card, step a card to another day, switch or save desks, open a Settings page, start connecting an app, or start the Breather or the tour.

## Contents

- [When QTR isn't open](#when-qtr-isnt-open)
- [How commands behave](#how-commands-behave)
- [Desk commands](#desk-commands)
- [What only the user can do](#what-only-the-user-can-do)

## When QTR isn't open

Both tools work only while QTR is open on the desk.
- **No desk open:** the result says so. Ask the user to open app.qtr.ai or the Mac app and try again.
- **More than one tab open:** the command goes to the one in front, or else the one used last.
- **Saved desks:** to see the user's saved desks without the app open, use `list_desks`.

## How commands behave

- **Card ids:** use the ids `get_desk` shows. To open a goal, list, notebook or connection by what the user calls it, pass `name` (and optionally `kind`) instead of `cardId`. The result says which one opened and what else matched.
- **Results:** each result says whether the command worked and how the desk looks now. Chain steps one at a time, and stop at the first failure.
- **Confirmation:** commands marked "asks the user first" show a question in QTR. The result says it asked, and the user answers in the app.
- **View-only desks:** a desk shared with the user only to view can't be rearranged, and the result says so.
- **Data:** desk commands never change data. Move or complete tasks, and start or stop focus, with the task and focus tools. The connector refuses data commands and points you to the right tool.
- **Receipts:** each command leaves a receipt in Ansel's chat in the app, so the user can see what you did.
- **Tile, not snap:** the desk calls snapping Tile. `snap_card` tiles a card, `unsnap_card` untiles it, `snap_all` and `unsnap_all` are Tile all and Untile all, and a card marked `snapped` is tiled. Say tile, untile and tiled to the user, never snap.

## Desk commands

Card ids: `today`, `week`, `quarter`, `cascade`, `calendar`, `photocal`, `inbox`, `important`, `urgent`, `matrix`, `notebook`, `jot`, `clock`, `gita`, `ansel`, `breather`, `meditation`; or `goal:<id>`, `list:<id>`, `book:<id>`, `int:<id>`, `day:<YYYY-MM-DD>`.

| Command | Arguments | Asks the user first |
|---|---|---|
| `open_card` | cardId, or name (+ kind?: goal | list | book | connection) to open one by what the user calls it. cardId: a catalog id (today, week, quarter, cascade, calendar, photocal, inbox, important, urgent, matrix, notebook, jot, clock, gita, ansel, breather, meditation) or goal:<id>, list:<id>, book:<id>, int:<id>, day:<YYYY-MM-DD> |  |
| `focus_card` | cardId |  |
| `full_screen` | cardId |  |
| `exit_full` | none |  |
| `set_card_view` | cardId, view: list | map |  |
| `set_goal_face` | cardId: quarter, goalId (null clears the face) |  |
| `set_period` | cardId (today | week | quarter), and day: YYYY-MM-DD, or week + year, or quarter + year |  |
| `set_calendar_view` | view: month | week | day, anchor?: YYYY-MM-DD. Brings the Calendar card out and switches it to that view; full_screen with cardId calendar opens it full screen |  |
| `set_horizons` | level: year | quarter | week | day, goalId? |  |
| `open_leaf` | leaf: week | quarter | schedule |  |
| `set_person_filter` | cardId, who: me | unassigned | everyone | a member id |  |
| `open_task` | taskId |  |
| `select_tasks` | taskIds |  |
| `clear_selection` | none |  |
| `open_assignee_picker` | taskId |  |
| `open_note` | noteId |  |
| `open_book` | bookId |  |
| `search_notebook_ui` | query |  |
| `start_breather` | none |  |
| `start_meditation` | script? |  |
| `draw_gita` | none |  |
| `open_share_sheet` | cardId |  |
| `open_settings` | section: general | notifications | connectors | ai-provider | automation | ansel | ansel-activity | ansel-routines | ansel-memory | profile | workspaces | plan-billing | refer-earn | help-about. ansel opens the Ansel settings (how much Ansel speaks up, brief and wrap hours, muted nudges); ansel-activity opens the list of what Ansel read and changed; ansel-routines opens the routines Ansel runs on a schedule, with their runs; ansel-memory opens what Ansel remembers about the user |  |
| `switch_workspace` | workspaceId |  |
| `start_connect` | provider: asana | todoist | clickup | google | outlook |  |
| `open_upgrade` | none |  |
| `start_tour` | none |  |
| `tuck_card` | cardId |  |
| `move_card` | cardId, and x + y, or beside: cardId + side: left | right |  |
| `resize_card` | cardId, and w + h, or reset: true |  |
| `snap_card` | cardId |  |
| `unsnap_card` | cardId |  |
| `snap_all` | none |  |
| `unsnap_all` | none |  |
| `straighten_card` | cardId, straight: true | false |  |
| `deal` | name: today | notes |  |
| `tidy` | focus?: cardId |  |
| `fit_everything` | none |  |
| `infinite_canvas` | on: true | false |  |
| `clear_desk` | none |  |
| `lock_desk` | locked: true | false. Only unlock when the user asks. |  |
| `install_pack` | packId |  |
| `remove_pack` | packId |  |
| `take_from_shelf` | item: a Card shelf item id: today, week, quarter, cascade, goals, calendar, photocal, inbox, lists, connections, matrix, important, urgent, notebook, jot, notebooks, clock, breather, meditation, gita, challenges. Puts it in the Cards menu; a card also comes out on the desk |  |
| `put_back_on_shelf` | item: a Card shelf item id: today, week, quarter, cascade, goals, calendar, photocal, inbox, lists, connections, matrix, important, urgent, notebook, jot, notebooks, clock, breather, meditation, gita, challenges. Takes it off the Cards menu and tucks its cards away |  |
| `switch_desk` | deskId or a preset name |  |
| `save_desk` | none |  |
| `save_desk_as` | name |  |
| `rename_desk` | name |  |
| `rename_book` | bookId, name |  |
| `discard_changes` | none | yes |
| `delete_desk` | deskId | yes |
| `leave_shared_card` | cardId | yes |
| `sign_out` | none | yes |

## What only the user can do

Some things need the user's own hands, and no tool does them. For each, open the right place and let the user act:

| Thing | Open it with |
|---|---|
| Sign in to connect Google or Outlook Calendar, Asana, Todoist or ClickUp | `ui_command` with `start_connect` and the `provider` |
| Connect Google contacts | `open_settings` with `section: "connectors"` |
| Change plan or pay | `open_upgrade`, or `open_settings` with `section: "plan-billing"` |
| Enter their own AI key | `open_settings` with `section: "ai-provider"` |
| Add photos to notes or chat, or upload a workspace picture | in the app |
| Delete their account or a workspace, accept an invite, sign out | in the app |
