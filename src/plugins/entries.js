var db = require('../db/entries')
var x = require('xtend')
var clone = require('clone-deep')
var moment = require('moment')
var uuid = require('uuid')
var ov = require('object-values')
var normalizeUrl = require('normalize-url')
var validUrl = require('valid-url')

var intervals = [
  'minute',
  'minutes',
  'hour',
  'hours',
  'day',
  'days',
  'week',
  'weeks',
  'month',
  'months',
  'year',
  'years'
]

function formatTags (tag){
  return tag.replace(/^\s+|\s+$/g, '').split(/\s*,\s*/)
}

function formatEntry (data) {
  var result = clone(data)

  for (var key in result) {
    switch (key) {
      case 'url':
        result.url = result.url ? normalizeUrl(result.url) : ''
        break
    }
  }

  return result
}

function validateEntry (data) {
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

module.exports = Entries

function Entries (state, emitter) {
  state.entries = {
    loaded: false,
    amount: 0,
    all: { },
    active: [ ]
  }

  // all
  emitter.on('entries:all', function (data) {
    state.entries.all = data
    state.entries.amount = ov(state.entries.all).length
    emitter.emit('entries:refresh')
    emitter.emit('app:render')
  })

  // loaded
  emitter.on('entries:loaded', function (data) {
    state.entries.loaded = data
  })

  // add
  emitter.on('entries:add', function (data) {
    var id = uuid.v4()
    var staging = x({
      id: id,
      content: { },
      dateAdded: moment().toISOString(),
      dateUpdated: moment().toISOString(),
      dateDismissed: moment().subtract(10, 'years').toISOString()
    }, data)

    var entry = formatEntry(staging)
    var validation = validateEntry(entry)

    if (validation === true) {
      var newState = clone(state.entries.all)
      newState[id] = entry

      emitter.emit('staging:reset', { })
      emitter.emit('entries:all', newState)
      emitter.emit('pushState', '/')

      db.add(entry, newState)
    } else {
      alert(validation)
    }
  })

  // update
  emitter.on('entries:update', function (data) {
    var entry = formatEntry(data)
    var validation = validateEntry(entry)

    entry.dateUpdated = moment().toISOString()

    if (validation === true) {
      var newState = clone(state.entries.all)
      newState[data.id] = entry

      emitter.emit('staging:reset', { })
      emitter.emit('ui:update', { stagingActive: false })
      emitter.emit('entries:all', newState)
      emitter.emit('app:render')

      db.update(data, newState)
    } else {
      alert(validation)
    }
  })

  // dismiss
  emitter.on('entries:dismiss', function (data) {
    var newState = clone(state.entries.all)
    var curEntry = newState[data.id]
    var newEntry = x(curEntry, {
      visited: curEntry.visited + 1,
      dateUpdated: moment().toISOString(),
      dateDismissed: moment().toISOString()
    })

    newState[data.id] = newEntry

    emitter.emit('entries:all', newState)
    emitter.emit('app:render')
    db.update(newEntry, newState)
  })

  // remove
  emitter.on('entries:remove', function (data) {
    var newState = clone(state.entries.all)
    delete newState[data.id]

    emitter.emit('entries:all', newState)
    emitter.emit('app:render')

    db.remove(data, newState)
  })

  // reset
  emitter.on('entries:reset', function (data) {
    var newState = data ? data : { }
    emitter.emit('entries:all', newState)
    emitter.emit('app:render')
    db.update(newState, newState) 
  })

  // render
  emitter.on('entries:render', function (data) {
    state.entries.active = getActive()
  })

  // initialize
  db.get(data => {
    emitter.emit('entries:all', data)
    emitter.emit('entries:loaded', true)
    emitter.emit('app:render')
  }, () => {
    emitter.emit('entries:loaded', true)
  })

  function getActive () {
    var now = moment().startOf('day').toDate()

    return ov(state.entries.all)
      .filter(function (entry) {
        if (
          !state.ui.entriesViewAll &&
          entry.dateDismissed &&
          entry.duration &&
          entry.interval &&
          entry.visited >= 1
        ) {
          return getDismissedDate(entry) <= now
        } else {
          return true
        }
      })
      .filter(function (entry) {
        if (state.search.term) {
          var term = state.search.term.toLowerCase()
          var title = entry.title.toLowerCase().indexOf(term) >= 0
          var tags = entry.tags
            ? entry.tags.toString().indexOf(term) >= 0
            : false
          return title || tags
        } else {
          return true
        }
      })
      .sort(function (a, b) {
        return state.ui.entriesViewAll
          ? getDismissedDate(b) - getDismissedDate(a)
          : getDurationDate(b) - getDurationDate(a)
      })
  }
}

function getDismissedDate (entry) {
  return moment(entry.dateDismissed).valueOf()
}

function getDurationDate (entry) {
  return moment(entry.dateDismissed)
    .add(entry.duration, entry.interval)
    .valueOf()
}
