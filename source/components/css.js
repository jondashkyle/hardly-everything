const html = require('choo/html')

module.exports = (state, prev, send) => {
  return html`
    <style>
      body {
        background: ${state.design.background};
      }

      .design-background-link {
        background: ${state.design.backgroundLink};
      }

      .design-block-margin {
        padding: ${state.design.blockMargin};
      }

      .design-font {
        font-family: ${state.design.font}, sans-serif;
      }
    </style>
  `
}
