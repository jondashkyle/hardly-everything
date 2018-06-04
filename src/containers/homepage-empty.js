var html = require('choo/html')

var IntroVideo = require('../components/intro-video')

module.exports = containerHome

function containerHome (state, emit) {
  var isActivePreview = !state.ui.panel.view
  return html`
    <div>
      <div class="x xdc fs3 psr home-height pt3">
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
            <div class="op33 ophc100 lh1-5 copy tc-black py1 px2 tac">
              <p>
                <span class="fwb curp" onclick=${handleClickAdd}>Add a link</span>> to get started,<br>
                or want <a href="/suggestions" class="fwb curp">some suggestions</a>?
              </p>
            </div>
          </div>
        </div>
        <div class="xx x xdc tac psr home-width pb2" sm="z3">
          <div class="xx x xac xjc p1">
            <div class="bro bg-black psr" style="width: 20rem; height: 12rem">
              <div class="icon-play"></div>
            </div>
          </div>
          <div class="lh1-2 serif curd p1">
            Your feed with a cadence
          </div>
        </div>
        <div class="x xw w100 fs1 lh1-5 curd sans bg-white psr z2">
          <div class="home-gradient dn" sm="db"></div>
          <div class="x xdc xx op33 oph100">
            <div class="p1">
              <div class="fwb mb1">You’re in control</div>
              <div class="copy"> Give attention to what’s important by choosing how often you want to remember things. For lovers of the open web.</div>
            </div>
          </div>
          <div class="x xdc xx op33 oph100">
            <div class="p1">
              <div class="fwb mb1">Make it yours</div>
              <div class="copy">Not everyone is the same. Create your own design by selecting an open source font and finessing the colors.</div>
            </div>
          </div>
          <div class="c12 dn op33 oph100" sm="xx x xdc">
            <div class="p1">
              <div class="fwb mb1">Own your data</div>
              <div class="copy">No ads. No tracking. Forget accounts and passwords. Your data is yours and no one elses thanks to <a href="https://datproject.org">Dat</a>.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w100 bg-black py3 psr ${state.ui.panel.view ? '' : 'z4'}">
        <div class="c8 co2">
          <img src="/assets/img/screenshot.png" class="w100">
        </div>
        <div class="copy fs2 tac curd tc-white pb3 serif">
          <p>
            Begin by <span class="a curp" onclick=${handleClickAdd}>entering a link</span> or <a href="/suggestions" class="a curp">seeing suggestions</a>
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
