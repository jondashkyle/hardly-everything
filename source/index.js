const choo = require('choo')
const css = require('./css')

/**
 * App
 */
const app = choo()

const log = require('choo-log')
app.use(log())

/**
 * Model
 */
app.model(require('./model/design'))
app.model(require('./model/entries'))
app.model(require('./model/panel'))

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
