var html = require('choo/html')

module.exports = containerHome

function containerHome (state, emit) {
  var isActivePreview = !state.ui.panel.view
  return html`
    <div>
      <div class="vhmn100 x xafe pt3 fs3">
        <div
          class="dn b2-light bro fs1 sans ophc lh1-5 xjc xac psf r0 m1 wrem40"
          sm="x"
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
                or want <span class="fwb curp">some suggestions</span>?
              </p>
            </div>
          </div>
        </div>
        <div class="w100">
          <div class="p1 wmxrem60 psr home-width" sm="z3">
            <div class="lh1-2 serif">
              Hardly Everything is your feed with a rhythm.
            </div>
            <div class="fs1 sans pt2 pb1 wmxrem50 copy lh1-5">
              <p>Give attention to what’s important by setting how often you want to remember things • Amplify the quiet stuff, tune out the loud • Incorperate time into your browsing habits • <a href="/about">Continue reading</a> →</p>
            </div>
          </div>
          <div class="x xw w100 fs1 lh1-5 sans bg-white psr z2">
            <div class="home-gradient dn" sm="db"></div>
            <div class="xx pb1">
              <a
                href="/intro"
                class="db bgsc psr curp"
                style="background-color: red; background-blend-mode: screen; background-image: url(/assets/img/garden.jpg); padding-bottom: 50%"
              ><div class="icon-play"></div></a>
              <div class="p1">
                <div class="fwb">Getting started</div>
                <div class="copy">Wondering what this is all about? Give the video <a href="/intro">a quick watch</a>. Still have some questions? Stop by <a href="/faq">the FAQ</a> for a quick scroll.</div>
              </div>
            </div>
            <div class="xx pb1">
              <div class="bgsc" style="background-color: #00ff00; background-image: url(/assets/img/customizable.svg); padding-bottom: 50%"></div>
              <div class="p1">
                <div class="fwb">Customizable</div>
                <div class="copy">“Web design is dead?” Hardly. Choose from a fresh selection of open source typography and finesse to your liking.</div>
              </div>
            </div>
            <div class="c12 pb1 dn" sm="xx db">
              <div
                class="bgsct bgpc"
                style="background-color: blue; background-blend-mode: screen; background-image: url(/assets/img/big-data-no-thanks.png); padding-bottom: 50%"
              ></div>
              <div class="p1">
                <div class="fwb">Own your data</div>
                <div>Forget accounts and passwords. You own your data thanks to full support for p2p connectivity and offline access with Dat.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w100 bg-black py3 psr ${state.ui.panel.view ? '' : 'z4'}">
        <div class="c8 co2">
          <img src="/assets/img/screenshot.png" class="w100">
        </div>
        <div class="copy fs2 tac tc-white pb3 serif">
          <p>
            Take a minute to get started by either<br>
            <span class="a curp" onclick=${handleClickAdd}>entering a link</span> or <span class="a curp">getting suggestions</span>
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
