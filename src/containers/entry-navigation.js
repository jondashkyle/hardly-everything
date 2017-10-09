var html = require('rooch/html')

module.exports = view

function view (state, emit) {
  return html`
    <div class="psf t0 r0 px0-5 lh1 x z4 usn sans fs1">
      <a
        href="http://hello.hardlyeverything.com"
        class="px0-5 curp oph100 line pea op33 tc-black"
      >
        Hello
      </a>
      <div class="px0-5 line">
        ${state.ui.date}
      </div>
      <div class="dn px0-5 line op33 oph100">Search</div>
      <div class="dn px0-5 line op33 oph100">Tags</div>
    </div>
  `
}
