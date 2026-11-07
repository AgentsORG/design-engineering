---
title: pov-example-swiggy
summary: Example pov.md forked to Swiggy's brand system — one orange squircle pin across a family of businesses, Gilroy in ExtraBold and Medium, everything inside a rounded bento panel, pill buttons, Salt instead of grey, and a primary colour per business (Instamart blue, Dineout green) with Swiggy Orange as the shared second colour.
tags: [pov, opinion, customizable, swiggy, brand-architecture, brand]
---

# Point of View: Swiggy (example)

> An example fork of [[pov]], kept for reference. To use it, copy this file over `references/meta/pov.md`. It condenses three published Swiggy books: the masterbrand guidelines and the Instamart and Dineout brandbooks. All three call themselves a starting point and ask for judgement, so treat these as defaults, not walls.

**This install is forked to Swiggy's brand system**: a family of businesses (food delivery, Instamart groceries, Dineout restaurants) held together by one mark, one typeface and one layout device, with a different primary colour per business. Where a section below contradicts a canonical node, **this file wins**. Where it is silent, canon holds.

## The stance, in one line

One orange pin, one typeface, one rounded panel; each business changes the lead colour, never the system.

## 1. Brand architecture: one system, a colour per business

| Business | Primary | Shared second colour | Ground |
| --- | --- | --- | --- |
| Swiggy (masterbrand) | Swiggy Orange `#ff5200` | — | White, Salt `#ffede3` |
| Instamart | Instamart Blue `#0050ff` | Swiggy Orange | Salt `#fdf5ee`, white |
| Dineout | Dineout Green `#0eaf79` | Swiggy Orange | White |

- The orange squircle pin stays orange in every business; only the wordmark and the lead colour change. That is what makes a sub-brand read as family and still stand apart.
- The lead colour dominates (orange on the masterbrand, roughly 85–90 % blue for Instamart, most of the area green for Dineout); the orange appears as a small band or corner.
- Each name is written exactly: Swiggy, Instamart, Dineout. No variants in any medium, and lowercase only inside the logos.

## 2. Colour: a few hues, strict pairings

- Use the stated tints, never invented ones: orange runs `#fc5200 → #f58b55 → #f8ae88 → #fad2bb → #fdf5ee`.
- Text and background pair only from each book's allowed matrix. Never orange on blue, blue on orange, or orange on green; never light text on Salt or on the fluorescent accents ([[contrast-and-color-scheme]]).
- Accents are for buttons, links and nudges only, and sparingly: Instamart's fluorescent `#a4fffd`, Dineout's aqua `#66edca` and lime `#d1f843`.
- Orange on white is about 3.2:1, so it carries large type, fills and buttons, not body text ([[wcag-thresholds]]).

## 3. Type: Gilroy, two favourite weights

- One family, Gilroy, ten weights. ExtraBold and Medium are the favourites; Light for body.
- Headline ExtraBold with leading at size × 1.1; subhead Medium at × 1.1; body Light at × 1.4. Sentence case everywhere.
- Make the line that carries the promise ExtraBold (for Instamart, "in just 10 minutes"); in premium, photo-led work, set the headline Light and keep ExtraBold for the highlighted words only ([[type-scale-and-rhythm]]).

## 4. Layout: everything sits in a bento panel

- Content lives inside a large rounded panel whose corners match the logo's squircle, on a Salt or white ground ([[border-radius]]).
- The logo sits top-left or top-centre inside the panel: never right-aligned, bottom-left or small.
- Instamart adds an orange band along the bottom (a quarter of the height in landscape, a fifth in square and portrait). Copy sits top-left; the call to action is a pill.
- Buttons are pills: white on the lead colour or the lead colour on white ([[component-api-design]]).

## 5. Imagery and voice

- Food and product photography is warm; Dineout's is moody and aspirational (low light, rich surfaces, hands rather than faces).
- Copy is short, punchy and sentence case, with wordplay and Hinglish where people would use it ("Dry day?", "India ka Santa"); offer numbers set bold. The books give no voice rules, so this is read from their examples ([[copy-voice]]).

## 6. The mark

The logo is an orange squircle with a white location pin cut into an S, beside the wordmark. Use the official files only: never outline, shadow, bevel, gradient, rotate, shear, stretch or recolour it, never set the wordmark alone or in capitals, and never place the colour logo on orange or an off-brand hue. Clear space is one letter of the wordmark on every side; on screen it never goes below 140px wide (horizontal) or 100px (stacked).

## Where this overrides the canonical graph

| Canon says | This fork says |
| --- | --- |
| Neutral surfaces from a grey scale ([[color-monochromatic]]) | Salt, a warm orange-tinted off-white, instead of grey |
| Layout from a column grid ([[page-frame]]) | Everything inside one rounded bento panel |

## Sources

- Swiggy, *Masterbrand Internal Guidelines* (PDF, 57 pp, modified 2025-09-08), *Instamart Rebrand Brandbook* (80 pp, 2025-11-12) and *Dineout Brandbook* (55 pp, 2025-11-12), published at swiggy.com/corporate (read 2026-11-07). Values are theirs, paraphrased; where a book contradicts itself, the stated value is used.
