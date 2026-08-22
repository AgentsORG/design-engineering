---
title: pov
summary: Installer's opinions and taste calls. This install is forked to Duolingo's design language — physical buttons, meaning-bearing color, rounded lowercase type, celebration on the reward beat.
tags: [pov, opinion, customizable, duolingo]
---

# Point of View

This file is **meant to be edited by you**. The rest of the skill is mostly canonical — Emil, Benji, Jakub, guidelines.sh — and this file is the override layer.

**This install is forked to Duolingo's design language.** Sources are [design.duolingo.com](https://design.duolingo.com) (identity, writing, illustration) plus token values read directly off the shipped product. Where a section below contradicts a canonical node, **this file wins**. Where it is silent, canon holds.

## How to use this file

Two kinds of entry are useful:

1. **Hard overrides** — "I never use X." or "I always prefer Y over Z."
2. **Taste calls** — "When in doubt, lean toward A because B."

Be specific. "I like clean UI" changes nothing. "1px borders in all cases; if a border needs more weight, raise contrast not width" changes output.

A taste call should *orient* a decision, not *amputate* a possibility.

## The stance, in one line

Duolingo's UI is **physical, loud, and kind**. Surfaces look pressable, color carries meaning instead of decoration, type is rounded and lowercase, and the product celebrates the user out loud. Restraint is not the goal here — *legibility of intent* is.

## 1. Buttons are physical objects, not rectangles

Every pressable surface has a **4px solid lip** in a darker shade of its own fill. The host element reserves that lip with a transparent bottom border, so pressing moves the fill into space that already exists — no reflow, no layout shift.

```css
.btn {
  position: relative;
  height: 50px;
  padding: 0 16px;
  border-radius: 12px;
  border-bottom: 4px solid transparent; /* reserves the lip */
  font: 700 15px/1 "DIN Next Rounded", Nunito, system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #fff;
}
.btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 12px;
  background: #58CC02;            /* fill */
  box-shadow: 0 4px 0 0 #58A700;  /* lip — same hue, ~15% darker */
}
.btn:active::before {
  transform: translateY(4px);
  box-shadow: 0 0 0 0 #58A700;    /* the button compresses into its own lip */
}
```

Rules that come with it:

- **Every fill has a paired lip color.** Feather Green `#58CC02` → Tree Frog `#58A700`. Macaw `#1CB0F6` → `#0096DD`. Fox `#FF9600` → Guinea Pig `#CD7900`. Cardinal `#FF4B4B` → Fire Ant `#EA2B2B`. Bee `#FFC800` → Lion `#FFB100`.
- **Secondary buttons keep the geometry, drop the fill:** 2px border plus 2px lip in Swan `#E5E5E5`, label in Wolf `#777777` or Macaw.
- **Labels are ALL CAPS, 700, 15px, `letter-spacing: 0.04em`, no punctuation.** `NO THANKS`, never `NO, THANKS`.
- **One button shape for the whole product.** One radius, one lip depth. If you are adding a fourth variant, you are solving a hierarchy problem with a shape.
- Cards, list rows, and pickable answer tiles use the same construction at 2px — pickable things look pickable.

Overrides [[shadows-whisper]]: here the shadow is **structural and opaque**, not atmospheric. Whisper shadows still own *floating* layers (menus, sheets, modals) — anything that leaves the page plane. Anything you press gets a lip.

## 2. Color carries meaning. When in doubt, go green

| Role | Token | Hex |
|---|---|---|
| Primary / correct / progress | Feather Green | `#58CC02` |
| Primary lip, green text on white | Tree Frog | `#58A700` |
| Body text, headings | Eel | `#4B4B4B` |
| Page background | Snow | `#FFFFFF` |
| Secondary text | Wolf | `#777777` |
| Disabled text, placeholders | Hare | `#AFAFAF` |
| Borders, dividers, lips | Swan | `#E5E5E5` |
| Inset surfaces, tracks | Polar | `#F7F7F7` |

Secondary colors are a **vocabulary, not a palette**. Each owns exactly one meaning and is never used decoratively:

- Macaw `#1CB0F6` — information, secondary action, links
- Cardinal `#FF4B4B` — wrong, destructive, hearts lost
- Fox `#FF9600` — streaks, urgency, time
- Bee `#FFC800` — earned currency, XP, rewards
- Beetle `#CE82FF` — premium / upgrade
- Humpback `#2B70C9` — chrome, headers, calm depth

Overrides [[color-monochromatic]]. Mono-plus-one-accent is the wrong default for this language — but its *discipline* survives intact: a color that means nothing gets deleted. Six meaningful hues is a system; six pretty hues is noise.

**Never set text in Feather Green on Snow** — it computes to ≈2.1:1. Green is a *fill*. If you need green type, use Tree Frog (≈4.2:1 on Snow).

**Dark mode is a remap, not a second palette.** Token names stay, values flip: Polar is `#F7F7F7` in light and `#202F36` in dark; the dark ground is `#131F24` and dark text `#F1F7FB`, never `#000`/`#FFF`. A token that must *not* flip carries an explicit `-always-light` / `-always-dark` suffix. Adopt that suffix convention — it kills the whole class of "this looked fine until dark mode" bugs. Agrees with [[dark-mode]] and [[contrast-and-color-scheme]].

## 3. Type: rounded, lowercase, two faces with a hard role split

**Display face** (Feather Bold's role — substitute any bold rounded display sans):

- Short headlines only, **10 words maximum**. Longer than that is a body-face job.
- **Always lowercase.** Capitals only for proper nouns. Never Title Case, never all caps.
- Leading 100–110%. Tracking `-0.02em`. Never below 30px.
- Left-aligned. Never justified, never hyphenated.
- Never set it in a neutral like Eel, and never in two secondary colors at once.

**Body face** (DIN Next Rounded's role; **Nunito** is the sanctioned free substitute):

- Everything else — long headlines, subheads, body, UI. Leading 140%, tracking 0, never below 14px.
- Roughly 1.5× smaller than the display face when the two share a block, with equal leading.
- **Never mix the two faces inside one sentence.**

Overrides [[typography-humanity]] on two points: rounded-and-friendly is the *brief*, not a default to escape, so Nunito is a correct answer here rather than a tell; and the single-weight rule does not apply — this language needs two faces precisely because the role split does the hierarchy work.

## 4. Nothing is pointy

Duolingo's illustration guidelines put it flatly: "Pointy shapes are off-brand."

- Everything is built from rounded rectangles, circles, and rounded triangles.
- Radius scale: `12px` buttons and tiles, `16px` cards and modals, `full` for pills, progress bars, and avatars. Keep the nested-radius math from [[border-radius]].
- Progress bars are full-radius with a full-radius fill and an inset highlight. They are the most-looked-at element in the product; give them the care.
- Character eyes are pills, never ovals. Ground shadows are pills, never ovals — an oval implies a perspective the flat style doesn't have.

## 5. Motion: feedback always, celebration on the reward beat

Canon's default is *don't animate*. This POV **raises the floor by one notch** and leaves the ceiling where Benji put it.

| Frequency | Canonical allowance | This POV |
|---|---|---|
| Every keystroke / scroll | None | **None.** Unchanged. |
| Every tap | Subtle, ~100–160ms | **Always.** The lip compress, ~100ms, plus sound where the platform has it. A tap with no physical response is a bug. |
| Daily reward beat (lesson done, streak day, XP earned) | Small — a tick | **Medium.** Scale-in, stagger, a number that counts up. The reward loop *is* the product. |
| Rare milestone | Big | **Big.** Unchanged — confetti belongs here and only here. |

Character motion is small and expressive: a wave, a wing flap, a fist pump. Never sudden, never fast. A mascot that lurches reads as broken rather than alive.

Extends [[delight-impact-curve]] and [[animation-decision-framework]]: the decision tree is unchanged, but "feedback" and "reward" are load-bearing purposes in a habit product, not decoration.

## 6. Copy: expressive, playful, embracing, worldly

- **Brief, active, direct, excited.** "You did it!" beats "Congratulations." "Check your answer" beats "You can see how you did by checking your answer."
- **Errors support, never blame.** "Not quite correct. Try again!" — never "Incorrect."
- **Contractions always.** Gender-neutral always (they/them).
- **Numerals for every number**, even under 10 — unless one starts a sentence. Comma above 999, but never in an XP or currency total.
- **Capitalization is minimized:** sentence case for headings, subheads, and page titles; ALL CAPS for buttons; capitalize product-specific proper nouns (feature names, purchasable items) and nothing else.
- **Punctuation:** none in buttons; none in headlines except `!`. Serial comma. Avoid em dashes and semicolons — write two sentences instead. Write "and", not "&".
- **Emoji are allowed** in notifications, subject lines, and social — one, roughly half the time, so it keeps its impact. Never as list bullets and never as UI iconography; that stays an [[ai-default-tells]] offense.
- **Tone reads the room.** Wins get exclamation points. Serious human subject matter gets them stripped out entirely, along with the exuberance. Voice is fixed; tone is not.

Overrides [[copy-voice]] on three specifics: Title Case buttons (→ ALL CAPS), Title Case headings (→ sentence case), and "&" over "and" (→ reversed). Its other rules — active voice, second person, specificity, errors that name the exit — hold.

## 7. Illustration over stock, characters over icons

- Reach for an illustrated character before a photograph and before a generic glyph. Characters are posed and expressive; a static, expressionless character reads as dead.
- Keep each illustration to roughly 15 shapes. Six is too abstract; thirty muddies at small sizes.
- Flat perspective, one line of sight, minimal color count per object.
- **No gray inside illustrations** — it reads lifeless against the rest of the palette. Because backgrounds are white, use light pastels where you would reach for white.
- Mascot characters communicate in text, never narrate the product, and never carry anything aggressive.

Extends [[content-authenticity]]: an original character beats a stock photo beats a Lucide glyph, in that order.

## 8. What the brand does *not* override

Two things outrank every taste call above.

1. **[[accessibility-baseline]].** White on Feather Green computes to ≈2.1:1, white on Tree Frog to ≈3.0:1 — neither clears WCAG AA for normal text. Duolingo ships it; you should not, unless you have checked it. Either darken the fill for text-bearing surfaces (≈`#367F00` clears 4.5:1 against white) or accept it only for large bold labels *with* a non-color affordance carrying the same meaning. Never let green-vs-red be the only signal for right-vs-wrong.
2. **[[prefers-reduced-motion]].** Celebration is the first thing to drop, not the last. Kill the confetti, the count-up, and the mascot loop; keep opacity fades and keep the button's state change legible.

## Where this overrides the canonical graph

| Canonical node | Its default | This POV |
|---|---|---|
| [[shadows-whisper]] | Layered shadows at 4–6%, `#111` base | Opaque 4px lip on anything pressable; whisper shadows only for floating layers |
| [[color-monochromatic]] | One hue plus one accent | Six named hues, one meaning each; green leads |
| [[typography-humanity]] | Avoid Google-default faces; one weight | Rounded is the brief; Nunito sanctioned; two faces, hard role split |
| [[copy-voice]] | Title Case buttons/headings, "&" over "and" | ALL CAPS buttons, sentence case headings, "and" over "&" |
| [[delight-impact-curve]] | Daily moments get a tick | Daily reward beat gets medium-tier celebration |
| [[hover-states-subtle]] | 1px shifts, no lift | Press compresses 4px; hover lightens the fill |
| [[visual-imperfection]] | Imperfection lives on marketing surfaces | Warmth comes from rounded geometry and characters, not from texture or wobble |

Everything not listed is unchanged. [[states-are-the-work]], [[data-is-content]], [[dependency-discipline]], [[transform-opacity-only]], [[never-scale-from-zero]], and [[feeling-right]] apply exactly as written.

## Reviewing under this POV

When reviewing UI in a product built on this language, the [[review-format]] table judges against the values above — a flat button with no lip, a Title Case CTA, or a silent correct-answer state are **findings**, not preferences. When reviewing a product that is *not* on this language, fall back to canon and say so.

## Your POV (add yours below)

> The narrow calls the sections above deliberately leave open. Examples:
>
> - I always prefer ____ over ____.
> - In my products, ____ is non-negotiable.
> - Skip ____, even if the rest of the skill recommends it. The reason is ____.

## Gotcha

Do not confuse POV with [[gotchas]]:

- **gotchas** = "the agent did this wrong, here's the right answer." Negative examples, append-only.
- **pov** = "I prefer this default over the canonical default." Taste overrides.

Both grow over time. Both outrank canonical content. The framing is different.

## When the agent should consult this file

Always. Before producing UI code or a review, load this file alongside [[gotchas]].

If the user explicitly says "ignore my pov" or "use canonical defaults," skip this file for that response only.

## Sources

- [design.duolingo.com](https://design.duolingo.com) — identity (logos, color, typography, imagery, brand family), writing (brand narrative, voice, tone, Duo, style), illustration (shape language, characters, Duo), marketing.
- Token values, the button construction, and the light/dark remap read off the shipped Duolingo product (`--color-*` and `--text-*` custom properties).
- Contrast ratios computed from the published hex values, not quoted from the guidelines.
- Perplexity Agent Skills team — the "inject your opinion" principle. Henry Modisett (Perplexity head of design) — design Skills written for personal taste.
