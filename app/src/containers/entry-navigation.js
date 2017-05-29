var html = require('rooch/html')
var sf = require('sheetify')

module.exports = view

function view (state, emit) {
  return html`
    <div class="psf t0 r0 px0-5 lh1 x z2 usn sans fs1">
      <div
        class="
          px0-5 curp oph100 line
          ${state.ui.entriesViewAll ? 'op100' : 'op25'} 
        "
        onclick=${e => emit('ui:update', {
          entriesViewAll: !state.ui.entriesViewAll
        })}>
        All
      </div>
      <div class="dn px0-5 line op25 oph100">Search</div>
      <div class="dn px0-5 line op25 oph100">Tags</div>
    </div>
  `
}
