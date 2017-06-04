const app = require('./app')
require('./styles')

const tree = app.start()
document.body.appendChild(tree)

// temporary loading fix
var loader = document.querySelector('[data-load]')
loader.parentNode.removeChild(loader)