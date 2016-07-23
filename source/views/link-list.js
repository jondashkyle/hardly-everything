const html = require('choo/html')
const componentsLink = require('../components/link')

const templateLink = (state, prev, send) => {
  console.log(state.design.template, componentsLink)
  return state.links.all.map(link =>
    componentsLink[state.design.template](state, prev, send, link)
  )
}

/**
 * Link List
 * @param state {obj}
 */
module.exports = (state, prev, send) => {
  return html`
    <view-link-list
      class="
        x xw lh1
        design-font design-background design-color-link
        ${state.design.template !== 'blocks' ? 'design-block-padding' : ''}
        ${state.design.template === 'blocks' ? 'design-block-border' : ''}
      ">
      ${templateLink(state, prev, send)}
    </view-link-list>
  `
}
