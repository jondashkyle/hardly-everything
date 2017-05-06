var db = require('../db/entries')
var x = require('xtend')
var clone = require('clone-deep')
var moment = require('moment')
var uuid = require('node-uuid')
var normalizeUrl = require('normalize-url')
var validUrl = require('valid-url')

var namespace = 'entries'

var intervals = ['minute', 'minutes', 'hour', 'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years']

var formatTags = tag =>
  tag.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/)

var formatEntry = data => {
  var result = clone(data)

  for (let key in result) {
    switch (key) {
      case 'url':
        result.url = result.url ? normalizeUrl(result.url) : ''
        break
    }
  }

  return result
}

var validateEntry = data => {
  if (data.title === '') {
    return 'Please enter a title'
  } else if (data.url === '') {
    return 'Please enter a URL'
  } else if (!validUrl.isUri(data.url)) {
    return 'Please enter a valid url'
  } else if (isNaN(data.duration)) {
    return 'Please enter a valid duration'
  } else if (intervals.indexOf(data.interval) === -1) {
    return 'Please enter a valid interval'
  } else {
    return true
  }
}

var state = {
  loaded: false,
  all: { },
  archive: { }
}

var subscriptions = [
  (send, done) => {
    db.get(data => {
      send('entries:init', data, done)
    }, () => {
      send('entries:loaded', true, done)
    })
  },
  (send, done) => {
    setInterval(() => send('entries:refresh', { }, done), 1000 * 61)
  }
]

var reducers = {
  all: (data, state) => ({ all: data }),
  refresh: (data, state) => (state),
  loaded: (data, state) => ({ loaded: data })
}

var effects = {
  add: (data, state, send, done) => {
    var id = uuid.v4()
    var staging = x({
      id: id,
      dateAdded: moment().toISOString(),
      dateUpdated: moment().toISOString(),
      dateDismissed: moment().subtract(10, 'years').toISOString()
    }, data)

    var entry = formatEntry(staging)
    var validation = validateEntry(entry)

    if (validation === true) {
      var newState = clone(state.all)
      newState[id] = entry

      send('staging:reset', { }, done)
      send('ui:update', { stagingActive: false }, done)
      send('entries:all', newState, done)

      db.add(entry, newState, done)
    } else {
      alert(validation)
    }
  },
  remove: (data, state, send, done) => {
    var newState = clone(state.all)
    delete newState[data.id]

    send('entries:all', newState, done)
    db.remove(data, newState, done)
  },
  update: (data, state, send, done) => {
    var entry = formatEntry(data)
    var validation = validateEntry(entry)

    entry.dateUpdated = moment().toISOString()

    if (validation === true) {
      var newState = clone(state.all)
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
    var newState = clone(state.all)
    var curEntry = newState[data.id]
    var newEntry = x(curEntry, {
      visited: curEntry.visited + 1,
      dateUpdated: moment().toISOString(),
      dateDismissed: moment().toISOString()
    })

    newState[data.id] = newEntry

    send('entries:all', newState, done)
    db.update(newEntry, newState)
  },
  init: (data, state, send, done) => {
    send('entries:all', data, done)
    send('entries:loaded', true, done)
  },
  reset: (data, state, send, done) => {
    var newState = data ? data : { }
    send('entries:all', newState, done)
    db.update(newState, newState)
  }
}

module.exports = {
  namespace,
  state,
  subscriptions,
  reducers,
  effects
}
