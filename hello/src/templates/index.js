const h = require('choo/html')

const navigation = require('../containers/navigation')
const template = require('../containers/home')

module.exports = (state, prev, send) => h`
  <div class="sans fs1">
    ${navigation(state, prev, send)}
    ${template(state, prev, send)}
  </div>
`