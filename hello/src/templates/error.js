const h = require('choo/html')

const template = require('../containers/home')

module.exports = (state, prev, send) => h`
  <div class="sans fs1 tac c12 pt4">
    Page not found, sorry!
  </div>
`