---
name: svg-create
description: Author or clean up an SVG asset — icon, illustration, mascot pose, logo mark — so it scales from viewBox, recolors from tokens, animates without a rewrite, is optimized, and has an accessible name.
---

# SVG create

Spawn or emulate the **svg-creator** subagent (`agents/svg-creator.md`).

1. Load `skills/design-engineering/references/svg/svg-creation.md` and `references/components/icon-systems.md`; `svg-animation.md` if the asset will move.
2. Load `gotchas.md` and `pov.md`; read the project's `.design` / `DESIGN.md` for colors, stroke weight, and icon set.
3. Draw on a whole-number grid with named groups, `currentColor` or `var(--token, #fallback)` colors, `<defs>`/`<symbol>` for repeats; or refactor the given file to that shape.
4. Run SVGO with `viewBox`, animated ids, and `<title>`/`<desc>` preserved; diff the render.
5. Return the file, size before → after, and a Before | After | Why table for refactors.
