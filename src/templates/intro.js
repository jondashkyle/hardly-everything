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
      <div class="psa t0 l0 r0 b0 x xjc xac fs3 z2">Coming soon</div>
      ${state.cache(IntroVideo, 'intro-video').render()}
    </div>
  `
}
