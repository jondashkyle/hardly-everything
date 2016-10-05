const h = require('choo/html')

const reset = (send) => {
  send('entries:reset')
  send('options:reset')
}

module.exports = (state, prev, send) => {
  return h`<div
    class="psf t0 r0 b0 l0 x xjc xac fs2"
    onload=${el => reset(send)}
  >
    Your data has been reset
  </div>`
}