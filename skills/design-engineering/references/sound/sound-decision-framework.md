---
title: sound-decision-framework
summary: Should this make a sound at all? Frequency first, then purpose, then the 100th-use test. The default answer is no — and the exceptions are specific.
tags: [sound, decision, delight, audio]
---

# Sound decision framework

The default is silence. A sound has to earn its place harder than an animation does, because a user can look away from motion but cannot un-hear a chime — and the web offers no system setting that turns your sounds off the way `prefers-reduced-motion` turns motion down. Read this before generating, downloading, or synthesizing anything.

## The decision tree

1. **How often will the user hear it?** Sound sits one notch *stricter* than the [[delight-impact-curve]]. Every keystroke, every scroll, every hover: **never**. Every primary action (click, select, toggle): **no, unless the product is explicitly tactile** — a wallet, a game, a hardware companion. Daily moments (send, save, complete): **maybe, one short sound**. Rare milestones (first payment, onboarding done): **yes, this is where the budget goes**.
2. **What is it for?** Apple's audio-haptic principle is *utility*: add feedback only where it communicates something the eye may miss. Valid purposes:
   - **Confirmation when attention is elsewhere** — a message sent while the user has already started typing the next one; a recording that started.
   - **State change that has no visual** — a background upload finishing on another tab; a timer ending.
   - **Physicality** the product is built around — a card snapping into a slot, a crown click.
   - **Brand moments** on marketing surfaces and launch videos, where sound *is* the medium. See [[launch-video-sound]].

   Invalid: decoration, "because the animation has no sound", filling the silence of a slow request, or copying a competitor's ping.
3. **Does it survive the 100th use?** Apple's test from *Designing Audio-Haptic Experiences*: imagine the sound on first use, then on the hundredth. If it would make you reach for the mute, cut it or make it smaller. Hugo Verweij's notification "Rebound" was tuned to be *tolerable at frequency* — that is the bar.
4. **Is there a visual equivalent?** Sound reinforces; it never carries information alone. If the sound is the only signal, the design is broken for the muted majority. See [[sound-playback-web]].
5. **Can the user turn it off, and is it off by default?** Product UI sound ships off with a discoverable toggle. Users who turn it on become attached; users who cannot turn it off uninstall.

## What passes, concretely

| Moment | Sound? | Why |
|---|---|---|
| Typing, scrolling, hover | No | Frequency. The keyboard never gets sound. |
| Button press | No (default) | A press already has visual and haptic feedback; sound here reads as a toy. |
| Toggle in a tactile product | Small tick, ≤ 80 ms | Physicality is the product's premise. |
| Message sent, file saved | One short tone, ≤ 250 ms, opt-in | Confirmation when attention has moved on. |
| Error on submit | Low, short, falling | Attention is needed and the eye may be elsewhere. Pair with [[multi-segment-shake]]. |
| Payment complete, onboarding done | A designed two- or three-note figure | Rare. Earned. |
| Notification while the tab is hidden | Yes, once, respect OS focus modes | The whole point of a notification. |

## When to apply

Any time someone says "let's add a sound", "it needs a satisfying click", or "the OpenAI video has that nice tick". Ask how often, for what, and whether it survives the 100th time. Then, if it passes, go to [[sound-palette]] to design it and [[sound-motion-sync]] to place it.

## Gotcha

The 100th-use test is asymmetric. A sound that is *slightly* too loud or too long is annoying on the tenth use; a sound that is slightly too quiet or too short is never noticed as a flaw. When in doubt, halve the length and drop 3 dB — the same instinct as "if unsure, halve it" in [[duration-table]].

## Sources

- Apple, *Designing Audio-Haptic Experiences* (WWDC19, Hugo Verweij & Camille Moussette) — the utility principle and the first-vs-hundredth-use test.
- Benji Taylor — [[delight-impact-curve]]; Family plays "a satisfying sound effect" on completing a trash action, not on every tap.
- Josh Comeau, *use-sound* announcement — sound is rare on the web and therefore impactful; ship a mute toggle.
- Material Design, *Applying sound to UI* — "silence is an important part of the experience."
- Related: [[animation-decision-framework]], [[interaction-personality]].
