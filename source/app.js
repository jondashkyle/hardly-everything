const choo = require('choo')
require('./db')

const app = choo()

// const log = require('choo-log')
// app.use(log())

app.model(require('./model/user'))
app.model(require('./model/entries'))
app.model(require('./model/options'))
app.model(require('./model/staging'))
app.model(require('./model/ui'))

app.model(require('./containers/panel-options').model)

app.router((route) => [
  route('/', require('./templates/index')),
  route('/data', require('./templates/data')),
  route('/data/:command', require('./templates/data')),
  route('/reset', require('./templates/reset'))
])

module.exports = app
