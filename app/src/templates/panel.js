var html = require('rooch/html')

var panel = require('../containers/panel-container')
var entryList = require('../containers/entry-list')
var entryNavigation = require('../containers/entry-navigation')

module.exports = view

function view (state, emit) {
  return [
    panel(state, emit),
    !state.ui.mobile ? entryList(state, emit) : '',
    entryNavigation(state, emit)
  ]
}
