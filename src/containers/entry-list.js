var html = require('choo/html')
var ov = require('object-values')
var moment = require('moment')
var Entry = require('../components/entry')

function getDismissedDate (entry) {
  return moment(entry.dateDismissed)
    .add(entry.duration, entry.interval)
    .startOf('day')
    .toDate()
}

function templateEntries2 (state, emit) {
  var now = moment().startOf('day').toDate()

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
        return dismissed <= now
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

function emptySearchEl () {
  return html`
    <div class="fs2 sans fwn">
      No matching entries
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
  var elsEntries = entries()
  var isEntriesAll = Object.keys(state.entries.all).length > 0

  var elContent =
      isEntriesAll && elsEntries.length ? elsEntries
    : isEntriesAll && !elsEntries.length && !state.search.term ? emptyEl()
    : isEntriesAll && !elsEntries.length && state.search.term ? emptySearchEl()
    : elEntriesNone(state, emit)

  var styleMobile = state.ui.mobile
    ? 'margin-top: 4.5rem;'
    : 'min-height: 100vh;'

  return html`
    <div class="design-container">
      <div
        class="${[
          'x xw xac xjc tac',
          'design-font design-font-size design-background design-color-entry design-block-padding'
        ].join(' ')}"
        style="
          line-height: 1.2;
          ${styleMobile}
        "
      >
        <div>
          ${elContent}
        </div>
      </div>
    </div>
  `

  function entries () {
    return state.entries.active
      .map(entry => Entry(state, entry, emit)) 
  }
}
