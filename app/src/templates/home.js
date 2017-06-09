var html = require('rooch/html')

var Intro = require('../containers/introduction')
var Panel = require('../containers/panel-container')
var EntryNavigation = require('../containers/entry-navigation')
var EntryList = require('../containers/entry-list')

module.exports = view

function view (state, emit) {
  var panelProps = {
    isHoverActive: true && !state.ui.mobile,
    view: state.ui.panel.view
  }

  return state.app.loaded
    ? html`<div>${content()}</div>`
    : ''

  function content () {
    return [
      Panel(state, panelProps, emit),
      state.user.analytics.authenticated
        ? EntryList(state, emit)
        : Intro(state, emit),
      EntryNavigation(state, emit)
    ]
  }
}
