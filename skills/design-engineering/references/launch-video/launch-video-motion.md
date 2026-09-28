---
title: launch-video-motion
summary: Motion inside a launch-film shot — exponential settles sized to each move's travel, mirrored exits, cameras exempt, overshoot and velocity blur as registers with measured base rates, no decorative idle, and liveliness from creep, accelerating rhythm and causes that ignite their effects.
tags: [launch-video, motion, easing, springs, blur, rhythm]
---

# Launch-video motion

Inside a shot, things arrive on an exponential settle whose time constant is chosen per move — about 0.1-0.15 s for an object, ~0.43 s for Raycast's four-frame-height crane and 0.6-0.8 s for the two measured counters — and leave on the mirror curve. Nothing decorative moves on a UI object. Overshoot, velocity blur and camera drift are register choices with measured base rates, and a film reads as lively because of creep, accelerating rhythm and causes that ignite their effects, not because anything bounces. This is the 2.4.0 four-rule motion system, split out of [[launch-video-seams]] and corrected against 29 Skale films, 18 acclaimed films and HeyGen's source.

## Settle exponentially; size tau to the travel

Write the curves once and pass tau as a parameter:

```js
const TAU = 0.131;
const eo = (dur, tau = TAU) => (p) => (1 - Math.exp(-p * dur / tau)) / (1 - Math.exp(-dur / tau));
const ei = (dur, tau = TAU) => (p) => 1 - eo(dur, tau)(1 - p);
```

- **Objects, ~0.1-0.15 s.** HeyGen's 02-bouncy-ui declares tau 0.131 s in its header but never calls that constant: its moves pass their own, 0.04-0.18 s (median ~0.11 s; 0.135 for the flip, 0.168 for a growth). 01-ui-sting's `1 - 2^(-10p)` works out to ~0.146 s at its median 1.01 s tween. Skale's Replit Parallel Agents decays its opening slam word's drift ×0.78 per frame at 29.97 fps (tau 0.134 s), and Poke '7' whip-scrolls at tau 0.13-0.15 s both ways. 03-message-sting runs faster: it writes each move as `1 - 2^(-10t/T)` with settle times T of 0.12-0.53 s, a tau of 0.02-0.08 s.
- **Longer travel settles slower.** Raycast's crane covers ~4 frame heights with a half-life of ~0.3 s (tau ~0.43 s, n = 1), while Apple Liquid Glass's snap pull-back settles at tau ~0.2 s; the counters in Taste Labs and Contra Indy settle at tau 0.6-0.8 s (n = 2).
- **Shipped durations** over 2,064 HeyGen tweens: median 0.35 s (p25 0.20, p75 0.55); by ease, `power2.out` 0.26 s, `power3.out` 0.46, `expo.out` 0.50.
- **Exits by seam type**, not a fixed ratio: HeyGen's run 36-82 % of the entry (zoom exits 0.18-0.22 s against 0.5 s entries; cut-the-curve pairs 69-82 %). A mirrored letter-by-letter un-type can run as long as the entry or longer (Extend: 0.43 s in, 0.5 s out, ~116 %; n = 1). Inside a HyperFrames project, motion-doctrine's exit at ~75 % of the entry and the seam stamp's timings win.

GSAP's `expo.out` differs from `1 - 2^(-10p)` by at most 0.78 % of travel: it matters for exact mirrors and pixel replicas, not for feel.

## Cameras are the exception

A camera may run at constant velocity and be cut mid-drift. Linear Agent drifts 1.2-4 % of the frame per second on each axis, with identical displacement every 0.25 s and no ease at either end; Apple Liquid Glass's shots open mid-drift and accelerate to 1.26× by 400 ms. HeyGen's `none` ease (313 of 2,284 non-set tweens, median 0.85 s) is drifts and progress fills. Drive a camera from one progress channel and derive the rest: claude-design-send sets `scale = 1 + 0.48a` and `x = -(scale - 1) × 118`, pinned on the column the eye tracks, because a push and a pan on two eases read as two movements. A drift continues the entry vector. Never start a new pan or push in a scene's back half; product-launch-video's rule 3 bans even a slow one there, so inside a project keep creep to the entry's continuation. Never put a spring or back ease on a camera: the whole frame sways.

## Overshoot is a register

Visible overshoot appears in 4 of 29 Skale films (Replit Slides' liquid glyph, Replit Parallel Agents' tile tilt, Bevel's check mark, Contra x fal's trophy pill) and 3 of 18 acclaimed (Apple Liquid Glass's toggle swelling mid-travel, Claude Cowork's mark at ~2×, Notion 3.0's face). HyperFrames defaults an entrance to `power3.out` or a critically damped `springEase`, allows 0.80-0.85 damping for an iOS feel (~1-1.5 % overshoot) and 0.60-0.70 only when playful; motion-doctrine forbids bounce and elastic but allows `back.out(1.4-1.7)` on an entry; HeyGen's claude-paper frame law says settle, never bounce. The bouncy-sting register is 02-bouncy-ui: zeta 1/3 on three channels of one body, position 1.45 Hz, shape 1.88 Hz, rotation 2.5 Hz, the lighter channel ringing faster. HyperFrames calls damping under 0.55 cartoon wobble, so inside a project use zeta 1/3 only when the brief names the sting ([[hyperframes-reconciliation]]). As a GSAP ease windowed to end at rest:

```js
const spring = (dur, f = 1.45, z = 1 / 3) => (p) => {
  const u = p * dur, wd = 2 * Math.PI * f * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-2 * Math.PI * z * f * u) * Math.cos(wd * u) * (1 - p);
};
```

01-ui-sting's lockup rides one decaying sine, `A · e^(-t/0.279) · sin(2πt/0.5)` (2 Hz, zeta ~0.27), with the symbol on +A and the word on −A, so the two parts spring away from each other on landing and come to rest together; its endcard reuses the spring at a smaller amplitude.

## Blur

- **Derived for element moves.** It rides the move's own ease and peaks at peak speed. Size the peak to the subject: 10 px on text, 18-20 px on a full-frame surface. HeyGen's 481 blur targets cluster at 8 px (×64) and 20 px (×45); 207 resolve to 0. Blur the wrapper, never its children, and never blur and fade in one tween. CSS blur scales with transform: a raw 2 px reads as ~16 px at ×8.
- **Sharp is also a choice.** Velocity blur shows in only 9 of 29 Skale films and 6 of 18 acclaimed. Poke '7' whips ~20 % of frame height per frame completely crisp; Notion Mail snaps to ×2.4 in 5 frames with no blur.
- **Authored focus is a scene tool.** Arrive defocused and sharpen in 4-8 frames (9 Skale films: the Poke anthology, Taste Labs, Replit Canvas, Adaline, Bevel, Poke '7', Contra Indy, Contra x fal, Conduit), or resolve rows from blur ~0.25 s apart (Linear Agent). The rack-focus cut lives in [[launch-video-cuts]].

## Stamp decisions, ease curves

Glyph flipbooks, typed runs, odometer digits, clicks and highlight hops are per-frame sets; slides, scales and settles are tweens. Never tween a decision; it reads as a smear. `tl.set` is 1,162 of HeyGen's 3,446 calls, a third, and 10 of 18 acclaimed films stamp single-frame decisions: Granola 2.0 swaps pages in one 60 fps frame every ~1.0-1.15 s; Raycast hops its selection one click at a time over one S-curve pan. The sound sits on the stamps ([[sound-from-motion]]).

## Holds

No float, pulse or breathe on a UI object: none of the 18 acclaimed films and no Skale film does it, and motion-doctrine treats a scene that finishes entering early as missing story, not missing wobble. A hold may carry a slow camera push or drift (10 of 29 Skale films, among them T:0, Bud, all three Replit films and Conduit; drift or creep in 10 of 18 acclaimed); HeyGen keeps it on the entry vector. It may also carry status motion only while the system works (Claude Cowork drifts 18-50 px/s on the agent's turn, under 10 px in 2.5 s on the user's), ambient brand light, or a living background plate that never stops (one linear master tween) and makes its big shift ~0.1 s before each scene change (HeyGen's inspector-launch). HyperFrames' product-launch-video would rather hold still with a small jitter; inside a project keep jitter off UI objects and creep only as the entry's continuation ([[hyperframes-reconciliation]]). Test: pause anywhere; something meaningful is mid-flight, or the frame is a deliberate hold.

## Rhythm and causes

A montage runs legible, then accelerating, then a blur zone, and snaps to a hold: timeline-launch's prompt firehose steps 3 prompts at 0.42 s, 6 at 0.17 s and ~20 at 0.07 s while blur ramps 0 → 2 px, then snaps off on the hold. Before a climax, hold 0.3-0.75 s of stillness, the picture half of the pre-reveal subtraction in [[launch-video-sound]]. A cause visibly launches its effect: click, squash, release, flight, impact. Inside a HyperFrames project each effect starts on its causing frame (motion-doctrine's causal motion); outside one, a click may let its press read first ([[launch-video-ui-demo]]). Anticipation, freeze, release is the strongest form; HeyGen's liquid pop builds pressure on `power3.in` (scaleX 1 → 1.1, scaleY 1 → 0.78), freezes everything for 0.4 s, then ruptures on `power4.in` in 0.2 s. Cursor mechanics also live in that UI-demo node; cut cadence belongs to [[launch-video-cuts]], stagger cadence to [[launch-video-type]].

## When to apply

Every shot of a launch film, sting or README film. UI-scale springs stay in [[spring-animations]] and UI easing in [[easing-curves]]; inside a HyperFrames project the seam stamp's eases and exit timings win, and [[hyperframes-reconciliation]] settles overshoot, blur and hold motion.

## Gotcha

A spring on every arrival reads as a toy, and a breathe loop on a held card reads as the video waiting. The films called lively are lively because the camera creeps, the rhythm accelerates and every cause visibly launches its effect; bounce is not what makes them lively.

## Sources

- HeyGen, *hyperframes-launches* (Apache-2.0): `heygen-apple-motion/02-bouncy-ui/index.html` L92-128, L474-480 (per-move taus L450-822); `01-ui-sting/index.html` L283-291, L356-361, L496-505; `03-message-sting/index.html` L332-434; `claude-paper-launch/FRAME-claude.md` L469-470, L619; `claude-design-send-hyperframes-launch/HANDOFF.md` §12.1; `timeline-launch/compositions/act2b-spiral.html` L306-380; `inspector-launch/DESIGN.md` "Motion Rules" and `index.html` L2433-2437, L2634-2644; `liquid-brand-refraction/js/liquid-pop-v2.js` L445-525. Tween census by HKTITAN (147 de-duplicated composition files, 3,446 calls; blur targets and per-ease medians over all 161 composition files): `heygen_corpus_stats.py` and `tables/heygen.md` in `docs/research/launch-films/`.
- heygen-com/hyperframes (Apache-2.0): `.agents/skills/motion-doctrine/SKILL.md` (causal motion, no idle wobble, stillness before climax, timing intents) and `.agents/skills/cut-the-curve/SKILL.md` (Blur logic), repo-internal and not installed by `npx skills add`; `skills/product-launch-video/references/motion-language.md` (rule 3); `skills/hyperframes-animation/adapters/gsap-easing-and-stagger.md` (Spring Eases), `rules/spring-pop-entrance.md`, `rules/3d-camera-flight.md`.
- Skale (skale.solutions/portfolio) films by client, and the acclaimed films (Linear Agent, Raycast, Apple Liquid Glass, Claude Cowork, Notion Mail, Notion 3.0, Granola 2.0), measured by HKTITAN 2026-09-28: `docs/research/launch-films/` (`notes/synthesis-skale.md`, `notes/synthesis-acclaimed.md`, `metrics/`).
