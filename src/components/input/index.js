var html = require('choo/html')

var inputTypography = require('./typography')
var inputColor = require('./color')
var inputCheckbox = require('./checkbox')
var inputTextarea = require('./textarea')
var inputRange = require('./range')
var inputText = require('./text')

module.exports = componentInput

function componentInput (state, emit, option) {
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
    case 'textarea':
      return state
        .cache(inputTextarea, 'panel:' + option.key)
        .render({
          key: option.key,
          name: option.name,
          value: state.options.values[option.key],
          onInput: function (data) {
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
          children: option.children,
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