const h = require('choo/html')
const panel = require('../views/panel')
const entryList = require('../views/entry-list')
const entryNavigation = require('../views/entry-navigation')
const entryPanel = require('../views/entry-panel')
const css = require('../components/css')

const overlayEdit = h`
  <div
    class="psf t0 l0 b0 r0 op20 pen bg-edit"
    style="z-index: -1;"
  ></div>
`

/**
 * Index
 */
module.exports = (state, prev, send) => h`
  <div>
    ${panel(state, prev, send)}
    ${entryList(state, prev, send)}
    ${state.panel.open ? entryPanel(state, prev, send) : ''}
    ${state.panel.active ? overlayEdit : ''}
    ${entryNavigation(state, prev, send)}
    ${css(state, prev, send)}
  </div>
`
