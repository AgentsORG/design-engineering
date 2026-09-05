---
title: svg-animation
summary: Pick the engine by where the file lives — inline + CSS/WAAPI for interactive UI, SMIL or embedded CSS keyframes for a self-contained file loaded as an image, a library only for gesture or timeline work. Stroke drawing, transform-origin, composite-only properties, group choreography, reduced motion, size.
tags: [svg, animation, smil, css, waapi, performance]
---

# Animating SVG

The first decision is not the easing; it is **where the file lives**, because that fixes which engine can reach it. Everything in [[animation-decision-framework]], [[easing-curves]], and [[duration-table]] still applies — an SVG is just DOM with a coordinate system.

## Engine decision

```text
Where does the SVG render?
├── Inline in the page (React, HTML)
│   ├── State-driven, interruptible, reacts to input → CSS transitions or WAAPI
│   └── Gesture-driven, spring, timeline choreography  → Motion / GSAP (match the project's stack)
├── Loaded as <img>, background-image, email, social upload, Figma
│   → self-contained: CSS @keyframes inside the file (portable, GPU-friendly), SMIL for
│     motion paths, attribute animation, or begin="click" / begin="other.end" sequencing
└── Needs a runtime anyway (rich after-effects export) → Lottie/Rive, and only then
```

CSS keyframes baked into the file are the most portable option in 2026; SMIL still wins for `<animateMotion>` along a path and for animating attributes CSS can't. Native SVG with CSS or SMIL is usually 5–10× smaller than the Lottie export of the same thing and carries `<title>`/`<desc>` that Lottie JSON cannot.

## The techniques

- **Stroke drawing.** `stroke-dasharray` and `stroke-dashoffset` set to the path length, animate offset to 0. Read the exact length with `path.getTotalLength()` or use `pathLength="1"` so the CSS is `stroke-dasharray: 1; stroke-dashoffset: 1`. `stroke-linecap: round` for polished ends.
- **`transform-origin` is (0,0) in SVG.** Set `transform-box: fill-box; transform-origin: center` (or the pivot you mean — a shoulder, a hinge) or every rotation orbits the corner.
- **Composite-only.** `transform` and `opacity` composite; animating `d`, `points`, `r`, `stroke-width`, or filters repaints every frame — fine for one small icon, ruinous for a scene. `will-change: transform` only after a first-frame hitch ([[performance-discipline]]).
- **Choreograph with groups.** Animate `<g>` layers (arm, eyes, body), not hundreds of paths; stagger 30–80ms; paired parts share duration and easing.
- **Motion paths.** SMIL `<animateMotion><mpath href="#route"/></animateMotion>` with `rotate="auto"`, or CSS `offset-path: path("…")` when inline.
- **Reduced motion.** Inline: the usual media query. Self-contained: `@media (prefers-reduced-motion: reduce)` inside the file's `<style>` still works when loaded as an image; SMIL cannot read it, so a SMIL-only file needs a static fallback asset.

## Size discipline

An animated SVG is a text file that ships on every load. Budget ~10–30 KB for a hero mascot, ~2 KB for an icon. Reuse geometry with `<use>`, animate transforms instead of redrawing, round coordinates, and run SVGO with animation-safe flags ([[svg-creation]]). A flipbook of 60 vectorized frames is the case where size explodes — see [[video-to-vector-pipeline]] for de-duplication and frame budgets.

## When to apply

Animating any icon, illustration, mascot, logo reveal, chart transition, or loader that is vector; deciding between Lottie, Rive, and native SVG; reviewing an animated SVG someone dropped in.

## Gotcha

Inline SVG inherits the page's `prefers-reduced-motion` handling only if you wrote it. A copied animated icon with its own `<style>` keyframes and no media query is the most common reduced-motion miss in generated UI, and [[review-checklist]] row 6 catches it.

## Sources

- supermemoryai/skills `svg-animations` — engine choice, stroke drawing, SMIL timing, transform-origin.
- MDN Web Animations API, SMIL Animation; svg.dog engine comparison.
- Related: [[animation-decision-framework]], [[morphing-icons]], [[svg-path-morphing]], [[performance-discipline]], [[prefers-reduced-motion]].
