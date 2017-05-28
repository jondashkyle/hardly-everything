var html = require('rooch/html')

var entryList = require('../containers/entry-list')
var entryNavigation = require('../containers/entry-navigation')

module.exports = view

function view (state, emit) {
  return state.app.loaded
    ? html`<div>${content()}</div>`
    : ''

  function content () {
    return [
      entryList(state, emit),
      entryNavigation(state, emit)
    ]
  }
}
