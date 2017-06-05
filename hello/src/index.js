var choo = require('choo')
var wrapper = require('./containers/wrapper')

var app = choo()

app.use(require('./plugins/pages'))
app.use(require('./plugins/app'))

app.route('/', wrapper(require('./templates/page')))
app.route('/:page', wrapper(require('./templates/page')))

app.mount('main')