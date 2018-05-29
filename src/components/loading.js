var html = require('choo/html')

module.exports = { icon, container }

function icon () {
  return html`<div class="spinner"></div>`
}

function container () {
  return html`
    <div class="psf t0 l0 r0 b0 x xjc xac">
      ${icon()}
    </div>
  `
}
