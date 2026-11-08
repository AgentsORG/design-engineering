---
title: haptic-feedback
summary: Haptics on the mobile web — a brief pulse that is the physical consequence of an action, fired on the same frame as its visual change, matched in weight to what happened, and never the only feedback. Three families (notification, impact, selection) with measured patterns; how intensity is faked on Android and how iOS Safari is reached at all; what to test on a real phone. From Lochie Axon's web-haptics.
tags: [sound, haptics, mobile, touch, feedback, vibration, lochie]
---

# Haptic feedback on the web

Haptics are the third channel of feedback, beside what is seen and heard, and the one most web apps never use. Apple's audio-haptic principles apply unchanged ([[sound-decision-framework]]): a haptic must be *caused* by the user, *in harmony* with the visual and any sound, and *useful*, telling them something the eye may miss. A phone that taps back when a payment confirms feels native; one that buzzes on every scroll gets the site muted.

## Three families

| Family | Use for | Pattern (web-haptics presets) |
|---|---|---|
| Notification | The outcome of a task | success: 30ms at 0.5, then 40ms at 1 after 60ms (rising). warning: 40ms at 0.8, then 40ms at 0.6 after 100ms (a hesitation). error: four 40–50ms taps 40ms apart (harsh) |
| Impact | A physical collision: a snap, a drop, a landing | light 15ms at 0.4; medium 25ms at 0.7; heavy 35ms at 1; rigid 10ms at 1 (crisp); soft 40ms at 0.5 (cushioned) |
| Selection | A discrete step: picker detent, slider tick, segment switch | 8ms at 0.3 |

Weight follows significance. A toggle is light, a drag that snaps into place is medium, a long press that opens a menu is heavy, and a picker wheel ticks at selection weight on every detent. Conventions hold: success is only for success, error only for a failure, so a cancel never fires error.

## When it fires

- **On the same frame as the visual change.** The switch thumb lands, the card snaps, the tick mark passes: that frame, not on pointerdown and not after a transition ends ([[sound-motion-sync]]).
- **For async work, when the result arrives**, with the visual state that shows it: success after the request resolves, error when it fails. Never on submit.
- **At a threshold, once.** Pull-to-refresh and swipe-to-dismiss tap lightly the moment the gesture crosses the point of commitment, and not again while the finger hovers past it.
- **Never on page load, passive scroll, a timer, or something the user didn't do.** And never as the only feedback: most laptops and many phones cannot vibrate, and some users turn it off.

## How the web gets there

- **Android Chrome** has `navigator.vibrate`, which is on/off only. web-haptics fakes intensity by pulse-width modulation: in each 20ms cycle the motor is on for intensity × 20ms. Vibrations are capped at 1000ms.
- **iOS Safari has no Vibration API.** web-haptics reaches the Taptic Engine through Safari's native switch control: a hidden `<input type="checkbox" switch>` toggled through its label ticks the system haptic, and intensity becomes the toggle rate, from every 16ms at full strength to about 200ms at zero. The first tick must fire synchronously inside the user's gesture; it depends on Safari behaviour Apple doesn't document, so test it on the current iOS.
- **Desktop** does nothing. For auditioning patterns there, the library's debug mode plays each tick as a 4ms band-passed noise click pitched by intensity.

## Gotcha

Haptics can't be tested in a desktop browser or by emulating a phone: an emulated touch device still has no motor. Check every pattern on a real Android phone and a real iPhone, with the phone in a hand, not on a desk: a desk turns a light tap into a rattle. List what you could not test as "needs a device" ([[ship-check]]).

## Sources

- Lochie Axon, web-haptics 0.0.6 (MIT, github.com/lochie/web-haptics, HEAD `7904ed1`, read 2026-11-08; haptics.lochie.me): `packages/web-haptics/src/lib/web-haptics/patterns.ts` (the presets), `index.ts` (PWM, the switch fallback, the debug click), `SKILL.md`, `site/public/llms.txt`. Paraphrased; values cited. Where its own rules and this graph's differ: [[web-haptics-reconciliation]].
- Apple, *Designing Audio-Haptic Experiences* (WWDC19) and HIG *Playing haptics* — causality, harmony, utility; the three feedback-generator families the presets are named after.
- Related: [[react-native-motion]] (haptics in native apps), [[touch-and-focus]], [[mobile-platform-layer]], [[sound-playback-web]] (one settings toggle for sound and haptics).
