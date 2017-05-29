const html = require('rooch/html')

module.exports = view

function view (state, data, emit) {
  return html`
    <div class="psr">
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
        class="pen x xjc xac psa t0 r0"
        style="
          background: rgba(127, 127, 127, 0.165);
          height: 4.5rem;
          width: 4.5rem;
        "
      >
        ${state.options.values[data.key] ? checkmark() : ''}
      </label>
    </div>
  `

  function checkmark() {
    return html`
      <svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <g id="Artboard" class="stroke-black">
                  <g id="icon" transform="translate(1.000000, 1.000000)">
                      <path d="M0,0 L11.1369318,11.1369318" id="Line" />
                      <path d="M0,0 L11.1369318,11.1369318" id="Line" transform="translate(5.568466, 5.568466) scale(-1, 1) translate(-5.568466, -5.568466) " />
                  </g>
              </g>
          </g>
      </svg>
    `
  }
}
