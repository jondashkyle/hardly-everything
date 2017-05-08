const xtend = require('xtend')

const namespace = 'staging'

exports.state = {
  id: '',
  entry: {
    title: '',
    tags: '',
    duration: 7,
    interval: 'days',
    visited: 0,
    timeRange: 50,
    url: ''
  }
}

exports.reducers = {
  reset: (data, state) => exports.state,
  entry: (data, state) => ({
    entry: xtend(state.entry, data)
  })
}

exports.namespace = namespace