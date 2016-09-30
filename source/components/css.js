const html = require('choo/html')

const { linearConversion } = require('../helpers/scale')

module.exports = (state, prev, send) => {
  const blockPadding = linearConversion({
    value: state.options.design.spacing.value,
    out: {
      min: 0.5,
      max: 5
    }
  })

  const fontSize = linearConversion({
    value: state.options.design.scale.value,
    out: {
      min: 0.5,
      max: 10
    } 
  })

  return html`
    <style>
      body {
        background: ${state.options.design.colorBg.value};
      }

      .design-block-padding {
        padding: ${blockPadding}rem;
      }

      .design-color-entry,
      .design-color-entry a {
        color: ${state.options.design.colorText.value};
      }

      .design-font {
        font-family: ${state.options.design.font.value}, sans-serif;
        font-size: ${fontSize}rem;
      }
    </style>
  `
}
