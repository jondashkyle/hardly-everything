module.exports = app

function app (state, emitter) {
  state.app = {
    title: 'Hardly Everything',
    loaded: false
  }

  emitter.on('*', checkLoad)

  emitter.on('DOMContentLoaded', function () {
    setTimeout(() => {
      state.app.loaded = true
    }, 5000)
  })

  function checkLoad (data) {
    if (!state.app.loaded) {
      state.app.loaded = true
      removeLoader()
      emitter.emit('render')
    }
  }
}

function removeLoader () {
  var el = document.querySelector('[data-load]')
  return el ? document.body.removeChild(el) : ''
}