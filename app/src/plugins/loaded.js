
module.exports = loaded

function loaded (state, emitter) {
  state.app = {
    loaded: false
  }

  // check
  emitter.on('*', checkLoad)

  // fallback
  emitter.on('DOMContentLoaded', function () {
    setTimeout(() => {
      handleLoad()
    }, 3000)
  })

  function checkLoad (data) {
    if (
      state.entries.loaded &&
      state.options.loaded.typeCustom &&
      state.options.loaded.typeLocal &&
      state.options.loaded.data &&
      !state.app.loaded
    ) handleLoad();
  }

  function handleLoad () {
    state.app.loaded = true
    removeLoader()
    emitter.emit('render')
  }
}

function removeLoader () {
  var el = document.querySelector('[data-load]')
  return el ? document.body.removeChild(el) : ''
}