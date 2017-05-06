const h = require('bel')
const sf = require('sheetify')

const icon = () => h`
  <div class="spinner"></div>
`

const container = () => h`
  <div class="psf t0 l0 r0 b0 x xjc xac">
    ${icon()}
  </div>
`

module.exports = { icon, container }