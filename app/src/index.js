var rooch = require('rooch')
require('./css')

var app = rooch()

// plugins
require('./plugins').forEach(plugin => app.use(plugin))

// routes
app.route('/', require('./templates/home'))

// app.model(require('./model/entries'))
// app.model(require('./model/options'))
// app.model(require('./model/staging'))
// app.model(require('./model/ui'))

// app.model(require('./containers/panel-options').model)

// app.router((route) => [
//   route('/', require('./templates/index')),
//   route('/data', require('./templates/data')),
//   route('/data/:command', require('./templates/data')),
//   route('/reset', require('./templates/reset'))
// ])

app.mount('main')
