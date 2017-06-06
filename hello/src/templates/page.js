const h = require('choo/html')

const pages = {
  about: require('../containers/about'),
  faq: require('../containers/tips'),
  log: require('../containers/log'),
  error: require('./error')
}

module.exports = (state, emit) => {
  const content =
    state.params.page &&
    typeof pages[state.params.page] === 'function'
      ? pages[state.params.page]
      : pages.error

  return content(state, emit)
}
