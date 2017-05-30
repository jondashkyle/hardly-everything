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

app.mount('main')
