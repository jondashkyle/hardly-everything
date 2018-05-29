var objectValues = require('object-values')
var html = require('choo/html')
var dayjs = require('dayjs')

var libEntries = require('../lib/entries')
var Entry = require('../components/entry')

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
        class="
          x xw xac xjc tac
          design-font design-font-size design-background design-color-entry design-block-padding
        "
        style="
          line-height: 1.2;
          ${styleMobile}
        "
      >
        <div>${elContent}</div>
      </div>
    </div>
  `

  function entries () {
    return state.entries.active
      .map(entry => Entry(state, entry, emit))
  }
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
    <div class="fs2 lh1-5 sans fwn usn">
      <a href="/panel/entry" class="tc-black">
        There aren’t any entries,<br>
        go ahead and <span class="fwb">add one</span>?
      </a>
    </div>
  `
}
