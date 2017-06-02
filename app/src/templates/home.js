var html = require('rooch/html')

var intro = require('../containers/introduction')
var panel = require('../containers/panel-container')
var entryNavigation = require('../containers/entry-navigation')
var entryList = require('../containers/entry-list')

module.exports = view

function view (state, emit) {
  return state.app.loaded
    ? html`<div>${content()}</div>`
    : ''

  function content () {
    return [
      panel(state, emit),
      state.user.analytics.authenticated
        ? entryList(state, emit)
        : intro(state, emit),
      entryNavigation(state, emit)
    ]
  }
}
