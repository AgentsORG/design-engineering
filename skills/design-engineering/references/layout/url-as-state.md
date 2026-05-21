---
title: url-as-state
summary: Filters, tabs, pagination, panels — all live in the URL. Back/forward restores everything including scroll.
tags: [layout, url, state, deep-linking]
---

# URL as state

The URL is the single source of truth for *visible* UI state. Filters, sort, current tab, expanded panel, open modal, pagination cursor — all of it lives in query params or the path.

The reason: a URL you can share is a feature. A URL you can bookmark is a feature. A URL the back button can restore to *exactly the same view* is a feature.

## The rule

Anything a user can see right now should be reconstructable from the URL. If they paste the URL into a new tab, they land on the same view — same tab open, same filters applied, same row expanded.

## What goes in the URL

| State | Where | Example |
|---|---|---|
| Current page | path | `/projects/acme/issues` |
| Tab selection | query param | `?tab=closed` |
| Filters | query param (comma-separated) | `?status=open,blocked&assignee=me` |
| Sort | query param | `?sort=-updated_at` |
| Pagination cursor | query param | `?cursor=eyJpZCI6...` |
| Open panel / modal | query param | `?panel=settings` or `?modal=invite` |
| Search query | query param | `?q=auth+bug` |

## What does NOT go in the URL

- Form draft state (use local storage).
- Auth state (cookies / session).
- Transient UI feedback (toast visibility).
- Cursor position inside text fields.
- Hover/focus state.

## Back/forward must restore scroll

When the user navigates back, the scroll position restores to where they were — automatically for `<a href>` and `history.pushState`, broken if you intercept with `e.preventDefault()` and don't restore.

```ts
// Save scroll on navigation away
useEffect(() => {
  return () => sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
}, [pathname]);

// Restore on mount
useEffect(() => {
  const saved = sessionStorage.getItem(`scroll:${pathname}`);
  if (saved) window.scrollTo(0, parseInt(saved));
}, [pathname]);
```

Most SPA routers (Next.js, React Router) do this automatically — verify yours does. If you've broken it with a custom scroll lock, fix the scroll lock.

## Deep-link every modal

A modal at `?modal=invite-team` should be openable directly via that URL. If a user shares "look at this invite flow," they should be able to paste the URL and land on the open modal.

Don't put modals in component state when they could be in URL state. The cost is one query param; the gain is shareability.

## When to apply

Every page-level state change. Filters, tabs, sort, search, modals, expanded rows. If you find yourself reaching for `useState` for something a user can *see*, ask if it should be in the URL instead.

## Gotcha

URL state and component state can drift. Use a single source — read from the URL (via `useSearchParams` or equivalent), write through the router. Don't mirror URL state into local state — that's a bug surface.

Also: long URLs (more than ~2000 chars) break in some places. If your URL state is getting that big, compress it (base64-encoded JSON) or move some of it to a server-side state (with a short URL key).

## Sources

- Vercel Web Interface Guidelines — "URL as state," "Deep-link everything," "Scroll positions persist."
- Related: [[states-are-the-work]] (each URL state is a real state to design), [[viewport-custom-design]].
