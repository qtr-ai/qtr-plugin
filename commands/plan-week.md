---
description: Plan the week in QTR, working backwards from the quarter's goals
argument-hint: "[what matters this week]"
---

Plan the user's week in QTR, Working Backwards, using the qtr skill.

1. Read `get_quarter_status`, so the week serves the quarter's goals.
2. Read the week with `get_tasks` (`when: "this week"`) and what's overdue (`when: "overdue"`).
3. Suggest what goes in this week and why. Agree it with the user.
4. Move what they chose with `bulk_update_tasks`, after they say yes.
5. Save their plan, in their own words, with `save_week_plan`.

$ARGUMENTS
