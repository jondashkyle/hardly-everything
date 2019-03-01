var Component = require('choo/component')
var tagsInput = require('tags-input')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Tags extends Component {
  constructor (name, state, emit) {
    super()

    this.local = {
      value: [ ],
      valueStart: [ ]
    }

    this.handleChange = this.handleChange.bind(this)
  }

  load (element) {
    tagsInput(this.element.querySelector('input'))
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    if (!this.local.valueStart) this.local.valueStart = this.local.value

    return Container(
      { name: this.local.name || 'Untitled' },
      html`<input
        placeholder="${this.local.name}"
        value="${this.local.value}"
        onchange=${this.handleChange}
      >`
    )
  }

  handleChange (event) {
    if (
      this.local &&
      this.local.onChange &&
      typeof this.local.onChange === 'function'
    ) {
      var value = event.target.value.split(',')
      if (!arraysEqual(this.local.value, value)) {
        this.local.value = value
        this.local.onChange({ value: value })
      }
    }
  }

  update (props) {
    var value = props.value || [ ]

    if (!arraysEqual(value, this.local.value)) {
      var el = this.element.querySelector('.tags-input')
      var elInput = this.element.querySelector('input')
      if (el) this.element.removeChild(el)
      this.local.value = value
      elInput.value = value
      tagsInput(elInput)
    }

    return false
  }
}

function Container (props, children) {
  return html`
    <div class="psr line usn bg-white curt oh">
      ${children}
    </div>
  `
}

function arraysEqual (a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length != b.length) return false

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }

  return true
}
