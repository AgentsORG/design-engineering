import type { ReactNode } from 'react'
import { Caret } from '../../kit'

// Claude Code's TUI marks, drawn the way it draws them, for scenes inside
// Window chrome="terminal": the start header as plain text, ⏺ turns, ⎿
// results and the input box. No Anthropic artwork.

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

/** The header Claude Code prints on start: its name and version, then the
 * model and folder, as plain text. No artwork. */
export function Header({ version = 'v2.1.319', model = 'Opus 5.5', cwd = '~/my-app' }: { version?: string; model?: string; cwd?: string }) {
  return (
    <div className="de-cc-head">
      <div><span className="w">Claude Code</span> <span className="dim">{version}</span></div>
      <div className="dim">{model} · {cwd}</div>
    </div>
  )
}
