const h = require('choo/html')
const moment = require('moment')
const Entry = require('../components/entry')

const getDismissedDate = entry => {
  return moment(entry.dateDismissed).add(entry.duration, entry.interval).toDate()
}

const templateEntries = (state, prev, send) => {
  const ids = Object.keys(state.entries.all)
  const entries = ids.map(id => state.entries.all[id])
  const now = moment().toDate()

  if (!entries.length) { return '' }

  return entries
    .filter(entry => {
      if (!state.entries.options.viewAll
        && entry.dateDismissed
        && entry.duration
        && entry.interval
      ) {
        const dismissed = getDismissedDate(entry)
        return dismissed < now
      } else {
        return true
      }
    })
    .sort((a, b) => {
      return getDismissedDate(a) - getDismissedDate(b)
    })
    .map(entry => Entry.view(state, prev, send, entry))
}

const emptyEl = () => h`
  <div class="fs2">👌</div>
`

module.exports = (state, prev, send) => {
  const elements = templateEntries(state, prev, send)

  return h`
    <div
      class="
        x xw xac xjc tac lh1
        design-font design-background design-color-entry design-block-padding
      "
      style="min-height: 100vh"
    >
      ${elements.length ? elements : emptyEl()}
    </div>
  `
}