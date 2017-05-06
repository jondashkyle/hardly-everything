const h = require('choo/html')

const entryList = require('../containers/entry-list')
const entryNavigation = require('../containers/entry-navigation')

const panelOverlay = require('../components/overlay-edit')
const panelOptions = require('../containers/panel-options')
const panelEntry = require('../containers/panel-entry')

const css = require('../components/css')

let loaded = false

const init = () => {
  loaded = true
  const el = document.querySelector('[data-load]')
  return el ? document.body.removeChild(el) : ''
}

const view = (state, prev, send) => {
  if (
    !state.entries.loaded ||
    !state.options.loaded.typeCustom ||
    !state.options.loaded.typeLocal ||
    !state.options.loaded.data
  ) {
    return ''
  }

  loaded ? '' : init()

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
