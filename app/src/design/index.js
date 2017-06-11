var fs = require('fs')
var gr8 = require('gr8')
var recsst = require('recsst')
var lilcss = require('lilcss')

var custom = fs.readFileSync(__dirname + '/index.css', 'utf8')

var gr8css = gr8({
  breakpoints: {
    lg: '1000px',
    md: '767px',
    sm: '500px'
  },
  fontSize: [0.7, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.8, 2]
    .map(function (size) {
      return { [size.toString().replace('.', '-')]: size * 1.5 }
    }),
  spacing: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 4.5]
    .map(function (size) {
      return { [size.toString().replace('.', '-')]: size * 1.25 }
    }),
  responsive: true
})

gr8css.add({
  prop: 'position',
  prefix: 'ps',
  vals: { st: 'sticky' }
})

gr8css.add({
  prop: 'width',
  unit: '%',
  vals: [50]
})

gr8css.add({
  prop: 'width',
  prefix: 'wrem',
  unit: 'rem',
  vals: [40]
})

gr8css.add({
  prop: 'max-width',
  prefix: 'mwrem',
  unit: 'rem',
  vals: [43]
})

gr8css.add({
  prop: 'opacity',
  prefix: 'op',
  vals: [{ 33: 0.3 }]
})

gr8css.add({
  prop: 'padding-top',
  prefix: 'ptvh',
  unit: 'vh',
  vals: [25, 50, 75, 100]
})

gr8css.add({
  prop: 'margin-top',
  prefix: 'mtpx',
  unit: 'px',
  vals: [0, 2]
})

var lilsrc = [
  'containers/*.js',
  'components/*.js',
  'templates/*.js',
  'sandbox/*.js',
  'index.js'
].map(p => 'src/' + p)

var lilopts = {
  ignore: ['psa', 'psr', 't0', 'b0', 'l0', 'r0']
}

var lilgr8 = lilcss(gr8css.toString(), lilsrc, lilopts)

var built = [
  custom,
  recsst.toString(),
  lilgr8,
].join(' ')

process.stdout.write(built)
