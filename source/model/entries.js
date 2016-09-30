const db = require('../db/entries')
const x = require('xtend')
const clone = require('clone-deep')
const moment = require('moment')
const uuid = require('node-uuid')

const namespace = 'entries'

const formatTags = tag =>
  tag.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/)

const state = {
  all: { },
  archive: { }
}

const subscriptions = [
  (send, done) => {
    // db.update({ }, { })
    db.get(data => {
      send('entries:init', data, done)
    })
  },
  (send, done) => {
    setInterval(() => send('entries:refresh', { }, done), 1000 * 61)
  }
]

const reducers = {
  all: (data, state) => ({ all: data }),
  refresh: (data, state) => (state)
}

const effects = {
  add: (data, state, send, done) => {
    const id = uuid.v4()
    const entry = x({
      id: id,
      dateAdded: moment().toISOString(),
      dateDismissed: moment().subtract(10, 'years').toISOString()
    }, data)

    const newState = clone(state.all)
    newState[id] = entry

    send('ui:update', { stagingActive: false }, done)
    send('entries:all', newState, done)
    db.add(entry, newState)
  },
  remove: (data, state, send, done) => {
    const newState = clone(state.all)
    delete newState[data.id]

    send('entries:all', newState, done)
    db.remove(data, newState)
  },
  update: (data, state, send, done) => {
    const newState = clone(state.all)
    newState[data.id] = data

    send('entries:all', newState, done)
    db.update(data, newState)
  },
  dismiss: (data, state, send, done) => {
    const newState = clone(state.all)
    const curEntry = newState[data.id]
    const newEntry = x(curEntry, {
      visited: curEntry.visited + 1,
      dateDismissed: moment().toISOString()
    })

    newState[data.id] = newEntry

    send('entries:all', newState, done)
    db.update(newEntry, newState)
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
