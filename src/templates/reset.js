var html = require('choo/html')
var css = require('../components/css')

var resetAll = (emit) => {
  emit('entries:reset')
  emit('options:reset')
  emit('user:reset')
}

var resetEntries = (emit) => emit('entries:reset')
var resetOptions = (emit) => emit('options:reset')
var resetUser = (emit) => emit('user:reset')

module.exports = (state, emit) => {
  var elContainer = content => html`<div
    class="psf t0 r0 b0 l0 x xjc xac fs2"
  >${content}</div>`

  var elReset = html`<div class="c6">
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

  var elConfirmation = html`<div>
    Your local data has been reset
  </div>`

  return html`<div> 
    ${elContainer(elReset)}
    ${css(state, emit)}
  </div>`
}
