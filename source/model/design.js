const db = require('../db')
const xtend = require('xtend')

/**
 * Design
 */
module.exports = {
  namespace: 'design',
  state: {
    background: '#eee',
    backgroundLink: '#fff',
    blockMargin: '1px',
    colorLink: '#000',
    template: 'blocks',
    templates: ['inline', 'grid', 'blocks'],
    font: 'Bau-Medium'
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
