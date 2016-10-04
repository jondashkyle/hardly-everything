const app = require('./app')

require('./db')
require('./css')

const tree = app.start()
document.body.appendChild(tree)
