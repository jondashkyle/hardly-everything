const html = require('rooch/html')

const css = require('../components/css')

const resetAll = (send) => {
  send('entries:reset')
  send('options:reset')
  send('user:reset')
}

const resetEntries = (emit) => emit('entries:reset')
const resetOptions = (emit) => emit('options:reset')
const resetUser = (emit) => emit('user:reset')

module.exports = (state, emit) => {
  const elContainer = content => html`<div
    class="psf t0 r0 b0 l0 x xjc xac fs2"
  >${content}</div>`

  const elReset = html`<div class="c6">
    <div class="p0-5">
      <div
        class="py1 fs2 curp bg-black tc-white tac"
        onclick=${el => resetAll(emit)}
      >
        Reset Everything
      </div>
    </div>

    <div class="p0-5">
      <div
        class="py1 fs2 curp bg-black tc-white tac"
        onclick=${el => resetOptions(emit)}
      >
        Reset Options
      </div>
    </div>

    <div class="p0-5">
      <div
        class="py1 fs2 curp bg-black tc-white tac"
        onclick=${el => resetEntries(emit)}
      >
        Reset Entries
      </div>
    </div>
  </div>`

  const elConfirmation = html`<div>
    Your local data has been reset
  </div>`

  return html`<div> 
    ${elContainer(elReset)}
    ${css(state, emit)}
  </div>`
}
