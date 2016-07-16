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

      .design-color-link,
      .design-color-link a {
        color: ${state.design.colorLink};
      }

      .design-font {
        font-family: ${state.design.font}, sans-serif;
      }
    </style>
  `
}
