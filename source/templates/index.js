const html = require('choo/html')
const panel = require('../views/panel')
const linkList = require('../views/link-list')
const css = require('../components/css')

/**
 * Index
 */
module.exports = (state, prev, send) => {
  return html`<div>
    ${panel(state, prev, send)}
    ${linkList(state, prev, send)}
    ${css(state, prev, send)}
  </div>`
}
