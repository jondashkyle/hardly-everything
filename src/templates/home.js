var Empty = require('../containers/homepage-empty')
var Panel = require('../containers/panel-container')
var EntryNavigation = require('../containers/entry-navigation')
var EntryList = require('../containers/entry-list')

module.exports = view

function view (state, emit) {
  var panelProps = {
    isHoverActive: true && !state.ui.mobile,
    view: state.ui.panel.view
  }

  // hide if nothing to load
  if (!state.app.loaded) {
    return ''
  }

  // all
  if (
      state.route === 'all' &&
      !state.ui.entriesViewAll
    ) {
    emit('ui:update', { entriesViewAll: true })
  }

  // non all
  if (
    state.route !== 'all' &&
    state.ui.entriesViewAll &&
    !state.search.term
  ) {
    emit('ui:update', { entriesViewAll: false })
  }

  return [
    Panel(state, panelProps, emit),
    createContent(),
    EntryNavigation(state, emit)
  ]

  function createContent () {
    return (state.entries.amount === 0)
      ? createEmpty(state, emit)
      : EntryList(state, emit)
  }

  function createEmpty () {
    // show if we have’t
    if (!state.ui.mobile && !state.ui.panel.loaded) {
      setTimeout(function () {
        emit('ui:panel', { view: 'entry', loaded: true })
      }, 1)
    }
    return Empty(state, emit)
  }
}
