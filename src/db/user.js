var ls = require('./localstorage')

var namespace = 'user'

var update = (data, state) => {
  ls.save(namespace, state)
}

var get = (cb) => {
  ls.get(namespace, cb)
}

module.exports = {
  get,
  update
}
