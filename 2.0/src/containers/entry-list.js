var objectValues = require('object-values')
var html = require('choo/html')
var dayjs = require('dayjs')

var libEntries = require('../lib/entries')
var Entry = require('../components/entry')

module.exports = EntryList

function EntryList (state, emit) {
  var entriesAll = Object.keys(state.entries.all) 
  var elsEntries = entries()
  var isEntriesAll = entriesAll.length > 0

  var elContent = (isEntriesAll && elsEntries.length)
    ? elsEntries
    : (isEntriesAll && !elsEntries.length && !state.search.term)
    ? emptyEl()
    : (isEntriesAll && !elsEntries.length && state.search.term)
    ? emptySearchEl()
    : elEntriesNone(state, emit)

  var styleMobile = state.ui.mobile
    ? 'margin-top: 4.5rem;'
    : 'min-height: 100vh;'

  return html`
    <div class="design-container c12 oh">
      <div class="x xw xac xjc tac design-block-padding" style="${styleMobile}">
        <div class="c12">${elContent}</div>
        ${isPaginatable() ? createPaginate() : ''}
      </div>
    </div>
  `

  function isPaginatable () {
    return state.entries.active.length > elsEntries.length
  }

  function createCounter () {
    return html`
      <div class="fs1 psf b0 r0 line px1">
        ${elsEntries.length}/${entriesAll.length}
      </div>
    `
  }

  function createPaginate () {
    return html`
      <div
        class="tac design-block-padding design-block-margin curp op33 oph100"
        style="font-size: 5rem"
        onclick=${handlePaginate}
      >•••</div>
    `
  }

  function entries () {
    var end = state.ui.pagination.page * state.ui.pagination.limit
    return state.entries.active
      .slice(0, end)
      .map(entry => Entry(state, entry, emit))
  }

  function handlePaginate (event) {
    emit(state.events.UI_PAGINATE, {
      page: state.ui.pagination.page + 1
    })
  }
}

function emptyEl () {
  return html`
    <div class="">
      Nothing more for today
    </div>
  `
}

function emptySearchEl () {
  return html`
    <div class="">
      No matching entries
    </div>
  `
}

function elEntriesNone (state, emit) {
  return html`
    <div class="">No entries to see here!</div>
  `
}
