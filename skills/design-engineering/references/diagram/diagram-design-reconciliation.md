---
title: diagram-design-reconciliation
summary: Where diagram-design, a project's .design contract and this graph give different values for a figure (skin source, paper, families, accent, component tokens, small type, motion clock, export, pov) and which value to use inside a diagram-design file.
tags: [diagram, diagram-design, precedence, companions, design-file]
---

# diagram-design reconciliation

Inside a diagram-design file, diagram-design's geometry, connector rules, type ramp and motion controller win, because its scripts check them and its linter rejects edits to the controller. The project's design contract supplies the skin: the color roles and the type families. This graph owns three things: whether to draw at all ([[diagram-decision]]), whether the figure moves ([[animation-decision-framework]]), and the review ([[diagram-craft]]). Where two of these give different values, the table names the one to use.

## Precedence

User prompt → nearest `.design` (or DESIGN.md) for the skin → the project's `.diagram-design` profile → diagram-design's rules for geometry, type ramp and motion → this graph → model defaults. A `.design` outranks every generic taste skill ([[using-design-file]]), and diagram-design's shipped style guide is one: its defaults are taste, not the project's brand.

## The handoff

diagram-design's first-run gate asks where the skin comes from. Its own discovery reads CSS, token JSON, Markdown and HTML `<style>` blocks. A `.design` file is YAML, and none of its patterns match it. So read the contract here ([[using-design-file]], or spawn [[design-md-consumer]]), map it onto the roles `paper`, `paper-2`, `ink`, `muted`, `soft`, `rule`, `accent`, `accent-tint` and `link`, and answer the gate with option (d), pasted tokens. Then offer to save a named profile. Write the `.diagram-design` marker (`profile: <slug>`) only with consent, as diagram-design's own rules require.

## The table

| Topic | diagram-design | Contract or this graph | Use inside a diagram-design file |
|---|---|---|---|
| Paper | warm-neutral, never pure white; URL onboarding swaps `#ffffff` for `#fafaf7` and asks | the contract's surface token | the contract's surface, white included; the contract is the confirmation it asks for |
| Families | Instrument Serif for title and callouts, Geist 600 names, Geist Mono technical text; keep the serif even when the brand is all-sans; never JetBrains Mono | the contract's typography | the contract's families in those role slots; the serif only if the contract has one or says nothing; mono stays for technical text, in the contract's mono |
| Accent | one accent, on 1–2 elements | the contract's signature color | the contract's accent in the `accent` role; the 1–2 limit still holds |
| Component tokens (radius, elevation, padding) | node `rx` 6, no shadows | bind to the components that list them | not mapped: a figure node is not a contract component; no shadows |
| Small type | names 12, sublabels 9, arrow labels 8 on doc presets; 16 / 12 / 12 on slides | below 12px needs an excuse ([[line-behavior]]) | diagram-design's ramp, in SVG units held at the viewBox width; a figure scaled below that width is a finding, and so is the doc ramp on a projected slide |
| Motion | static by default; `reveal` runs once, `step` waits for the reader; clock 160 / 480 / 720 ms, ease `cubic-bezier(.2,.8,.2,1)`, ≤8 steps, ≤24px travel; the controller copied verbatim | UI under 300 ms ([[duration-table]]) | diagram-design's clock: a 480 ms step is reading pace, not UI feedback, so don't flag it against the duration table; this graph still decides whether to animate |
| Reduced motion | the complete static frame, controls hidden | [[prefers-reduced-motion]] | the same; no conflict |
| Export | manual only; `export_svg.py` carries class CSS and namespaces `<defs>` ids | [[svg-creation]]'s SVGO pass | export with `export_svg.py` only when asked; SVGO afterwards keeping `viewBox`, `<title>` and `<desc>` |
| [[pov]] | none | the Duolingo sections govern product UI | a figure follows contract → profile → diagram-design; pov's "Diagrams (HKTITAN)" sets the defaults where all three are silent |

## When to apply

Any diagram-design figure in a project that ships a `.design`, a DESIGN.md or a `.diagram-design` marker, and any review of such a figure by [[ui-reviewer]] or [[motion-auditor]].

## Gotcha

Don't let diagram-design's defaults pose as the brand. Its shipped tokens (paper `#f5f5f5`, ink `#2d3142`, accent `#eb6c36`) trigger the first-run gate for a reason, and skipping the gate in a branded project ships someone else's palette. The reverse also happens: re-skinning the connector rules or the type ramp "to match the brand" breaks the checks diagram-design runs on them. The brand reaches the color roles and the families, and nothing else. diagram-design moves fast (plugin 2.6.68 on 2026-10-08), so re-read the named file before relying on a row.

## Sources

- Cathryn Lavery, `diagram-design` (MIT; HEAD `f4547ee`, read 2026-10-08): SKILL.md §0 (style-guide gate), §5, §10, §12; `references/style-guide.md` (roles, constraints), `onboarding.md` (§ Skill, § Folder, option d), `profiles.md` (marker, consent), `output-spec.md` (type ramp per preset), `animation.md` (modes, clock, controller), `export.md`.
- AgentsORG `.design` spec §5 (precedence); this repo's `templates/design-engineering.design`.
