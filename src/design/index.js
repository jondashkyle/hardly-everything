var lilcss = require('lilcss')
var css = require('sheetify')

css('nanoreset')
css('./index.css')
css('./simplecolorpicker.css')
css('./utils.js')

// var lilsrc = [
//   'containers/*.js',
//   'components/**/*.js',
//   'templates/*.js',
//   'sandbox/*.js',
//   'index.js'
// ].map(p => 'src/' + p)

// var lilopts = {
//   ignore: ['psa', 'psr', 't0', 'b0', 'l0', 'r0']
// }

// var lilgr8 = lilcss(gr8css.toString(), lilsrc, lilopts)

