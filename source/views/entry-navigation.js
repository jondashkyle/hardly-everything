const html = require('choo/html')

const newClick = (state, send) => ({ open: !state.panel.open })
const editClick = (state, send) => ({ active: !state.panel.active })

module.exports = (state, prev, send) => {
  return html`
    <div class="psf b0 r0 p0-5 lh1 x z2 usn sans ttu fwb">
      <div
        class="
          p0-5 curp
          ${state.entries.options.viewAll ? 'op10' : 'op5'} 
        "
        onclick=${e => send('entries:options', {
          viewAll: !state.entries.options.viewAll
        })}>
        all
      </div> 
      <div
        class="p0-5 curp ${state.panel.active ? 'op10' : 'op5'}"
        onclick=${e => send('panel:active', editClick(state, send))}>
        edit
      </div>
      <div
        class="
          p0-5 curp
          ${state.panel.open && !state.panel.staging.id ? 'op10' : 'op5'}
        "
        onclick=${e => send('panel:open', newClick(state, send))}>
        add
      </div>
    </div>
  `
}
