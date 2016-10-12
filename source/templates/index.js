const h = require('choo/html')

const entryList = require('../containers/entry-list')
const entryNavigation = require('../containers/entry-navigation')
const introduction = require('../containers/introduction')

const panelOverlay = require('../components/overlay-edit')
const panelOptions = require('../containers/panel-options')
const panelEntry = require('../containers/panel-entry')

const css = require('../components/css')

const view = (state, prev, send) =>
  !state.entries.loaded ||
  !state.options.loaded ||
  !state.user.loaded
    ? ''
  : !state.user.analytics.authenticated
    ? [
      introduction(state, prev, send),
      css(state, prev, send)
    ]
  : [
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

module.exports = (state, prev, send) => h`
  <div>${view(state, prev, send)}</div>
`
