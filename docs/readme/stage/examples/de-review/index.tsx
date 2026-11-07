import { Code, Prompt, Stage, Window, type CodeLine } from '../../kit'
import { Input, Turn } from '../_de/claude'
import '../_de/de.css'

// Built from examples/ai-chat (the question sent, the answer under it, its
// sources last) inside examples/hero-demo's Claude Code terminal, with the
// kit's Code part for the review: each finding is the Before line (−), the
// After line (+) and its Why as a comment naming the node that owns the
// rule. Corner bleed: inset top-left, off the right and the bottom.
// Each finding at its own line in Card.tsx: Before, After, Why
const FINDINGS: [number, CodeLine[]][] = [
  [14, [
    { text: 'transition: all .3s ease-in;', kind: 'del' },
    { text: 'transition: transform 160ms cubic-bezier(.25, 1, .5, 1);', kind: 'add' },
    { text: '// Name the properties; enter on ease-out. [[easing-curves]]', number: false },
  ]],
  [22, [
    { text: 'transform: scale(0);', kind: 'del' },
    { text: 'transform: scale(.95); opacity: 0;', kind: 'add' },
    { text: '// Nothing appears from nothing. [[never-scale-from-zero]]', number: false },
  ]],
  [31, [
    { text: '.card:hover { translate: 0 -2px; }', kind: 'del' },
    { text: '@media (hover: hover) { .card:hover { translate: 0 -2px; } }', kind: 'add' },
    { text: '// No sticky hover after a tap. [[touch-and-focus]]', number: false },
  ]],
]

export default function Review() {
  return (
    <Stage width={800} height={460} className="de de-review">
      {() => (
        <Window chrome="terminal" title="my-app — claude" className="de-win" style={{ width: 800, height: 480 }}>
          <div className="ss-term de-term">
            <Prompt path="~/my-app">claude</Prompt>
            <div className="w">{'> /design-engineering review src/components/Card.tsx'}</div>
            <div className="gap" />
            <Turn>Three findings in Card.tsx. Before (−), After (+), and Why:</Turn>
            {FINDINGS.map(([start, lines]) => <Code key={start} lines={lines} start={start} highlight={false} />)}
            <div className="gap" />
            <Turn>Verdict: ship after these three. Nothing else blocks.</Turn>
            <Input />
          </div>
        </Window>
      )}
    </Stage>
  )
}
