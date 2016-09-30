const l = require('./local')

const namespace = 'design'

const update = (data, state) => {
  l.save(namespace, state)
}

const get = (cb) => {
  l.get(namespace, cb)
}

module.exports = {
  get,
  update
}
