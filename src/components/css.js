var html = require('choo/html')

var { linearConversion } = require('../lib/scale')

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

  if (colors.bg) {
    var colorBg = `rgb(${colors.bg.r}, ${colors.bg.g}, ${colors.bg.b})`
  } else {
    var colorBg = 'rgb(255, 255, 255)'
  }

  if (colors.fg) {
    var colorFg = `rgb(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b})`
    var colorFgLight = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.33)`
    var colorFgLighter = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.165)`
  } else {
    var colorFg = 'rgb(0, 0, 0)'
    var colorFgLight = 'rgba(0, 0, 0, 0.33)'
    var colorFgLighter = 'rgba(0, 0, 0, 0.165)'
  }

  return html`
    <style>
      body {
        --bg: ${colorBg};
        --fg: ${colorFg};
        background: ${colorBg};
      }

      .design-block-padding {
        padding: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .design-block-margin {
        margin: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .tc-black { color: ${colorFg} }
      .tc-white { color: ${colorBg} }

      .copy a {
        color: ${colorFg};
        border-bottom: .1rem solid ${colorFg};
      }

      ::-moz-selection { background: ${colorFgLighter} }
      ::selection { background: ${colorFgLighter} }

      ::-webkit-input-placeholder { color: ${colorFgLight} }
      ::-moz-placeholder { color: ${colorFgLight} }
      :-ms-input-placeholder { color: ${colorFgLight} }
      :-moz-placeholder { color: ${colorFgLight} }

      .bg-black { background: ${colorFg} }
      .bg-white { background: ${colorBg} }
      .bg-black-light { background: ${colorFgLight} }
      .bg-black-lighter { background: ${colorFgLighter} }

      .fill-black { fill: ${colorFg} }
      .fill-white { fill: ${colorBg} }

      .stroke-black { stroke: ${colorFg} }
      .stroke-white { stroke: ${colorBg} }

      .design-color-entry,
      .design-color-entry a, {
        color: ${colorFg};
      }

      .arrow-bottom:before { border-bottom: .4rem solid ${colorFg} }
      .arrow-top:before { border-bottom: .4rem solid ${colorFg} }

      .bbu { border-bottom-color: ${colorFg} }
      .b1b { border: .1rem solid ${colorFg} }
      .b2b { border: .2rem solid ${colorFg} }
      .bb2b { border-bottom: .2rem solid ${colorFg} }
      .bt2-lighter { border-top: .2rem solid ${colorFgLighter} }
      .bb1-lighter { border-bottom: .1rem solid ${colorFgLighter} }

      .design-font {
        font-family: ${state.options.values.font.value}, sans-serif;
        font-weight: ${state.options.values.font.weight || 400};
        font-style: ${state.options.values.font.style || 'normal'};
      }

      .design-font-size { font-size: ${fontSize}em }

      body .tags-input .tag {
        background: ${colorFg};
        color: ${colorBg};
      }

      body .tags-input .tag.selected {
        background: none;
        border: .2rem solid ${colorFg};
        color: ${colorFg};
      }

      body .tags-input input {
        color: ${colorFg};
      }
    </style>
  `
}
