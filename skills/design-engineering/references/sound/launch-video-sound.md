---
title: launch-video-sound
summary: The launch-video register, measured twice — the sparse logo-reveal (no bed, every hit on a motion peak, true silence) and the OpenAI brand-film (a warm sub-heavy bed that carries the piece, dry clicks 10–20 dB under it on every stepped reveal, silences as punctuation) — with sound maps, numbers, and a timeline recipe.
tags: [sound, launch-video, marketing, motion-graphics, audio, openai]
---

# Launch-video sound

A product launch video inverts the product-UI default. On the product, sound is opt-in and rare; in the video, sound *is* the emotional layer. Two registers read as premium in 2026, and they are not the same thing. Pick one on purpose.

## Register A — the logo reveal (no bed)

Measured from a 10.7 s logo reveal for Base by bruno (@tvnxty, superfx.co): 32 onsets, every one within two frames of a visual motion peak; holds at −56 dBFS; peak −3.1 dBFS; program average −25 dBFS; no music.

1. **Sound density mirrors motion density.** A fan of cards gets a cluster of ticks, one per card; a single snap gets one hit; a hold gets nothing.
2. **Holds are true silence.** Not a pad, not room tone.
3. **Size maps to pitch and length.** Ticks 3–6 kHz for 100–200 ms; the wordmark ~1 kHz for 700 ms.
4. **Materials, not effects.** Taps, mallets, breath, paper — [[sound-palette]].

Use it for reveals under fifteen seconds, stings, and anything where the silence is the point.

## Register B — the brand film (bed + clicks)

Measured from OpenAI's *Refreshed.* (110 s, Studio Dumbar/DEPT with the OpenAI design studio, type by Dinamo, 2025) and *Introducing GPT-5* (89 s, 2025), 720p rips analysed frame by frame:

| | Refreshed. | GPT-5 |
|---|---|---|
| Integrated loudness / range | −19.1 LUFS · 15 LU | −20.6 LUFS · 9 LU |
| Energy under 120 Hz / 120–500 Hz | 66 % / 25 % | 67 % / 29 % |
| Bed root and partials | F1 43 Hz · C2 · F2 · A2 (an F chord) | same key |
| Bed present | 78 % of runtime | 97 % |
| Sub-envelope pulse | 0.26 s, weak (12 %) | 0.26 s, 25 % |
| Hits above the bed | 3.1 / s, centroid 3.5 kHz | 5.1 / s, centroid 4.7 kHz |
| Hit decay (−10 dB / −20 dB) | 20 ms / 115 ms | 30 ms / 55 ms |
| Hit level vs the sub at the same moment | level with it | 7 dB under |
| Hits on a tempo grid | no (phase concentration 0.02) | no (0.09) |
| Hard cuts | 39, of which 11 in one 2 s glyph flipbook | 11, all in one montage |
| Frames nearly still | 61 % | 64 % |

What the numbers say:

- **The bed is the material.** A warm, sub-heavy drone in one key, breathing slowly, with a faint quarter-second pulse. It is not a beat: nothing sits on a grid. It carries every cut, so there are no whooshes.
- **The hits are clicks, and they are quiet.** Dry, 3–5 kHz, ten dB down inside 30 ms, sitting 10–20 dB under the bed's low end. They land on *stepped* reveals — a glyph flicking through variants every seven frames, a sentence streaming in word by word, a table filling cell by cell (210 ms apart in GPT-5) — so they read as the interface's own sound, not as a soundtrack. A big element settling gets a low thud on the bed's root instead.
- **Silence is punctuation, not the default.** *Refreshed.* opens with nine seconds of near-silence and tiny clicks before the bed arrives, drops to nothing for 0.5–1 s at a time in its breakdown (47–58 s), and pulls the sub out under the photography (79–91 s). GPT-5 pulls the sub — and only the sub — for the "thinks deeply" beat at 32–38 s and again at 61–64 s, keeping the pad. The reveal that follows lands with the sub returning.
- **Dynamics come from the arc, not from the hits.** The film's loudness moves in acts: quiet open, full section, breakdown, finale, out. Inside an act the level barely moves.
- **Most frames are still.** The eye is given long holds on type; motion is stepped or slow. Sound density follows: dense while text streams, sparse in the holds.

## Timeline recipe (either register)

1. **Lock picture first.** Sound is placed on frames; it cannot be placed on frames that move.
2. **Write the sound map** — one row per visual event with its contact frame and its box on the canvas — before generating anything. [[sound-from-motion]] renders that map deterministically: `bed` for register B, `click` / `thud` / `type` / `flicker` for stepped reveals, `land` / `tick` / `whoosh` for register A.
3. **Place transients on contact frames**, not file starts — [[sound-motion-sync]].
4. **In register B, write the bed's arc as gain points** (an act table in dB) and its dropouts (start, length, whether the pad stays). Duck it 3–4 dB under every thud.
5. **Master to −14 LUFS, −1 dBTP** for social; both OpenAI films sit 5–6 LU under that and let the platform normalize. Check on phone speakers — anything under 200 Hz vanishes there, which is why the clicks carry the sync and the bed carries the feeling.

## Gotcha

A stock music bed is the AI-default of launch videos because it hides the sync work. The OpenAI bed is not that: it is one drone in one key with no beat, and every click is on a frame. If you cannot place the clicks, cut the bed and use register A — a wrong bed with unsynced hits is the worst of both.

## Sources

- OpenAI, *Refreshed.* (YouTube k3d_xeVxEOE, 2025-02-04) and *Introducing GPT-5* (boJG84Jcf-4, 2025-08-08) — onset, band-energy, bed-pitch, cut, and motion-stillness analysis by HKTITAN, 2026-09-05.
- Studio Dumbar/DEPT — OpenAI brand film case study (studiodumbar.com/work/openai-brand-film): "dots and logos animate naturally, interface elements pulse gently, and typography appears intuitively"; sound "drawing from human interactions"; D&AD pencil 2025. Creative Review, *OpenAI's brand refresh subtly signals a new era*.
- bruno (@tvnxty), superfx.co — Base logo reveal, 2026-09-03; analysis by HKTITAN.
- Twenty Thousand Hertz, *The Sound of Apple* — organic materials over synthesis.
- Related: [[sound-from-motion]], [[launch-video-seams]], [[marketing-vs-product-ui]], [[sound-spec]].
