const html = require('choo/html')
const linkForm = require('../components/link-form')

const handleClick = (event, send) => {
  if (event.target.hasAttribute('data-link-panel')) {
    send('panel:open', { open: false })
  }
}

module.exports = (state, prev, send) => {
  return html`
    <div
      data-link-panel
      class="psf t0 l0 r0 b0 xjc xac z2 x"
      onclick=${event => handleClick(event, send)}>
      ${linkForm(state, prev, send)}
    </div>
  `
}
