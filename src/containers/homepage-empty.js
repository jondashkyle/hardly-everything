var html = require('choo/html')

module.exports = containerHome

function containerHome (state, emit) {
  return html`
    <div>
      <div class="vhmn100 x xafe pt3 fs3">
        <div
          class="b2-lighter bro fs1 sans ophc lh1-5 x xjc xac psf r0 m1 wrem40"
          style="top: 3.3rem; height: 23.6rem"
        >
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
          <div class="p1 wmxrem60 psr z3" style="width: calc(100% - 41.4rem)">
            <div class="lh1-2 serif">
              Hardly Everything is your feed with a rhythm.
            </div>
            <div class="fs1 sans pt2 wmxrem50 copy lh1-5">
              <p>Tired of the constant notifications from social media? Want to keep up with your friends but don’t want all the noise and fomo? End up having way too many bookmarks and always forget to revisit things? Prioritize your feed by defining how often you want to remember things. Amplify the quiet things, tune out the loud. <a href="/about">Continue reading</a> →</p>
            </div>
          </div>
          <div class="p0-5 x xw w100 fs1 lh1-5 sans bg-white psr z2">
            <div class="home-gradient"></div>
            <div class="c4 p0-5 pb1-5" sm="c12">
              <a
                href="/intro"
                class="db mb1 bro bgsc psr curp"
                style="background-color: red; background-blend-mode: screen; background-image: url(/assets/img/garden.jpg); padding-bottom: 50%"
              ><div class="icon-play"></div></a>
              <div class="fwb">Get Started</div>
              <div class="copy">Wondering what this is all about? Give the video <a href="/intro">a quick watch</a>. Still have some questions? Stop by <a href="/faq">the FAQ</a> for a quick scroll.</div>
            </div>
            <div class="c4 p0-5 pb1-5" sm="c12">
              <div class="mb1 bro bgsc" style="background-image: url(/assets/img/customizable.svg); padding-bottom: 50%"></div>
              <div class="fwb">Customizable</div>
              <div class="copy">Design is dead? Hardly. Choose from a fresh selection of open source typography and finesse to your liking.</div>
            </div>
            <div class="c4 p0-5 pb1-5" sm="c12">
              <div
                class="mb1 bro bgsct bgpc"
                style="background-color: blue; background-blend-mode: screen; background-image: url(/assets/img/big-data-no-thanks.png); padding-bottom: 50%"
              ></div>
              <div class="fwb">Own your data</div>
              <div>Forget accounts and passwords. You own your data thanks to full support for p2p connectivity and offline access with Dat.</div>
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
