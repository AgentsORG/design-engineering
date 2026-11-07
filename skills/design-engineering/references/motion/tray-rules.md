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

- A tray is pinned by the edge it opened from and fits its content before its first frame; it never corrects its size while opening (Benji Taylor, Stageshow `references/motion.md`).

### 3. Single focus

Each tray has **one primary purpose**. One question to answer. One choice to make. One form to fill. If you find yourself adding a secondary action or a second question, that's a second tray.

This is the opposite of the desktop-modal pattern where modals are stuffed with multiple sections. Trays are mobile-first and constrained — one thing per tray.

### 4. Title + dismiss are always present

Every tray has:
- A **clear title** at the top stating what this tray is for.
- A **dismiss affordance** — usually an X in the top-right corner, plus tap-outside-to-dismiss, plus swipe-down-to-dismiss on touch.

Both are mandatory. A tray without a title is disorienting; a tray without a dismiss is hostile.

- A released tray carries on at the finger's speed: build the dismiss curve so its first slope equals the release velocity, with no step or pause at the hand-over (Benji Taylor, Stageshow `examples/swipe/index.tsx`).

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

## Reference

A send-money stack, one job per tray, each a different height:

| Tray | Height | Title | One primary action |
| --- | --- | --- | --- |
| 1 | 320px | Pick a recipient | tap a row |
| 2 | 480px | Review payment | Confirm $24.00 |
| 3 | 240px | Sent | Done |

Bad: "Review payment" replaces "Pick a recipient" at the same 320px in one frame, the X in the same spot, so nothing says the user moved.
Good: "Review payment" rises over it to 480px in 0.5s `cubic-bezier(0.3, 0.75, 0.1, 1)` (Stageshow's quick in-app phone response), bottom edge pinned, sized before its first frame, the first tray still visible behind the dimmed backdrop.
Gold example: `stageshow/teaching/relationships.tsx` (surface resize: outline and content as one continuous change, even when reversed mid-way) and `stageshow/examples/swipe/index.tsx` for a release thrown at the finger's speed.
Check: film the hand-over and a swipe-down release at 390px, stepped at 40ms. The bottom edge never lifts (the rule behind Stageshow's `anchor drift` check: an open sheet holds the edge it opened from), no frame shows the outline ahead of its content, and the release frame shows no change of speed.

## Gotcha

The "varied heights" rule (#2) is the one most teams break. They build one tray component, set a fixed height, and stack it. The result feels broken even though each tray works in isolation. The fix is to allow per-tray height — content-driven, not container-driven.

Also: the dismiss interaction must respect [[gesture-momentum]]. Swipe-down-to-dismiss requires velocity-aware threshold logic, not just "swipe more than 50px."

## Sources

- Benji Taylor — *Family Values*, [benji.org/family-values](https://benji.org/family-values).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/motion.md` (Things that appear, travel and leave; Phones in motion), `stageshow/examples/swipe/index.tsx`, `stageshow/teaching/relationships.tsx` (surface resize), `stageshow/scripts/jumps-core.mjs` (`anchor drift`).
- Related: [[fly-not-teleport]], [[gesture-momentum]], [[responsive-feedback]], [[cards-design]] (the broader modal/card-design rules).
