const db = require('../db/options')
const clone = require('clone-deep')
const x = require('xtend')

const namespace = 'options'

const typography = [
  { name: 'system', weight: [200, 400, 600] },
  { name: 'Cabin', weight: 400 },
  { name: 'Cormorant+Garamond', weight: 400 },
  { name: 'Inconsolata', weight: 400 },
  { name: 'Montserrat', weight: 400 },
  { name: 'Open+Sans', weight: [400, 600] },
  { name: 'Space+Mono', weight: 400 },
  { name: 'Work+Sans', weight: 400 }
]

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
      type: 'text',
      visible: true,
      value: 'Moderat-Bold'
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
  }
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
    db.update(data, newState )
    send('options:update', newState, done)
  }
}

exports.namespace = namespace
