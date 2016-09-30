const h = require('choo/html')
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
    background: #000;
  }
`

const newClick = (state, send) => ({ open: !state.panel.open })

module.exports = (state, prev, send) => {
  return h`
    <div class="psf b0 r0 p0-5 lh1 x z2 usn sans ttu fwb ${styles}">
      <div
        class="
          p0-5 curp
          ${state.ui.entriesViewAll ? 'strike' : ''} 
        "
        onclick=${e => send('ui:update', {
          entriesViewAll: !state.ui.entriesViewAll
        })}>
        all
      </div> 
      <div
        class="p0-5 curp ${state.ui.panelActive ? 'strike' : ''}"
        onclick=${e => send('ui:update', {
          panelActive: !state.ui.panelActive
        })}>
        edit
      </div>
      <div
        class="
          p0-5 curp
          ${state.ui.stagingActive ? 'strike' : ''}
        "
        onclick=${e => send('ui:update', {
          stagingActive: !state.ui.stagingActive
        })}>
        add
      </div>
    </div>
  `
}
