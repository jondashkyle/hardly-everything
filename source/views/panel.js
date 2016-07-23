const html = require('choo/html')
const sf = require('sheetify')

const style = sf`
  :host {
    background: #000;
    color: #fff;
  }
`

const inputText = (option, state, send) => html`
  <div class="x c4">
    <div>
      ${option.name}
    </div>
    <input
      type="text"
      value="${state.design[option.key]}"
      oninput=${e => send('design:update', { [option.key]: e.target.value })}
    >
  </div>
`

const inputRange = (option, state, send) => html`
  <div class="x c4">
    <div>
      ${option.name}
    </div>
    <input
      type="range"
      min="${option.min || 5}"
      max="${option.max || 100}"
      value="${state.design[option.key]}"
      oninput=${e => send('design:update', { [option.key]: parseInt(e.target.value) })}
    >
  </div>
`

const inputRadio = (option, state, send) => html`
  <div class="x c4">
    <div>
      ${option.name}
    </div>
    ${option.options.map(o => html`
      <label>
        <input
          type="radio"
          name="${option.key}"
          value="${o}"
          ${state.design[option.key] == o ? 'checked' : ''}
          onchange=${e => send('design:update', { [option.key]: e.target.value })}
        >
        ${o}
      </label>
    `)}
  </div>
`

const templateOption = (state, prev, send, option) => {
  switch (option.type) {
    case 'text':
      return inputText(option, state, send)
    case 'range':
      return inputRange(option, state, send)
    case 'radio':
      return inputRadio(option, state, send)
    default:
      return
  }
}

module.exports = (state, prev, send) => {
  return html`
    <div class="psf t0 l0 r0 z3 ${state.panel.active ? 'db' : 'dn'}">
      <div class="x xw p1 ${style}">
        ${state.panel.options.map(option => templateOption(state, state, send, option))}
      </div>
    </div>
  `
}
