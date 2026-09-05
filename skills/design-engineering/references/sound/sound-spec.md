---
title: sound-spec
summary: The numbers for a shipped UI sound — duration by category, loudness in LUFS, peak headroom, mono, 44.1 kHz, zero leading silence, file format per target.
tags: [sound, spec, loudness, audio, format]
---

# Sound spec

A UI sound is a tiny file with strict numbers. Most "this sound feels wrong" complaints are a spec miss — too long for its animation, too loud next to speech, or ten milliseconds of silence before the hit — not a taste miss. Fix the spec first.

## Duration

| Category | Duration | Rule |
|---|---|---|
| Tick / toggle / snap | 40–80 ms | Finishes before the eye has registered the state change |
| Tap / press | 80–150 ms | Only in tactile products — see [[sound-decision-framework]] |
| Hover | 0 ms | Hover is silent. If a design insists, 120–200 ms and off by default |
| Send / save / confirm | 150–250 ms | One or two notes |
| Notification / receive | 200–600 ms | Longer because attention is being *requested* |
| Error | 100–200 ms | Short and low; the shake carries the rest |
| Transition (video / marketing) | 300–1000 ms | Product UI never gets these |
| Brand stinger | 1–3 s | Launch video, onboarding hero, once |

The Toptal rule ties duration to motion: **a sound should not last more than ~300 ms longer than the animation it accompanies.** A 120 ms press with an 800 ms tail is a bell, not feedback. Match the [[duration-table]].

## Loudness

| Sound | Integrated loudness | Notes |
|---|---|---|
| Taps, ticks, toggles | −18 to −14 LUFS | Below speech, above silence |
| Notifications | ≈ −12 LUFS | The one class allowed to be louder |
| Launch-video master | −14 LUFS, −1 dBTP | Social platforms normalize here |

Peak every file at **−3 dBFS** (−1 dBTP for delivered video). Set the *design* level in the file and the *user* level in the mixer — never bake "a bit quieter" into the asset. Interface sounds stay subordinate to speech and media; convey urgency with timbre and rhythm, not volume.

Integrated LUFS is unstable on files under ~400 ms — for ticks and taps, match by ear against a reference tick at −16 LUFS and check the peak, rather than trusting the meter.

## Format

- **Mono.** Phones, laptops, and Bluetooth speakers sum to mono anyway; stereo UI sounds phase-smear and double the bytes.
- **44.1 kHz, 16-bit WAV** as the source of truth. Ship **MP3 (128 kbps)** for universal playback or **Opus/OGG** for smaller web bundles; keep WAV for native and for video timelines.
- **Zero leading silence.** Trim to the first sample above −60 dBFS. Five milliseconds of pre-roll is a visible sync error — see [[sound-motion-sync]].
- **Short tail, then cut.** Fade the last 10 ms to avoid a click; do not let reverb ride 500 ms past the event.
- **Sprite when there are many.** One decoded buffer, offsets per sound; `use-sound` and Howler support `sprite` maps.

## Frequency shaping

- High-pass at 150–200 Hz. Nothing in that band survives a laptop speaker; it only eats headroom.
- Tame 3–6 kHz by a few dB if the sound is "needly" — that is where small speakers resonate.
- Keep the body in the mid-range (500 Hz–4 kHz), where every device is honest and where the voice lives.

## When to apply

Post-processing every generated or downloaded file, and reviewing any PR that adds an audio asset. `scripts/sound-family.mjs` applies the trim and peak steps automatically; the LUFS check is yours.

## Gotcha

Loudness normalization tools (`loudnorm`, streaming platforms) measure *integrated* loudness across the whole file. A sound that is 60 ms of hit and 600 ms of quiet tail will be normalized *up* until the hit clips. Trim the tail first, normalize second.

## Sources

- Envato, *UI sound design with AI* — LUFS targets by class, duration bands, mono, the 0–5 ms trim.
- Toptal, *A Quick Guide to Designing UX Sounds* — the 300 ms-over-animation rule; mid-range guidance.
- uisfx.com, *UI Sound Design* — subordinate to speech, urgency by timbre not volume, one-shots vs loops.
- EBU R 128 / streaming practice — −14 LUFS, −1 dBTP for delivered social video.
- Related: [[duration-table]], [[sound-palette]].
