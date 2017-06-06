const h = require('choo/html')

const pages = {
  about: require('../containers/about'),
  tips: require('../containers/tips'),
  log: require('../containers/log')
}

module.exports = (state, emit) => {
  const content =
    state.params.page &&
    typeof pages[state.params.page] === 'function'
      ? pages[state.params.page]
      : pages['log']

  return content(state, emit)
}
