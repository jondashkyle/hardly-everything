const db = require('../db/entries')
const x = require('xtend')
const clone = require('clone-deep')
const moment = require('moment')
const uuid = require('node-uuid')
const normalizeUrl = require('normalize-url')
const isUrl = require('is-url')

const namespace = 'entries'

const intervals = ['minute', 'minutes', 'hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years']

const formatTags = tag =>
  tag.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/)

const formatEntry = data => {
  const result = clone(data)

  for (key in result) {
    switch (key) {
      case 'url':
        result.url = normalizeUrl(result.url)
        break
    }
  }
  
  return result
}

const validateEntry = data => {
  for (key in data) {
    switch (key) {
      case 'url': return isUrl(data.url)
        ? true
        : 'Please enter a valid URL'
      case 'duration': return isNaN(data.duration)
        ? 'Please enter a valid duration'
        : true
      case 'interval': return intervals.indexOf(data.interval) > -1
        ? true
        : 'Please enter a valid interval'
    }
  }
}

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
  refresh: (data, state) => (state),
}

const effects = {
  add: (data, state, send, done) => {
    const id = uuid.v4()
    const staging = x({
      id: id,
      dateAdded: moment().toISOString(),
      dateDismissed: moment().subtract(10, 'years').toISOString()
    }, data)
    const entry = formatEntry(staging)
    const validation = validateEntry(entry)

    if (validation) {
      const newState = clone(state.all)
      newState[id] = entry

      send('staging:reset', { }, done)
      send('ui:update', { stagingActive: false }, done)
      send('entries:all', newState, done)

      db.add(entry, newState), done
    } else {
      alert(validation)
    }
  },
  remove: (data, state, send, done) => {
    const newState = clone(state.all)
    delete newState[data.id]

    send('entries:all', newState, done)
    db.remove(data, newState, done)
  },
  update: (data, state, send, done) => {
    const entry = formatEntry(data)
    const validation = validateEntry(entry)

    if (validation === true) {
      const newState = clone(state.all)
      newState[data.id] = entry

      send('staging:reset', { }, done)
      send('ui:update', { stagingActive: false }, done)
      send('entries:all', newState, done)

      db.update(data, newState, done)
    } else {
      alert(validation)
    }
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
  },
  reset: (data, state, send, done) => {
    send('entries:all', { }, done)
    db.update({ }, { })
  }
}

module.exports = {
  namespace,
  state,
  subscriptions,
  reducers,
  effects
}
