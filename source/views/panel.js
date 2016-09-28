const h = require('choo/html')
const sf = require('sheetify')

const inputRange = require('../components/input-range')

const style = sf`
  :host {
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

  .container-option {
    border-right: 1px solid rgba(127, 127, 127, 0.33);
  }
`

const inputText = (option, state, send) => h`
  <div class="psr bg-black">
    <label class="psa t0 l0 px1 pen">
      ${option.name}
    </label>
    <input
      type="text"
      class="bg-black tc-white fwl"
      value="${state.design[option.key]}"
      oninput=${e => send('design:update', {
        [option.key]: e.target.value 
      })}
    >
  </div>
`

const templateOption = (state, prev, send, option) => {
  switch (option.type) {
    case 'text':
      return inputText(option, state, send)
    case 'range':
      return inputRange({
        name: option.name,
        value: state.design[option.key],
        handleInput: value => send('design:update', {
          [option.key]: value
        })
      })
    default:
      return
  }
}

const optionContainer = ({ content }) => h`
  <div class="c4 psr container-option">
    ${content}
  </div>
`

module.exports = (state, prev, send) => {
  return h`
    <div class="bg-black tc-white fwl psf t0 l0 r0 z3 ${state.panel.active ? 'db' : 'dn'}">
      <div class="x xw ${style}">
        ${state.panel.options.map(option => optionContainer({
          content: templateOption(state, state, send, option)
        }))}
      </div>
    </div>
  `
}
