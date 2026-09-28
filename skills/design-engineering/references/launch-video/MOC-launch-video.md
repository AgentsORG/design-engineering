---
title: MOC-launch-video
summary: Launch films as an ordered decision flow — register, beats, words, UI demo, motion, seams, cuts, sound, review.
tags: [moc, launch-video, film, motion, sound]
---

# MOC — Launch video

A launch film is a run of decisions taken in order, and each has one owner node. Name the register first, because cut rate, stillness and loudness belong to it; then time the beats, set the words, the UI demo and the motion, make the seams and cuts, place the sound, and review the render against its own register. HyperFrames builds the film; this cluster decides it.

Evidence: 29 Skale pieces (28 client films and the 2025 reel), 18 acclaimed films from 2024-2026 (13 in-house, 4 studio, 1 uncredited), HeyGen's hyperframes-launches source (20 project folders, 3,446 tween calls) and 3 of its renders, measured by HKTITAN on 2026-09-28, every film at its native frame rate. Per-film metrics and scripts live in `docs/research/launch-films/` (repo only; `npx skills add` does not install them).

## The decision flow

1. [[launch-video-registers]] — name the register; its row medians set the cut rate (3-31/min), the still share (0.09-0.49) and the loudness (-13 to -33 LUFS).
2. [[launch-video-structure]] — time the beats: a word by 0.2-0.7 s; the name early (≤11 %), where a problem act ends (median 29 %, 6-51 %), or at ~70 % after the demo; an endcard of 4.4-6.3 s that holds ~2 s.
3. [[launch-video-type]] — set the words on screen, stepped about 0.2 s apart.
4. [[launch-video-ui-demo]] — drive the product UI, the cursor, typed prompts (~15 chars/s to be read, ~53 to be recognised) and the agent's wait.
5. [[launch-video-motion]] — motion inside a shot: objects settle with a time constant chosen per move, about 0.1-0.15 s (0.13-0.15 s in two Skale films); two measured counters (0.6-0.8 s) and Raycast's camera crane (~0.43 s, one film) settle slower, and a camera may drift at constant speed and be cut mid-drift.
6. [[launch-video-seams]] — what crosses a scene change (fills and zooms into type or a glyph run ~0.33 s); [[launch-video-cuts]] — hard cuts that read as one move.
7. [[launch-video-sound]] — pick the sound register (-1 dBTP is its only fixed number); [[launch-video-music]] places a track or a voice; [[sound-from-motion]] derives the stem; [[sound-motion-sync]] lands every transient on its contact frame, at most one frame late (0-30 ms), never ahead of it.
8. [[launch-video-review]] — review a render or a reference against its own register. The cut detector agreed with a frame reading in only 9/29 and 5/18 films, so recount by eye, or spawn [[launch-film-analyst]] to measure the file.

## What every register keeps

- No dead cut (a settled frame followed by a scene that waits): the outgoing scene is still moving on the cut frame, or the incoming frame acts within ~0.3-0.4 s. Hard cuts are fine (26/29 Skale and 14/18 acclaimed films cut); a crossfade fails only when its midpoint exposes a ground neither scene has (the dip law, [[launch-video-cuts]]); a dip through a shared ground, or a straight mix of the two frames, is fine (11/29 Skale and 6/18 acclaimed films dip or dissolve).
- Nothing decorative moves on a UI object (0/18 acclaimed; neither corpus floats UI), while slow drift, creep or ambient light under holds is common (Skale 15/29, or 10/29 counting camera push or drift alone; acclaimed 10/18).
- Display copy, where a register has any, is built per word or letter, never faded in as a block (27/29 Skale films), and holds 1.15 s after its last word (Skale) or 1.5 s per card (acclaimed).
- The low end arrives or returns on the first reveal: in Skale's music films the first drop lands on the brand or title reveal in 11/18 (on the thesis word in a 12th); in the acclaimed films the low end arrives on the first reveal in 10/18, which is the name only when the name comes early.
- Sound is subtracted to punctuate, a sub pulled or a silence placed: before a reveal in 23/28 Skale films with sound; before a reveal, under the name, on a conversational turn, under a diagram or under a premium tier in 14/18 acclaimed.

## Who builds it

HyperFrames builds and gates the film: for a launch piece, `/hyperframes` routes to `product-launch-video`, `motion-graphics` or `general-video`, and to `music-to-video` when a track's beat grid drives the piece. This cluster decides the register, beats and type cadence, and owns the sound; it also authors seams and cuts, but inside a HyperFrames project the seam stamp's eases, zoom values and exit timings win. Routing between the two lives in [[skill-router]], and [[hyperframes-reconciliation]] names the value to use for every other conflict.

## Cross-cluster

- A product state change is not a film seam: [[fly-not-teleport]] and [[cross-blur-transitions]] own transitions inside an interface.
- UI durations and springs ([[duration-table]], [[spring-animations]]) do not transfer to a film: a 60 s film has no 300 ms ceiling (Skale's counters run 1.15 s, its dissolves 0.45 s).
- A film inverts the product defaults, sound included: [[marketing-vs-product-ui]] for the picture, [[sound-decision-framework]] for why a product stays mostly silent while a film does not.

## Gotcha

Opening four nodes before naming the register wastes the flow: every number downstream depends on it. Four cuts a minute is Skale's UI-motion median and under a third of the product-camera rate (14.0).

## Sources

- HKTITAN, launch-film corpus measured 2026-09-28 (`docs/research/launch-films/`: README, tables/, metrics/, notes/synthesis-skale.md, notes/synthesis-acclaimed.md).
- Skale (skale.solutions/portfolio); the acclaimed films, with years and makers, as listed in [[launch-video-registers]].
- HeyGen, hyperframes-launches and heygen-com/hyperframes skills (Apache-2.0).
