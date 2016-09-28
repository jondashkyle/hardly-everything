const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')
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
app.model(require('./model/tags'))

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
