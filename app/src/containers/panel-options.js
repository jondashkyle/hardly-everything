var html = require('rooch/html')
var sf = require('sheetify')
var x = require('xtend')

var inputText = require('../components/input-text')
var inputRange = require('../components/input-range')
var inputDropdown = require('../components/input-dropdown')

var namespace = 'panelOptions'

var font = inputDropdown({
  namespace: 'font',
  parent: namespace
})

var style = sf`
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
`

var templateOption = (state, option, emit) => {
  switch (option.type) {
    case 'text':
      return inputText(state, option, emit)
    case 'range':
      return inputRange({
        name: option.name,
        value: state.options.values[option.key],
        valueShow: option.valueShow,
        handleInput: value => emit('options:values', {
          key: option.key,
          value: value
        })
      })
    case 'dropdown':
      // return font.view({
      //   local: state[namespace].font,
      //   current: state.options.values.font,
      //   options: state.options.typography
      // }, emit)
    default:
      return
  }
}

var model = {
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

var handleInvertClick = (event, emit) => {
  emit('options:invert')
}

exports.view = (state, emit) => {
  return html`
    <div class="
      bg-black tc-white psf t0 l0 r0 z3 sans usn
      ${style}
      ${state.ui.panelActive ? 'x' : 'dn'}
    ">
      <div class="c4 opt-br">
        <div class="opt-bb">
          ${templateOption(state, state.options.design.scale, emit)}
        </div>
        <div class="opt-bt">
          ${templateOption(state, state.options.design.font, emit)}
        </div>
      </div>
      <div class="c4 opt-bl opt-br">
        <div class="opt-bb">
          ${templateOption(state, state.options.design.spacing, emit)}
        </div>
        <div class="opt-bt x tac">
          <div class="c6 opt-br curp" onclick=${e => handleInvertClick(e, emit)}>
            Invert
          </div>
          <div class="c6 opt-bl curp">
            <a href="/data/" class="db tc-white">
              Data
            </a>
          </div>
        </div>
      </div>
      <div class="c4 opt-bl x xjc xac psr">
        <a href="http://hello.hardlyeverything.com" class="psa t0 l0 r0 b0 z2"></a>
        <div class="lh1-5 tac">
          <div>Currently in Beta</div>
          <div class="fs0-7">Visit the log for info & updates</div>
        </div>
        <div class="dn psa t0 r0 p0-5 lh1">
          <span class="r45">→</span>
        </div>
      </div>
    </div>
  `
}
