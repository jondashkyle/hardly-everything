var html = require('choo/html')
var x = require('xtend')

var inputColor = require('../components/input-color')
var inputText = require('../components/input/text')
var inputCheckbox = require('../components/input/checkbox')
var inputRange = require('../components/input/range')
var inputTypography = require('../components/input-typography')

module.exports = view

function view (state, emit) {
  return html`
    <div class="${state.ui.mobile ? '' : 'panel-content'} x xw c12 bg-black tc-white sans usn">
      <div class="c12 p1px">
        <div class="tc-black bg-white brit psr z1">
          ${templateOption(state.options.design.font)}
        </div>
      </div>
      <div class="c12 x">
        <div class="c6 p1px">
          <div class="tc-black bg-white">
            ${templateOption(state.options.design.scale)}
          </div>
        </div>
        <div class="c6 p1px">
          <div class="tc-black bg-white">
            ${templateOption(state.options.design.spacing)}
          </div>
        </div>
      </div>
      <div class="c12 x">
        <div class="x xx">
          <div class="c6 p1px">
            ${templateOption(state.options.design.colorBg)}
          </div>
          <div class="c6 p1px">
            ${templateOption(state.options.design.colorText)}
          </div>
        </div>
        <div class="p1px">
          <div class="bg-white tc-black px2 line curp" onclick=${handleInvertClick}>
            Invert
          </div>
        </div>
      </div>
      <div class="c12 p1px">
        <div class="tc-black bg-white line">
          ${templateOption(state.options.design.newTab)}
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
          ${templateOption(state.options.design.autoDismiss)}
        </div>
      </div>
    </div>
  `

  function templateOption (option) {
    switch (option.type) {
      case 'text':
        return state
          .cache(inputText, 'panel:' + option.key)
          .render({
            key: option.key,
            name: option.name,
            value: state.options.values[option.key],
            onChange: function (data) {
              emit('options:values', {
                key: option.key,
                value: data.value
              })
            }
          })
      case 'checkbox':
        return state
          .cache(inputCheckbox, 'panel:' + option.key)
          .render({
            key: option.key,
            name: option.name,
            value: state.options.values[option.key],
            onChange: function (data) {
              emit('options:values', {
                key: option.key,
                value: data.value
              })
            }
          })
      case 'color':
        var color = state.options.values[option.key]
        color = color || { r: 0, g: 0, b: 0 }
        return state
          .cache(inputColor, 'panel:' + option.key)
          .render({
            data: option,
            color: color,
            handleChange: function (value) {
              emit('options:values', {
                key: option.key,
                value: value.rgb
              })
            }
          })
      case 'range':
        return state
          .cache(inputRange, 'panel:' + option.key)
          .render({
            name: option.name,
            value: state.options.values[option.key],
            showValue: option.showValue,
            onInput: function (data) {
              emit('options:values', {
                key: option.key,
                value: data.value
              })
            }
          })
      case 'typography':
        return state
          .cache(inputTypography, 'panel' + option.key)
          .render({
            current: state.options.values.font,
            options: state.options.typography,
            handleCurrentClick: function () {
              emit('options:typography')
            },
            handleOptionClick: function (data) {
              emit('options:values', {
                key: option.key,
                value: data
              })
            }
          })
      default:
        return ''
    }
  }

  function handleInvertClick () {
    emit('options:invert')
  }
}
