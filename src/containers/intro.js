var raw = require('choo/html/raw')
var html = require('choo/html')

var IntroVideo = require('../components/intro-video')
var entryBlog = require('../components/entry-blog')

var randomSuggestion

module.exports = containerHome

function containerHome (state, emit) {
  var isActivePreview = !state.ui.panel.view

  // load content
  if (!state.site.loaded) {
    emit(state.events.CONTENT_LOAD)
  }

  // select a random suggestion
  if (!randomSuggestion) {
    randomSuggestion = getRandomSuggestion(state)
  }

  return html`
    <div>
      <div class="x xdc fs3 psr home-height" style="padding-top: 3.25rem">
        <div
          class="dn b2-light bro fs1 sans ophc lh1-5 xjc xac psf r0 m1 wrem40"
          sm="${state.ui.panel.loaded ? 'x' : ''}"
          style="top: 3.25rem; height: 23.7rem"
        >
          <div
            class="psa op33 ${isActivePreview ? 'db' : 'dn'}"
            style="left: 28.3rem; top: -.2rem;"
          >
            <div class="arrow-bottom"></div>
          </div>
          <div>
            <div class="lh1-5 tc-black py1 px2 tac op33 ophc100">
              <p>
                <span class="fwb curp" onclick=${handleClickAdd}>Follow a link</span>> to get started,<br>
                or want <a href="/suggestions" class="tc-black fwb curp">some suggestions</a>?
              </p>
            </div>
          </div>
        </div>
        <div class="xx x xdc tac psr home-width pt2 p1" sm="p1 z3" md="p4">
          ${createIntro()}
        </div>
        <div class="dn xw w100 fs1 lh1-5 curd sans bg-white psr z2">
          <div class="home-gradient dn" sm="db"></div>
          <div class="x xdc c12 oph100" sm="c6" md="xx">
            <div class="px1 pb2">
              <div class="fwb mb1">You’re in control</div>
              <div class="copy"> Give attention to what’s important by choosing how often you want to remember things. For lovers of links & the open web.</div>
            </div>
          </div>
          <div class="x xdc c12 oph100" sm="c6" md="xx">
            <div class="px1 pb2">
              <div class="fwb mb1">Finesse the design</div>
              <div class="copy">Not everything conforms to a single format. Create your own design by selecting an open source font and tweaking until it feels right to you.</div>
            </div>
          </div>
          <div class="c12 oph100" sm="c6" md="db xx">
            <div class="px1 pb2">
              <div class="fwb mb1">You are not a product</div>
              <div class="copy">No ads. No tracking. Forget accounts and passwords. Own your data and run offline by visiting in <span class="external"><a href="https://beaker-browser.com" target="_blank">Beaker Browser</a></span>.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w100 bg-white bb1-lighter mt3 pb3 psr">
        <div class="home-gradient dn" sm="db"></div>
        <div class="c8 co2 x xjc">
          <div class="w100" style="max-width: 65rem">
            <div class="psr bro oh bg-black-lighter" style="padding-bottom: 97.9319546%;">
              <img src="/assets/img/screenshot.png" class="w100 psa t0 l0 h100">
            </div>
          </div>
        </div>
        <div class="copy fs2 tac curd px1 pt3 serif">
          <p>
            Begin by <span class="a curp" onclick=${handleClickAdd}>entering a link</span> or <a href="/suggestions" class="a curp">adding suggestions</a>
          </p>
        </div>
      </div>
      ${randomSuggestion ? createSuggestion(randomSuggestion) : ''}
      <div class="p1 tar bb1-lighter fs1 bg-white">
        <a href="/blog" class="tc-black op25 oph100">Continue scrolling through the blog →</a>
      </div>
      <div class="line fs1 x xjb w100 bg-white psr z2">
        <div class="x"> 
          <div class="px1"><a href="/about" class="tc-black">About</a></div>
          <div class="px1"><a href="/blog" class="tc-black">Blog</a></div>
          <div class="px1"><a href="/faq" class="tc-black">FAQ</a></div>
          <div class="px1 ${!state.href ? 'dn' : ''}"><a href="/intro" class="tc-black">Intro</a></div>
        </div>
        <div class="px1">2018</div>
      </div>
    </div>
  `

  function createSuggestion (props) {
    return html`
      <div class="py1 fs1 bg-white">
        ${entryBlog(props)}
      </div>
    `
  }

  function createIntro() {
    return html`
      <div class="w100 db fs2 lh1-5 serif fs2 tal">
        <div class="copy wmxrem70">
          Hardly Everything is your feed with a cadence. Turn off the FOMO and follow everything at your own pace, whatever the speed. <a href="/about" class="pb0">${raw('Continue&nbsp;reading')}</a>.
        </div>
      </div>
    `
  }

  function createIntroVideo () {
    return html`
      <div class="w100 db curp bro bg-black-lighter psr bgsc oh">
        <div class="w100" style="padding-bottom: 56.25%"></div>
        ${state.cache(IntroVideo, 'homepage:intro').render()}
        <div class="${state.ui.introActive ? 'dn' : 'db'} pen icon-play"></div>
        <div class="${state.ui.introStarted ? 'dn' : 'db'} pen tc-white psa l0 b0 r0 lh1-2 serif curd tac p1 fs2" sm="fs3 p2" md="fs3">
          Your feed with a cadence
        </div>
      </div>
    `
  }

  function handleClickAdd () {
    emit('ui:panel', { view: 'entry' })
  }
}

function getRandomSuggestion (state) {
  var suggestions = state.page('/blog')
    .pages()
    .visible()
    .sortBy('date', 'desc')
    .toArray()
    .filter(function (page) {
      return page.category === 'list'
    })

  if (suggestions.length > 0) {
    return suggestions[Math.floor(Math.random() * suggestions.length)]
  } else {
    return false
  }
}