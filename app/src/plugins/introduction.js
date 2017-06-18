var xtend = require('xtend')

module.exports = intro

function intro (state, emitter) {
  state.intro = {
    status: 'start'
  }

  emitter.on('intro:update', function (data) {
    state.intro = xtend(state.intro, data)

    if (
      !state.intro.status &&
      !state.user.analytics.authenticated
    ) {
      window.addEventListener('click', handleClick, false)
    }

    emitter.emit('app:render')
  })

  function handleClick () {
    emitter.emit('user:analytics', { authenticated: true })
    window.removeEventListener('click', handleClick, false)
  }

  function handleScroll (event) {
    state.intro.status = 'waiting'
    emitter.emit('app:render')

    window.removeEventListener('scroll', handleScroll, false)
  }

  if (!state.intro.waited) {
    window.addEventListener('scroll', handleScroll, false)
  }
}
