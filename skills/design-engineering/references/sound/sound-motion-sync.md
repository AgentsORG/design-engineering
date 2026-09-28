---
title: sound-motion-sync
summary: "Sound and motion are one event: transients on contact frames, cuts on onsets; audio may lag a frame, never lead."
tags: [sound, motion, sync, audio, timing, launch-video]
---

# Sound–motion sync

A sound that arrives two frames *early* reads as *broken*, not as *slightly off*. Apple calls the principle *harmony*: things should feel the way they look and sound, and in software you have to build that agreement by hand because there is no physics doing it for you. The rule that produces harmony is simple: **the transient of the sound sits on the frame where the visual makes contact** — the card lands, the toggle seats, the wordmark appears — not on the frame where motion begins.

## The measured version

A 10.7 s logo reveal by sound designer bruno (@tvnxty, superfx.co) was analyzed frame-by-frame against its audio. Thirty-two audio onsets; every one of them within two frames (≤ 67 ms at 30 fps) of a visual motion peak, most within one. Where a fan of small cards shuffled, there was a cluster of ticks, one per card movement. Where the wordmark cut in, one hit, exactly on the cut frame. Where nothing moved, the track sat at −56 dBFS — real silence, not a bed. That is what "synced precisely" means in practice: **sound density mirrors motion density**, and each transient is placed on a specific frame.

## Tolerances

ITU-R BT.1359 gives the human thresholds for sound-vs-picture timing:

| | Audio leads video | Audio lags video |
|---|---|---|
| Detectable | +45 ms | −125 ms |
| Acceptable | +90 ms | −185 ms |

The asymmetry is the instruction. We tolerate sound arriving *after* the visual (it is how the physical world works: light is faster) but notice sound arriving *before* it almost immediately. So:

- **Never let the sound lead.** If the audio pipeline has latency you cannot remove, trigger the sound from the animation's *start* only when the animation is shorter than that latency.
- **Aim for 0–30 ms of lag.** One frame at 30 fps. Beyond ~45 ms lag on a short, sharp visual (a snap, a click) it begins to feel like an echo.
- **Long sounds sit on the settle.** A whoosh peaks at the moment the element stops, so its attack starts *before* the settle and its loudest point lands on it.

HyperFrames' motion-graphics director lets beats be anticipated by ~0.1 s for perceived sync. Read it as a visual accent landing before a musical beat, inside the −125 ms lag threshold. For a sharp contact sound (click, snap, hit) the 0–30 ms target above wins, and the sound never leads ([[hyperframes-reconciliation]]).

## In UI code

Trigger from the same event that starts the state change, and use the animation's own timing to place the transient on the settle when the sound is meant to confirm rather than accompany:

```ts
// Sound confirms the landing, so it fires at the end of the enter transition.
el.addEventListener("transitionend", (e) => {
  if (e.propertyName === "transform") play("land");
}, { once: true });

// A tick that accompanies a toggle fires with the state change itself.
toggle.addEventListener("change", () => play("tick"));
```

Trim leading silence to zero on every file so `play()` and the transient are the same instant — see [[sound-spec]]. Preload and decode before the interaction so there is no fetch in the path — see [[sound-playback-web]].

## In a video timeline

Place the file so its **transient**, not its first sample, lands on the contact frame, and measure where that transient is instead of trusting the waveform: the onset is the first sample above 5 % of peak (a placement measurement; [[sound-spec]]'s −60 dBFS trim removes digital silence but not a noisy lead-in, so trim to just before this onset). ffmpeg's `silencedetect`, with its 2 s default minimum, reports no leading silence on these files at all. HeyGen audited the SFX files reused across its launch projects this way and found a click that starts 158 ms late (~4 frames at 24 fps, ~5 at figma-launch's 30, where it fires on all seven cursor clicks) and typing files ~394 ms late (~9 frames at 24 fps).

Trim the lead-in, or reject the file as HeyGen did with both late ones, and cue clicks from the cursor's press tween, never the release. HeyGen cues each click at the tween's start (scale to 0.90 over 0.1 s, `power2.in`; 0.84 is its more common press, see [[launch-video-ui-demo]]), and in the render all seven land within +0.45 frame of their cue (~19 ms: AAC encoder delay plus envelope granularity). That check proves the pipeline, not the sync: the visible contact is where the press bottoms out, 0.1 s later, so put the transient there. In Remotion, place with `<Sequence from>` and skip any lead-in left with `<Audio trimBefore>` (formerly `startFrom`). In HyperFrames, place with the root clip's `data-start` (sub-composition start plus the local press time) and skip the lead-in with `data-media-start`. [[launch-video-sound]] picks the register the clips belong to.

A hard cut is a contact too: put it on the onset frame. Skale's Bud (listed as Buds) puts three hard cuts 4 frames after strong onsets, so the sound leads the picture by ~0.13-0.14 s, past even the +90 ms acceptability limit. Which cuts lock to a track, and how tightly, is [[launch-video-music]]'s call.

## When to apply

Every time a sound and an animation describe the same event. If they don't describe the same event, one of them should probably go — see [[sound-decision-framework]].

## Gotcha

Springs never settle at a clean frame — they overshoot and oscillate. Sync the sound to the *first* crossing of the rest position (the visual "contact"), not to the spring's mathematical end. Firing on `animationend` of a spring lands the sound late by the whole oscillating tail, which grows as damping drops ([[spring-animations]]).

## Sources

- Apple, *Designing Audio-Haptic Experiences* (WWDC19) — the harmony principle, and the warning that added latency between a visual and its feedback breaks the effect.
- ITU-R BT.1359-1, *Relative timing of sound and vision for broadcasting* — detectability +45/−125 ms, acceptability +90/−185 ms.
- bruno (@tvnxty), logo reveal for Base, 2026-09-03 — onset-vs-motion analysis by HKTITAN; see [[launch-video-sound]] for the sound map.
- HeyGen, *hyperframes-launches* (Apache-2.0) — the onset audit, root-absolute placement and render check in `claude-design-send-hyperframes-launch/HANDOFF.md` §18; the click cued at the press tween's start in its `compositions/s1-square.html` L373 and `index.html` L36; the 158 ms click on seven cues in `figma-launch/index.html` L76-82. heygen-com/hyperframes, `skills/motion-graphics/agents/director.md` — beats anticipated by ~0.1 s; `skills/hyperframes-core/references/data-attributes.md` — `data-media-start` as the offset into the source.
- Skale's Bud (listed as Buds; skale.solutions/portfolio) — cut-vs-onset timing measured by HKTITAN 2026-09-28; data in `docs/research/launch-films/` (metrics/09-buds.json, notes/synthesis-skale.md).
- Related: [[spring-animations]], [[responsive-feedback]], [[launch-video-music]].
