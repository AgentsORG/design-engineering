---
title: dependency-discipline
summary: Replicate simple utilities. Draw shapes in CSS. Prefer native browser APIs over libraries. The bundle is design.
tags: [philosophy, dependencies, performance, restraint]
---

# Dependency discipline

A 5MB JS bundle is a design choice. So is a 50KB one. So is choosing `moment.js` over `Intl.DateTimeFormat`. So is reaching for `axios` when `fetch` exists.

The principle: **every dependency you add is a tax** — bundle size, security surface, version drift, license review, time-to-interactive. The bar for adding one should be higher than "it's convenient."

This is a philosophy node, not a tactical one. It applies before any CSS or motion decision.

## Replicate simple utilities

Before adding `lodash` for one helper, consider whether you can write it in 5 lines:

```ts
// 'lodash/uniq'
const uniq = <T,>(arr: T[]): T[] => [...new Set(arr)];

// 'lodash/groupBy'
const groupBy = <T, K extends string>(arr: T[], key: (x: T) => K) =>
  arr.reduce((acc, x) => ({ ...acc, [key(x)]: [...(acc[key(x)] ?? []), x] }), {} as Record<K, T[]>);

// 'classnames' — useful, but trivial to write
const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');
```

If you only use 2 functions from a 70KB library, write the 2 functions.

## Draw simple shapes in CSS, not images

Before adding an SVG file or PNG for a shape:

```css
/* Triangle */
.triangle {
  width: 0; height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 16px solid var(--accent);
}

/* Circle */
.circle { width: 16px; height: 16px; border-radius: 50%; background: var(--accent); }

/* Donut */
.donut { width: 32px; height: 32px; border: 4px solid var(--accent); border-radius: 50%; }

/* Chevron via border + rotate */
.chevron {
  width: 8px; height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
}
```

No HTTP request, no decoded image bytes, no `alt` text to maintain. The shape is in the stylesheet.

## Prefer native browser APIs

The web platform has shipped a lot in the last decade. Many libraries that "everyone uses" are obsolete.

| Library | Native replacement |
|---|---|
| `moment.js` (300KB) | `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat` |
| `axios` | `fetch()` (with a thin wrapper for JSON parsing) |
| `lodash` (most uses) | `Array.from`, `.flat`, `.includes`, `.at`, `Object.fromEntries` |
| `classnames` | One-line `filter(Boolean).join(' ')` helper |
| `uuid` | `crypto.randomUUID()` |
| `query-string` | `URLSearchParams` |
| jQuery | DOM API + `closest()`, `matches()`, `querySelector()` |
| `intersection-observer-polyfill` | Native IntersectionObserver (universal since 2019) |

Audit your `package.json` annually. Many production apps have 5+ MB of dependencies because someone added `moment.js` in 2017 and no one removed it.

## When to add a dependency anyway

- **The library is large and complex** to write correctly: cryptography (`@noble/hashes`), framework runtimes (React, Vue), date parsing edge cases (`date-fns` over reinventing).
- **The library has a security team** maintaining it (`@stripe/stripe-js`, OAuth clients).
- **The library is small and focused** with a clear single purpose (`nanoid`, `clsx`).
- **The team's velocity matters more than the bundle** (early-stage product, internal tool).

These are real reasons. "It's convenient" is not.

## When to apply

- Before `npm install <anything>` — pause for 30 seconds. Can you write the 5 lines instead?
- During PR review — flag new dependencies, ask whether the alternative is a 10-line utility.
- At quarterly audits — `npx bundle-phobia` or `webpack-bundle-analyzer` on the bundle. Anything over 100KB is a budget item.

## Gotcha

This rule applies in proportion to the project's expected lifetime and audience. A throwaway prototype can `import _ from 'lodash'` and ship in an afternoon. A production app shipping to mobile users across slow networks pays for that dependency every page load forever. Calibrate.

## Sources

- Ben DC — [frontend-guidelines](https://github.com/bendc/frontend-guidelines) — "Favor native methods."
- Vercel — bundle-size as a design dimension.
- web.dev — "Tame third parties," bundle audits.
- Related: [[transform-opacity-only]] and [[debugging-animations]] (the performance-is-design framing lives in those motion nodes), [[unseen-details-compound]].
