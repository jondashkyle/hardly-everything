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
    value: 'Moderat'
  },
  moderatBold: {
    name: 'Moderat Bold',
    key: 'moderatBold',
    host: 'local',
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
    weight: 200,
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

exports.state = {
  design: {
    colorBg: {
      name: 'Background',
      key: 'colorBg',
      type: 'text',
      visible: false,
      value: '#fff'
    },
    colorText: {
      name: 'Text',
      key: 'colorText',
      type: 'text',
      visible: false,
      value: '#000'
    },
    font: {
      name: 'Font',
      key: 'font',
      type: 'dropdown',
      value: optionsTypography.moderatBold,
      visible: true
    },
    scale: {
      name: 'Scale',
      key: 'scale',
      type: 'range',
      min: 5,
      max: 72,
      value: 35,
      visible: true
    },
    spacing: {
      name: 'Spacing',
      key: 'spacing',
      type: 'range',
      min: 0,
      max: 25,
      value: 5,
      visible: true
    },
    invert: {
      name: 'Invert',
      key: 'invert',
      value: false,
      visible: false
    }
  },
  typography: optionsTypography
}

exports.subscriptions = [
  (send, done) => {
    db.get(data => {
      send('options:update', data, done)
      typography.load(data.font.value)
    })
  }
]

exports.reducers = {
  update: (data, state) => ({
    design: x(state.design, data)
  })
}

exports.effects = {
  reset: (data, state, send, done) => {
    db.update({ }, exports.state.design)
    send('options:update', exports.state.design, done)
  },
  design: (data, state, send, done) => {
    const newState = clone(state.design)
    newState[data.key].value = data.value

    if (data.key === 'font') {
      typography.load(data.value)
    }

    db.update(data, newState)
    send('options:update', newState, done)
  },
  invert: (data, state, send, done) => {
    const newState = clone(state.design)

    if (state.design.invert.value) {
      newState.invert.value = false
      newState.colorBg.value = '#fff'
      newState.colorText.value = '#000'
    } else {
      newState.invert.value = true
      newState.colorBg.value = '#000'
      newState.colorText.value = '#fff'
    }

    db.update({ }, newState)
    send('options:update', newState, done)
  }
}

exports.namespace = namespace
