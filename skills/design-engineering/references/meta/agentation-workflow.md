---
title: agentation-workflow
summary: Install Agentation in localhost dev. Click any element to annotate. Two-session workflow: critique loop in Session 1, fix loop in Session 2.
tags: [meta, agentation, workflow, design-review]
---

# Agentation workflow

[Agentation](https://www.agentation.com) (by Benji Taylor, [github.com/benjitaylor/agentation](https://github.com/benjitaylor/agentation)) is the productized version of the [[pointing-beats-describing]] principle. It mounts a toolbar in your dev environment that lets you click on any element on the page, write a short critique, and emit structured annotations the agent can read.

This skill **recommends installing Agentation** alongside Obsidian for any team doing AI-assisted UI work. See the README's "Recommended companions" section.

## Install (Next.js example)

```bash
npm install --save-dev agentation
```

```tsx
// app/layout.tsx (App Router)
import { Agentation } from "agentation";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
```

Mount under `NODE_ENV === "development"` so the toolbar never ships to production.

For non-Next setups, install the [`agentation`](https://www.npmjs.com/package/agentation) skill itself — it has framework detection:

```bash
npx skills add benjitaylor/agentation
```

This adds an `agentation` skill to your agent's library that knows how to install the React component in your specific framework (Next.js App Router, Pages Router, Vite, Astro, Remix).

## Add the MCP server (optional but recommended)

The MCP server lets your agent **read annotations directly** instead of having you copy-paste them. Two install paths:

```bash
# Universal — works with Claude Code, Cursor, Codex, Gemini CLI, 9+ agents
npx add-mcp agentation

# Claude Code only (slightly more features)
npx agentation-mcp init
```

With MCP installed, the agent can call `agentation_watch_annotations` and read every annotation in real time as you create them.

## Manual workflow (no MCP)

1. Run your dev server.
2. The Agentation toolbar appears bottom-right.
3. Click "Annotate" → click any element on the page.
4. Type 2–3 sentences of critique. Be specific and reference principles (visual hierarchy, Gestalt grouping, whitespace). Cite comparable products (Stripe, Linear, Vercel).
5. Submit. Agentation outputs structured markdown — selectors, file paths, computed styles, your critique.
6. Copy the output into Claude Code / Cursor / your agent of choice.

## Two-session workflow (with MCP)

With MCP enabled, you can run two agent sessions in parallel:

```text
┌──────────────────────────┐         ┌──────────────────────────┐
│   Session 1: Critique    │         │    Session 2: Fix        │
│                          │         │                          │
│ - Open localhost in      │         │ - Watches for new        │
│   headed agent-browser   │         │   annotations via MCP    │
│ - Scrolls through pages  │  ───►   │ - Reads each annotation  │
│ - Adds 5–8 annotations   │         │ - Edits code to address  │
│   per page autonomously  │         │ - Commits + pushes       │
│ - Names the principle    │         │ - Loops to next          │
│   in each annotation     │         │                          │
└──────────────────────────┘         └──────────────────────────┘
```

This separates the **critique loop** from the **fix loop**. Each session has a single, focused job. The annotation is the API between them — the same selector + critique that a human would have written.

Use this when you want fully autonomous design review without human-in-the-loop on every annotation. Add human-in-the-loop on PR review of the resulting commits, not on each annotation.

## Critique style

From Agentation's own skill:

- **2–3 sentences max** per annotation. Longer reads as essay; shorter reads as too vague.
- **Specific + actionable**. Bad: "this section needs work." Good: "Use a 3-column card grid with icons — similar to Stripe's guidelines pattern."
- **Name the principle**. Visual hierarchy. Gestalt grouping. Whitespace. F-pattern scanning. These vocabulary words are how the agent looks up the right pattern.
- **Reference comparable products**. "Like Stripe", "like Linear's command bar", "like Vercel's monochrome dashboard."
- **Link the principle node** when applicable. `[[hover-states-subtle]]`, `[[shadows-whisper]]`, `[[color-monochromatic]]`.

## When to apply

- Any team using an AI coding agent on UI work.
- Solo developers who want structured design-review on their own work.
- Design engineers who want to give precise feedback to PMs / engineers without writing essays.

## When NOT to apply

- Production environments — Agentation is dev-only.
- Pre-launch marketing pages — at low frequency, manual pointing is faster than setting up the toolbar.
- Components without a localhost preview — Agentation needs a running app to click on.

## Gotcha

Annotation selectors break when the DOM changes. If you annotate `.product-card > div:nth-child(3)` and someone reorders the divs, the annotation now points at the wrong element. Prefer `data-testid` or stable class names. Audit annotations weekly — old broken ones add noise without signal.

Also: Agentation's license is PolyForm Shield 1.0.0 (non-permissive — restricts use by competing products). Read the license before adopting in a commercial product that might overlap with Agentation's space.

## Sources

- [agentation.com](https://www.agentation.com) — product site.
- [github.com/benjitaylor/agentation](https://github.com/benjitaylor/agentation) — source, MCP server, skill.
- [skills.sh/benjitaylor/agentation/agentation](https://www.skills.sh/benjitaylor/agentation/agentation) — installable skill.
- Benji Taylor — [benji.org/annotating](https://benji.org/annotating), [benji.org/agentation](https://benji.org/agentation).
- Related: [[pointing-beats-describing]] (the underlying principle), [[review-format]] (the markdown table format Agentation's output pairs with), [[using-design-md]] (companion workflow for design-token guidance).
