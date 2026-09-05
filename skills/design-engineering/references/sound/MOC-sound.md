---
title: MOC-sound
summary: When an interface should make a sound, how to design a family of sounds that belong together, how to sync them to motion, and how to generate them — ElevenLabs on demand, or open-weight and CC0 without a key.
tags: [moc, sound, audio, launch-video]
---

# MOC — Sound

Sound is the sense the web forgot. That makes it the highest-leverage polish move left — and the easiest one to get wrong, because a bad sound is worse than no sound and users remember it. Read [[sound-decision-framework]] first; it says *no* most of the time. The rest of the cluster is for the moments that earn a sound.

Two surfaces share this cluster and have opposite defaults. **Product UI** is silent by default, opt-in, rare, and tiny. A **launch video** is the reverse: sound is the emotional layer, and silence is a material you place deliberately. [[launch-video-sound]] owns the second; everything else defaults to the first.

## Decision-first nodes (read before making a sound)

- [[sound-decision-framework]] — Should this make a sound at all? Frequency, purpose, and the 1st-vs-100th-use test. Extends [[delight-impact-curve]] and [[animation-decision-framework]].
- [[sound-motion-sync]] — Sound and motion are one event. The transient lands on the contact frame, never before it. Measured tolerances.

## Design nodes (read while designing the family)

- [[sound-palette]] — A product gets one material and a handful of sounds that share it. Size → pitch, direction → meaning, consonance → success, dissonance → error.
- [[sound-spec]] — The numbers: duration by category, loudness in LUFS, mono, 44.1 kHz, zero leading silence, peak headroom.

## Implementation nodes

- [[sound-playback-web]] — Unlock the AudioContext on the first gesture, decode once, one source node per play, persisted mute toggle, never sound-only information.

## Generation nodes

- [[sound-generation-elevenlabs]] — On-demand generation for installers with an `ELEVENLABS_API_KEY`: the prompt formula, high `prompt_influence` for functional sounds, one session per family, post-processing.
- [[sound-generation-open-source]] — No key: open-weight models (Stable Audio 3 Small-SFX runs on CPU), procedural synthesis (ZzFX, Web Audio), and CC0 libraries (Kenney, soundcn, Freesound). A decision table for which.

## Launch-video register

- [[launch-video-sound]] — The OpenAI / Studio Dumbar register and a measured sound map of a bruno (@tvnxty) logo reveal: sound density mirrors motion density, holds are true silence, small things tick high and short, big things land low and long.

## Shipped tooling

`scripts/sound-family.mjs` (next to this skill's `SKILL.md`) turns one family manifest into a normalized set of files — ElevenLabs when a key is present, a dependency-free synthesizer when it is not. Spawn [[sound-designer]] when the job is the whole workflow rather than one question.

## Cross-cluster

- [[interaction-personality]] names sound as a personality lever; this cluster is where it goes deeper.
- [[prefers-reduced-motion]] has no audio twin in CSS — [[sound-playback-web]] explains why you treat the mute toggle as that twin.
- [[ai-default-tells]] carries the sound rows: stock library sounds, a beep on every click, a whoosh on every transition.
- [[review-checklist]] rows 12–13 are the sound gate for any UI review.
