const h = require('choo/html')
const ov = require('object.values')
const moment = require('moment')
const Entry = require('../components/entry')

const getDismissedDate = entry => {
  return moment(entry.dateDismissed)
    .add(entry.duration, entry.interval)
    .toDate()
}

const templateEntries = (state, prev, send) => {
  const now = moment().toDate()

  const entries = ov(state.entries.all)
    .filter(entry => {
      if (
        !state.ui.entriesViewAll &&
        entry.dateDismissed &&
        entry.duration &&
        entry.interval &&
        entry.visited >= 1
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

  return entries
}

const emptyEl = () => h`<div class="fs2">
  👌
</div>`

const elEntriesNone = (state, prev, send) => h`<div class="fs2 lh1-5 sans fwn">
  There aren’t any links,<br>
  go ahead and
  <span class="curp fwb" onclick=${e => send('ui:update', {
    stagingActive: !state.ui.stagingActive
  })}>add one</span>?
</div>`

module.exports = (state, prev, send) => {
  const elsEntries = templateEntries(state, prev, send)
  const isEntriesAll = Object.keys(state.entries.all).length > 0

  const elContent =
      isEntriesAll && elsEntries.length ? elsEntries
    : isEntriesAll && !elsEntries.length ? emptyEl()
    : elEntriesNone(state, prev, send)

  console.log(elContent)

  return h`
    <div
      class="
        x xw xac xjc tac
        design-font design-background design-color-entry design-block-padding
      "
      style="min-height: 100vh; line-height: 1.2"
    >${elContent}</div>
  `
}
