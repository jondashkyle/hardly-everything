module.exports = logger

function logger (state, emitter) {
  state.debug = process.env.NODE_ENV === 'development'

  if (state.debug) {
    emitter.on('*', function (messageName, data) {
      console.log('event', messageName, data)
    })
  }
}
