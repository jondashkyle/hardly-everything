const html = require('choo/html')
const sf = require('sheetify')

const style = sf`
  :host {
    background: #000;
    color: #fff;
  }
`


const templateOption = (option, state, send) => html`
  <div class="x c4">
    <div>
      ${option.name}
    </div>
    <input
      value="${state.design[option.key]}"
      oninput=${e => send('design:update', { [option.key]: e.target.value })}
    >
  </div>
`

module.exports = (state, prev, send) => {
  return html`<view-panel class="x xw p1 ${style}">
    ${state.panel.options.map(option => templateOption(option, state, send))}
  </view-panel>`
}
