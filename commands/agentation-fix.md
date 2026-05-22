---
name: agentation-fix
description: Session-2 fix loop for Agentation — read structured annotations from the dev overlay and apply targeted UI fixes.
---

# Agentation fix

Spawn or emulate the **agentation-fix-loop** subagent (`agents/agentation-fix-loop.md`).

1. Load `skills/design-engineering/references/meta/agentation-workflow.md`, `review-format.md`, `gotchas.md`, and `pov.md`.
2. Pull annotations from Agentation MCP or pasted markdown the user provides.
3. Fix one annotation at a time; keep diffs minimal and defensible in Before/After/Why terms.
4. Do not commit unless the user asked.

If annotations are missing, ask the user to export or paste them before editing code.
