---
title: design-vocabulary
summary: The precise word for each design phenomenon, and where this skill goes deeper. The lexicon behind articulate-precisely. Seeded by Index's articulate module.
tags: [meta, vocabulary, reference, articulation]
---

# Design vocabulary

The skill's working lexicon: the precise word for a design phenomenon, plus where the skill treats it in depth. Use it to name things exactly per [[articulate-precisely]] — in a critique, name the phenomenon; in a request, name the change.

Seeded by *Index*'s articulate module (Emil Kowalski & Glenn Carstens-Peters — [index.how/to/articulate](https://index.how/to/articulate)). The glosses here are this skill's own; `→ [[node]]` points to the node that goes deeper. Terms in **bold** with no arrow are vocabulary the skill adopts but does not yet cover in a dedicated node — name them precisely even where there is no node to open.

## How to use this file

- **Don't read it top to bottom.** Jump to the category, grab the word, follow the arrow if you need depth.
- **One job: stop the agent saying "weird."** If a critique reaches for a vague word ("off," "clean," "modern"), the right word is almost always here.
- **Pair it with the principle.** [[articulate-precisely]] is *why* precision matters; [[review-checklist]] is *what* to scan when reviewing. This file is a naming index, not a rulebook — the rules live in the linked nodes.

## 01 — Typography

How text is set, spaced, and read.

- **Kerning** — space between two specific letters, tuned by hand. Distinct from tracking.
- **Tracking** — uniform letter-spacing across a run; uppercase and small text usually need more. → [[line-length-tracking]]
- **Leading** — line-height; the vertical space between lines. Too tight suffocates, too loose stops reading as a paragraph.
- **Optical kerning** — spacing judged by eye instead of the font's metric tables; closes the gaps the defaults leave.
- **Tabular nums** — fixed-width digits so changing numbers don't jitter in a column. Essential for tables, prices, timers. → [[data-is-content]]
- **Type scale** — a fixed set of sizes (often a ratio) you pick from rather than inventing per use. → [[typography-humanity]]
- **Weight** — stroke thickness. Bold is for hierarchy; italic is for linguistic stress or citation, not hierarchy. → [[typography-humanity]]
- **x-height** — height of the lowercase; why two fonts at the same px read as different sizes. → [[typography-humanity]]
- **Cap height** — height of the capitals; with x-height it governs perceived size. Matters when matching a fallback.
- **Ligature** — two glyphs merged to dodge a collision (fi, fl). Decorative ligatures are display-only.
- **Font smoothing** — antialiasing of glyph edges; `antialiased` renders lighter on Mac, worse on non-retina.
- **Text overflow / truncation** — cut at a word boundary with a real ellipsis character, never mid-word. → [[copy-voice]]
- **Hyphenation** — breaking a word across lines; best left to the browser to place.
- **Clamp** — fluid sizing with a min, preferred, and max in one declaration (`clamp()`); scales between breakpoints.
- **Widow** — classically, a paragraph's lone last line carried to the top of the next column or page; colloquially also the lone word left on a last line. `text-wrap: pretty` targets the trailing-word case. → [[typography-humanity]]
- **Orphan** — a paragraph's lone first line stranded at the bottom of a column or page — the mirror of a widow. CSS `orphans`/`widows` set the minimums, but support is uneven, so it is often fixed by hand.
- **Font stack** — the ordered fallback list; a size-matched fallback prevents reflow when the web font loads.
- **Line length** — the measure; ~65 characters reads comfortably, wider loses the next line. → [[line-length-tracking]]
- **Variable font** — one file spanning weight/width axes; lets you animate weight without layout shift.
- **Superscript / subscript** — `sup`/`sub` are oversized by default and break line rhythm; size and shift them by hand.

## 02 — Color

How color is defined, mixed, and applied.

- **sRGB** — the legacy default space; every hex value lives here. Narrower gamut than modern screens can show.
- **P3** — a wider gamut most current displays support; reaches greens and reds sRGB cannot describe.
- **OKLCH** — a perceptually uniform space; equal lightness actually looks equally bright. Best for generating palettes.
- **Alpha** — the transparency channel. An alpha border recedes into the surface; a solid hex sits on top of it.
- **Semantic token** — a color named for its job, not its value (`--border-subtle`, not `#e0e0e0`). → [[using-design-md]]
- **Contrast ratio** — luminance difference of foreground to background; WCAG wants 4.5:1 body, 3:1 large/UI. → [[contrast-and-color-scheme]]
- **Tinted neutral** — a grey with a slight hue bias; pure `#808080` reads as a placeholder, a tint reads as chosen. → [[color-monochromatic]]
- **Saturation** — a color's intensity; a fully-saturated brand hue that sings on a light page can buzz on a dark one — drop it roughly a quarter to settle it.
- **Chroma** — OKLCH's perceptually-accurate saturation. Reduce chroma for a light tint; reducing opacity instead just greys it. → [[color-monochromatic]]
- **Gradient** — a transition between colors; built in OKLCH it stays vivid where sRGB/HSL go grey at the midpoint.
- **Opacity vs visibility** — `opacity:0` still takes space and catches clicks; `visibility:hidden` kills interaction but keeps space.
- **Dark mode** — surfaces built dark, brightest at the top of the layer stack; light tokens rarely translate directly. → [[dark-mode]]
- **Blending** — how a layer mixes with what is beneath. Multiply darkens, Screen lightens, Overlay does both.

## 03 — Iconography

How icons are drawn and balanced.

- **Stroke weight** — icon line thickness; it has to scale with size or it disappears small and looks frail large. → [[icon-systems]]
- **Optical centre** — where a shape *looks* centred vs where it mathematically is; a play triangle must nudge right. → [[icon-systems]]
- **Filled vs outlined** — two styles signalling state; filled often means active/selected, outlined means default. → [[icon-systems]]
- **Cap style** — how a stroke ends, square or round; rounded ends usually read intentional in UI, blunt square ends can look like an untuned default.
- **Pixel hinting** — nudging paths onto the pixel grid at small sizes so a 16px glyph doesn't turn to mush.
- **Icon library** — a single family tuned to one size, weight, and corner radius; pulling glyphs from a second set — however close — leaves small inconsistencies that pile up. → [[icon-systems]]
- **Icon size system** — the defined sizes (12/16/20/24/48) each ideally drawn for its context, not scaled from one master.
- **Meaning collision** — the same icon doing two jobs (a star for favourite *and* rating); users learn neither.
- **Contextual swap** — switching outlined↔filled to mark a state change; only works if the convention is consistent.
- **Breathing room** — the deliberate spacing between a glyph and its text (start ~6–8px); design it as a property of the component, not whatever the flex gap happens to leave.
- **Unified weight** — icon stroke matched to the adjacent text weight, so they read as one family. → [[icon-systems]]
- **Metaphor accuracy** — whether the glyph still means what it depicts (a floppy disk for save) as the audience ages.

## 04 — Layout

How space and structure organise a page.

- **Border radius** — corner rounding; an inner radius = outer radius − padding, or the gap shows. → [[border-radius]]
- **Gap** — space between flex/grid children, set on the parent; unlike margin it leaves no trailing space.
- **Negative space** — the empty area that gives a layout its edges and steers the eye; packing things tighter erases the structure the eye was reading, it doesn't add content.
- **Flexbox** — the row/column layout model controlling direction, alignment, and grow/shrink.
- **Auto layout** — Figma's flexbox: elements that space themselves and resize with content.
- **Layout shift** — content jumping as the page loads (images, fonts, reorders); reserve space to prevent it. → [[sticky-and-scroll-tells]]
- **Overflow** — what happens past a container's bounds; `hidden` clips silently and breaks child sticky positioning.
- **Sticky positioning** — scrolls then pins at a threshold; a parent with `overflow:hidden` silently breaks it. → [[sticky-and-scroll-tells]]
- **Aspect ratio** — fixed width:height; setting it reserves space before media loads and prevents layout shift.
- **Viewport units** — units relative to the window; `dvh` accounts for mobile browser chrome that `vh` ignores. → [[viewport-custom-design]]
- **Safe area** — the screen region clear of notches and home indicators; fixed bottom chrome must inset for it. → [[viewport-custom-design]]
- **Max-width** — a cap on container width so lines don't stretch unreadable on wide screens. → [[line-length-tracking]]
- **Breakpoint** — where layout changes; set it where the content breaks, not at assumed device widths. → [[viewport-custom-design]]
- **Responsive** — a layout that adapts via fluid sizing, flexible media, and breakpoints. The web baseline.
- **Grid** — a column system organising layout; 12 is conventional, 8 often suits simpler layouts.
- **Asymmetry** — columns or elements weighted on purpose rather than mirrored; the imbalance is what carries energy. A perfectly balanced grid is safe and usually inert. → [[visual-imperfection]]
- **Baseline grid** — horizontal rhythm from body line-height; great for editorial, usually overkill in product UI.
- **Z-index** — stacking order on a plane; modals, tooltips, dropdowns need explicit values or they clip behind. → [[tray-rules]]

## 05 — Interaction

How elements respond to input.

- **Affordance** — the cue a control gives about how to operate it; a raised edge says press, an underline says click. Strip the cue and the user is left to experiment.
- **Hover state** — the change on cursor-over; confirm interactivity with cursor + color, not color alone. → [[hover-states-subtle]]
- **Focus state** — the keyboard-focus indicator; never delete it, replace it. → [[accessibility-baseline]]
- **Active state** — the pressed change; a small scale or color shift, or the button feels dead. → [[responsive-feedback]]
- **Disabled state** — non-interactive; a muted token is more reliable than opacity, which can pass or fail contrast. → [[accessibility-baseline]]
- **Cursor** — the pointer contract: pointer = clickable, text = selectable, default = static. The wrong one lies.
- **Pointer events** — whether an element catches input; `none` makes a decorative layer present but click-through.
- **Optimistic update** — update the UI before the server confirms; feels instant, needs a rollback path. → [[optimistic-updates]]
- **Debounce** — delay a function and reset on each trigger; stops a request per keystroke (~300ms is common).
- **Touch target** — the tappable area; 44×44px minimum, even when the visible element is smaller. → [[accessibility-baseline]]
- **Copy to clipboard** — needs visible confirmation (a checkmark for a beat) or users click it again thinking it failed. → [[responsive-feedback]]
- **Skip link** — a visually-hidden link, revealed on focus, that jumps past nav to main content. → [[accessibility-baseline]]

## 06 — Motion

How things move and transition. The largest cluster in this skill — see [[animation-decision-framework]] first.

- **Easing** — the speed curve of an animation; a custom cubic-bezier almost always beats the CSS built-ins. → [[easing-curves]]
- **Ease-out** — fast then slow; the default for things entering the screen. → [[easing-curves]]
- **Ease-in** — slow then fast; for things leaving. On an entrance it feels reluctant. → [[easing-curves]]
- **Ease-in-out** — slow-fast-slow; for moves across the screen (a toggle, a sliding card). Overkill for simple enter/exit.
- **Stagger** — list items animating in sequence (~40ms apart); all-at-once reads as a flash. → [[stagger-choreography]]
- **Duration** — UI is sub-300ms; hovers ~150ms, buttons 100–160ms, >400ms with no feedback looks broken. → [[duration-table]]
- **Transition property** — animate only `transform` and `opacity`; `all` catches layout props and janks. → [[transform-opacity-only]]
- **Reduced motion** — the `prefers-reduced-motion` preference; any significant movement must honour it. → [[prefers-reduced-motion]]
- **Skeleton shimmer** — a gradient sweep on a skeleton to suggest activity; must respect reduced motion. → [[empty-loading-states]]
- **Spring** — physics-based easing that overshoots and settles; reads more alive than a fixed curve. → [[spring-animations]]
- **Choreography** — timing several animations as one phrase so attention lands in one place; uncoordinated motion just scatters the gaze. → [[stagger-choreography]]
- **Enter vs exit asymmetry** — enter decelerates in, exit accelerates away; a reversed enter feels like arriving backwards. → [[compose-subtract-asymmetry]]
- **Shared axis transition** — motion direction reflects spatial relationship: forward animates right, back animates left. → [[fly-not-teleport]]
- **Motion as feedback** — press-compress, error-shake, success-draw: the motion *is* the response, not decoration. → [[responsive-feedback]]
- **GPU compositing** — transform/opacity run on the GPU and skip layout recalc; animating width/top forces reflow per frame. → [[transform-mastery]]

## 07 — Accessibility

How interfaces work for everyone. The baseline is non-negotiable — see [[accessibility-baseline]].

- **WCAG** — the contrast standard most teams use; AA is 4.5:1 body, 3:1 large/UI. → [[contrast-and-color-scheme]]
- **APCA** — a newer perceptual contrast model accounting for size and weight; sometimes disagrees with WCAG.
- **Screen reader** — reads the UI aloud; navigates by DOM order, headings, and ARIA roles, not visual layout. → [[accessibility-baseline]]
- **Tab order** — the keyboard focus sequence; should match reading order, broken when DOM and visual order diverge.
- **Prefers color scheme** — the media query for system theme; the right way to honour dark mode without a custom toggle. → [[dark-mode]]
- **aria-label** — an accessible name for a control with no visible text; describe the action ("Search"), not the icon.
- **Focus trap** — keeping keyboard focus inside an open modal so it can't escape to the page behind. → [[tray-rules]]
- **DOM order** — the HTML sequence screen readers follow; reordering visually with CSS desyncs seen from read.
- **Semantic HTML** — the right element for the job; a `button` gets keyboard, focus, and role for free, a `div` does not.
- **Label association** — tying a `label` to its input via `for`/`id` so clicking the label focuses the field. → [[forms-validation]]
- **Color-only state** — color as the sole signal (a red border) is invisible to colorblind users; always pair with icon or text.

## 08 — Information architecture

How content is structured and found.

- **Progressive disclosure** — reveal complexity as the user goes deeper instead of dumping it all on one screen.
- **Navigation** — the system for moving between areas; labels should match how users describe things, not internal naming.
- **Mental model** — the assumptions a user already holds about how a thing behaves; architecture that fits them feels obvious, architecture that fights them makes users feel stupid.
- **Hierarchy** — the deliberate ordering of importance; with none, every element shouts equally and the user hears nothing.
- **Empty state** — the no-content-yet view; explain why and offer the first action. "No data" ends the journey. → [[empty-loading-states]]
- **Error state** — what shows on failure; say what broke and a specific way to recover. → [[states-are-the-work]]
- **Onboarding** — the best kind delivers value immediately; one completed action beats a watched tour. → [[delight-impact-curve]]
- **Confirmation dialog** — a gate before a destructive action; describe what is lost, keep safe and destructive far apart.
- **Wayfinding** — the signals (breadcrumbs, active nav, titles, URL) that say where you are and where you can go. → [[url-as-state]]
- **Signpost** — an element whose sole job is to orient (a section header, a step counter); you only notice it once it's gone.
- **Labelling** — the wording on nav and categories; when users search for something they should have browsed to, the query is a receipt for a mislabel.
- **Depth** — levels of nav to reach content; past three, users lose track — add wayfinding or flatten.
- **Search as escape hatch** — high search volume for browsable things is a sign the IA failed, not that search needs work.
- **Content inventory** — a complete list of everything before restructuring; skipping it just moves broken content.
- **Card sorting** — a research method: real users cluster items the way they expect to find them, exposing where the team's labels and the user's expectations split.

## 09 — Copywriting

How words guide and reassure. The skill's voice work lives in [[copy-voice]].

- **Microcopy** — the small text (labels, errors, placeholders) that outsizes its length in how trustworthy a product feels. → [[copy-voice]]
- **CTA** — the primary action label; "Save changes" outperforms "Submit." Own the action, don't apologise for it. → [[copy-voice]]
- **Error message** — name what went wrong and how to fix it; "Invalid input" names nothing. → [[forms-validation]]
- **Placeholder** — hint text that vanishes on typing; it cannot replace a label — the reminder is gone when needed.
- **Sentence case** — cap only the first word and proper nouns — the UI default; capitalising Every Word gives microcopy a stiff, contractual tone.
- **Front-loading** — lead with the word that carries the meaning, because eyes grab the first token and move on; "3 errors" lands before "There were some problems with your submission" finishes. → [[copy-voice]]
- **Inline error** — the message next to the offending field; a top-of-form summary makes users hunt. → [[forms-validation]]
- **Voice** — a product's fixed character in language — warm or clinical, plain or technical. Voice is the constant; tone is what flexes by moment.
- **Tone** — how the voice adapts to the moment (encouraging in onboarding, careful around destructive actions).
- **Success message** — specific and brief ("Saved", not "Done"); often neglected, never a press release.
- **Destructive language** — say "Delete"/"Remove" plainly; softening a permanent action ("clear", "reset") misleads.
- **Scannability** — copy built for the glance: lead with the outcome, keep clauses short, stay active. Most UI text is skimmed, not read — write for that.
- **Truncation strategy** — where and how overflowing text gets cut; a heading, a nav label, and a body line each want a different cut rule, never one global ellipsis. → [[copy-voice]]
- **Contextual help** — one sentence placed at the moment of need; cheaper than a tooltip (hover) or docs (navigate).
- **Numeric formatting** — `1,000` vs `1000`, `3.5k` vs `3,500`; consistency matters more than the convention, match the locale. → [[data-is-content]]

## 10 — Tools

How design is made and shared.

- **Design system** — shared components, tokens, patterns, and guidelines; a living product, not a static doc. → [[using-design-md]]
- **Source of truth** — the one place a team defers to; increasingly the codebase, not the Figma file. → [[using-design-md]]
- **Variables** — named, reusable values updated from one place; change once, everything referencing it updates.
- **Tokens** — design decisions as named variables both tools and code reference; what makes a system portable. → [[using-design-md]]
- **Visual language** — the cohesive color/type/shape/motion/tone that makes a product recognisable without its name. → [[marketing-vs-product-ui]]
- **Artboard / Frame** — a named canvas for a screen or component; Figma frames also define clipping and auto layout.
- **Prototype** — an interactive mockup to test a flow; fidelity should match the question being asked.
- **Handoff** — design moving to engineering; done well it is shared tokens and an available designer, not guesswork. → [[using-design-md]]
- **Redline / annotation** — measurements and notes on a design to communicate intent; less needed with a shared system. → [[agentation-workflow]]
- **Moodboard** — a reference collection to align on direction; the best ones make an argument, the worst are Pinterest. → [[taste-is-trained]]
- **HiDPI / Retina** — 2×+ pixel-density screens; assets, icons, and borders must account for 2× and sometimes 3×.
- **Open Graph** — the share-preview metadata (image, title, description); the first impression for most who don't visit.

## 11 — Analysis

How design decisions are measured.

- **A/B test** — two variants run live to measure which wins; only as good as the metric chosen.
- **Heatmap** — a visualisation of clicks/taps/scroll; spots affordance problems and content nobody reaches.
- **Session recording** — replayed footage of one real user's path; where an aggregate heatmap blurs, a recording puts a face on the moment someone gave up — much harder to dismiss.
- **Funnel** — the staged path to a goal (sign-up, checkout, activation); every step that sheds users is a problem to diagnose, not a law of nature.
- **Conversion** — the moment a visitor takes the desired action; design moves it via clarity, trust, and friction.
- **Bounce rate** — share who leave without acting; high on a key page signals an expectation mismatch.
- **Retention** — how many return after the first visit; harder and more important than acquisition.
- **Churn** — the rate at which existing users leave — retention read backwards; a rising number is the product admitting it no longer earns the return visit.
- **NPS** — likelihood-to-recommend, 0–10; a blunt instrument, widely used as a rough satisfaction signal.
- **Scroll depth** — how far down users actually read; content below the fold reaches fewer than assumed. → [[sticky-and-scroll-tells]]

## 12 — Components

The building blocks. Their state behaviour is where craft lives — see [[states-are-the-work]]. For the pairs people confuse, see [[component-confusables]].

- **Button** — the primary trigger; needs distinct default/hover/active/focus/disabled/loading, one primary per view. → [[hover-default-imperative]]
- **Input** — a text field; needs a persistent label above it, not just a placeholder, and a distinct state each. → [[forms-validation]]
- **Textarea** — a multi-line input; same state treatment as a single-line field. → [[forms-validation]]
- **Select** — a one-of-many dropdown; the native element is accessible but hard to style, customs need keyboard care.
- **Checkbox** — a binary toggle; clicking the label should toggle it, not just the box. → [[forms-validation]]
- **Radio group** — exactly one of a set; distinct from checkboxes, which allow several.
- **Switch** — an on/off with immediate effect; for settings that apply without a save.
- **Slider** — a value within a range; update live on drag, not only on release.
- **Modal / Dialog** — an overlay that interrupts and demands attention; trap focus, make the background inert. → [[component-confusables]]
- **Sheet** — a panel sliding from a screen edge; same focus and dismissal rules as a modal. → [[component-confusables]]
- **Drawer** — a bottom sheet pulled up from the base; a common mobile dialog replacement. → [[component-confusables]]
- **Popover** — a click-anchored overlay that *can* hold interactive content (links, buttons). Not a tooltip. → [[component-confusables]]
- **Tooltip** — a hover label that *cannot* hold interactive content; if you need a link inside, use a popover. → [[component-confusables]]
- **Toast** — a temporary auto-dismissing notification; duration should track reading time, not a flat 2s. → [[sonner-principles]]
- **Badge** — a small label attached to another element and read-only; numeric implies a count. → [[component-confusables]]
- **Tag** — a label the user can pick up, toggle, or remove — it categorises and it's interactive. A badge is pinned on; collapsing the two hides a real difference. → [[component-confusables]]
- **Accordion** — stacked expand/collapse sections; good for FAQs, not a substitute for tabs when comparing.
- **Tabs** — switches between related views in one space; for filtering the same content, not navigating unrelated sections.
- **Stepper** — a multi-step flow showing progress; show the steps upfront to set expectations.
- **Carousel** — a horizontal scroll row; on desktop often a sign the layout wasn't solved. The first item gets the attention.
- **Navigation menu** — top-level or flyout structure; labels reflect how users think, not how it was built.
- **Sidebar** — persistent edge navigation; works when users move between sections often.
- **Breadcrumb** — a location trail in a hierarchy; navigate back at depth without the browser button. → [[url-as-state]]
- **Pagination** — page controls for lists too long to load at once; infinite scroll is the tradeoff alternative.
- **Skeleton** — a placeholder holding content's shape while it loads; better than a spinner for list/page loads. → [[empty-loading-states]]
- **Spinner** — an indeterminate loader; fine for short action waits, a skeleton wins for page/list loads. → [[empty-loading-states]]
- **Avatar** — a small user image; needs a fallback (initials or icon) when the image fails. → [[avatar-systems]]
- **Card** — a contained surface grouping content; inner radius < outer, and a fully-linked surface kills text selection. → [[cards-design]]
- **Data table** — a row/column grid; right-align numbers with tabular nums — alignment does zebra-striping's job. → [[data-is-content]]
- **Combobox** — a typeable input whose list narrows with each character; feels like free text but only lets the user land on a valid option.
- **Command menu** — a keyboard-triggered search for navigating or acting; for power users avoiding the mouse.
- **Progress** — a bar for a determinate process; for unknown durations use a spinner instead.
- **Separator** — a visual divider; often overused where spacing would do the same job.

## Sources

- *Index — Say Precisely What You Mean*, Emil Kowalski & Glenn Carstens-Peters — [index.how/to/articulate](https://index.how/to/articulate). The 188-term articulate module this lexicon is seeded from; the canonical reference, arriving fall 2026. Glosses here are this skill's own.
- Cross-linked throughout to this skill's own clusters: [[MOC-philosophy]], [[MOC-motion]], [[MOC-surface]], [[MOC-typography]], [[MOC-components]], [[MOC-layout]], [[MOC-anti-patterns]].
