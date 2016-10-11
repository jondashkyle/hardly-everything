const webfontloader = require('webfontloader')

webfontloader.load({
  custom: {
    families: ['Moderat', 'Space Mono'],
    urls: ['/assets/fonts/fonts.css']
  }
})

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
        active: () => {
          send('options:typography', {
            key: data.key,
            value: { active: true }
          }, done)
        }
      })
    default:
      return false
  }
}