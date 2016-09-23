const h = require('choo/html')
const moment = require('moment')
const Link = require('../components/link')

const templateLink = (state, prev, send) => {
  const now = moment().toDate()
  return state.links.all
    .filter(link => {
      if (link.dateDismissed && link.duration && link.interval) {
        const dismissed = moment(link.dateDismissed).add(link.duration, link.interval).toDate()
        return dismissed < now
      } else {
        return true
      }
    })
    .filter(link => {
      if (link.visited > 0 && !link.repeat) {
        send('links:remove', { id: link.id })
        return false
      } else {
        return true
      }
    })
    .map(link => Link.view(state, prev, send, link))
}

module.exports = (state, prev, send) => {
  const el = h`
    <div
      class="
        x xw lh1
        design-font design-background design-color-link design-block-padding
      ">
      ${templateLink(state, prev, send)}
    </div>
  `
  return el
}
