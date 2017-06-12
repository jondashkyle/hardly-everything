var html = require('rooch/html')
var Component = require('rooch/component')

module.exports = class Text extends Component {
  constructor () {
    super()
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount () {
    if (this.props.autofocus) {
      this.base.querySelector('input').focus()
    }
  }
 
  handleInput (event) {
    if (
      this.props &&
      this.props.onInput && 
      typeof this.props.onInput === 'function'
    ) {
      this.props.onInput({
        value: event.target.value
      })
    }
  }

  render () {
    var input = Input({
      key: this.props.key,
      name: this.props.name,
      style: this.props.style || '',
      value: this.props.value || '',
      onInput: this.handleInput
    })

    return Container({
      name: this.props.name || 'Untitled'
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
      class="fs1 c12 sans bg-white tc-black px1 line ${props.style}"
    />
  `
}