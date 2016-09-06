const db = require('../db')
const xtend = require('xtend')

/**
 * Design
 */
module.exports = {
  namespace: 'design',
  state: {
    background: '#fff',
    blockPadding: 20,
    colorLink: '#000',
    font: 'Bau-Medium',
    scale: 62
  },
  subscriptions: [
    (send, done) => {
      db.get('design', data => {
        send('design:update', data, done)
        done()
      })
    }
  ],
  reducers: {
    save: (data, state) => data
  },
  effects: {
    update: (data, state, send, done) => {
      const stateUpdate = xtend({ }, state, data)
      db.save('design', stateUpdate)
      send('design:save', stateUpdate, done)
    }
  }
}
