const h = require('choo/html')

const navigation = require('../containers/navigation')

const pages = {
  about: require('../containers/q-and-a'),
  tips: require('../containers/tips'),
  log: require('../containers/log')
}

module.exports = (state, prev, send) => {
  const content =
    state.params.page &&
    typeof pages[state.params.page] === 'function'
      ? pages[state.params.page]
      : pages['about']

  return h`
    <div class="sans fs1">
      ${navigation(state, prev, send)}
      ${content(state, prev, send)}
    </div>
  `
}
