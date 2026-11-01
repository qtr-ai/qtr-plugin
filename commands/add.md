---
description: Add tasks to QTR from plain words, one or many
argument-hint: "<what to add, e.g. call the bank friday, book the dentist next week>"
---

Add these to QTR as tasks, using the qtr skill: $ARGUMENTS

- Work out each task's period in the user's time zone: "friday" is a day, "next week" is a week, and nothing said means today. Add `dueDate` only when they named a time of day.
- One task: `create_task`. More than one: `create_tasks`, in a single call.
- Then say where each landed, using `placedIn` (Inbox, Today, Tomorrow, This week or a date), and name any that couldn't be added and why.
