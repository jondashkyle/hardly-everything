var html = require('rooch/html')
var ov = require('object.values')
var moment = require('moment')
var Entry = require('../components/entry')

function getDismissedDate (entry) {
  return moment(entry.dateDismissed)
    .add(entry.duration, entry.interval)
    .toDate()
}

function templateEntries (state, emit) {
  var now = moment().toDate()

  var entries = ov(state.entries.all)
    .filter(entry => {
      if (
        !state.ui.entriesViewAll &&
        entry.dateDismissed &&
        entry.duration &&
        entry.interval &&
        entry.visited >= 1
      ) {
        var dismissed = getDismissedDate(entry)
        return dismissed < now
      } else {
        return true
      }
    })
    .sort((a, b) => {
      return state.ui.entriesViewAll
        ? getDismissedDate(b) - getDismissedDate(a)
        : getDismissedDate(a) - getDismissedDate(b)
    })
    .map(entry => Entry(state, entry, emit))

  return entries
}

function emptyEl () {
  return html`
    <div class="fs2 sans fwn">
      Nothing more for today
    </div>
  `
}

function elEntriesNone (state, emit) {
  return html`
    <div class="fs2 lh1-5 sans fwn">
      There aren’t any entries,<br>
      go ahead and
      <a href="/panel/entry" class="tc-black fwb">add one</span>?
    </div>
  `
}

module.exports = EntryList

function EntryList (state, emit) {
  var elsEntries = templateEntries(state, emit)
  var isEntriesAll = Object.keys(state.entries.all).length > 0

  var elContent =
      isEntriesAll && elsEntries.length ? elsEntries
    : isEntriesAll && !elsEntries.length ? emptyEl()
    : elEntriesNone(state, emit)

  return html`
    <div class="design-container">
      <div
        class="
          x xw xac xjc tac
          design-font design-font-size design-background design-color-entry design-block-padding
        "
        style="
          line-height: 1.2;
          min-height: 100vh;
        "
      >
        ${elContent}
      </div>
    </div>
  `
}
