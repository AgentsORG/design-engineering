---
title: sticky-and-scroll-tells
summary: Background-blur on sticky sections is an AI tell. Scroll hijacking confuses users. Native scroll usually wins.
tags: [layout, sticky, scroll, anti-pattern]
---

# Sticky and scroll tells

Two of the most overused (and easiest-to-misuse) page-level patterns: blurred sticky nav, and scroll hijacking. Both signal "AI-generated landing page" when applied generically.

## Blurred sticky nav — the AI tell

```css
/* The pattern that gives it away */
.nav {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
}
```

This pattern is fine *in moderation* and *with context-specific tuning*. But the default-AI-output version is:
- 12px blur (too strong).
- 70% white background (too opaque).
- Universal application (sticks on every page, even pages where it shouldn't).
- No border-bottom for separation (so scrolled content bleeds under the nav awkwardly).

The result: every AI-generated landing page in 2025–2026 has the same blurred nav. It's become a *tell*.

## What to do instead

Pick one of these:

### A. Solid sticky with subtle separation

```css
.nav {
  position: sticky;
  top: 0;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-default);
}
```

Cleaner, faster (no GPU blur), no AI smell.

### B. Hide on scroll-down, show on scroll-up

```ts
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelector('.nav').style.transform =
    y > lastY && y > 100 ? 'translateY(-100%)' : 'translateY(0)';
  lastY = y;
});
```

The nav appears when the user wants it (scrolling up, presumably to navigate) and stays out of the way otherwise.

### C. No sticky at all

For long-form content (articles, docs), the nav can simply scroll off-screen. The user scrolls back to top when they want nav. This is the calmest option.

### D. Blur — but tuned

If you genuinely want the blur effect, tune it:
- `backdrop-filter: blur(6px)` (not 12px).
- `background: rgba(var(--bg-base-rgb), 0.85)` (matches your palette, not pure white).
- Add `border-bottom: 1px solid var(--border-default)` for clean separation.
- Apply *only* on marketing pages, not in-product.

## Scroll hijacking — avoid

"Scroll hijacking" = the page intercepts the user's scroll input and does something other than scroll (snap to sections, trigger animations, change layout). Examples:

- `scroll-snap-type` on a long page where the user wants to scroll freely.
- Parallax that decouples scroll speed from visual movement.
- Section-by-section snap navigation that prevents the user from skimming.
- "Scroll-jacking" entrance animations that lock the scroll until they complete.

These confuse users because the OS scroll feels broken — the same gesture produces different results in different contexts.

## When scroll-snap *is* the right answer

Limited cases:

- **Horizontal carousels** — scroll-snap-x on a single-row carousel is the right answer. The user expects each card to land aligned.
- **Image galleries with explicit slides** — vertical scroll-snap on a presentation-style page with discrete slides.
- **Story-driven onboarding** — first-time experiences where you specifically want each "step" to land precisely.

In all these cases, the *vertical page scroll* should still be free. Snap only the contained scroll, not the page scroll.

## Scroll-driven animations — judiciously

`scroll-driven animations` (the new CSS feature) are powerful and worth knowing. They let you scrub an animation as the user scrolls — e.g., a hero image scales up as the user enters its viewport.

The right uses:
- **Reveal-on-scroll** — content fades/scales in as it enters the viewport. Subtle.
- **Progress indicators** — a top-of-page progress bar fills as the user scrolls.
- **Parallax (gentle)** — backgrounds move at 0.7x scroll speed for depth. NEVER 0.3x or below (causes nausea).

The wrong uses:
- Anything that *changes the scroll behavior* itself.
- Anything that *slows* the user's perceived scroll.
- Anything that animates as the user scrolls *up* differently than down — feels broken.

## When to apply

- Designing any landing page with a top nav.
- Reviewing a PR that adds sticky behavior or scroll-driven animation.
- Auditing for AI-default tells ([[ai-default-tells]]).

## Gotcha

`backdrop-filter: blur()` is GPU-cheap but interacts weirdly with `position: sticky` and `overflow: hidden` parents in some browsers. Always test on Safari + Firefox before shipping a blurred sticky nav.

Also: `scroll-snap` on iOS Safari can interact poorly with the URL bar collapsing. Test on real iPhone before shipping snap-based layouts.

## Sources

- guidelines.sh — "Background blur on sticky sections is an AI giveaway" + "Avoid scroll hijacking."
- web.dev — scroll-driven animations docs.
- Related: [[viewport-custom-design]], [[ai-default-tells]], [[transform-opacity-only]].
