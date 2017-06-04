const app = require('./app')
require('./styles')

const tree = app.start()
document.body.appendChild(tree)