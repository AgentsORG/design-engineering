# Acclaimed launch films (in-house and studio): synthesis

<!-- markdownlint-disable MD029 -->

Corpus: 18 films, measured by HKTITAN on 2026-09-28. 13 in-house (Apple Liquid Glass, Granola 2.0, Spline Hana, Linear Agent, Raycast, Cursor 2.0, Claude Cowork, Material 3 Expressive, Figma glass, Figma Motion, Notion Mail, Notion 3.0, Arc on Windows), 1 of unknown maker (Framer 3.0), and 4 from studios (Claude Opus 4.6 by BUCK per brief, Perplexity Comet by Studio Freight, Google Gemini app by Ordinary Folk, Google AI Mode by Ordinary Folk, inferred). The [film list](../README.md#acclaimed-18-films) gives brand, title, year, maker and URL. Frame readings come from per-film analyses (kept local); metrics come from `measure.py` ([tables/acclaimed.md](../tables/acclaimed.md) and `metrics/<id>.json`). Where the detector and the frame reading disagree, the counts below use the frame reading. Every "n of 18" was counted film by film. Statistics script: `others_stats.py` (corrected cut counts, endcard timings, name-reveal times, typing speeds and holds are hand-entered there from the analyses).

Short ids used below: apple (Apple Liquid Glass, 2025), granola (Granola 2.0, 2025), spline (Spline Hana, 2025), linear (Linear Agent, 2026), raycast (Raycast, 2025), cursor (Cursor 2.0, 2025), opus (Claude Opus 4.6, 2026), cowork (Claude Cowork, 2026), comet (Perplexity Comet, 2025), gemini (Google Gemini app, 2024), aimode (Google AI Mode, 2025), m3 (Material 3 Expressive, 2025), figglass (Figma glass, 2025), figmotion (Figma Motion, 2026), framer (Framer 3.0, 2026), mail (Notion Mail, 2025), notion3 (Notion 3.0, 2025), arc (Arc on Windows, 2024).

Written against the 2.4.0 graph. Sections 7 and 8 list what the corpus contradicted and the nodes proposed at the time; 2.5.0's launch-video cluster merged and renamed them, so read those two sections as history, and the counts everywhere as evidence.

## 1. Patterns (counted)

### Voice and copy

1. **No narrator: 17 of 18.** Only apple is voice-led (presenter on camera 23 % of runtime, VO over the UI). The speech proxy (>0.3) fires on 5 (apple, granola, spline, arc, gemini); only apple is real VO. granola and spline are false positives from beat gating, gemini is borderline with no formants, arc (0.47) is unverified.
2. **Typed input with a caret: 13 of 18** (linear, raycast, cursor, cowork, gemini, aimode, granola, figmotion, framer, mail, notion3, arc, comet). Human prompts type at a median **15 chars/s** [13, 21] (7.5-33, n = 9): gemini 7.5, raycast 10, granola 13, notion3 12-15, linear 10 and 20, cursor 20, framer 21, mail 17-26, figmotion 33. Copy-as-prompt and title cards type faster (cursor cards 40-65 c/s, comet 40-60 c/s).
3. **Human types, agent streams: 9 of 18** (linear, framer, cowork, notion3, aimode, gemini, granola, cursor, figmotion). All are among the **13 AI-product films** (linear, cursor, opus, cowork, comet, gemini, aimode, framer, figmotion, notion3, granola, mail, raycast). Typing speed, text behaviour (caret vs stream/resolve) or typeface (cowork: serif agent, sans user) identifies the speaker.
4. **AI latency shown as a state: 8 of the 13 AI films** (cowork shimmer + pulsing spark, notion3 boiling face with status words, aimode stacked status log, framer "Thinking" 0.9 s, figmotion 0.8 s sweep + checkmark, granola "Thinking" 1.4 s, raycast spinner + tool-call stack, cursor agent working 54-59 s). linear does the opposite: it cuts past the wait and opens on the answer.
5. **3 of 18 have no display copy before the endcard** (linear, raycast, figglass): every word is UI text. apple has one title card in 274 s.
6. **Newest word marked, then settles: 7 of 18** (granola line 2 pale to brand green in 0.3-0.45 s; figmotion white to orange in 1-2 frames; framer dim to bright as a light streak passes; gemini glow words cool to white in ~0.6 s; aimode gradient leading edge settles to white; cursor newest glyph lighter for 1-2 frames; linear endcard violet leading edge).
7. **Serif as the AI brand's voice: 3 of 18** (opus model name, cowork Claude's replies, comet titles).

### Structure

8. **Product-first, no enemy act: 16 of 18.** Only granola (four teammates' questions) and arc (the Windows wait) open on a problem. **4 of 18 demote the old version on screen before the new one** (m3 old component 0.5-1.0 s in the same framing; opus greys the old version name and step-drops it; gemini dissolves the old name ("Bard") into particles; arc Start buttons 95 to 11).
9. **Hook types:** the product working by 2 s (linear, raycast, figglass, framer, m3: 5); a sentence, claim or question (gemini, granola, opus, aimode, mail, notion3, cowork: 7); the brand mark (cursor, spline, comet: 3); a place, material or output (apple, figmotion, arc: 3). **Poster frame: 1 of 18** (cursor).
10. **Name reveal is bimodal.** Early (at or under 11 % of runtime): 10 films, median 2.5 s (0-7.2 s). Late (40 % or later): **6 films** (apple 40 %, arc 43 %, opus 67 %, figglass 74 %, framer 82 %, raycast 83 %), median 29 s / 70 %. Middle: granola 19 %, gemini 22 %. The late group shows the thing working and names it at the end.
11. **Proof beats are rare: 4 of 18** (cursor benchmark chart at 7 %, arc beta odometer at 15 %, opus press and customer posts from 0 %, framer community wall at 59 %).
12. **The demo ends on the completed result 0.1-1.2 s before the endcard: 5 of 18** (cursor hot reload 1.2 s before, linear the agent's offer of more help, cowork the user's slang compliment, notion3 the character's completion line, mail Send clicked).
13. **Short sizzles: 7 of 18 run 40 s or less** (spline 26.7, granola 29.3, figglass 29.6, arc 36.6, m3 38.1, raycast 38.6, opus 39.5). All 4 beat-cut sizzles are 38 s or shorter.

### Cuts and seams

14. **Open hard cuts between scenes: 14 of 18.** Corrected rate **14.2 cuts/min** [10, 18.8] (0-76); the detector reports 8.45. Zero or hidden cuts in the body: **4 of 18** (granola 0, wipes and cross-blurs; aimode 0, one drawn line; comet 2, both inside the endcard; gemini 4, each hidden inside a full-frame glyph fill or a luminance flip).
15. **Studios morph, in-house teams cut.** 3 of the 4 studio films are near-zero-cut pieces (comet 2.9/min, gemini 3.3, aimode 0; opus is the exception at ~76/min, a stamped collage). Of the 14 in-house or unknown films only granola is zero-cut; their median is **15.6 cuts/min**.
16. **Continuity from a constant world, ground or layout rather than a shared object: 8 of 18** (linear one lit world; raycast one wallpaper; notion3 two grounds; figglass sample-left/panel-right; opus white paper; cursor cream cards and the same framing on return; figmotion one flat colour per act; mail off-white plus watercolour). **5 of 18 have no shared-element seam at all** (linear, cursor, figglass, figmotion, granola).
17. **At least one shared-element seam: 13 of 18.** **One object runs through the whole film: 4** (comet sphere, aimode dot-headed line, framer neon line, mail paper plane), plus 3 partial (figglass lens, cowork spark, notion3 agent avatar).
18. **Scale changed by a cut rather than a zoom: 8 of 18** (linear, raycast, cursor, cowork, mail, notion3, figmotion, spline). **Snap zooms of 1-5 frames: 5** (mail, notion3, cursor, spline, figmotion).
19. **Zoom-through: 6 of 18** (apple, comet, gemini, figmotion, m3, spline). The fill colour becomes the next ground; the cut lands on the full-fill frame.
20. **Stamped single-frame decisions besides typing: 10 of 18** (granola page swaps, raycast selection hops and ticker, spline zoom snaps, m3 typeface and colour flipbooks, opus chunk stamps, notion3 carousel, figmotion colour flip, cowork 2-frame label roll, arc odometer, framer row fills).
21. **Motion after a cut is split** (n = 14): it decays to 0.4 or less by 800 ms in 5 (aimode, comet, cowork, figglass, gemini) and rises above 1.0 by 400 ms in 5 (apple, arc, figmotion, raycast, spline). Median at 800 ms: 0.58.

### Motion

22. **Stillness: median still_frac 0.321** [0.175, 0.463]; **9 of 18 are above 0.30** (cursor .61, linear .59, opus .55, granola .49, raycast .49, notion3 .40, arc .37, mail .37, cowork .34). Only 2 are below 0.10 (figmotion at 12 fps, gemini).
23. **Ambient drift or creep under holds: 10 of 18** (apple, linear, cowork, comet, gemini, framer, figmotion, figglass, m3 title only, notion3 ~1 % creep). **Decorative float or pulse on UI objects: 0 of 18.** cowork's pulses are the product's real loading states. Strictly static holds: 8 (aimode, where corner difference is 0.000; cursor, mail, granola, raycast, opus, arc, spline).
24. **Blur:** visible velocity blur in 6 (m3 whips, granola push zooms, raycast fast scroll, opus whip, comet chromatic smear, gemini spin). Fast moves are deliberately rendered sharp in 5 (mail ×2.4 in 5 frames, notion3 ×2.2 in 2 frames, spline snaps, linear, cursor). Optical focus as a reveal in 6 (linear, granola, gemini, framer, figmotion, arc) plus apple's refraction.
25. **Visible spring overshoot: 3 of 18** (apple toggle swells mid-travel, cowork mark overshoots ~2×, notion3 face). m3 draws springs as a diagram.
26. **An on-twos brand or character layer against UI on ones: 3** (mail plane at 12 fps on a 24 fps timeline, notion3 2-on/2-off boil, opus footage on twos and drift on threes), plus figmotion's 12 fps upload.
27. **3D-tilted UI planes: 4** (linear, apple, gemini, comet). The other 14 keep the UI flat and front-on; aimode gets depth from blurred light blobs instead.
28. **UI shown:** rebuilt vector in 11; real screen capture in 3 (granola, cursor, arc) plus spline's editor; unclear in 3 (linear, figglass, figmotion). **Pointer shown: 11**; pointer-free: 7 (linear, raycast, opus, comet, gemini, m3, aimode, whose touch ring stands in for one). Named multiplayer cursors: 1-2 (framer two first-name labels, figmotion cursor chat).
29. **Macro crops of single controls: 8** (raycast, arc, mail, notion3, figmotion, cowork, cursor, granola).

### Palette

30. **Monochrome ground, colour held back for state or content: 11 of 18** have at least 32 % near-monochrome frames. Median colourfulness is 13.8. **Dark-dominant: 6** (linear, raycast, framer, aimode, spline, figglass); **light-dominant: 8** (cowork, opus, cursor, gemini, granola, notion3, mail, comet); mixed: 4 (apple, arc, m3, figmotion).

### Sound

31. **Subtractive punctuation: 14 of 18** (13 of the 17 music films). Sub-only dropouts appear in 10. The exceptions are linear and comet (which punctuate by *adding* sub blooms or swells), cursor and figglass.
32. **Low end arrives or returns on the first reveal: 10 of 18** (granola, arc, figmotion, framer, m3, opus, gemini, linear, raycast, comet). Median 3.9 s, 9 % of runtime (1.0-15.8 s, 3-43 %).
33. **A beat or pulse track: 13 of 18**; no grid (pad, drone, tonal score or voice bed): 5 (linear, raycast, cowork, comet, apple). Beat clarity median 0.338; 8 are at 0.4 or above. **Picture locked to the music in 7** (spline cuts on eighths, figglass on the phrase, framer act seams only, raycast sub root changes with each cut, arc montage in the riser gaps, granola drop and gaps on reveals, opus stamps on ticks). **Cuts at chance in 6** (cursor 5/20, m3 0/19, gemini, mail, notion3, figmotion).
34. **No separable UI-click layer: 14 of 18.** A clear foley layer: linear and raycast. Sparse: apple (a few UI-contact onsets), opus (a tick per clipping, possibly in the track). Both foley films put their clicks at **1.45-2.5 kHz**, so their energy above 2 kHz is the lowest in the corpus (0.1 %): the band-share metric cannot find foley.
35. **Loudness splits by length.** 14 of 18 are quieter than -14 LUFS. The **4 hotter films are all 38 s or shorter** (figglass -12.1, granola -12.5, m3 -12.7, arc -13.0). The **3 quietest are all 55-69 s in-house AI walkthroughs** (cowork -35.8, linear -32.9, cursor -32.6). Spearman LUFS vs duration: -0.57. **5 of 18 hit 0 dBTP or higher** (opus +0.4, arc +0.3, granola +0.1, m3 0.0, framer 0.0).

### Endcard

36. **Mark assembled from a primitive or the film's own objects: 10 of 18** (apple, spline, cowork, comet, gemini, aimode, m3, figglass, figmotion, framer). **Grown from a single dot: 5** (cowork, comet, gemini, aimode, figglass). **Bookend (the opening move repeated): 10** (cursor, spline, opus, cowork, comet, notion3, figmotion, figglass, framer, aimode).
37. **Endcard length median 6.3 s** [5.0, 8.4] (2.2-14.1), **11.9 %** of runtime; **final logo hold 2.05 s** [1.5, 2.8] (0.9-4.5). **A URL in 6 of 18** (spline, comet, gemini, mail, notion3, arc). An imperative CTA in 4 (mail, notion3, arc, gemini) and a question in 1 (cowork). All 3 Google films end on the G. **At least 1 s of black or silence after the logo: 5** (apple 5.0 s, framer 2.4, gemini ~1.8 silent, comet 1.2 with a hard audio stop, figglass 1.13).

### Format

38. 17 of 18 are 16:9 (linear is 2:1). 60 fps masters: 4 (granola, cursor, linear, m3). One is 12 fps (figmotion).

## 2. Registers

Each film is assigned one primary register, so the counts sum to 18.

| register | films (n) | traits | numbers (medians) |
|---|---|---|---|
| **R1 Product-camera: the real product, one action at a time** | linear, raycast, cowork (3) | One world (a lit void, a wallpaper, a paper canvas). The camera cuts between angles or crops and scale changes by cut. No display titles before the endcard (linear, raycast) or two cards (cowork). No pointer (linear, raycast), or the cursor is the only thing moving on the user's turn (cowork). Human types, agent streams. Sound is a quiet pad or tonal score with no grid, and foley or silence marks consequence. | still 0.486, calm 0.82, 14.0 cuts/min corrected, move 0.18 s, **-32.9 LUFS**, sub 79 %, beat 0.13, **colourfulness 3.9**, luma 28, pan 0.59 |
| **R2 Keynote cards + demo** | cursor, mail, granola, figmotion, framer (5) | Short title or claim cards (2-7 per film, held 1.2-2.5 s) alternate with 2-18 s UI demos. A pointer in all five. Cards are typed (cursor), carried by an object (mail plane), wiped (granola), colour-flipped (figmotion) or light-streaked (framer). A beat track in 4 of 5. Includes all three promoted films in this register (cursor, mail, framer). | still 0.368, calm 0.73, 12.0 cuts/min, move 0.50 s, -18.2 LUFS, sub 57 %, beat 0.49, colourfulness 26.2, luma 235 |
| **R3 Character-led** | notion3 (1; mail's plane is a partial case) | A drawn character carries personality and latency: faces boil on a 2-on/2-off cycle, accessory choices pay off in the bookend, character beats get their own SFX (pitch wobble), and the UI stays unscored. Prompt cards serve as chapter titles. | still 0.395, calm 0.84, 16.7 cuts/min, -18.7 LUFS, 90 s |
| **R4 Kinetic type / collage** | opus, gemini, aimode (3) | Words are the subject: the press's and customers' words (opus), a sentence addressed to the viewer (gemini), phrases on geometric paths (aimode). UI is illustration on tilted or flat planes. Either near-zero cuts hidden in motion (gemini, aimode) or a stamped, step-framed collage (opus). Accent colour lives in one gradient word. | still 0.171, 3.3 cuts/min, move 0.92 s, -19.3 LUFS, beat 0.61, colourfulness 9.7 |
| **R5 Beat-cut sizzle** | spline, m3, figglass, arc (4) | Every shot is a live component or effect. Hard cuts every 0.75-3.8 s, on the eighth grid (spline), the phrase (figglass) or at chance (m3, arc). All four are 26.7-38.1 s long, colourful and loud. Shot length halves into the logo (figglass), or a montage accelerates (arc, m3). | **30.7 cuts/min**, still 0.285, move 0.32 s, **-12.85 LUFS**, sub 65 %, beat 0.52, **colourfulness 32.6**, 33 s |
| **R6 3D / material world** | comet, apple (2) | A continuous virtual camera through a rendered world. Zoom-throughs change worlds (the parent logo, the product's window, a glass lens). The product's own material makes the transitions and the logo. Long moves; pull-outs show scale. apple adds a presenter (the only VO film). | still 0.176, move 1.19 s (p90 3.4-5.3 s), sub 25 %, beat 0.16, pitched score or voice |

Secondary traits cut across registers. A 3D material showcase appears inside framer's tagline act and all of figglass. Beat-cut montage sits inside m3's and arc's finales. The character layer appears in mail.

## 3. Structure template (measured)

| beat | films | timing (median [IQR], range) |
|---|---|---|
| 0. Poster frame | 1 of 18 (cursor) | 1 frame of the settled logo, then the tumble |
| 1. Hook | all | first readable word (UI text or wordmark included) at **0.68 s** [0, 1.13], 0-13.3 s (apple's 12 s architecture overture is the outlier); 6 films have a word on frame 0. First scene change or seam at **2.33 s** [1.59, 3.59], 0.46-8.71 |
| 2. Name on screen | all | bimodal: 10 films early, median **2.5 s** (0-7.2 s, 0-11 %); 6 late, median **29 s / 70 %** (40-83 %); 2 at 19-22 % |
| 3. Low end arrives on the reveal | 10 of 18 | **3.9 s** (1.0-15.8 s), **9 %** of runtime (3-43 %); usually after a sub-less intro (granola, opus, figmotion, arc) |
| 4. Body: demo in chapters | all | chapter devices: title or prompt cards (cursor 5, mail 6, notion3 5, arc 4, granola 3, figmotion 2), held **1.5 s** [1.2, 2.1] (0.85-2.9 s, n = 14). Mean shot length (runtime / (cuts + 1)) has a median of **4.0 s**; sizzle shots 0.75-3.8 s, product-camera shots 3-8 s |
| 5. Proof | 4 of 18 | 0 %, 7 %, 15 %, 59 % of runtime |
| 6. Payoff before the endcard | 5 of 18 | the completed result or the user's reaction lands 0.1-1.2 s before the endcard cut |
| 7. Endcard | all | **6.3 s** [5.0, 8.4] (2.2-14.1), **11.9 %** of runtime; final logo hold **2.05 s** [1.5, 2.8]; URL in 6; ≥1 s of black or silence after the logo in 5 |

Hand-timed parameters: word stagger ~0.21 s (0.1-0.45 s; figmotion 0.17, opus chunks 0.17-0.25, framer 0.27-0.33, arc 0.4-0.5 on the beat); list and row cascades 0.15 s per item (0.083-0.25 s, 7 films); human prompts 15 c/s; zoom-throughs 0.35 s (0.13-0.8 s, 5 timed); pre-reveal sub gaps ~0.55 s (0.1-0.8 s, 6 films); thesis or diagram breakdowns 2-12 s (6 films).

## 4. Techniques catalogue

Each entry gives the films, the parameters, and where the rule came from.

### Seams and camera

1. **Cut on a constant world.** linear, raycast, notion3, figglass, opus, cursor, figmotion, mail. Keep one ground (a lit void, one wallpaper, off-white plus a blue-framed window, a fixed sample/panel layout, a flat colour per act) and cut freely. linear: 7 cuts between angles in 45 s of product; raycast: 9 cuts in 28 s; notion3: at least 25 cuts in 90 s.
2. **Scale cut on the element being read.** cowork (a huge user bubble cut to ~0.35× in its real chat position, 37.9 s; after a punch-in the zoom runs on for 3 frames, 44.12 s), mail and notion3 (cursor-anchored: the cursor keeps its row across a 2-3× cut, 22.43 s and 60.165 s), linear (×2 by cut, 40.62 s), raycast (14.0, 24.2 s), cursor (a 1.2 s round trip, wide → ×3 macro → wide, 45.25/46.45 s), spline (one-frame zoom snaps), figmotion (a two-frame dive into the timeline ruler).
3. **Snap zoom.** mail (per-frame scale 1.0, 1.05, 1.25, 1.5, 2.0, ~2.4 over 5 frames, then a ~0.35 s settle, sharp); notion3 (2 frames to ×2.2, 0.2 s settle); cursor (0.22 s to ×2.4, energy dies in 3 frames).
4. **Constant-velocity camera, cut mid-drift.** linear (3.2 %W/s; 1.2 %W/s + 2 %H/s; 3.2 %W/s + 4 %H/s; identical displacement every 0.25 s); apple (shots open mid-drift and accelerate, 1.26× by 400 ms); cowork (18-50 px/s only while the agent works, <10 px over 2.5 s on the user's turn).
5. **Accelerate into the first cut.** raycast: a truck from 3 to 8 %W/s over 1.8 s, cut at peak velocity. Used once.
6. **Cut on the result.** linear: Enter at 10.53 s, the input clears, a hard cut 0.7 s later to the panel with the prompt already posted, the answer 0.5 s after the cut.
7. **Cut to still, then act.** arc (motion 1.94× at 200 ms and 9.09× at 400 ms), figmotion (4.75× at 400 ms), raycast (0.42 at 200 ms, then 1.07 and 2.14), spline (0.7 at 100 ms, then 1.47 at 400 ms, about one beat at 130 bpm). The action starts 0.3-0.4 s in, within a beat.
8. **Glyph or icon zoom-through, cut on the fill.** gemini (a suggestion chip's label ramps ~0.4 s, most of the scale in the last 0.15 s, into the black counter of an "o"; again into a dark sparkle whose fill becomes the dark act, 49.6-50.65 s); comet (the parent logo grows from ~3 % to >100 % in ~0.35 s with 2 frames of black edges); apple (a glass lens flies through the camera over 0.8 s, dark to white, refracting the title; the endcard push accelerates over 0.43 s); figmotion (push into a flower head, 0.33 s of pure white, come out of focus in the next shot); spline (0.13 s fast zoom, then cut).
9. **Luminance flip mid-motion.** gemini 14.48 s: the same particle vortex keeps moving while the ground inverts black to white on one frame.
10. **Directional wipe grammar.** granola: full-frame wipes of 0.17-0.33 s with an ease-out edge (75 % of the frame at 50 ms into a 0.17 s wipe); title plates and capture swap only by wipe, and the last wipe reverses direction for the endcard.
11. **Gradient-band wipe with a survivor.** aimode: a soft peach-to-navy band turns dark to white in ~0.6 s while one thin sine line stays on screen.
12. **One carrier object for the whole film.** comet (a sphere orbits in at 4.9 s, recurs as planets, becomes the comet's nucleus, a disc at 31.5-31.9 s, and the mark at 32.1-32.3 s); aimode (a dot-headed stroke is the title ring, tap indicator, text-to-UI connector, Gemini curves, waveform, pill trace and the seed of the G: 0 cuts in 97 s); framer (a neon line draws the first panel, becomes the divider, match-cuts at the same x to a line that turns into a glass slab and then Publish, and returns as the collapse before the logo); mail (a paper plane flies 8 paths of 0.6-1.3 s through every title card, on twos).
13. **Brand gesture becomes the first interaction.** aimode (the title ring collapses at 3.6-4.2 s and returns as the tap ring at 5.2-6.5 s); m3 (pull-to-refresh drags the old title off in 0.6-1.45 s, and the spinner becomes the new loading indicator at 2.4-3.1 s); gemini (the wordmark shrinks into the app's model-selector label, 16.0-17.3 s).
14. **Material transitions.** apple (a 3D-tilted slider flattens into the control over ~2 s; a physical acrylic puck match-cuts to the software loupe); figglass (the effect reveals its own controls: the lens grows ~4× over 1.7 s); comet (carousel rotated edge-on in ~0.17 s, next plane swings in on the same axis and settles in ~0.3 s; push through the product window into space with the sub +15 dB over 1.5 s).
15. **Macro-to-context pull-back.** apple: a 3.4 s S-curve with peak velocity at 50 % for exposition; a snap version (~70 ms attack, tau ~0.2 s, still in ~0.6 s) inside montages; 29 pull-out runs against 20 push-ins. Scale shown by pull-out: framer (6 s from one CMS screen to a wall of ~20), notion3 (a grid grows around the hero card after a ~1.4 s hold, then two stepped pull-outs).
16. **Velocity-matched zoom seam.** apple 67.17 s: the outgoing pull-back roughly doubles its velocity in the last 0.1 s, and the next shot opens already pulling back on the same axis.
17. **Conveyor crane.** raycast: ~4 frame heights, accelerating for ~1.1 s, then an exponential decay with a half-life of ~0.3 s (tau ~0.43 s, about 3× the 0.131 s object tau).
18. **Dock from an element that means the next feature.** raycast: the neighbours fade, the microphone emoji shrinks over ~0.7 s and rounds into the dictation mic, and the pill unfolds sideways in ~0.3 s. Voice becomes text across the next cut (20.20 to 20.233 s).
19. **Cutaway card and return to the same framing.** cursor: 18.37 to 20.37 s.
20. **Made-in-the-tool match cut.** spline: the full-frame artwork cut to the same frame at ~45 % scale inside the editor, animation replaying (16.633 s).
21. **Micro-cut accents.** spline (a 2-frame full-height white flash 2 frames before a cut); figglass (a one-frame black blink, 33 ms, between shot families).
22. **Page curl and particle rename.** gemini: the card peels from the right edge in ~0.4 s to the dark page; the old name becomes particles, and the particles become the new name in ~2.3 s.

### Type and UI

23. **Typed title cards on a fixed slot.** cursor: 0.05-0.1 s blank after the cut, typed in place at 40-65 c/s with a lighter leading glyph, done in 0.5-0.85 s, each feature card ~2.0 s.
24. **Prompt as chapter card.** notion3: 3 off-white interstitials of 3.5-4.7 s, the input pops in ~0.17 s after the cut, one instruction typed at ~12 c/s. Macro typing at ~20 % of frame height with the camera holding the caret at the right third (notion3 22.96-25.2 s); **macro-type, then pull out** (mail: a slash command at ~15 % of frame height, then a ~0.25 s pull-out to show what it opened).
25. **Authorship by text behaviour.** linear (human 10-20 c/s with a caret; agent rows resolve from blur ~0.25 s apart; title rewritten at ~27 c/s after the old one dims over 0.6 s); framer (human 21 c/s with a named cursor; AI 160 c/s, "Thinking" 0.9 s, code 0.7 s, result at 2.7 s); cowork (serif agent with no container vs sans user in grey pills).
26. **Latency made visible.** aimode (a status log, ~1.3 s per stack, with the header rule stepping through brand hues); notion3 (counter steps 1 → 61 every ~0.25 s, rows ~0.25 s apart, status pills flip every 0.167 s); cowork (spark pulse, text shimmer, spinner, camera drift, all only while the agent works).
27. **Stamp decisions over a curve.** raycast (selection hops as single-frame stamps with a click each, over one S-curve pan of 1.2 s up, 1.3 s down, peak 11 %W per 0.1 s); granola (pages swap in one 60 fps frame at ~1.0-1.15 s intervals); spline (zoom level snaps in one frame, then a ~0.35 s eased pan); m3 (typefaces swap every ~0.33 s, logo colours every 0.17-0.33 s).
28. **Stagger cascades.** mail (inbox rows over ~0.73 s, sidebar items every 83 ms); framer (a wireframe first, then rows every ~0.1 s); cursor (chart rows 0.1-0.2 s apart, only the hero row bold and black); raycast (rows 0.1-0.2 s).
29. **Accelerating stamp montage.** opus: 24 press crops in 4.125 s, holds 11, 12, 9, 6, 6, 5, 5, 5, 4, 3 frames, then 2-3 frames, with the word "Claude" pinned near centre; bookended by 19 quote tags from ~1.0 s down to 2 frames, the last held 1.25 s. arc: Start-button eras every 0.38-0.54 s with the cursor held in the same spot.
30. **Demote the old version first.** opus (the old version name greys, drops ~20 % of frame in one step and is gone in 5 frames; the model name is typed, a 0.75 s pause, then the two version digits land 3 frames apart as the sub returns); m3 (old component in the exact framing for 0.5-1.0 s, then the new one).
31. **Show the values, then play the result.** figmotion: the bezier readout changes 0,0,1,1 → 0,0,0.3,1 → 0.67,0,0.3,1 over 2.9 s, and the eased result plays on the next cut. figglass: sample left, live panel right, one slider swept across a whole 3.8 s shot.
32. **Headline hidden in body copy.** figglass: one line of a fairy-tale paragraph stays sharp while the lines around it break into prism streaks (~1.8 s on screen, no size or weight change).
33. **Hand-drawn layer on a different cadence.** mail (plane on twos, UI on ones); notion3 (faces boil on a ~4-frame cycle, 2 changing and 2 held); opus (footage on twos, drift on threes, stacks one layer per 2 frames; held_in_move 0.47).
34. **Colour saved for state.** raycast (the whole hotkey dialog floods green on save; selection rings take their emoji's hue); cursor (monochrome chart, hero row black); linear (colour only in issue glyphs and the endcard sweep).

### Sound

35. **Low end withheld, then brought in on the reveal.** granola (the beat drops as the first title settles, sub -40.6 → -7.5 dB between 5.25 and 5.75 s; sub gaps of 0.5-0.75 s before the next two reveals); opus (sub at -45 to -58 dB for the 3 s hook, in on the first cut to a person; decays -14.7 → -38.9 dB under the old version and returns at 26.1-26.2 s as the version number stamps); figmotion (no sub for 3.3 s, the beat and sub in on the UI reveal at 3.5 s); arc (riser, ~100 ms near-silence, +31 dB sub 4 frames after the cut to the first product frame).
36. **Silence under the name or on turns.** apple (the name held in ~1.5 s near-silence, ~20 dB under the mix, sound returning with the next camera move); cowork (about -60 dB for 1.2 s as the clarifying question opens, -44/-47 dB while the user types, -50 dB for ~1 s before the agent replies).
37. **Sub pulled under the diagram, thesis or premium tier.** m3 (sub out 10.5-12.9 s under the bezier-to-spring diagram, back at 13.5 s at -7.2 dB RMS, 91 % sub); aimode (a 7 s sub-free breakdown under the thesis; the strongest onset lands ~0.5 s before the payoff line); gemini (sub down >30 dB for 51-56 s under the Advanced reveal, mids continuing); figmotion (sub to 1-3 % for 0.5-0.8 s under the precise edit and the generation).
38. **Additive low-end accents.** linear (three sub blooms of +8 to +25 dB, each 1-2 s, on the entry point, the answer and the brand, and nothing else); comet (sub swells ~15 dB over 1.5 s at world changes).
39. **Harmony marks structure.** linear (the pad changes key at act boundaries; Send moves C major to Eb major within ~0.4 s); raycast (the sub root steps to a new note on nearly every cut, C, E, F, A, G, A, C, E, F, C, and drops out entirely at 33.5 s for the lockup).
40. **Consequence maps to level.** linear (typing ~4 dB over the sub RMS at ~1.45 kHz; Enter +9.2 dB at 2.5 kHz; Send +14.5 dB at 1.8 kHz); raycast (clicks level with the sub, median -1.4 dB at ~1.6 kHz; the sub is pulled for the keyboard beat so the clicks stand 18-24 dB clear).
41. **Character beats get their own SFX.** notion3: a pitch-wobble sine at ~1.8-2.3 kHz on the wink (19.9 s) and the completion cheer (73.6 s); the UI stays unscored.
42. **Cuts on the grid, where they are.** spline (5 of the first 8 detected cuts within ±31 ms of the 130 bpm eighth grid, 7 of 8 within ±62 ms; off-beats for variety); figglass (four 8-beat shots of 3.8 s, each cut 0-190 ms from the 808 re-attack, then three 4-beat shots of ~1.8 s into the logo); framer (only the act seams lock, within 15 ms, at the same bar position).
43. **Endings.** A hard audio stop on the cut to black (comet, ~35 dB drop in under 125 ms); a chime on air (opus: 2-6 kHz with the sub at -40 dB, decaying ~30 dB in 1.4 s); the logo on silence (gemini ~2 s; apple 5 s of digital silence); a sub-boom tail matched to a 4 s logo fade (framer, -12 → -48 dBFS).

### Endcards

44. **Logo from a dot or the film's primitives.** cowork (a clicked control collapses to a 1-px dot, which grows to the mark in ~0.9 s with ~2× overshoot; repeated for the closing wordmark in 0.75 s); figglass (dot → lens in 0.7 s → refracted logo in ~1.2 s, settling on the 808 at 26.06 s); aimode (pill trace unwinds to a dot → sparkle → G, 91.0-94.2 s); figmotion (four shapes with selection handles slide together in ~0.9 s); framer (icons turn edge-on into a line in 0.5 s, flash, contract over 1 s, white bloom settles in ~0.5 s).
45. **Growing lockup that re-centres.** granola (wordmark, then version 1.06 s later, then tagline 0.74 s later, each re-centring in ~0.5 s); linear (0.5 s blur-to-sharp wordmark, 1.1 s light sweep, 1.0 s streamed tagline, 2.1 s hold, then the mark alone for 4.5 s); cursor (the wordmark slides out from behind the mark in ~0.15 s).
46. **Feature ticker as the endcard.** raycast: 9 monospace labels at ~2-3 % of frame height, stamped every 0.4 s (3.6 s), a 0.9 s converge, a coming-soon line, and a one-frame logo stamp.

## 5. Versus Skale

Numbers are "acclaimed (18) vs Skale (29)"; Skale figures are from [synthesis-skale.md](synthesis-skale.md) and [tables/skale.md](../tables/skale.md).

- **Cuts.** Corrected **14.2/min [10, 18.8] vs 4.0 [1.9, 11.6]**; detected 8.45 vs 3.6. Zero-scene-cut films: 2 of 18 (11 %) vs 3 of 29 (10 %). **The 4 studio films behave like Skale** (median 3.1/min; 3 of 4 near-zero-cut). **The 14 in-house or unknown films cut at 15.6/min.**
- **Stillness.** still_frac **0.321 [0.175, 0.463] vs 0.116 [0.071, 0.181]**; calm 0.65 vs 0.509. 9 of 18 are above 0.30 against 2 of 29, and 2 of 18 are below 0.10 against 13 of 29. Within format: Skale UI films are 0.091; the product-camera and keynote registers here are 0.486 and 0.368. Even the continuous-camera registers (R4 0.171, R6 0.176) are stiller than Skale's UI median. **Skale creeps; the acclaimed in-house films hold, then act, then cut.** The Skale reel (0.329) matches this corpus's median, not Skale's own client work.
- **Moves.** 50.6 vs 25.2 moves/min; median move **0.416 s vs 1.04 s**; p75 0.875 vs 2.56 s. More moves, and shorter ones.
- **Held frames.** 0.0255 vs 0.004: deliberate on-twos layers (opus 0.47, mail 0.16, notion3 0.10).
- **Motion 800 ms after a cut.** 0.58 (n = 14) vs 0.82 (n = 24). Both corpora split between decay and rise.
- **Palette.** Colourfulness 13.8 vs 19.3; luma 162 vs 205. **Dark-dominant 6 of 18 (33 %) vs 2 of 29 (7 %)**; light-dominant 8 of 18 (44 %) vs 19 of 29 (66 %). Monochrome in ≥32 % of frames: 11 of 18 vs 20 of 29.
- **Voice.** 1 of 18 voice-led vs 10 of 28.
- **Story.** Problem-first **2 of 18 vs 13 of 29**. Proof beats **4 of 18 vs 14 of 29**. Poster frame **1 of 18 vs 9 of 29**. First readable word 0.68 s vs 0.2 s; first seam 2.33 s vs 1.6 s. The name reveal is bimodal in both, but the late mode here is "product first, name at 70 %" (6 films), which Skale does not do. Skale's late mode is problem-first at 15 %.
- **Typing.** Typed prompts 13 of 18 vs 16 of 29, but at **15 c/s vs ~53 c/s**: the acclaimed films type prompts to be read, Skale's to be recognised.
- **Cursor.** Shown in 11 of 18 vs 17 of 29; named multiplayer cursors 1-2 of 18 vs 6 of 29. Rebuilt UI 11 of 18 vs 22 of 29; real capture 3-4 of 18 vs 5 of 29.
- **Type cadence.** Newest word marked 7 of 18 vs 15 of 29; word stagger ~0.21 s vs 0.18 s; text hold **1.5 s vs 1.15 s**.
- **Seams.** Zoom-through 6 of 18 vs 10 of 29; fill-the-frame 6 of 18 (gemini, figmotion, framer, apple, comet, m3) vs 15 of 29; scale-jump or scale cuts 8 of 18 vs 9 of 29; dissolves or dips 6 of 18 (arc, granola cross-blur, aimode dim, cowork 3-frame, comet photo-to-starfield, m3 bento) vs 11-13 of 29; dither or pixel texture 3 of 18 (spline, figmotion, arc) vs 11 of 29.
- **Idle motion.** 10 of 18 vs 15 of 29 put drift, creep or ambient light under holds. Neither corpus floats UI objects.
- **Sound.** LUFS **-18.4 vs -18.1** (the same); LRA **6.45 vs 4.7 LU**; beat clarity **0.338 vs 0.504**; sub share 0.601 vs 0.609; true peak -1.3 vs -1.6 dBTP. At or over 0 dBTP: 5 of 18 vs 2 of 28 over. Subtractive punctuation 14 of 18 vs 23 of 28; drop or low end on the reveal 10 of 18 vs 12 of 18 music films (first drop 3.9 s / 9 % vs 7.3 s / 12 %). UI foley 2 of 18 vs 0 of 3 checked. Energy above 2 kHz 3.35 % vs 1.8 % (music films).
- **Endcard.** Total **6.3 s vs 4.4 s**; hold 2.05 s vs 1.8 s. URL **6 of 18 vs 15 of 29**. From a primitive 10 of 18 vs 12 of 29; bookend **10 of 18 vs 7 of 29**.
- **Length and rate.** Duration 57.5 s vs 67 s; 60 fps masters 4 of 18 vs 1 of 29 (the reel).

## 6. Numbers (with caveats)

| metric | R1 product-camera (3) | R2 keynote (5) | R3 character (1) | R4 type/collage (3) | R5 sizzle (4) | R6 3D/material (2) | all 18 | Skale 29 |
|---|---|---|---|---|---|---|---|---|
| duration s | 54.9 | 64.5 | 90.1 | 73.8 | 33.1 | 158 | 57.5 [38.2, 72.5] | 67 [51, 84] |
| cuts/min (frame reading) | 14.0 | 12.0 | 16.7 | 3.3 | 30.7 | 8.7 | 14.2 [10, 18.8] | 4.0 [1.9, 11.6] |
| still_frac | 0.486 | 0.368 | 0.395 | 0.171 | 0.285 | 0.176 | 0.321 [0.175, 0.463] | 0.116 [0.071, 0.181] |
| calm_frac | 0.82 | 0.73 | 0.84 | 0.58 | 0.55 | 0.53 | 0.65 | 0.509 |
| move median s | 0.18 | 0.50 | 0.29 | 0.92 | 0.32 | 1.19 | 0.416 | 1.04 |
| LUFS | -32.9 | -18.2 | -18.7 | -19.3 | -12.85 | -18.75 | -18.4 [-22.1, -15.6] | -18.1 |
| LRA LU | 12.8 | 6.1 | 9.9 | 6.4 | 4.8 | 4.1 | 6.45 [3.6, 7.85] | 4.7 |
| sub <120 Hz | 0.79 | 0.57 | 0.59 | 0.38 | 0.65 | 0.25 | 0.601 | 0.609 |
| beat clarity | 0.13 | 0.49 | 0.31 | 0.61 | 0.52 | 0.16 | 0.338 | 0.504 |
| colourfulness | 3.9 | 26.2 | 13.2 | 9.7 | 32.6 | 23.5 | 13.8 | 19.3 |
| luma | 28 | 235 | 244 | 203 | 76 | 183 | 162 | 205 |

Hand-timed: first word 0.68 s; first seam 2.33 s; early name 2.5 s / late name 70 %; low end on reveal 3.9 s (9 %); text hold 1.5 s; row cascade 0.15 s/item; human prompts 15 c/s; zoom-through 0.35 s; endcard 6.3 s (11.9 %), hold 2.05 s.

Caveats:
- **Cut detector.** Its count matched the frame reading (±1) in only 5 of 18 (apple, granola, gemini, m3, arc). It under-counted 9 (spline 12 vs 14, linear 1 vs 9, raycast 3 vs 9, cursor 2 vs 13, opus 24 vs 50+, cowork 4 vs ~20, figglass 6 vs 9, mail 14 vs ~19, notion3 6 vs ≥25): dark planes, white-on-white and cream-to-white changes, scale cuts. It fired on non-cuts in 4 (comet 9.96 s rotating plane, aimode 0.33 s dim, figmotion defocus and white fill, framer two white flash blooms). opus's "50" is a floor from inspection.
- **still_frac** counts any visible change, including a small cursor, a caret or a boiling face. figmotion's 12 fps upload drives it to 0.024. Compare within a register.
- **move_len** chains overlapping changes. linear's 0.033 s median counts single typed glyphs.
- **blur_ratio > 1** in 14 films only means the still frames are blank or soft (dark voids, flat cards). Real blur (ratio < 1): m3 0.76, opus 0.8, raycast 0.89 and notion3 0.97 (marginal). granola's push-zoom blur is visible but the metric misses it.
- **speech_mod** false positives: granola 0.457, spline 0.46; arc 0.474 is unverified; gemini 0.324 is borderline and not VO.
- **Cut/hit sync** says little with ≤4 detected cuts (8 films) or under VO (apple). Hand grid-fitting found locks the detector misses (spline, figglass, framer act seams).
- **Band share cannot detect foley** when clicks sit at 1.45-2.5 kHz (linear and raycast have 0.1 % above 2 kHz).
- **R3 and R6 have 1-2 films**; their medians are single films, not tendencies.
- **Reach.** 4 films look promoted (like/view under 0.1 %: notion3 0.04 %, cursor 0.04 %, framer 0.05 %, mail 0.09 %). All are 60-90 s and in R2/R3. Among the 12 organic films (like/view ≥ 0.5 %), like-rate vs LUFS ρ = +0.50, vs still -0.41, vs duration -0.20, vs corrected cuts/min +0.32 (n = 12, weak, confounded by channel size). The highest organic like-rates are arc 3.95 %, raycast 3.93 %, figglass 3.34 %, m3 2.99 %. comet and gemini have no reach data (Vimeo).

## 7. Corrections to the graph

1. **launch-video-seams, "no cuts and no crossfades; one object always carries the eye across".** Contradicted a second time. 14 of 18 acclaimed films cut openly, at a corrected median of 14.2/min, 3.5× Skale's 4.0. What holds the cuts together is a constant world or layout (8 of 18: linear, raycast, notion3, figglass, opus, cursor, figmotion, mail), scale cuts on the element being read (8), chapter cards (cursor, mail, notion3), and cuts hidden in fills (gemini). 5 of 18 have no shared-element seam at all. Morph-only continuity is one register, built by the studios (comet, gemini, aimode) and by granola with wipes.
2. **"Nothing is linear" (the one easing law) applied to cameras.** linear's camera runs at constant velocity (1.2-5 % of frame per second, identical displacement every 0.25 s) and is cut mid-drift; apple's shots open mid-drift and accelerate. cursor mixes ease-out arrivals with accelerate-then-snap stops. Scope the exponential law to UI objects.
3. **"Motion after a cut: exponential-out".** Only 5 of 14 decay to ≤0.4 by 800 ms; 5 of 14 rise above 1.0 at 400 ms (cut to a still, readable frame and act within a beat: arc, figmotion, raycast, spline; or open mid-drift: apple). Median 0.58 at 800 ms.
4. **"No idle motion".** 10 of 18 put slow drift, creep or ambient light under holds (linear's camera is never at rest in a product shot; comet is 16.5 % still; gemini 9.7 %), and all read as premium. 0 of 18 float or pulse a UI object for decoration; cowork's pulses are real loading states, shown only while the agent works. Rewrite as: no decorative motion on UI objects; slow linear camera drift, real status motion and ambient brand light are allowed.
5. **"Blur is derived, never authored".** Velocity blur appears in 6; fast moves are rendered razor-sharp in 5 (mail ×2.4 in 5 frames; notion3 ×2.2 in 2 frames); optical focus is the reveal channel in 6 (linear depth of field and rows resolving from blur, granola cross-blur, gemini depth-of-field word cloud, framer rack focus, figmotion defocus through white, arc frosted dissolve).
6. **The Gotcha "stillness is the sign of quality" and the table's "frames nearly still 32 % / 64 %".** The corpus median is 32 %, but registers range from 17 % (continuous camera) to 49 % (product camera). Stillness is a register choice. What all 18 share is no aimless motion on UI objects.
7. **Zoom-through parameters "scale 1 → 1.18 / 0.92 → 1".** Acclaimed zoom-throughs fly to a full-frame fill (gemini ~0.4 s with most of the scale in the last 0.15 s; comet ~3 % → >100 % in 0.35 s; apple 0.8 s lens; figmotion 0.33 s white) and land the cut on the fill frame, whose colour becomes the next ground.
8. **"A damped spring, zeta = 1/3 … is the entire bouncy quality".** Visible overshoot appears in 3 of 18 (apple's toggle swell, cowork's ~2× mark overshoot, notion3's face). Keep it as HeyGen's system, not an industry norm.
9. **Seam catalogue is missing:** directional wipes that reverse for the ending (granola); a gradient-band wipe with a survivor (aimode); a luminance flip mid-motion (gemini); glyph-counter zoom-through (gemini); macro-to-context pull-back (apple); plane flattens into a control (apple); made-in-the-tool match cut (spline); scale cut on the same element (cowork); cursor-anchored punch cut (mail, notion3); cutaway card returning to the same framing (cursor); carousel rotated edge-on (comet); push through the product window (comet); wordmark into UI label (gemini); title ornament becomes the cursor (aimode); tile-to-pill dock (raycast); voice becomes text across a cut (raycast); cut on the result (linear); one colour ground per act (figmotion); a one-frame black blink (figglass); a 2-frame white flash before a cut (spline).
10. **"What the numbers look like" table.** Add this corpus: 14.2 cuts/min corrected, still 0.321, move 0.416 s, motion 0.58 at 800 ms after a cut.
11. **launch-video-sound, register B "the hits are clicks, 3-5 kHz, 10-20 dB under the bed, on every stepped reveal".** Only 2 of 18 have a UI foley layer (linear, raycast), and it sits at 1.45-2.5 kHz. raycast's clicks are level with the sub (median -1.4 dB) and stand 18-24 dB clear when the sub is pulled; linear's typing is ~4 dB over the sub, with Enter and Send at +9 to +14.5 dB. 14 of 18 have no separable click layer.
12. **"It is not a beat: nothing sits on a grid".** 13 of 18 run a beat or pulse track. Picture sync to it is optional: 7 lock stamps, cuts or act seams; 6 cut at chance. Rescope to "the picture decides what locks".
13. **The recipe "master to -14 LUFS, -1 dBTP".** 14 of 18 are quieter than -14. Loudness splits by length (ρ = -0.57): the 4 hot films are all ≤38 s (-12.1 to -13.0 LUFS; 3 of 4 at or over 0 dBTP), and the 3 quietest (-32.6 to -35.8) are 55-69 s in-house AI walkthroughs that platforms will not raise. 5 of 18 hit 0 dBTP or higher. Keep -1 dBTP as the safety rule; make loudness a stated register choice.
14. **"Silence is punctuation" is confirmed and extended** (14 of 18, sub-only in 10). The measured placements are: under the name (apple ~1.5 s, ~20 dB down), on conversational turns (cowork), under a diagram or precise edit (m3, figmotion), before reveals (granola 0.5-0.75 s, mail 0.55 s, notion3 0.8 s, arc ~100 ms), and under a premium tier (gemini 5 s). The opposite device, additive sub blooms or swells, carries linear and comet.
15. **"Size maps to pitch and length"** gains a sibling: **consequence maps to level** (linear), and harmony can mark acts (linear's key change on Send; raycast's sub root per scene).
16. **Registers missing from launch-video-sound:** voice-led presenter (apple, -22.3 LUFS, 56 % at 120-500 Hz); a continuous pitched score with no grid (comet, LRA 5.1); a warm pulse with no top end and no foley (aimode, 3.7 % above 2 kHz); a loud 808 phrase bed (figglass, LRA 1.2); a tonal sub-root score (raycast); an ambient pad with key changes by act (linear, -32.9 LUFS, LRA 12.8).
17. **Gotcha "a stock music bed is the AI default".** granola rides a clear beat (clarity 0.49) and reads as crafted because the drop and the gaps sit on reveals. Rescope to unstructured beds.
18. **The endcard has no numbers in the graph.** Measured: 6.3 s (11.9 % of runtime), final hold 2.05 s, a URL in only 6 of 18, a mark from a primitive in 10, a bookend in 10, a dot-seeded logo in 5.

## 8. Candidate nodes

Names were checked against the vault's basenames; none collide. Where a Skale-synthesis candidate covers the same ground, the note says merge.

- **launch-film-registers.** Pick the register before the seams, because cut rate, stillness and loudness are register properties: product-camera (14/min, still 0.49, -33 LUFS, monochrome), keynote cards (12/min, 0.37), type/collage (3/min, 0.17), beat-cut sizzle (31/min, 0.29, -13 LUFS, ≤38 s), 3D/material world (continuous camera, 0.18). Merge with the Skale notes' `launch-video-formats` (format = production mode; register = editorial style).
- **product-camera.** The real product, one action at a time. One lit world. Cut between angles freely, and change scale by cut. Constant-velocity camera, cut mid-drift. Cut on the result. No titles until the endcard. Consequence carries the sound. Evidence: linear, raycast, cowork.
- **constant-world-cuts.** A hard cut reads as one move when the ground, the world or the layout stays constant. 8 of 18; corrected 14.2 cuts/min vs 4.0 for Skale. Merge with Skale's `invisible-cuts`.
- **scale-cut.** Change scale by a one-frame cut on the element being read or anchored on the cursor, with a 3-frame run-on or slow pull-out after it. 8 of 18 here, 9 of 29 in Skale.
- **glyph-zoom-through.** Zoom into a glyph or icon whose fill is the next ground; most of the scale in the last 0.15 s; cut on the 100 %-fill frame. gemini, comet, apple, figmotion; 0.33-0.8 s.
- **human-vs-agent-text.** In AI-product films, authorship is shown by text behaviour: human input types at ~15 c/s with a caret; agent output streams, resolves from blur or stamps on a clock; or each speaker gets a typeface. 9 of 18.
- **agent-latency-on-screen.** Show the wait as honest stepped progress (a status log, a counter clock at ~0.25 s, a character state, a 0.8-1.4 s "Thinking"), moving only while the agent works, or cut past it onto the answer (linear). 8 of 13 AI films.
- **name-reveal-timing.** Bimodal: name early (median 2.5 s) or show the product working and name it at ~70 % (6 of 18). Hold the name in near-silence (apple) or demote the old version first (opus, m3). Merge into Skale's `launch-film-structure`.
- **endcard-grammar.** 6.3 s total (~12 % of runtime), a ~2 s final hold, the mark grown from a dot or the film's primitive (10 of 18) or bookending the opening move (10), a URL only when there is a call to action (6 of 18), and a ≥1 s tail of black or silence (5).
- **loudness-by-register.** Loudness follows length and register (ρ = -0.57): ≤38 s feed sizzles at -12 to -13 LUFS; 55-69 s walkthroughs at -33 to -36; 5 of 18 at or over 0 dBTP. Pick the target on purpose; keep -1 dBTP.
- **consequence-sound.** When a film has UI foley (2 of 18), level and pitch follow consequence rather than size: typing ~4 dB over the sub at ~1.5 kHz, commit actions +9 to +14.5 dB; duck the bed for the keyboard beat. Harmony marks acts (key change on Send, sub root per scene).
- **beat-cut-sizzle.** The ≤40 s component sizzle: every shot a live component, cuts on the eighth grid or the phrase, shots halving into the logo, a cut to a still frame with the action on the next beat, a hot master. spline, figglass, m3, arc.
- **character-cadence.** Hand-drawn or brand-character layers run on twos (or a 2-on/2-off boil) against UI on ones; the cadence contrast separates brand character from product. mail, notion3, opus.
- **one-take-carrier.** One drawn or 3D object runs the whole film and becomes the logo (comet, aimode, framer, mail). Merge with Skale's `carrier-shape`.

## 9. Open questions

- Is the in-house versus studio cut-rate split (15.6 vs 3.1 cuts/min) a real difference in craft, or an accident of 4 studio films, two of them Google films by one studio (Ordinary Folk, AI Mode inferred)? A larger studio sample (BUCK, Studio Freight, Ordinary Folk portfolios) would settle it.
- The 3 quietest films (-32.6 to -35.8 LUFS) are all in-house AI walkthroughs from 2025-2026. Is that a house mastering choice for YouTube or X, or a pipeline default?
- Are the in-house films stiller (0.321 vs 0.116) because of editorial restraint, or because 60 fps screen captures, cursors and caret blinks register differently? A per-register recount with the cursor masked out would tell.
- linear and raycast have a foley layer the band-share metric cannot see. Stem separation on granola, figglass and m3 would show whether other "no foley" films hide clicks in the 1-2 kHz band.
- The "late name" mode (6 films) shows up only in organic or high-like films (apple, arc, opus, figglass, raycast) plus framer (promoted). Does it depend on an audience that already knows the brand?
