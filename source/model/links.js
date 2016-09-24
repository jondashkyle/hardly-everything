const db = require('../db')
const moment = require('moment')
const x = require('xtend')
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
    archive: [ ],
    options: {
      viewAll: false
    }
  },
  subscriptions: [
    (send, done) => {
      db.get('links', data => {
        send('links:init', data, done)
        done()
      })
    },
    (send, done) => {
      // setInterval(() => send('links:refresh', { }, done), 61 * 1000)
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
      const link = x({
        id: id,
        dateAdded: moment().toISOString(),
        dateDismissed: moment().subtract(10, 'years').toISOString()
      }, data)

      const updateState =  state.all.concat(link)

      db.save('links', updateState)
      send('panel:open', { open: false }, done)
      send('links:all', updateState, done)
    },
    remove: (data, state, send, done) => {
      const updateState = state.all.filter(link => link.id !== data.id)

      db.save('links', updateState)
      send('panel:open', { open: false }, done)
      send('links:all', updateState, done)
    },
    update: (data, state, send, done) => {
      const updateState = state.all.map(link =>
        link.id === data.id ? data : link
      )

      db.save('links', updateState)
      send('panel:open', { open: false }, done)
      send('links:all', updateState, done)
    },
    dismiss: (data, state, send, done) => {
      const updateState = state.all.map(link => {
        if (link.id === data.id) {
          return x(link, {
            visited: link.visited + 1,
            dateDismissed: moment().toISOString()
          })
        } else {
          return link
        }
      })

      db.save('links', updateState)
      send('links:all', updateState, done)
    },
    init: (data, state, send, done) => {
      send('links:all', data, done)
    }
  }
}
