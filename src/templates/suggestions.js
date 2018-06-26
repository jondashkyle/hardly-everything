var html = require('choo/html')

var EntryNavigation = require('../containers/entry-navigation')
var Suggestions = require('../containers/suggestions')
var Panel = require('../containers/panel-container')
var EntryList = require('../containers/entry-list')
var loading = require('../components/loading')

module.exports = viewSuggestions

function viewSuggestions (state, emit) {
  // hide the nav
  if (!state.ui.panel.view !== '' && !state.ui.panel.loadedAbout) {
    emit('ui:panel', { view: '', loadedAbout: true })
  }

  var panelProps = {
    isHoverActive: true && !state.ui.mobile,
    view: state.ui.panel.view
  }

  if (!state.site.loaded) {
    emit(state.events.CONTENT_LOAD)
    return loading()
  }

  return [
    Panel(state, panelProps, emit),
    EntryNavigation(state, emit),
    EntryList(state, emit),
    createContent()
  ]

  function createContent () {
    return html`
      <div
        class="psf t0 l0 r0 b0 vhmn100 x xjc xac w100 fs1 py3-5 px1 z2"
        onclick=${handleContainerClick}
        data-suggestions
      >
        ${state.cache(Suggestions, 'suggestions').render()}
      </div>
    `
  }

  function handleContainerClick (event) {
    var isContainer = event.target.hasAttribute('data-suggestions')
    if (isContainer && state.entries.amount) emit('pushState', '/')
  }
}
