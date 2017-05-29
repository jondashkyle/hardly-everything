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

  return html`
    <style>
      body {
        background: ${state.options.values.colorBg};
      }

      .design-block-padding {
        padding: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .design-block-margin {
        margin: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .tc-black {
        color: ${state.options.values.colorText};
      }

      .tc-white {
        color: ${state.options.values.colorBg};
      }

      .bg-black {
        background: ${state.options.values.colorText};
      }

      .bg-white {
        background: ${state.options.values.colorBg};
      }

      .fill-black {
        fill: ${state.options.values.colorText};
      }

      .fill-white {
        fill: ${state.options.values.colorBg};
      }

      .stroke-black {
        stroke: ${state.options.values.colorText};
      }

      .stroke-white {
        stroke: ${state.options.values.colorBg};
      }

      .design-color-entry,
      .design-color-entry a, {
        color: ${state.options.values.colorText};
      }

      .arrow-bottom:before {
        border-bottom: 4px solid ${state.options.values.colorText};
      }

      .strike:before {
        background: ${state.options.values.colorText};
      }

      .bbu {
        border-bottom-color: ${state.options.values.colorText};
      }

      .design-font {
        font-family: ${state.options.values.font.value}, sans-serif;
        font-weight: ${state.options.values.font.weight || 400};
      }

      .design-font-size {
        font-size: ${fontSize}em;
      }
    </style>
  `
}
