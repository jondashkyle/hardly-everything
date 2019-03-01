
module.exports = search

function search (state, emitter) {
  state.search = {
    term: '',
    active: false,
    options: {
      enabled: true
    }
  }

  emitter.on('search:update', function (data = { }) {
    // check if active
    if (!isEnabled()) return

    // search term
    if (data.value !== undefined) {
      state.search.term = data.value
    }

    // show all if not already
    if (data.all && !state.ui.entriesViewAll) {
      emitter.emit('ui:update', { entriesViewAll: true })
    }

    emitter.emit(state.events.UI_PAGINATE, {
      page: 1,
      render: false
    })

    // hide the panel
    if (data.hidePanel && state.ui.panel.view) {
      emitter.emit('ui:panel', { view: '' })
    }

    // rendering
    if (data.render) {
      emitter.emit('app:render')
    }
  })

  function isEnabled () {
    return state.features && state.features.search
  }
}
