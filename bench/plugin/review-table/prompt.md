---
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
tags: [review, meta]
---

Review this button CSS and give the findings as a Before / After / Why table with a verdict:

```css
.btn { transition: all .5s ease-in; }
.btn:hover { transform: scale(1.1); }
.btn:focus { outline: none; }
```

Answer in one reply with every piece of code in fenced code blocks. The workspace is empty: do not look for project files and do not ask questions.
