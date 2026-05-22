---
name: motion-audit
description: Audit animation timing, easing, springs, and transitions — decide first whether motion should exist, then apply the motion cluster.
---

# Motion audit

Spawn or emulate the **motion-auditor** subagent (`agents/motion-auditor.md`).

1. Read `skills/design-engineering/references/motion/animation-decision-framework.md`. If motion should not exist, recommend removal and stop.
2. Load the relevant motion nodes for the pattern (entrance, hover, gesture, stagger, route transition, shake).
3. For code in hand: return a Before | After | Why table. For greenfield motion: return a short motion plan with cited `[[nodes]]`.
4. Respect `gotchas.md` and `pov.md` overrides.

Keep recommendations concrete — durations, easing tokens, properties animated.
