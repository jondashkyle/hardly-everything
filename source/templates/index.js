const h = require('choo/html')

const entryList = require('../containers/entry-list')
const entryNavigation = require('../containers/entry-navigation')

const panelOverlay = require('../components/overlay-edit')
const panelOptions = require('../containers/panel-options')
const panelEntry = require('../containers/panel-entry')

const css = require('../components/css')

const view = (state, prev, send) => {
  if (
    !state.entries.loaded ||
    !state.options.loaded.type ||
    !state.options.loaded.data ||
    !state.user.loaded
  ) {
    return ''
  }

  document.body.removeChild(document.querySelector('[data-load]'))

  return [
    entryList(state, prev, send),
    entryNavigation(state, prev, send),
    panelOptions.view(state, prev, send),
    state.ui.stagingActive
      ? panelEntry(state, prev, send)
      : '',
    state.ui.panelActive
      ? panelOverlay
      : '',
    css(state, prev, send)
  ]
}

module.exports = (state, prev, send) => {
  return h`<div>${view(state, prev, send)}</div>`
}
