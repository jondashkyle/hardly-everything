const html = require('choo/html')
const componentsLink = require('../components/link')

const templateLink = (state, prev, send) => {
  return state.links.all.map(link =>
    componentsLink[state.design.template](state, prev, send, link)
  )
}

/**
 * Link List
 * @param state {obj}
 */
module.exports = (state, prev, send) => {
  const el = html`
    <view-link-list
      class="
        x xw lh1
        design-font design-background design-color-link
      ">
      ${templateLink(state, prev, send)}
    </view-link-list>
  `
  return el
}
