var html = require('choo/html')

var IntroVideo = require('../components/intro-video')

module.exports = containerHome

function containerHome (state, emit) {
  var isActivePreview = !state.ui.panel.view
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
                <span class="fwb curp" onclick=${handleClickAdd}>Add a link</span>> to get started,<br>
                or want <a href="/suggestions" class="tc-black fwb curp">some suggestions</a>?
              </p>
            </div>
          </div>
        </div>
        <div class="xx x xdc tac psr home-width p4" sm="z3">
          <a
            href="/intro"
            class="w100 db curp bro bg-black-lighter psr bgsc"
            style="background-image: url(/assets/img/posterframe.jpg);"
          >
            <div class="icon-play"></div>
            <div class="w100" style="padding-bottom: 56.25%"></div>
            <div class="tc-white psa l0 b0 r0 lh1-2 serif curd tac p1" sm="p2">
              Your feed with a cadence
            </div>
          </a>
        </div>
        <div class="x xw w100 fs1 lh1-5 curd sans bg-white psr z2">
          <div class="home-gradient dn" sm="db"></div>
          <div class="x xdc c12 oph100" sm="c6" md="xx">
            <div class="px1 pb2">
              <div class="fwb">You’re in control</div>
              <div class="copy"> Give attention to what’s important by choosing how often you want to remember things. For lovers of links & the open web.</div>
            </div>
          </div>
          <div class="x xdc c12 oph100" sm="c6" md="xx">
            <div class="px1 pb2">
              <div class="fwb">Finesse the design</div>
              <div class="copy">Not everything conforms to a single format. Create your own design by selecting an open source font and tweaking until it feels right to you.</div>
            </div>
          </div>
          <div class="c12 oph100" sm="c6" md="db xx">
            <div class="px1 pb2">
              <div class="fwb">You are not a product</div>
              <div class="copy">No ads. No tracking. Forget accounts and passwords. Own your data and run offline by visiting in <span class="external"><a href="https://beaker-browser.com">Beaker Browser</a></span>.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w100 bg-black py3 psr ${state.ui.panel.view ? '' : 'z4'}">
        <div class="c8 co2">
          <img src="/assets/img/screenshot.png" class="w100">
        </div>
        <div class="copy fs2 tac curd tc-white p1 pb3 serif">
          <p>
            Begin by <span class="a curp" onclick=${handleClickAdd}>entering a link</span> or <a href="/suggestions" class="a curp">adding suggestions</a>
          </p>
        </div>
      </div>
      <div class="line fs1 x xjb w100 bg-white psr z2">
        <div class="x"> 
          <div class="px1"><a href="/about" class="tc-black">About</a></div>
          <div class="px1"><a href="/blog" class="tc-black">Blog</a></div>
          <div class="px1"><a href="/faq" class="tc-black">FAQ</a></div>
          <div class="px1"><a href="/intro" class="tc-black">Intro</a></div>
        </div>
        <div class="px1">2018</div>
      </div>
    </div>
  `

  function handleClickAdd () {
    emit('ui:panel', { view: 'entry' })
  }
}
