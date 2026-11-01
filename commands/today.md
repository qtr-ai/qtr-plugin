---
description: Brief me on today in QTR, then offer to time-block it
argument-hint: "[anything to focus on]"
---

Brief the user on today in QTR, using the qtr skill.

1. Call `get_day_brief` with `part: "morning"`.
2. Share, in a few lines: the top three, the meetings, anything overdue or at risk, and what changed in connected apps.
3. If the brief has a `suggestedMove`, say what it would change and run it only if the user says yes.
4. Offer `plan_time_blocks` to fit the untimed tasks around the meetings. It previews first; nothing moves until they agree.

$ARGUMENTS
