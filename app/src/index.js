var html = require('rooch/html')
var rooch = require('rooch')

var wrapper = require('./containers/wrapper')
var app = rooch()

// plugins
require('./plugins').forEach(plugin => app.use(plugin))

// routes
app.route('/', wrapper(require('./templates/home')))
app.route('/reset', wrapper(require('./templates/reset')))

app.route('/panel', wrapper(require('./templates/panel')))
app.route('/panel/:view', wrapper(require('./templates/panel')))
app.route('/panel/:view/:id', wrapper(require('./templates/panel')))

app.route('/data', wrapper(require('./templates/data')))
app.route('/data/:command', wrapper(require('./templates/data')))

// dev sandbox
if (process.env.NODE_ENV === 'development') {
  app.route('/sandbox', wrapper(require('./sandbox')))
  app.route('/sandbox/:component', wrapper(require('./sandbox')))
}

app.mount('main')
