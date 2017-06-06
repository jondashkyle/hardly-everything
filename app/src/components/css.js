var html = require('rooch/html')

var { linearConversion } = require('../helpers/scale')

module.exports = Css

function Css (state, emit) {
  var blockPadding = linearConversion({
    value: state.options.values.spacing,
    out: {
      min: 0.5,
      max: 5
    }
  })

  var fontSize = linearConversion({
    value: state.options.values.scale,
    out: {
      min: 0.5,
      max: 10
    }
  })

  var colors = {
    bg: state.options.values.colorBg,
    fg: state.options.values.colorText
  }

  var colorBg = `rgb(${colors.bg.r}, ${colors.bg.g}, ${colors.bg.b})`
  var colorFg = `rgb(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b})`
  var colorFgLight = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.33)`
  var colorFgLighter = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.165)`

  return html`
    <style>
      body {
        background: ${colorBg};
      }

      .design-block-padding {
        padding: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .design-block-margin {
        margin: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .tc-black {
        color: ${colorFg};
      }

      .tc-white {
        color: ${colorBg};
      }

      ::-webkit-input-placeholder { color: ${colorFgLight} }
      ::-moz-placeholder { color: ${colorFgLight} }
      :-ms-input-placeholder { color: ${colorFgLight} }
      :-moz-placeholder { color: ${colorFgLight} }

      .bg-black {
        background: ${colorFg};
      }

      .bg-white {
        background: ${colorBg};
      }

      .bg-black-light {
        background: ${colorFgLight};
      }

      .bg-black-lighter {
        background: ${colorFgLighter};
      }

      .fill-black {
        fill: ${colorFg};
      }

      .fill-white {
        fill: ${colorBg};
      }

      .stroke-black {
        stroke: ${colorFg};
      }

      .stroke-white {
        stroke: ${colorBg};
      }

      .design-color-entry,
      .design-color-entry a, {
        color: ${colorFg};
      }

      .arrow-bottom:before {
        border-bottom: 4px solid ${colorFg};
      }

      .bbu {
        border-bottom-color: ${colorFg};
      }

      .b1b {
        border: 1px solid ${colorFg};
      }

      .b2b { border: 2px solid ${colorFg} }

      .bb2b {
        border-bottom: 2px solid ${colorFg};
      }

      .bt2-lighter {
        border-top: 2px solid ${colorFgLighter};
      }

      .bb1-lighter {
        border-bottom: 1px solid ${colorFgLighter};
      }

      .design-font {
        font-family: ${state.options.values.font.value}, sans-serif;
        font-weight: ${state.options.values.font.weight || 400};
        font-style: ${state.options.values.font.style || 'normal'};
      }

      .design-font-size {
        font-size: ${fontSize}em;
      }
    </style>
  `
}
