const html = require('choo/html')

/**
 * Tags
 */
const templateTags = (tags) => tags.map(tag => html`
  <span><a href="/tags/${tag}">${tag}</a></span>
`)

/**
 * Handle Click
 */
const handleClick = (state, prev, send, event) => {
  const parent = event.target.closest('[data-id]')
  const id = parent.getAttribute('data-id')

  if (state.panel.active) {
    const staging = state.entries.all.find(entry => entry.id === id)
    if (id !== undefined && staging !== undefined) {
      send('panel:edit', {
        id: id,
        staging: staging
      })
    }

    event.preventDefault()
  } else {
    send('entries:dismiss', { id: id })
  }
}

const view = (state, prev, send, entry) => {
  return html`
    <div class="component-entry c12" data-id="${entry.id}">
      <a
        href="${entry.url}"
        class="dib design-block-padding"
        onclick=${e => handleClick(state, prev, send, event)}>
        ${entry.title}
      </a>
    </div>
  `
}

module.exports = { view }
