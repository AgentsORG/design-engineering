---
title: MOC-motion
summary: When to animate, how to animate, and the discipline of restraint.
tags: [moc, motion, animation]
---

# MOC — Motion

The largest cluster. Read [[animation-decision-framework]] first — it tells you whether to even animate. The rest of the nodes are tactical.

## Decision-first nodes (read before deciding)

- [[animation-decision-framework]] — Should this animate at all? Frequency-based decision tree.
- [[fly-not-teleport]] — When components persist between states, motion clarifies the spatial path. From Benji.

## Tactical nodes (read while implementing)

- [[easing-curves]] — Custom cubic-bezier > built-in CSS easings. Never `ease-in` for UI.
- [[duration-table]] — Specific durations by element type. UI < 300ms. Buttons 100–160ms.
- [[spring-animations]] — When springs beat curves. Apple's spring configuration. Interruptibility.
- [[transform-opacity-only]] — The only two properties that are cheap to animate. The hardware acceleration rule.
- [[performance-discipline]] — The rest of the discipline: named transition properties, `will-change` as a targeted fix, virtualization past ~50 rows, frames out of React state, reserved space, preload, off-screen pause, muted theme swaps.
- [[transform-mastery]] — translateY percentages, scale() scales children, 3D transforms, transform-origin fundamentals.
- [[clip-path-tricks]] — The most underrated animatable property. 5 patterns: tabs, hold-to-delete, image reveals, comparison sliders, directional swap.
- [[never-scale-from-zero]] — Why `scale(0)` looks like an inflating balloon. Use `scale(0.95)` + opacity, or `@starting-style` for modern CSS.
- [[gesture-momentum]] — Velocity-based dismissal. Damping at boundaries. Pointer capture.
- [[stagger-choreography]] — Cascading reveals (30–80ms delays). When to stagger and when not.
- [[responsive-feedback]] — Button press states, popover origin awareness, tooltip skip-delay. The micro-feedback nodes consolidated.

## Library-design nodes

- [[sonner-principles]] — Ten principles from Sonner: DX is the product, defaults > options, naming, invisible edge cases, transitions over keyframes, docs as deliverable, cohesion, opacity+height trial, sleep-on-it review, asymmetric timing.

## Workflow nodes

- [[debugging-animations]] — Slow-motion playback, frame-by-frame inspection, real-device testing. The three tools.
- [[css-conventions]] — `1turn` over `360deg`, unitless line-height, hex over rgb, native over libraries. Ben DC's CSS dialect choices.

## Benji's catalog (benji.org)

Distinctive techniques from Benji Taylor's body of work — Family, Honk, Liveline, Agentation.

- [[lerp-breathing]] — Lerp at 8% per frame applied uniformly across multiple visual elements so the UI "breathes" as one organism instead of fragments updating independently.
- [[morphing-icons]] — 3-line SVG constraint system. Same-shape icons rotate; different-shape icons interpolate coordinates. Unused lines collapse to invisible center points.
- [[shared-letter-morph]] — Continue→Confirm text-state transitions where the shared letters ("Con") stay anchored as the rest morphs.
- [[tray-rules]] — Six rules for tray / sheet / bottom-drawer UI: user-initiated, height variation, single focus, title + dismiss, context preservation, transient actions only.

## Touch + imperative API

- [[hover-default-imperative]] — From lucide-animated.com. Hover triggers the animation by default; expose a `ref` / `trigger()` API for touch contexts.

## Launch video

- [[launch-video-seams]] — The launch motion system and its seams: one easing law (tau 0.131 s), a damped spring at zeta 1/3 on position / shape / rotation, blur derived from velocity, stepped decisions, shared-element morphs instead of cuts, a ledger per seam, no idle motion — measured from HeyGen's launches and Skale's reel.

## Transition techniques (transitions.dev)

Catalog of canonical transitions for common UI archetypes. Implementation layer under the principle layer above.

- [[cross-blur-transitions]] — Pair opacity 0↔1 with `filter: blur(2px) ↔ 0` to mask imperfect crossfades.
- [[compose-subtract-asymmetry]] — Enter with 5 properties, exit with 3. Disappearance feels soft.
- [[distance-falloff-propagation]] — Per-element lift via `lift * pow(falloff, distance)` for grouped hover.
- [[multi-segment-shake]] — Form-error shake at 0%, 28.57%, 57.14%, 78.57%, 100% over 280ms.

## Required-knowledge nodes (always relevant)

- [[prefers-reduced-motion]] — The one accessibility rule that everyone skips and that breaks for real users.

## Cross-cluster

- See [[ai-default-tells]] in [[MOC-anti-patterns]] for animation tells (crossfading icons, gradient flourishes).
- See [[animations-dev-curriculum]] for the external course pointer; don't duplicate course material here.
- When a motion has a sound, [[sound-motion-sync]] in [[MOC-sound]] owns the timing — the transient lands on the contact frame, never before it.
- When the thing that moves is vector, [[svg-animation]] in [[MOC-svg]] owns the engine choice and the SVG-specific mechanics (transform-origin, stroke drawing, morphing).
