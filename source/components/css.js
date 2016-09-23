const html = require('choo/html')

module.exports = (state, prev, send) => {
  return html`
    <style>
      body {
        background: ${state.design.background};
      }

      .design-block-border {
        border: 1px solid ${state.design.blockBorder};
      }

      .design-block-padding {
        padding: ${state.design.blockPadding / 100 * 10}rem;
      }

      .design-color-link,
      .design-color-link a {
        color: ${state.design.colorLink};
      }

      .design-font {
        font-family: ${state.design.font}, sans-serif;
        font-size: ${state.design.scale / 100 * 10}rem;
      }
    </style>
  `
}
