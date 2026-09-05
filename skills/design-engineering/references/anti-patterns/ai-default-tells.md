---
title: ai-default-tells
summary: Purple gradients, Inter, pure black dark mode, Lucide icons, lorem ipsum. The full list.
tags: [anti-patterns, ai-defaults]
---

# AI-default tells

The frame: *could this UI have been generated in 30 seconds with a prompt?* If yes, fix it. This is the consolidated list of "tells" that signal AI-default origin.

## Visual

| Tell | Fix | Linked node |
|---|---|---|
| Purple-indigo-fuchsia gradient on hero | Monochrome with one true accent | [[color-monochromatic]] |
| Inter or SF Pro on a marketing page | Pangram, Geist, Displaay, or similar | [[typography-humanity]] |
| Pure `#000` dark mode background | `#18181b` with subtle hue | [[dark-mode]] |
| Pure `#ffffff` text on dark | rgba(255,255,255,0.92) | [[dark-mode]] |
| Bootstrap-default shadow `0 2px 8px rgba(0,0,0,0.1)` | Layered shadows at 4–6% opacity, `#111` base | [[shadows-whisper]] |
| Lucide icons (the popular ones — `chevron-down`, `arrow-right`) | Phosphor, Hugeicons, Tabler | [[icon-systems]] |
| Gradient button backgrounds with no reason | Solid color + subtle shadow | [[hover-states-subtle]] |
| Same border-radius everywhere | Intentional scale | [[border-radius]] |
| Asymmetric grid on a *product* page | Reserve asymmetry for marketing | [[marketing-vs-product-ui]] |

## Layout

| Tell | Fix |
|---|---|
| Hero + 3 feature cards + FAQ section | Custom layout that matches your story |
| Centered single column from top to bottom | Vary section width based on content type |
| Identical card pattern for unrelated content | Different layouts for different content |
| "Trusted by" with 6 grayscale logos | Optional, or skip entirely |
| Every page is the same template scaled | Per-page custom design |

## Content

| Tell | Fix |
|---|---|
| Lorem ipsum or "Coming soon" | Real copy or remove the section |
| "100+ customers" | "127 customers" (specific) |
| Generated marketing copy ("Unleash your potential") | Hand-written, specific |
| Stock photography | Real screenshots or no images |
| Empty placeholder names ("John Doe", "Acme Inc") | Real-sounding examples or actual data |

## Animation

| Tell | Fix | Linked node |
|---|---|---|
| Crossfading icons | Transform/rotate single icon | [[fly-not-teleport]] |
| Same-easing animations everywhere | Custom cubic-bezier scale | [[easing-curves]] |
| Loading spinner with no eta | Skeleton, progress bar, or nothing | [[empty-loading-states]] |
| Scroll-driven hero parallax on product UI | Reserve for marketing | [[marketing-vs-product-ui]] |
| Bouncy spring on a daily-use button | Subtle, fast easing | [[delight-impact-curve]] |
| Animation on `:hover` for touch devices | Gate with `@media (hover: hover)` | [[hover-states-subtle]] |

## Sound

| Tell | Fix | Linked node |
|---|---|---|
| A click on every button, a whoosh on every transition | Sound on daily and rare moments only; silence elsewhere | [[sound-decision-framework]] |
| Recognizable stock-pack sounds (Kenney raw, the Discord ping) | One material, one generated or re-pitched family | [[sound-palette]] |
| "Futuristic UI blip" with reverb tail | Dry, short, a physical material | [[sound-spec]] |
| Sound on by default, no toggle | Off by default, discoverable persisted toggle | [[sound-playback-web]] |
| Music bed hiding unsynced hits in a launch video | Transients on contact frames, bed last or not at all | [[launch-video-sound]] |

## Microcopy

| Tell | Fix |
|---|---|
| "Get started" as primary CTA | Specific to action: "Create project", "Try it" |
| "Awesome!" success message | Quieter: "Saved.", "Done." |
| "Oops!" error message | Plain: "Couldn't save. Try again." |
| AI-generated tooltip phrasing ("Click here to view...") | Imperative, short: "View details" |

## When to apply

Use this as a **review checklist** when auditing a UI that "feels generated." Most pages have 3–5 tells from this list. Removing them transforms the feel.

## Gotcha

This list is not anti-AI — it's anti-default. Many AI-generated UIs are excellent because the prompter knew to specify these things. The tells appear when no one specified anything. The fix is opinion, not avoidance of generation.

## Sources

- guidelines.sh — the bulk of this list.
- Benji Taylor — content authenticity, real data.
- Emil Kowalski — animation tells.
