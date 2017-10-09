var html = require('rooch/html')
var rooch = require('rooch')

var wrapper = require('./containers/wrapper')
var app = rooch()

// plugins
require('./plugins').forEach(plugin => app.use(plugin))

// app
app.route('/', wrapper(require('./templates/home')))
app.route('/reset', wrapper(require('./templates/reset')))

// panel
app.route('/panel', wrapper(require('./templates/panel')))
app.route('/panel/:view', wrapper(require('./templates/panel')))
app.route('/panel/:view/:id', wrapper(require('./templates/panel')))

// data
app.route('/data', wrapper(require('./templates/data')))
app.route('/data/:command', wrapper(require('./templates/data')))

// dev
if (process.env.NODE_ENV === 'development') {
  app.route('/sandbox', wrapper(require('./sandbox')))
  app.route('/sandbox/:component', wrapper(require('./sandbox')))
}

// start
app.mount('main')