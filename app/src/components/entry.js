const html = require('rooch/html')

/**
 * Tags
 */
const templateTags = (tags) => tags.map(tag => html`
  <span><a href="/tags/${tag}">${tag}</a></span>
`)

/**
 * Handle Click
 */
const handleClick = (state, event, emit) => {
  const parent = event.target.closest('[data-id]')
  const id = parent.getAttribute('data-id')

  if (state.ui.panelActive) {
    const staging = state.entries.all[id]
    if (id !== undefined && staging !== undefined) {
      emit('staging:entry', staging)
      emit('ui:update', { stagingActive: true })
    }

    event.preventDefault()
  } else {
    emit('entries:dismiss', { id: id })
  }
}

module.exports = Entry

function Entry (state, data, emit) {
  return html`
    <div class="component-entry c12" data-id="${data.id}">
      <a
        href="${data.url}"
        class="dib design-block-padding tc-black"
        onclick=${e => handleClick(state, event, emit)}>
        ${data.title}
      </a>
    </div>
  `
}
