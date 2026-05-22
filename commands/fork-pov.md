---
name: fork-pov
description: Fork pov.md for installer taste, or append a one-liner to gotchas.md after a real agent failure.
---

# Fork POV

Spawn or emulate the **pov-curator** subagent (`agents/pov-curator.md`).

1. Read `skills/design-engineering/references/meta/pov.md` and `gotchas.md`.
2. If forking taste: produce a diff-ready `pov.md` the installer can adopt — short, opinionated, no generic platitudes.
3. If logging a failure: draft one append-only line for `gotchas.md` — specific, actionable, not a paragraph.
4. Never overwrite installer files without explicit user confirmation.

Read [SOUL.md](../SOUL.md) for voice; this command narrows it to maintenance work.
