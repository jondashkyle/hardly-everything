const html = require('choo/html')
const componentsLink = require('../components/link')

const templateLink = (state, prev, send) => {
  switch (state.design.template) {
    case 'grid':
      return state.links.all.map(link =>
        componentsLink.grid(link, prev, send)
      )
      break
    case 'blocks':
      return state.links.all.map(link =>
        componentsLink.blocks(link, prev, send)
      )
      break
    default:
      return state.links.all.map(link =>
        componentsLink.inline(link, prev, send)
      )
  }
}

/**
 * Link List
 * @param state {obj}
 */
module.exports = (state, prev, send) => {
  return html`
    <view-link-list
      class="
        x xw
        design-font design-background design-color-link
        ${state.design.template !== 'blocks' ? 'design-block-padding' : ''}
        ${state.design.template === 'blocks' ? 'design-block-margin' : ''}
      ">
      ${templateLink(state, prev, send)}
    </view-link-list>
  `
}
