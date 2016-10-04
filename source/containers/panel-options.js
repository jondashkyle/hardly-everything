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

  .opt-bl {
    border-left: 1px solid rgba(127, 127, 127, 0.33);
  }

  .opt-br {
    border-right: 1px solid rgba(127, 127, 127, 0.33);
  }

  .opt-bt {
    border-top: 1px solid rgba(127, 127, 127, 0.33);
  }

  .opt-bb {
    border-bottom: 1px solid rgba(127, 127, 127, 0.33);
  }
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
        current: state.options.design.font,
        options: state.options.typography
      }, prev, send)
    default:
      return
  }
}

const model = {
  state: {
    font: font.model.state
  },
  reducers: {

  }
}

exports.model = {
  namespace: namespace,
  state: model.state,
  reducers: x(
    font.model.reducers,
    model.reducers
  )
}

const handleInvertClick = (event, send) => {
  send('options:invert')
}

exports.view = (state, prev, send) => {
  return h`
    <div class="
      bg-black tc-white psf t0 l0 r0 z3 usn
      ${style}
      ${state.ui.panelActive ? 'x' : 'dn'}
    ">
      <div class="c4 opt-br">
        <div class="opt-bb">
          ${templateOption(state, state, send, state.options.design.scale)}
        </div>
        <div class="opt-bt">
          ${templateOption(state, state, send, state.options.design.font)}
        </div>
      </div>
      <div class="c4 opt-bl opt-br">
        <div class="opt-bb">
          ${templateOption(state, state, send, state.options.design.spacing)}
        </div>
        <div class="opt-bt x tac">
          <div class="c6 opt-br curp" onclick=${e => handleInvertClick(e, send)}>
            Invert
          </div>
          <div class="c6 opt-bl fwb curp">
            Login
          </div>
        </div>
      </div>
      <div class="c4 opt-bl x xjc xac">
        Sponsor
      </div>
      
    </div>
  `
}
