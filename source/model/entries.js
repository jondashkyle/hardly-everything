const db = require('../db/entries')
const x = require('xtend')
const moment = require('moment')
const uuid = require('node-uuid')

const namespace = 'entries'

const formatTags = tag =>
  tag.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/)

const state = {
  all: [ ],
  archive: [ ],
  options: {
    viewAll: false
  }
}

const subscriptions = [
  (send, done) => {
    db.get(data => {
      send('entries:init', data, done)
      done()
    })
  },
  (send, done) => {
    setInterval(() => send('entries:refresh', { }, done), 500)
  }
]

const reducers  ={
  all: (data, state) => ({ all: data }),
  refresh: (data, state) => (state),
  options: (data, state) => ({ options: x(state.options, data) })
}

const effects = {
  add: (data, state, send, done) => {
    const id = uuid.v4()
    const entry = x({
      id: id,
      dateAdded: moment().toISOString(),
      dateDismissed: moment().subtract(10, 'years').toISOString()
    }, data)

    const updateState =  state.all.concat(entry)

    send('panel:open', { open: false }, done)
    send('entries:all', updateState, done)
    db.add(entry, updateState)
  },
  remove: (data, state, send, done) => {
    const updateState = state.all.filter(entry => entry.id !== data.id)

    send('panel:open', { open: false }, done)
    send('entries:all', updateState, done)
    db.remove(data, updateState)
  },
  update: (data, state, send, done) => {
    const updateState = state.all.map(entry =>
      entry.id === data.id ? data : entry
    )

    send('panel:open', { open: false }, done)
    send('entries:all', updateState, done)
    db.update(data, updateState)
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

    send('entries:all', updateState, done)
    db.update(data, updateState)
  },
  init: (data, state, send, done) => {
    send('entries:all', data, done)
  }
}

module.exports = {
  namespace,
  state,
  subscriptions,
  reducers,
  effects
}
