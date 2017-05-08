var webfontloader = require('webfontloader')

exports.local = (cb) => {
  cb()
}

exports.load = (data, send, done) => {
  switch (data.host) {
    case 'google':
      var value = data.weight
        ? data.value + ':' + data.weight
        : data.value
      return webfontloader.load({
        google: {
          families: [value]
        },
        fontactive: () => {
          send('options:loaded', { typeCustom: true }, done)
          send('options:typography', {
            key: data.key,
            value: { active: true }
          }, done)
        }
      })
    default:
      send('options:loaded', { typeCustom: true }, done)
      return false
  }
}
