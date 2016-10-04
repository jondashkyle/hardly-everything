const h = require('choo/html')
const sf = require('sheetify')
const ov = require('object.values')
const x = require('xtend')

const inputText = require('../components/input-text')
const inputRange = require('../components/input-range')
const inputDropdown = require('../components/input-dropdown')

const namespace = 'panelOptions'

const font = inputDropdown({
  namespace: 'font',
  parent: namespace
})

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

const templateOption = (state, prev, send, option) => {
  switch (option.type) {
    case 'text':
      return inputText.view(option, state, send)
    case 'range':
      return inputRange({
        name: option.name,
        value: state.options.design[option.key].value,
        handleInput: value => send('options:design', {
          key: option.key,
          value: value
        })
      })
    case 'dropdown':
      return font.view({
        local: state[namespace].font,
        options: state.options.typography,
        ui: state.ui
      }, prev, send)
    default:
      return
  }
}

const optionContainer = ({ content }) => h`
  <div class="c4 psr container-option">
    ${content}
  </div>
`

const model = {
  state: {
    font: font.model.state
  },
  reducers: {

  }
}

exports.model = {
  namespace: namespace,
  state: x(
    model.state
  ),
  reducers: x(
    font.model.reducers,
    model.reducers
  )
}

exports.view = (state, prev, send) => {
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
