const html = require('choo/html')

const { linearConversion } = require('../helpers/scale')

module.exports = (state, prev, send) => {
  const blockPadding = linearConversion({
    value: state.design.blockPadding,
    out: {
      min: 0.5,
      max: 5
    }
  })

  const fontSize = linearConversion({
    value: state.design.scale,
    out: {
      min: 0.5,
      max: 10
    } 
  })

  return html`
    <style>
      body {
        background: ${state.design.background};
      }

      .design-block-border {
        border: 1px solid ${state.design.blockBorder};
      }

      .design-block-padding {
        padding: ${blockPadding}rem;
      }

      .design-color-entry,
      .design-color-entry a {
        color: ${state.design.colorEntry};
      }

      .design-font {
        font-family: ${state.design.font}, sans-serif;
        font-size: ${fontSize}rem;
      }
    </style>
  `
}
