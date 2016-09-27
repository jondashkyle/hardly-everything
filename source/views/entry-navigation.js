const html = require('choo/html')

const newClick = (state, send) => ({ open: !state.panel.open })
const editClick = (state, send) => ({ active: !state.panel.active })

module.exports = (state, prev, send) => {
  return html`
    <div class="psf b0 r0 p1 lh1 x z2 usn emoji">
      <div
        class="
          p1 curp
          ${state.entries.options.viewAll ? 'op10' : 'op5'} 
        "
        onclick=${e => send('entries:options', { viewAll: !state.entries.options.viewAll })}>
        👀
      </div> 
      <div
        class="p1 curp ${state.panel.active ? 'op10' : 'op5'}"
        onclick=${e => send('panel:active', editClick(state, send))}>
        ✏
      </div>
      <div
        class="p1 curp ${state.panel.open && !state.panel.staging.id ? 'op10' : 'op5'}"
        onclick=${e => send('panel:open', newClick(state, send))}>
        ➕
      </div>
    </div>
  `
}
