var html = require('choo/html')

module.exports = view

function view (state, emit) {
  return html`
    <div class="psf t0 r0 px0-5 lh1 x z4 usn sans fs1">
      <div class="px0-5 line">
        ${state.ui.date}
      </div>
    </div>
  `
}
