---
title: launch-video-cuts
summary: Launch films cut (Skale's UI films 4 a minute, acclaimed in-house or uncredited films 15.6, beat-cut sizzles 31). The craft is where the cut lands (on a cause, on a constant ground, on the element being read, inside a fill), plus the two cuts that fail in every register (the dead cut, and a crossfade whose midpoint exposes a different ground).
tags: [launch-video, cuts, editing, crossfade]
---

# Launch-video cuts

A launch film cuts. How often it cuts belongs to its register, not to its quality. A good hard cut is taken on motion, on a visible cause, on a ground that does not change or on the element being read, so the eye takes it as a camera move and not as a new scene. Two cuts fail in every register. One is the **dead cut**: a settled frame followed by a scene that waits, where the outgoing scene is not moving on the cut frame and the incoming frame does not act within ~0.3-0.4 s. The other is a **crossfade whose midpoint shows a ground that differs from both scenes**. When the scene change is a morph, a dock or a fill, [[launch-video-seams]] covers what carries the eye across it.

## Rates

Counted frame by frame, rates run from ~0 in the zero-cut morph chains that [[launch-video-seams]] names, through 4.0 a minute in Skale's UI films [1.5, 5.7] and 12-14 in the acclaimed keynote and product-camera films, to 30.7 in beat-cut sizzles. The 14 acclaimed in-house or uncredited films cut at 15.6; the four studio films cut at 3.1, and two of those credits are unconfirmed. A scale jump inside one composition is not counted as a scene cut. Each register's row, founder and live-action films included, is in [[launch-video-registers]].

2.4.0's "no cuts, no crossfades" holds at HeyGen only in the four heygen-apple-motion templates and the one-shot Codex replica (codex-five-hour-limit-replica). pr-to-video-launch runs eight 0.28-0.35 s power1.inOut crossfades; claude-paper-launch has a 0.6 s crossfade and a hard cut at 6.7 s; the frame.md launch render has 4 hard cuts; k3-promo has a 2-frame inversion flash and a 2-frame black dip.

## Where the eye accepts a cut

1. **On the cause or its result.** Skale 9/29 make the click the seam (Skale's 2025 reel, Aside, Browserbase, Bud, Replit Slides, Replit Canvas, Bevel, Wonder (second film), Bolt). In the hard-cut form the press is visible, and the cut lands 0.3-1.0 s later on the consequence. The fill and circle-wipe forms are in [[launch-video-seams]]. Linear Agent clears the input on Enter at 10.53 s and cuts 0.7 s later to the prompt already posted; the answer lands 0.5 s after the cut.
2. **On a constant ground.** Keep one world, wallpaper or layout and cut freely (8/18 acclaimed). Linear Agent cuts 7 times in 45 s of product, Raycast 9 times in 28 s, Notion 3.0 at least 25 times in 90 s.
3. **On the element being read.** A 1-2 frame scale jump of ~2-3× inside the same composition (Skale 9/29: Browserbase, Bud, Taste Labs, Replit Slides, Replit Parallel Agents, Poke '7', Wonder (second film), Contra Indy, Contra x fal; acclaimed 8/18). Anchor the jump. Either the cursor keeps its row across the cut (Notion Mail 22.43 s, Notion 3.0 60.165 s), or the element lands in its real place (Claude Cowork cuts a huge chat bubble to ~0.35× in its actual chat position at 37.9 s).
   Hide the jump with an incoming defocus that sharpens over 6-8 frames (Poke '7'), or let the zoom run on for 3 frames after the punch-in (Claude Cowork, 44.12 s). The sharp variant is the snap zoom (5/18 acclaimed): Notion Mail's scale steps 1.0 / 1.05 / 1.25 / 1.5 / 2.0 / ~2.4 over 5 frames, then settles in ~0.35 s.
4. **To a still, readable frame or an empty ground, then act.** The action starts 0.3-0.4 s in, about one beat (Arc on Windows, Figma Motion, Raycast, Spline Hana). Skale's Typesafe, Pilot Protocol, Contra Indy and Tembo cut to an empty frame that builds within 1-3 frames. HeyGen's frame.md render twice cuts to empty cream, and the next card enters blurred and rotated ~-4°, sharpening within ~0.2 s.
5. **Into motion.** Cut mid-drift on a constant-velocity camera (Linear Agent; its speeds are in [[launch-video-motion]]). Cut at peak velocity after an acceleration (Raycast trucks from 3 to 8 %W/s over 1.8 s and cuts at the peak). Cut onto elements already travelling (Taste Labs' card sweeps, the cursor Wonder (second film) carries across the cut, Bolt's 1-frame push), or on motion blur (Skale's 2025 reel, Wonder (first film)).
6. **Inside a fill or a luminance flip.** Google Gemini app hides all 4 of its cuts in full-frame glyph fills or in a one-frame ground inversion while the particles keep moving (14.48 s).
7. **On a palette flip alone.** Aside, Agent Arcade and Tembo save their hard cuts for the frame where the ground changes colour.
8. **In an accelerating ladder.** figma-launch cuts 9 times on holds shrinking .8 / .5 / .4 / .3 / .2 / .15 / .12 / .1 s while the zoom only climbs (1.32 → 4.4). Claude Opus 4.6 stamps 24 press crops into 4.125 s, with holds falling from 11 frames to 3, then 2-3. Arc on Windows swaps Start-button eras every 0.38-0.54 s with the cursor held in place.
9. **As an accent, in a digital register.** A 1-frame black blink between shot families (Figma glass, 33 ms), a 2-frame white flash 2 frames before a cut (Spline Hana), or a 2-frame colour inversion as the cut itself (k3-promo).
10. **The rack-focus blur-cut, the one cut meant to be seen.** A defocus spike (peak 8-12 px, at least 6 px on the cut frame) hides a one-frame swap of the same surface, and the outgoing scene stays fully opaque until the cut. Use it at most once per ~8 s, on a narrative beat, never mid-caption (HyperFrames cut-the-curve §5).

Inside a HyperFrames project with its internal doctrine installed, cut-the-curve is the default for every scene boundary and an entry from rest after a cut is on the doctrine's anti-pattern list. There, item 4 does not apply and the other cuts above serve as accents; [[hyperframes-reconciliation]] settles each value.

## The crossfade-dip law

Tween both scenes' opacity at once and whatever lies under them shows through at the midpoint: cloud-render-launch's crossfades flashed its cream page ground, and on a dark film an unpainted #root shows as a white flash. When the scenes share a ground there are two fixes. Hard-cut on a continuous background whose media start equals the scene start, so both sides of the cut show the identical frame (HF-heygen-stripe). Or fade the outgoing content down to a bare surface identical to the incoming first frame, then cut (cloud-render-launch's fix, round 6). Either way keep an opaque ground under everything: timeline-launch sets its body to #f5f5f7, and HyperFrames' seam-craft makes the assembler paint #root, because any seam window where the summed opacity falls below 1 composites over the page's default white. claude-paper-launch's 0.6 s crossfade is seamless because the page and root are painted the same paper as both sections, and the message and composer hold identical positions.

11/29 Skale films dissolve or dip at a scene change (0.45 s median, 0.1-1.0 s, 10 timed), and so do 6/18 acclaimed films (Claude Cowork's lasts 3 frames). On graphics they pass through a shared ground: Adaline dips to paper (~6 frames out, 1-2 blank, ~10 in), Extend dips through its brand colour (0.25 / 0.1 / 0.4 s), and Poke '7' dips once to white as its act break. The live-action and founder films dissolve footage to footage (Poke x Cognition's one ~0.17 s dissolve) or UI to founder (Conduit, at least 7 dissolves). HyperFrames' distributed launch workflow defaults `transition_in` to a crossfade; [[hyperframes-reconciliation]] says which value wins inside a project.

## After the cut

Motion either decays (the cut was taken mid-motion) or rises (the cut went to an empty ground and then built). Measured at 800 ms relative to the first frame after the cut: Skale 0.82 [0.39, 1.50] (n = 24; 7 decay to ≤0.4, 8 rise above 1.0); acclaimed 0.58 (n = 14; 5 decay to ≤0.4, 5 rise above 1.0 by 400 ms). HeyGen's renders rise (frame.md 1.0 → 2.13 → 2.57 at 100 / 200 ms). Both work. The dead cut is the settled frame that then waits.

## Cuts and music

Locking cuts to the track is optional: 7/18 acclaimed films lock stamps, cuts or act seams, and 6 cut at chance. A cut that does lock sits on the onset frame. See [[launch-video-music]] for placement and [[sound-motion-sync]] for the tolerance.

## When to apply

Any film with more than one shot: launch films, feature sizzles, README demos. Never in product UI, where [[fly-not-teleport]] owns state changes and [[cross-blur-transitions]] masks the rare crossfade that cannot be avoided.

## Gotcha

Banning cuts forces every film into a zero-cut morph chain, which only 3/29 Skale and 2/18 acclaimed films chose. 2.4.0's "no cuts" came from four HeyGen templates and one studio reel, yet 26/29 Skale pieces and 14/18 acclaimed films hard-cut. Count cuts by reading frames; the detector's misses and the recount method are in [[launch-video-review]].

## Sources

- Skale (skale.solutions/portfolio): 28 client films and the 2025 reel. HKTITAN counted the cuts frame by frame and measured after-cut motion on 2026-09-28. Data: docs/research/launch-films/ (README, tables/skale.md, metrics/, notes/synthesis-skale.md).
- Measured by HKTITAN 2026-09-28, all 18 acclaimed films (the n/18 counts): Linear Agent (2026), Raycast (2025), Claude Cowork (Anthropic, 2026), Cursor 2.0 (2025), Notion Mail and Notion 3.0 (2025), Granola 2.0 (2025), Figma glass (2025), Figma Motion (2026, uploaded at 12 fps), Framer 3.0 (2026, maker uncredited), Spline Hana (2025), Arc on Windows (The Browser Company, 2024), Apple Liquid Glass (2025), Material 3 Expressive (Google Design, 2025), Claude Opus 4.6 (Anthropic, 2026, BUCK per brief), Perplexity Comet (Studio Freight, 2025), Google Gemini app (Ordinary Folk, 2024), Google AI Mode (2025, Ordinary Folk, inferred). Data: tables/acclaimed.md, notes/synthesis-acclaimed.md.
- HeyGen, hyperframes-launches (Apache-2.0): figma-launch/HANDOFF.md (act 2 zoom ladder); HF-heygen-stripe/HANDOFF-V7.md §4; cloud-render-launch/HANDOFF.md (seamless-seam fix, round 6); timeline-launch/HANDOFF.md; claude-paper-launch/index.html; pr-to-video-launch/index.html; k3-promo/index.html L321-323 and L1632-1636; codex-five-hour-limit-replica/STORYBOARD.md; frame-md-launch-storyboard/ (render: metrics/hg-frame-md-launch.json). The frame.md and k3-promo renders were measured with measure.py (metrics/hg-*.json; digests/heygen-launches.json).
- heygen-com/hyperframes (Apache-2.0): .agents/skills/cut-the-curve/SKILL.md §3 and §5, .agents/skills/motion-doctrine/SKILL.md (anti-patterns) and .agents/skills/seam-craft/SKILL.md (repo-internal, not installed by npx skills add); skills/product-launch-video/references/story-design.md (the `transition_in` default).
