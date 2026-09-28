---
title: launch-video-music
summary: Place a music track or a voice on a launch film's picture — the drop on the reveal, breakdowns under anything read, locked cuts on the onset frame, and the voice as the clock with the bed 10-13 dB under it.
tags: [sound, launch-video, music, voice-over, sync]
---

# Launch-video music

A music track is placed by the picture's structure, not laid under it. Trim its head so the drop lands on the reveal, break the beat down under anything the viewer must read, and lock only chosen events to the grid, on the onset frame. Under a voice, the voice is the clock and the bed sits 10-13 dB below it in loudness. This node holds registers C (beat track) and D (voice-led) of [[launch-video-sound]] and loads only when a film carries a track or a voice. It is the structural form of [[sound-from-motion]]: there the motion sets each click; here the picture decides where the track's drop, gaps and swells go.

## Put the drop on the reveal

In 12 of Skale's 18 music films the first drop lands on a reveal: the brand or title in 11 (Aside, Listen Labs, Bud, Replit Slides, Replit Parallel Agents, Bevel, Poke '7', MadeThis, Agent Arcade, Work Louder, Contra x fal), the thesis word in Contra Indy. It usually follows a riser, a withheld sub or ~0.3 s of rest (Bud). Bud drops at 1.95 s, Replit Slides at 8.20 s, Bevel at 7.84 s. The medians, and when the name lands, are in [[launch-video-structure]]; the gap before the reveal is in [[launch-video-sound]].

In 10 of 18 acclaimed films the low end arrives on the first reveal, usually after an intro with no sub:

- Granola 2.0: the sub rises from -40.6 to -7.5 dB between 5.25 and 5.75 s as the first title settles.
- Claude Opus 4.6: the sub sits at -45 to -58 dB through the 3 s hook and comes in on the first cut to a person.
- Figma Motion: no sub for 3.3 s; beat and sub enter at 3.5 s on the UI reveal.
- Arc on Windows: a riser, ~100 ms of near-silence, then +31 dB of sub 4 frames after the cut, as the first product frame fades up from dark.

## Move the track, not the picture

Find the drop's time in the file, then offset the file so the drop plays on the reveal frame. Prefer moving the track over retiming scenes to reach a drop. HeyGen's website-to-hyperframes cut 3 s from the track's head so its drop at file time 15 s opens act 3 at 12.0 s. In a hand-authored HyperFrames composition the offset is `data-media-start`: file time t plays at `data-start + t - data-media-start`. A drop 15.0 s into the file, a reveal at 8.0 s, the clip starting at 0:

```html
<audio id="music" src="track.mp3" data-start="0" data-media-start="7" data-duration="45" data-track-index="1"></audio>
```

In a product-launch-video project, assemble-index.mjs rewrites the bed with `data-start="0"` and no offset on every rebuild, including Step 6 rework, so a hand-added `data-media-start` is lost: trim the file's head instead, as Step 5's music check does and as website-to-hyperframes shipped. Keep the `id`: an `<audio>` without one never reaches the mixer and renders silent. Check that the offset plus the film's length still fits inside the file.

Keep a beat map of `{time, strength}` beside the timeline. HeyGen's spacex-launch map holds 310 beats (median inter-onset 0.32 s). 2 of its 5 root seams sit within 4 ms of mapped beats (strengths 0.78 and 0.85, map median 0.81); in that stretch after the drop, a random time lands within ±10 ms of such a beat ~4.5 % of the time.

## Break down under reading

The beat thins or the sub leaves under anything the viewer must read:

- Typing: Bud, Replit Slides, Replit Canvas.
- Headline cards: Replit Canvas gates its sub in half-second chunks.
- A diagram: Material 3 Expressive pulls the sub at 10.5-12.9 s and brings it back at 13.5 s at -7.2 dB RMS.
- The thesis: Google AI Mode runs a 7 s breakdown with no sub.
- A premium tier: the Google Gemini app drops the sub more than 30 dB for 5 s while the mids continue.
- A precise edit: Figma Motion takes the sub from ~50 % of the mix to 1-3 % for 0.5-0.8 s.

## Lock only what you choose

7 of 18 acclaimed films lock picture to the track; 6 cut at chance (Cursor 2.0 lands 5 of 20 cuts on hits, Material 3 Expressive 0 of 19). The ones that lock pick one layer. Framer 3.0 locks act seams, within 15 ms and at the same bar position. Spline Hana, a sizzle, locks the eighth grid: 5 of its first 8 cuts fall within ±31 ms at 130 bpm. Figma glass times shot length to the phrase rather than cuts to an onset: four 8-beat shots of 3.8 s, each cut within 0-190 ms of a sustained 808 sub note, then three ~1.8 s shots whose cuts drift ~0.4 s off it into the logo.

A locked cut sits on the onset frame. Against a transient the picture may anticipate a beat by ~0.1 s, but the transient never leads: Bud's three cuts 4 frames after strong onsets read late ([[sound-motion-sync]] has the tolerances). Figma glass's looser offsets work only because a sustained sub has no attack to miss. Cutting on the track's rests works too: Poke '7' puts four cuts within 0-2 frames of a sub dropout.

## The track carries the pops

Skale's music films show no UI-click layer: the three checked by ear (Bud, Poke '7', Bolt) have none, and across all 18 a median of only 1.8 % of energy sits above 2 kHz. That band share cannot see foley at 1.45-2.5 kHz, where Linear Agent and Raycast put theirs, so read it as no evidence of clicks, not proof. Do not sprinkle library blips over a beat track. Clicks derived from the motion ([[sound-from-motion]]) belong to registers A, B and E.

## Under a voice, the voice is the clock

In Skale's 10 voice-led films the bed sits 10-13 dB under the voice (register D in [[launch-video-sound]]). That is a loudness gap measured on finished films, not a gain. HeyGen sets music at 0.13 (spacex-launch) and 0.11 (website-to-hyperframes) against the voice at 1.0, and product-launch-video's default bed is 0.12: all ~-18 to -19 dB of gain, and the gap they produce depends on the track. The website-to-hyperframes storyboard planned the bed 20 dB under the act-1 voice and full on the drop, but the shipped index.html keeps one flat 0.11 and relies on the 3 s trim alone.

In HyperFrames, make the gap with hyperframes-audio's carve.mjs, which is required under any voice: it writes the carve, effect chain and automation lanes, and media volume is never tweened. Then measure the voice-to-bed gap on the render, lower the carve strength if the bed sinks well past 13 dB, and raise it if the gap closes under 10 dB.

- Leave silence right before key lines. Taste Labs holds 0.9 s at -42 dB before the founder names the raise and 0.35 s before the close; Browserbase leaves 0.3 s before the founder appears. After the voice ends, land one low swell on the final wordmark (Conduit, Extend). A track's drop goes in such a gap too. With the scenes already timed to the voice ([[launch-video-sound]]'s recipe), trim the track's head so the drop's attack falls between lines, on a reveal or an act change. website-to-hyperframes ends its act-1 voice at 10.5 s, drops at 12.0 s as act 3 opens, and starts the next line at 12.2 s.
- A move lands on the spoken onset, so its tween starts one duration earlier. HF-heygen-stripe's rotary drum ends each of its three 0.35 s `power3.inOut` turns on a spoken onset (+1.47, +2.22, +3.14 s); the first verb, at +0.55 s, is already in place.
- Take onsets from silence detection with a short minimum duration (silencedetect's 2 s default misses word gaps), not from ASR word-end times, which run into the pauses. Keep a cue ledger of `{time, label, text}` beside the timeline.
- A regenerated voice re-opens every seam it touches: re-time the scenes to the new onsets rather than rushing a read to fit a slot.

## When to apply

Any film with a licensed, retrieved or generated track, or a voice-over. HyperFrames' product-launch-video retrieves a stock bed by mood and lays it flat from 0 s ([[hyperframes-reconciliation]]), trimming only a weak opening; this node is how to place that bed. Loudness targets by register live in [[launch-video-sound]].

## Gotcha

A flat 0.12 bed started at 0 s is the unstructured bed, however good the track; if nothing in it can go on the reveal, fall back to register B or A ([[launch-video-sound]]). A cut a few frames off a strong onset reads as a miss, as Bud's do. Lock one chosen layer (act seams, phrases or the eighth grid) on the onset frame, or lock nothing. Cutting at chance is fine once the drop and gaps are placed.

## Sources

- Skale (skale.solutions/portfolio): drop timings, sub dropouts, voice-bed levels and cut-onset offsets hand-timed by HKTITAN 2026-09-28 (films named above). Data in docs/research/launch-films/ (notes/synthesis-skale.md, tables/).
- Granola 2.0 (2025), Arc on Windows (The Browser Company, 2024), Claude Opus 4.6 (Anthropic, 2026, BUCK per brief), Figma Motion (2026), Material 3 Expressive (Google Design, 2025), Google AI Mode (2025, Ordinary Folk, inferred), Google Gemini app (2024, Ordinary Folk), Figma glass (2025), Spline Hana (2025), Framer 3.0 (2026, maker uncredited), Cursor 2.0 (2025): measured by HKTITAN 2026-09-28; docs/research/launch-films/notes/synthesis-acclaimed.md.
- HeyGen, hyperframes-launches (Apache-2.0): website-to-hyperframes/README.md (Credits: the 3 s trim), index.html L197-257 (the flat 0.11 bed), STORYBOARD.md L6 and L533-546 (the planned ducking; superseded by index.html); spacex-launch/beats/launch-music-trimmed.mp3.json and index.html; HF-heygen-stripe/compositions/rotary.html L60-85 and HANDOFF-V7.md §4; frame-md-launch-storyboard/assets/vo-timing-cues.json.
- heygen-com/hyperframes (Apache-2.0): skills/product-launch-video/SKILL.md Step 3.1 (bed by mood) and Step 5 (the music check), scripts/lib/bgm-volume.mjs and scripts/assemble-index.mjs (the bed stamp); skills/hyperframes-audio/SKILL.md (Voiceover carve) and skills/hyperframes/references/production-loop.md (Audio stage); skills/hyperframes-animation/adapters/gsap.md (no volume tweens); skills/hyperframes-core/SKILL.md (media ids) and references/tracks-and-clips.md (`data-media-start`); skills/motion-graphics/agents/director.md (beat anticipation); .agents/skills/motion-doctrine/SKILL.md (audio is the clock; repo-internal, not installed by `npx skills add`).
- Related: [[launch-video-sound]], [[sound-motion-sync]], [[launch-video-structure]].
