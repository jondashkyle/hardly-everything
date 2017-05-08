const html = require('rooch/html')

module.exports = view

function view (state, data, emit) {
  return html`
    <div class="psr bg-black">
      <label class="psa t0 l0 px1 pen">
        ${data.name}
      </label>
      <input
        type="text"
        class="bg-black tc-white"
        value="${state.options.design[data.key].value}"
        oninput=${e => send('options:design', {
          key: data.key,
          value: e.target.value 
        })}
      >
    </div>
  `
}
