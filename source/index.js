const choo = require('choo')

require('./db')
require('./css')

/**
 * App
 */
const app = choo()
const log = require('choo-log')
app.use(log())

/**
 * Model
 */
app.model(require('./model/user'))
app.model(require('./model/entries'))
app.model(require('./model/options'))
app.model(require('./model/staging'))
app.model(require('./model/ui'))

app.model(require('./containers/panel-options').model)

/**
 * Router
 */
app.router((route) => [
  route('/', require('./templates/index')),
  route('/data', require('./templates/export'))
])

/**
 * Initialize
 */
const tree = app.start()
document.body.appendChild(tree)
