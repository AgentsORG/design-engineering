import type { ReactNode } from 'react'
import { Bar, Stage, Text } from '../../kit'
import './pov.css'

// One brief, seven tastes. The brief is one small product moment, the same
// in every scene: a card that offers a daily reminder at 7:30 pm, with a
// title, one line of copy, one value, a primary and a secondary button.
// Each fork renders it strictly from its own pov file (colour, type, radii,
// depth, button construction, case rules, voice); the DOM is identical and
// only the fork's class changes, so every difference in the stills comes
// from the taste layer. No brand's logo or mascot artwork is drawn; where a
// product needs a name it is plain text, and here none does.

export type ForkId = 'default' | 'duolingo' | 'campus-binge' | 'smash-and-clash' | 'swiggy' | 'cursor' | 'aave'

type Fork = {
  /** The tile copy in the gallery: a bold lead, then a grey continuation */
  name: string
  stance: string
  /** The product surface behind the card in the single still */
  panel: string
  title: ReactNode
  copy: string
  label: string
  value: string
  primary: string
  secondary: string
  /** Reading order of the two buttons: the primary leads where the fork
   * puts it first (stacked on top, or left of a quiet text button) */
  primaryFirst?: boolean
}

export const FORKS: Record<ForkId, Fork> = {
  // references/meta/pov.md: restrained, one quiet accent, sentence case
  default: {
    name: 'Default.',
    stance: 'Restrained: hairlines, near-black, nothing loud.',
    panel: 'Notifications',
    title: 'Daily reminder',
    copy: 'One notification a day, at a time you choose.',
    label: 'Time',
    value: '7:30 pm',
    primary: 'Turn on',
    secondary: 'Not now',
  },
  // Lowercase rounded display, ALL CAPS buttons (via CSS), numerals,
  // contractions, no punctuation in buttons
  duolingo: {
    name: 'Duolingo.',
    stance: 'Physical, loud and kind: every button has a lip.',
    panel: 'Settings',
    title: 'protect your streak',
    copy: 'We’ll remind you at 7:30 pm so your streak stays safe.',
    label: 'day streak',
    value: '12',
    primary: 'Turn on',
    secondary: 'No thanks',
    primaryFirst: true,
  },
  // One gradient word chosen for meaning, Hinglish where a student would,
  // labels in the student's words
  'campus-binge': {
    name: 'Campus Binge.',
    stance: 'Calm and green: one gradient word, light only.',
    panel: 'Your map',
    title: <>Stay on your <span className="pv-grad">road</span></>,
    copy: 'Roz 7:30 pm pe ek ping, with this week’s one step.',
    label: 'Every day',
    value: '7:30 pm',
    primary: 'Remind me daily',
    secondary: 'Later',
    primaryFirst: true,
  },
  // A friendly game host: short, upbeat, "you"; quiet action first
  'smash-and-clash': {
    name: 'Smash&Clash.',
    stance: 'A toy you can press: tilted candy on navy lips.',
    panel: 'Lobby',
    title: 'Daily duel',
    copy: 'Get a ping at 7:30 pm when today’s duel opens.',
    label: 'Every day',
    value: '7:30 pm',
    primary: 'Turn on',
    secondary: 'Not now',
  },
  // Short, punchy, sentence case, Hinglish where people would use it
  swiggy: {
    name: 'Swiggy.',
    stance: 'One orange, one rounded panel, pills on Salt.',
    panel: 'Dinner, sorted.',
    title: 'Hungry at 7:30?',
    copy: 'We’ll nudge you with what’s open near you.',
    label: 'Every day',
    value: '7:30 pm',
    primary: 'Turn on',
    secondary: 'Abhi nahi',
    primaryFirst: true,
  },
  // Plain, the machine's words in the monospace
  cursor: {
    name: 'Cursor.',
    stance: 'Warm paper, one orange, mono for the machine.',
    panel: 'Settings',
    title: 'Daily review',
    copy: 'One notification at 7:30 pm with the diffs your agents left open.',
    label: 'Schedule',
    value: '19:30 local',
    primary: 'Turn on',
    secondary: 'Not now',
  },
  // Friendly money software, numbers in the monospace
  aave: {
    name: 'Aave.',
    stance: 'Friendly money: warm white, periwinkle in steps.',
    panel: 'Dashboard',
    title: 'Daily check-in',
    copy: 'A friendly note at 7:30 pm on how your positions are doing.',
    label: 'Health factor',
    value: '2.41',
    primary: 'Turn on',
    secondary: 'Maybe later',
  },
}

/** The moment itself: the same five parts in every fork. */
export function Moment({ fork, className }: { fork: ForkId; className?: string }) {
  const f = FORKS[fork]
  return (
    <section className={`pv-card${className ? ` ${className}` : ''}`}>
      <div className="pv-title">{f.title}</div>
      <Text className="pv-copy" wrap>{f.copy}</Text>
      <div className="pv-value">
        <Text className="pv-value__num">{f.value}</Text>
        <Text className="pv-value__label">{f.label}</Text>
      </div>
      <div className="pv-actions">
        {(f.primaryFirst ? ['primary', 'secondary'] as const : ['secondary', 'primary'] as const).map((kind) => (
          <span key={kind} className="pv-btn" data-kind={kind}><span className="pv-btn__label">{f[kind]}</span></span>
        ))}
      </div>
    </section>
  )
}

/** The product surface the moment sits over: a sidebar of filler, one real
 * title, rows of filler. Pinned top and off the right and the bottom. */
function Panel({ fork }: { fork: ForkId }) {
  return (
    <div className="pv-panel">
      <aside className="pv-side">
        {[64, 80, 56, 72, 60].map((w, i) => <Bar key={i} w={w} h={8} r={4} tone={i === 1 ? 4 : 2} className="pv-fill" />)}
      </aside>
      <main className="pv-main">
        <Text className="pv-panel__title">{FORKS[fork].panel}</Text>
        {[150, 118, 168, 104, 138].map((w, i) => (
          <div key={i} className="pv-row">
            <span className="pv-row__text">
              <Bar w={w * 0.5} h={8} r={4} tone={3} className="pv-fill" />
              <Bar w={w} h={6} r={3} tone={2} className="pv-fill" />
            </span>
            <Bar w={34} h={18} r={9} tone={1} className="pv-fill pv-row__end" />
          </div>
        ))}
      </main>
    </div>
  )
}

/** One fork's still: its ground, its product surface, the moment in front. */
export function ForkScene({ fork }: { fork: ForkId }) {
  return (
    <Stage width={600} height={380} className={`pv pv-scene pv--${fork}`}>
      {() => (
        <>
          <Panel fork={fork} />
          <Moment fork={fork} />
        </>
      )}
    </Stage>
  )
}
