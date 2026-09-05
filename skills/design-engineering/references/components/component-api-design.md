---
title: component-api-design
summary: A component API is a contract. Composition over configuration, compound parts sharing context, customization layered variants → size → className → asChild, platform prop names, controlled and uncontrolled both, refs forwarded and props spread, type="button" by default.
tags: [components, api, react, composition, props]
---

# Component API design

Good component APIs make the common case a one-liner and the uncommon case possible without a fork. The two failure modes are always the same: too rigid (consumers fork or hack around it) or too configurable (thirty props nobody can hold in their head). This node is about the *props*, not the pixels; [[component-confusables]] decides which component, and [[dependency-discipline]] decides whether to write one at all.

## Composition over configuration

Expose structure as JSX children, not configuration objects. `<Card><CardHeader>…</CardHeader><CardContent/></Card>` beats `<Card header={{ title, description }} footer={{ actions: [...] }} />` because the consumer can reorder, omit, and wrap without a new prop for each case.

## Compound components

When related parts share implicit state — trigger and content, title and close — split into compound parts and share the state through context (the root provides, the parts consume). Use them when the component has slots, when the order or presence of children varies, or when consumers need to compose. Don't when the structure is fixed and there are one to three props.

## The Goldilocks layer order

1. **Variants** — predefined options (`primary`, `secondary`, `destructive`).
2. **Size** — predefined (`sm`, `md`, `lg`).
3. **`className`** — the escape hatch for one-off overrides.
4. **`asChild`** — render as a different element (Radix `Slot`) while keeping behavior and styles: `<Button asChild><Link href="/">Go</Link></Button>`.

Never raw style props (`backgroundColor`, `paddingX`); that is a second CSS system with a worse syntax. Express variant styles in the project's existing styling stack.

## Name like the platform

Mirror HTML: `disabled`, not `isDisabled`; `open`, not `isNotClosed` (positive booleans, never double negatives); handlers prefixed `on` (`onChange`, `onOpenChange`). Consistent across every component in the library.

## Controlled and uncontrolled

Any stateful component works both ways: `defaultValue` for internal state, `value` + `onChange` when the consumer owns it. `isControlled = value !== undefined`; read from the controlled value when present, update internal state only when not, and always call `onChange`.

## Play nice with the DOM

- **Forward refs** on anything wrapping a DOM element, or focus management, tooltips, and popover positioning break for composers.
- **Spread remaining props** so `aria-*`, `data-testid`, and other attributes pass through.
- **Defaults for the 80% case**: `variant="primary"`, `size="md"`, `type="button"` (never `submit` by default — the safer choice).
- Children for simple content; a render prop (`renderItem`) when the consumer maps data; slot props (`header={<h2/>}`) for optional sections.

## Common mistakes

- **Prop explosion** — `leftIcon`, `rightIcon`, `iconSpacing`… Use children: `<Button><Icon/> Save</Button>`.
- **Boolean soup** — `<Button primary large rounded>` invites invalid combinations; `variant`/`size`/`radius` enums don't.
- **Premature abstraction** — extract after the pattern has repeated two or three times, not before.
- **Swallowed props / missing ref** — the two silent breakages that surface as "the tooltip doesn't position".

## When to apply

Creating or refactoring a shared component, reviewing a props API, deciding how much customization to expose. In a [[review-format]] table, an API finding is a row only when the diff introduces a shared component.

## Gotcha

`asChild` merges props onto the child; if the child already has a handler or class, make sure the merge composes (Slot does) instead of overwriting. Hand-rolled `as` props that clone with spread usually drop one side.

## Sources

- Emil Kowalski's design-engineering practice on component design, distilled by HKTITAN.
- Radix UI `Slot`; React `forwardRef`.
- Related: [[component-confusables]], [[dependency-discipline]], [[sonner-principles]].
