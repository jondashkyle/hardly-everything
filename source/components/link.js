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
  if (state.panel.active) {
    const parent = event.target.closest('[data-id]')
    const id = parent.getAttribute('data-id')
    const staging = state.links.all.filter(link => link.id === id)
    if (id !== undefined && staging.length >= 0) {
      send('panel:edit', {
        id: id,
        staging: staging[0]
      })
    }
    event.preventDefault()
  }
}

/**
 * Block
 */
exports.blocks = (state, prev, send, link) => {
  return html`
    <component-link
      class="component-link db c4 design-block-border"
      data-id="${link.id}"
    >
      <a
        href="${link.url}"
        class="x xjc xac tac design-block-padding"
        style="min-height: 20vh"
        onclick=${event => handleClick(state, prev, send, event)}
        >
        <div>
          <div>${link.title}</div>
        </div>
      </a>
    </component-link>
  `
}

/**
 * Inline
 */
exports.inline = (state, prev, send, link) => {
  return html`
    <component-link class="component-link" data-id="${link.id}">
      <a
        href="${link.url}"
        class="dib design-block-padding"
        onclick=${e => handleClick(state, prev, send, event)}>
        ${link.title}
      </a>
    </component-link>
  `
}

/**
 * Grid
 */
exports.grid = (state, prev, send, link) => {
  return html`
    <component-link class="component-link c3" data-id="${link.id}">
      <a
        href="${link.url}"
        class="dib design-block-padding"
        onclick=${e => handleClick(state, prev, send, event)}>
        ${link.title}
      </a>
    </component-link>
  `
}
