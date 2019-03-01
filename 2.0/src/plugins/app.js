
module.exports = app

function app (state, emitter) {
  state.app = {
    loaded: false
  }

  // render
  emitter.on('app:render', function (data) {
    emitter.emit('entries:render')
    emitter.emit('render')
  })

  // check
  emitter.on('*', checkLoad)

  // load fallback
  emitter.on('DOMContentLoaded', function () {
    setTimeout(() => {
      if (!state.app.loaded) handleLoad()
    }, 3000)
  })

  // have we loaded?
  function checkLoad (data) {
    if (
      state.entries.loaded &&
      state.options.loaded.typeCustom &&
      state.options.loaded.typeLocal &&
      state.options.loaded.data &&
      !state.app.loaded
    ) { handleLoad() }
  }

  // all good
  function handleLoad () {
    state.app.loaded = true
    emitter.emit('app:render')
  }
}
