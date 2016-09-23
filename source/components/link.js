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
    const staging = state.links.all.find(link => link.id === id)
    if (id !== undefined && staging !== undefined) {
      send('panel:edit', {
        id: id,
        staging: staging
      })
    }

    event.preventDefault()
  } else {
    send('links:dismiss', { id: id })
  }
}

const view = (state, prev, send, link) => {
  return html`
    <div class="component-link c12" data-id="${link.id}">
      <a
        href="${link.url}"
        class="dib design-block-padding"
        onclick=${e => handleClick(state, prev, send, event)}>
        ${link.title}
      </a>
    </div>
  `
}

module.exports = { view }
