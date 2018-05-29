var html = require('choo/html')

var Panel = require('../containers/panel-container')
var EntryList = require('../containers/entry-list')
var EntryNavigation = require('../containers/entry-navigation')

module.exports = view

function view (state, emit) {
  var panelProps = {
    isHoverActive: false,
    view: state.params.view
  }

  return [
    Panel(state, panelProps, emit),
    !state.ui.mobile ? EntryList(state, emit) : '',
    EntryNavigation(state, emit)
  ]
}
