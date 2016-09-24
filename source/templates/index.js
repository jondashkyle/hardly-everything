const html = require('choo/html')
const linkList = require('../views/link-list')
const panel = require('../views/panel')
const linkNavigation = require('../views/link-navigation')
const linkPanel = require('../views/link-panel')
const css = require('../components/css')

/**
 * Index
 */
module.exports = (state, prev, send) => {
  return html`<div>
    ${panel(state, prev, send)}
    ${state.panel.open ? linkPanel(state, prev, send) : ''}
    ${linkList(state, prev, send)}
    ${linkNavigation(state, prev, send)}
    ${css(state, prev, send)}
  </div>`
}
