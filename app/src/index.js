const app = require('./app')
require('./css')

const tree = app.start()
document.body.appendChild(tree)
