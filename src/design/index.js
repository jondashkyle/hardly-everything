var fs = require('fs')
var gr8 = require('gr8')
var recsst = require('recsst')
var lilcss = require('lilcss')

var custom = fs.readFileSync(__dirname + '/index.css', 'utf8')

var utils = [ ]

utils.push({
  prop: { ps: 'position' },
  vals: { st: 'sticky' }
})

utils.push({
  prop: 'width',
  unit: '%',
  vals: [50]
})

utils.push({
  prop: { wrem: 'width' },
  unit: 'rem',
  vals: [40]
})

utils.push({
  prop: { mwrem: 'max-width' },
  unit: 'rem',
  vals: [43]
})

utils.push({
  prop: { op: 'opacity' },
  vals: [{ 33: 0.3 }]
})

utils.push({
  prop: { ptvh: 'padding-top' },
  unit: 'vh',
  vals: [25, 50, 75, 100]
})

utils.push({
  prop: { mtpx: 'margin-top' },
  unit: 'rem',
  vals: [0, 2].map(function (size) { return { [size]: size / 10 }})
})

var gr8css = gr8({
  breakpoints: {
    lg: '1000px',
    md: '800px',
    sm: '600px'
  },
  fontSize: [0.7, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2, 3, 4]
    .map(function (size) {
      return { [size.toString().replace('.', '-')]: size * 1.5 }
    }),
  spacing: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 4.5]
    .map(function (size) {
      return { [size.toString().replace('.', '-')]: size * 1.25 }
    }),
  responsive: true,
  utils: utils
})

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

var built = [
  custom,
  recsst.toString(),
  gr8css.toString()
  // lilgr8,
].join(' ')

process.stdout.write(built)
