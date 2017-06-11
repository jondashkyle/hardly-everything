var html = require('rooch/html')
var Component = require('rooch/component')

module.exports = class Range extends Component {
  constructor () {
    super()
    this.handleInput = this.handleInput.bind(this)
  }
 
  handleInput (event) {
    if (
      this.props &&
      this.props.onInput && 
      typeof this.props.onInput === 'function'
    ) {
      var value = Math.floor(parseInt(event.target.value) / 10)
      this.props.onInput({
        value: value
      })
    }
  }

  render () {
    var input = Input({
      onInput: this.handleInput,
      value: this.props.value
    })

    var value = this.props.showValue
      ? Value({ value: this.props.value })
      : ''

    return Container({
      name: this.props.name || 'Untitled'
    }, [input, value])
  }
}

function Container (props, children) {
  return html`
    <div class="psr line usn oh">
      <div class="psa t0 l0 px1 pen">
        ${props.name}
      </div>
      ${children}
    </div>
  ` 
}

function Input (props = { }) {
  return [
    html`
      <input
        type="range"
        min="0"
        max="1000"
        class="op0 cur-ewr w100 h100"
        tabindex="-1"
        value="${props.value}"
        oninput=${props.onInput}
      />
    `,
    html`
      <div
        class="psa t0 b0 range-position bg-black-lighter"
        style="
          pointer-events: none;
          transform: translate3d(${props.value}%, 0, 0);
          width: 100%;
        "
      ></div>
    `
  ]
}

function Value (props = { }) {
  return html`
    <div class="psa t0 r0 pen px1 mono">
      ${props.value}
    </div>
  `
}