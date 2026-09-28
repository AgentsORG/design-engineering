# Skale launch-film corpus: synthesis

Corpus: 29 pieces from skale.solutions/portfolio: 28 client films (01-28) and the 2025 studio reel (00), measured by HKTITAN on 2026-09-28. The [film list](../README.md#skale-29-pieces) maps each id to its film name. Frame readings come from per-film analyses (kept local); metrics come from `measure.py` ([tables/skale.md](../tables/skale.md) and `metrics/<id>.json`). Where the detector and the frame reading disagree, the counts below use the frame reading. Every "N of 29" was counted film by film. Per-format medians and the frame-read cut counts per film: `synth_stats.py`. The other hand-timed values (±1 frame) are recorded here as medians and ranges and nowhere else; the per-film values stay in the local analyses.

Written against the 2.4.0 graph. Section 6 lists what the corpus contradicted and section 7 the nodes proposed at the time; 2.5.0's launch-video cluster merged and renamed them, so read those two sections as history, and the counts everywhere as evidence.

## 1. Formats

| format | films (n) | traits |
|---|---|---|
| **UI motion graphics, music only** | 00, 02, 05, 08, 09, 11, 12, 13, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26 (18) | Rebuilt vector UI on a flat ground, kinetic type as the script, and a beat-driven sub-heavy track. Measured: still 0.091 [0.067, 0.13]; corrected cuts/min 4.0 [1.6, 5.4], range 0-16; move runs 1.49 s median (p90 5.9 s); 79 % of frames light; colourfulness 15. Audio (17 with sound): sub <120 Hz 65 %, beat clarity 0.60, LRA 4.6 LU, -17.7 LUFS. Sub-types: live-action opener (08 gag, 20 archival photos, 23 one footage insert); cursor-led tool demos (18, 19); iOS-native (17, 16); dark neon (21, 25). |
| **Founder-led hybrid** (talking head plus graphics, voice-led) | 01, 06, 10, 14, 15, 27, 28 (7) | The founder is on camera and/or in voice-over, with graphics composited beside or behind them, or carrying whole acts. Measured: still 0.181; sub 7 %; beat clarity 0.10; speech index 0.345; -21.1 LUFS. The cut rate is **bimodal**: interview-edited films (01 12.9/min, 15 13.5/min) versus graphics-carried films (06 3.6, 10 3.6, 27 3.2, 28 0.65, 14 0). |
| **Live action / IRL** | 03, 04, 07 (3) | Dialogue comedy (03), founder two-hander with b-roll (04), long-form anthology (07). Edited, not morphed: 21.8-22.2 cuts/min (03, 04), and about 10/min in 07's short. Still 0.277, -26.2 LUFS, sub 15 %. Motion design rides on top of the footage (notification cards, doodles, supers). |
| **3D CG product film** | 22 (1) | Full CG, no copy. 24.2 cuts/min, median shot 1.83 s, still 0.046, real motion blur (blur ratio 0.38), -13.1 LUFS, sub 70 %, colourfulness 38 (the highest format median; two films reach 39.9). |

Voice: 10 of the 28 films with sound are voice-led (01, 03, 04, 06, 07, 10, 14, 15, 27, 28). 18 are music-only, counting 08, where the founder speaks only in the first ~5 s. The reel (00) is digital silence at -91 dBFS.

## 2. House style (counted)

- **Length.** Median 67 s [51, 84]; 25 of 29 run 30-95 s. The outliers are 22 (17 s teaser), 15 (138 s), 01 (176 s including a 28.5 s joke disclaimer) and 07 (16-minute anthology).
- **Frame.** 27 of 29 are 16:9. Both 4:3 films are Poke (07, 17). Native rates: 30/29.97 in 16 films, 24/23.976 in 9, 25 in 3, 60 in 1 (the reel).
- **Poster frame.** 9 of 29 bake 1-4 frames (0.03-0.13 s) of the finished title, icon or hero image at t = 0, then cut to the real opening: 03, 04, 06, 07, 10, 11, 13, 17, 24. Two more open on a still wordmark or mark (12, 26).
- **The hook word lands immediately.** Of the 26 films that have copy before the endcard, the first word is on screen at a median of 0.2 s [0.0, 1.3]; 15 of the 26 have it by 0.25 s. The late ones open on place or story (04 3.4 s, 07 4.5 s, 03 1.7 s) or on output before the claim (11 and 12 at 3.6 s). The first scene change or seam comes at a median of 1.6 s [1.0, 3.3].
- **Copy is built, never faded in as a block.** 27 of 29 build copy per word or per letter. The exceptions are 04 (phrase captions) and 22 (no copy). Word stagger is a median of 0.18 s across 14 measured films (0.065-0.7 s): speech-synced captions ~0.3 s, music films 0.13-0.2 s, and type-as-voice (02) 0.5-0.9 s. Lockups and headlines type at a median of ~17 letters/s (12-48).
- **The newest word is marked, then settles.** 15 of 29 do this. In 10 films it is a hue: 00, 01, 05, 10, 11, 13, 15, 16, 21, 23 (accent to base in 0.13-0.27 s). In 5 films it is an opacity or grey-to-ink settle: 02, 09, 14, 26, 27.
- **Holds are short.** Text holds a median of 1.15 s after its last word lands (0.5-2.4 s, 14 films). The reel's 2.1-2.5 s holds are the long end of the range.
- **Small type.** Statement type is a median of 5 % of frame height (IQR 4-7 %, 19 films). 6 films use a slam word at 25-61 % of frame height that shrinks or jumps into the sentence: 02, 11, 13, 23, 24, 25.
- **Type families.** A neo-grotesk sans carries the copy in ~21 films. A serif is the brand voice in 5 (04, 07, 09, 17, 20). Monospace is the "system voice" (terminals, tags, lower thirds) in 6 (01, 02, 10, 15, 25, 28).
- **Light, monochrome grounds with one accent.** 19 of 29 films are light-dominant (>50 % of frames at luma >180); only 2 are dark-dominant (21, 25). 20 of 29 have ≥32 % near-monochrome frames. Colour comes from one accent plus the product's own content.
- **Rebuilt UI.** UI is rebuilt as vector, not screen-captured, in 22 of 29. 5 mix in real captures (07, 09, 15, 19, 25), 1 photographs a real phone (04), and 1 has no UI (22).
- **Cursors are characters.** 17 of 29 show a cursor. 6 of those use *named* multiplayer cursors (06 an "agent" label; 11, 12 and 13 two, three and four teammates' first names; 18 the brand name; 27 an "Agent" label and a first name). 8 films show UI with no pointer at all (00, 01, 10, 14, 16, 17, 23, 28); in those, taps appear as state changes.
- **Typed prompts.** 16 of 29 contain a prompt typed into the product's input with a caret. Median speed across 7 measured films is ~53 chars/s (20-150): the audience only needs to recognise a prompt, not read it.
- **Visible press states.** 10 films show a press before its consequence: 00, 05, 09, 11, 12, 17, 19, 23, 24, 25. The press lasts 2-4 frames or up to 0.4 s.
- **The click is the seam.** 9 films: 00, 05, 06, 09, 11, 12, 16, 19, 25. Either the button fills the frame or circle-wipes into the next scene, or the hard cut follows the click by 0.3-1.0 s and lands on the consequence.
- **Fill-the-frame seams.** 15 films (see catalogue).
- **Shared-element / dock seams.** 13 films. **Conveyors:** 12. **Zoom-through type or logo:** 10. **Match cuts** (shape, colour or glyph carried across a hard cut): 8.
- **Hard cuts exist.** 26 of 29 hard-cut at least once. Only 08, 13 and 14 have zero scene cuts. Corrected rate: median 4.0/min over 28 films (07 excluded), IQR 1.9 to 11.6 (`synth_stats.py`, `cuts_read`).
- **Scale-jump cuts** (1-2 frame punch-ins on white) appear in 9 films: 06, 09, 10, 11, 13, 17, 19, 23, 24. The detector misses almost all of them.
- **Dissolves and dips are allowed.** 11 films use one at a scene change (04, 07, 10, 12, 14, 15, 16, 17, 20, 27, 28); 2 more use pixel dissolves (01, 06).
- **Holds creep rather than freeze.** Still-frame share: median 0.116 overall, 0.091 for UI films. 13 of 29 are below 0.10. 10 films put a directional push or drift under their holds: 02, 09, 10, 11, 12, 13, 17, 19, 24, 27. 5 use ambient idle motion (16 colour blobs, 21 glows, 23 blinks and breathing aurora, 25 light streaks, 08 a bounded voice orb). Only 00 and 07 exceed 0.30 still.
- **Machine texture.** 11 films use dither, pixel or halftone as texture or as a transition: 00, 01, 02, 06, 08, 09, 11, 12, 13, 15, 28.
- **3D as seasoning.** 12 films have 3D elements (tilted planes, glass, chrome logos, isometric charts, CG mascots).
- **Proof beats.** 14 of 29 include numbers, logos or benchmarks: 01, 04, 05, 06, 08, 10, 13, 15, 20, 21, 23, 25, 27, 28. 9 of them use counters or odometers.
- **Music-only films run a beat-driven, sub-heavy track** (18 of 28 with sound). Its first drop lands on the brand or title reveal in 11 films (05, 08, 09, 11, 13, 16, 17, 20, 21, 22, 24) and on the thesis word in a 12th (23).
- **Subtractive sound punctuation** in 23 of 28: sub pulled, bed withheld, or a silence placed just before a reveal. That is 17 of 18 music films (19 is flat) and 6 of 10 voice films.
- **No evidence of a UI-click layer.** Energy above 2 kHz in music-only films has a median of 1.8 % (0.3-8.1 %). The three films checked by hand (09, 17, 25) have no SFX layer.
- **Loudness.** Median -18.1 LUFS; 25 of 28 are quieter than -14 LUFS. Three are hotter: 24 at -10.3, 18 at -12.9, 22 at -13.1. Two have true-peak overs (18 +1.2, 24 +0.7 dBTP).
- **Endcard.** Median 4.4 s total [3.6, 5.4]; final hold a median of 1.8 s [1.1, 2.9], range 0.5-4.9. 15 of 29 show a URL. In 12 the mark assembles from a primitive or from the film's own objects (dot, stroke, outline, chips, pixels). 7 bookend the film by repeating the opening move (09, 11, 12, 13, 21, 24, 27).
- **Series use a template of slots.** The three Replit films (11-13, released within a month) share a wordmark on frames 0-2, a slam word settling red to black, a red keyword, a red dot that becomes the liquid glyph (as both the first brand beat and the endcard), a cream canvas, named cursors, dot-matrix generation and a 1.8-3 s lockup hold.

## 3. Structure template (measured)

| beat | films | timing (median [IQR], range) |
|---|---|---|
| 0. Poster frame | 9 of 29 | 1-4 frames, 0.03-0.13 s, then a hard cut |
| 1. Hook | all | first word at 0.2 s [0.0, 1.3] (n = 26); first scene change or seam at 1.6 s [1.0, 3.3] (n = 29) |
| 2. Problem / enemy act | 13 of 29 open problem-first (01, 02, 05, 06, 08, 10, 14, 16, 23, 24, 25, 27, 28); 10 brand-, promise- or output-first (09, 11, 12, 13, 15, 17, 18, 19, 21, 26); 1 context-first (20); 3 story/IRL; 2 non-launch (00, 22) | Problem act lasts until the reveal: median 18.0 s, 29 % of runtime (4.6-50.9 s, 6-51 %) |
| 3. Reveal (brand or product name) | 27 launch films | Median 7.5 s [1.8, 18.0]. Bimodal: brand-first films at 0.07-1.9 s (8 films); problem-first films at 9.8 s [6.8, 20.3], 15 % of runtime [9, 31 %] (19 films) |
| 3a. First music drop | 12 of 18 music films | Lands on the reveal. Median 7.3 s (1.5-20.9), 12 % of runtime (3-26 %), usually after a riser or a withheld sub |
| 4. Features / demo body | all launch films | From reveal to endcard start: median 82 % of runtime [65, 87 %] (n = 26) |
| 5. Proof | 14 of 29 | Bimodal. Up front (08 raise at 6 %, 10 raise at 11 %, 15 traction number at 0 s) or late (01 64 %, 05 60 %, 25 77 %, 27 89 %, 06 96 %). Median of the 12 placed: 54 % |
| 6. CTA / endcard | all | Total 4.4 s [3.6, 5.4] (0.6-8.6); final hold 1.8 s [1.1, 2.9]. URL in 15 of 29. An imperative CTA in 7 (09, 10, 15, 19, 21, 27, 28); a question in 1 (25) |

Seam durations timed by hand: fill-the-frame 0.33 s median (0.12-1.2 s, 16 instances); zoom-through 0.33 s (0.2-0.55 s, 11); dissolve or dip 0.45 s (0.1-1.0 s, 10). Counters run 1.15 s median (0.5-3.0 s, 10).

## 4. Techniques catalogue

Each entry lists the films that use it and its parameters.

1. **Poster frame.** 03, 04, 06, 07, 10, 11, 13, 17, 24. 1-4 frames of the finished title or icon, then a hard cut. It costs 33-133 ms and fixes the thumbnail.
2. **Hook word at frame 0-6.** 15 films. Examples: 02 cropped at 60 % height at frame 0; 23 fly-in with a colour echo at frame 2; 25 "Say" at 25 % height on a music hit at frame 0.
3. **Slam, then shrink or scale-jump.** 02, 11, 13, 23, 24, 25. The word arrives at 4-6× final size (25-61 % of frame height) for about 7 frames while its colour settles, then jumps to 1× in one frame (11 at 6.684 s, 13 at 0.734 s) or shrinks into the sentence (24, 1.0-1.5 s). Lateral drift continues through the jump.
4. **Newest word marked, then settles.** 15 films. Accent to base in 0.13-0.27 s, or grey to ink.
5. **Per-letter scramble decode.** 15, 10, 09. About 3 random states on 3-frame (0.125 s) steps; dithered decode at 0.7-1.0 s per word (09).
6. **Typed prompt with a caret-tracking camera.** 16 films. ~53 chars/s median. The camera pans with the caret at large type size (12, 24, 05).
7. **Named multiplayer cursors.** 06, 11, 12, 13, 18, 27. Colour-coded characters; they converge on the collaboration headline (12).
8. **Cursorless taps.** 17, 23, 16. A 3-4 frame opacity dip, a check mark, or a ~10 % scale-down.
9. **Click is the seam.** 00, 05, 06, 09, 11, 12, 16, 19, 25. The button fills the frame or circle-wipes (0.27-0.35 s), or the cut lands 0.3-1.0 s after a visible press.
10. **Fill the frame.** 00, 02, 05, 09, 10, 11, 13, 14, 16, 18, 19, 23, 24, 25, 27. 0.33 s median. The filled colour becomes the next ground; for act breaks, use a circle fill that inverts the ground (14).
11. **Zoom-through type or logo.** 07, 09, 10, 14, 15, 19, 23, 24, 25, 27. 0.2-0.55 s. Letters grow 4-6× until they fill the frame, with directional blur, and land on a clean ground. Reverse arrival (flying back from past the camera, 0.33 s) in 24.
12. **Logo as matte, portal or wipe.** 07 (palm glyph matte), 09 (logo interior becomes the ground), 10 (octagon used five ways), 21 (stripe wipe, bookended), 25 (letter counter as portal), 20 (photo staircase match-cut to the logo). One brand shape replaces cuts.
13. **Dock / shared element.** 05, 06, 08, 09, 10, 11, 13, 16, 19, 21, 23, 25, 28. Examples: a lower third becomes a diagram node (06); a circle becomes a pill, then a progress bar, then a chart bar (08, ~2 s); a button glyph becomes a status icon (25); a full-frame chart becomes one quadrant of a grid (28).
14. **Match cut** on shape, colour or glyph. 00, 02, 05, 11, 12, 15, 20, 23. Colour flip across the cut while a word or stroke continues (02 ×3); a glyph relayed across two interview cuts (15).
15. **Scale-jump cut-in.** 06, 09, 10, 11, 13, 17, 19, 23, 24. 1-2 frames, same composition, ~2-3× scale. An incoming defocus that sharpens over 6-8 frames hides the jump (17).
16. **Conveyor / vertical push.** 05, 07, 09, 10, 11, 13, 16, 17, 18, 21, 26, 28. The default seam in 26. Beat-locked at one step per beat in 17 (0.98 s, settles in ~0.7 s).
17. **Mirror-exponential whip scroll.** 17 (×1.25 per frame into the peak, ×0.78 per frame out, tau ~0.13 s, crisp at peak speed), 23 (whip blur), 18.
18. **Centre mask-open / recede.** 07, 10, 12 (nested pill portals, 4 designs in 3.5 s, 0.6-0.9 s each), 13 (iris), 28 (speaker recedes into a card, 1.1 s).
19. **Inline UI in a sentence.** 05, 11, 13, 15, 16, 20, 21, 24. A word gap opens to admit an image or card, which then becomes the next scene (11, 13, 21).
20. **Word drum / slot roll.** 01, 05, 13, 15, 16, 20, 21, 24, 26. 0.17-0.8 s per item, neighbours dimmed.
21. **Subtract to keyword.** 05, 08, 13, 16. Drop the other words in ~0.4 s, hold the keyword ~1 s, then bring its evidence in around it (16).
22. **Counter / odometer.** 01, 10, 13, 14, 15, 16, 20, 23, 28. Increments shrink as the count rises (tau 0.6-0.8 s in 10 and 23, about 5× the object tau). Type the result on the landing frame (01). Carry a count across a hard cut (20). Flash the accent colour on landing (15).
23. **Dither, pixel and halftone.** 00, 01, 02, 06, 08, 09, 11, 12, 13, 15, 28. Used as generation (dot matrix resolving through a colour wash in ~1.5 s: 11-13), as a transition (pixel mosaic of ~1/8-frame tiles on 0.125 s steps: 15; resolution ramp: 06; pixel-block reveal: 28) and as brand texture (00).
24. **Hand-drawn annotation.** 02, 03, 09, 19, 20. Drawn in 0.15-0.3 s and erased within ~0.5 s; green means yes, pink means no (02). A pointer arrow that the next object arrives at (09, used ≥8 times).
25. **Authored defocus / focus pull as a seam.** 03, 07, 10, 12, 14, 16, 17, 18, 20, 22, 24, 25, 27 (13 films). Arrive defocused and sharpen in 4-8 frames: 07, 10, 12, 14, 16, 17, 23, 24, 27.
26. **Dissolve through a shared ground.** 14 (dip to paper, ~6 frames out, 1-2 blank, ~10 in, ×4), 28 (brand-colour dip 0.25 / 0.1 / 0.4 s, ×3), 17 (one dip to white as the act break), 20 (blur-through, 0.3-0.7 s).
27. **Founder grammar.** 01, 06, 10, 14, 15, 27, 28. Lower third on screen ~1.8 s, 0.4-1.2 s after the founder appears. Kinetic captions in the chest zone or in the negative-space column. UI in the empty third of the frame. An overlay anchored through a dissolve (27). Captions kept alive across cuts (15). Title set behind the matted subject (28, 01).
28. **Live-action seam grammar.** 04, 07, 03. Match-on-action, a foreground body wipe, a torn-paper split redrawn every other frame, a persistent picture-in-picture frame, and a vertical push between speakers (0.47 s).
29. **Music drop on the reveal.** 12 of 18 music films. After a riser, a withheld sub, or 0.3 s of rest (09).
30. **Take sound away before a reveal.** 23 of 28. Sub dropouts of 0.25-0.5 s before reveals (23); the sub gated in half-second chunks under headline cards (12); 0.9 s at -42 dB before the founder names the raise (10); -60 dB silence as a hinge (07).
31. **Endcard from the film's material.** 12 films assemble the mark from a primitive or the film's own objects; 7 bookend. Hold 1.8 s median.

## 5. Numbers (with caveats)

| metric | UI motion (18) | founder hybrid (7) | live action (3) | CG (1) | all (29) |
|---|---|---|---|---|---|
| duration s | - | - | - | 17.4 | 67 [51, 84] |
| cuts/min, detected | - | - | - | 24.2 | 3.6 [1.5, 5.7] |
| cuts/min, corrected by frame reading | 4.0 [1.6, 5.4] | 3.6 (bimodal 0-3.6 / ~13) | 21.8-22.2 (+07 short ~10) | 24.2 | 4.0 [1.9, 11.6] (n = 28, 07 excluded) |
| films with 0 scene cuts | 2 (08, 13) | 1 (14) | 0 | 0 | 3 |
| still_frac | 0.091 [0.067, 0.13] | 0.181 [0.132, 0.198] | 0.277 | 0.046 | 0.116 [0.071, 0.181] |
| calm_frac_global | 0.49 | 0.63 | 0.77 | 0.23 | 0.51 |
| move run length s (median / p90) | 1.49 / 5.9 | 0.50 / 2.65 | 0.25 / 2.0 | 2.0 / 3.7 | 1.04 / 4.2 |
| moves/min | 20.7 | 45.3 | 59.6 | 24.2 | 25.2 |
| camera pan / zoom share | 0.22 / 0.07 | 0.17 / 0.15 | 0.36 / 0.14 | 0.30 / 0.15 | 0.24 / 0.11 |
| motion at 800 ms after a cut (rel.) | - | - | - | 1.08 | 0.82 [0.39, 1.50] (n = 24): 7 decay to ≤0.4, 8 rise above 1.0 |
| light frames (luma >180) | 0.79 | 0.39 | 0.05 | 0.40 | 0.70 |
| colourfulness | 15.2 | 22.0 | 24.8 | 38.3 | 19.3 |
| LUFS | -17.7 (music-only) | -21.1 | -26.2 | -13.1 | -18.1 [-21.1, -17.45] |
| true peak dBTP | -1.5 | -4.7 | -5.3 | -0.1 | -1.6 |
| LRA LU | 4.6 | 5.2 | 9.3 | 3.8 | 4.7 |
| energy <120 Hz | 0.65 (music-only) | 0.07 | 0.15 | 0.70 | voice-led 0.085 vs music 0.654 |
| energy >2 kHz | 0.018 | 0.054 | 0.020 | 0.009 | 0.029 |
| beat clarity | 0.60 | 0.10 | 0.08 | 0.56 | 0.50 |
| views | - | - | - | 449k | median 715k (23k-39.8M) |

Hand-timed parameters: first word 0.2 s; first seam 1.6 s; reveal 7.5 s (problem-first 9.8 s, 15 %); first drop 7.3 s (12 %); word stagger 0.18 s; typed lockups ~17 letters/s; prompts ~53 chars/s; text hold 1.15 s; statement type 5 % of frame height; fill seam 0.33 s; zoom-through 0.33 s; dissolve 0.45 s; counter 1.15 s; endcard 4.4 s with a 1.8 s hold. Object tau: 0.134 s (13) and 0.13 s (17). Counter tau: 0.6-0.8 s (10, 23).

Caveats:
- **Frame-read cuts.** The counts in `synth_stats.py` follow each film's analysis, with the poster-frame switch left out everywhere. Those analyses counted a same-composition punch-in as a cut in 09, 17, 19 and 24 (7 in all) but not in 10, 11 and 13. Leaving the 7 out gives 3.7 [1.9, 7.7] overall and 3.7 [1.6, 5.3] for UI films (the script's strict line), so the upper quartile is sensitive to how punch-ins are counted.
- **Cut detector.** Its count matched the frame reading in only 9 of 29 films (01, 02, 05, 14, 20, 21, 22, 26, 28). It under-counts white-on-white and scale-jump cuts (00, 03, 04, 12, 17, 18, 19, 23, 24, plus scale jumps in 11 and 13). It fires on fills, posters and dissolves (06, 08, 16, 27). 25's five detections all sit on non-cut seams, while four real cuts go undetected.
- **still_frac** counts any visible change, including a moving cursor, a caption swap or a speaker breathing. For talking heads, judge restraint by type holds, not by stillness. Compare stillness only within a format.
- **move_len** is a run of continuous visible change. It chains overlapping moves, so it is *not* a tween duration. Hand-timed hero moves are 0.2-0.55 s.
- **Duplicate frames.** Pulldown or duplicated frames (00 Indy section, 07's 24p in 30p, 09 at ~18 unique fps, 02 irregular) fake 2-4 frame moves and hide pushes. Treat exact duplicates as held.
- **blur_ratio >1** in 20 films only means the still frames are flat or blank. Films with real motion blur (ratio <1): 00, 01, 03, 04, 07, 21, 22, 23, 24.
- **speech_mod_index** false positives: 09 (0.314), 18 (0.386), 23 (0.398), all music-only. The false negative is 14 (0.275, which is continuous VO).
- **Beat and cut sync** metrics say nothing when VO dominates the onsets.
- **Motion after a cut.** 27's 19.05 at 400 ms is the next montage cut, not motion.
- **Reach** does not correlate with any craft metric: Spearman views vs duration 0.18, vs corrected cuts/min 0.03, vs stillness 0.16; like-rate vs duration -0.29. The poster account and paid distribution dominate. Like/view is 0.023 % for 24, 0.043 % for 06 and 12, and 1.95 % for 22.

## 6. Corrections to the graph

1. **launch-video-seams, the Skale-reel "Move length: median 4 frames, p75 11 frames".** Wrong. Re-measured at the native 60 fps: median 0.19 s (11.5 frames), p75 0.60 s, p90 1.39 s. The reel mixes 60 fps deck animation with 24 fps pulldown, so "frames" is not a unit here. Hand-timed hero moves are 0.27-0.42 s (wash-out 0.37, arrow exit 0.42, pull-out 0.42, CTA fill 0.27 s); the letter stagger is 67 ms. State move lengths in seconds.
2. **"Frames nearly still: 32 %" presented as the Skale figure.** The reel does measure 0.329, but ~3 points of that is pulldown duplicates (28 % if they are ignored). More importantly, the reel is not representative. Across the 28 client films, still_frac is 0.116 median, 0.091 for UI films; only 07 (the tutorial) is higher than the reel. The Gotcha line "The Skale reel is still a third of the time" describes the reel, not Skale's house style.
3. **"No cuts and no crossfades between scenes; almost nothing is a cut."** Contradicted. 26 of 29 films hard-cut. Corrected median 4.0 cuts/min; interview-edited founder films ~13/min; live action ~22/min; the CG teaser 24/min. 11 films use dissolves or dips (13 counting pixel dissolves). What survives is how the cuts are made: cut into motion or on motion blur (00, 10, 18, 19, 25), cut on the click (06, 11, 12, 19), scale-jump cuts hidden by a defocus that sharpens (17), cut to an empty frame that builds within 1-3 frames (01, 15, 23, 26), hard cuts saved for palette flips (05, 21, 26), dissolve through a shared ground colour (14, 28). The zero-cut ideal holds only for morph-chain films (08, 13, 14).
4. **The "3 hard cuts" reel figure** is correct: 13.633, 15.933 and 17.633 s. The detector finds only 1, because the other two are white-to-white.
5. **"Motion after a cut: exponential-out, 0.67 → 0.39 by frame 3 → 0.1 by frame 12".** True for the reel's one measurable cut (13.633: 1, 0.68, 0.50, 0.38 … 0.15 over ten new frames; 1/e at ~0.2 s). It is not a house rule. Of 24 films with cut data, 7 decay to ≤0.4 by 800 ms (08, 11, 12, 16, 19, 25, 28), while 8 *rise* above 1.0 (01, 02, 04, 05, 15, 18, 26, 22) because they cut to an empty state and build, or because people and cameras keep moving. The median at 800 ms is 0.82.
6. **"A damped spring, zeta = 1/3, on three channels … is the entire bouncy quality."** This is HeyGen's system. Only 4 of 29 Skale films show a visible overshoot (11 liquid glyph, 13 tile spring-tilt, 16 check mark, 24 trophy pill, the last ~0.3 s). Skale's arrivals are exponential settles. The tau ~0.131 s law *is* confirmed on Skale work: 13 measures 0.134 s ("Run" drift decays ×0.78 per frame at 29.97 fps) and 17's whip scroll measures ~0.13 s both ways.
7. **"Blur is derived, never authored."** Only partly true. Real velocity blur (blur ratio <1) appears in 9 of 29. 17 renders whip peaks of ~20 % of frame height per frame completely crisp, and 09 uses no motion blur at all. 13 films author blur as a seam: rack focus, defocus to black or white, arriving defocused and sharpening. Keep "derived" for element moves and add authored depth blur as a scene-level tool.
8. **"No idle motion."** Needs scoping. 13 of 29 films are below 10 % still. 10 put a directional push or drift under their holds (02, 09, 10, 11, 12, 13, 17, 19, 24, 27), and 5 use ambient idle motion (16, 21, 23, 25, bounded in 08). The rule that survives: no float, pulse or wobble *on UI objects*; camera creep during a hold and a mascot's blinks are allowed. 23's blinks read as personality. The frame reading of 21 (3.5 % still) is that its glow and drift fill the holds.
9. **Zoom-through parameters "scale 1 → 1.18 / 0.92 → 1".** These are HeyGen sting values. Skale's type zoom-throughs grow letters 4-6× until they fill the frame (23, 27), or accelerate over 9 frames at 24 fps into the gap between two words (19). They last 0.2-0.55 s (median 0.33 s) and land on a clean ground.
10. **"Exits at 60-70 % of the entrance duration."** Mixed. The reel's wash-out (0.37 s) against its letter build (0.53 s) gives 70 %, but mirrored letter-by-letter exits run 100-115 % of the entry (28: a product-name lockup types in over 0.43 s and un-types over 0.5 s). Scope the rule to object exits.
11. **The Skale description** "launch videos for Google DeepMind, Replit, Polymarket, Bolt". Replit (×3) and Bolt are in the corpus. DeepMind appears only as a customer logo in Browserbase's endcard, and Polymarket is not in the 28 films.
12. **launch-video-sound, register B "it is not a beat: nothing sits on a grid".** True for OpenAI, but Skale's music-only register is the opposite. Beat clarity is 0.60 median across 18 films (14 of 18 ≥0.5); sub <120 Hz is 65 %; LRA is 4.6 LU (vs OpenAI 9-15 LU). The first drop lands on the reveal in 12 of 18. This needs its own register, not a correction to B.
13. **"The hits are clicks … on stepped reveals"** is not how Skale films sound. Music-only films put a median of 1.8 % of their energy above 2 kHz, and the three checked (09, 17, 25) have no SFX layer: every pop rides the music. The sync is structural: a drop on the name (09 at 1.95 s, 11 at 8.20, 16 at 7.84), a breakdown under typing (09, 11, 12), cuts on the track's rests (17, where four cuts land within 0-2 frames of a sub dropout).
14. **"Master to -14 LUFS, -1 dBTP"** is a choice, not what the market does. The corpus median is -18.1 LUFS and 25 of 28 are quieter than -14. Voice-led films sit at -21.7 median, with 28 at -31.1 LUFS and 589k views. Three are hotter than -14 (24 -10.3, 18 -12.9, 22 -13.1), and two have true-peak overs. Keep -1 dBTP as the safety rule and treat -14 as optional on muted-autoplay feeds.
15. **The Gotcha "a stock music bed is the AI default because it hides the sync work"** is too broad. 18 Skale films use a beat track and reach 0.1-5M views. What separates them is that the track's structure is placed on picture events: drop on the reveal, sub pulled 0.25-0.9 s before it, breakdown under headline cards or typing. Rescope the gotcha to *unstructured* beds.
16. **The graph has no voice-led register**, yet 10 of 28 films are voice-led: sub median 8.5 %, beat clarity 0.09, LUFS -21.7, LRA 5.75 LU. The bed sits ~10-13 dB under the voice. Silences come right before key lines (10: 0.9 s at -42 dB before the raise, 0.35 s before the close; 06: 0.3 s before the founder appears). One low swell or hit lands on the final wordmark after the voice ends (27, 28).
17. **sound-motion-sync caution.** In 09, three hard cuts sit exactly 4 frames (~137 ms) after strong onsets, far outside the +45 ms detectability threshold. Place cuts on the onset frame.

## 7. Candidate nodes

- **launch-film-structure**. The beat template with the measured timings above. Principle: frame 0 carries the brand or claim, the reveal lands at ~15 % of runtime with the first drop on it, and the endcard runs ~4.4 s with a ~1.8 s hold.
- **launch-video-formats**. Pick the format before the seams. UI-motion, founder hybrid, live action and CG have different native cut rates (4 / 3.6-13 / 22 / 24 per minute), stillness (0.09 / 0.18 / 0.28 / 0.05) and loudness (-17.7 / -21.1 / -26.2 / -13.1 LUFS). Rules from one format don't transfer.
- **poster-frame**. Bake 1-4 frames of the finished title or hero at t = 0, then cut (9 of 29).
- **kinetic-type-cadence**. Newest word in the accent colour settling in 0.13-0.27 s (15 of 29); stagger 0.18 s; hold 1.15 s; statements at ~5 % of frame height; one slam word at 25-61 % that jumps down to size.
- **click-as-seam**. The product action is the transition: press state (2-4 frames), then a fill or circle wipe (0.27-0.35 s), or a cut 0.3-1.0 s later onto the consequence (9 of 29).
- **carrier-shape**. One brand shape (logo, circle, octagon, dot) carries every act change as mask, window, zoom-through and endcard iris (08, 10, 07, 09, 25, 21, 20).
- **invisible-cuts**. Hard cuts that read as camera moves: scale jumps on white (9 films), cut into motion or blur, cut on the click, cut to an empty frame that builds, cut only on palette flips.
- **counter-easing**. Odometers settle ~5× slower than objects (tau 0.6-0.8 s); increments shrink; the result types on the landing frame; a count can carry across a cut (9 films).
- **subtractive-sound-punctuation**. Take the sub or the bed away 0.25-1.3 s before a reveal and bring it back on the reveal (23 of 28).
- **voice-led-launch-sound**. The voice-led register (10 of 28).
- **beat-driven-demo-track**. The music-only register (18 of 28).
- **measuring-launch-videos**. Detector failure modes and how to recount: white-on-white misses, fill false positives, pulldown, still_frac by format, move_len is not a tween.

## 8. Open questions

- Reach is uncorrelated with craft metrics (|rho| ≤ 0.29). Is there any craft signal in reach once the poster account's follower count and paid promotion are controlled for? Promotion is suspected for 12, 24 and 21 (like/view 0.02-0.05 %).
- Attribution. Which parts of 07 (Poke anthology) did Skale shoot or edit? Is T:0 (02) the Airwallex film the portfolio lists? Bevel's portfolio blurb says 700k views; the post has 259k.
- Is there a UI click layer under the music that the band-share metric can't see? Stem separation on 05, 11 and 16 would settle it.
- The tau 0.131 s law is confirmed on two Skale films (13, 17) plus the reel's after-cut decay. It needs a per-tween measurement on 5-10 more films (tracked element position, not frame difference) before it is written as a Skale rule.
- Is the ~12 %-of-runtime drop a studio habit or the music library's structure (a riser of about 8 s)?
- Does the -14 LUFS target matter on X, where autoplay is muted and captions or type carry the message? 28's -31 LUFS reached 589k.
- 4:3 appears only in the Poke films (07, 17). Is it a client choice or a phone-UI rule?
- A cut detector that works on white-on-white UI films would need an edge-change ratio or luma SSIM instead of a colour histogram. Worth building into `measure.py` before the next corpus.
- The founder-film cut rate is bimodal (0-3.6 vs ~13/min). What decides it: the amount of interview footage, or the studio's choice to let graphics carry acts?
