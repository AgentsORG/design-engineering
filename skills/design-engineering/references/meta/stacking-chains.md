---
title: stacking-chains
summary: Ordered node chains for multi-step jobs — a new screen, a feel-better pass, a design system, a marketing site — so sequencing decisions aren't re-derived per session.
tags: [meta, routing, workflow]
---

# Stacking chains — ordered routes for multi-step jobs

Single questions route to single nodes ([[routing-table]]). Real jobs — "build this screen", "make the app feel better" — chain several clusters, and the *order* matters: deciding motion before layout wastes work; polishing before the states exist polishes the wrong thing. These chains encode the orderings that survived use.

## The chains

### Screen loop (the order for one screen)

decide, if you can't describe it yet (`options`, [[prototype-picker]]) → foundations: hierarchy, spacing and alignment, deleting what adds nothing ([[feeling-right]]) → **one** material pass for what the screen is made of: forms ([[forms-behavior]]), surfaces ([[depth-and-nesting]]), type ([[type-scale-and-rhythm]]), a reusable component's API ([[component-api-design]]) or a landing page ([[marketing-surface-rules]]) → refine: `polish`, then `motion`, `mobile` or `a11y` only if that is the problem → `review` → once every screen is done, `ship` on the whole app ([[ship-check]]).

Look at the screen between passes ([[directing-agents]]). Product UI aims at correctness over novelty, so a screen that looks conventional after foundations is working as intended.

### New feature screen, start to ship

[[feeling-right]] → [[typography-humanity]] + [[color-monochromatic]] + [[shadows-whisper]] → [[forms-validation]] (if inputs) → [[animation-decision-framework]] → [[accessibility-baseline]] → [[review-checklist]] → [[review-format]]

Structure first, surfaces second, behavior third, motion only after the static version works, floor checks before the gate.

### "Make this app feel better"

`motion remove` ([[animation-removal-hazards]]: subtract first) → `motion audit` (retune what stays, as plans; or the `motion-auditor` subagent) → `motion opportunities` (5–7 additions at most, [[delight-impact-curve]]) → build each pick with [[cmd-motion]] → [[review-checklist]] (the finishing pass)

Subtract, then retune, then add. Retuning an animation you are about to delete wastes the pass, and additions are judged fairly only once the noise is gone ([[upstream-skill-lifecycle]]).

### One motion, idea to ship

[[design-vocabulary]] (name it) → [[animation-decision-framework]] (should it move) → [[dependency-discipline]] (only if a library is in question) → [[prototype-picker]] (only if two directions are live) → [[cmd-motion]] build sequence → [[motion-choreography]] (when several things move) → [[gesture-phases]] + [[performance-discipline]] (anything dragged) → [[review-format]] closed Block or Approve

Exit checks: a word you can say; a purpose word or a stop; one package or none; one kept direction; values that each cite a node; a role per element; a drag that tracks 1:1 and composites only; a verdict.

### Design system from scratch

[[color-monochromatic]] → [[typography-humanity]] → [[shadows-whisper]] + [[border-radius]] → [[using-design-md]] (capture the tokens so agents consume, not reinvent)

### Marketing surface

[[marketing-vs-product-ui]] → [[typography-humanity]] → product shots ([[product-shot-framing]] → [[faux-ui-restraint]] → [[demo-story-and-loops]] → [[demo-rehearsal]]; a feature grid via [[bento-grids]]) → [[ai-default-tells]] (delete pass) → [[review-format]]

Marketing tolerates more expression and *less* default — the deletion pass is not optional here.

### Accessibility pass

[[accessibility-baseline]] → [[contrast-and-color-scheme]] → [[prefers-reduced-motion]]

### Slow or janky app

[[transform-opacity-only]] → [[debugging-animations]] → [[duration-table]]

Property discipline first — most jank is animating the wrong property, not animating too much.

### Add sound to a product

[[sound-decision-framework]] (reject most) → [[sound-palette]] (one material, write the manifest) → [[sound-generation-elevenlabs]] or [[sound-generation-open-source]] → [[sound-spec]] → [[sound-playback-web]] → [[sound-motion-sync]] → [[review-checklist]]

Decide before designing, design before generating, spec before wiring. Or spawn [[sound-designer]] for the whole chain.

### Launch video or logo reveal

[[launch-video-registers]] (name the register) → [[launch-video-structure]] (beats) → [[launch-video-type]] + [[launch-video-ui-demo]] + [[launch-video-motion]] (words, product, in-shot motion) → [[launch-video-seams]] + [[launch-video-cuts]] (lock picture) → [[launch-video-sound]] (pick the sound register) → [[sound-from-motion]] or [[launch-video-music]] → [[sound-motion-sync]] (transients and cuts on onsets) → [[launch-video-review]] (≤ −1 dBTP, loudness stated)

Picture locks first; sound is placed on frames and cannot be placed on frames that move. Under a voice-over the voice locks before picture: re-time scenes to its word onsets, then lock picture ([[launch-video-music]]).

### Don't know what it should look like yet

[[prototype-picker]] — three genuinely different versions behind a live picker, each diverging on a *named axis* (layout, density, personality, motion, interaction model), numbers on controls, the decision written down, the harness deleted. Converge on one, then enter the "new feature screen" chain at the surfaces step. Only a vibe and no target → [[vibe-to-generator]]; a target the prompt keeps missing → [[build-a-tool]]. See [[taste-is-trained]]: comparison is how taste gets exercised.

### Mascot or vector asset, from clip to product

[[icon-systems]] (the brief: flat, few colors, one stroke language) → [[svg-creation]] → [[video-to-vector-pipeline]] (if the source is a clip) → [[svg-animation]] → [[sound-motion-sync]] (if it has a reveal) → [[review-checklist]]

### "Looks AI-generated"

[[unslop-pass]] (subtract, then sweep) → [[copy-tells]] → [[color-scales-oklch]] + [[typography-humanity]] (put a point of view back) → [[review-format]]

### Documenting the system for agents

[[design-system-docs]] (inventory, template, verify by prompting) → [[using-design-file]] or [[using-design-md]] (where the machine-readable half lives) → [[skill-writing-rules]] (the language)

## Rules

1. **Chains are orderings, not checklists.** Skip links that don't apply; never reorder them.
2. **Each link is a read, not a rewrite.** Enter a link, apply its values to the work in hand, move on.
3. **Every shipping chain ends at [[review-format]].** If the chain ends and no review happened, it isn't done.
4. **[[gotchas]] and [[pov]] apply at every link**, not as a final step — an installer override can prune a whole link.

## Reference

A chain run well names each link's exit check before the next link opens. The product-shot leg of the marketing chain, for a 720 x 340 hero:

```text
product-shot-framing → still at 720 and at 390 beside the gold; window off an edge, one gutter
faux-ui-restraint    → real strings counted: 5; bars only off the subject
demo-story-and-loops → 4 beats, 12s loop, poster is the payoff frame
demo-rehearsal       → film --gate on the loop ends "rehearsal passed"
```

Gold example: `stageshow/SKILL.md` (Workflow, steps 1 to 7): medium and place, look, story, start from the closest gold, screen, choreograph, rehearse. Step 4 settles the frame on a still before any motion.

Check: when a later link exposes an earlier fault (motion reveals a bad crop), go back to the earliest broken link and run forward again, as Benji fixes framing, then hierarchy, then motion, then polish. Never patch it at the link you're on.

## Gotcha

Don't run a full chain on a one-line change. Chains are for jobs that touch three or more clusters; a hover tweak routes through [[routing-table]] to one node and stops.

## Sources

- AgentsORG — orderings distilled from repeated multi-cluster sessions; companions: [[routing-table]], [[disambiguation]].
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/SKILL.md` (Workflow, steps 1 to 7; step 7 fix order), `stageshow/references/rehearse.md` (Prove the still before choreography).
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG: the whole-app order (remove, improve, find) and one motion from naming to review.
