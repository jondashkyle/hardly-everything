const db = require('../db')
const moment = require('moment')
const x = require('xtend')
const uuid = require('node-uuid')

/**
 * Formatters
 */
const formatTags = tag => tag.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/)

/**
 * Entries
 */
module.exports = {
  namespace: 'entries',
  state: {
    all: [ ],
    archive: [ ],
    options: {
      viewAll: false
    }
  },
  subscriptions: [
    (send, done) => {
      db.get('entries', data => {
        send('entries:init', data, done)
        done()
      })
    },
    (send, done) => {
      setInterval(() => send('entries:refresh', { }, done), 500)
    }
  ],
  reducers: {
    all: (data, state) => ({ all: data }),
    refresh: (data, state) => (state),
    options: (data, state) => ({ options: x(state.options, data) })
  },
  effects: {
    add: (data, state, send, done) => {
      const id = uuid.v4()
      const entry = x({
        id: id,
        dateAdded: moment().toISOString(),
        dateDismissed: moment().subtract(10, 'years').toISOString()
      }, data)

      const updateState =  state.all.concat(entry)

      db.save('entries', updateState)
      send('panel:open', { open: false }, done)
      send('entries:all', updateState, done)
    },
    remove: (data, state, send, done) => {
      const updateState = state.all.filter(entry => entry.id !== data.id)

      db.save('entries', updateState)
      send('panel:open', { open: false }, done)
      send('entries:all', updateState, done)
    },
    update: (data, state, send, done) => {
      const updateState = state.all.map(entry =>
        entry.id === data.id ? data : entry
      )

      db.save('entries', updateState)
      send('panel:open', { open: false }, done)
      send('entries:all', updateState, done)
    },
    dismiss: (data, state, send, done) => {
      const updateState = state.all.map(entry => {
        if (entry.id === data.id) {
          return x(entry, {
            visited: entry.visited + 1,
            dateDismissed: moment().toISOString()
          })
        } else {
          return entry
        }
      })

      db.save('entries', updateState)
      send('entries:all', updateState, done)
    },
    init: (data, state, send, done) => {
      send('entries:all', data, done)
    }
  }
}
