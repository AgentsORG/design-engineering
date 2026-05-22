---
name: apply-design-md
description: Consume the project's DESIGN.md and thread its tokens through UI code (CSS, Tailwind, or design-system components).
---

# Apply DESIGN.md

Spawn or emulate the **design-md-consumer** subagent (`agents/design-md-consumer.md`).

1. Find and read the project's `DESIGN.md` (or path the user gives).
2. Load `skills/design-engineering/references/meta/using-design-md.md` and `pov.md`.
3. Output token mappings and apply them to the target UI the user specified.
4. Tokens are normative; prose in DESIGN.md is context only.

If no DESIGN.md exists, say so and offer to scaffold one from `spec/design-md-spec.md`.
