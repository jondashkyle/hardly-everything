const h = require('choo/html')

const css = require('../components/css')

const resetAll = (send) => {
  send('entries:reset')
  send('options:reset')
}

const resetEntries = (send) => send('entries:reset')
const resetOptions = (send) => send('options:reset')

module.exports = (state, prev, send) => {
  const elContainer = content => h`<div
    class="psf t0 r0 b0 l0 x xjc xac fs2"
  >${content}</div>`

  const elReset = h`<div class="c6">
    <div class="p0-5">
      <div
        class="py1 fs2 curp bg-black tc-white tac"
        onclick=${el => resetAll(send)}
      >
        Reset Everything
      </div>
    </div>

    <div class="p0-5">
      <div
        class="py1 fs2 curp bg-black tc-white tac"
        onclick=${el => resetOptions(send)}
      >
        Reset Options
      </div>
    </div>

    <div class="p0-5">
      <div
        class="py1 fs2 curp bg-black tc-white tac"
        onclick=${el => resetEntries(send)}
      >
        Reset Entries
      </div>
    </div>
  </div>`

  const elConfirmation = h`<div>
    Your local data has been reset
  </div>`

  return h`<div> 
    ${elContainer(elReset)}
    ${css(state, prev, send)}
  </div>`
}
