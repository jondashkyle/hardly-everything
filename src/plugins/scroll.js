module.exports = pluginScroll

function pluginScroll (state, emitter) {
  emitter.on(state.events.PUSHSTATE, function () {
    window.scrollTo(0, 0)
  })
}
