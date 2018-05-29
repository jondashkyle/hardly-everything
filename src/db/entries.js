var ls = require('./localstorage')

var namespace = 'entries'

var add = (data, state) => {
  ls.save(namespace, state)
}

var update = (data, state) => {
  ls.save(namespace, state)
}

var remove = (data, state) => {
  ls.save(namespace, state)
}

var dismiss = (data, state) => {
  ls.save(namespace, state)
}

var get = (cb) => {
  ls.get(namespace, cb)
}

module.exports = {
  add,
  update,
  remove,
  dismiss,
  get
}
