---
title: review-checklist
summary: Audit table — thirty-nine common UI issues, each with a grep and a fix. Scan against this before signing off.
tags: [meta, review, checklist]
---

# Review checklist

A pre-flight checklist for UI code review. Scan the user's code against each row. If any row applies, write it up using [[review-format]].

## The checklist

| # | Issue | Quick check | Fix | Node |
|---|---|---|---|---|
| 1 | `transition: all` | Grep for `transition: all`, Tailwind `transition-all` (and bare `transition`, which is `all` too) | Specify `transform, opacity` (or other GPU-safe properties) | [[transform-opacity-only]] |
| 2 | `scale(0)` entrance | Grep for `scale(0)`, `scale: 0` | Use `scale(0.95)` + opacity | [[never-scale-from-zero]] |
| 3 | `ease-in` on UI | Grep for `ease-in` (not `ease-in-out`) | Use `ease-out` or custom cubic-bezier | [[easing-curves]] |
| 4 | Animation duration > 300ms on product UI | Search durations in app routes and components | Most UI is <300ms; exits shorter than entries; longer only for rare or marketing moments | [[duration-table]] |
| 5 | Crossfade between two icons | Two icons in same slot with opacity transitions | Transform a single icon (rotate, morph); unrelated glyphs cross-fade with scale 0.25 → 1 and blur 4px → 0 ([[interfaces-reconciliation]]) | [[fly-not-teleport]] |
| 6 | No `prefers-reduced-motion` guard | Grep for `@media (prefers-reduced-motion` | Add for any translate/scale animation | [[prefers-reduced-motion]] |
| 7 | `:hover` on touch | Grep for `:hover` (and Tailwind `hover:` with motion) without a media query gate | Wrap hover-driven motion in `@media (hover: hover) and (pointer: fine)` | [[hover-states-subtle]] |
| 8 | Default Bootstrap shadow | Grep for `box-shadow: 0 2px` (or similar) | Layered shadows at 4–6% opacity | [[shadows-whisper]] |
| 9 | Pure `#000` dark mode | Grep for `background: #000` (or `black`) | Use `#18181b` or `#1a1a1a` | [[dark-mode]] |
| 10 | Loading indicator that flashes, or never comes | `<Spinner />` rendered immediately on async calls; a page-level spinner; a wait with no indicator at all | Delay any indicator ~150ms, show something by 400ms; skeletons for content, spinners only inside controls | [[empty-loading-states]] |
| 11 | Inter / SF Pro on marketing page | Check font-family on landing/marketing routes | Use a less-default sans (Geist, Pangram, Displaay) | [[typography-humanity]] |
| 12 | Sound with no mute, or on by default | Grep for `AudioContext`, `new Audio(`, `useSound`; look for a persisted toggle | Off by default, discoverable toggle, persisted; never sound-only information | [[sound-playback-web]] |
| 13 | Sound on hover / focus / keystroke, or on page load | Grep for `play(` inside `mouseenter`, `focus`, `keydown`, or module scope | Delete it; sound belongs to daily and rare moments only | [[sound-decision-framework]] |
| 14 | Gradient text | Grep `bg-clip-text`, `background-clip: text`, `text-transparent` | Solid ink; let size and weight carry emphasis | [[ai-default-tells]] |
| 15 | Tiny tracked caps (eyebrows, kickers) | One class string with `uppercase` + `tracking-wide*` + `text-xs`; class names `eyebrow`, `kicker`, `overline` | Delete the label, or fold its words into the heading | [[line-length-tracking]] |
| 16 | The generated-page purple | Tailwind `(bg\|text\|from\|to\|via\|border\|ring)-(purple\|violet\|indigo\|fuchsia)-NNN`; `#6366f1 #8b5cf6 #7c3aed #a855f7 #4f46e5 #9333ea` | A colour from the contract or the brand; a `.design` or [[pov]] colour that happens to be violet wins | [[ai-default-tells]] |
| 17 | Framework default status colours | `#3b82f6 #2563eb #10b981 #22c55e #ef4444 #f59e0b` | Take accent and status colours from the scale | [[color-scales-oklch]] |
| 18 | Emoji as UI | Code points U+1F300–1FAFF, U+2600–27BF in markup or copy | An icon from the set, or nothing; [[pov]] allows one in a notification | [[icon-systems]] |
| 19 | Placeholder data shipped | `Acme`, `John Doe` / `Jane Doe`, `example.com`, `123 Main St`, `lorem ipsum` | Believable names, amounts that add up, real units | [[content-authenticity]] |
| 20 | `100vh` / `h-screen` | Grep `h-screen`, `height: 100vh` | `100svh` / `100dvh`; size a section to its content | [[viewport-custom-design]] |
| 21 | Looping attention animation | `animate-(bounce\|ping\|pulse)` | Delete; a pulse is for a live state only | [[animation-decision-framework]] |
| 22 | Em-dash habit | More than ~4 `—` across the page's copy | A full stop or a comma; one or two a page | [[copy-tells]] |
| 23 | A custom widget with no keyboard | `role="button"`, `role="tab"`, `role="menuitem"` with no `onKeyDown`; `<div onClick`; a positive `tabIndex` | The native element, or the APG key map; tabindex 0 or −1 only | [[keyboard-patterns]] |
| 24 | A live region mounted with its text | `{msg && <div role="status"`, or `aria-live="assertive"` on a success toast | Render the region empty first, then set its text; success is `role="status"` | [[screen-reader-announcements]] |
| 25 | Submit disabled until valid | `disabled={!isValid}` on a submit button | Keep it enabled; validate on submit, focus the first invalid field | [[forms-validation]] |
| 26 | Primitive colour in a component | `var(--blue-600)` or `bg-blue-600` in a component file; `--color-primary` beside `--color-text-primary` | A semantic role token; the brand is `accent` | [[color-token-tiers]] |
| 27 | Input text under 16px on phones | `text-sm`/`text-xs` or `font-size` < 16px on `input`, `textarea`, `select` with no mobile override; `maximum-scale=1` in the viewport meta | `text-base md:text-sm`; never lock zoom | [[line-behavior]] |
| 28 | Arbitrary z-index | `z-index: 9999`, `z-50` scattered, any value not on the scale | A fixed scale, or `isolation: isolate` | [[z-index-strategy]] |
| 29 | Weight changes on hover or selected | `hover:font-semibold`, `:hover { font-weight`, `.active { font-weight` | Hold weight; signal with colour or an indicator | [[type-scale-and-rhythm]] |
| 30 | Icon-only button with no name | `<button>` whose only child is an `<svg>`/icon, with no `aria-label` or visually-hidden text | An `aria-label` naming the action ("Search", not "icon") | [[accessibility-baseline]] |
| 31 | Core action reachable only on hover | Actions inside `group-hover:`/`:hover` reveals with no focus or touch route | Visible on `:focus-within` and on touch, or always visible | [[touch-and-focus]] |
| 32 | Focus ring removed | `outline: none` / `outline-none` with no `:focus-visible` replacement | A neutral `:focus-visible` outline with `outline-offset: 2px` | [[accessibility-baseline]] |
| 33 | Faked bold or italic | No `font-synthesis: none` at the root; weights requested that aren't loaded | Declare it; load the weights you use | [[type-scale-and-rhythm]] |
| 34 | Layout properties animated | `transition` or keyframes on `width`, `height`, `top`, `left`, `margin` | `transform` and `opacity` | [[transform-opacity-only]] |
| 35 | Unbounded list, no virtualization | `.map(` over fetched or user-growing arrays with no windowing | Virtualize past ~50 rows | [[performance-discipline]] |
| 36 | Disabled by opacity | `opacity-50`/`opacity: .5` on `:disabled` or `disabled:` | Dedicated disabled tokens | [[contrast-and-color-scheme]] |
| 37 | Undesigned scheme declared | `color-scheme: light dark` or a dark `theme-color` on an app with no dark theme | Declare only the schemes that exist | [[contrast-and-color-scheme]] |
| 38 | Theme-blind SVG | `fill="#fff"`, `fill="#000"`, `stroke="white"` inline in icons or logos | `currentColor` or a CSS variable | [[dark-mode]] |
| 39 | Truncation with no way out | `truncate`, `line-clamp-*`, `text-overflow: ellipsis` on meaningful text with no `title`, tooltip or expand | Give the full string a route | [[line-behavior]] |

## Workflow

1. Read the code top to bottom once for context.
2. Run through the checklist row by row, noting which apply.
3. Open [[ai-default-tells]] for any visible defaults beyond this checklist.
4. Write the review using [[review-format]] (Before / After / Why table), one row per applicable issue.
5. If nothing applies — say so. "Looks good, nothing to change" is a valid review.

## When to use

Every UI code review. This is the systematic pass *before* the taste-driven pass. A launch film is not UI code: review it with [[launch-video-review]].

## Gotcha

Don't run the checklist mechanically without context. Item 4 ("duration > 400ms") is fine for rare-moment animations (see [[delight-impact-curve]]) — it's a flag, not a rule. Always check the context before writing the row.

Also: the checklist is not exhaustive. The most valuable reviews catch what's *not* on this list. Use it as a floor, not a ceiling.

## Sources

- Emil Kowalski — Review Checklist section of [emilkowalski/skill](https://github.com/emilkowalski/skill).
- Jakub Krehel, interfaces skills (MIT, HEAD `592aedc`): the Before-you-finish tables in `better-accessibility`, `better-colors` and `better-ui` — rows 23–26 and the row-5 fix.
- Leonxlnx, taste-skill v2.1.1 (MIT, HEAD a9c73c3): `skills/taste-skill/scripts/lint.mjs` — the patterns behind rows 14–22. Its mono, numbering, hairline, shadow and terracotta rules are its owner's taste and are not adopted (`references/research.md` §6).
- Related: [[review-format]] for the output format, [[ai-default-tells]] for broader visual audit.
