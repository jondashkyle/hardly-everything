var h = require('rooch/h')
var html = require('rooch/html')
var sf = require('sheetify')
var x = require('xtend')

var inputText = require('../components/input-text')
var inputCheckbox = require('../components/input-checkbox')
var inputRange = require('../components/input-range')
var inputTypography = require('../components/input-typography')

var templateOption = (state, option, emit) => {
  switch (option.type) {
    case 'text':
      return inputText(state, option, emit)
    case 'checkbox':
      return inputCheckbox(state, option, emit)
    case 'range':
      return inputRange({
        name: option.name,
        value: state.options.values[option.key],
        valueShow: option.valueShow,
        handleInput: function (value) {
          emit('options:values', {
            key: option.key,
            value: value
          })
        }
      })
    case 'typography':
      return h(inputTypography, {
        current: state.options.values.font,
        options: state.options.typography
      })
    default:
      return ''
  }
}

module.exports = view

function view (state, emit) {
  return html`
    <div class="x xw c12 p1px bro bg-black tc-white sans usn">
      <div class="c12 p1px">
        <div class="tc-black bg-white brit psr z1">
          ${templateOption(state, state.options.design.font, emit)}
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white">
          ${templateOption(state, state.options.design.scale, emit)}
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white">
          ${templateOption(state, state.options.design.spacing, emit)}
        </div>
      </div>
      <div class="c12">
        <div class="x tac">
          <div class="c6 curp p1px" onclick=${handleInvertClick}>
            <div class="bg-white line tc-black">
              Invert
            </div>
          </div>
          <div class="c6 p1px curp">
            <a href="/data/" class="line bg-white db tc-black">
              Data
            </a>
          </div>
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white brib line">
          ${templateOption(state, state.options.design.autoDismiss, emit)}
        </div>
      </div>
    </div>
  `

  function handleInvertClick () {
    emit('options:invert')
  }
}
