---
title: launch-video-structure
summary: Measured beats for a launch film — a readable word by 0.2-0.7 s, the name early, where a problem act ends or at ~70 %, the low end on the first reveal, an endcard of 4.4-6.3 s holding ~2 s.
tags: [launch-video, structure, storyboard, endcard, timing]
---

# Launch video structure

A launch film's beats are measurable. Put a readable word on screen by 0.2-0.7 s and the first seam by 1.6-2.3 s. Name the product in one of three modes: early (by 11 % of runtime); where a problem act ends (Skale: median 29 %, 6-51 %); or late (~70 %, seen only in the acclaimed films), usually after the product has worked on screen, and in five of those six films by a brand the audience already knew. Land the low end on the first reveal (Skale's first drop in 11 of 18 music films, a 12th on the thesis word; the acclaimed films in 10 of 18, median 3.9 s). Run the endcard 4.4-6.3 s and hold its final frame about 2 s.

The timings below were hand-timed at native frame rate across 29 Skale pieces and 18 acclaimed films from 2024-2026; lengths and mean shot lengths are computed from the files. Values are medians with [IQR] and (range). The film-by-film counts are in docs/research/launch-films/.

## The beats

| beat | Skale (29) | acclaimed (18) |
|---|---|---|
| Poster frame | 9/29 bake 1-4 frames (0.03-0.13 s) of the finished title or hero at t = 0, then cut: Cognition Devin Voice, Poke x Cognition, Browserbase, the Poke anthology, Taste Labs, Replit Slides, Replit Parallel Agents, Poke '7', Contra x fal. It sets the autoplay thumbnail at a cost of 33-133 ms | 1/18 (Cursor 2.0: one frame of the settled logo) |
| First readable word | 0.2 s [0.0, 1.3] (n = 26; 15 by 0.25 s) | 0.68 s [0, 1.13]; 6 on frame 0 |
| First seam | 1.6 s [1.0, 3.3] | 2.33 s [1.59, 3.59] |
| Opening act | problem-first 13/29, and the problem act runs to the reveal: 18.0 s = 29 % of runtime (4.6-50.9 s, 6-51 %); brand, promise or output first 10/29 | product-first 16/18; only Granola 2.0 and Arc on Windows open on a problem. Hooks: the product working by 2 s (5), a claim or question (7), the brand mark (3), a place, material or output (3) |
| Name on screen | brand-first at 0.07-1.9 s (8); the other 19, 13 of them problem-first, at 9.8 s [6.8, 20.3] = 15 % [9, 31 %] | early: 2.5 s, at ≤11 % (10); late: 29 s = 70 % (6: Apple Liquid Glass 40 %, Arc on Windows 43 %, Claude Opus 4.6 67 %, Figma glass 74 %, Framer 3.0 82 %, Raycast 83 %); mid-film: only Granola 2.0 (19 %) and the Google Gemini app (22 %) |
| Low end on the reveal | the first drop lands on the reveal in 12/18 music films (one of them on the thesis word): 7.3 s (1.5-20.9) = 12 % | the low end arrives on the first reveal in 10/18: 3.9 s (1.0-15.8) = 9 %, usually after an intro with no sub |
| Body | reveal to endcard = 82 % of runtime [65, 87 %] (n = 26) | chapters marked by title or prompt cards (Cursor 2.0 5, Notion Mail 6, Notion 3.0 5, Arc on Windows 4, Granola 2.0 3, Figma Motion 2; card holds in [[launch-video-type]]); mean shot 4.0 s (sizzles 0.75-3.8 s, product camera 3-8 s) |
| Proof | 14/29 (counters in 9), either up front (Pilot Protocol at 0 s, Listen Labs 6 %, Taste Labs 11 %) or late (Aside 60 %, Typesafe 64 %, Bolt 77 %, Conduit 89 %, Browserbase 96 %) | 4/18, at 0, 7, 15 and 59 % |
| Payoff | not counted | 5/18 land the finished result or the user's reaction 0.1-1.2 s before the endcard cut (Cursor 2.0's hot reload 1.2 s before; Linear Agent, Claude Cowork, Notion 3.0, Notion Mail's Send) |
| Endcard | 4.4 s [3.6, 5.4] (0.6-8.6); final hold 1.8 s [1.1, 2.9] | 6.3 s [5.0, 8.4] (2.2-14.1) = 11.9 % of runtime; hold 2.05 s [1.5, 2.8] |
| Length | 67 s [51, 84]; 25/29 run 30-95 s | 57.5 s [38.2, 72.5]; 7/18 run ≤40 s, including all four beat-cut sizzles (≤38.1 s) |

Problem-first films tend to prove (9 of Skale's 13 carry a proof beat, against 5 of the other 16); product-first films show. A late name does not wait for the low end: Framer 3.0 and Claude Opus 4.6 bring theirs in on an early cut and name themselves at 82 % and 67 %, and Raycast pulls its sub out as the name converges. How to land the drop on the reveal frame is covered in [[launch-video-music]].

## The name

- Pick one mode and commit to it: early (≤11 %), where a problem act ends (median 29 %, 6-51 %), or late (40-83 %, median 70 %), after the product has worked on screen or, in Arc on Windows, on the first product frame after a problem act.
- Five of the six late-name films come from brands their audience already knew (Apple, Arc, Anthropic, Figma, Raycast), and their like-to-view ratios look organic; the sixth, Framer 3.0, looks promoted (0.05 % likes per view, a proxy, not ad data). That the late mode needs a known brand is an inference from six films, not a measurement. Even so, don't hold back an unknown product's name for 70 % of the film.
- 4/18 demote the old version on screen first. Material 3 Expressive shows the old component for 0.5-1.0 s in the same framing. Claude Opus 4.6 greys out "Opus 4.5", drops it by ~20 % of frame height and removes it in 5 frames. The Google Gemini app dissolves "Bard" into particles that form the new name in ~2.3 s. Arc on Windows steps through the Start buttons from Windows 95 to 11.

## Endcard grammar

- Show a URL only when there is somewhere to go, and put a verb with it. Imperative CTAs appear in 7/29 (Bud, Taste Labs, Pilot Protocol, T:0, Agent Arcade, Conduit, Extend) and 4/18 (Notion Mail, Notion 3.0, Arc on Windows, the Google Gemini app). Taste Labs' comes in the beat before the endcard; Wonder (second film) closes on a status line instead of a verb. A question appears once in each corpus (Bolt, Claude Cowork).
- Build the mark from a primitive or from the film's own objects (12/29, 10/18); 5/18 grow it from a single dot. Claude Cowork blooms its mark from a 1 px dot at its first brand beat (~0.9 s, ~2× overshoot, out of the control the user just clicked) and repeats the bloom at the end in 0.75 s, a bookend. Figma glass goes from a dot to a lens in 0.7 s, then to a refracted logo in ~1.2 s, landing on the 808.
- Bookend the film by repeating its opening move (7/29, 10/18).
- A lockup that grows re-centres at each step. Granola 2.0 adds the version 1.06 s after the wordmark and the tagline 0.74 s after that, re-centring in ~0.5 s each time.
- Where the register allows, give the logo ≥1 s of silence, on it or after it (5/18: Apple Liquid Glass 5.0 s of black, Framer 3.0 2.4 s, Perplexity Comet 1.2 s, Figma glass 1.13 s; the Google Gemini app holds its G ~1.8 s in silence). How the sound ends is covered in [[launch-video-sound]].

## Series are templates of slots

Replit's three films (Replit Slides, Replit Canvas, Replit Parallel Agents) came out within a month and reuse one kit: red keywords, a cream canvas, named cursors, dot-matrix generation and a 1.8-3 s lockup hold. Slides and Parallel Agents also open on the wordmark for frames 0-2 and slam a word that settles from red to black; Canvas opens on its wordmark but has no slam. The liquid glyph build recurs at the first brand beat of Slides and Parallel Agents and on the Canvas and Parallel Agents endcards, growing from a red dot every time except in Slides.
To re-brand a template, write the new product into the slots and keep every frame number, ease and cut (inside a HyperFrames project, seam eases are the stamp's; see [[hyperframes-reconciliation]]). HyperFrames' blueprints describe the same discipline: Reproduce when the slots map cleanly, Adapt when only the content differs, and keep the signature move in both cases.

## Arcs belong to HyperFrames

Inside a HyperFrames project, keep the arc and beat order that product-launch-video picks (PAS, Future Pacing, Demo Loop, BAB, Feature-Benefit Cascade), with a hook in the opening 3-5 s and the promise by beat 2. hyperframes-creative paces narration at 2.5 words/s, and the front door sizes the film at 30-90 s. Take the timings from this node: a readable word by ~1.3 s (the larger upper quartile: Skale 1.3 s, n = 26; acclaimed 1.13 s), the first seam inside the hook window (upper quartile 3.3-3.6 s), the name at one measured mode, and the arc's closing CTA beat folded into the endcard, with a verb and a URL only when there is somewhere to go. This node offers no competing arc; conflicts go to [[hyperframes-reconciliation]].

## When to apply

Use this at the storyboard stage, after [[launch-video-registers]] has named the register and before picture lock. The words on screen come next ([[launch-video-type]]). Product UI has no runtime to structure, so it is out of scope ([[marketing-vs-product-ui]]).

## Gotcha

Don't time a problem-first film to the 15 %: that median mixes all 19 Skale films that are not brand-first. A problem act runs until the name, a median 29 % of runtime (Adaline names at ~37 %, T:0 at ~49 %), and none runs much past half the film (Skale's longest is 51 %). No acclaimed film names between 22 % and 40 %. A URL is not the default close either: Skale puts one on about half its endcards (15/29) and the acclaimed films on a third (6/18), and only four of those six pair it with an imperative. Perplexity Comet sets a small bare URL under its wordmark, and Spline Hana gives spline.design a plate of its own. Neither carries a verb.

## Sources

- Skale (skale.solutions/portfolio): 28 client films and the 2025 reel, named by client and hand-timed at native fps by HKTITAN on 2026-09-28. See docs/research/launch-films/notes/synthesis-skale.md §2-3 and tables/skale.md.
- Acclaimed films (brand, title, year and maker as listed in [[launch-video-registers]]), hand-timed on 2026-09-28. See notes/synthesis-acclaimed.md §1 and §3; others_stats.py holds the hand-entered name, endcard and text-hold values.
- heygen-com/hyperframes (Apache-2.0), cited for what this node leaves to it: skills/product-launch-video/references/story-design.md (arcs, hook, promise); skills/hyperframes-creative/references/narration.md (2.5 words/s); skills/hyperframes/references/routes/product-launch-video.md (30-90 s); skills/hyperframes-animation/blueprints-index.md (Reproduce / Adapt / Compose, signature move).
- Related: [[launch-video-registers]], [[launch-video-music]], [[launch-video-sound]], [[launch-video-type]].
