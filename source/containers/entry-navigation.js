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
const editClick = (state, send) => ({ active: !state.panel.active })

module.exports = (state, prev, send) => {
  return h`
    <div class="psf b0 r0 p0-5 lh1 x z2 usn sans ttu fwb ${styles}">
      <div
        class="
          p0-5 curp
          ${state.entries.options.viewAll ? 'strike' : ''} 
        "
        onclick=${e => send('entries:options', {
          viewAll: !state.entries.options.viewAll
        })}>
        all
      </div> 
      <div
        class="p0-5 curp ${state.panel.active ? 'strike' : ''}"
        onclick=${e => send('panel:active', editClick(state, send))}>
        edit
      </div>
      <div
        class="
          p0-5 curp
          ${state.panel.open && !state.panel.staging.id ? 'strike' : ''}
        "
        onclick=${e => send('panel:open', newClick(state, send))}>
        add
      </div>
    </div>
  `
}
