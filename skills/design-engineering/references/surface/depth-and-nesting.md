---
title: depth-and-nesting
summary: Inner radius = outer − padding. Shadows elevate, borders separate. Dark mode collapses shadows to a ring. Hairlines at 0.5px on retina, image outlines pure black or white at 10%, fades by mask, themes by flipping variables.
tags: [surface, radius, shadows, borders, dark-mode, gradients]
---

# Depth and nesting

Depth comes from how surfaces meet: the radius where they nest, the shadow or border that separates them, the gradient that fades them out. Most interfaces that feel "off" fail here, and every fix is cheap. This node is the mechanical layer under [[shadows-whisper]] (the *weight* of shadows) and [[border-radius]] (the *scale* of radii).

## Derive nested radii

A rounded child inside a rounded parent gets its radius by subtraction: **inner = outer − padding**. Copying the parent's radius pinches the corner gap, and it is the most frequent single giveaway of an unpolished UI. Past a ~24px gap the surfaces read as independent and each radius is picked on its own.

```css
.dialog { border-radius: 16px; padding: 6px; }
.dialog-body { border-radius: 10px; }   /* 16 − 6 */
```

## Shadows elevate, borders separate

Pick by the job the line is doing:

- **Raised** (cards, menus, popovers, dialogs, hover lift, anything crossing mixed backgrounds) → a stacked translucent shadow. Transparency composites with whatever is underneath, so one token works everywhere; a solid border color was tuned for exactly one background.
- **Separated** (row dividers, table gridlines, form-field edges, dense hairline rules) → keep the border. A visible input edge is an accessibility feature; converting it to a shadow costs users and gains nothing.

```css
:root {
  --elevation-raised: 0 0 0 1px rgb(0 0 0 / .05), 0 1px 3px rgb(0 0 0 / .05), 0 4px 10px -4px rgb(0 0 0 / .05);
}
.dark { --elevation-raised: 0 0 0 1px rgb(255 255 255 / .09); }   /* shadows vanish on dark; a ring does the job */
.panel { box-shadow: var(--elevation-raised); transition: box-shadow 150ms ease-out; }
```

Three ingredients: a 1px spread standing in for the border, a tight crisp layer, a wide soft ambient layer. On hover transition `box-shadow` only. In dark mode every stack collapses to one low-opacity white ring, because there is nothing dark enough for a shadow to fall on.

## Hairlines, outlines, fades

- **Hairlines at 0.5px on ≥2× displays** via a media-query variable, 1px fallback. Retina dividers at 1px read heavy.
- **Every image gets a 1px inset outline** — `outline: 1px solid rgb(0 0 0 / .1); outline-offset: -1px`, white at 10% in dark. Never a tinted neutral or the accent: a tinted line picks up the surface behind it and reads as grime.
- **Eased gradients**, never two-stop linear ones between solids (they band). **Fades by `mask-image`**, not a gradient overlay: a mask composites with any background. Never fade scrollable content; it hides what the user is scrolling toward.
- **One depth cue per surface.** Border *and* shadow *and* ring *and* gradient on one card is hedging.
- **The shadow goes on the outlined shape, never a wrapper**, and a ring drawn as `inset 0 0 0 1px` never adds to the padding (Benji Taylor, Stageshow `references/framing.md` rule 8; `kit/parts/Card.css`).

## Themes flip variables, not classes

Define a numbered scale as CSS variables and swap the values under the dark selector. Per-component `dark:` overrides scatter the theme across the codebase and rot on the first palette change.

## When to apply

Styling any card, container, dialog, dropdown, or image; any nested rounded surface; any dark-mode pass. Review symptom → fix: pinched corners → derive the radius; card looks stamped on → shadow token; cards vanish in dark → ring; stripes in a gradient → eased stops; dirty image edges → pure black or white outline; `dark:` everywhere → flip variables.

## Reference

A shadow per relationship, not one shadow for everything (Stageshow `kit/stage.css`, light theme):

| Layer | Shadow | Why this one |
|---|---|---|
| Hero window on the page | `0 0 0 1px rgba(0,0,0,.06), 0 30px 60px -12px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3)` | the ring keeps the top edge visible on a light ground |
| Satellite over the hero | `0 0 0 1px rgba(0,0,0,.04), 0 14px 32px -8px rgba(50,50,93,.24), 0 4px 10px -4px rgba(0,0,0,.1)` | tight on purpose: a wide blur smears on a white window |
| Lone small window on open ground | `0 0 0 1px rgba(50,50,93,.06), 0 24px 48px -24px rgba(50,50,93,.18)` | the satellite's dark contact reads harsh here |
| Card at rest | `inset 0 0 0 1px var(--line), 0 1px 2px rgba(0,0,0,.04)` | ring inside, so the padding stays even |

Benji's call differs on dark: Stageshow keeps the white hairline plus a deep black drop (`0 14px 32px -8px rgba(0,0,0,.7)` on a satellite) and moves satellites onto a lighter `#26262a` surface, rather than collapsing to the ring alone.
Gold example: `stageshow/examples/overlap/` (a checkout card in front of its dashboard, stopping inside the sidebar so it covers filler, never the table) and `stageshow/examples/cards/` (a sunken group whose radius is taken from its card's).
Check: count the distinct `box-shadow` values on the page; each must map to one row above. Then look at the satellite over the white window at 100%: a gray halo around it means the wide token went on the wrong layer.

## Gotcha

The shadow-over-border rule is about *elevation*, not every line. Agents that read it as "delete all borders" strip the edges off inputs and table cells, which is a regression, not polish.

## Sources

- Emil Kowalski's design-engineering practice on surfaces, distilled by HKTITAN.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/stage.css` (shadow tokens, light and dark), `stageshow/kit/parts/Card.css`, `stageshow/references/framing.md` (rule 8, Recipes), `stageshow/references/craft.md` (A page of demos), `stageshow/examples/overlap/`, `stageshow/examples/cards/`.
- Related: [[shadows-whisper]], [[border-radius]], [[dark-mode]], [[color-scales-oklch]].
