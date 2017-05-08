const html = require('rooch/html')

const entryList = require('../containers/entry-list')
const entryNavigation = require('../containers/entry-navigation')

const panelOverlay = require('../components/overlay-edit')
const panelOptions = require('../containers/panel-options')
const panelEntry = require('../containers/panel-entry')

const css = require('../components/css')

function view (state, emit) {
  return [
    entryList(state, emit),
    entryNavigation(state, emit),
    // panelOptions.view(state, emit),
    // state.ui.stagingActive
    //   ? panelEntry(state, emit)
    //   : '',
    // state.ui.panelActive
    //   ? panelOverlay
    //   : '',
    css(state, emit)
  ]
}

module.exports = (state, emit) => {
  return state.app.loaded
    ? html`<div>${view(state, emit)}</div>`
    : html`<div>nah</div>`
  // return html`<div>${view(state, emit)}</div>`
}
