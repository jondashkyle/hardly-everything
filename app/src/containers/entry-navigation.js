const html = require('rooch/html')
const sf = require('sheetify')

const styles = sf`
  :host {
    font-size: 14px;
  }

  .strike {
    position: relative;
  }

  .strike:before {
    content: '';
    position: absolute;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 2px;
    height: 2px;
  }
`

const newClick = (state, emit) => ({ open: !state.panel.open })

module.exports = (state, emit) => {
  return html`
    <div class="psf b0 r0 p0-5 lh1 x z2 usn sans ttu fwb ${styles}">
      <div
        class="
          p0-5 curp
          ${state.ui.stagingActive ? 'strike' : ''}
        "
        onclick=${e => emit('ui:update', {
          stagingActive: !state.ui.stagingActive
        })}>
        add
      </div> 
      <div
        class="p0-5 curp ${state.ui.panelActive ? 'strike' : ''}"
        onclick=${e => emit('ui:update', {
          panelActive: !state.ui.panelActive
        })}>
        edit
      </div>
      <div
        class="
          p0-5 curp
          ${state.ui.entriesViewAll ? 'strike' : ''} 
        "
        onclick=${e => emit('ui:update', {
          entriesViewAll: !state.ui.entriesViewAll
        })}>
        all
      </div>
    </div>
  `
}
