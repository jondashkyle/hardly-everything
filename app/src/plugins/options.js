var db = require('../db/options')
var clone = require('clone-deep')
var ov = require('object-values')
var x = require('xtend')

var typography = require('../design/typography')

var optionsTypography = {
  systemLight: {
    name: 'System Light',
    key: 'sans',
    host: 'local',
    active: true,
    weight: 200,
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  system: {
    name: 'System',
    key: 'sans',
    host: 'local',
    active: true,
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  systemBold: {
    name: 'System Bold',
    key: 'sans',
    host: 'local',
    active: true,
    weight: 700,
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  },
  alegreya: {
    name: 'Alegreya',
    key: 'alegreya',
    host: 'google', 
    value: 'Alegreya'
  },
  alegreyaItalic: {
    name: 'Alegreya Italic',
    key: 'alegreyaItalic',
    host: 'google', 
    style: 'italic',
    value: 'Alegreya'
  },
  anonymous: {
    name: 'Anonymous',
    key: 'anonymous',
    host: 'google', 
    value: 'Anonymous Pro'
  },
  cabin: {
    name: 'Cabin',
    key: 'cabin',
    host: 'google',
    value: 'Cabin'
  },
  cabinBold: {
    name: 'Cabin Bold',
    key: 'cabinBold',
    host: 'google',
    weight: 700,
    value: 'Cabin'
  },
  cardo: {
    name: 'Cardo',
    key: 'cardo',
    host: 'google',
    value: 'Cardo'
  },
  garamond: {
    name: 'Cormorant Garamond',
    key: 'garamond',
    host: 'google',
    value: 'Cormorant Garamond'
  },
  inconsolata: {
    name: 'Inconsolata',
    key: 'inconsolata',
    host: 'google',
    value: 'Inconsolata'
  },
  montserrat: {
    name: 'Montserrat',
    key: 'montserrat',
    host: 'google',
    value: 'Montserrat'
  },
  montserratBold: {
    name: 'Montserrat Bold',
    key: 'montserratBold',
    host: 'google',
    weight: '700',
    value: 'Montserrat'
  },
  karla: {
    name: 'Karla',
    key: 'karla',
    host: 'google',
    value: 'Karla'
  },
  notoSerif: {
    name: 'Noto Serif',
    key: 'notoSerif',
    host: 'google',
    value: 'Noto Serif'
  },
  openSansLight: {
    name: 'Open Sans Light',
    key: 'openSansLight',
    host: 'google',
    weight: 300,
    value: 'Open Sans'
  },
  openSansBold: {
    name: 'Open Sans Bold',
    key: 'openSansBold',
    host: 'google',
    weight: 700,
    value: 'Open Sans'
  },
  pathway: {
    name: 'Pathway Gothic',
    key: 'pathway',
    host: 'google',
    value: 'Pathway Gothic One'
  },
  playfairDisplay: {
    name: 'Playfair Display',
    key: 'playfairDisplay',
    host: 'google',
    value: 'Playfair Display'
  },
  playfairDisplayBold: {
    name: 'Playfair Display Bold',
    key: 'playfairDisplayBold',
    host: 'google',
    weight: 700,
    value: 'Playfair Display'
  },
  rubikLight: {
    name: 'Rubik Light',
    key: 'rubikLight',
    host: 'google',
    weight: 300,
    value: 'Rubik'
  },
  rubik: {
    name: 'Rubik',
    key: 'rubik',
    host: 'google',
    value: 'Rubik'
  },
  rubikBlack: {
    name: 'Rubik Black',
    key: 'rubikBlack',
    host: 'google',
    weight: 900,
    value: 'Rubik'
  },
  spaceMono: {
    name: 'Space Mono',
    key: 'spaceMono',
    host: 'google',
    value: 'Space Mono'
  },
  spectralExtraLight: {
    name: 'Spectral Extra-Light',
    key: 'spectralExtraLight',
    host: 'google',
    weight: 200,
    value: 'Spectral'
  },
  spectral: {
    name: 'Spectral',
    key: 'spectral',
    host: 'google',
    weight: 400,
    value: 'Spectral'
  },
  spectralBold: {
    name: 'Spectral Bold',
    key: 'spectralBold',
    host: 'google',
    weight: 700,
    value: 'Spectral'
  },
  workSans: {
    name: 'Work Sans',
    key: 'workSans',
    host: 'google',
    value: 'Work Sans'
  },
  workSansLight: {
    name: 'Work Sans Light',
    key: 'workSansLight',
    host: 'google',
    weight: 200,
    value: 'Work Sans'
  },
  workSansBold: {
    name: 'Work Sans Bold',
    key: 'workSansBold',
    host: 'google',
    weight: 700,
    value: 'Work Sans'
  }
}

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

    db.update(data, newState)
    emitter.emit('options:update', newState)
  })

  // update
  emitter.on('options:update', function (data) {
    state.options.values = x(state.options.values, data)
    emitter.emit('render')
  })

  // reset
  emitter.on('reset', function (data) {
    var defaults = getDefaultState().values
    db.update({ }, defaults)
    emitter.emit('options:update', defaults)
  })

  // loaded
  emitter.on('options:loaded', function (data) {
    state.options.loaded = x(state.options.loaded, data)
    emitter.emit('render')
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
    ov(state.options.typography).forEach((data) => {
      typography.load(data, () => emitter.emit)
    })
  })

  // type
  emitter.on('DOMContentLoaded', function () {
    var defaults = getDefaultState()

    typography.local(function () {
      emitter.emit('options:loaded', { typeLocal: true })
      emitter.emit('render')
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
      emitter.emit('render')
    })
  })
}

function getDefaultState () {
 return {
    design: {
      colorBg: {
        name: 'Background color',
        key: 'colorBg',
        type: 'color',
        visible: true
      },
      colorText: {
        name: 'Text color',
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
        name: 'Open entries in new tab',
        key: 'newTab',
        type: 'checkbox',
        visible: true
      },
      autoDismiss: {
        name: 'Auto Hide Entries',
        key: 'autoDismiss',
        type: 'checkbox',
        visible: false
      }
    },
    values: {
      colorBg: { r: 255, g: 255, b: 255 },
      colorText: { r: 0, g: 0, b: 0 },
      font: optionsTypography.system,
      scale: 35,
      spacing: 5,
      invert: false,
      newTab: false,
      autoDismiss: true
    },
    loaded: {
      typeLocal: false,
      typeCustom: false,
      data: false
    },
    typography: optionsTypography
  } 
}
