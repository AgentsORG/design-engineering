---
title: launch-video-review
summary: Review a film at native fps against its register — recount cuts by eye, check seams and onsets on frames, then taste. Measurement traps, the 11-row film rubric, and HeyGen's numeric render checks.
tags: [launch-video, review, measurement, verification]
---

# Launch-video review

Review a launch film the way the corpus was measured: at its native frame rate, against the medians of its own register, with every seam and every sound onset checked on frames. Numbers come first and taste second, because a resampled clip or a detector count reports things that are not in the film. The graph's own 2.4.0 move length for Skale's reel was one of them. Write the findings as [[review-format]] rows, one issue per row. For a film, Before is the measurement with its time in seconds and its frame number, After is the rubric's target, and Why ends in the row's owner node; with the composition source in hand, Before quotes the line and After is the line that meets the target. This node supplies the film rubric, which [[review-checklist]] (a floor for UI code) does not cover.

## Measure honestly

- **Native frame rate only.** Resampling a 24 or 25 fps film to 30 inserts duplicate frames that fake 2-4-frame moves. The 2.4.0 figure of a 4-frame median move (p75 11 frames) for Skale's 2025 reel was partly this. At the reel's native 60 fps the median is 0.19 s (p75 0.60 s, p90 1.39 s). State move lengths in seconds, never in frames.
- **Exact duplicates are held frames, not stillness.** Some films run a layer on twos on purpose: held share inside moves is 0.47 in Claude Opus 4.6 and 0.16 in Notion Mail. Pulldown adds ~3 points to the reel's 0.329 still share, and Bud runs at ~18 unique frames a second.
- **Recount cuts by eye** from contact sheets stepped every 2 frames around each seam. The histogram detector agreed with a frame reading in only 9 of 29 Skale films and 5 of 18 acclaimed films. It misses dark planes, white-on-white, cream-to-white and scale cuts, and it fires on fills, poster frames, dissolves and rotating planes.
- **Compare still share only within a register.** A frame counts as still when under 0.05 % of its area changes by more than 12 grey levels in 1/30 s, so a cursor, a caret or a breathing speaker counts as motion. The OpenAI stillness figures (*Refreshed.* 0.70, GPT-5 0.64) came from a different metric: mean absolute grey difference under 0.3 on 160×90 frames. Set them beside calm share (acclaimed 0.65, Skale 0.51), not beside still share.
- **Move runs are not tweens.** A run chains overlapping changes. Hand-time the hero moves instead (0.2-0.55 s in Skale's films) and take the time constant from the per-frame decay ratio r: tau = −1 / (fps · ln r). Replit Parallel Agents' drift decays by ×0.78 per frame at 29.97 fps, which gives tau = 0.134 s.
- **Proxies lie.** A blur ratio above 1 only means the still frames are flat. The speech proxy fires on music with no voice: Bud, Wonder (first film) and Contra Indy, and on beat gating in Granola 2.0 and Spline Hana. Band share above 2 kHz cannot see foley at 1.45-2.5 kHz, which is where Linear Agent and Raycast put their clicks. Cut-to-beat sync says little with 4 or fewer detected cuts, or under a voice.
- **Test a lock against chance.** Shift the onsets at random and see where the real count falls. The published K3 promo's bed puts 32.8 % of its 61 strong spectral-flux onsets within 67 ms of the composition's 62 stamped events. Randomly shifted onsets average 28.9 % (p95 34.5 %), so the bed is not locked to the picture. Views are no test either ([[launch-video-registers]]).

## The rubric

Numeric targets are the owner node's: corpus medians and ranges where the films were measured, house rules where they were not (the cursor size is HeyGen's oversized-cursor value, the seam budget is motion-doctrine's, the sync window is this graph's own (0-30 ms target, a fail past 2 frames), set inside ITU-R BT.1359's detectability limits of +45 ms lead and −125 ms lag, −1 dBTP is a safety margin). Row 2 uses the larger of the two corpora's upper quartiles (Skale's 1.3 s for the first word, the acclaimed films' 3.59 s for the first seam).

| # | check | target | owner |
|---|---|---|---|
| 1 | Register | named; cut rate inside its row, and still share too where measure.py ran (a repo checkout only); Skale's UI-row brackets are quartiles, so a value just past one is a note, not a miss | [[launch-video-registers]] |
| 2 | Hook | a readable word by ~1.3 s; the first seam by ~3.6 s | [[launch-video-structure]] |
| 3 | Name | at a measured mode: early (≤11 % of runtime), where a problem act ends (median 29 %, 6-51 %), or ~70 % after the demo (seen so far only from brands the audience already knows); the low end arrives on the first reveal | [[launch-video-structure]] |
| 4 | Words | built per word, ~0.2 s apart (0.13-0.2 s on music, ~0.3 s synced to speech), one word per beat (~0.4-0.5 s), or 0.5-0.9 s where the type is the voice; a short title card read once it lands may accelerate; the newest word settles within ~0.3 s; each line holds ~1.15-1.5 s (medians; Skale's range 0.5-2.4 s) | [[launch-video-type]] |
| 5 | UI demo | prompts at ~15 chars/s to be read, or ~53 to be recognised; a cursor that reads: 7cqw full-frame (4.6-5.5cqw inside a mock), or a native pointer inside a macro crop cut in until it reads (Cursor 2.0 cuts ~3×), entering from off-frame and leaving off an edge or as the next seam's carrier, never faded out in place; the agent's wait steps or is cut | [[launch-video-ui-demo]] |
| 6 | Motion | nothing decorative moves on a UI object; overshoot only in a playful register; no spring on a camera | [[launch-video-motion]] |
| 7 | Seams and cuts | no static boundary; no crossfade between two opaque scenes; one current; the Z sign matched; 2-3 seam types | [[launch-video-seams]], [[launch-video-cuts]] |
| 8 | Endcard | 4.4-6.3 s with a ~1.8-2 s final hold; a URL only with a call to action | [[launch-video-structure]] |
| 9 | Sound sync | a sound register chosen; its drops, gaps and breakdowns on picture events; aim every hit, click or press at its contact frame or one after (0-30 ms), never ahead, and past 2 frames at 30 fps (67 ms) it fails; a music beat or drop may trail its cut or reveal by up to ~0.1 s, never lead it | [[launch-video-sound]], [[launch-video-music]], [[sound-motion-sync]] |
| 10 | Level | ≤ −1 dBTP; integrated loudness stated for the register | [[launch-video-sound]] |
| 11 | Source | the composition owns its sound, with no mix added in post | [[sound-from-motion]] |

## Verify your own render

HeyGen checks renders with numbers rather than eyes: on its Send-to-HyperFrames film, most review rounds surfaced a defect nobody had seen by looking.

- **Seams.** Sample the carrier's position on every frame on both sides of the cut and compare exit and entry velocity; their seams matched at 99.6 % or better. A "double reveal" complaint is a direction reversal, or an element that is visible before its tween starts. Count reversals.
- **Frames.** Decode every rendered frame, not a sample (all 1,183 of a 49 s render), and look for flat, frozen or black frames. Exit code 0 proves nothing.
- **Dead time.** Scan for runs of 4 or more identical frames. Theirs turned up a 2.58 s tail after the logo lands and a 1.42 s dock hold. Their 0.2-0.4 s runs before a climax were commas and stayed; the doctrine's comma is 0.3-0.75 s ([[launch-video-motion]]), so flag longer holds, except the holds the rubric asks for: a line of type held ~1.15-1.5 s ([[launch-video-type]]) and the endcard's final hold of ~1.8-2 s ([[launch-video-structure]]). Flag the final hold only past ~2.9 s, the larger of the two corpora's upper quartiles (Skale 2.9 s, acclaimed 2.8 s); HeyGen's 2.58 s tail sits inside both, so it is a choice of register, not dead time, while the 1.42 s dock hold is the kind to flag.
- **Match cuts.** Measure on a band centred on the carried element (theirs: rows 430-560, cols 120-960 of a 1080×1080 frame), not on the full frame, where edge tiles fake a match.
- **Tools.** Read the transform GSAP writes, not rects read through the preview's scale, which invent sub-pixel reversals. Pass snapshot times in ascending order, because a backward seek re-renders a tween's start state and looks like a glitch.
- **Sound on the render.** Check a continuous bed by its energy window, never by onset: a detector called theirs 1.8 frames early. Click placement is in [[sound-motion-sync]].
- **Against a reference.** Diff scene boundaries only once both files are frame-comparable. HeyGen's Stripe study confirmed both files ran 38.7 s at 30 fps (1,161 frames) before timing each scene against the After Effects master.

## Build gates belong to HyperFrames

`npx hyperframes lint` and `check` gate the build, and a lint error aborts `render --strict`. `product-launch-video` Step 6 snapshots a contact sheet at each storyboard frame's midpoint and at every cut −0.1 s and +0.2 s. motion-doctrine's `seam-gate.mjs verify` (repo-internal, not installed by `npx skills add`) samples each ledger seam at −0.1 s, −1 frame, +1 frame and +0.1 s. Where HyperFrames' values and this graph's differ, [[hyperframes-reconciliation]] decides.

To measure a file, whether a reference film or your own render, spawn [[launch-film-analyst]].

## When to apply

Use it before shipping any launch film, sting or README film, and before copying a reference film's numbers into a brief.

## Gotcha

There are two classic misses. The first is calling a product-camera film too still against Skale's UI-film median: 0.49 against 0.09 is a difference of register ([[launch-video-registers]]), not a flaw. The second is signing off a render that sounds right while its source is silent. Three of HeyGen's launches were committed without the sound their published renders carried (sfx-music-launch and inspector-launch silent, hyperframes-launch with voice-over only), and their mixes were recovered from renders that ran 64 ms late, one frame late or 100 ms early; k3-promo's composition still never plays its committed audio ([[sound-from-motion]]).

## Sources

- HKTITAN, 2026-09-28, in `docs/research/launch-films/`: measure.py (the native-fps measurer and its still, calm and held definitions), metrics/*.json, notes/synthesis-skale.md §2, §5-6, notes/synthesis-acclaimed.md §4-6, and heygen_k3_sync.py (the lock-vs-chance test). The OpenAI stillness metric of 2026-09-05 is in `docs/research/launch-register/02-tempo-bed-cuts.py` and its two summaries.
- HeyGen, hyperframes-launches (Apache-2.0): `claude-design-send-hyperframes-launch/HANDOFF.md` §4, §10, §14.1, §17, §18; `HF-heygen-stripe/STUDY-V12-vs-TAKE6.md`; commits 2a439ec and dd128ad (sound recovered from published renders). Digest in `docs/research/launch-films/digests/`.
- Films: Skale (skale.solutions/portfolio) and the 18 acclaimed films as listed in [[launch-video-registers]], measured by HKTITAN 2026-09-28.
- heygen-com/hyperframes (Apache-2.0): `skills/product-launch-video/SKILL.md` Step 6; `skills/hyperframes-cli/SKILL.md` and `references/preview-render.md` (`--strict`); `.agents/skills/motion-doctrine/SKILL.md` (the comma, the seam budget) and `scripts/seam-gate.mjs`, `.agents/skills/oversized-cursor/SKILL.md` (internal).
