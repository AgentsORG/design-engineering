import { Bar, Stage, Text, Window, Menu, Kbd } from '../../kit'
import '../_de/de.css'

// The entry point: one command, the verb menu open under it, `council` highlighted.
const VERBS: [string, string][] = [
  ['review', 'Before / After / Why table'],
  ['polish', 'States and optical fixes, applied'],
  ['motion', 'Timing, easing, springs, with values'],
  ['council', 'Cross-model judges, loop to threshold'],
  ['grade', 'Score a design episode, human or agent'],
]

export default function Verbs() {
  return (
    <Stage width={720} height={340} className="de">
      {() => (
        <Window title="Claude Code — my-app" className="de-win">
          <div className="de-body">
            <div className="de-mono"><span className="de-dim">› </span>/design-engineering <span className="de-accent">council</span></div>
            <Menu
              value={3}
              className="de-menu"
              items={[
                ...VERBS.map(([v, d]) => (
                  <div key={v} className="de-mi">
                    <Text className="de-mono">{v}</Text>
                    <Text className="de-small">{d}</Text>
                  </div>
                )),
                <div key="m1" className="de-mi"><Bar w={52} tone={3} /><Bar w={150} tone={2} /></div>,
                <div key="m2" className="de-mi"><Bar w={40} tone={3} /><Bar w={120} tone={2} /></div>,
              ]}
            />
            <div className="de-line" style={{ width: 460 }}>
              <Text className="de-small de-dim">22 verbs, one entry</Text>
              <Kbd keys={['↵']} />
            </div>
          </div>
        </Window>
      )}
    </Stage>
  )
}
