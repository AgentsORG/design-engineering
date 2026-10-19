---
title: launch-video-formats
summary: The short forms beside a launch film — a feature loop that is a cycle with no seam, a logo sting that assembles the mark and holds it, and vertical cuts that are re-laid out for the feed rather than cropped. Seam gates, GIF frame-rate arithmetic, feed safe zones and type minimums.
tags: [launch-video, formats, loop, sting, vertical, social, gif, delivery]
---

# Launch-video formats

A launch film rarely ships alone. Around it go a landing-page loop, a logo sting and vertical cuts for the feeds, and each one breaks a different rule of the 16:9 master. A loop has no beginning or end card. A sting is all end card. A vertical cut is watched on a phone, under someone else's interface. None of the three is the master trimmed.

## Feature loop

- **A cycle, not enter → hold → exit.** A loop that fades out and back in is a slideshow. Return to the start through an action: a conveyor whose last item lands where the first began, a relay that carries the result out one side and a new input in the other, or a state round-trip where B becomes the next A.
- **A whole number of bars, no tail.** Design motion so the unrendered frame `TOTAL` would equal frame 0; a duplicate of frame 0 at the end stutters every cycle. Springs are at rest before the seam, and text is fully resolved or fully gone across it.
- **Seam gate.** The last-to-first frame difference is at most max(0.4, 1.5 × the median of the 8 steps at each end). Render lossless PNG intermediates: with JPEG frames the encoder smooths noise between neighbours but not across the seam, which then measures ~1.7× its neighbours.
- **Frame 0 is the poster.** It is what a paused or not-yet-autoplayed page shows, so it names the product. The product and the action start in the first 2 s, and the loop reads with the sound off.
- **GIF at 25 or 50 fps.** GIF delays are whole hundredths of a second, so 30 fps plays 11 % fast. Ship MP4 and WebM for `<video autoplay muted loop playsinline>` at ≤ 4 MB per 10 s of 1080p; a GIF only when asked, ≤ 960 px wide.

## Logo sting

- **3–8 s, the name plus three words at most.** The resolved lockup spans 28–45 % of the frame's width; smaller, the brand is an object in a void.
- **Assemble the mark from its primitives**: 2–4 pieces accelerate into contact, and one hit tuned to the track's root lands on the contact frame ([[designed-sfx-anatomy]]). A scale-up of a flat logo teaches nothing. Clamp any spring that could push one piece into another.
- **Hold and build.** The lockup cue sits ≥ 1.5 s before the end, and scale changes 3–20 % across the last 1.5 s. Never end on a fade that leaves the full lockup readable for under 1.5 s. The tail decays to digital zero.
- **Loudness.** A sting played at the head of other videos can sit near −16 LUFS; −1 dBTP after the encode, as everywhere ([[launch-video-sound]]). Deliver an alpha version (ProRes 4444, VP9 alpha WebM) for editors.

## Vertical and square

**Re-lay out; never crop.** A centre crop of a 16:9 master cuts the type and pushes the product off frame. Make each aspect its own composition on the same timeline and soundtrack, with line breaks written into the copy, not left to a wrap.

| Aspect | Keep text and key action inside | Type minimums |
|---|---|---|
| 9:16 feed, 1080 × 1920 | top 270, right 120, bottom 420, left 64 px (bottom 672 for long captions and paid posts) | statement 110–140 px, secondary ≥ 60, UI ≥ 32 |
| 1:1, 1080 × 1080 | 64 px on every side | statement ≥ 72, secondary ≥ 44, UI ≥ 28 |
| 4:5, 1080 × 1350 | 64 px at the sides, 96 top and bottom | statement ≥ 80, secondary ≥ 48, UI ≥ 30 |

In 9:16 the content's mass sits on the safe band's centre (y ≈ 885), not the frame's, and the bottom 40 % is never empty: stack the statement above the product or let the product bleed past the sides. Type and UI run 1.3–1.5× their 16:9 sizes. Burn captions into every feed cut, because feeds autoplay muted.

## Gotcha

The zones are snapshots of the big feeds' current overlays (header 240–290 px, action rail 120–190 px from about y 840, caption block 380–450 px, up to ~670 with a call-to-action button). They move when the apps redesign. Check the destination's overlay before a paid launch.

## Sources

- Leon Lin, cinetic (MIT, HEAD ecfa660): `skills/cinetic/references/formats.md` §4 (feature loop, seam gate, GIF arithmetic), §5 (logo sting), §7 (social re-layouts, feed zones, type minimums); `references/sound.md` §13 (the sting's −16 LUFS). These are practice and arithmetic, not corpus measurements.
- Related: [[launch-video-structure]], [[launch-video-type]], [[launch-video-review]], [[cinetic-reconciliation]].
