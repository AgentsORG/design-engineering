---
title: sound-motion-sync
summary: Sound and motion are one event. The transient lands on the contact frame — the settle, not the start — and audio may lag by a frame but must never lead.
tags: [sound, motion, sync, audio, timing]
---

# Sound–motion sync

A sound that is off by two frames reads as *broken*, not as *slightly off*. Apple calls the principle *harmony*: things should feel the way they look and sound, and in software you have to build that agreement by hand because there is no physics doing it for you. The rule that produces harmony is simple: **the transient of the sound sits on the frame where the visual makes contact** — the card lands, the toggle seats, the wordmark appears — not on the frame where motion begins.

## The measured version

A 10.7 s logo reveal by sound designer bruno (@tvnxty, superfx.co) was analyzed frame-by-frame against its audio. Thirty-two audio onsets; every one of them within two frames (≤ 67 ms at 30 fps) of a visual motion peak, most within one. Where a fan of small cards shuffled, there was a cluster of ticks, one per card movement. Where the wordmark cut in, one hit, exactly on the cut frame. Where nothing moved, the track sat at −56 dBFS — real silence, not a bed.

That is what "synced precisely" means in practice: **sound density mirrors motion density**, and each transient is placed on a specific frame.

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

Place the file so its **transient**, not its first sample, lands on the contact frame; most library files carry a few frames of near-silence before the hit, and lining up the file start is why an effect that looks right still reads late. In Remotion that is `<Audio startFrom>` with the offset corrected for the file's pre-roll; in HyperFrames it is the clip's `data-start` on the settle frame. [[launch-video-sound]] has the full authoring pattern.

## When to apply

Every time a sound and an animation describe the same event. If they don't describe the same event, one of them should probably go — see [[sound-decision-framework]].

## Gotcha

Springs never settle at a clean frame — they overshoot and oscillate. Sync the sound to the *first* crossing of the rest position (the visual "contact"), not to the spring's mathematical end. Firing on `animationend` of a spring lands the sound 100–200 ms late.

## Sources

- Apple, *Designing Audio-Haptic Experiences* (WWDC19) — the harmony principle; "adding latency between visual and feedback completely breaks the illusion."
- ITU-R BT.1359-1, *Relative timing of sound and vision for broadcasting* — detectability +45/−125 ms, acceptability +90/−185 ms.
- bruno (@tvnxty), logo reveal for Base, 2026-09-03 — onset-vs-motion analysis by HKTITAN; see [[launch-video-sound]] for the sound map.
- Related: [[spring-animations]], [[responsive-feedback]].
