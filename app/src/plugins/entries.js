var db = require('../db/entries')
var x = require('xtend')
var clone = require('clone-deep')
var moment = require('moment')
var uuid = require('node-uuid')
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

  for (let key in result) {
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

/**
 * Entries
 */
function Entries (state, emitter) {
  state.entries = {
    loaded: false,
    all: { },
    archive: { }
  }

  // all
  emitter.on('entries:all', function (data) {
    state.entries.all = data
    emitter.emit('render')
  })

  // loaded
  emitter.on('entries:loaded', function (data) {
    state.entries.loaded = data
  })

  // add
  emitter.on('entries:add', function (data) {
    add(state, data, () => emitter.emit) 
  })

  // update
  emitter.on('entries:update', function (data) {
    update(state, data, () => emitter.emit)
  })

  // dismiss
  emitter.on('entries:dismiss', function (data) {
    dismiss(state, data, () => emitter.emit)
  })

  // remove
  emitter.on('entries:remove', function (data) {
    remove(state, data, () => emitter.emit)
  })

  // reset
  emitter.on('entries:reset', function (data) {
    reset(state, data, () => emitter.emit)
  })

  // refresh
  emitter.on('entries:refresh', function (data) {
    emitter.emit('render')
  })

  // initialize
  db.get(data => {
    emitter.emit('entries:all', data)
    emitter.emit('entries:loaded', true)
    emitter.emit('render')
  }, () => {
    emitter.emit('entries:loaded', true)
  })

  // refresh
  setInterval(function () {
    emitter.emit('entries:refresh')
  }, 1000 * 61)
}

/**
 * Add
 */
function add (state, data, emit) {
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
    var newState = clone(state.entries.all)
    newState[id] = entry

    emit('staging:reset', { })
    emit('ui:update', { stagingActive: false })
    emit('entries:all', newState)
    emit('render')

    db.add(entry, newState)
  } else {
    alert(validation)
  }
}

/**
 * Remove
 */
function remove (state, data, emit) {
  var newState = clone(state.entries.all)
  delete newState[data.id]

  emit('entries:all', newState)
  emit('render')

  db.remove(data, newState) 
}

/**
 * Update
 */
function update (state, data, emit) {
  var entry = formatEntry(data)
  var validation = validateEntry(entry)

  entry.dateUpdated = moment().toISOString()

  if (validation === true) {
    var newState = clone(state.entries.all)
    newState[data.id] = entry

    emit('staging:reset', { })
    emit('ui:update', { stagingActive: false })
    emit('entries:all', newState)
    emit('render')

    db.update(data, newState)
  } else {
    alert(validation)
  } 
}

/**
 * Dismiss
 */
function dismiss (state, data, emit) {
  var newState = clone(state.entries.all)
  var curEntry = newState[data.id]
  var newEntry = x(curEntry, {
    visited: curEntry.visited + 1,
    dateUpdated: moment().toISOString(),
    dateDismissed: moment().toISOString()
  })

  newState[data.id] = newEntry

  emit('entries:all', newState)
  emit('render')
  db.update(newEntry, newState) 
}

/**
 * Reset
 */
function reset (state, data, emit) {
  var newState = data ? data : { }
  emit('entries:all', newState)
  emit('render')
  db.update(newState, newState) 
}