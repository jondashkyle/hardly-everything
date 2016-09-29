const webfontloader = require('webfontloader')

webfontloader.load({
  google: {
    families: ['Space+Mono:400,700']
  },
  custom: {
    families: ['Moderat'],
    urls: ['/assets/fonts.css']
  }
})