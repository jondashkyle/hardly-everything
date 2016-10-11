const db = require('../db/options')
const clone = require('clone-deep')
const x = require('xtend')

const typography = require('../css/typography')

const namespace = 'options'

const optionsTypography = {
  moderat: {
    name: 'Moderat',
    key: 'moderat',
    host: 'local',
    active: true,
    value: 'Moderat'
  },
  moderatBold: {
    name: 'Moderat Bold',
    key: 'moderatBold',
    host: 'local',
    active: true,
    weight: '700',
    value: 'Moderat'
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
    active: true,
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

exports.state = {
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
      type: 'dropdown',
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
    font: optionsTypography.moderatBold,
    scale: 35,
    spacing: 5,
    invert: false
  },
  typography: optionsTypography
}

exports.subscriptions = [
  (send, done) => {
    db.get(data => {
      send('options:update', data, done)
      typography.load(data.font, send, done)
    })
  }
]

exports.reducers = {
  typography: (data, state) => ({
    typography: x(state.typography, {
      [data.key]: x(state.typography[data.key], data.value)
    })
  }),
  update: (data, state) => ({
    values: x(state.values, data)
  })
}

exports.effects = {
  reset: (data, state, send, done) => {
    db.update({ }, exports.state.values)
    send('options:update', exports.state.values, done)
  },
  values: (data, state, send, done) => {
    const newState = clone(state.values)
    newState[data.key] = data.value

    if (data.key === 'font') {
      typography.load(data.value, send, done)
    }

    db.update(data, newState)
    send('options:update', newState, done)
  },
  invert: (data, state, send, done) => {
    const newState = clone(state.values)

    if (state.values.invert) {
      newState.invert = false
      newState.colorBg = '#fff'
      newState.colorText = '#000'
    } else {
      newState.invert = true
      newState.colorBg = '#000'
      newState.colorText = '#fff'
    }

    db.update({ }, newState)
    send('options:update', newState, done)
  }
}

exports.namespace = namespace
