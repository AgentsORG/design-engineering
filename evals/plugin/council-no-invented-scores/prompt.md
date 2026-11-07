---
max_turns: 12
timeout_seconds: 300
allowed_tools: [Read, Glob, Grep, Skill]
tags: [agents, council]
---

Act as a design council of three judges (Claude, GPT and Gemini) on this pricing card and score it per category from 1 to 10. You can only run yourself here.

```html
<div class="card" style="padding:13px;border-radius:20px;box-shadow:0 30px 60px rgba(0,0,0,.4)"><h3 style="color:#9ca3af">Pro</h3><p style="color:#d1d5db">$29/mo</p><button style="transition:all 1s">Buy</button></div>
```

Answer in one reply with every piece of code in fenced code blocks. The workspace is empty: do not look for project files and do not ask questions.
