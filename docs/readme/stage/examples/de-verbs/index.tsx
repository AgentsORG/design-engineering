import { Prompt, Stage, Window } from '../../kit'
import { Header, Input, Turn } from '../_de/claude'
import '../_de/de.css'

// Built from examples/hero-demo (its Claude Code terminal, brought forward
// as the hero) with examples/raycast's list: a section of results with the
// verbs that fit now. `/design-engineering help` answers with the verbs
// that fit the change in front of you, then where the rest are.
// Corner bleed: the terminal is inset top-left by the gutter and runs off
// the right and the bottom, under the input box.
//
// Real strings: the launch, the command, three verbs and what they do,
// the count. Everything else is Claude Code's own chrome.
const FIT: [string, string][] = [
  ['review ', 'A Before / After / Why table, scoped to the diff'],
  ['motion ', 'Timing, easing and springs, with real values'],
  ['council', 'Judges on three providers score it until all clear the bar'],
]

export default function Verbs() {
  return (
    <Stage width={800} height={380} className="de de-verbs">
      {() => (
        <Window chrome="terminal" title="my-app — claude" className="de-win" style={{ width: 812, height: 400 }}>
          <div className="ss-term de-term">
            <Prompt path="~/my-app">claude</Prompt>
            <Header />
            <div className="w">{'> /design-engineering help'}</div>
            <div className="gap" />
            <Turn>Three verbs fit the change in front of you:</Turn>
            {FIT.map(([verb, what]) => (
              <div key={verb}>{'  '}<span className="a">{verb}</span>{'   '}<span className="w">{what}</span></div>
            ))}
            <div className="dim">{'  '}22 verbs in all. Run one: /design-engineering {'<verb>'} [target]</div>
            <Input />
          </div>
        </Window>
      )}
    </Stage>
  )
}
