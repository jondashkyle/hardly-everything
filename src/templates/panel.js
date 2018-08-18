var html = require('choo/html')

var EntryNavigation = require('../containers/entry-navigation')
var Panel = require('../containers/panel-container')
var EntryList = require('../containers/entry-list')

module.exports = view

function view (state, emit) {
  var panelProps = {
    isHoverActive: false,
    view: state.params.view
  }

  return [
    Panel(state, panelProps, emit),
    !state.ui.mobile ? EntryList(state, emit) : '',
    EntryNavigation(state, emit),
    !state.ui.mobile ? createOverlay() : html`<div></div>`
  ]

  function createOverlay () {
    return html`
      <div
        class="psf t0 l0 r0 b0 curp z2"
        style="background: rgba(var(--bg), 0.5)"
        onclick=${handleOverlayClick}
      ></div>
    `
  }

  function handleOverlayClick () {
    emit('pushState', '/')
  }
}
