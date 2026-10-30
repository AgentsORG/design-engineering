---
title: sonner-usage
summary: Using and fixing Sonner. One Toaster at the root, toast() from client code only, theme and richColors set on purpose, a styling ladder that ends in headless toast.custom, and the causes behind missing, doubled, unstyled or buried toasts.
tags: [components, toast, sonner, troubleshooting]
---

# Sonner usage

Sonner needs two pieces: one `<Toaster />` mounted once as close to the root as possible, and `toast()` called from client code. Most Sonner bugs break one of those two, or come from defaults people assume work differently. [[sonner-principles]] covers why the library is built this way; this node covers how to use it.

## Setup

- **One Toaster, at the root** (in Next.js, the root `layout.tsx`). Rendering it per page or conditionally duplicates or drops toasts.
- **`toast()` is a plain client-side function.** It does nothing on the server; a server action returns its result and the client calls `toast()`.

## Picking the call

| Need | Call |
|---|---|
| Plain message, optional second line | `toast('Saved', { description })` |
| Typed icon | `toast.success` / `.error` / `.info` / `.warning` |
| Loading tied to a promise | `toast.promise(p, { loading, success, error })` |
| Loading you manage yourself | `const id = toast.loading(…)`, then `toast.success('Done', { id })` |
| A button | `action: { label, onClick }`; `event.preventDefault()` keeps it open |
| Your own JSX, no default styles | `toast.custom((t) => …)` |

Calling `toast()` again with the same `id` updates that toast. `duration: Infinity` persists it. `onDismiss` (close button or swipe) and `onAutoClose` (timeout) are separate callbacks.

## Styling ladder

1. Defaults, plus `richColors` and `invert`.
2. `style` per toast or via the Toaster's `toastOptions`.
3. `classNames` per part. Sonner's injected styles win the cascade, so each class needs `!important` (Tailwind `!text-…`).
4. Headless `toast.custom()`, wrapped in your own `toast()` helper. This is the end state for a design-system toast; if you're marking many classes important, go here.

## Defaults worth knowing

Position `bottom-right`, 3 visible, 4000ms duration, 14px gap when expanded, 32px edge offset (16px under 600px wide), swipe direction derived from position.

## Troubleshooting

| Symptom | Cause → fix |
|---|---|
| Nothing appears | No Toaster mounted, it unmounted, or `toast()` ran on the server |
| Appears twice | Two Toasters (layout and page), or an effect re-run by StrictMode; fire from the handler or pass a stable `id` |
| Fully unstyled (Astro, view transitions) | The injected stylesheet was lost; import `sonner/dist/styles.css` |
| Unstyled in a Shadow DOM | Copy the `[data-sonner-toaster]` style tag into the shadow root |
| Behind a modal or clipped | An ancestor creates a stacking context; mount the Toaster at the document root ([[stacking-chains]]) |
| Stuck on loading | The promise never settles |
| Shows in every toaster | Give each Toaster an `id` and pass `toasterId` |

## Gotcha

`theme` defaults to `'light'` and does not follow the OS, and success and error toasts are grey until `richColors` is set. Pass `theme="system"` or the resolved theme from your provider; this one default is behind most "dark mode is broken" reports ([[dark-mode]]).

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/ask-sonner/SKILL.md, skills/ask-sonner/API.md.
- Related: [[sonner-principles]], [[screen-reader-announcements]].
