---
description: Show a goal's map in QTR and what to do next on it
argument-hint: "<goal name>"
---

Show the user their goal in QTR, using the qtr skill: $ARGUMENTS

1. Find the goal with `get_goals`. If more than one could match, ask which.
2. Call `get_goal_map` with its id. In apps that show views, the map appears under your reply.
3. Say in a few lines how far along it is and the next one or two tasks. Offer `get_goal_status` for whether it's on track, or `map_goal` if it has no map yet.
