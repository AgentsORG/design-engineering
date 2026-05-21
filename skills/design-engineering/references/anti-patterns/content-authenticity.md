---
title: content-authenticity
summary: Real data, specific odd numbers, written copy, real photos. The opposite of lorem-ipsum and generated marketing tropes.
tags: [anti-patterns, content, copy]
---

# Content authenticity

The fastest way to detect AI-generated UI isn't the visual style — it's the content. Lorem ipsum, rounded numbers ("100+ customers"), placeholder names ("John Doe"), and generic marketing copy are dead giveaways.

## What inauthentic content looks like

### Lorem ipsum or "Coming soon"

- "Lorem ipsum dolor sit amet…" anywhere in a shipped product.
- Headings like "Section Title" or "Description goes here."
- Placeholder buttons labeled "Click here" or "Learn more →" with no clear destination.

The fix: write the real copy. If you don't know what the real copy is, the design isn't ready.

### Rounded numbers

- "100+ customers"
- "1000+ projects created"
- "50,000+ downloads"
- "Hundreds of integrations"

These read as approximations because they *are* approximations. The fix is specificity:

- "127 customers"
- "1,243 projects created"
- "52,841 downloads this month"
- "26 integrations" (not "Hundreds" — be honest)

Specific numbers feel real. They suggest the team actually looks at the data. They're harder to fake because they imply a verifiable source.

### Placeholder names

- "John Doe" / "Jane Doe"
- "Acme Inc." / "Acme Corp"
- "user@example.com"
- Stock-photo headshots with generic names

The fix: real names where possible. Anonymized real names where not ("Alex from Stripe"). Generic placeholders erode trust because they say "we couldn't be bothered to find real examples."

### Generated marketing copy

The AI-default marketing voice:

- "Unleash your potential."
- "Transform your workflow."
- "Take your X to the next level."
- "Built for teams that ship."
- "The all-in-one solution for…"

All of these are correct English sentences that say nothing. The fix is specificity, again:

- "Send 12 emails in the time it used to take to send one."
- "Saves our analytics team 4 hours a week on dashboard maintenance."
- "Built for 3-person startups, not 300-person enterprises."

Concrete claims, real benefits, specific numbers. If the marketing copy could appear on any product's homepage, it's worthless.

### Stock photography

Stock photos of "diverse business team smiling at laptop" are a tell. Better options:

- **Real screenshots** of your product. Better than any photo at communicating what you do.
- **Real team photos** for the about page. Imperfect, in-office, not posed.
- **No photo at all.** A clean layout with strong typography often beats stock imagery.
- **Custom illustrations** if you have the budget. Memorable; can't be replicated.

### Generic testimonials

Bad testimonials:

> "This product changed our company." — John Doe, CEO

Good testimonials:

> "We went from 12 deploys per week to 47 in the first month after switching. Our SRE team finally took a Friday off." — Sarah Chen, Engineering Manager, Vercel

The good one is specific, attributable, and has the voice of a real person (verbal tics, partial thoughts, real metrics).

### Missing context signals

Real products show evidence of ongoing human attention:

- **Timestamps** on changelog entries.
- **Real version numbers** (`v4.7.2`, not `v1.0` forever).
- **Recent dates** in "last updated" indicators.
- **Active social proof** ("Used by 847 customers as of this week").

Their absence signals the page hasn't been touched. Their presence signals someone is home.

## When this matters most

- **Landing pages and marketing copy.** The first impression depends entirely on the content's authenticity.
- **Empty states.** "Add your first project" beats "No data."
- **Error states.** "Couldn't reach our API. Trying again in 4s…" beats "Error occurred."
- **About pages, team pages, changelogs.** These exist to humanize the product.
- **Demo / staging environments.** Realistic data here trains the team to think about real-world cases.

## When NOT to apply

- **Non-customer-facing internal tools.** Lorem ipsum in an internal admin panel is fine if the deadline matters.
- **Early prototypes** where the visual is the focus and copy will land later. Just don't ship the prototype as the product.

## Gotcha

"Authentic" doesn't mean "verbose." Real copy is *specific*, not *long*. A 4-word real headline beats a 12-word generic one.

Also: GDPR and similar regs may limit using real customer data. Use opted-in real customer quotes, fictional-but-realistic examples (clearly marked), or your own team as examples. Never fake testimonials.

## Sources

- guidelines.sh — Content Authenticity category (real data, specific odd numbers, written copy, genuine photography, testimonials, timestamps).
- Related: [[ai-default-tells]], [[interaction-personality]], [[marketing-vs-product-ui]], [[empty-loading-states]].
