var html = require('choo/html')
var { linearConversion } = require('../lib/scale')

module.exports = css

function css (state, emit) {
  var blockPadding = linearConversion({
    value: state.options.values.spacing,
    out: { min: 0.5, max: 5 }
  })

  var fontSize = linearConversion({
    value: state.options.values.scale,
    out: { min: 0.5, max: 10 }
  })

  var colors = {
    bg: state.options.values.colorBg || { r: 255, g: 255, b: 255 },
    fg: state.options.values.colorText || { r: 0, g: 0, b: 0 }
  }

  var background = `${colors.bg.r}, ${colors.bg.g}, ${colors.bg.b}`
  var foreground = `${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}`

  return html`
    <style>
      :root {
        /* base */
        --bg: ${background};
        --fg: ${foreground};
        --spacing: ${blockPadding}rem;

        /* typography */
        --font-family: ${state.options.values.font.value}, sans-serif;
        --font-weight: ${state.options.values.font.weight};
        --font-style: ${state.options.values.font.style || 'normal'};
        --font-size: ${fontSize}em;
        --font-uppercase: ${state.options.values.uppercase ? 'uppercase' : 'inherit'};
        --font-hyphenate: ${state.options.values.hyphenate ? 'auto' : ''};
      }

      /* custom css */
      ${state.options.values.css}
    </style>
  `
}
