const h = require('choo/html')

const css = require('../components/css')

const reset = (send) => {
  send('entries:reset')
  send('options:reset')
}

module.exports = (state, prev, send) => {
  const elContainer = content => h`<div
    class="psf t0 r0 b0 l0 x xjc xac fs2"
  >${content}</div>`

  const elReset = h`
    <div
      class="c4 py1 fs2 curp bg-black tc-white tac"
      onclick=${el => reset(send)}
    >
      Reset all data
    </div>
  `

  const elConfirmation = h`<div>
    Your local data has been reset
  </div>`

  return h`<div> 
    ${elContainer(Object.keys(state.entries.all).length === 0
      ? elConfirmation
      : elReset
    )}
    ${css(state, prev, send)}
  </div>`
}
