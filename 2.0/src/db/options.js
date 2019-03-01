var db = require('./index')
var namespace = 'options'

module.exports = { get, update }

function update (data, state) {
  db.save(namespace, state)
}

function get (cb) {
  db.get(namespace, cb)
}
