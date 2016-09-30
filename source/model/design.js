const db = require('../db/design')
const xtend = require('xtend')

const namespace = 'design'

const state = {
  background: '#fff',
  blockPadding: 5,
  colorEntry: '#000',
  font: 'Bau-Medium',
  scale: 35
}

const subscriptions = [
  (send, done) => {
    db.get(data => {
      send('design:update', data, done)
      done()
    })
  }
]

const reducers = {
  save: (data, state) => data
}

const effects = {
  update: (data, state, send, done) => {
    const stateUpdate = xtend({ }, state, data)
    db.update(data, stateUpdate)
    send('design:save', stateUpdate, done)
  }
}

module.exports = {
  namespace,
  state,
  subscriptions,
  reducers,
  effects
}
