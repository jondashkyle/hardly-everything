var Component = require('nanocomponent')
var html = require('choo/html')
var xtend = require('xtend')

var libBlog = require('../lib/blog')

module.exports = class Suggestions extends Component {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.local = {
      suggestions: [ ]
    }
  }

  load () {
    // this.local.get
  }

  createElement (props) {
    this.local = xtend(this.local, this.props)
    return containerSuggestions(this.state, this.emit)
  }

  update (props) {
    return false
  }

  updateEnries (props) {

  }
}

function containerSuggestions (state, emit) {
  return html`
    <div class="p1">
      ${libBlog
        .getSuggestions(state)
        .map(createSuggestion)
      }
    </div>
  `

  function createSuggestion (props) {
    return html`
      <div class="p0-5 tac ophc">
        <div class="fs3 serif p0-5 lh1-2">
          <a href="${props.url}" class="tc-black" target="_blank">${props.title}</a>
        </div>
        <div class="x xjc op33 ophc100">
          <div class="p0-5 copy">
            <span>Contributed by <a href="${props.authorUrl}" class="tc-black" target="_blank">${props.author}</a></span>
          </div>
          <div class="p0-5 copy">
            <span><span class="a curp" onclick=${handleClick}>Add</a></span>
          </div>
        </div>
      </div>
    `

    function handleClick () {
      emit('ui:panel', { view: 'entry' })
      emit('staging:entry', {
        title: props.title,
        url: props.url,
        tags: [ ]
      })
    }
  }
}
