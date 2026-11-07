---
title: cards-design
summary: Don't nest cards. Design card interiors intentionally — whitespace, hover-only actions, subtle icons.
tags: [components, cards]
---

# Cards design

Cards are easy to over-use and easier to over-nest. A well-designed card is a self-contained unit of content with intentional interior structure. Nested cards are usually a sign the design has lost its way.

## The no-nesting rule

```
Bad:  card > card > card (three borders, three shadows, three radii)
Good: card > content with internal hierarchy (one border, one shadow)
```

If you find yourself reaching for a card-inside-a-card, the inner card is probably:
- A list item (use a `<li>` with hover state, not a card).
- A heading + content block (use typography hierarchy, not a wrapped container).
- A status indicator (use a badge or chip inline, not a card).

The exception: a *single* call-out card inside a parent card (e.g., a pinned highlight) can work. Beyond that, you're overusing the pattern.

## Designing card interiors

A card is a small layout problem. Its interior deserves the same care as a screen:

- **Whitespace beats borders for separating sections.** A 24px gap between header and body reads cleaner than a 1px divider.
- **Hover-only actions** for editing, deleting, more options. Show them on `:hover` (or always on touch).
- **Subtle icons** to anchor information types — but don't add an icon to every line. One per card maximum, usually.
- **Variable density inside.** A list of recent activity inside the card can be tighter than the card's outer padding.

Example card structure:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Project Atlas</CardTitle>
    <CardActions show-on-hover>{/* Edit, Archive, Share */}</CardActions>
  </CardHeader>
  <CardMeta>
    <Icon name="folder" /> 12 files · Updated 2h ago
  </CardMeta>
  <CardBody>
    <p>Brief description that fits on 2–3 lines max.</p>
  </CardBody>
  <CardFooter>
    <AvatarStack avatars={collaborators} />
    <Badge>Active</Badge>
  </CardFooter>
</Card>
```

## Card hover states

Most cards in a grid should have a hover state. See [[hover-states-subtle]] — the right answer is usually:

- 1px lift (`transform: translateY(-1px)`).
- Slight background-color shift on the card body.
- Hover-only action buttons fade in.

NOT a 4px lift, NOT a large shadow change. Those are the [[ai-default-tells]].

## Cards as the wrong choice

Cards aren't always the right container. Alternatives:

| Content | Better than card |
|---|---|
| A list of items the user reads top-to-bottom | Use a list with hover rows |
| A single highlighted piece of content | Use typography hierarchy + whitespace |
| Status that updates frequently | Inline badge or pill |
| Tabular comparison data | Use a real table ([[data-is-content]]) |
| Long-form content | Use sections with headers, not cards |

If your screen is *all* cards, it probably has no hierarchy. Some content earns a card; most doesn't.

## When to apply

- Grid of equally-weighted items (projects, products, users).
- Bento layouts on landing pages.
- Dashboards with discrete widgets.
- Anywhere the content is self-contained and benefits from a clear boundary.

## When NOT to apply

- Long-form reading.
- Single-focus screens (each card competes with the focus).
- Lists where every row is just text + metadata (use rows, not cards).
- Inside an already-cardified container.

## Reference

```css
.card {
  --pad: 16px; /* 12 small, 20 large: one value on every side */
  --inner: max(4px, calc(var(--radius) - var(--pad))); /* radius for a group inside */
  display: grid; gap: 12px; padding: var(--pad);
  box-shadow: inset 0 0 0 1px var(--line), 0 1px 2px rgba(0, 0, 0, 0.04); /* ring drawn inside */
}
```

- **Bad → good:** `padding: 20px 16px 12px` plus a title `margin-bottom: 18px` → one padding value, spacing from `gap`, and the ring inset so it never adds to the padding; measure the inset to the avatar's and button's edges, not their words.
- **Gold example:** `stageshow/examples/cards/`: a comment card, a flush card split by edge-to-edge rules, and a group inside it drawn as a sunken tone with no shadow and its radius taken from the card's. That is the no-nesting rule's answer: a tone, not a second card. Benji's call differs on separation: his `Card` spaces children 12px apart and divides sections with 1px rules (`data-flush`), where this node prefers a 24px gap over a divider.
- **Check:** screenshot at 2x and measure the four insets (equal) and the inner radius (outer minus padding, never under 4px); a card whose bottom inset differs from its top is the fix.

## Gotcha

The nested-radius rule from [[border-radius]] applies: if a card has `border-radius: 12px` and contains a media (image, video) that fills the top, the media needs `border-radius: 12px 12px 0 0` to match. Most "this card looks off" complaints trace to a mismatched nested radius.

## Sources

- guidelines.sh — "Don't nest cards" + "Design card interiors intentionally."
- Linear, Notion, Vercel — bento and grid card patterns in production.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/parts/Card.css`, `stageshow/examples/cards/index.tsx`, `stageshow/references/craft.md` (Spacing and alignment: floating cards pad the same all round).
- Related: [[hover-states-subtle]], [[border-radius]], [[ai-default-tells]], [[shadows-whisper]].
