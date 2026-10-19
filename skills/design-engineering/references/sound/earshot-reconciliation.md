---
title: earshot-reconciliation
summary: earshot gives an agent ears — describe, match, find, realness, a listening timeline, a launch scorecard, and a bank of 201 code-rendered effects aimed at the picture. What it owns, where this graph's values win, and how to run it.
tags: [sound, companion, earshot, launch-video, review, measurement, sfx]
---

# earshot, reconciled

An agent cannot hear what it makes, so it should never say how audio sounds without a reading behind it. **earshot** is the reading: local, CPU-only, a CLI, a Python API and an MCP server. Route listening to it whenever it is installed; keep the *decisions* — register, placement, loudness target — here.

## What earshot owns

| Job | Command | Notes |
|---|---|---|
| What a file sounds like | `describe`, `match FILE "query" --alts …` | a "strong" verdict (z ≥ 3) was the right kind of sound 98 % of the time on 125 held-out recordings |
| Pick and trim a recording | `rank`, `find FILE "a single key press"` | trims start 5 ms before the attack; reject a trim marked "head cut" or "tail cut" |
| Code-made or recorded | `realness` | held-out ROC-AUC 0.92; judge the trim you will use, not a multi-take file |
| Listen through a film | `timeline FILE --video V`, `sheet -o x.png` | events, sections, loudness, beat grid, onsets against cuts, attack and peak per event |
| Score a film | `critique FILE` | 23 metrics against 7 unnamed launch films, with timestamped fixes |
| Effects without recordings | `sfx render ID --dur --apex --pitch`, `kit init / render` | 201 sounds stored as code; `apex` lands a whoosh's peak within 5 ms of the target; every render is audited (clicks, cut tails, ring, a re-rising "synth whip") |

`measure`, `sfx` and `kit` load no models. Everything else loads two pinned models (~1.1 GB, CLAP and an AudioSet tagger) once per process, ~20–40 s, so use the MCP server or one script for more than a few calls.

## Where this graph's values win

| Topic | earshot | This graph | Why |
|---|---|---|---|
| Master loudness | ~−14 LUFS; its 7 films median −14.8 | stated per register; medians −18.1 (Skale, 28) and −18.4 (acclaimed, 18) | 47 named films outweigh 7 unnamed, music-led ones ([[launch-video-sound]]) |
| Music | leads every film | one of five registers; a beat track only where its drop can be placed | its 7 films are mostly register C |
| Source of sound | real recordings only; synthesis "reads cheap" | derived from the motion; register B is synthesized ([[pov]]) | its own forge made effects that one listener picked from real ones only 8 times in 15; build them to [[designed-sfx-anatomy]] instead |
| Sound before picture | "lead by up to a frame" (a starting value) | never lead; aim 0–30 ms late ([[sound-motion-sync]]) | ITU-R BT.1359's asymmetry |
| Hits on cuts | no better than chance in its 7 films | 6 of 18 acclaimed films cut at chance ([[launch-video-cuts]]) | they agree: lock deliberately or not at all |

Read realness as information when synthesis is the point: a clean designed chime reads "synthesized" and a resonator plus a room reads "real".

## A worked build

MotionVideo's 29.5 s launch film (motionvideohq/motionvideo.xyz, MIT, `launch-video/audio/sounddesign.json`) is the whole loop in one file. A Mixkit track at 121 BPM is cut so its drop lands on the logo mark (frame 119), and the groove stops one beat early so the next downbeat lands on the lockup. The music rides −3 dB under screen recordings and −10 dB under typing. Each effect was forged and ranked with earshot: one click voice at one level, three key takes cycling with 1.5 dB jitter, the space bar −1.5 st, a whoosh aligned by peak, and one kalimba note on the track's tonic.

## Gotcha

The launch scorecard describes the style of its 7 films. A dry reveal, a one-key bed or a quiet product-camera film will fail metrics that do not apply to it. Build a profile from the register's own films (`earshot profile refs/ -o p.json`) before trusting a "needs work".

## Sources

- Leon Lin, earshot (MIT, HEAD 925ebe5, 2026-10-18): `README.md`, `docs/VALIDATION.md`, `docs/LIMITS.md`, `docs/launch-video-sound.md`, `docs/SFX.md`, `skills/earshot/SKILL.md`. Models: CLAP `laion/larger_clap_general` (Apache-2.0), AST `MIT/ast-finetuned-audioset-10-10-0.4593` (BSD-3-Clause).
- Aniket Pawar, MotionVideo launch film (MIT, HEAD 9655183): `launch-video/audio/sounddesign.json`, `CREDITS.md`.
- Related: [[skill-router]], [[launch-film-analyst]], [[sound-designer]], [[sound-licensing]].
