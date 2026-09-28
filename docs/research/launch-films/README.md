# Launch films: the measured corpus

This folder holds the evidence behind the 2.5.0 launch-video cluster (`skills/design-engineering/references/launch-video/` and the launch nodes in `references/sound/`). HKTITAN measured 50 films at their native frame rate on 2026-09-28: 29 Skale pieces (28 client films from skale.solutions/portfolio and Skale's 2025 reel), 18 acclaimed launch films from 2024-2026, and 3 renders committed in HeyGen's hyperframes-launches repository. Three HeyGen digests sit beside them: a digest of the hyperframes-launches projects, a census of the 3,446 GSAP calls in its Apache-2.0 composition source, and a reading of the heygen-com/hyperframes skills.

These are research tools, not skill scripts: `npx skills add` installs nothing from `docs/`. The earlier OpenAI analysis (2026-09-05, register B in launch-video-sound) lives in [../launch-register/](../launch-register/) and is unchanged.

## Layout

| path | what it holds |
|---|---|
| `measure.py` | measures one film at native fps (cuts, shots, stillness, move runs, camera share, blur, luma, colour, loudness, bands, beat, cut and hit sync) and writes `<id>.json` plus contact sheets |
| `aggregate.py` | folds per-film JSON into a table on stdout and `corpus-<name>.json` |
| `metrics/` | one `measure.py` output per film: 50 files, ids as in the [film list](#film-list) |
| `corpus-skale.json`, `corpus-acclaimed.json`, `corpus-heygen.json` | the aggregated rows per corpus |
| `tables/` | the three aggregate tables with their distributions and legend |
| `synth_stats.py` | Skale medians by format (UI motion, founder hybrid, live action, CG) and for the music-only and voice-led audio subsets; the frame-read cut counts per film, entered by hand, and their rates |
| `others_stats.py` | the acclaimed corpus with its frame-read cut counts and hand-timed endcard, first word, first seam, name, typing and hold values entered by hand; register and maker medians; the comparison with Skale |
| `heygen_corpus_stats.py` | the tween census over a hyperframes-launches clone; output in `digests/heygen-corpus-stats.json` |
| `heygen_k3_sync.py` | tests whether the K3 promo's music onsets lock to the composition's stamped event times |
| `probes/` | eight one-off probes whose numbers a node cites; each expects local media |
| `notes/` | the two syntheses: the counted evidence, the corrections to 2.4.0, the open questions |
| `digests/` | HeyGen material: the launches digest, the census output, the HyperFrames doctrine digest |

## Method

- **Native frame rate only.** `measure.py` reads every frame the file stores and resamples nothing. Per-frame change is scaled by fps / 30, so a threshold means the same at 12, 24, 30 or 60 fps.
- **Duplicates are bridged as held.** A frame that repeats its predecessor (mean absolute grey difference under 0.08) with moving frames on both sides is pulldown or animation on twos. It counts as part of the move and is reported separately as `held_in_move_frac`.
- **Cuts are recounted by eye.** The detector (a colour-histogram distance plus a frame-difference spike) writes contact sheets on a timeline and around up to eight detections. Every film's cuts were recounted from those sheets and from 2-frame steps around each seam. The tables keep the detector's count (`cuts`, `cpm`); the frame-read counts per film are entered in `synth_stats.py` (Skale, with the counting rule in its comments) and `others_stats.py` (acclaimed).
- **Hand-timed fields are ±1 frame.** First readable word, first seam, name reveal, problem act, first drop or low-end return, endcard start and final hold, text holds, word stagger, typing speed, seam and counter durations, and time constants (tau from the per-frame decay ratio r: tau = -1 / (fps · ln r)). For Skale only the medians and ranges are committed, in the [Skale notes](notes/synthesis-skale.md) §2-5; the per-film values stay in the local analyses. The acclaimed endcard, first word, first seam, name, typing and hold values are entered in `others_stats.py`; stagger, seam, counter and time-constant values are in the [acclaimed notes](notes/synthesis-acclaimed.md) §3-4.
- **Definitions.** Still share: frames where under 0.05 % of the area changes by more than 12 grey levels in 1/30 s. Calm share: the older, looser global reading. Move run: an unbroken stretch of visible change. Audio: integrated loudness and true peak from ffmpeg's EBU R128 filter; band shares from an STFT (0-120, 120-500, 500-2000, 2000-6000, 6000-22050 Hz); beat clarity from onset autocorrelation; a syllabic-modulation index as a speech proxy; cut-to-hit and hit-to-motion sync within 67 ms, against chance. The full legend closes each table in `tables/`.

## The resampling finding

Resampling a 24 or 25 fps film to 30 fps inserts a duplicate every fifth or sixth frame. Each duplicate splits a real move into short runs and adds a still frame, so a resampled clip reports 2-4 frame "moves" and more stillness than the film has. The 2.4.0 graph's Skale-reel figures (median move 4 frames, p75 11 frames) were partly this artifact. At the reel's native 60 fps the median move run is 0.192 s (11.5 frames), p75 0.60 s and p90 1.39 s (`metrics/00-skale-reel-2025.json`). The reel mixes 60 fps deck animation with 24 fps pulldown, so a frame is not a unit of time here: state durations in seconds. About 3 points of the reel's 0.329 still share are pulldown duplicates, and the reel is not Skale's house style either: the 28 client films have a median still share of 0.116.

## Caveats

- **The cut detector fails on UI films.** Its count matched the frame reading in 9 of 29 Skale films and 5 of 18 acclaimed films (±1). It misses white-on-white, cream-to-white, dark-plane and scale-jump cuts, and fires on fills, poster frames, dissolves, rotating planes, flash blooms and defocus. Claude Opus 4.6's frame-read count (50) is a floor. Quote frame-read counts only.
- **Still share compares only within a register.** It counts any visible change: a cursor, a caret, a caption swap, a breathing speaker, a boiling face. Figma Motion's 12 fps upload drives it to 0.024. In talking-head films, judge restraint by type holds, not stillness.
- **Move runs are not tweens.** A run chains overlapping changes; Linear Agent's 0.033 s median counts single typed glyphs. Hand-timed hero moves in Skale's films are 0.2-0.55 s.
- **Duplicate frames fake short moves and hide pushes.** Pulldown or duplication shows in the reel's Indy section, the Poke anthology (24p in 30p), Bud (about 18 unique frames a second) and T:0 (irregular). On-twos layers are deliberate in Claude Opus 4.6 (0.47 held), Notion Mail (0.16) and Notion 3.0 (0.10).
- **A blur ratio above 1 only means the still frames are flat or blank** (20 Skale films, 14 acclaimed). Real velocity blur (ratio below 1): Skale's reel, Typesafe, Cognition Devin Voice, Poke x Cognition, the Poke anthology, Agent Arcade, Work Louder, Contra Indy and Contra x fal; Material 3 Expressive 0.76, Claude Opus 4.6 0.8, Raycast 0.89 and Notion 3.0 0.97 (marginal). Granola 2.0's push-zoom blur is visible and the metric misses it.
- **The speech proxy has false positives.** Music-only Bud (0.314), Wonder's first film (0.386) and Contra Indy (0.398); Granola 2.0 (0.457) and Spline Hana (0.46). Arc on Windows (0.474) is unverified and Google Gemini app (0.324) borderline. Adaline (0.275) is a false negative: it has continuous voice-over.
- **Beat and cut-sync metrics say nothing** under a voice or with 4 or fewer detected cuts (8 acclaimed films). Grid fitting by hand (`probes/o5-grid.py`) found locks the detector missed.
- **Band share cannot see foley at 1.45-2.5 kHz.** Linear Agent and Raycast carry a clear click layer yet have 0.1 % of their energy above 2 kHz.
- **Motion after a cut can catch the next cut.** Conduit's 19.05 at 400 ms is a montage cut, not motion.
- **Reach is not evidence of craft.** Across Skale's films, views correlate with no craft metric (Spearman views vs duration 0.18, vs frame-read cut rate 0.03, vs still share 0.16; like rate vs duration -0.29): the posting account and paid promotion dominate. Replit Canvas, Contra x fal and Agent Arcade (like/view 0.02-0.05 %) and Browserbase (0.043 %) look promoted. Four acclaimed films look promoted too (like/view under 0.1 %: Notion 3.0, Cursor 2.0, Framer 3.0, Notion Mail); among the 12 organic ones (of the 16 with like data; the two Vimeo films have none), like rate vs loudness is +0.50 and vs still share -0.41, weak and confounded by channel size.
- **Small groups are single films.** The character-led row (Notion 3.0), the 3D / material-world row (Perplexity Comet, Apple Liquid Glass) and the CG teaser (Work Louder) hold one or two films; their medians describe films, not tendencies. The studio-versus-in-house split rests on 4 studio films, 2 of them Google films credited to Ordinary Folk (AI Mode by inference).
- **Attribution is partly unverified.** Claude Opus 4.6 is BUCK per the brief, with no on-screen credit; Google AI Mode is Ordinary Folk by inference; Framer 3.0 is uncredited; T:0 is listed by Skale as Airwallex and the link is unverified; Bud is listed as Buds; Skale's share of the Poke anthology is unclear; Bevel's portfolio view count (700k) disagrees with the post (259k). Skale's home page shows Google DeepMind and Polymarket in its logo wall (and the 2.4.0 graph described Skale as making their launch videos), but neither is among the 28 portfolio films; DeepMind appears only as a customer logo in Browserbase's endcard.
- **HeyGen's renders are three files.** The Codex replica has no audio stream; K3's composition is silent while its published render carries a sub-heavy bed; the frame.md render is voice-only, at -31.3 LUFS with no bed (well under the -14 LUFS that website-to-hyperframes states). The census counts calls in source, not frames on screen, and its sets differ (see the number index).

## Film list

Film names are the ones the nodes use. Titles are the published titles or short forms of them. The Skale table's portfolio column paraphrases each portfolio card (client, stage, blurb). Posted dates for X posts are decoded from the post id. Makers carry the qualifier the evidence supports. fps and duration come from `metrics/`.

### Skale (29 pieces)

| id | film | portfolio entry (paraphrased) | posted | maker | public URL | fps | duration s | format |
|---|---|---|---|---|---|---|---|---|
| 00-skale-reel-2025 | Skale's 2025 reel | not in the portfolio (studio reel) | 2025-08 | Skale | <https://x.com/MarkKnd/status/1961539364300697674> | 60 | 41.7 | UI motion, silent |
| 01-typesafe | Typesafe | TypeSafe, Series A | 2026-09 | Skale (portfolio) | <https://x.com/completeskeptic/status/2099925682726002904> | 24 | 176.1 | founder hybrid |
| 02-airwallex | T:0 | listed as Airwallex, Series H (unverified) | 2026-09 | Skale (portfolio) | <https://x.com/lancectk/status/2094830760410984550> | 25 | 52.7 | UI motion, music only |
| 03-cognition-devin-voice | Cognition Devin Voice | Cognition, Series D (Devin Voice launch) | 2026-09 | Skale (portfolio) | <https://x.com/cognition/status/2098142686486356185> | 23.976 | 51.4 | live action |
| 04-poke-x-cognition | Poke x Cognition | Poke x Cognition, Series D (the acquisition) | 2026-07 | Skale (portfolio) | <https://x.com/cognition/status/2080311229256540194> | 23.976 | 66.0 | live action |
| 05-asidehq | Aside | AsideHQ, pre-seed | 2026-06 | Skale (portfolio) | <https://x.com/hyojun_at/status/2069497198879048131> | 29.97 | 87.6 | UI motion, music only |
| 06-browserbase | Browserbase | BrowserBase, Series B | 2026-04 | Skale (portfolio) | <https://x.com/pk_iv/status/2041518621290266632> | 30 | 66.1 | founder hybrid |
| 07-poke-drones | the Poke anthology | Poke (acq. by Cognition): drones, flamethrower, California | 2026-03 | Skale (portfolio); Skale's share unclear | <https://x.com/interaction/status/2034713714415608123> | 30 | 972.6 | live action, 16 min |
| 08-listenlabs | Listen Labs | ListenLabs, Series B | 2026-01 | Skale (portfolio) | <https://x.com/itsalfredw/status/2011469284749594774> | 30 | 57.7 | UI motion, music only |
| 09-buds | Bud | listed as Buds, pre-seed | 2026-04 | Skale (portfolio) | <https://x.com/budapp/status/2046605073741119800> | 30 | 67.0 | UI motion, music only |
| 10-taste | Taste Labs | Taste, seed | 2026-06 | Skale (portfolio) | <https://x.com/thaiscbranco_/status/2066912871649574945> | 23.976 | 84.0 | founder hybrid |
| 11-replit-1 | Replit Slides | Replit, Series D (1 of 3) | 2026-04 | Skale (portfolio) | <https://x.com/Replit/status/2049160182488576245> | 29.97 | 80.7 | UI motion, music only |
| 12-replit-2 | Replit Canvas | Replit, Series D (2 of 3) | 2026-05 | Skale (portfolio) | <https://x.com/Replit/status/2060097656207413613> | 30 | 74.3 | UI motion, music only |
| 13-replit-3 | Replit Parallel Agents | Replit, Series D (3 of 3) | 2026-05 | Skale (portfolio) | <https://x.com/Replit/status/2053891504989753817> | 29.97 | 76.3 | UI motion, music only |
| 14-adaline | Adaline | Adaline, seed | 2026-06 | Skale (portfolio) | <https://x.com/arshdilbagi/status/2065826083224834345> | 30 | 94.4 | founder hybrid |
| 15-pilot-protocol | Pilot Protocol | Pilot Protocol, seed | 2026-07 | Skale (portfolio) | <https://x.com/razvanr/status/2081756497814720657> | 23.976 | 138.0 | founder hybrid |
| 16-bevel | Bevel | Bevel, Series A | 2026-04 | Skale (portfolio) | <https://x.com/greynguyen/status/2048799663638171746> | 25 | 79.9 | UI motion, music only |
| 17-poke-7 | Poke '7' | Poke (acq. by Cognition), 7 videos | 2026-06 | Skale (portfolio) | <https://x.com/interaction/status/2062575428213285352> | 29.97 | 42.9 | UI motion, music only |
| 18-wonder-1 | Wonder (first film) | Wonder, pre-seed | 2025-08 | Skale (portfolio) | <https://x.com/aibek_design/status/1957856991608512898> | 30 | 42.8 | UI motion, music only |
| 19-wonder-2 | Wonder (second film) | Wonder, pre-seed | 2026-04 | Skale (portfolio) | <https://x.com/usewonder/status/2044099145997402272> | 24 | 43.1 | UI motion, music only |
| 20-madethis | MadeThis | MadeThis, pre-seed | 2026-07 | Skale (portfolio) | <https://x.com/jehovahscript/status/2082868450847031354> | 30 | 79.7 | UI motion, music only |
| 21-agentarcade | Agent Arcade | AgentArcade, Series A | 2026-07 | Skale (portfolio) | <https://x.com/AgentArcade/status/2077071110777029066> | 24 | 81.0 | UI motion, music only |
| 22-work-louder | Work Louder | Work Louder, bootstrapped | 2026-02 | Skale (portfolio) | <https://x.com/MarkKnd/status/2022261281114468759> | 25.091 | 17.4 | 3D CG teaser |
| 23-contra-1 | Contra Indy | Contra, Series B (first film) | 2025-08 | Skale (portfolio) | <https://x.com/contraben/status/1952725885146075406> | 24 | 30.1 | UI motion, music only |
| 24-contra-2 | Contra x fal | Contra, Series B | 2025-09 | Skale (portfolio) | <https://x.com/contraben/status/1968717444685394134> | 29.97 | 32.4 | UI motion, music only |
| 25-bolt | Bolt | Bolt.new, Series B | 2026-03 | Skale (portfolio) | <https://x.com/boltdotnew/status/2039024467846860972> | 30 | 54.5 | UI motion, music only |
| 26-tembo | Tembo | Tembo, Series B | 2025-11 | Skale (portfolio) | <https://x.com/benjaminakar/status/1985754174911627546> | 30 | 67.0 | UI motion, music only |
| 27-conduit | Conduit | Conduit, Series A | 2026-06 | Skale (portfolio) | <https://x.com/0xpunnk/status/2062598516544061537> | 30 | 92.8 | founder hybrid |
| 28-extend | Extend | Extend, Series A | 2026-05 | Skale (portfolio) | <https://x.com/kushalbyatnal/status/2059278322287214750> | 24 | 92.3 | founder hybrid |

### Acclaimed (18 films)

| id | film | brand | video title | year | maker | public URL | fps | duration s | register |
|---|---|---|---|---|---|---|---|---|---|
| linear-agent-2026 | Linear Agent | Linear | Introducing Linear Agent | 2026 | in-house | <https://www.youtube.com/watch?v=mRql2VJ99gM> | 60 | 54.9 | product camera |
| raycast-new-2025 | Raycast | Raycast | New Raycast. Coming 2026 | 2025 | in-house | <https://www.youtube.com/watch?v=Mi173xGb0ZA> | 30 | 38.6 | product camera |
| anthropic-cowork-2026 | Claude Cowork | Anthropic | Introducing Cowork | 2026 | in-house | <https://www.youtube.com/watch?v=UAmKyyZ-b9E> | 24 | 68.6 | product camera |
| cursor-2-0-2025 | Cursor 2.0 | Cursor | Introducing Cursor 2.0 | 2025 | in-house | <https://www.youtube.com/watch?v=An8IM-kPyms> | 60 | 64.5 | keynote cards + demo |
| notion-mail-2025 | Notion Mail | Notion | Meet Notion Mail | 2025 | in-house | <https://www.youtube.com/watch?v=54l-1NfXnX8> | 24 | 60.1 | keynote cards + demo |
| granola-2-0-2025 | Granola 2.0 | Granola | Granola 2.0 | 2025 | in-house | <https://x.com/meetgranola/status/1922664777815368144> | 59.999 | 29.3 | keynote cards + demo |
| figma-motion-2026 | Figma Motion | Figma | Introducing Figma Motion | 2026 | in-house; uploaded at 12 fps | <https://www.youtube.com/watch?v=l3HuAYXyOTo> | 12 | 68.2 | keynote cards + demo |
| framer-3-0-2026 | Framer 3.0 | Framer | Framer 3.0 | 2026 | uncredited | <https://www.youtube.com/watch?v=6aioEoCdBJw> | 29.97 | 75.2 | keynote cards + demo |
| notion-3-agents-2025 | Notion 3.0 | Notion | Notion 3.0 Agents | 2025 | in-house | <https://www.youtube.com/watch?v=R1cF4T4lgI4> | 24 | 90.0 | character-led (n = 1) |
| anthropic-opus-4-6-2026 | Claude Opus 4.6 | Anthropic | Introducing Claude Opus 4.6 | 2026 | BUCK, per brief (no on-screen credit) | <https://www.youtube.com/watch?v=dPn3GBI8lII> | 24 | 39.5 | kinetic type / collage |
| google-gemini-app-2024 | Google Gemini app | Google | Gemini app launch film | 2024 | Ordinary Folk | <https://vimeo.com/913062540> | 29.97 | 73.8 | kinetic type / collage |
| google-ai-mode-2025 | Google AI Mode | Google | Introducing AI Mode | 2025 | Ordinary Folk (inferred) | <https://www.youtube.com/watch?v=qbqZQFOVfA8> | 24 | 97.1 | kinetic type / collage |
| spline-hana-2025 | Spline Hana | Spline | Introducing Hana | 2025 | in-house | <https://www.youtube.com/watch?v=ZsYijIY7qBA> | 30 | 26.7 | beat-cut sizzle |
| google-m3-expressive-2025 | Material 3 Expressive | Google Design | Introducing Material 3 Expressive | 2025 | in-house | <https://www.youtube.com/watch?v=n17dnMChX14> | 60 | 38.1 | beat-cut sizzle |
| figma-glass-2025 | Figma glass | Figma | new glass effect | 2025 | in-house | <https://www.youtube.com/watch?v=H_HN0nwdox0> | 30.001 | 29.6 | beat-cut sizzle |
| arc-windows-2024 | Arc on Windows | The Browser Company | Arc on Windows | 2024 | in-house | <https://www.youtube.com/watch?v=LJQsAOon6og> | 24 | 36.6 | beat-cut sizzle |
| perplexity-comet-2025 | Perplexity Comet | Perplexity | Comet launch announcement | 2025 | Studio Freight | <https://vimeo.com/1101867116> | 24 | 41.4 | 3D / material world (n = 2) |
| apple-liquid-glass-2025 | Apple Liquid Glass | Apple | iOS 26 Introducing Liquid Glass | 2025 | in-house; presenter segments | <https://www.youtube.com/watch?v=jGztGfRujSE> | 29.97 | 273.8 | 3D / material world (n = 2) |

Registers are the primary assignments from [the acclaimed notes](notes/synthesis-acclaimed.md), section 2.

### HeyGen renders (3)

| id | composition | render in hyperframes-launches | maker | fps | duration s | kind |
|---|---|---|---|---|---|---|
| hg-codex-replica | codex-five-hour-limit-replica | `codex-five-hour-limit-replica/codex-five-hour-limit-replica.mp4` | HeyGen (Apache-2.0) | 60 | 10.15 | replica of a 10 s social clip; no audio stream |
| hg-frame-md-launch | frame-md-launch-storyboard | `frame-md-launch-storyboard/frame-md-launch-render.mp4` | HeyGen (Apache-2.0) | 30 | 60.29 | voice-led launch film; voice-only, at -31.3 LUFS with no bed (well under the -14 LUFS that website-to-hyperframes states) |
| hg-k3-promo | k3-promo | `k3-promo/k3-promo.mp4` | HeyGen (Apache-2.0) | 30 | 16.63 | dark type-led promo; composition silent, render carries a bed |

Paths are relative to the hyperframes-launches repository root (clone at d7ac350, 2026-09-26).

## Number index

Where each figure the launch-video nodes cite comes from. "Hand-timed" and "hand-counted" values were read from frames at ±1 frame in the per-film analyses, which stay local; the file named is where they are recorded.

| figure | value | produced by |
|---|---|---|
| Skale cut rate, frame-read | 4.0/min [1.9, 11.6] (n = 28, the Poke anthology excluded); UI films 4.0 [1.6, 5.4]; founder films ~13 interview-edited vs 0-3.6; live action 21.8-22.2; zero-cut films 3/29 | hand-counted; `synth_stats.py` (`cuts_read`) |
| Acclaimed cut rate, frame-read | 14.2/min [10, 18.8]; studios 3.1, in-house 15.6; by register 14.0 / 12.0 / 16.7 / 3.3 / 30.7 / 8.7; zero-cut films 2/18 | `others_stats.py` (`cuts`, `reg`, `maker`) |
| Detector agreement | 9/29 and 5/18 | notes, caveats sections; detector counts in `tables/` |
| Still share, calm share, moves/min, move runs, luma, colourfulness per corpus | Skale still 0.116 [0.071, 0.181], move 1.04 s, 25.2 moves/min; acclaimed 0.321 [0.175, 0.463], 0.416 s, 50.6/min; calm 0.51 vs 0.65 | `tables/skale.md`, `tables/acclaimed.md` (`aggregate.py`) |
| Skale by format | UI still 0.091 [0.067, 0.13], move 1.49 s (p90 5.9); founder 0.181, 0.50 s; live action 0.277, 0.25 s; light frames 0.79 in UI films | `synth_stats.py` |
| Acclaimed by register | still 0.486 / 0.368 / 0.395 / 0.171 / 0.285 / 0.176; move 0.18-1.19 s; LUFS -32.9 to -12.85; colourfulness 3.9-32.6 | `others_stats.py` (R1-R6 lines) |
| The reel at 60 fps | move run 0.192 s, p75 0.60, p90 1.39; still 0.329; 1 detected cut, 3 real | `metrics/00-skale-reel-2025.json`; Skale notes §6 |
| Motion 800 ms after a cut | Skale 0.82 [0.39, 1.50] (n = 24); acclaimed 0.58 (n = 14) | `synth_stats.py`, `others_stats.py` (`after_cut`) |
| HeyGen renders | still 0.337 (frame.md) and 0.364 (K3); move runs 0.333 and 0.317 s; after a cut 1.0 → 2.13 → 2.57 (frame.md) | `tables/heygen.md`, `metrics/hg-*.json` |
| Skale structure | first word 0.2 s [0.0, 1.3]; first seam 1.6 s; reveal 7.5 s, 9.8 s = 15 % after a problem act; problem act 18.0 s = 29 %; endcard 4.4 s, hold 1.8 s; URL 15/29; poster frame 9/29 | hand-timed, medians only; Skale notes §2-3 |
| Skale type and seams | built per word 27/29; stagger 0.18 s; hold 1.15 s; lockups ~17 letters/s; prompts ~53 chars/s; statements 5 % of frame height; slam 25-61 %; newest word marked 15/29; fill 0.33 s, zoom-through 0.33 s, dissolve 0.45 s, counters 1.15 s | hand-timed, medians only; Skale notes §2-4 |
| Time constants | objects 0.134 s (Replit Parallel Agents) and ~0.13 s (Poke '7'); counters 0.6-0.8 s (Taste Labs, Contra Indy) | hand-read frame deltas, not entered in a script; Skale notes §5; the crane's ~0.43 s in the acclaimed notes §4 #17 |
| Acclaimed structure | first word 0.68 s; first seam 2.33 s; name early 2.5 s or late 29 s = 70 %; endcard 6.3 s = 11.9 %, hold 2.05 s; card holds 1.5 s; prompts 15 c/s [13, 21] | `others_stats.py` (`first_word`, `first_seam`, `name_t`, `endc`, `hold`, `typing`) |
| Acclaimed counts | product-first 16/18; proof 4/18; poster frame 1/18; stagger ~0.21 s; cascades 0.15 s per item; zoom-through 0.35 s; human vs agent text 9/18; the agent's wait 8/13 | hand-counted; [notes/synthesis-acclaimed.md](notes/synthesis-acclaimed.md) §1, §3 |
| Skale loudness and bands | -18.1 LUFS (25/28 quieter than -14); music-only -17.7, sub 65 %, beat 0.60, LRA 4.6 LU, 1.8 % above 2 kHz; voice-led -21.7, sub 8.5 %, beat 0.09, LRA 5.75 LU | `synth_stats.py` (music-only and voice-led lines), `tables/skale.md` |
| Acclaimed loudness | -18.4 LUFS, LRA 6.45 LU; 14/18 quieter than -14; LUFS vs duration Spearman -0.57; four films of 38 s or less at -12.1 to -13.0; three walkthroughs at -32.6 to -35.8; 5/18 at or over 0 dBTP | `others_stats.py` |
| True-peak overs in Skale | Wonder's first film +1.2, Contra x fal +0.7 dBTP | `metrics/18-wonder-1.json`, `metrics/24-contra-2.json` |
| Subtract before the reveal; drop on the reveal | 23/28 and 14/18; first drop 7.3 s = 12 % in 12/18 Skale music films; low end at 3.9 s = 9 % in 10/18 | hand-counted; Skale notes §2-3; acclaimed notes §1 items 31-32, §3 |
| Foley levels | Linear Agent: typing ~+4 dB, Enter +9.2, Send +14.5 over the sub; Raycast clicks -1.4 dB, 18-24 dB clear when the sub is pulled | `probes/b2click.py` |
| Harmony | Linear Agent's key change on Send; Raycast's sub root stepping with its cuts | `probes/b2pitch.py` |
| Grid locks | Spline Hana 5 of the first 8 cuts within ±31 ms of the eighth grid; Figma glass cuts on the phrase; Framer 3.0 act seams within 15 ms | `probes/o5-grid.py` |
| Sub dropouts and returns | the sub envelopes around reveals and breakdowns | `probes/o5-subenv.py` |
| K3 sync | 32.8 % of 61 onsets within 67 ms of 62 stamped events vs 28.9 % for shifted onsets (p95 34.5 %): not locked | `heygen_k3_sync.py` |
| Camera velocity | Linear Agent 0.8 % of frame width every 0.25 s (3.2 %W/s, constant); Raycast's truck 3 → 8 %W/s; its S-curve pan | `probes/b2drift.py` |
| Camera drift in pixels | Claude Cowork 18-50 px/s on the agent's turn, under 10 px over 2.5 s on the user's | `probes/drift.py` |
| Slam words and snap zooms | Replit Slides' word at ~5× that jumps to 1× in one frame; per-frame scale curves | `probes/scalecurve.py` |
| Cadence | on twos and threes (Claude Opus 4.6); pulldown patterns | `probes/dups.py`; `held_in_move_frac` in `metrics/` |
| HeyGen census, set COMP_DEDUP (147 files) | 3,446 calls = 1,884 to + 394 fromTo + 6 from + 1,162 set; 2,284 non-set tweens, 313 of them linear; 2,064 durations, median 0.35 s [0.20, 0.55]; 86 staggers, median 0.055 s [0.035, 0.08] | `heygen_corpus_stats.py` → `digests/heygen-corpus-stats.json` |
| HeyGen census, set COMP (161 files) | median duration by ease: power2.out 0.26 s, power3.out 0.46, expo.out 0.50, linear 0.85; 481 blur targets (0 px ×207, 8 px ×64, 20 px ×45); cursor-press scales 0.84 ×43, 0.90 ×17 | same file; COMP_DEDUP gives power2.out 0.30 s, 453 blur targets, 0.84 ×32 |
| HeyGen typing | 71 hand-placed keystroke intervals: mean 0.117 s, sd 34 ms, range 0.07-0.26 s | `digests/heygen-launches.json`, corrections_to_graph #13 |
| HeyGen repository shape | 20 project folders | `digests/heygen-launches.json`, corrections_to_graph #11 |
| HyperFrames layers | internal doctrine vs distributed skills; the conflicts table | `digests/hyperframes-doctrine.json` (`doctrine_digest`, `conflicts_with_graph`, `installed_vs_latest`) |
| OpenAI register B | bed, clicks, loudness of Refreshed. and Introducing GPT-5 | [../launch-register/](../launch-register/) summaries |

## Reproduce

Needs Python 3.10+ with numpy, opencv-python and scipy, and ffmpeg and ffprobe on the path. Keep every film at its native frame rate; never re-encode to a common rate. Run from this folder:

```
python measure.py <film.mp4> <id> <outdir>        # per-film JSON and contact sheets (sheets stay local)
python aggregate.py skale "metrics/[0-9][0-9]-*.json" > skale.md
python aggregate.py acclaimed "metrics/[a-gi-z]*.json" > acclaimed.md
python aggregate.py heygen "metrics/hg-*.json" > heygen.md
python synth_stats.py
python others_stats.py
python heygen_corpus_stats.py <hyperframes-launches clone> digests/heygen-corpus-stats.json
python heygen_k3_sync.py <k3-promo.mp4> <hyperframes-launches clone>
```

From this copy, `aggregate.py` reproduces the three corpus files and table bodies byte for byte, `synth_stats.py` and `others_stats.py` print what they printed during the study followed by the lines added in review (the Skale frame-read cut rates; the studio and in-house medians), and `heygen_corpus_stats.py` over hyperframes-launches at d7ac350 reproduces `digests/heygen-corpus-stats.json` byte for byte. Probes and `measure.py` need the films: use the public URLs above; the HeyGen renders are committed in hyperframes-launches.

## Do not commit

- Media: `.mp4`, `.webm`, `.mov`, `.wav`, `.m4a`, and raw PCM dumps (`.raw`).
- Frames and contact sheets (`.jpg`, `.jpeg`, `.png`, any `frames/` folder) and any viewer page built on them.
- NumPy arrays (`.npy`) and per-frame drift or difference text dumps.
- The per-film prose analyses. They transcribe on-screen copy, voice-over lines and post text, so they stay local; the notes carry their counts.
- Clones of third-party repositories (hyperframes-launches, heygen-com/hyperframes). Cite them by path; never vendor them.
- yt-dlp `.info.json` files (uploader metadata) and URL lists beyond the film list above.
- The remaining ad-hoc probe scripts, about forty, whose numbers no node cites.

The repository `.gitignore` blocks media, frames and arrays anywhere under `docs/research/`.

## Licensing

Third-party films contribute only derived numbers and short descriptions: no frames, audio, transcripts, or on-screen copy beyond single interface words. HeyGen's hyperframes-launches and heygen-com/hyperframes are Apache-2.0; the digests cite their code, configuration, timing and a few short rule phrases by path, attributed to HeyGen, paraphrase the films' captions and voice-over, and leave out bundled media, third-party logos and fonts. The scripts, tables and notes in this folder are MIT with the rest of the repository.
