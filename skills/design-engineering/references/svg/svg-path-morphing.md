---
title: svg-path-morphing
summary: A native morph interpolates only between paths with the same number and order of commands — author both shapes on one point budget, or hand the mismatch to flubber. Most icon "morphs" should be a deep scale-and-blur swap instead.
tags: [svg, morphing, paths, icons, animation]
---

# Path morphing

Browsers interpolate the `d` attribute (CSS `d: path()` or SMIL `<animate attributeName="d">`) with one unbreakable rule: **both paths must have the same number of commands, in the same order, of the same type.** Four cubic curves morph into four cubic curves; a rectangle of four lines cannot morph into a circle of four arcs without help. Everything about morphing follows from that rule.

## Author to the rule

- **Draw both states on one point budget.** Decide the command list first (say `M` + 8 `C` + `Z`), then place the points for shape A and shape B. Extra detail in one state is a mismatch; add degenerate points to the simpler shape instead.
- **Keep the start point and winding direction the same** or the morph rotates through itself.
- **Convert primitives to paths** with the same structure — a circle becomes four cubic arcs, a rect four lines plus close, and the two won't match each other.
- **Match subpaths.** A shape with two holes needs two holes in the other state; collapse an unused hole to a zero-area subpath rather than deleting it.

```css
.shape { d: path("M4 12 C4 7 8 4 12 4 C16 4 20 7 20 12 C20 17 16 20 12 20 C8 20 4 17 4 12 Z"); transition: d 240ms cubic-bezier(0.25, 1, 0.5, 1); }
.shape[data-state="square"] { d: path("M4 4 C4 4 12 4 12 4 C12 4 20 4 20 4 C20 4 20 20 20 20 C20 20 4 20 4 20 Z"); }
```

## When the paths don't match

Use **flubber** (`interpolate(pathA, pathB)`) — it resamples both shapes to matching point counts and returns an interpolator you drive from any engine. GSAP's MorphSVG and KUTE do the same inside their runtimes. The cost is a dependency and a JS loop; per [[dependency-discipline]], reach for it only when the morph is the product (a logo transformation, a shape-shifting hero), never for an icon toggle.

- **When you own both outlines, resample them yourself.** Walk each closed polygon and take the same N evenly spaced points, from the same start point and the same way round; every point then travels to its partner and no library is needed.
- **Clamp what can't overshoot.** Let the geometry spring past its target, but clamp the color and stroke-width mix to 0 to 1, so the outline breathes without a flash of the wrong color.

## Usually you don't want a morph

Play → pause, copy → check, menu → close: the honest version is a **swap** — the outgoing icon scales to 0.3, fades, and blurs 3px while the incoming does the reverse, spring with zero bounce, both icons rendered at once so the reverse direction animates too. It reads as a real change; a timid morph between unrelated shapes reads as a glitch. [[morphing-icons]] covers the constrained system where morphing *is* right (same-shape icons rotate; different shapes interpolate coordinates on a fixed line budget); [[fly-not-teleport]] covers the continuity principle.

## Performance

Animating `d` repaints each frame. Acceptable for one icon or a hero shape; combine with `transform`/`opacity` for everything else on screen, and never morph many paths at once ([[performance-discipline]]).

## When to apply

Logo transformations, shape-shifting heroes, chart shape transitions, and the icon systems that were designed to morph. Not for every state change.

## Reference

Bad: `transition: d 240ms` from a 7-vertex pointer to a circle; the commands don't match, so it jumps. Good: both resampled to 72 points from the hotspot, driven by one damped spring, from `stageshow/examples/cursor-morph/cursor-morph.tsx`:

```ts
function spring(t: number) { // settles by about 0.5s; the loop caps at 0.7s
  const z = 0.62, w = 15
  const wd = w * Math.sqrt(1 - z * z)
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t))
}
// each frame: pts[i] = mix(from[i], to[i], spring(t)); from = the outline on screen now
```

Benji's call differs on icons: for a family drawn to morph he keeps three lines per icon, collapses unused lines to their center at opacity 0, and rotates arrows rather than bending them; he rejects the crossfade swap because it loses the sense of transformation. Gold example: `stageshow/examples/cursor-morph/` (README plus source).

Check: interrupt the morph halfway and read the frames 80ms apart; the new morph must start from the outline on screen, no point may cross another (same start, same winding), and reduced motion lands on the final shape in one frame.

## Gotcha

A morph that "works in Chrome" and jumps in Safari almost always has a command-type mismatch (`S` vs `C`, `l` vs `L`) that one engine normalises and the other doesn't. Normalise both paths to absolute cubics before shipping.

## Sources

- SVG 2 / CSS `d` property interpolation rules; veltman/flubber.
- supermemoryai/skills `svg-animations` — the command-matching rule.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/cursor-morph/README.md`, `stageshow/examples/cursor-morph/cursor-morph.tsx`, `stageshow/references/verify.md`.
- Benji Taylor, benji.org/morphing-icons-with-claude (read 2026-11-07).
- Related: [[morphing-icons]], [[fly-not-teleport]], [[svg-animation]], [[dependency-discipline]].
