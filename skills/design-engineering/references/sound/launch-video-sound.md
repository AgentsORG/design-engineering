---
title: launch-video-sound
summary: The launch-video register — sound density mirrors motion density, holds are true silence, small things tick high and short, big things land low and long — with a measured sound map and a timeline recipe.
tags: [sound, launch-video, marketing, motion-graphics, audio]
---

# Launch-video sound

A product launch video inverts the product-UI default. On the product, sound is opt-in and rare; in the video, sound *is* the emotional layer and the viewer cannot mute it without losing the piece. The register that reads as premium in 2026 — the OpenAI film language Studio Dumbar/DEPT describes as "organic motion" with sound that makes the brand "feel alive" — has four properties you can measure.

## The four properties

1. **Sound density mirrors motion density.** A fan of cards shuffling gets a cluster of ticks, one per card; a single snap gets a single hit; a hold gets nothing. The soundtrack is a transcript of the motion.
2. **Holds are true silence.** Not a pad, not room tone — the track drops to the noise floor between events. Silence is what makes the next transient land.
3. **Size maps to pitch and length.** Small elements tick at 3–6 kHz for 100–200 ms. The wordmark lands around 1 kHz for 700–800 ms. Nothing lives below 120 Hz except a deliberate sub-hit.
4. **Materials, not effects.** Taps, mallets, breath, paper — the [[sound-palette]] rule. No braams, no risers, no stock whoosh library; a whoosh is a *filtered breath* with its peak on the settle.

## A measured sound map

Analysis of a 10.7 s logo reveal for Base by sound designer bruno (@tvnxty, superfx.co), posted 2026-09-03:

| Time | Visual | Audio | Character |
|---|---|---|---|
| 0.3–1.4 s | Stack of cards shuffles, then snaps into a row | 12 onsets: ten small ticks, then two hard hits | Ticks 3.5–6 kHz, ~100–200 ms; hits 2.5 kHz, ~100–190 ms decay, the loudest events in the piece |
| 1.5–3.4 s | Hold | Silence (−56 dBFS) | — |
| 3.5 s | Wordmark cuts in | Two soft hits, 1.0–1.1 kHz, ~750 ms decay | The biggest element, the lowest and longest sound |
| 5.8 s, 6.4 s | Wordmark pixelates / glitches | Two mid pulses, 0.8–1.3 kHz | Texture, not transient |
| 8.2–9.1 s | Cards recolor and shuffle | 10 ticks, 2.5–5 kHz | Same family as the opening |
| 9.3–10.4 s | Collapse to one card, then a dot | Three pulses, 1.0–1.4 kHz, decaying 350 → 120 ms | Each smaller than the last |

Whole piece: peak −3.1 dBFS, program average −25 dBFS, every onset within two frames of a visual motion peak. There is no music bed. That is the whole recipe.

## Timeline recipe

1. **Lock picture first.** Sound is placed on frames; it cannot be placed on frames that move.
2. **Write the sound map** as the table above, one row per visual event, *before* generating anything. Assign each row a family member from [[sound-palette]] and a size class.
3. **Generate the family** in one session — [[sound-generation-elevenlabs]] prompts for video add the physical gesture: "soft whoosh, breath through paper, peak at the end, dry, 400 ms"; "single dull impact, felt mallet on thick card, dry, 600 ms tail." Or [[sound-generation-open-source]].
4. **Place transients on contact frames**, not file starts — [[sound-motion-sync]]. In Remotion, `<Audio src startFrom={offset} />` where `offset` corrects for the file's pre-roll; in HyperFrames, `data-start` on the settle frame and `/hyperframes-audio` for gain lanes.
5. **Duck, don't fight.** If there *is* a bed, carve 3–6 dB out of it under each hit rather than raising the hit.
6. **Master to −14 LUFS, −1 dBTP** for social; check on phone speakers, where anything under 200 Hz vanishes.

## When to apply

Launch films, feature sizzles, logo reveals, onboarding hero moments, and any marketing motion where the audience expects sound. Not product UI — route that to [[sound-decision-framework]].

## Gotcha

A music bed is the AI-default of launch videos: it hides the sync work. Try the cut with **no bed** and only designed hits first. If it holds up, add a bed at −24 LUFS or leave it out — the OpenAI-register pieces that feel most expensive are the ones where you can hear the silence.

## Sources

- bruno (@tvnxty), superfx.co — Base logo reveal, 2026-09-03; onset, spectral-centroid, and motion-correlation analysis by HKTITAN.
- Studio Dumbar/DEPT — OpenAI brand motion and the ChatGPT-5 sizzle: "organic motion," sound design that makes the brand "feel alive, dynamic, and deeply human."
- Twenty Thousand Hertz, *The Sound of Apple* — organic materials over futuristic synthesis.
- Sonilo, *Whoosh: motion, timing, and mix*; Pro Sound Effects, *Sound editing in sync* — transient on the action frame, not file start.
- Related: [[marketing-vs-product-ui]], [[stagger-choreography]], [[sound-spec]].
