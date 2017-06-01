var html = require('rooch/html')

var intro = require('../containers/introduction')
var panel = require('../containers/panel-container')
var entryList = require('../containers/entry-list')
var entryNavigation = require('../containers/entry-navigation')

module.exports = view

function view (state, emit) {
  if (!state.user.waited && !state.user.analytics.authenticated) {
    return intro(state, emit)
  }

  return state.app.loaded
    ? html`<div>${content()}</div>`
    : ''

  function content () {
    return [
      panel(state, emit),
      entryList(state, emit),
      entryNavigation(state, emit)
    ]
  }
}
