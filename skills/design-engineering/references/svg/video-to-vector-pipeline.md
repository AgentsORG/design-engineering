---
title: video-to-vector-pipeline
summary: Turn a flat 2D clip (AI-generated or hand-animated) into one editable, single-file animated SVG — frames → vectorize → clean and match layers → vector flipbook with stepped keyframes — and the constraints that make it work: flat art, few colors, no gradients, a frame budget.
tags: [svg, video, vectorize, mascot, flipbook, pipeline]
---

# Video to vector

A flat mascot clip — a rooster at a laptop, a Duolingo-style character waving — can become a vector asset that is editable, recolorable, tiny, and crisp at any size. The loop is now productized (Anim8 converts MP4 and AI-generated video into editable vector animation with single-file animated SVG, Lottie, and MP4 export), and it is also reproducible with open tools. The hard part was never the vectorizing; it is matching paths across frames, reducing artifacts, keeping the file usable, and leaving the result editable.

## The constraint that makes it work

This works for **simple flat 2D art**: solid fills, two to eight colors, clean silhouettes, no gradients, no busy patterns, no photographic texture. Complex illustration falls apart into thousands of slivers. Generate the source clip to that brief (prompt the image or video model for "flat vector style, solid colors, no gradients, plain background"), or accept that the output will need hand cleanup.

## The pipeline

1. **Extract frames.** `ffmpeg -i clip.mp4 -vf "fps=12,scale=512:-1" frames/f_%03d.png`. Twelve frames a second reads as animation for a mascot; 24 doubles the file for little gain. Trim to the loop.
2. **Quantize colors first.** Reduce each frame to the palette (`-vf palettegen/paletteuse`, or posterize) so the vectorizer sees a handful of flat regions instead of anti-aliased gradients.
3. **Vectorize.** `vtracer` (open source, color-capable, O(n)) per frame: `--colormode color --mode polygon --filter_speckle 8 --color_precision 6`. Potrace for pure black-and-white line art.
4. **Clean.** Remove specks below a few pixels, merge near-identical colors, simplify with SVGO (precision 1), and delete the background region. This is where artifacts die or survive.
5. **Match layers across frames.** Give each color region a stable name (`body`, `beak`, `eye-l`) by matching centroid and color frame to frame. Matched layers are what make the file *editable* — recolor the beak in one place — and what later enables true keyframe interpolation instead of a flipbook.
6. **Assemble a vector flipbook.** One `<svg>`, one `<g class="frame">` per frame, a stepped CSS keyframe animation toggling visibility, colors lifted to CSS variables so the whole character recolors from outside. `scripts/svg-flipbook.mjs` (next to this skill's `SKILL.md`) does this step: `node scripts/svg-flipbook.mjs frames/ --fps 12 --out mascot.svg`.
7. **Budget and dedupe.** Identical consecutive frames collapse into one with a longer hold; a 24-frame loop at 12 fps of a simple character lands around 20–60 KB. If it is larger, the vectorizer left slivers — go back to step 4.
8. **Export onward when needed.** Lottie for native runtimes, Rive for interactive state machines, MP4 for social. The SVG stays the editable source.

## Where it lands

- **App mascot** on an onboarding or empty state: inline, CSS variables tied to the theme, `prefers-reduced-motion` freezing on the resting frame.
- **Launch motion**: the flipbook's frame timing is a beat sheet — [[launch-video-sound]] places transients on the frames where the character makes contact.
- **Marketing hero**: loaded as `<img>` with keyframes inside the file; see [[svg-animation]] for the self-contained rules.

## When to apply

A product wants a mascot or character motion, a launch reveal, or a sticker-like illustration that must be editable and recolorable — and the source is a flat clip rather than hand-drawn paths. Not for photoreal video, gradients, or anything with texture; that stays raster.

## Gotcha

Vectorized frames inherit the clip's jitter: outlines wobble by a pixel because each frame was traced independently. Quantize and trace at a consistent resolution, and for a hold frame reuse the previous frame's paths rather than re-tracing. Boiling outlines read as an artifact, not a style, unless the brief is "hand-drawn".

## Sources

- Adrian Abelarde's Anim8 (tryanim8.com) — the productized MP4 → editable vector pipeline and its stated constraints; his Clucky mascot workflow shared publicly on X.
- visioncortex/vtracer; Potrace; ffmpeg; SVGO.
- Related: [[svg-creation]], [[svg-animation]], [[launch-video-sound]], [[icon-systems]].
