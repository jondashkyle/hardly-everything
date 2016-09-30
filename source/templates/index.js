const h = require('choo/html')

const entryList = require('../containers/entry-list')
const entryNavigation = require('../containers/entry-navigation')

const panelOverlay = require('../components/overlay-edit')
const panelDesign = require('../containers/panel-design')
const panelEntry = require('../containers/panel-entry')

const css = require('../components/css')

module.exports = (state, prev, send) => h`
  <div>
    ${entryList(state, prev, send)}
    ${entryNavigation(state, prev, send)}

    ${panelDesign(state, prev, send)}
    ${state.panel.open ? panelEntry(state, prev, send) : ''}
    ${state.panel.active ? panelOverlay : ''}

    ${css(state, prev, send)}
  </div>
`
