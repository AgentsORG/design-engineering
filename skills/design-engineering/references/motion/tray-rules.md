---
title: tray-rules
summary: Six rules for tray-style modal stacks — user-initiated, varied heights, single focus, title + dismiss, context preservation, transient actions.
tags: [motion, modal, tray, benji]
---

# Tray rules

Benji Taylor's six rules from Family for designing tray (or "sheet" / "drawer") UI — the modal pattern where successive overlays stack on top of the previous one without dismissing it.

## The six rules

### 1. User-initiated

Trays open in response to a user action — never automatically, never on page load, never on idle timeout. If you find yourself wanting to "interrupt the user with a tray," that's the wrong pattern. Use a banner, toast, or in-line message instead.

### 2. Heights must vary

Successive trays in a stack must have **noticeably different heights**. Same-height trays look like the UI broke — the user can't tell whether the tray actually changed.

```
First tray:  height 320px (account form)
Second tray: height 480px (review and confirm — taller, includes summary)
Third tray:  height 240px (final confirmation — shorter, just buttons)
```

The variation does the heavy lifting of communicating "you're somewhere new." Without it, the stack feels frozen.

### 3. Single focus

Each tray has **one primary purpose**. One question to answer. One choice to make. One form to fill. If you find yourself adding a secondary action or a second question, that's a second tray.

This is the opposite of the desktop-modal pattern where modals are stuffed with multiple sections. Trays are mobile-first and constrained — one thing per tray.

### 4. Title + dismiss are always present

Every tray has:
- A **clear title** at the top stating what this tray is for.
- A **dismiss affordance** — usually an X in the top-right corner, plus tap-outside-to-dismiss, plus swipe-down-to-dismiss on touch.

Both are mandatory. A tray without a title is disorienting; a tray without a dismiss is hostile.

### 5. Preserve context (overlay, don't displace)

Trays should **overlay** the previous content, not navigate to a new screen. The previous content stays visible (dimmed) behind the tray. The user always sees where they were.

This is what makes tray flows feel calm vs. modal flows or full-page navigations. You're still "here" — you've just risen a layer.

```css
.tray-backdrop {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px); /* optional, can feel theatrical */
}
.tray {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* tray content rises from bottom */
}
```

### 6. Transient actions only

Trays are for **actions the user will complete and dismiss** — not for long-running tasks, multi-step flows, or persistent UI. If the user needs to come back to a screen, it's not a tray.

Typical tray tasks:
- Confirm a purchase.
- Enter a one-time code.
- Pick a recipient.
- Rename a thing.
- Adjust a single setting.

Things that are NOT trays:
- Multi-screen onboarding (use full-page navigation).
- Settings panels (use a dedicated screen).
- Help docs (use a sidebar or external link).

## When to apply

- Mobile-first apps where modal stacks are the primary navigation between transient actions.
- Confirmation flows where each step adds context (review → confirm → success).
- Inline editing of complex objects ("Edit profile" → "Edit avatar" sub-tray).

## When NOT to apply

- Desktop power-user UIs where users want side-by-side panels. Trays cover the underlying content; power users hate that.
- Long forms. A 12-field form is not a tray — it's a screen.
- Multi-step wizards with branching paths. Use a full screen with a progress indicator.

## Gotcha

The "varied heights" rule (#2) is the one most teams break. They build one tray component, set a fixed height, and stack it. The result feels broken even though each tray works in isolation. The fix is to allow per-tray height — content-driven, not container-driven.

Also: the dismiss interaction must respect [[gesture-momentum]]. Swipe-down-to-dismiss requires velocity-aware threshold logic, not just "swipe more than 50px."

## Sources

- Benji Taylor — *Family Values*, [benji.org/family-values](https://benji.org/family-values).
- Related: [[fly-not-teleport]], [[gesture-momentum]], [[responsive-feedback]], [[cards-design]] (the broader modal/card-design rules).
