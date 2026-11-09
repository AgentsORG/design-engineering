---
title: prototype-picker
summary: When the decision hasn't been made, build three to five genuinely different versions behind a live picker — real materials, worst content, a named axis each, every uncertain number on a control — then write the decision down, promote the winner, and delete the harness.
tags: [meta, prototyping, exploration, workflow]
---

# Prototype behind a picker

A divergence workflow for the exploration phase: a rough description and a decision nobody has made yet. If the user has already decided, build the one thing — a picker holding three answers to a settled question wastes the run. This is the "don't know what it should look like yet" entry in [[stacking-chains]], expanded.

## Hard rules

1. **Never touch production code during exploration.** Prototypes live in a throwaway route (`/proto/<slug>`) imported by nothing. Integration happens only for the winner.
2. **Real materials, worst content.** Real fonts, tokens, and components — a prototype built from other materials answers a question about an interface you aren't building. Then fill it with the content that breaks it: the longest real name, the two-line title, forty rows, the empty state. Pretty placeholder content makes every variant look fine and hides the decision.
3. **Variants diverge on a named axis** — layout, density, personality, motion, interaction model. If you cannot state each variant's axis in a phrase, you have three tints of one idea. Names describe direction ("Quiet", "Editorial", "Dense"), never "Option A/B/C".
4. **Every variant fully works.** Real interactions, motion, states. No dead buttons, no "imagine this part".
5. **The picker is chrome, not a contestant.** A fixed dark pill, bottom-center and 24px up, unbranded, never restyled with the project's tokens; when a variant lives at bottom centre (toasts, a sheet, a dock), pin it 24px from the top instead, the one change it ever takes. Number keys and arrows switch, `R` replays, `?v=2` persists the selection. The keys do nothing while focus sits in a text field, select or contenteditable, or while Cmd, Ctrl or Alt is held: typing 2 into a variant's email field must not jump to variant 2. Each switch re-mounts the variant (a keyed re-mount, or clear and render on the next frame) so its entrance replays, and `R` re-mounts the current one; show a replay button only when some variant moves. Switching is instant — it happens a hundred times a session.
6. **The output is a decision, not code.**

## Workflow

- **Scope** one thing per run; if the brief spans a dashboard, pick the highest-leverage piece and offer the rest as follow-ups.
- **Recon** the stack, materials, personality, and context. If the piece exists, the current implementation is variant 1, unchanged — a baseline beats a memory. The product's personality caps how far the boldest variant goes. With no project, build one self-contained HTML file the user opens directly, in a plain neutral look (grays, one accent, system fonts), so the direction is judged and not the decoration.
- **Loadout**: before variant code, load the nodes the brief needs — [[feeling-right]] always; then [[type-scale-and-rhythm]], [[color-scales-oklch]], [[depth-and-nesting]], [[animation-decision-framework]], [[forms-behavior]], [[marketing-surface-rules]] as relevant; [[ui-polish-pass]] and [[touch-and-focus]] before the user sees anything. The loadout applies to every variant equally, or the comparison is rigged.
- **Three variants** by default, up to five. Render one at a time, full size, in realistic surrounding context; thumbnails distort spacing.
- **Controls** whenever the brief has a number in it — duration, easing, spring, blur, radius, offset. Any number you would hardcode is a decision not yet made; put it on a slider bound to that value with a range wide enough to be wrong on both sides, easing on a bezier editor and springs on a bounce/duration editor (DialKit in React, plain `<input type="range">` elsewhere — never a custom panel), and a 1× / 0.5× / 0.25× speed multiplier on anything that moves. Each value shows beside its control, and one button copies the whole config. Controls write to CSS variables on the prototype root, not React state, so the slider itself doesn't stutter. The panel sits top-right, as neutral chrome clear of the bottom-centre picker; it moves top-left if a variant lives there. Encode the control values in the URL with the variant (`?v=2&dur=180&ease=…`), so a teammate opens the same preview and tunes it instead of sending "a bit faster?". `tune <variant>` runs only this step on one variant.
- **In place**, only when the surroundings can't be faked: a step deep in an authenticated flow, a cell in a live table. Say why out loud. The variants still live in the throwaway directory; the real call site gets one dev-only mount block, fenced in greppable comments and failing closed to the real component if the gate is missing; the real component is never edited to suit a variant.
- **Verify** every variant yourself: renders, responds, clean console, no [[review-checklist]] escalations.
- **Present** a table — variant, axis, when it wins, its cost — with the URL and keys. Then **stop**; the choice is the user's. Never pre-pick a favorite; if asked which you would take, answer in one line from the product's personality and how often the thing is used ([[animation-decision-framework]]), not from looks.

## Promote and write it down

When the user picks, write the decision first — it is the only artifact that survives:

```md
Dropdown entrance — decided from /proto/dropdown
- scale from 0.96, opacity 0 → 1; 180ms enter, 140ms exit, cubic-bezier(0.32, 0.72, 0, 1)
- Rejected: slide-down felt heavy at 200ms and jittery below it
```

The rejected options are the part everyone skips and the part that saves the next discussion.

**Mix, when the reply spans variants** ("Scene, but with Trim's handles"). Never ask for it in prose. Fix the named base, diff the others against it, and keep only features that move across without changing the base's axis (if a feature does, the base is wrong; offer to mix the other way). Merge features that only work together, cap at 8 rows, and say in one line what was dropped. Each row: the feature and what the user sees · which variants have it · what the base does today · Add or Add as switcher, the switcher only when both modes have two-word names (`Scene | Take`). Render it as real checkboxes, or a numbered table answered `1, 3s, 4`. Build one `Base+` pill beside the originals, re-run the base's worst content, and record adopted and left-behind features in the decision block.

Before integrating, review the kept variant on its own in the [[review-format]] table, plus a [[cmd-motion]] pass if it moves: it was built as one of several, and winning the comparison is not passing review. Then integrate the winner per project conventions ([[component-api-design]] if it becomes shared) and delete the route (and revert the fenced mount block on the in-place branch; grep its comments to confirm). A picker that survives the run is exactly the dead code rule 1 exists to prevent.

## When to apply

"Show me a few options", "which feels better", "not sure if". Not for reviewing existing UI ([[review-format]]) or polishing a finished component ([[ui-polish-pass]]).

## Reference

The presentation table for an inbox list, worst content loaded (a 38-character sender, a two-line subject, 40 rows, the empty state):

| Variant | Axis | Wins when | Cost |
|---|---|---|---|
| Dense | density: 32px one-line rows, 13px sender, faint preview | triage of 200 mails a day | previews truncate at 390 wide |
| Editorial | type: 15px subject over a 13px preview, 56px rows | reading, not sorting | a third as many rows per screen |
| Swipe | interaction: swipe to archive, the row thrown at finger speed | phone-first use | needs a visible undo route on desktop |

Gold example: `stageshow/playground/viewer.tsx`, Benji's own example picker: one control writes `?example=<name>` into the URL with `history.replaceState`, with Replay and Step beside it, so a shared link opens the same variant and any motion can be stepped a frame at a time.

Check: film each variant at its shown size and at 390 and lay the stills on one sheet. Judge the silhouettes at thumbnail size first (Benji's restraint rule); two variants you can't tell apart there are tints of one idea, so replace one before presenting. If no real third direction exists, present two and say why; a picker padded with a tint teaches nothing. The full-size render is still the one the user judges.

## Gotcha

Divergence is not an excuse to drop the craft bar. A sloppy variant doesn't widen the exploration; the user rejects a good direction because the type was ugly, and the run taught them nothing.

## Sources

- Emil Kowalski's design-engineering practice on prototyping, distilled by AgentsORG; Josh Puckett's DialKit for the control panel.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/prototype/SKILL.md, skills/prototype/PICKER.md.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/prototype/PICKER.md (key guard, re-mount on switch, pill moves up top), skills/prototype/SKILL.md (no-project HTML harness, two honest variants over three padded ones, answering from personality).
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (review the winner before integrating it).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/playground/viewer.tsx` (example picker, `?example=` in the URL, Replay, Step), `stageshow/references/craft.md` (Restraint: judge the silhouette at thumbnail size).
- Related: [[taste-is-trained]], [[stacking-chains]], [[build-a-tool]], [[vibe-to-generator]], [[stress-scenarios]] (the isolated harness, for robustness rather than direction), [[interfaces-reconciliation]] (hosting variants on the real page).
