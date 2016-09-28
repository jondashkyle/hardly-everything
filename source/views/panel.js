const h = require('choo/html')
const sf = require('sheetify')

const style = sf`
  :host {
    padding: 1px;
    line-height: 3rem;
  }

  input {
    text-align: right;
    border: 0;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
    font-size: 1rem;
    outline: 0;
    width: 100%;
  }

  label {
    pointer-events: none;
    padding: 0 1rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .container-option {
    padding: 1px;
  }

  .range-position {
    background: rgba(127, 127, 127, 0.2);
    pointer-events: none;
    width: 100%;
  }
`

const inputText = (option, state, send) => h`
  <div class="psr bg-white">
    <label>
      ${option.name}
    </label>
    <input
      type="text"
      class="bg-white tc-black"
      value="${state.design[option.key]}"
      oninput=${e => send('design:update', {
        [option.key]: e.target.value 
      })}
    >
  </div>
`

const inputRange = (option, state, send) => h`
  <div class="psr bg-white ofh cur-ewr">
    <label>
      ${option.name}
    </label>
    <input
      type="range"
      min="0"
      max="100"
      class="op0 cur-ewr"
      value="${state.design[option.key]}"
      oninput=${e => send('design:update', {
        [option.key]: parseInt(e.target.value)
      })}
    >
    <div
      class="psa t0 b0 range-position"
      style="transform: translate3d(${state.design[option.key]}%, 0, 0)"
    ></div>
  </div>
`

const templateOption = (state, prev, send, option) => {
  switch (option.type) {
    case 'text':
      return inputText(option, state, send)
    case 'range':
      return inputRange(option, state, send)
    default:
      return
  }
}

const optionContainer = ({ content }) => h`
  <div class="c4 psr p0-5 container-option">
    ${content}
  </div>
`

module.exports = (state, prev, send) => {
  return h`
    <div class="bg-black tc-black psf t0 l0 r0 z3 ${state.panel.active ? 'db' : 'dn'}">
      <div class="x xw ${style}">
        ${state.panel.options.map(option => optionContainer({
          content: templateOption(state, state, send, option)
        }))}
      </div>
    </div>
  `
}
