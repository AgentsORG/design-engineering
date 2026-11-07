// The capture route the filming scripts open: ?capture=<example>[&still=1]
// mounts one scene from examples/ in #example at its design size.
const params = new URLSearchParams(location.search)

async function boot() {
  const name = params.get('capture')
  const root = document.getElementById('root')!
  if (!name) {
    root.innerHTML = '<p style="padding:24px;font:13px system-ui">Open <code>?capture=de-verbs</code> (or de-install, de-agents, de-review, de-council, de-grade, de-bench).</p>'
    return
  }
  const { mount } = await import('./preview')
  await mount(name, params.get('still') === '1')
}

boot().catch((error) => {
  const message = document.createElement('p')
  message.setAttribute('role', 'alert')
  message.textContent = `This scene could not load: ${error instanceof Error ? error.message : String(error)}.`
  document.getElementById('root')!.replaceChildren(message)
})
