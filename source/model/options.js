const db = require('../db/options')
const clone = require('clone-deep')
const x = require('xtend')

const namespace = 'options'

const typography = {
  system: {
    name: 'system',
    weights: [200, 400, 600]
  },
  cabin: {
    name: 'Cabin',
    weights: [400]
  },
  garamond: {
    name: 'Cormorant+Garamond',
    weights: [400]
  },
  inconsolata: {
    name: 'Inconsolata',
    weights: [400]
  },
  montserrat: {
    name: 'Montserrat',
    weights: [400]
  },
  openSans: {
    name: 'Open+Sans',
    weights: [400, 600]
  },
  spaceMono: {
    ame: 'Space+Mono',
    weights: [400]
  },
  workSans: {
    name: 'Work+Sans',
    weights: [400]
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
      value: 'Moderat-Bold',
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
    }
  },
  typography: typography
}

exports.subscriptions = [
  (send, done) => {
    // db.update({ }, exports.state)
    db.get(data => {
      send('options:update', data, done)
    })
  }
]

exports.reducers = {
  update: (data, state) => (x(state, data))
}

exports.effects = {
  design: (data, state, send, done) => {
    const newState = clone(state)
    newState.design[data.key].value = data.value
    db.update(data, newState)
    send('options:update', newState, done)
  }
}

exports.namespace = namespace
