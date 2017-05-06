const webfontloader = require('webfontloader')

exports.local = (send, done) => {
  send('options:loaded', { typeLocal: true }, done)
}

exports.load = (data, send, done) => {
  switch (data.host) {
    case 'google':
      const value = data.weight
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