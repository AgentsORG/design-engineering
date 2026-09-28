---
title: launch-video-sound
summary: Pick the sound register from the picture (dry reveal, OpenAI one-key bed with clicks, beat track, voice-led, product-camera pad with consequence foley), take something away just before the reveal, and state the loudness on purpose; -1 dBTP true peak is the only fixed number.
tags: [sound, launch-video, registers, loudness, openai]
---

# Launch-video sound

A launch video inverts the product-UI default ([[marketing-vs-product-ui]]). On the product, sound is opt-in, rare and quiet ([[sound-spec]]); in the film, sound is the emotional layer. Five measured registers read as crafted, and in every one the sound's structure sits on picture events (under a voice, the voice's onsets time the picture). Pick the sound register from the picture's register ([[launch-video-registers]]), take something away just before the reveal, and state the loudness on purpose: −1 dBTP true peak is the only fixed number.

## Five registers

| Register | What carries it | Measured | Seen in | Use |
|---|---|---|---|---|
| **A · Dry reveal** | hits only; holds in true silence | 32 onsets, each within 2 frames of a motion peak; holds at −56 dBFS; peak −3.1 dBFS | bruno (@tvnxty) for Base, 2026 (n = 1) | reveals and stings under 15 s |
| **B · One-key bed + clicks** | a sub drone in one key; dry clicks on stepped reveals | 66–67 % of energy under 120 Hz; no tempo grid (phase concentration 0.02 / 0.09); LRA 15 / 9 LU; −19.1 / −20.6 LUFS | OpenAI *Refreshed.* (Studio Dumbar/DEPT, 2025), *Introducing GPT-5* (2025) (n = 2, one brand) | brand films; kinetic type with stepped motion when the brand wants one key, not a beat |
| **C · Beat track** | a track whose drop, gaps and breakdowns sit on picture events; the track carries the pops | Skale's 18 music films: beat clarity 0.60 (14 at ≥ 0.5), sub 65 %, LRA 4.6 LU, −17.7 LUFS, 1.8 % of energy above 2 kHz; 13 of 18 acclaimed films run a beat or pulse | Replit Slides, Replit Canvas, Replit Parallel Agents, Bevel, Bolt; Granola 2.0; the beat-cut sizzles (Spline Hana, Material 3 Expressive, Figma glass, Arc on Windows) at its fast edge | UI motion, keynote cards (a beat track in 4 of 5), beat-cut sizzles and kinetic type (all 3 measured films run a beat or pulse), placed per [[launch-video-music]] |
| **D · Voice-led** | the voice; a bed 10–13 dB under it | Skale's 10 voice films: −21.7 LUFS; Apple Liquid Glass −22.3 LUFS, 56 % of energy at 120–500 Hz | Skale's 10 voice films (founder and live action); Apple Liquid Glass | founder-led and live action (all 10 are voice-led), and a presenter in a continuous-camera film (Apple), per [[launch-video-music]] |
| **E · Product-camera pad + foley** | a tonal pad or sub-root score with no grid; foley whose level follows consequence | Linear Agent −32.9 LUFS, Raycast −16.9; LRA 12.8 / 13.7 LU; foley at 1.45–2.5 kHz | Linear Agent, Raycast (n = 2) | product camera: the real product, one action at a time |

In A, sound density mirrors motion density and size maps to pitch and length: ticks at 3–6 kHz for 100–200 ms, the wordmark near 1 kHz for 700 ms, in real materials rather than effects ([[sound-palette]]). Two one-offs were also measured: a continuous pitched score with no grid, for a continuous-camera film without a presenter (Perplexity Comet, LRA 5.1 LU) and a warm pulse with no top end and no foley (Google AI Mode, 3.7 % of energy above 2 kHz).

## B, the OpenAI bed, in brief

- A drone rooted on F1 (43 Hz) with C2, F2 and A2, present for 78 % of *Refreshed.* (110 s) and 97 % of GPT-5 (89 s), with a faint 0.26 s sub pulse.
- Clicks at 3.1 and 5.1 per second, 10 dB down within 20–30 ms; the strongest high hits centre at 3.5 and 4.7 kHz. At the hit a click peaks level with the sub (+1.7 dB, per-hit median) or 7 dB under it (−7.3 dB); across the whole film the high band sits ~19 dB under the sub band at p95. Name the metric when you quote either.
- The bed carries every cut, so there are no whooshes; a big settle gets a thud on the root; dynamics move by act, not by hit. The cue-sheet form is in [[sound-from-motion]].

## Where clicks belong

The 3–5 kHz click layer is OpenAI's, not the genre's. Only 2 of 18 acclaimed films carry a separable foley layer (Linear Agent, Raycast), and it sits at 1.45–2.5 kHz. Linear Agent **maps consequence to level**: typing sits ~4 dB over the sub, Enter +9.2 dB, Send +14.5 dB. Raycast pulls the sub for its keyboard beat so the clicks stand 18–24 dB clear. Harmony can mark acts: Linear Agent's pad moves from C major to E-flat major within ~0.4 s on Send, and Raycast's sub root steps to a new note on nearly every cut.

## In every register: subtract before the reveal

23 of 28 Skale films take sound away just before a reveal (17 of 18 music films, 6 of 10 voice films); so do 14 of 18 acclaimed films; 10 of the 18 use sub-only dropouts.

- **Before the reveal**, 0.1–0.9 s: Contra Indy pulls the sub 0.25–0.5 s ahead of reveals; Taste Labs drops to −42 dB for 0.9 s before the raise is named; acclaimed pre-reveal gaps run ~0.55 s (0.1–0.8 s: Granola 2.0 0.5–0.75, Notion Mail 0.55, Notion 3.0 0.8, Arc on Windows ~0.1 s of near-silence).
- **Under the name**: Apple Liquid Glass holds it in ~1.5 s of near-silence, ~20 dB under the mix.
- **On a conversational turn**: Claude Cowork falls to about −60 dB for 1.2 s as the clarifying question opens.
- **Before an impact**: a 0.1 s silence pocket, the hit starting on the rupture frame with no pre-roll (HeyGen's liquid pop).

End the gap on the reveal frame. Its picture half is the 0.3–0.75 s stillness in [[launch-video-motion]]; breakdowns under reading and the silences around a voice are placed in [[launch-video-music]]. Linear Agent and Perplexity Comet punctuate the other way, by adding: Linear Agent blooms the sub +8 to +25 dB on the entry point, the answer and the brand, and nowhere else; Perplexity Comet swells ~15 dB over 1.5 s at world changes.

## Endings

A hard audio stop on the cut to black (Perplexity Comet: ~35 dB down in under 125 ms); a chime on air (Claude Opus 4.6); the logo on silence (Google Gemini app ~1.8 s), or silence over black after it (Apple Liquid Glass, 5 s); a sub tail matched to a 4 s logo fade (Framer 3.0); or one low swell after the voice ends (Conduit, Extend).

## Loudness is a register choice

The medians are −18.1 LUFS for Skale (25 of 28 quieter than −14) and −18.4 for the acclaimed set (14 of 18 quieter). In the acclaimed set, loudness follows length (Spearman ρ = −0.57, n = 18; Skale's films lean the same way only weakly): the four hotter acclaimed films all run 38 s or less (Figma glass, Granola 2.0, Material 3 Expressive, Arc on Windows: −12.1 to −13.0 LUFS); the three quietest are 55–69 s in-house AI walkthroughs (Claude Cowork, Linear Agent, Cursor 2.0: −32.6 to −35.8), which platforms will not raise. Register E alone spans −17 to −33 LUFS, and length separates its two films (Raycast 38.6 s at −16.9, Linear Agent 54.9 s at −32.9). Skale's voice films sit at −21.7; Extend reached 589k views at −31.1.

- **−1 dBTP true peak, always.** 5 of 18 acclaimed films reach 0 dBTP or above; Skale's Wonder (first film) hits +1.2 and Contra x fal +0.7.
- **−14 LUFS is one option** for muted-autoplay feeds, not a standard. Write the target next to the register; [[launch-video-review]] checks both numbers.
- **Check on phone speakers.** Everything under 200 Hz vanishes there, so the sub cannot be the only thing carrying a sync point, and a sub-only gap must coincide with the picture's stillness ([[launch-video-motion]]) or a mid-band dip to register on a phone.

## Recipe

1. **Lock picture**, or in a voice-led film lock the voice first and re-time scenes to its word onsets ([[launch-video-music]]; HyperFrames' sync-durations does the same). Sound is placed on frames.
2. **Pick the register** from the film's register ([[launch-video-registers]]) and write its loudness beside it.
3. **Write the sound as data**: the bed's arc and cues ([[sound-from-motion]]) or the track's structure ([[launch-video-music]]).
4. **Land transients and cuts on contact and onset frames** ([[sound-motion-sync]]).
5. **Render every clip inside the composition**, master to −1 dBTP at the register's loudness, and listen once on phone speakers.

## Gotcha

The AI default is an unstructured bed: laid from 0 s at one level, no drop on the reveal, nothing withheld, cuts landing at chance. A beat track is not the problem: Skale's 18 music films and Granola 2.0 ride one and read as crafted, because the drop and the gaps sit on picture events. If you cannot place the structure, use register B's one-key bed or register A's silence, and never sprinkle library blips over a beat track. In a HyperFrames product-launch-video build, the per-beat `sfx:` that fetch-sfx mounts are library blips: leave them out under a beat track; elsewhere derive them from the motion ([[sound-from-motion]]) and trim each onset. This graph owns sound there ([[hyperframes-reconciliation]]).

## Sources

- OpenAI, *Refreshed.* (YouTube k3d_xeVxEOE, 2025, Studio Dumbar/DEPT with the OpenAI design studio) and *Introducing GPT-5* (boJG84Jcf-4, 2025): onset, band, bed-pitch and hit analysis by HKTITAN, 2026-09-05 (`docs/research/launch-register/*-summary.json`); integrated loudness and LRA from the same 2026-09-05 measurement (not in the summaries).
- bruno (@tvnxty), superfx.co: Base logo reveal, 2026-09-03; analysis by HKTITAN.
- Skale (skale.solutions/portfolio): audio of 28 client films measured by HKTITAN, 2026-09-28; LUFS, LRA, band shares, beat clarity and subtractions counted film by film (`docs/research/launch-films/`: `tables/`, `metrics/`, `notes/synthesis-skale.md`).
- Linear Agent (2026), Raycast (2025), Apple Liquid Glass (2025), Granola 2.0 (2025), Perplexity Comet (2025, Studio Freight), Google AI Mode (2025, Ordinary Folk, inferred), Notion Mail and Notion 3.0 (2025), Arc on Windows (The Browser Company, 2024), Claude Cowork (Anthropic, 2026), Claude Opus 4.6 (Anthropic, 2026, BUCK per brief), Google Gemini app (2024, Ordinary Folk), Framer 3.0 (2026, maker uncredited), Cursor 2.0 (2025), Figma glass (2025), Spline Hana (2025), Material 3 Expressive (Google Design, 2025): audio measured 2026-09-28 (`docs/research/launch-films/notes/synthesis-acclaimed.md`).
- HeyGen, *hyperframes-launches* (Apache-2.0): `liquid-brand-refraction/shot-plan.json` (`audio.cues`, `audio.contrast`); commits 2a439ec and dd128ad, which restored soundtracks mixed in post. heygen-com/hyperframes (Apache-2.0): `skills/product-launch-video/SKILL.md` Step 5 (sync-durations, fetch-sfx) and `references/visual-design.md` (the per-beat `sfx:` tag).
- Studio Dumbar/DEPT, OpenAI brand film case study (studiodumbar.com/work/openai-brand-film; D&AD pencil 2025). Twenty Thousand Hertz, *The Sound of Apple*: organic materials over synthesis.
- Related: [[launch-video-music]], [[sound-from-motion]], [[launch-video-registers]], [[sound-spec]], [[marketing-vs-product-ui]].
