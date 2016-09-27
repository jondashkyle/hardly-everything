const html = require('choo/html')
const entryForm = require('../components/entry-form')

const handleClick = (event, send) => {
  if (event.target.hasAttribute('data-entry-panel')) {
    send('panel:open', { open: false })
  }
}

module.exports = (state, prev, send) => {
  return html`
    <div
      data-entry-panel
      class="psf t0 l0 r0 b0 xjc xac z2 x"
      onclick=${event => handleClick(event, send)}>
      ${entryForm(state, prev, send)}
    </div>
  `
}
