var html = require('choo/html')

var containerContent = require('../containers/content')
var IntroVideo = require('../components/intro-video')

module.exports = view

function view (state, emit) {
  return containerContent(state, emit, content(state, emit))
}

function content (state, emit) {
  return html`
    <div class="bg-black tc-white fs2 w100 xx x xjc xac psr">
      ${state.cache(IntroVideo, 'intro-video').render()}
    </div>
  `
}
