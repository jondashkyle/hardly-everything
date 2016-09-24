const h = require('choo/html')
const moment = require('moment')
const Link = require('../components/link')

const getDismissedDate = link => {
  return moment(link.dateDismissed).add(link.duration, link.interval).toDate()
}

const templateLink = (state, prev, send) => {
  const now = moment().toDate()
  if (!state.links.all) { return }
  return state.links.all
    .filter(link => {
      if (
        !state.links.options.viewAll &&
        link.dateDismissed &&
        link.duration &&
        link.interval
      ) {
        const dismissed = getDismissedDate(link)
        return dismissed < now
      } else {
        return true
      }
    })
    .sort((a, b) => {
      return getDismissedDate(a) - getDismissedDate(b)
    })
    .map(link => Link.view(state, prev, send, link))
}

module.exports = (state, prev, send) => {
  const el = h`
    <div
      class="
        x xw xac xjc tac lh1
        design-font design-background design-color-link design-block-padding
      "
      style="min-height: 100vh"
    >
      ${templateLink(state, prev, send)}
    </div>
  `
  return el
}
