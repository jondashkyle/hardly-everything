const h = require('choo/html')
const sf = require('sheetify')
const ov = require('object.values')
const x = require('xtend')

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
    border-right: 2px solid rgba(127, 127, 127, 0.33);
  }
  
 .container-option:last-child { border-right: 0 } 
`

const inputText = (option, state, send) => h`
  <div class="psr bg-black">
    <label class="psa t0 l0 px1 pen">
      ${option.name}
    </label>
    <input
      type="text"
      class="bg-black tc-white"
      value="${state.options.design[option.key].value}"
      oninput=${e => send('options:design', {
        key: options.key,
        value: e.target.value 
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
        value: state.options.design[option.key].value,
        handleInput: value => send('options:design', {
          key: option.key,
          value: value
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
  const options = ov(state.options.design).filter(opt => opt.visible)

  return h`
    <div class="bg-black tc-white psf t0 l0 r0 z3 ${state.ui.panelActive ? 'db' : 'dn'}">
      <div class="x xw ${style}">
        ${options.map(option => optionContainer({
          content: templateOption(state, state, send, option)
        }))}
      </div>
    </div>
  `
}
