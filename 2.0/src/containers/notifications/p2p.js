var html = require('choo/html')

var libDesign = require('../../lib/design')

module.exports = customizeDesign

function customizeDesign (state, emit) {
  return html`
    <div class="usn bg-white fs1 psf b0 l0 m1 p1 ph1 lh1-5 bro b2b z4">
      Enjoy offline accessibility and save data locally by visiting with <span class="external"><a href="https://beakerbrowser.com" class="a" target="_blank">Beaker Browser</a></span><span class="ml2 op33 oph100 curp" onclick=${handleDismissClick}>Dismiss</span>
    </div>
  `

  function handleDismissClick (event) {
    emit(state.events.USER_NOTIFIED, { id: 'p2p' })
  }
}
