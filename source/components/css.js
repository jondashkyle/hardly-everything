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

      .design-color-entry,
      .design-color-entry a {
        color: ${state.design.colorEntry};
      }

      .design-font {
        font-family: ${state.design.font}, sans-serif;
        font-size: ${state.design.scale / 100 * 10}rem;
      }
    </style>
  `
}
