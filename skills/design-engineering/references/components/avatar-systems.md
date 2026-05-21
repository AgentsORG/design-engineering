---
title: avatar-systems
summary: Use real photos when available; fallback to deterministic generated avatars. DiceBear provides 30+ styles for the fallback.
tags: [components, avatars, dicebear, identity]
---

# Avatar systems

Every product with users needs an avatar strategy. Three tiers:

1. **Real photos** — uploaded by the user. Always preferred.
2. **Initials** — the most common fallback (Slack, GitHub, Linear all use this).
3. **Generated avatars** — deterministic, fun, branded. [DiceBear](https://www.dicebear.com/) is the de-facto library.

Pick a strategy *before* you scale — switching avatar systems mid-product is painful because every user has visually adapted to "what they look like" in your UI.

## DiceBear — what it is

[DiceBear](https://www.dicebear.com/) is an open-source library that generates SVG avatars from a string seed (usually the user's id, email, or name). Same seed always produces the same avatar — so users see the same generated face every visit.

- 30+ style packs (`adventurer`, `bottts`, `lorelei`, `pixel-art`, etc.).
- HTTP API: `https://api.dicebear.com/9.x/<style>/svg?seed=<seed>`.
- NPM packages: `@dicebear/core` + `@dicebear/<style>` for self-hosting.
- Open source: [github.com/dicebear/dicebear](https://github.com/dicebear/dicebear) and [github.com/dicebear/styles](https://github.com/dicebear/styles).
- License: most styles are CC0 / free; a few designer-contributed styles have specific terms — check per style.

## Style catalogue

Quick reference. Preview URLs use seed `Felix` so you can see what each style looks like. Click the live link to scrub seeds in the playground.

| Style | Best for | Live preview |
|---|---|---|
| `adventurer` | Friendly, playful apps | ![adventurer](https://api.dicebear.com/9.x/adventurer/svg?seed=Felix) |
| `adventurer-neutral` | Friendly, no background | ![adventurer-neutral](https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix) |
| `avataaars` | Cartoon-style, broad appeal | ![avataaars](https://api.dicebear.com/9.x/avataaars/svg?seed=Felix) |
| `avataaars-neutral` | Cartoon, no background | ![avataaars-neutral](https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Felix) |
| `big-ears` | Animal-style, casual | ![big-ears](https://api.dicebear.com/9.x/big-ears/svg?seed=Felix) |
| `big-ears-neutral` | Animal, no background | ![big-ears-neutral](https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Felix) |
| `big-smile` | Cheerful, simple | ![big-smile](https://api.dicebear.com/9.x/big-smile/svg?seed=Felix) |
| `bottts` | Robots — great for AI agents | ![bottts](https://api.dicebear.com/9.x/bottts/svg?seed=Felix) |
| `bottts-neutral` | Robots, no background | ![bottts-neutral](https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Felix) |
| `croodles` | Hand-drawn, scrappy | ![croodles](https://api.dicebear.com/9.x/croodles/svg?seed=Felix) |
| `croodles-neutral` | Hand-drawn, no background | ![croodles-neutral](https://api.dicebear.com/9.x/croodles-neutral/svg?seed=Felix) |
| `dylan` | Stylized portraits (paid) | ![dylan](https://api.dicebear.com/9.x/dylan/svg?seed=Felix) |
| `fun-emoji` | Emoji-style faces | ![fun-emoji](https://api.dicebear.com/9.x/fun-emoji/svg?seed=Felix) |
| `glass` | Frosted glass effect (paid) | ![glass](https://api.dicebear.com/9.x/glass/svg?seed=Felix) |
| `icons` | Iconographic, abstract | ![icons](https://api.dicebear.com/9.x/icons/svg?seed=Felix) |
| `identicon` | Geometric, GitHub-style | ![identicon](https://api.dicebear.com/9.x/identicon/svg?seed=Felix) |
| `initials` | Letter-based, most common | ![initials](https://api.dicebear.com/9.x/initials/svg?seed=Felix%20Initial) |
| `lorelei` | Friendly illustrated portraits | ![lorelei](https://api.dicebear.com/9.x/lorelei/svg?seed=Felix) |
| `lorelei-neutral` | Friendly, no background | ![lorelei-neutral](https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=Felix) |
| `micah` | Modern minimal portraits | ![micah](https://api.dicebear.com/9.x/micah/svg?seed=Felix) |
| `miniavs` | Tiny stylized avatars | ![miniavs](https://api.dicebear.com/9.x/miniavs/svg?seed=Felix) |
| `notionists` | Notion-style hand-drawn | ![notionists](https://api.dicebear.com/9.x/notionists/svg?seed=Felix) |
| `notionists-neutral` | Notion-style, no background | ![notionists-neutral](https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Felix) |
| `open-peeps` | Vector illustration style | ![open-peeps](https://api.dicebear.com/9.x/open-peeps/svg?seed=Felix) |
| `personas` | Diverse illustrated portraits | ![personas](https://api.dicebear.com/9.x/personas/svg?seed=Felix) |
| `pixel-art` | 8-bit pixel avatars | ![pixel-art](https://api.dicebear.com/9.x/pixel-art/svg?seed=Felix) |
| `pixel-art-neutral` | Pixel art, no background | ![pixel-art-neutral](https://api.dicebear.com/9.x/pixel-art-neutral/svg?seed=Felix) |
| `rings` | Concentric rings, abstract | ![rings](https://api.dicebear.com/9.x/rings/svg?seed=Felix) |
| `shapes` | Geometric shapes | ![shapes](https://api.dicebear.com/9.x/shapes/svg?seed=Felix) |
| `thumbs` | Thumbprint-style geometric | ![thumbs](https://api.dicebear.com/9.x/thumbs/svg?seed=Felix) |

> Browse all styles interactively at [dicebear.com/styles](https://www.dicebear.com/styles). Source repo: [github.com/dicebear/styles](https://github.com/dicebear/styles).

## How to choose a style

| Product type | Suggested style |
|---|---|
| Professional B2B (CRM, analytics, fin) | `initials` (safest), or `shapes`/`thumbs` for abstract |
| AI assistant product (where avatar represents the AI) | `bottts` or `bottts-neutral` |
| Consumer social / community | `lorelei`, `notionists`, or `open-peeps` |
| Game / playful product | `pixel-art`, `adventurer`, `big-smile`, or `fun-emoji` |
| Privacy-focused / anonymous identity | `identicon`, `rings`, or `shapes` |
| Brand-led with hand-drawn feel | `croodles` or `notionists` |
| Minimal / Apple-like aesthetic | `micah` or `miniavs` |

## Implementation

### HTTP API (simplest)

```html
<img
  src="https://api.dicebear.com/9.x/lorelei/svg?seed=user-id-here"
  alt="User avatar"
  width="40"
  height="40"
/>
```

Cache-friendly (the URL is deterministic). For production, proxy through your CDN to avoid hitting DiceBear's API on every request.

### NPM (self-hosted)

```bash
npm install @dicebear/core @dicebear/lorelei
```

```ts
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/lorelei';

const avatar = createAvatar(lorelei, { seed: 'user-id-here' });
const svg = avatar.toString();
```

This avoids the network entirely. Recommended for any serious deployment.

### React (with fallback to real photo)

```tsx
function Avatar({ user, size = 40 }: AvatarProps) {
  if (user.photoUrl) {
    return <img src={user.photoUrl} alt={user.name} width={size} height={size} className="avatar" />;
  }
  
  const seed = user.id ?? user.email;
  return (
    <img
      src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(seed)}`}
      alt={user.name}
      width={size}
      height={size}
      className="avatar"
    />
  );
}
```

## Style options & customization

Each DiceBear style accepts options (skin colors, hair styles, background colors, etc.) as URL query params:

```
https://api.dicebear.com/9.x/lorelei/svg?seed=Felix&backgroundColor=transparent&hair=variant01
```

See per-style options at [dicebear.com/styles](https://www.dicebear.com/styles). Match the option set to your brand — e.g., restrict hair colors to your palette for tighter visual consistency.

## When to apply

- Any product where users need visual identity but real photos aren't reliably available.
- Auto-generated avatars for AI agents or assistants.
- Demo / staging environments where you need realistic-looking user data.
- Public profiles where users haven't uploaded a photo.

## When NOT to apply

- Healthcare / regulated industries where avatar variation can feel unprofessional. Use initials.
- High-trust contexts (legal, financial) where the AI-generated look might undermine credibility.
- Products where avatar fidelity is critical (dating apps, hiring). Require real photos.

## Gotcha

DiceBear's HTTP API has rate limits. For production, either:

- Self-host via the NPM package (recommended).
- Proxy + cache through your CDN.
- Generate avatars server-side once per user and store as a blob.

Hitting their public API from every page load *will* eventually rate-limit your users.

Also: a few styles are paid (designer-contributed). Verify license per style at [dicebear.com/styles](https://www.dicebear.com/styles) before committing.

## Sources

- DiceBear — [dicebear.com](https://www.dicebear.com/), [github.com/dicebear/dicebear](https://github.com/dicebear/dicebear), [github.com/dicebear/styles](https://github.com/dicebear/styles).
- DiceBear style index — [dicebear.com/styles](https://www.dicebear.com/styles).
- Related: [[icon-systems]], [[ai-default-tells]], [[hover-states-subtle]].
