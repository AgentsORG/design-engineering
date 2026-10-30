---
title: mobile-platform-layer
summary: The viewport, keyboard, scroll and browser-chrome fixes that make a web app feel installed — the baseline meta tag, dvh vs svh, safe areas in all four directions, the Android keyboard, scroll lock through a dialog primitive, overscroll none vs contain, per-scheme theme-color, text-size-adjust — each with its reason, verified on a real phone.
tags: [layout, mobile, viewport, keyboard, ios, android, pwa]
---

# Mobile platform layer

Most "feels like a website on my phone" reports are not design problems. They are a handful of platform defaults — the URL bar, the keyboard, the notch, the rubber band — each fixed by one declaration that matters only where its reason applies. Reach for a media query or meta tag before JavaScript, and gate by capability, never by user agent. [[touch-and-focus]] owns taps, hover and focus; this node owns the frame those live in.

## Baseline, before the first component

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" />
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
```

```css
html { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; overscroll-behavior: none; }
```

In Next.js these are the root layout's `viewport` export (`viewportFit`, `interactiveWidget`, `themeColor: [{ media, color }]`). Never `user-scalable=no` or `maximum-scale=1`: fix the sub-16px input that caused the zoom ([[forms-behavior]]).

## The rules and their reasons

- **Height.** `100vh` is the viewport with the chrome *collapsed*, so on load it overflows by the URL bar. App shells and bottom-pinned UI use `100dvh`; heroes use `min-height: 100svh`, because `dvh` re-lays-out mid-scroll. Tailwind's `h-screen` carries the old bug; use `h-dvh` / `min-h-svh`.
- **Safe areas.** `viewport-fit=cover` paints under the notch; `env(safe-area-inset-*)` pads content back. Without the meta tag every inset is `0px`. Headers take top, tab bars and sheets take bottom, sidebars take left/right in landscape. Inside `calc()` give a fallback: `env(safe-area-inset-bottom, 0px)`.
- **Keyboard.** iOS shrinks the visual viewport; Android Chrome overlays the keyboard on the page. `interactive-widget=resizes-content` makes Android resize too, so a composer at the bottom of a `100dvh` column rides above it with no script. A fixed bottom CTA hides the last field: pad the scroller by the CTA height plus the bottom inset. Never autofocus on a coarse pointer.
- **Overscroll.** `none` on the root stops pull-to-refresh and the page rubber band in an app; `contain` on inner scrollers keeps their own bounce without chaining to the page. Drop the root rule on a document where pull-to-refresh is welcome. Never `touchmove` + `preventDefault()`: it blocks scroll and makes the listener non-passive.
- **Scroll lock.** Behind a modal or sheet, lock through a dialog primitive (Base UI, Radix, vaul). `overflow: hidden` on `body` is ignored by iOS touch scrolling.
- **Status bar.** One `theme-color` per scheme, matched to the top of the page (the header), not the brand colour; update the tag on a class-based theme toggle. A PWA's manifest colours are the same decision.
- **Anchors** clear a sticky header with `scroll-margin-top` equal to its height; cap that header, since 80px is a quarter of a landscape phone.

## Prove it on hardware

Emulation reproduces none of this. Serve on `0.0.0.0`, open by LAN IP; Safari → Develop → device on iOS, `chrome://inspect` on Android. Use a phone a few years old, with the keyboard open, once in landscape, and installed as a PWA if that ships — standalone changes the viewport, insets and status bar.

## Gotcha

`dvh` everywhere is the overcorrection: a hero sized in `dvh` jumps as the URL bar collapses mid-scroll, which is exactly the jank the fix was for. Shells track the chrome; first screens don't.

## Sources

- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/mobile-native/SKILL.md.
- Related: [[touch-and-focus]], [[forms-behavior]], [[growth-and-overflow]], [[sticky-and-scroll-tells]], [[cmd-mobile]].
