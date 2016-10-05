const webfontloader = require('webfontloader')

webfontloader.load({
  custom: {
    families: ['Moderat', 'Space Mono'],
    urls: ['/assets/fonts/fonts.css']
  }
})

exports.load = (data) => {
  switch(data.host) {
    case 'google':
      const value = data.weight
        ? data.value + ':' + data.weight
        : data.value
      return webfontloader.load({
        google: {
          families: [value]
        }
      })
    default:
      return false
  }
}