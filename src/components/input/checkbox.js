var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Checkbox extends Component {
  constructor (name, state, emit) {
    super()

    this.local = {

    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange () {
    if (
      this.local &&
      this.local.onChange &&
      typeof this.local.onChange === 'function'
    ) {
      this.local.onChange({
        value: !this.local.value
      })
    }
  }

  createElement (props) {
    this.local = xtend(this.local, props)

    var input = Input({
      onChange: this.handleChange,
      icon: this.local.icon || '✓',
      value: this.local.value
    })

    return Container({
      name: this.local.name || 'Untitled'
    }, input)
  }

  update (props) {
    return true
  }
}

function Container (props, children) {
  return html`
    <div class="psr line usn">
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
        type="checkbox"
        class="op0 psa t0 l0 r0 b0 z1 w100 h100 curp"
        checked="${props.value}"
        onchange=${props.onChange}
      >
    `,
    html`
      <label
        class="pen x xjc xac psa t0 r0 fs1-5 tc-black bg-black-lighter"
        style="
          margin: 0.5rem;
          height: 3.5rem;
          width: 3.5rem;
          border-radius: 50%;
        "
      >
        ${props.value ? props.icon : ''}
      </label>
    `
  ]
}
