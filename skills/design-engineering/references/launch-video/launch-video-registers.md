---
title: launch-video-registers
summary: Pick the register first. Cut rate, stillness, move length and loudness are register properties, measured on 47 launch films (29 Skale pieces, 18 acclaimed 2024-2026 films).
tags: [launch-video, registers, pacing, format]
---

# Launch-video registers

Cut rate, stillness, move length and loudness are properties of a launch film's register, not marks of quality. Skale's UI-motion films are 9 % still and cut 4 times a minute. Product-camera films (Linear Agent, Raycast, Claude Cowork) are 49 % still and cut 14 times a minute. Beat-cut sizzles cut a median of 31 times a minute, and three of the four master at -12 to -13 LUFS. Pick the register from the product and the brief, then keep the film's cut rate, still share and move length inside that row. Choose loudness on purpose in [[launch-video-sound]]; the LUFS column is what the films measured, not a target.

Method: every film was measured at its native frame rate, and cuts were counted from the frames by eye. The automatic detector matched that count exactly in only 9 of 29 Skale films and came within ±1 cut in only 5 of 18 acclaimed films. A frame counts as still only when nothing visible changes, so a cursor or a caret makes it moving; compare still share only inside one register ([[launch-video-review]]).

## The registers

Values are medians. Brackets are the quartiles in Skale's UI row (18 films) and the lowest and highest film in every other row; the two-film row gives both films.

| register | films | cuts/min | still share | median move run | LUFS | trait |
|---|---|---|---|---|---|---|
| UI motion graphics, music only | Skale 18 of 29: Replit Slides, Canvas and Parallel Agents; Bolt; Bevel; Contra Indy, Contra x fal; Aside; Bud; Listen Labs; both Wonder films; T:0; Tembo; MadeThis; Agent Arcade; Poke '7'; the 2025 reel | 4.0 [1.5, 5.7] | 0.091 [0.067, 0.13] | 1.49 s [1.02, 2.22] | -17.7 [-18.9, -17.5] (17 with sound) | rebuilt vector UI on light grounds (79 % of frames light), type as the script, a beat track heavy in the sub |
| Founder-led hybrid | Skale 7: Typesafe, Browserbase, Taste Labs, Adaline, Pilot Protocol, Conduit, Extend | bimodal: ~13 when cut as an interview (Typesafe 12.9, Pilot Protocol 13.5), 0-3.6 when graphics carry the acts | 0.181 [0.058, 0.289] | 0.50 s [0.13, 1.04] | -21.1 [-31.1, -17.1] | voice-led; 7 % of energy under 120 Hz |
| Live action | Skale 3: Cognition Devin Voice, Poke x Cognition, the Poke anthology | 21.8-23.4 (the anthology's short ~10) | 0.277 [0.115, 0.483] | 0.25 s [0.13, 0.42] | -26.2 [-26.8, -22.3] | edited, not morphed; motion design rides on the footage |
| Product camera | Linear Agent (2026), Raycast (2025), Claude Cowork (Anthropic, 2026) | 14.0 [9.8, 17.5] | 0.486 [0.343, 0.588] | 0.18 s [0.03, 0.54] | -32.9 [-35.8, -16.9] | one constant world; scale changes by cut; no display titles before the endcard (Claude Cowork adds two cards); colourfulness 3.9 [1.4, 6.7] |
| Keynote cards + demo | Cursor 2.0, Notion Mail, Granola 2.0 (2025); Figma Motion, Framer 3.0 (2026) | 12.0 [0, 19.0] | 0.368 [0.024, 0.611] | 0.50 s [0.08, 4.5] | -18.2 [-32.6, -12.5] | 2-7 title or prompt cards held 1.2-2.5 s between 2-18 s demos; a pointer in all five; Figma Motion's 12 fps upload sets the still and move extremes |
| Kinetic type / collage | Claude Opus 4.6 (Anthropic, 2026, BUCK per brief); Google Gemini app (2024) and Google AI Mode (2025), both Ordinary Folk (AI Mode inferred) | 3.3 [0, 76+] (Claude Opus 4.6 is a stamped collage) | 0.171 [0.097, 0.552] | 0.92 s [0.25, 1.47] | -19.3 [-21.4, -17.2] | the words are the subject |
| Beat-cut sizzle | Spline Hana, Material 3 Expressive, Figma glass (2025); Arc on Windows (2024) | 30.7 [18.2, 60.6] | 0.285 [0.13, 0.366] | 0.32 s [0.27, 3.33] | -12.85 [-20.9, -12.1] | 26.7-38.1 s long; colourfulness 32.6 [12.6, 49.6]; every shot a live component |
| Continuous camera, material world (n = 2) | Perplexity Comet (Studio Freight, 2025), Apple Liquid Glass (2025) | 2.9 and 14.5 | 0.165 and 0.188 | 1.42 and 0.97 s | -15.2 and -22.3 | one virtual camera; zoom-throughs change worlds |

Two more rows rest on one film each (n = 1), so read them as single films, not tendencies. The first is a CG teaser (Work Louder, 17 s: 24.2 cuts/min, still 0.046, -13.1 LUFS). The second is character-led (Notion 3.0: 16.7 cuts/min, still 0.395, -18.7 LUFS).

A zero-cut morph chain is a continuity choice, not a register; it turns up inside the UI-motion, founder, keynote and type registers, and [[launch-video-seams]] names the films and how they carry the eye.

## Differences that are not taste

- **In this corpus the studio films mostly morph and the in-house films cut.** The 4 studio films (Claude Opus 4.6's BUCK credit is per the brief) cut at a median of 3.1 a minute. Three of them show almost no visible cuts (the Google Gemini app hides its four inside fills); the exception is Claude Opus 4.6, a stamped collage at 76+ a minute. The 14 in-house or uncredited films cut at 15.6 [0, 60.6]. Two of the four studio films are Google films credited to Ordinary Folk (AI Mode by inference), so treat this as a lead, not a law.
- **Skale moves longer; the acclaimed films move shorter and hold more.** Pooled across registers, still share is 0.116 vs 0.321, the median move run 1.04 s vs 0.416 s, and moves 25.2 vs 50.6 a minute. Register mix does not explain all of it: the acclaimed rows with the most motion (kinetic type 0.171, continuous camera 0.165 and 0.188) are still stiller than Skale's UI row (0.091). Drift does not explain it either, because 15 of 29 Skale films and 10 of 18 acclaimed films creep under their holds. Whether the rest is restraint or capture (60 fps screen recordings, carets) is open.
- **HeyGen's renders land on both sides.** The frame.md launch (4 hard cuts) and the K3 promo hold like the acclaimed films: still 0.337 and 0.364, move runs 0.33 and 0.32 s. The zero-cut Codex replica (10 s) is 0.072 still with 1.57 s runs, in Skale's range, though mostly because a playing video and typing never stop.
- **A studio's reel is not its client work.** Skale's own reel is 0.329 still (about 3 points of it pulldown duplicates), near the acclaimed median, while its 28 client films are 0.116. Check a studio's client films before calibrating on its reel.

## Other signatures

Skale's 29 vs the acclaimed 18: voice-led films 10 of the 28 with sound vs 1 of 18; light-dominant films 19 vs 8 and dark-dominant films 2 vs 6; colourfulness 19.3 vs 13.8. Openings, proof beats, poster frames and endcards differ too ([[launch-video-structure]]), and so does the speed of a typed prompt ([[launch-video-ui-demo]]). The frame shape is shared: 16:9 in 27 of 29 and 17 of 18 (the Poke anthology and Poke '7' are 4:3; Linear Agent is 2:1).

## Picking

- The product of a known brand is the hero: product camera, or keynote cards when the demo needs chapters.
- A feed sizzle of 40 s or less whose every shot is a live component or effect: beat-cut. All four beat-cut films run 38.1 s or less, but length alone does not pick it: Raycast (38.6 s), Granola 2.0 (29.3 s) and Claude Opus 4.6 (39.5 s) are other registers. Three of the four (Material 3 Expressive, Figma glass, Arc on Windows) are among the four loudest acclaimed films, at -12.1 to -13.0 LUFS.
- A founder explains the product or announces a raise: founder hybrid, led by the voice.
- The words are the product, as in a model launch: kinetic type.
- A brief that asks for "lively" UI motion graphics: Skale's UI-motion register. 13 of Skale's 29 films are under 10 % still.
- None of these (a product its audience does not know yet, no founder on camera, no brief): Skale's UI-motion register, the largest measured row (18 of Skale's 29), with the name early or where the problem act ends, not held to ~70 % ([[launch-video-structure]]).

A second register can ride inside the primary one, as an act or as a layer: a material act in Framer 3.0's tagline, a character layer through Notion Mail's cards, a material showcase across all of Figma glass. Take the numbers from the primary row.

## When to apply

This is the first decision on any launch film, sizzle or README film, and it comes before the storyboard. The beats come next, in [[launch-video-structure]]; where each cut lands is in [[launch-video-cuts]], and how things move inside a shot is in [[launch-video-motion]]. HyperFrames' `/hyperframes` front door routes by deliverable; this node picks the editorial register inside that deliverable. Where a HyperFrames default disagrees with the row, such as product-launch-video's injected crossfade or media-use's -14 LUFS socials recipe, [[hyperframes-reconciliation]] settles the motion and [[launch-video-sound]] the loudness.

## Gotcha

Compare cut rate and still share only within a register, and never average two rows into a target. Averaging Skale's UI row with the product-camera row gives 9 cuts a minute at 29 % still, a film neither of those registers makes. A product-camera film judged against Skale's medians looks too still. Reach is no guide either. Across Skale's films, views track no craft metric (Spearman |ρ| ≤ 0.18; views vs cut rate 0.03), and like rate vs duration is -0.29. The posting account and suspected paid promotion are the likelier drivers.

## Sources

- Skale (skale.solutions/portfolio): 28 client films and the 2025 reel, named as in the table (Skale lists T:0 as Airwallex, unverified, and Bud as Buds). Measured by HKTITAN, 2026-09-28.
- Acclaimed films, measured by HKTITAN, 2026-09-28. In-house: Linear Agent (2026), Raycast (2025), Claude Cowork (Anthropic, 2026), Cursor 2.0, Notion Mail, Notion 3.0 and Granola 2.0 (2025), Figma glass (2025), Figma Motion (2026, uploaded at 12 fps), Spline Hana (2025), Arc on Windows (The Browser Company, 2024), Apple Liquid Glass (2025), Material 3 Expressive (Google Design, 2025). Maker uncredited: Framer 3.0 (2026). Studios: Claude Opus 4.6 (Anthropic, 2026; BUCK per brief, no on-screen credit), Perplexity Comet (2025, Studio Freight), Google Gemini app (2024, Ordinary Folk), Google AI Mode (2025, Ordinary Folk, inferred).
- HeyGen, hyperframes-launches (Apache-2.0): the renders of `frame-md-launch-storyboard`, `k3-promo` and `codex-five-hour-limit-replica`, measured with measure.py.
- heygen-com/hyperframes (Apache-2.0): `skills/hyperframes/SKILL.md` §2, which routes fresh work by deliverable; `skills/product-launch-video/references/story-design.md` (`transition_in`, the injected between-frame transition); `skills/media-use/references/operations.md` (the -14 LUFS socials target).
- docs/research/launch-films/: measure.py, metrics/*.json, tables/, notes/synthesis-skale.md (§1, §2, §5, §6, §8) and notes/synthesis-acclaimed.md (§1, §2, §5, §6, §9).
