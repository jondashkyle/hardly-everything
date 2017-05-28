var html = require('rooch/html')
var panel = require('../containers/panel')
var entry = require('../containers/panel-entry')

module.exports = view

function view (state, emit) {
  var content = entry(state, emit)
  return panel(state, emit, content)
}
