---
title: web-haptics-reconciliation
summary: web-haptics ships its own agent skill. It owns the install, the trigger API and the presets; this graph owns whether a moment gets a haptic at all, its timing against motion and sound, and the device check. Six conflicts settled — no haptic on every primary button or on a modal opening, never the buzz preset, one settings toggle beside the sound mute, async results checked on a real iPhone.
tags: [sound, haptics, companion, reconciliation, lochie]
---

# web-haptics, reconciled

Lochie Axon's web-haptics package ships a `SKILL.md` of its own (installed as `web-haptics`). When it is installed, it owns the mechanics: `npm i web-haptics`, the React / Vue / Svelte / vanilla entry points (`useWebHaptics`, `createWebHaptics`, `new WebHaptics()`), `trigger(preset)`, `cancel()`, `destroy()`, and the preset values in [[haptic-feedback]]. Its own instruction to ask the user which elements to target, and whether at the shared component or the call site, stands: ask once, prefer the shared component.

This graph owns the decision and the craft around it: [[sound-decision-framework]] (does this moment earn feedback), [[sound-motion-sync]] (which frame), [[pov]] (restraint), and [[ship-check]] (what needs a device).

## Conflicts, settled

| Its rule | This graph | Why |
|---|---|---|
| Primary button tap = medium, secondary = light | A plain press gets no haptic; one that **commits** something (pay, send, delete after confirm) gets one, on the result | Its own anti-pattern list warns against a haptic on every tap; iOS system buttons don't tap back either |
| Modal appear = medium | No haptic for a modal, sheet or menu opening, unless a long press opened it (then heavy, on the open frame) | An appearing surface is not a collision; the visual already says it |
| `buzz` preset, 1000ms at full strength | Never in product UI; demos and games only | Its own rules call long continuous vibration an anti-pattern: web haptics are brief transient pulses |
| No feature detection needed: it no-ops where unsupported | True for code paths, but the design still needs the visual and, where used, the sound to carry the moment alone | Most devices that load the page can't vibrate |
| No user setting | One "Sounds and haptics" toggle in settings, persisted, beside the sound mute ([[sound-playback-web]]); its `showSwitch` is a debug control, not that toggle | The web can't read the phone's own haptics setting |
| Fire on the async result | Agreed, and check the delayed tick on a real iPhone: the switch fallback only promises the tick that fires inside the gesture | A result that arrives after an `await` is outside it |

Where a sound fires too, the haptic and the sound start on the same frame and describe the same event: a heavy impact under a soft pop reads as two things happening ([[sound-palette]]).

## Without the companion

Use `navigator.vibrate` with the patterns in [[haptic-feedback]] for Android only, and say that iOS Safari needs the switch technique the library implements. Write no more than that by hand: it is a few hundred lines of measured fallback, the [[dependency-discipline]] case for a library.

## Sources

- Lochie Axon, web-haptics 0.0.6 (MIT, github.com/lochie/web-haptics, HEAD `7904ed1`, read 2026-11-08): `SKILL.md` (trigger types, the HIG-derived rules, the interaction table, anti-patterns), `packages/web-haptics/src/lib/web-haptics/index.ts`, `patterns.ts`. Paraphrased.
- AgentsORG — the settlements, from this graph's sound cluster and [[pov]].
