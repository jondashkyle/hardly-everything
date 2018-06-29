var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

var entryBlog = require('../components/entry-blog')

module.exports = class Blog extends Component {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.local = {
      entries: [ ]
    }
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    return html`
      <div class="fs1 lh1-5 xx x xdc xjc xac">
        ${this.createEntries(this.local.entries)}
      </div>
    `
  }

  createEntries (entries) {
    var state = this.state
    var emit = this.emit
    return entries.map(function (props) {
      return html`
        <div class="w100 bb1-lighter py1" id="list-${props.name}">
          ${entryBlog(state, emit, props)}
          ${createFooter(props)}
        </div>
      `
    })
  }

  update (props) {
    return props.entries.length !== this.local.entries.length
  }
}

function createFooter (props) {
  return html`
    <div class="mono fc-black-light tar pt3 pr1">
      Published <span class="mono">${props.date}</span>, <a href="${props.url}" class="a">Permalink</a>
    </div>
  `
}