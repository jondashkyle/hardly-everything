var html = require('rooch/html')

module.exports = view

function view (state, emit) {
  return html`
    <div class="psf t0 r0 px0-5 lh1 x z2 usn sans fs1">
      <div
        class="
          px0-5 curp oph100 line
          ${state.ui.entriesViewAll ? 'op100' : 'op33'} 
        "
        onclick=${e => emit('ui:update', {
          entriesViewAll: !state.ui.entriesViewAll
        })}>
        All
      </div>
      <div class="px0-5 line">
        ${state.ui.date}
      </div>
      <div class="dn px0-5 line op33 oph100">Search</div>
      <div class="dn px0-5 line op33 oph100">Tags</div>
    </div>
  `
}
