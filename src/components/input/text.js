var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Text extends Component {
  constructor (name, state, emit) {
    super()

    this.local = {
      autofocus: true
    }

    this.handleInput = this.handleInput.bind(this)
  }

  load () {
    if (this.local.autofocus) {
      this.element.querySelector('input').focus()
    }
  }
 
  handleInput (event) {
    if (
      this.local &&
      this.local.onInput && 
      typeof this.local.onInput === 'function'
    ) {
      this.local.onInput({
        value: event.target.value
      })
    }
  }

  update (props) {
    return true
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    var input = Input({
      key: this.local.key,
      name: this.local.name,
      style: this.local.style || '',
      value: this.local.value || '',
      onInput: this.handleInput
    })

    return Container({
      name: this.local.name || 'Untitled'
    }, input)
  }
}

function Container (props = { }, children) {
  return html`
    <div class="psr bg-black line">
      ${children}
    </div>
  ` 
}

function Input (props = { }) {
  return html` 
    <input
      name="${props.key}"
      placeholder="${props.name}"
      value="${props.value}"
      oninput=${props.onInput}
      type="text"
      class="db fs1 c12 sans bg-white tc-black px1 line ${props.style}"
    />
  `
}
