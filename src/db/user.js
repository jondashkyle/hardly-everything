var db = require('./index')
var namespace = 'user'

module.exports = { get, update }

function update (data, state) {
  db.save(namespace, state)
}

function get (cb) {
  db.get(namespace, cb)
}
