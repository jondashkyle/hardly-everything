var html = require('choo/html')

var EntryNavigation = require('../containers/entry-navigation')
var Panel = require('../containers/panel-container')
var Suggestions = require('../containers/suggestions')
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
    createContent()
  ]

  function createContent () {
    return html`
      <div class="vhmn100 x xjc xac w100 fs1">
        ${Suggestions(state, emit)}
      </div>
    `
  }
}
