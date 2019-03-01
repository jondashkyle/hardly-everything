var html = require('choo/html')

var libDesign = require('../../lib/design')

module.exports = customizeDesign

function customizeDesign (state, emit) {
  return html`
    <div class="usn bg-white fs1 psf b0 l0 m1 p1 ph1 lh1-5 bro b2b z4">
      Freshen things up by <span class="fwb curp" onclick=${handleOpenClick}>customizing</span> or <span class="fwb curp" onclick=${handleRandomClick}>randomizing</span> the design<span class="ml2 op33 oph100 curp" onclick=${handleDismissClick}>Dismiss</span>
    </div>
  `

  function handleDismissClick (event) {
    emit(state.events.USER_NOTIFIED, { id: 'customizeDesign' })
  }

  function handleRandomClick (event) {
    var design = libDesign.getRandomDesign()
    emit('options:replace', design)
  }

  function handleOpenClick (event) {
    emit('ui:panel', { view: 'options'} )
  }
}
