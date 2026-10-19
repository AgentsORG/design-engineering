---
title: cinetic-reconciliation
summary: cinetic builds a launch film in Remotion (or HyperFrames) from one beat grid, with render, QA and Chromium forensics scripts. It owns the build. This graph keeps register, structure, type cadence and sound, and its measured values win where they disagree. cinetic's unnamed-corpus pacing numbers wait for a measurement.
tags: [launch-video, companion, cinetic, remotion, reconciliation]
---

# cinetic, reconciled

cinetic (`npx skills add Leonxlnx/cinetic`) directs a launch film, loop, sting or walkthrough as code. One `timeline.ts` beat grid drives the picture, the sound cues and the checks, and scripts cover rendering, delivery, layout audits, sync audits and Chromium forensics. Remotion is its default engine; HyperFrames is used when a project already runs on it. Route a **Remotion** film to cinetic when it is installed, and keep a HyperFrames film with HyperFrames ([[hyperframes-reconciliation]]): cinetic's own HyperFrames guide warns that the two skill sets compete inside one project.

## Who owns what

| cinetic owns | This graph owns |
|---|---|
| the scaffold, `timeline.ts`, starters, render and delivery (`render.sh`, `deliver.sh`) | the register ([[launch-video-registers]]) and the structure's beats ([[launch-video-structure]]) |
| layout, sync, grid and forensics checks; the Chromium rendering fixes ([[gotchas]]) | type cadence and holds ([[launch-video-type]]); seams and cuts ([[launch-video-seams]], [[launch-video-cuts]]) |
| loops, stings and feed re-layouts as deliverables ([[launch-video-formats]]) | sound: register, placement, loudness ([[launch-video-sound]], [[sound-from-motion]]) |

## Where this graph's values win

| Topic | cinetic | This graph (measured on 47 named films) |
|---|---|---|
| Crossfades | "No film crossfades between scenes" | 11 of 29 Skale and 6 of 18 acclaimed films dissolve or dip |
| Loudness | −14 LUFS for anything with music | a register choice; medians −18.1 and −18.4 |
| End card | 2.2 s (0.9–3.9 s), never over ~2.5 s held | Skale 4.4 s, acclaimed 6.3 s |
| Name on screen | by about a quarter of the runtime | early, or a late mode at ~70 % (6 of 18, mostly known brands) |
| Statement size | 5.5–11 % of frame height, median ~8 % | ~5 % (IQR 4–7 %) |
| Text hold | 0.77 s median of eight films | 1.15 s (Skale), 1.5 s per card (acclaimed) |
| Newest-word settle | ~0.4 s | 0.13–0.3 s |
| Cursor | 3.3–5.3 % of frame height | 7cqw ≈ 134 px; 15–22 % in Figma Motion's close-ups |
| Whoosh | apex on the visual peak, onset 100–450 ms ahead | agrees; this graph corrected its settle rule to match ([[sound-motion-sync]]) |
| Serif, cream, orange | hard bans | used in measured films; a register or a brand decides |

Inside a cinetic project, a value this graph sets goes into `BRIEF.md` as a brand-supplied exception, and the lines that set it carry `// cinetic:brand-supplied <what>` so its lint and its critics accept them. The register's serif, cream or crossfade is then a decision, not a violation.

## Claims waiting for a measurement

cinetic says its numbers were "measured frame by frame in top-tier launch films", but it never names the films or counts them, and its technique library rates evidence 0–9 with no sources. These are worth testing on the 47-film corpus before any node adopts them:

- **Energy arc:** an early peak at 10–25 %, a 1–4 s lull at ~65 %, the biggest peak at ~82 %; films whose last peak comes before 60 % sag.
- **Speed in px per frame (1080p60):** each shot enters at 20–45, cruises at 1.5–8, and leaves accelerating ×1.14 a frame; text being read moves ≤ 3 px/f.
- **Fragment flow:** 2 words per beat, 56 % of beats continue a sentence, copy on ≤ ~65 % of frames, a text-free stretch of ≥ 1.5 s in every 10 s.
- **Effects census:** ~85 % of hard cuts carry no sound and under 5 % a whoosh; ~5 designed effects per 10 s; ~75 % of on-screen typing is silent.

Until then, quote them as "cinetic reports" with the qualifier, or not at all.

## Gotcha

cinetic's evaluations were judged by language models, one run per brief. A neutral judge preferred it in 7 of 23 comparisons; a judge scoring against cinetic's own bans preferred it 4 of 4, which is circular. A film is about three times the baseline's cost (95 against 33 minutes). Remotion is free for individuals and companies of up to 3 people and needs a company licence from 4.

## Sources

- Leon Lin, cinetic (MIT, HEAD ecfa660, 2026-10-18): `skills/cinetic/SKILL.md` (hard bans, the brand-supplied exception, engine choice), `references/craft-rules.md` §1–7, `references/copy-and-type.md`, `references/sound.md` §12–13, `references/hyperframes-engine.md`, `docs/evaluation.md`, `README.md` (Requirements: the Remotion licence).
- This graph's values: `docs/research/launch-films/` (HKTITAN, 2026-09-28).
- Related: [[skill-router]], [[hyperframes-reconciliation]], [[launch-video-review]], [[earshot-reconciliation]].
