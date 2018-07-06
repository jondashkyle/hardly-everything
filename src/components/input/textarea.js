var Component = require('choo/component')
var raw = require('choo/html/raw')
var html = require('choo/html')
var xtend = require('xtend')

var libDesign = require('../../lib/design')

module.exports = class Text extends Component {
  constructor (name, state, emit) {
    super()

    this.local = {
      active: false,
      autofocus: false,
      required: false
    }

    this.handleKeydown = this.handleKeydown.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleReset = this.handleReset.bind(this)
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

  handleKeydown (event) {
    var keyCode = event.keyCode || event.which
    var element = event.target

    // only listen for tab
    if (keyCode !== 9) return

    event.preventDefault()
    var start = element.selectionStart
    var end = element.selectionEnd

    // set textarea value to: text before caret + tab + text after caret
    var spaces = "  "
    element.value = element.value.substring(0, start) + spaces + element.value.substring(end)
    this.handleInput({ target: { value: element.value } })

    // put caret at right position again
    element.selectionStart = element.selectionEnd = start + spaces.length
  }

  update (props) {
    return (
      props.value !== this.local.value
    )
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    var input = Input({
      key: this.local.key,
      name: this.local.name,
      style: this.local.style || '',
      value: this.local.value || '',
      onInput: this.handleInput,
      onKeydown: this.handleKeydown
    })

    return html`
      <div class="psr bg-black">
        <div
          class="usn psr c12 curp px1 line bg-white"
          onclick=${this.handleToggle}
        >
          ${this.local.name}
          <div class="psa t0 r0 mx0-5 fs1-5 mono tac" style="width: 3.5rem">
            ${this.local.active ? '↑' : '↓'}
          </div>
        </div>
        ${this.local.active ? this.createReset() : ''}
        ${this.local.active ? input : ''}
      </div>
    `
  }

  createReset () {
    return html`
      <div
        class="psa b0 r0 m1 lh1 curp op50 oph100"
        onclick=${this.handleReset}
      >Reset</div>
    `
  }

  handleReset () {
    this.handleInput({ target: { value: libDesign.getCssDefaults() } })
  }

  handleToggle () {
    this.local.active = !this.local.active
    this.rerender()
  }
}
function Input (props) {
  return html` 
    <textarea
      name="${props.key}"
      placeholder="${props.name}"
      oninput=${props.onInput}
      onkeydown=${props.onKeydown}
      type="text"
      class="bt2-lighter db fs1 c12 mono bg-white tc-black px1 lh1-5 ${props.style}"
      style="resize: none; height: 14rem; white-space: pre-wrap;"
    >${raw(props.value)}</textarea>
  `
}
