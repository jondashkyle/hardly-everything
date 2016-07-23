const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')
const css = require('./css')

/**
 * App
 */
const app = choo()

/**
 * Model
 */
app.model(require('./model/design'))
app.model(require('./model/links'))
app.model(require('./model/panel'))
app.model(require('./model/tags'))


/**
 * Router
 */
app.router((route) => [
  route('/', require('./templates/index')),
  route('tag', require('./templates/index'), [
    route(':tag', require('./templates/index'))
  ])
])

/**
 * Initialize
 */
const tree = app.start()
document.body.appendChild(tree)
