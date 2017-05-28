var db = require('../db/options')
var clone = require('clone-deep')
var x = require('xtend')

var typography = require('../css/typography')

var optionsTypography = {
  system: {
    name: 'System',
    key: 'sans',
    host: 'local',
    active: true,
    value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
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
  spaceMono: {
    name: 'Space Mono',
    key: 'spaceMono',
    host: 'google',
    value: 'Space Mono'
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

  // typography
  emitter.on('options:typography', function (data) {
    // not sure how this was used before
    // state.options.typography = x(state.typography, {
    //   [data.key]: x(state.options.typography[data.key], data.value)
    // })
  })

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

    if (state.options.values.invert) {
      newState.invert = false
      newState.colorBg = '#fff'
      newState.colorText = '#000'
    } else {
      newState.invert = true
      newState.colorBg = '#000'
      newState.colorText = '#fff'
    }

    db.update({ }, newState)
    emitter.emit('options:update', newState)
  })

  // type
  typography.local(function () {
    emitter.emit('options:loaded', { typeLocal: true })
    emitter.emit('render')
  })

  // init
  db.get(function (data) {
    if (data.font) {
      typography.load(data.font, () => emitter.emit)
    } else {
      typography.load(state.options.values.font, () => emitter.emit)
    }

    emitter.emit('options:update', data)
    emitter.emit('options:loaded', { data: true })
    emitter.emit('render')
  })
}

function getDefaultState () {
 return {
    design: {
      colorBg: {
        name: 'Background',
        key: 'colorBg',
        type: 'text',
        visible: false
      },
      colorText: {
        name: 'Text',
        key: 'colorText',
        type: 'text',
        visible: false
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
        valueShow: false,
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
      }
    },
    values: {
      colorBg: '#fff',
      colorText: '#000',
      font: optionsTypography.system,
      scale: 35,
      spacing: 5,
      invert: false
    },
    loaded: {
      typeLocal: false,
      typeCustom: false,
      data: false
    },
    typography: optionsTypography
  } 
}