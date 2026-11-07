---
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
tags: [motion, surface]
---

Make this card lift on hover:

```css
.card { transition: all 0.3s ease-in; }
.card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px rgba(0,0,0,0.3); }
```

Answer in one reply with every piece of code in fenced code blocks. The workspace is empty: do not look for project files and do not ask questions.
