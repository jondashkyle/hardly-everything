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
    var colorBgTransparent = `rgba(${colors.bg.r}, ${colors.bg.g}, ${colors.bg.b}, 0)`
  } else {
    var colorBg = 'rgb(255, 255, 255)'
  }

  if (colors.fg) {
    var colorFg = `rgb(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b})`
    var colorFgLightish = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.5)`
    var colorFgLight = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.33)`
    var colorFgLighter = `rgba(${colors.fg.r}, ${colors.fg.g}, ${colors.fg.b}, 0.165)`
  } else {
    var colorFg = 'rgb(0, 0, 0)'
    var colorFgLightish = 'rgba(0, 0, 0, 0.5)'
    var colorFgLight = 'rgba(0, 0, 0, 0.33)'
    var colorFgLighter = 'rgba(0, 0, 0, 0.165)'
  }

  return html`
    <style>
      body {
        --bg: ${colorBg};
        --fg: ${colorFg};
        --fg-light: ${colorFgLight};
        background: ${colorBg};
      }

      .design-block-padding {
        padding: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .design-block-margin {
        margin: ${blockPadding * 0.8}rem ${blockPadding}rem;
      }

      .home-gradient {
        background: -moz-linear-gradient(top, ${colorBgTransparent} 0%, ${colorBg} 100%);
        background: -webkit-linear-gradient(top, ${colorBgTransparent} 0%,${colorBg} 100%);
        background: linear-gradient(to bottom, ${colorBgTransparent} 0%,${colorBg} 100%);
      }

      .tc-black { color: ${colorFg} }
      .tc-white { color: ${colorBg} }

      ::-moz-selection { background: ${colorFgLighter} }
      ::selection { background: ${colorFgLighter} }

      ::-webkit-input-placeholder { color: ${colorFgLight} }
      :-ms-input-placeholder { color: ${colorFgLight} }
      :-moz-placeholder { color: ${colorFgLight}; opacity: 1; }
      ::-moz-placeholder { color: ${colorFgLight}; opacity: 1; }
      :placeholder-shown { color: ${colorFgLight}; opacity: 1; }

      .bg-black { background-color: ${colorFg} }
      .bg-white { background-color: ${colorBg} }
      .bg-black-light { background-color: ${colorFgLight} }
      .bg-black-lighter { background-color: ${colorFgLighter} }

      .fill-black { fill: ${colorFg} }
      .fill-white { fill: ${colorBg} }

      .fc-black-light { color: ${colorFgLight} }
      .fc-black-lighter { color: ${colorFgLighter} }

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
      .br1b { border-right: .1rem solid ${colorFg} }
      .bl1b { border-left: .1rem solid ${colorFg} }
      .b2b { border: .2rem solid ${colorFg} }
      .bb2b { border-bottom: .2rem solid ${colorFg} }
      .bt2b { border-top: .2rem solid ${colorFg} }
      .b2-light { border: .2rem solid ${colorFgLight} }
      .b2-lighter { border: .2rem solid ${colorFgLighter} }
      .bt2-lighter { border-top: .2rem solid ${colorFgLighter} }
      .bb2-lighter { border-bottom: .2rem solid ${colorFgLighter} }
      .bb1-lighter { border-bottom: .1rem solid ${colorFgLighter} }

      .design-font {
        font-family: ${state.options.values.font.value}, sans-serif;
        font-weight: ${state.options.values.font.weight || 400};
        font-style: ${state.options.values.font.style || 'normal'};
      }

      .design-font-size { font-size: ${fontSize}em }
      .design-font-uppercase { text-transform: ${state.options.values.uppercase ? 'uppercase' : 'inherit'} }
      .design-font-hyphenate { hyphens: ${state.options.values.hyphenate ? 'auto' : ''} }

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
