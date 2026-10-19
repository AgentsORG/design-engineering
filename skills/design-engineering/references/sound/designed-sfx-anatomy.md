---
title: designed-sfx-anatomy
summary: What a designed motion sound effect is made of, measured — one gesture per sound, its own band, a hard end, mono for objects and wide for textures, and a sync point per kind. Per-category targets for whoosh, riser, impact, sub drop, sting, glitch, shimmer, ding, pop, pop-in, click, tick, typing and zip.
tags: [sound, sfx, launch-video, synthesis, whoosh, riser, impact, measured]
---

# Designed SFX anatomy

A launch-film effect is not a recording of a thing; it is **designed**: a few layers, each owning one band, peaking together, with one gesture that carries the meaning. earshot measured 58 exposed effects in 8 professional launch films, bed-subtracted, and they share five habits. A sound that breaks them reads as a stock blip or a code beep, whatever its source ([[sound-generation-open-source]], [[launch-video-sound]]).

1. **One gesture each, mostly pitch or gate.** Zips sweep 20–60 octaves a second; pop chirps fall ~43 oct/s; dings in a run step up one semitone; risers and glitches stutter at 20–45 ms gates that *speed up* into the cut (24 → 20 ms, 32 → 22 ms).
2. **Band-limited on purpose.** Typing has nothing under 2 kHz; pop-ins, taps, impacts and big whooshes live under 150–250 Hz with a thin tick or air layer 20–40 dB down; dings have nothing under 500 Hz. 300 Hz–1 kHz is left to the voice and the music's chords.
3. **Hard ends.** Short sounds hold, then stop (convex decay in 7 of 10 pop-ins, 4 of 4 dings); designed impacts end on a gate, not a ring-out.
4. **Mono for objects, wide for textures.** Pops, keys, clicks, whooshes and stings are mono to near-mono; shimmer and glitch are decorrelated (correlation 0.04–0.36).
5. **Placed by kind** ([[sound-motion-sync]]): attacks 30–200 ms ahead with the body within ~80 ms of the cut; whoosh peaks within ±150 ms of it; risers, zips and glitches *end* on it (0–20 ms) and hand over; pop-ins land 25–40 ms after their cut.

## Targets

| Kind | Length | Shape | Band | Gesture |
|---|---|---|---|---|
| Whoosh (big) | 0.5–1.0 s | rise ~190 ms accelerating, fall twice as fast | ≥ 80 % under 150 Hz, air 20–30 dB down | centroid falls ~2 oct across the pass; peak at 50–70 % of its length |
| Riser | 0.8–1.5 s | concave: half the rise in the last third | drone + tonal layer + high noise | tonal +2 oct (2 → 8 kHz); gate 24 → 20 ms; ends on the hit or a 0.1–0.5 s stop-down |
| Impact | 0.6–1.3 s | transient, then the body swells 50–290 ms | > 75 % under 150 Hz, ridge ~80 Hz | textured tail (grains every 25–35 ms), then a hard gate |
| Sub drop | 0.8–1.5 s | 30–50 ms transient, sub blooms 0.3–0.4 s after | > 85 % under 150 Hz | 64 → 44 Hz, tuned to the track; add 2nd/3rd harmonics for phones |
| Logo sting | 0.8–1.5 s | 85 ms chirp into a ringing hum | peak 250–500 Hz | 1.5 kHz → 150 Hz chirp onto a 64–80 Hz hum in the key |
| Notification ding | 0.2–0.4 s | 1–15 ms attack, stops by 45 ms (convex) | 1.8–2.2 kHz + a partial near 3.4×; nothing < 500 Hz | a run steps up one semitone per ding |
| Pop-in (element appears) | 0.14–0.25 s | 6–20 ms attack, t20 ~20 ms | thump 80–150 Hz + a 1–10 kHz tick 30–40 dB down | runs every ~200 ms; optional double hit 60–70 ms apart |
| UI click / hover tick | 30–60 / 20–40 ms | 0–3 ms attack, t20 6–16 ms | centroid 5–10 kHz; ticks empty under 500 Hz | none |
| Typing key | 50–80 ms | 2–5 ms attack, convex | 3–12 kHz noise, < 2 kHz ≥ 30 dB down | runs jitter 60–150 ms; vary the take, not the pitch |
| Zip | 0.15–0.3 s | ends on the cut | tonal glide + a few harmonics | exponential sweep 20–60 oct/s, up, down or an arc; sits +7–9 dB over music, not +13–17 like hits |

Over music, hits, clicks, pops and dings sit +13 to +17 dB over the quiet bed between beats. Tonal parts — dings, stings, chimes, booms, subs — are **tuned to the track's key**; an untuned boom under a resolving chord reads cheap to people who cannot say why ([[launch-video-music]]). Repeats draw from 4+ takes, never the same twice in a row, ±1–2 dB, at most ±0.5 st; the UI click is the exception, one voice at one level every time ([[sound-palette]]).

## The design chain

Band each layer (sub < 120 Hz, body 80–800 Hz, transient > 1–2 kHz); saturate body and transient, never the sub; glue at 2:1–4:1 with a 10–30 ms attack so the crack survives; reverb on body and tail only, sub dry; high-pass at 20–25 Hz; limit to −1 dBTP. In code, `sound-sheet.mjs` voices `riser`, `impact`, `sting`, `ding`, `pop` and `zip` to these targets ([[sound-from-motion]]).

## Gotcha

These are measurements of *designed* effects, not of nature, so a realness test can mislead both ways. A modal resonator plus a room reads "real" to earshot's model, and a clean designed chime reads "synthesized". Judge by the band, envelope and gesture above, by spectrograms next to references, and on phone speakers. The evidence is thin per row: 39 of the 58 events come from one sound-design film, and most rows hold 1–10 examples ([[earshot-reconciliation]]).

## Sources

- Leon Lin, earshot (MIT, HEAD 925ebe5, 2026-10-18): `docs/motion-sfx-study.md` (58 bed-subtracted events, 8 unnamed professional films, K-weighted levels, 1/3-octave balance) and `docs/motion-sfx-techniques.md` §0 (the design chain), §13 (levels), §14 (the cheap-SFX checklist), with their cited practitioner sources (Violet Recording, Krotos, Ableton, Farnell's *Designing Sound*).
- earshot `skills/real-sound/references/sound-design.md` §6–7 (variation without randomness; tuning to the track).
- Related: [[launch-video-sound]], [[sound-spec]], [[sound-palette]], [[sound-from-motion]].
