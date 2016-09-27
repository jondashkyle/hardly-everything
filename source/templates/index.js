const html = require('choo/html')
const panel = require('../views/panel')
const entryList = require('../views/entry-list')
const entryNavigation = require('../views/entry-navigation')
const entryPanel = require('../views/entry-panel')
const css = require('../components/css')

/**
 * Index
 */
module.exports = (state, prev, send) => {
  return html`<div>
    ${panel(state, prev, send)}
    ${entryList(state, prev, send)}
    ${state.panel.open ? entryPanel(state, prev, send) : ''}
    ${entryNavigation(state, prev, send)}
    ${css(state, prev, send)}
  </div>`
}
