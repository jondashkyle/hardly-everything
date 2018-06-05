var Component = require('nanocomponent')
var objectValues = require('object-values')
var nanobus = require('nanobus')
var html = require('choo/html')
var xtend = require('xtend')

var libBlog = require('../lib/blog')

module.exports = class Suggestions extends Component {
  constructor (name, state, emit) {
    super()
    var self = this

    this.state = state
    this._emit = emit
    this.local = {
      loaded: false,
      suggestions: [ ]
    }

    this.emitter = nanobus()
    this.emit = this.emit.bind(this)
  }

  load (element) {
    this.local.loaded = true
    this.updateEntries()
    this.rerender()
  }

  createElement (props) {
    this.local = xtend(this.local, this.props)

    // loaded
    if (!this.local.loaded) return html`<div></div>`

    return containerSuggestions({
      amount: this.state.entries.amount,
      entries: this.state.entries.all,
      suggestions: this.local.entries
    }, this.emit)
  }

  update (props) {
    return this.state.entries.amount !== this.local.entries.length
  }

  emit (event, data) {
    switch (event) {
      // custom
      case 'refresh': return this.updateEntries()
      case 'render': return this.rerender()
      // proxy
      default: return this._emit(event, data) 
    }
  }

  updateEntries (props) {
    var urls = objectValues(this.state.entries.all).map(entry => entry.url)
    this.local.entries = shuffle(libBlog.getSuggestions(this.state))
      .filter(props => urls.indexOf(props.url) < 0)
      .splice(0, 5)
  }
}

function containerSuggestions (state, emit) {
  var urls = objectValues(state.entries).map(entry => entry.url)

  if (!state.suggestions.length) {
    return html`
      <div class="tac py3 px1 bg-white b2b bro c12" sm="c6">
        No more suggestions!
      </div>
    `
  }

  return html`
    <div class="bg-white b2b bro c12" sm="c6">
      ${state.suggestions.map(createSuggestion)}
      <div class="x">
        <div class="c4 br2b p1 tac curp usn" onclick=${handleRefreshClick}>
          Refresh
        </div>
        <a href="/" class="tc-black c8 p1 tac curp usn fwb ${!state.amount ? 'pen op33' : ''}">
          Complete
        </a>
      </div>
    </div>
  `

  function handleRefreshClick () {
    emit('refresh')
    emit('render')
  }

  function createSuggestion (props) {
    return html`
      <div class="ophc bb2b">
        <div class="x ${urls.indexOf(props.url) >= 0 ? 'pen op33' : ''}">
          <div class="xx px0-5 py1">
            <div class="fs1-5 px0-5 lh1-2 xx">
              <a href="${props.url}" class="external tc-black" target="_blank">${props.title}</a>
            </div>
            <div class="copy px0-5 op33">
              <span>Contributed by <a href="${props.authorUrl}" class="tc-light" target="_blank">${props.author}</a></span>
            </div>
          </div>
          <div class="p1 a curp" onclick=${handleClick}>
            <div class="add-entry"></div>
          </div>
        </div>
      </div>
    `

    function handleClick () {
      emit('ui:panel', { view: 'entry' })
      emit('staging:entry', {
        title: props.title,
        url: props.url,
        tags: [ ],
        duration: '1',
        interval: props.interval,
        timeRange: getTimeRange(props.interval)
      })
    }
  }
}

function getTimeRange (interval) {
  switch (interval) {
    case 'year': return 100
    case 'month': return 81
    case 'week': return 61
    default: return 1
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
