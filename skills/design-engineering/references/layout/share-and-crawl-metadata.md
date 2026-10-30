---
title: share-and-crawl-metadata
summary: A public page is read by people in tabs, by link previews in chat apps, and by crawlers — each needs a real title, description, image and crawl rule. Wire the template; take the words from the page; and walk the one paying flow end to end before launch.
tags: [layout, marketing, seo, metadata, launch]
---

# Share and crawl metadata

Launch day *is* people pasting the link into chat. A page with no title shows its URL in the tab, in search and in every preview; a framework default title is worse; a missing preview image turns the link into a bare URL and a broken one into a grey box. Wiring the metadata is a fix. **The words are content**: take the title from the page's `h1` and the description from existing copy (the hero subhead, a post's excerpt), and flag the gap when there is nothing to take. [[marketing-surface-rules]] owns motion, performance and CTAs on these pages; this node owns what machines read.

## Titles and descriptions — blocker

- One title template in the root layout (`%s · Product`), and per-route metadata on every public route. Dynamic routes generate theirs from the record, not a static string.
- Set the production origin as the metadata base. Without it, relative preview-image URLs resolve to localhost in production.
- The same title on every route is a finding: tabs, history and screen-reader users can't tell pages apart.

## Link previews — should fix, blocker when the launch depends on sharing

Open Graph image at least 1200×630, the large-image card type, and a file that actually exists. Per-page images only when a generator already exists; a site-wide image is fine otherwise. A missing image can't be invented, so it goes on the human list. Device check: paste the production URL into two chat apps and look.

## Crawl rules — should fix

- A leftover staging `Disallow: /` or a site-wide `noindex` de-indexes the whole site: **blocker**.
- The sitemap lists real pages and excludes scaffolding and auth-gated routes ([[leftovers-and-leaks]]).
- A canonical link on any page reachable at more than one URL.

## Icons — should fix

The product's own favicon, an SVG icon, and an `apple-touch-icon` (without it iOS uses a page screenshot for a home-screen shortcut). Check the favicon on a dark tab bar. A web manifest with the framework's default name is a finding.

## The conversion path — blocker

The one flow that pays for the launch: landing, CTA, signup or checkout, first screen. Every link resolves; the price on the pricing page matches the billing config; the plan the button names is the plan checkout opens; the post-signup redirect exists. Hunt test-mode payment links (`/test_` in a checkout URL), placeholder social handles, and newsletter forms that post nowhere. Code can find a price mismatch but not settle it: state both values and ask which is right.

## Analytics — should fix

Loaded once, from the root layout, async or through the framework's script strategy. Whether a consent banner is legally required is the user's decision; note what tracking exists and leave it on the human list. A banner that pushes content down when it mounts is a layout-shift finding ([[empty-loading-states]]).

## Gotcha

Deciding the CTA by reading cookies in the marketing layout opts the whole page out of static rendering. Keep the page static and resolve the signed-in state on the client.

## Sources

- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- Related: [[ship-check]], [[content-authenticity]], [[marketing-vs-product-ui]].
