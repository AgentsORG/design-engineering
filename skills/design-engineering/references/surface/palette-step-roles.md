---
title: palette-step-roles
summary: A system is one neutral ramp, one accent ramp and only the status ramps the product renders. Every step exists because a role consumes it (Tailwind 50–950 by lightness, Radix 1–12 by role), solid fills sit on 600 because white on 500 fails, status hues stay 15° from the accent, one filled action per view, and an existing palette is inventoried before it is restructured.
tags: [surface, color, palette, ramps, status, audit]
---

# Palette step roles

A ramp is not a gradient to pick from by eye. Each step exists because a role needs it — page background, hover, border, solid fill, body text — and a step no role consumes is maintenance for zero pixels. [[color-scales-oklch]] computes the steps; [[color-token-tiers]] names them; this node decides which exist.

## What a system needs

| Ramp | How many | Carries |
|---|---|---|
| Neutral | 1 | 80–90% of the interface: backgrounds, borders, body text. Needs the most steps — never fewer than the accent |
| Accent | 1 | The brand: interactive and selected states. A second accent only when two things must be told apart at a glance |
| Status | 0–4 | `danger`, `warning`, `success`, `info` — only the ones the product shows. Most need four roles, not a full ramp |

## Every step has a job

| Role | Tailwind | Radix |
|---|---|---|
| Page / subtle background | 50 | 1–2 |
| Component background | 100 | 3 |
| Hover · active, selected | 200 | 4 · 5 |
| Subtle border, separator | 200 | 6 |
| Border, focus ring | 300 | 7 |
| Hovered border | 400 | 8 |
| Solid fill · its hover | 600 · 700 | 9 · 10 |
| Low · high-contrast text | 700 · 900 | 11 · 12 |

Radix defines steps **by role** — step 9 is the solid fill in every ramp and in dark, so component CSS never changes. Tailwind defines them **by lightness**, so the mapping inverts in dark and the swap belongs in the semantic tier. Match the project; for a new system prefer the role model. The solid fill is `600`, not `500`, because white text on most `500` hues fails 4.5:1 ([[wcag-thresholds]]).

## Rules that hold across hues

- **One colour, one meaning.** Hues within 15° of OKLCH hue read as one colour, so a link blue and a decorative heading blue are one meaning used twice. The rule runs both ways: if the accent means interactive, an interactive element rendered neutral misleads too.
- **Status sits ≥ 15° from the accent.** A red brand cannot also have a red danger; give destruction a distinct treatment ([[destructive-actions]]). Check gain/loss colours per locale — Chinese financial UIs show gains in red.
- **One filled action per view.** The fill goes on the background, not the label: a filled button reads as primary across the room, accent text on a neutral button reads as a link. Selected state may use the accent on glyph and label — that is state, not emphasis.
- **Neutrals: pure grey is a fine default.** Tinting toward the accent (OKLCH C 0.005–0.02 at the accent hue) is an option, not a correction ([[color-monochromatic]]). Warm or cool, hold it across the ramp: a warm grey border on a cool grey surface shows.
- **Increased contrast per appearance.** `prefers-contrast: more` gets a value per light and dark; one shared block darkens the dark theme's colour too and *lowers* contrast there. Widen the L gap by ≥ 0.15 and remeasure.

## Auditing an existing palette

1. Collect every literal — hex, `rgb(`, `hsl(`, `oklch(`, utility prefixes, SVG `fill`/`stroke`, chart configs, email templates.
2. Sort by lightness within each hue family; duplicates surface as neighbours.
3. Collapse near-duplicates (ΔE in OKLab under 0.02): keep the most-used, retire the rest. Never average them.
4. Give each survivor a role from the table. One that matches none is a missing token or a mistake — say which.
5. Count the ramps. More than the first table lists means the palette outgrew its structure.

Report the inventory before changing anything: consolidation changes screens nobody asked you to touch.

## Gotcha

Dark tokens that are the light ramp in reverse step order look right in a swatch and wrong on screen: dark needs lower accent chroma and a wider dark end. Remap, then remeasure every pair ([[dark-mode]]).

## Sources

- Jakub Krehel, interfaces skills (MIT, github.com/jakubkrehel/skills, HEAD `592aedc`, read 2026-10-25): `skills/better-colors/SKILL.md` (**A system is ramps, not colors**, **Every step has a job**, **One color, one meaning**, **Fill exactly one action per view**), `palette-structure.md`, `color-usage.md`.
- Radix Colors scale roles; Tailwind CSS default palette.
- Related: [[gradient-interpolation]], [[contrast-and-color-scheme]], [[interfaces-reconciliation]].
