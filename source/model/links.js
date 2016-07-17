const db = require('../db')
const xtend = require('xtend')
const uuid = require('node-uuid')

/**
 * Formatters
 */
const formatTags = tag => tag.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/)

/**
 * Links
 */
module.exports = {
  namespace: 'links',
  state: {
    all: [ ],
    order: [ ]
  },
  subscriptions: [
    (send, done) => {
      db.get('links', data => {
        send('links:init', data, done)
        done()
      })
    }
  ],
  reducers: {
    save: (data, state) => data
  },
  effects: {
    add: (data, state, send, done) => {
      const id = uuid.v4()
      const updateState = xtend(state, {
        all: [xtend({ id: id }, data)].concat(state.all),
        order: [id].concat(state.all)
      })
      db.save('links', updateState)
      send('panel:open', { open: false }, done)
      send('links:save', updateState, done)
    },
    remove: (data, state, send, done) => {
      const updateState = xtend(state, {
        all: state.all.filter(link => link.id !== data.id)
      })
      db.save('links', updateState)
      send('panel:open', { open: false }, done)
      send('links:save', updateState, done)
    },
    update: (data, state, send, done) => {
      const updateState = xtend(state, {
        all: state.all.map(link => link.id === data.id ? data : link)
      })
      db.save('links', updateState)
      send('panel:open', { open: false }, done)
      send('links:save', updateState, done)
    },
    init: (data, state, send, done) => {
      const updateState = xtend(state, data)
      db.save('links', updateState)
      send('links:save', updateState, done)
    }
  }
}
