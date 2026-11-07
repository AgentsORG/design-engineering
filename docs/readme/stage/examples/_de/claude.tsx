import type { ReactNode } from 'react'
import { Caret } from '../../kit'

// Claude Code's TUI marks, drawn the way it draws them, for scenes inside
// Window chrome="terminal". The welcome box is Benji Taylor's from
// examples/hero-demo (Stageshow, MIT), recolored for the dark terminal.
// The mascot and name are Anthropic's; see NOTICE.md.

/** An assistant turn: ⏺ then the text. `tool` makes the dot green, as a finished tool call is drawn. */
export function Turn({ tool, children }: { tool?: boolean; children: ReactNode }) {
  return (
    <div className="de-cc-turn">
      <span className="de-cc-dot" data-tool={tool || undefined}>⏺</span>
      <span>{children}</span>
    </div>
  )
}

/** A tool's result line under its call. */
export function Result({ children }: { children: ReactNode }) {
  return <div className="dim">{'  ⎿  '}{children}</div>
}

/** The input box at the foot of the session, empty, with the kit's caret. */
export function Input() {
  return (
    <>
      <div className="de-cc-in">{'>'}<Caret /></div>
      <div className="dim de-cc-hint">? for shortcuts</div>
    </>
  )
}

/** The welcome box Claude Code prints on start. */
export function Welcome({ width = 300, model = 'Opus 5.5', cwd = '~/my-app' }: { width?: number; model?: string; cwd?: string }) {
  const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  return (
    <svg viewBox="0 0 240 76" fill="none" style={{ width, height: 'auto', display: 'block', margin: '4px 0 2px' }} aria-hidden>
      <rect x="4" y="4" width="148" height="68" rx="3" stroke="#D97757" strokeWidth="1.2" fill="none" />
      <text x="160" y="16" fill="rgba(255,255,255,0.86)" fontSize="9" fontFamily={mono} fontWeight="500">Claude Code</text>
      <text x="160" y="26" fill="rgba(255,255,255,0.42)" fontSize="7" fontFamily={mono}>v2.1.14</text>
      <text x="78" y="20" fill="rgba(255,255,255,0.72)" fontSize="8" fontFamily={mono} textAnchor="middle">Welcome back!</text>
      <g transform="translate(56, 26) scale(0.35)">
        <path d="M104.998 0H20.998V16.2H104.998V0Z" fill="#D77757" />
        <path d="M34.998 16.1953H20.998V32.3953H34.998V16.1953Z" fill="#D77757" />
        <rect x="35" y="14.7266" width="56" height="29.4545" fill="black" />
        <path d="M84 14.7266H42V36.8175H84V14.7266Z" fill="#D77757" />
        <path d="M105.002 16.1953H91.002V32.3953H105.002V16.1953Z" fill="#D77757" />
        <path d="M119 32.4023H7V48.6023H119V32.4023Z" fill="#D77757" />
        <path d="M104.998 48.5977H20.998V64.7977H104.998V48.5977Z" fill="#D77757" />
        <path d="M35 64.8047H28V81.0047H35V64.8047Z" fill="#D77757" />
        <path d="M49 64.8047H42V81.0047H49V64.8047Z" fill="#D77757" />
        <path d="M84 64.8047H77V81.0047H84V64.8047Z" fill="#D77757" />
        <path d="M98.002 64.8047H91.002V81.0047H98.002V64.8047Z" fill="#D77757" />
      </g>
      <text x="78" y="62" fill="rgba(255,255,255,0.42)" fontSize="7" fontFamily={mono} textAnchor="middle">{model} · {cwd}</text>
    </svg>
  )
}
