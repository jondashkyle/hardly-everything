const html = require('choo/html')
const linkList = require('../views/link-list')
const css = require('../components/css')

/**
 * Index
 */
module.exports = (state, prev, send) => {
  return html`<div>
    ${linkList(state, prev, send)}
    ${css(state, prev, send)}
  </div>`
}
