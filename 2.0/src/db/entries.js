var db = require('./index')
var namespace = 'entries'

module.exports = { add, update, remove, dismiss, get }

function add (data, state) {
  db.save(namespace, state)
}

function update (data, state) {
  db.save(namespace, state)
}

function remove (data, state) {
  db.save(namespace, state)
}

function dismiss (data, state) {
  db.save(namespace, state)
}

function get (cb) {
  db.get(namespace, cb)
}

