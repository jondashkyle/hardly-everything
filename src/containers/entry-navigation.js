var html = require('rooch/html')

module.exports = view

function view (state, emit) {
  return html`
    <div class="psf t0 r0 px0-5 lh1 x z4 usn sans fs1">
      <div class="px0-5 line">
        ${state.ui.date}
      </div>
      <div class="dn px0-5 line op33 oph100">Search</div>
      <div class="dn px0-5 line op33 oph100">Tags</div>
    </div>
  `
}
