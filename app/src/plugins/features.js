module.exports = features

var beta = process.env.NODE_ENV === 'development'

function features (state, emitter) {
  state.features = {
    tags: true,
    search: true
  }

  emitter.on('feature:enable', function (data) {
    if (data.feature) {
      state.features[data.feature] = true
    } 

    if (data.render !== false) {
      emitter.emit('app:render')
    }
  })

  emitter.on('feature:disable', function (data) {
    if (data.feature) {
      state.features[data.feature] = false
    } 

    if (data.render !== false) {
      emitter.emit('app:render')
    }
  })
}
