require('./design')

var html = require('choo/html')
var choo = require('choo')

var wrapper = require('./containers/wrapper')
var app = choo()

// plugins
require('./plugins').forEach(plugin => app.use(plugin))

// app
app.route('/', wrapper(require('./templates/home')))
app.route('/all', wrapper(require('./templates/home')))
// app.route('/reset', wrapper(require('./templates/reset')))

// panel
app.route('/panel', wrapper(require('./templates/panel')))
app.route('/panel/:view', wrapper(require('./templates/panel')))
app.route('/panel/:view/:id', wrapper(require('./templates/panel')))

// data
app.route('/data', wrapper(require('./templates/data')))
app.route('/data/:command', wrapper(require('./templates/data')))

// dev
if (process.env.NODE_ENV === 'development') {
  // app.route('/sandbox', wrapper(require('./sandbox')))
  // app.route('/sandbox/:component', wrapper(require('./sandbox')))
}

// start
module.exports = app.mount('body')
