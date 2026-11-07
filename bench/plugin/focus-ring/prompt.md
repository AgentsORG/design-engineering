---
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
tags: [components, a11y]
---

Keyboard users say they cannot see where they are on our page. Fix it:

```css
*:focus { outline: none; }
.btn:focus { box-shadow: none; }
```

Answer in one reply with every piece of code in fenced code blocks. The workspace is empty: do not look for project files and do not ask questions.
