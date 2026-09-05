---
title: MOC-svg
summary: Authoring clean, editable, token-aware SVG; animating it with the right engine for where it lives; morphing paths that actually interpolate; and turning AI video or frame sequences into one editable animated SVG. The vector layer under icons, mascots, illustrations, and launch motion.
tags: [moc, svg, vector, animation, illustration]
---

# MOC — SVG

Every SVG element is a DOM node you can style, animate, and script, which makes SVG the only image format that is also an interface. This cluster covers making it (clean, editable, optimized, on the token system), moving it (CSS, SMIL, WAAPI, or a library, chosen by where the file lives), morphing it (the command-count rule and how to cheat it), and the video-to-vector pipeline that produces app mascots and launch motion from flat AI-generated clips.

Read [[svg-creation]] before drawing anything and [[svg-animation]] before animating anything; the other two are the specialised jobs.

## Make it

- [[svg-creation]] — viewBox always, paths over primitives when it will animate, `currentColor` and CSS variables so the token system reaches inside, `<defs>`/`<symbol>`/`<use>`, named layers, optimization with SVGO, `<title>`/`<desc>`, and what generated SVG gets wrong.

## Move it

- [[svg-animation]] — the engine decision (inline + CSS/WAAPI vs `<img>` + SMIL vs library), stroke drawing with `dasharray`/`dashoffset`, `transform-origin` (SVG defaults to 0,0), `transform-box: fill-box`, composite-only properties, group choreography, reduced motion, and the size discipline that keeps an animated SVG smaller than the Lottie it replaces.
- [[svg-path-morphing]] — native `d` interpolation needs the same command count and order; how to author matching paths, when to reach for flubber or a library, and why icon swaps usually beat morphs.

## Produce it

- [[video-to-vector-pipeline]] — flat 2D clip → frames → vectorize → clean and match paths → one single-file animated SVG (a vector flipbook), then optional Lottie or Rive; the constraints that make it work (flat, no gradients, simple characters) and the artifacts that break it. Ships with `scripts/svg-flipbook.mjs`.

## Subagents

- [[svg-creator]] — authors or refactors an SVG asset: icon, illustration, mascot pose, generative art from a [[vibe-to-generator]] config. Returns an optimized, token-aware, labelled file.
- [[svg-animator]] — animates an existing SVG or builds a flipbook from frames: picks the engine for the target, writes the animation, verifies size and reduced motion.

## Cross-cluster

- [[icon-systems]] and [[morphing-icons]] own icon *systems*; this cluster owns the vector mechanics beneath them.
- [[launch-video-sound]] pairs with [[video-to-vector-pipeline]] for a mascot reveal: the flipbook's frame timing is where the sound transients land.
- [[performance-discipline]] applies unchanged: animated `d`, `points`, and filters repaint; `transform` and `opacity` composite.
