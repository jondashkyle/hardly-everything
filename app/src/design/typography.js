var webfontloader = require('webfontloader')

exports.local = (cb) => {
  if (cb && typeof cb === 'function') {
    cb()
  }
}

exports.load = (data, emit) => {
  switch (data.host) {
    case 'google':
      var value = data.weight
        ? data.value + ':' + data.weight + (data.style === 'italic' ? 'i' : '')
        : data.value
      return webfontloader.load({
        google: {
          families: [value]
        },
        fontactive: function () {
          emit('options:loaded', { typeCustom: true })
          emit('options:typography', {
            key: data.key,
            value: { active: true }
          })
          emit('render')
        }
      })
    default:
      emit('options:loaded', { typeCustom: true })
      emit('render')
      return false
  }
}
