const choo = require('choo')

const app = choo()

app.use(require('./plugins/pages'))
app.use(require('./plugins/app'))

app.route('/', require('./templates/page'))
app.route('/:page', require('./templates/page'))

module.exports = app