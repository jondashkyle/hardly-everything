var html = require('choo/html')
var css = require('../components/css')

module.exports = wrapper

function wrapper(view) {
  return function (state, emit) {
    return state.app.loaded
      ? container(view(state, emit))
      : container(loading())

    function container(content) {
      return html`
        <body class="sans">
          ${!state.user.cyclesDismissed
            ? html`
                <div
                  class="psf t0 l0 r0 x xjc z4 p1"
                  style="text-align: center; background: var(--foreground); color: var(--background); transform: translateY(-4.75rem); height: 4.75rem;"
                >
                  <a
                    href="https://cyclemarks.com"
                    target="_blank"
                    class="psa x xjc xac"
                    style="inset: 0; color: var(--background);"
                  >
                    New and Improved Version at CycleMarks
                  </a>
                  <button
                    class="psa t0 r0 p1 b0 x xjc xac curp"
                    style="color: var(--background); background: none; font: inherit;"
                    onclick=${() => emit(state.events.USER_CYCLES_DISMISS)}
                  >
                    ×
                  </button>
                </div>
                <style>
                  body {
                    transform: translateY(4.75rem);
                  }
                </style>
              `
            : ''}
          ${css(state, emit)} ${content} ${preloadFonts()}
        </body>
      `
    }
  }
}

function loading() {
  return html`<div class="loader" data-load></div>`
}

function preloadFonts() {
  return html`
    <div class="psf t0 op0 pen">
      <div class="mono">mono</div>
      <div class="serif">serif</div>
    </div>
  `
}
