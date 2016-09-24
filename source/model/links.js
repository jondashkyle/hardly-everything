const db = require('../db')
const moment = require('moment')
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
    viewAll: false
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
    viewAll: (data, state) => ({ viewAll: data.viewAll })
  },
  effects: {
    add: (data, state, send, done) => {
      const id = uuid.v4()
      const link = xtend({
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
          return xtend(link, {
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
      db.save('links', data)
      send('links:all', data, done)
    }
  }
}
