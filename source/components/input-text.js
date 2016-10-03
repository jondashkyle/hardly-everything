const h = require('choo/html')

const view = (option, state, send) => h`
  <div class="psr bg-black">
    <label class="psa t0 l0 px1 pen">
      ${option.name}
    </label>
    <input
      type="text"
      class="bg-black tc-white"
      value="${state.options.design[option.key].value}"
      oninput=${e => send('options:design', {
        key: option.key,
        value: e.target.value 
      })}
    >
  </div>
`

module.exports = { view }