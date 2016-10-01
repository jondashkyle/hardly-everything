const h = require('choo/html')

const entryList = require('../containers/entry-list')
const entryNavigation = require('../containers/entry-navigation')

const panelOverlay = require('../components/overlay-edit')
const panelOptions = require('../containers/panel-options')
const panelEntry = require('../containers/panel-entry')

const css = require('../components/css')

module.exports = (state, prev, send) => h`
  <div>
    ${entryList(state, prev, send)}
    ${entryNavigation(state, prev, send)}

    ${panelOptions(state, prev, send)}
    ${state.ui.stagingActive ? panelEntry(state, prev, send) : ''}
    ${state.ui.panelActive ? panelOverlay : ''}

    ${css(state, prev, send)}
  </div>
`
