var html = require('rooch/html')

var entryList = require('../containers/entry-list')
var entryNavigation = require('../containers/entry-navigation')

var panelOverlay = require('../components/overlay-edit')
var panelOptions = require('../containers/panel-options')
var panelEntry = require('../containers/panel-entry')

var css = require('../components/css')

function view (state, emit) {
  return [
    entryList(state, emit),
    entryNavigation(state, emit),
    panelOptions.view(state, emit),
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
