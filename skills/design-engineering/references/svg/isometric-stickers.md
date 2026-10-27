---
title: isometric-stickers
summary: Animated isometric stickers for empty states, onboarding and feature cards — flat slabs with one thick ink outline, faces that lean instead of rotate, colours as palette roles, three to six parts per hero object, and motion played from After Effects keys chosen by the object's verb, with a still hold after the action. Distilled from Kelvin Adithya's fun-isometric.
tags: [svg, illustration, stickers, isometric, motion, keyframes, palette]
---

# Isometric stickers

A sticker reads as a made object, not a clip-art glyph, when it has thickness and moves like a character animator keyed it. Both come from rules, not from taste in the moment: draw every part as a slab under one outline, and move it on keys an animator already tuned. When [[fun-isometric-reconciliation]] says the companion is installed, it owns the drawing and the export; this node is the bar its output, or a hand-built sticker, is judged against.

## Drawing

- **One square, one outline.** A 500-unit canvas, the subject at 50–60 % of it, centred with room to swing. Outline 5 units in ink on every part (4 only for small, busy sets), miter joins and butt caps so corners stay sharp. No gradients, shadows or glow.
- **Faces lean, they never just rotate.** A flat face is turned in its own plane and then tilted back, so rectangles become parallelograms and circles ellipses. The house view leans `[-18°, 36°]` with the extrusion falling down-left; the other facings are its mirror, front-on and lying flat. A faceted object (a gem, a paper plane) is modelled in 3D so its proportions stay true.
- **Every body is a slab.** Extrusion runs in canvas space, so the side falls the same way on every part while the faces turn. Thin parts take a fraction of the depth. An upright object is one silhouette on one leaned plane; a face sitting on a slab whose side drops straight down reads as a shadow.
- **Built from parts, three to six of them.** A raised label, a plate behind the keyhole, a collar between lens and handle, each with its own thickness. Painting the detail flat onto one shape is the tell of a generated sticker.
- **Detail is sparse and ink.** One keyhole, two pupils, a few lines. Sparkles are small white stars with the outline, 14–30 units.

## Colour as roles

Fills name a slot, never a hex: `main` for bodies, `deep` for the dark second colour, `tint` for pale fills, `gold` for coins and stars, `ok` for success, `hot` for hearts and alerts, plus `white grey paper ink`. Two accents and white per icon is the budget. A brand palette maps its colours onto the roles, so a sticker recolours without losing what each part means. This is [[svg-creation]]'s token rule applied to illustration; map the roles from the project's contract ([[using-design-file]]), never from the sticker's default inks.

## Motion

- **Pick the preset by the verb, not the noun.** A wallet *tosses*, a lock *clasps*, a coin *bounces*, a bell *wiggles*, a button *presses*, a plane *drifts*. The verb decides the keys.
- **Keys, not formulas.** Presets are After Effects keyframes (values, influence handles, spatial tangents), interpolated the way lottie-web plays them. Tune amplitude, start frame or direction; never stretch the keys or hand-write a sine wobble. Settles use a baked spring that overshoots to 1.448 of the travel and halves each swing, 91 frames to rest ([[spring-animations]]).
- **Pivot where it would hinge.** Each moving part's anchor is the point it would turn on in life. Children follow 4–6 frames late at 0.6–1.4 of the amplitude, so nothing moves in lockstep ([[stagger-choreography]]).
- **Sparkle on the beat.** A twinkle or glint starts on the action's peak frame: the slam, the landing, the reveal.
- **The hold is the feel.** Loops run 123–180 frames at 60 fps with the action in the first half and a still hold after it. Filling the hold with idle wobble is the commonest way to cheapen one.
- **Pop with scale, never opacity.** A slab draws as a stack of copies, so fading it reveals the stack.

## Shipping

Live on a canvas (one shared animation loop, off-screen stickers skipped, repaint only on change) or exported as looping alpha video (VP9 webm, HEVC mp4 for Safari) with a still poster. Reduced motion shows a designated still frame where the icon reads whole ([[prefers-reduced-motion]]). Animated SVG is the other route when the sticker must be editable markup ([[svg-animation]]); the canvas route wins when it needs the slab stack and a palette swap at runtime.

## Gotcha

A sticker that reads at 500 px can turn to mush at the size it ships. Check it at 160 px and beside an existing sticker at the same size: same line weight, faces leaning, every part with thickness. A heavier or thinner outline than its neighbours is the first thing a set gives away.

## Sources

- Kelvin Adithya, fun-isometric (MIT, github.com/kelvinkn17/skills, HEAD `7c8a752`, read 2026-10-27; generator at skills.klvn.dev/fun-isometric): `SKILL.md` (Drawing, Colours, Motion presets, Rules, Check), `kit/motions.ts` (the keys and the baked spring), `kit/fun.ts` (`VIEWS`, palette roles, the shared loop). Inspired by the stickers in Slush. Values are his; the glosses are this graph's.
- Related: [[svg-creation]], [[svg-animation]], [[icon-systems]], [[video-to-vector-pipeline]].
