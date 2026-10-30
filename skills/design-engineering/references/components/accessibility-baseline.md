---
title: accessibility-baseline
summary: Keyboard-everywhere, :focus-visible, hit targets, ARIA names on icon buttons, polite aria-live for async. The a11y floor below taste.
tags: [components, accessibility, a11y, keyboard]
---

# Accessibility baseline

A11y is below taste. Below polish. Below brand. A product that fails the baseline is broken — no amount of motion or typography fixes that.

These are the rules every component should pass before any design judgment is applied.

## Keyboard

- **Everything interactive is reachable by Tab** in source order. If you can't get to it without a mouse, it doesn't exist for ~10% of users.
- **`:focus-visible` rings**, not `:focus` rings — the latter triggers on click, the former only on keyboard. Don't show a focus ring after a mouse click.
- **Custom focus rings beat `outline: 2px solid blue`.** Match your brand — a 2px solid + 1px shadow ring in the brand accent is the modern pattern — as long as it clears 3:1 against every colour it crosses and survives forced colours ([[wcag-thresholds]]).
- **Trap focus in modals and dialogs.** Tab can't escape. `Esc` closes. Focus returns to the trigger element on close.
- **Skip links** at the top of every page for screen-reader and keyboard users. `<a href="#main">Skip to content</a>` — visually hidden until focused.
- **Enter submits forms**, `⌘+Enter` (or `Ctrl+Enter`) submits in textareas. Never break these.
- **DOM order is visual order.** `order`, `row-reverse` or absolute positioning that reorders the screen makes Tab jump around it; reorder the markup, not the CSS. A positive `tabindex` is always wrong.
- **Tooltips hold no interactive content.** A tooltip can't take focus, so a link inside it is unreachable; that content belongs in a click-opened popover.

## Page structure

Screen-reader users jump by landmark and heading. Every route has one `<main>`, one `h1`, and heading levels that never skip (pick the level from the outline, the size from the type scale). `<html lang>` is set, and a client-side route change updates `document.title`, or every tab reads the same.

## Hit targets

| Surface | Minimum |
|---|---|
| Pointer (desktop) | 24×24px |
| Touch (mobile / tablet) | 44×44px (per Apple HIG) |

A 16px icon button needs *padding* to hit these — don't make the visible chrome the touch target.

## ARIA + semantics

- **HTML semantics first**, ARIA second. `<button>` beats `<div role="button" tabindex="0">` every time.
- **Icon-only buttons need an `aria-label`.** A `<button><Icon /></button>` is a button with no name.
- **`<label for="…">` on every form input.** A `placeholder` is not a label.
- **`aria-live="polite"`** for async status updates ("Saved", "Uploading", "Error"). `assertive` only for errors. Which mechanism, and how to make it actually speak: [[screen-reader-announcements]].
- **`alt=""` on decorative images** — empty alt, not missing alt. Screen readers skip them.

## Color and contrast

- **Don't rely on color alone.** Errors get an icon AND red. Required fields get an asterisk AND a different background. Color-blind users (~8% of men) read no signal otherwise.
- **APCA over WCAG 2** for contrast math — see [[contrast-and-color-scheme]] for the threshold table.

## Motion

- **`prefers-reduced-motion`** is non-negotiable. See [[prefers-reduced-motion]].
- **Media follows it too.** An animated GIF or AVIF sits in a `<picture>` whose animated `<source>` has `media="(prefers-reduced-motion: no-preference)"`, with a static `<img>` fallback. A looping CSS animation pauses on a representative frame (`animation-play-state: paused` plus a negative `animation-delay`), not on frame 0.

## When to apply

Every component, every PR. Run through the keyboard test at minimum:
1. Tab through the page. Can you reach everything?
2. Is the focus ring visible?
3. Can you Enter / Space to activate?
4. Can you Esc to dismiss?

## Gotcha

Don't ship custom `<select>` or `<combobox>` components unless you've truly implemented all of: keyboard nav, type-ahead, screen-reader announcements, mobile keyboard handling. Most "custom select" components fail half of these. Use Radix UI, React Aria, or the native `<select>` instead.

## Sources

- Vercel Web Interface Guidelines — Interactions and Content sections.
- bendc/frontend-guidelines — "Don't rely on color alone."
- Emil Kowalski's design-engineering practice, distilled by HKTITAN — DOM order, tooltips, page structure, reduced-motion media.
- WCAG 2.2 + Apple HIG hit-target guidance; the criterion numbers are in [[wcag-thresholds]], custom-widget key maps in [[keyboard-patterns]].
- Related: [[hover-states-subtle]], [[forms-validation]], [[prefers-reduced-motion]], [[contrast-and-color-scheme]].
