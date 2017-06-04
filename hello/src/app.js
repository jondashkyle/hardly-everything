const choo = require('choo')

const app = choo()

app.model(require('./model/pages'))
app.model(require('./model/app'))

app.router((route) => [
  route('/', require('./templates/page')),
  route('/:page', require('./templates/page'))
])

module.exports = app