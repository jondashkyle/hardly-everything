var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Range extends Component {
  constructor (name, state, emit) {
    super()
    this.local = { }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput (event) {
    if (
      this.local &&
      this.local.onInput &&
      typeof this.local.onInput === 'function'
    ) {
      var value = Math.floor(parseInt(event.target.value) / 10)
      this.local.onInput({
        value: value
      })
    }
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    var input = Input({
      onInput: this.handleInput,
      value: this.local.value
    })

    var value = this.local.showValue
      ? [Value({ value: this.local.value, max: props.max, unit: props.unit, scale: props.scaleValue })]
      : ''

    return Container({
      name: this.local.name || 'Untitled'
    }, [input, value])
  }

  update (props) {
    return props.value !== this.local.value
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
  var value = props.scale ? Math.floor(props.value / 100 * props.max) : props.value
  if (props.unit) value += ' ' + props.unit
  return html`
    <div class="psa t0 r0 pen px1 mono">
      ${value}
    </div>
  `
}
