---
title: empty-loading-states
summary: Empty states direct action. Skeletons hint structure. Spinners under 3s; progress bars over 3s.
tags: [components, states, loading]
---

# Empty and loading states

Most UIs are designed for the "happy" state — data present, user knows what to do. The states that are actually painful to use are empty (no data yet) and loading (data not yet rendered).

## Empty states

A good empty state has three jobs:

1. **Explain what should be here.** "No projects yet."
2. **Direct the next action.** "Create your first project →"
3. **Optionally provide context or example.** Screenshot, demo data, learn-more link.

A bad empty state just says "Nothing here" and ends. The user is left wondering what to do next.

```tsx
<EmptyState
  icon={<FolderIcon />}
  title="No projects yet"
  description="Projects organize your work and let you invite collaborators."
  action={<Button>Create project</Button>}
/>
```

## Loading state choice tree

| Expected duration | UI |
|---|---|
| 0–800ms | Nothing. Spinner introduced after 800ms (avoids flash). |
| 800ms–3s | Spinner (animated). |
| 3s–15s | Progress bar with percentage. |
| 15s+ | Progress bar + estimated time + cancel button. |
| Unknown / streaming | Skeleton placeholders matching layout shape. |

## Skeletons

A skeleton placeholder hints at the **shape** of incoming content (rectangles where text will be, circles where avatars will be). It is *not* a decorative loading element.

```tsx
<div className="space-y-2">
  <div className="h-4 w-32 bg-zinc-200 rounded animate-pulse" />
  <div className="h-3 w-48 bg-zinc-200 rounded animate-pulse" />
</div>
```

Rules:
- **Match the real layout.** A skeleton list with 3 items should reveal to a list with ~3 items, same widths, same gaps. Otherwise the layout jumps when content arrives.
- **No skeleton for under-300ms loads.** The flash is worse than nothing.
- **Pulse animation is the only animation.** Don't get clever with shimmer overlays unless your entire product has that energy.

## Spinners are the wrong default

A perpetually-spinning loader signals "we have no idea how long this will take." That's almost never true. Most loads are <3s. Most slow loads can show real progress.

The most common "loading" mistake is reaching for `<Spinner />` when a skeleton, a progress bar, or just-wait-300ms would be better.

## When to apply

- Every list, table, or content area: design the empty state.
- Every async action: pick a loading pattern from the table.
- Every form submit: provide feedback under 100ms (a disabled button state) and a loading indicator after 300ms.

## Gotcha

Don't auto-redirect from empty states ("nothing here, going to home..."). That feels like the app broke. Let the user see the empty state and choose the next step.

## Sources

- guidelines.sh — "Spinners <3s; progress bars >3s; skeletons hint at structure."
- Emil Kowalski — Sonner skeleton patterns.
- Brad Frost — "loading state best practices."
