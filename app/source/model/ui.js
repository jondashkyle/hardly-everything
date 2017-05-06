const x = require('xtend')
const clone = require('clone-deep')

const namespace = 'ui'

exports.state = {
  loaded: false,
  panelActive: false,
  stagingActive: false,
  entriesViewAll: false,
  intro: {
    position: 0,
    password: 'yucca',
    value: '',
  }
}

exports.reducers = {
  intro: (data, state) => ({ intro: x(state.intro, data) }),
  update: (data, state) => x(state, data)
}

exports.namespace = namespace
