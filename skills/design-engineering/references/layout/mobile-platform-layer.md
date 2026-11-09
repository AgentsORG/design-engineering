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

- **Height.** `100vh` is the viewport with the chrome *collapsed*, so on load it overflows by the URL bar. App shells and bottom-pinned UI use `100dvh`; heroes use `min-height: 100svh`, because `dvh` re-lays-out mid-scroll. Tailwind's `h-screen` carries the old bug; use `h-dvh` / `min-h-svh`. `lvh` is the old `vh` under a new name and almost never what you want.
- **Safe areas.** `viewport-fit=cover` paints under the notch; `env(safe-area-inset-*)` pads content back. Without the meta tag every inset is `0px`. Headers take top, tab bars and sheets take bottom, sidebars take left/right in landscape. Inside `calc()` give a fallback: `env(safe-area-inset-bottom, 0px)`.
- **Keyboard.** iOS shrinks the visual viewport; Android Chrome overlays the keyboard on the page. `interactive-widget=resizes-content` makes Android resize too, so a composer at the bottom of a `100dvh` column rides above it with no script. A fixed bottom CTA hides the last field: pad the scroller by the CTA height plus the bottom inset. Never autofocus on a coarse pointer.
- **Overscroll.** `none` on the root stops pull-to-refresh and the page rubber band in an app; `contain` on inner scrollers keeps their own bounce without chaining to the page. Drop the root rule on a document where pull-to-refresh is welcome. Never `touchmove` + `preventDefault()`: it blocks scroll and makes the listener non-passive.
- **Scroll lock.** Behind a modal or sheet, lock through a dialog primitive (Base UI, Radix, vaul). `overflow: hidden` on `body` is ignored by iOS touch scrolling.
- **Status bar.** One `theme-color` per scheme, matched to the top of the page (the header), not the brand colour; update the tag on a class-based theme toggle. A PWA's manifest colours are the same decision: an installed iOS PWA also reads `apple-mobile-web-app-status-bar-style`, set together with the manifest's `theme_color` and `background_color`, and `<meta name="color-scheme" content="light dark">` sits beside the two theme-color tags when both schemes ship.
- **Anchors** clear a sticky header with `scroll-margin-top` equal to its height; cap that header, since 80px is a quarter of a landscape phone.

## Prove it on hardware

Emulation reproduces none of this. Serve on `0.0.0.0`, open by LAN IP; Safari → Develop → device on iOS, `chrome://inspect` on Android. Use a phone a few years old, with the keyboard open, once in landscape, and installed as a PWA if that ships — standalone changes the viewport, insets and status bar. The Xcode Simulator beats desktop emulation for viewport and insets, but it still can't show how touch feels.

## Reference

A checkout screen with a pinned Pay button over a form:

- Bad: `main { height: 100vh } .pay { position: fixed; bottom: 0; left: 0; right: 0; height: 56px }`. On load the button sits under the URL bar, rests on the home indicator, and the last field hides behind it.
- Good:

```css
.shell { height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; }
.header { padding-top: env(safe-area-inset-top, 0px); }
.form { overflow-y: auto; overscroll-behavior: contain; }
.pay { margin: 12px 16px calc(12px + env(safe-area-inset-bottom, 0px)); }
```

Gold example: Emil Kowalski's `skills/mobile-native/SKILL.md`, the source this node distils.

Check: open it by LAN IP on a real phone, focus the last field with the keyboard up, then turn to landscape. Pay stays visible above the keyboard and inside the margins, and nothing sits under the notch or the island. Benji Taylor's rule for drawn phones holds for real ones too: nothing under the island, and a sheet or its grabber starts below the status bar.

## Gotcha

`dvh` everywhere is the overcorrection: a hero sized in `dvh` jumps as the URL bar collapses mid-scroll, which is exactly the jank the fix was for. Shells track the chrome; first screens don't.

## Sources

- Emil Kowalski's design-engineering practice, distilled by AgentsORG.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/mobile-native/SKILL.md.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/mobile-native/SKILL.md §3, §10, §11 (`lvh`, the PWA status-bar meta and `color-scheme`, the Simulator's limit).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/craft.md` (Chrome and devices: nothing under the island, a sheet or grabber below the status bar).
- Related: [[touch-and-focus]], [[forms-behavior]], [[growth-and-overflow]], [[sticky-and-scroll-tells]], [[cmd-mobile]].
