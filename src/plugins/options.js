var objectValues = require('object-values')
var clone = require('clone-deep')
var xtend = require('xtend')

var typography = require('../design/typography')
var db = require('../db/options')

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
  astloch: {
    name: 'Astloch',
    key: 'astloch',
    host: 'local',
    value: 'Astloch'
  },
  authenticSans: {
    name: 'Authentic Sans',
    key: 'authenticSans',
    host: 'local',
    value: 'Authentic Sans'
  },
  dsegClassicLight: {
    name: 'DSEG7 Classic Light',
    key: 'dsegClassicLight',
    host: 'local',
    value: 'DSEG7 Classic Light'
  },
  dseg7ClassicBold: {
    name: 'DSEG7 Classic Bold',
    key: 'dseg7ClassicBold',
    host: 'local',
    value: 'DSEG7 Classic Bold'
  },
  jrugPunk: {
    name: 'JRUG PUNK',
    key: 'jrugPunk',
    host: 'local',
    value: 'JRUG PUNK'
  },
  junicodeCondensed: {
    name: 'Junicode Condensed',
    key: 'junicodeCondensed',
    host: 'local',
    value: 'Junicode Condensed'
  },
  junicodeBoldCondensed: {
    name: 'Junicode Bold Condensed',
    key: 'junicodeBoldCondensed',
    host: 'local',
    value: 'Junicode Bold Condensed'
  },
  pecita: {
    name: 'Pecita',
    key: 'pecita',
    host: 'local',
    value: 'Pecita'
  },
  spaceMono: {
    name: 'Space Mono',
    key: 'spaceMono',
    host: 'local',
    value: 'Space Mono'
  },
  spectralExtraLight: {
    name: 'Spectral Extra-Light',
    key: 'spectralExtraLight',
    host: 'local',
    value: 'Spectral Extra-Light'
  },
  spectral: {
    name: 'Spectral',
    key: 'spectral',
    host: 'local',
    value: 'Spectral'
  },
  spectralBold: {
    name: 'Spectral Bold',
    key: 'spectralBold',
    host: 'local',
    value: 'Spectral Bold'
  },
  terminalGrotesque: {
    name: 'Terminal Grotesque',
    key: 'terminalGrotesque',
    host: 'local',
    value: 'Terminal Grotesque'
  },
  umeGothic: {
    name: 'Ume Gothic',
    key: 'umeGothic',
    host: 'local',
    value: 'Ume Gothic'
  },
  umeMincho: {
    name: 'Ume Mincho',
    key: 'umeMincho',
    host: 'local',
    value: 'Ume Mincho'
  },
  unifrakturMaguntia: {
    name: 'Unifraktur Maguntia',
    key: 'unifrakturMaguntia',
    host: 'local',
    value: 'Unifraktur Maguntia'
  },
  workSansThin: {
    name: 'Work Sans Thin',
    key: 'workSansThin',
    host: 'local',
    value: 'Work Sans Thin'
  },
  workSans: {
    name: 'Work Sans',
    key: 'workSans',
    host: 'local',
    value: 'Work Sans'
  },
  workSansBlack: {
    name: 'Work Sans Black',
    key: 'workSansBlack',
    host: 'local',
    value: 'Work Sans Black'
  },
  wremenaLight: {
    name: 'Wremena Light',
    key: 'wremenaLight',
    host: 'local',
    value: 'Wremena Light'
  },
  wremenaBold: {
    name: 'Wremena Bold',
    key: 'wremenaBold',
    host: 'local',
    value: 'Wremena Bold'
  },
  youngSerif: {
    name: 'Young Serif',
    key: 'youngSerif',
    host: 'local',
    value: 'Young Serif'
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
    state.options.values = xtend(state.options.values, data)
    emitter.emit('app:render')
  })

  // reset
  emitter.on('reset', function (data) {
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
      newTab: true,
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
