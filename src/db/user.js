const ls = require('./localstorage')

const namespace = 'user'

const update = (data, state) => {
  ls.save(namespace, state)
}

const get = (cb) => {
  ls.get(namespace, cb)
}

module.exports = {
  get,
  update
}
