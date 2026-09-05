---
title: marketing-surface-rules
summary: Marketing pages earn a bigger motion budget and still overspend it. Motion maps to input, intros play once per session, everything pre-renders, fonts and hero images preload, nav content stays in the DOM, CTAs know who is looking, docs are for copying, blogs and changelogs are feeds.
tags: [layout, marketing, landing, docs, blog, performance]
---

# Marketing surface rules

[[marketing-vs-product-ui]] says *why* marketing tolerates more expression. This node is the build checklist: what a landing page, blog, docs site, or changelog has to do to be fast, readable, and honest. A visitor sees the page once, not a hundred times a day, so the animation budget is larger; it is still small, and restraint is the house style.

## Motion

- **Motion maps to user input.** No scroll-triggered fade-ups, no scroll hijacking, no parallax that isn't 1:1 with scroll, no auto-advancing carousels. If the user didn't cause it, cut it.
- **Intro animations play once per session.** Gate hero reveals and logo sequences with `sessionStorage` so internal navigation skips them but a genuinely new visit sees them. `localStorage` would kill them forever.
- Hover-revealed content still obeys [[touch-and-focus]]: gated, and never the only route.

## Performance

- **Pre-render everything.** Blog, docs, changelog — build-time generation with revalidation, never request-time fetching.
- **Kill layout shift at the source.** Preload fonts (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) and above-the-fold images; lazy-load the rest. See [[performance-discipline]].

## Structure

- **Content lives in the DOM.** Hover-revealed nav submenus are visually hidden, not mounted on hover — crawlers and assistive tech need the real markup.
- **CTAs know who's looking.** Logged-out: "Get started". Logged-in: "Open app". Never "Sign up" to a signed-in user.
- **First viewport**: brand, one headline, one supporting line, one CTA group, one dominant visual. No card soup, stat strips, or floating promo chips — see [[unslop-pass]].
- **Code-built illustrations** get `role="img"` + `aria-label`, `user-select: none`, and `pointer-events: none` unless interactive.

## Docs, blogs, changelogs

- **Docs are for copying.** A copy button on every snippet; every page exportable as markdown (a "Copy as Markdown" button and `.md` URLs such as `/docs/getting-started.md`) — people and the models reading your docs both want it; a visual example for every concept.
- **Blogs and changelogs are feeds.** RSS at predictable paths (`/blog/rss.xml`, `/changelog/rss.xml`); `text-wrap: balance` on article headings.

## Pre-ship checklist

- [ ] No scroll-triggered animation, hijacking, non-1:1 parallax, or auto-carousel
- [ ] Intro gated behind `sessionStorage`
- [ ] Fonts and hero image preloaded; no shift on load
- [ ] Content pages statically generated with revalidation
- [ ] Nav submenu content present in the DOM when closed
- [ ] CTAs switch copy and destination on auth state
- [ ] Snippets have copy buttons; pages export as `.md`; concepts have visual examples
- [ ] RSS live; headings balanced
- [ ] Code illustrations labeled, unselectable, inert
- [ ] The [[ai-default-tells]] deletion pass has run

## When to apply

Creating or reviewing any public-facing page, and any time parallax, a carousel, or a scroll animation is tempting.

## Gotcha

"Marketing tolerates more motion" is read by agents as "marketing wants more motion". The permitted extra is one first-run hero moment. A page where every section animates in is the AI-default look, not expression.

## Sources

- Emil Kowalski's design-engineering practice on marketing pages, distilled by HKTITAN.
- Related: [[marketing-vs-product-ui]], [[performance-discipline]], [[unslop-pass]], [[viewport-custom-design]].
