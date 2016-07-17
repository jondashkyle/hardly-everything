const html = require('choo/html')
const linkForm = require('../components/link-form')

module.exports = (state, prev, send) => {
  return html`
    <div class="psf t0 l0 r0 b0 xjc xac z2 ${state.panel.open ? 'x' : 'dn'}">
      ${linkForm(state, prev, send)}
    </div>
  `
}
