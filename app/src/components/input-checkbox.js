const html = require('rooch/html')

module.exports = view

function view (state, data, emit) {
  return html`
    <div class="psr line">
      <div class="psa t0 l0 px1 pen">
        ${data.name}
      </div>
      <input
        type="checkbox"
        class="op0 psa t0 l0 r0 b0 z2 w100 h100 curp"
        checked="${state.options.values[data.key] ? 'true' : ''}"
        onchange=${e => emit('options:values', {
          key: data.key,
          value: !state.options.values[data.key]
        })}
      >
      <label
        class="pen x xjc xac psa t0 r0 fs1-5 tc-black bg-black-lighter"
        style="
          height: 4.5rem;
          width: 4.5rem;
        "
      >${state.options.values[data.key] ? '✓' : ''}</label>
    </div>
  `
}
