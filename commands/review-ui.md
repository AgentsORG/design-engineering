---
name: review-ui
description: Run a UI code review on the current snippet — Before / After / Why table per review-format, scoped to review-checklist.
---

# Review UI

Spawn or emulate the **ui-reviewer** subagent (`agents/ui-reviewer.md`).

1. Load `skills/design-engineering/references/meta/review-format.md`, `review-checklist.md`, `gotchas.md`, and `pov.md`.
2. Read the UI code the user pointed at (selection, file, or diff).
3. Return only the Before | After | Why table (three to five rows max). Every Why ends with a `[[wikilink]]`.
4. If nothing fails the checklist, say so in one sentence.

Do not add prose around the table unless the user asked for narrative.
