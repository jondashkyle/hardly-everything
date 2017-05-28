var html = require('rooch/html')
var rooch = require('rooch')
require('./css')

var wrapper = require('./containers/wrapper')
var app = rooch()

// plugins
require('./plugins').forEach(plugin => app.use(plugin))

// routes
app.route('/', wrapper(require('./templates/home')))
app.route('/panel', wrapper(require('./templates/panel')))
app.route('/data', wrapper(require('./templates/data')))
app.route('/data/:command', wrapper(require('./templates/data')))
app.route('/reset', wrapper(require('./templates/reset')))

// app.router((route) => [
//   route('/', require('./templates/index')),
//   route('/data', require('./templates/data')),
//   route('/data/:command', require('./templates/data')),
//   route('/reset', require('./templates/reset'))
// ])

app.mount('main')
