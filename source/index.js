const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')
const css = require('./css')

/**
 * Components
 */
const Soon = require('./components/soon')

/**
 * App
 */
const app = choo()

app.router((route) => [
  route('/', Soon.view)
])

/**
 * Initialize
 */
const tree = app.start()
document.body.appendChild(tree)
