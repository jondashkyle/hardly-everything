var objectValues = require('object-values')
var clone = require('clone-deep')
var xtend = require('xtend')

var libDesign = require('../lib/design')
var optionsTypography = require('./options-typography')
var typography = require('../design/typography')
var db = require('../db/options')

module.exports = Options

function Options (state, emitter) {
  state.options = getDefaultState()

  // values
  emitter.on('options:values', function (data) {
    var newState = clone(state.options.values)
    newState[data.key] = data.value

    if (data.key === 'font') {
      typography.load(data.value, function (event, _data) {
        emitter.emit(event, _data)
      })
    }

    // console.log(data)

    db.update(data, newState)
    emitter.emit('options:update', newState)
  })

  emitter.on('options:replace', function (data) {
    var newState = xtend(state.options.values, data)
    db.update(data, newState)
    emitter.emit('options:update', newState)
  })

  // update
  emitter.on('options:update', function (data) {
    state.options.values = xtend(state.options.values, data)
    emitter.emit('app:render')
  })

  // reset
  emitter.on('options:reset', function (data) {
    var defaults = getDefaultState().values
    db.update({ }, defaults)
    emitter.emit('options:update', defaults)
  })

  // loaded
  emitter.on('options:loaded', function (data) {
    state.options.loaded = xtend(state.options.loaded, data)
    emitter.emit('app:render')
  })

  emitter.on('options:invert', function (data) {
    var newState = clone(state.options.values)

    newState.invert = !state.options.values.invert
    newState.colorBg = state.options.values.colorText
    newState.colorText = state.options.values.colorBg

    db.update({ }, newState)
    emitter.emit('options:update', newState)
  })

  emitter.on('options:typography', function () {
    var options = objectValues(state.options.typography)
    options.forEach(function (data) {
      typography.load(data, () => emitter.emit)
    })
  })

  // type
  emitter.on('DOMContentLoaded', function () {
    var defaults = getDefaultState()

    typography.local(function () {
      emitter.emit('options:loaded', { typeLocal: true })
      emitter.emit('app:render')
    })

    // init
    db.get(function (data) {
      if (data.font) {
        typography.load(data.font, function () {
          emitter.emit('options:loaded', { typeCustom: true })
        })
      } else {
        typography.load(state.options.values.font, function () {
          emitter.emit('options:loaded', { typeCustom: true })
        })
      }

      if (typeof data.colorBg !== 'object') {
        data.colorBg = defaults.values.colorBg
      }

      if (typeof data.colorText !== 'object') {
        data.colorText = defaults.values.colorText
      }

      emitter.emit('options:update', data)
      emitter.emit('options:loaded', { data: true })
      emitter.emit('app:render')
    })
  })
}

function getDefaultState () {
  return {
    design: {
      colorBg: {
        name: 'Background',
        key: 'colorBg',
        type: 'color',
        visible: true
      },
      colorText: {
        name: 'Text',
        key: 'colorText',
        type: 'color',
        visible: true
      },
      font: {
        name: 'Font',
        key: 'font',
        type: 'typography',
        visible: true
      },
      uppercase: {
        name: 'Uppercase',
        key: 'uppercase',
        type: 'checkbox',
        visible: true
      },
      hyphenate: {
        name: 'Hyphenate',
        key: 'hyphenate',
        type: 'checkbox',
        visible: true
      },
      scale: {
        name: 'Scale',
        key: 'scale',
        type: 'range',
        min: 5,
        max: 72,
        showValue: false,
        visible: true
      },
      spacing: {
        name: 'Space',
        key: 'spacing',
        type: 'range',
        min: 0,
        max: 25,
        valueShow: false,
        visible: true
      },
      invert: {
        name: 'Invert',
        key: 'invert',
        visible: false
      },
      newTab: {
        name: 'Open links in a new window',
        key: 'newTab',
        type: 'checkbox',
        visible: true
      },
      autoDismiss: {
        name: 'Auto Hide Entries',
        key: 'autoDismiss',
        type: 'checkbox',
        visible: false
      },
      css: {
        name: 'Edit your custom CSS',
        key: 'css',
        type: 'textarea',
        visible: true
      }
    },
    values: xtend({
      invert: false,
      newTab: true,
      autoDismiss: true,
      css: libDesign.getCssDefaults()
    }, libDesign.getDesignDefaults()),
    loaded: {
      typeLocal: false,
      typeCustom: false,
      data: false
    },
    typography: optionsTypography
  }
}
