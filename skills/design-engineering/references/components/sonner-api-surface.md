---
title: sonner-api-surface
summary: The Sonner calls and options past the basics. JSX in the default shell vs headless toast.custom, function titles for links, cancel, dismiss one or all, reading active toasts, icons, unstyled, plus the symptoms of toasts that never close, swipe the wrong way or crowd a phone's edge.
tags: [components, toast, sonner, api]
---

# Sonner API surface

Most Sonner work needs only the calls in [[sonner-usage]]. This node is the rest of the surface, so an agent reaches for an existing option instead of rebuilding one. The rule that decides between them: if you are marking more than a few classes `!important` to restyle a toast, stop and go headless.

## Call → effect

| Call | Effect |
|---|---|
| `toast(<Jsx />)` | Your JSX inside Sonner's default toast shell |
| `toast.custom((t) => <Jsx />)` | Headless: your JSX, Sonner's position, stack and swipe; `t` is the id to dismiss |
| `toast(() => <a href="…">View</a>)` | A function as title or description, for links or components in the text |
| `cancel: { label, onClick }` | The secondary button; clicking it closes the toast |
| `toast.dismiss(id)` / `toast.dismiss()` | Close one toast / close every toast |
| `useSonner()` | `{ toasts }` inside React |
| `toast.getActiveToasts()` | The active toasts, from outside React |
| Toaster `icons`, toast `icon`, or `null` | Replace the type icons globally, per toast, or remove one |
| `unstyled: true` | Drops the default styles; a halfway step, since headless gives more control for the same work |

The `<Toaster />` can sit in a Next.js layout that is a server component; only `toast()` must run on the client.

## More symptoms

| Symptom | Cause → fix |
|---|---|
| Never closes | `duration: Infinity`, `dismissible: false`, or `toast.promise` on a promise that neither resolves nor rejects |
| Swipe dismisses the wrong way, or not at all | Directions follow `position`; set `swipeDirections` on the Toaster |
| Cramped against a phone's edge | `offset` applies on desktop (32px), `mobileOffset` under 600px (16px); each takes a number, a CSS string or a per-side object |

## Defaults people miss

`expand` is off, so the stack opens only on hover. There is no close button until `closeButton` is set. `Alt+T` focuses the toast region; keep that hotkey, because it is how keyboard users get to a toast ([[keyboard-patterns]]).

## Gotcha

Reaching for `toast.custom` to put a link in a toast throws away the default shell for one anchor. A function title (`toast(() => …)`) keeps the shell and the link. The counter-case is the design-system toast: once the product has its own toast look, headless `toast.custom` wrapped in your own helper is the end state, as the styling ladder in [[sonner-usage]] says.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/ask-sonner/SKILL.md (Picking the call, Styling, Troubleshooting), skills/ask-sonner/API.md (Toaster props, toast options, Functions).
- Related: [[sonner-principles]], [[screen-reader-announcements]], [[stacking-chains]].
