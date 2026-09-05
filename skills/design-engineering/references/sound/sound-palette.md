---
title: sound-palette
summary: One material, a handful of sounds. Size maps to pitch and length, direction maps to meaning, consonance to success and dissonance to error. Stock packs are tells.
tags: [sound, palette, earcon, audio, design-system]
---

# Sound palette

A product's sounds are a type family, not a clip-art folder. Pick **one material** — a struck wooden bar, a soft plastic tap, a breath of filtered noise, a muted glockenspiel — and derive every sound from it, the way a palette derives every tint from one hue in [[color-monochromatic]]. Five sounds that share a material feel like a product. Five sounds from five packs feel like a browser toolbar from 2003.

## The grammar

Earcons (Blattner, Sumikawa & Greenberg, 1989) are learned, not mimetic: meaning comes from *contour* and *interval*, and users learn it in a handful of exposures.

| Dimension | Rule | Why |
|---|---|---|
| **Size → pitch and length** | Small elements tick high and short (2–6 kHz centroid, 40–120 ms). Big elements land low and long (0.8–1.5 kHz, 300–800 ms). | Physics. A card is lighter than a wordmark; the ear knows. |
| **Direction → meaning** | Rising figure = success, open, join. Falling = dismiss, leave, error. | Discord's join/leave pair; every OS you have used. |
| **Interval → valence** | Major third or perfect fifth for confirmation. Minor second or tritone for error. | Consonance reads as safe; dissonance as tense (IWC study on earcon dissonance and perceived hazard). |
| **Complexity → priority** | Simple, single-hit for frequent actions. Multi-note only for rare or urgent moments. | Frequent complex sounds fatigue in a day (Toptal). |
| **Repeat → variation** | Rapid repeats step pitch up (`playbackRate` +5–10% per hit) or randomize ±3%. | Identical repeats read as a machine; Josh Comeau's "glug" pattern. |

## A minimal family

Most products need **four to six** sounds, not forty:

| Name | Role | Shape |
|---|---|---|
| `tick` | Toggle, select, snap | Single transient, ≤ 80 ms, high |
| `tap` | Primary press in tactile products only | Dull transient with a short body, ≤ 120 ms |
| `send` | Send / save / complete | One or two notes rising, ≤ 250 ms |
| `receive` | Incoming message / notification | Two notes, lower than `send`, ≤ 400 ms |
| `error` | Rejected submit, invalid drop | Low, falling, ≤ 200 ms — paired with [[multi-segment-shake]] |
| `success` | Rare milestone | Three-note figure in the family's key, ≤ 800 ms |

Write the family down as a manifest before generating anything — `scripts/sound-family.mjs` next to `SKILL.md` takes exactly this shape and produces the files via [[sound-generation-elevenlabs]] or the built-in synth from [[sound-generation-open-source]].

## Material, not genre

Apple's sound team records real instruments — glockenspiel, kalimba, marimba — and even struck a hollow Apple Watch case with mallets to find its resonance. "Organic over futuristic" is the stated reason: familiar materials make new technology comfortable. The AI-default failure is the opposite — a glossy sci-fi "digital UI blip" that belongs to no product. Describe a *thing* (soft felt mallet on a wooden bar; a fingernail on glass; a breath through a paper cone), never a *style*.

## When to apply

Before generating or downloading a single file. Decide the material, list the family, then produce. Reviewing a product with sounds: ask whether they share a material; if not, that is the finding.

## Gotcha

Do not tune the family in isolation with headphones at midnight. Laptop speakers have nothing below ~200 Hz, so a warm low thud disappears and a bright tick becomes a needle. Design in mono, check on the worst speaker in the office, then set levels per [[sound-spec]].

## Sources

- Blattner, Sumikawa & Greenberg (1989), *Earcons and icons* — structured families of tones whose contour carries meaning.
- *Perceived Hazard of Earcons in IT Exception Messages* (Interacting with Computers, 2013) — consonance/dissonance and pitch drive perceived urgency.
- Twenty Thousand Hertz, *The Sound of Apple* (Hugo Verweij) — real instruments, organic over sci-fi, the Watch case experiment.
- Toptal, *A Quick Guide to Designing UX Sounds* — simple for frequent, complex for high-priority; mid-range frequencies.
- Josh Comeau, *use-sound* — rising `playbackRate` on repeats.
- Related: [[color-monochromatic]], [[typography-humanity]], [[ai-default-tells]].
