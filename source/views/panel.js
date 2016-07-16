const html = require('choo/html')

module.exports = (state, prev, send) => {
  return html`<view-panel>
    <input
      value="${state.design.background}"
      oninput=${e => send('design:update', { background: e.target.value })}
    >
    <input
      value="${state.design.backgroundLink}"
      oninput=${e => send('design:update', { backgroundLink: e.target.value })}
    >
    <input
      value="${state.design.colorLink}"
      oninput=${e => send('design:update', { colorLink: e.target.value })}
    >
    <input
      value="${state.design.font}"
      oninput=${e => send('design:update', { font: e.target.value })}
    >
  </view-panel>`
}
