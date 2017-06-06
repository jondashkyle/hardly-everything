var react = require('react')
var h = require('rooch/h')
var html = require('rooch/html')
var x = require('xtend')

var inputColor = require('../components/input-color')
var inputText = require('../components/input-text')
var inputCheckbox = require('../components/input-checkbox')
var inputRange = require('../components/input-range')
var inputTypography = require('../components/input-typography')

function templateOption (state, option, emit) {
  switch (option.type) {
    case 'text':
      return inputText(state, option, emit)
    case 'checkbox':
      return inputCheckbox(state, option, emit)
    case 'color':
      var color = state.options.values[option.key]
      return h(inputColor, {
        data: option,
        color: `rgb(${color.r}, ${color.g}, ${color.b})`,
        handleChange: function (value) {
          emit('options:values', {
            key: option.key,
            value: value.rgb
          })
        }
      })
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
    <div class="${state.ui.mobile ? '' : 'panel-content'} x xw c12 bg-black tc-white sans usn">
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
      <div class="c12 x">
        <div class="xx">
          <div class="c12 p1px">
            ${templateOption(state, state.options.design.colorBg, emit)}
          </div>
          <div class="c12 p1px">
            ${templateOption(state, state.options.design.colorText, emit)}
          </div>
        </div>
        <div class="x p1px" style="width: 9.2rem">
          <div class="x xac xjc c12 bg-white tc-black px1 curp" onclick=${handleInvertClick}>
            Invert
          </div>
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white line">
          ${templateOption(state, state.options.design.newTab, emit)}
        </div>
      </div>
      <div class="c12">
        <div class="c12 p1px curp tac">
          <a href="/data/" class="line bg-white db bribr tc-black">
            Data
          </a>
        </div>
      </div>
      <div class="c12 p1px dn">
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
