---
title: svg-creation
summary: Author SVG that is clean, editable, and on the token system — viewBox always, paths when it will animate, currentColor and CSS variables, defs and symbols, named layers, SVGO with the right flags off, title and desc — and the tells of generated SVG.
tags: [svg, vector, icons, illustration, tokens, accessibility]
---

# Creating SVG

An SVG is markup, not a picture, and the quality of the markup decides everything downstream: whether it recolors with the theme, whether it can be animated without rewriting it, whether it is 2 KB or 200 KB, whether a screen reader can name it. Draw for the DOM you will have to live with.

## Structure

- **`viewBox` always, no fixed width/height on the root.** `viewBox="0 0 24 24"` defines the coordinate system; size comes from CSS. Hardcoded dimensions are how icons refuse to scale.
- **Whole-number coordinates on a sensible grid** (24 for icons, 100 or 1000 for illustrations). Half-pixel coordinates blur on 1× screens; a 16px icon is redrawn, not scaled down — see [[icon-systems]].
- **Primitives for static shapes, `<path>` for anything that will animate or morph.** `<rect>` and `<circle>` are readable and small; a morph needs paths with matching commands ([[svg-path-morphing]]).
- **Group by meaning, name the layers.** `<g id="arm-left">`, `<g data-layer="eyes">`. A mascot with unnamed groups cannot be animated by anyone, including you next week. Order groups back-to-front like a compositor.
- **`<defs>` for gradients, filters, masks; `<symbol>` + `<use>` for repeats.** One definition, many instances; the file stays small and one edit changes every instance.
- **Never embed rasters.** A base64 PNG inside an SVG is a PNG with worse compression.

## Color that follows the system

- Set `fill="currentColor"` on monochrome icons and color them from CSS. The token system reaches inside the file for free.
- Multi-color illustrations expose **CSS custom properties with fallbacks**: `fill="var(--mascot-skin, #f2c9a0)"`. Dark mode becomes a variable flip, not a second file ([[depth-and-nesting]]).
- Keep the palette to the tokens — three colors for a spot illustration ([[icon-systems]] owns the illustration rules). Gradients only from `<defs>` and only when the brand has one.

## Optimize, carefully

Run SVGO (`npx svgo file.svg --multipass`), but keep `viewBox` (`removeViewBox: false`), keep the ids and `data-*` you animate against (`cleanupIds` off for those), and keep `<title>`/`<desc>`. Round path precision to 1–2 decimals; strip editor metadata, empty groups, and default attributes. Check the result renders identically before committing.

## Accessibility

Meaningful graphics: `role="img"` plus `<title>` (and `<desc>` for detail) as the first child, and `aria-labelledby` pointing at them. Decorative graphics: `aria-hidden="true"`, `focusable="false"`. Never an SVG with no accessible name that carries meaning, and never a labelled one that is decoration.

## Tells of generated SVG

Fixed `width`/`height` and no `viewBox`; every color a hardcoded hex; a hundred unnamed `<g>`s; primitives converted to 8-decimal paths; an embedded PNG; the same gradient defined four times; a `<style>` block with global selectors that leak when inlined. Each is cheap to fix and expensive to leave.

## When to apply

Drawing or refactoring any icon, illustration, mascot pose, logo, chart glyph, or generative art output; any SVG a [[svg-animator]] will animate; any SVG dropped in by a generator.

## Gotcha

Inline `<style>` inside an SVG becomes global CSS the moment the SVG is inlined into a page. Scope selectors under a root id, or move the styles to the page. And `<use>` cannot reach into a symbol's internals from the outside — expose what must be styled as CSS variables instead.

## Sources

- W3C SVG 2; SVGO documentation.
- supermemoryai/skills `svg-animations` — viewBox, defs, and grouping practices; HKTITAN — token-aware authoring and the generated-SVG tells.
- Related: [[icon-systems]], [[svg-animation]], [[svg-path-morphing]], [[vibe-to-generator]].
