---
name: svg-animate
description: Animate an SVG — icon, logo reveal, stroke draw, morph, mascot loop — or turn a frame sequence / flat clip into one editable animated SVG, with the engine chosen for where the file lives.
---

# SVG animate

Spawn or emulate the **svg-animator** subagent (`agents/svg-animator.md`).

1. Decide whether it should move at all: `skills/design-engineering/references/motion/animation-decision-framework.md`.
2. Load `references/svg/svg-animation.md`; `svg-path-morphing.md` for shape changes; `video-to-vector-pipeline.md` for frames or clips.
3. Load `gotchas.md` and `pov.md`. If the file has unnamed groups or no `viewBox`, run `/svg-create` first.
4. Pick the engine (inline CSS/WAAPI · project motion library · embedded keyframes or SMIL for image use · `scripts/svg-flipbook.mjs` for frames), write it with values from `easing-curves.md` and `duration-table.md`, add the reduced-motion path.
5. Return the motion plan (trigger, engine, groups, values, reduced motion, size) and the file.
