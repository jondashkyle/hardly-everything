var html = require('rooch/html')
var Component = require('rooch/component')

module.exports = class Checkbox extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    
  }

  handleChange () {
    if (
      this.props &&
      this.props.onChange && 
      typeof this.props.onChange === 'function'
    ) {
      this.props.onChange({
        value: !this.props.value
      })
    }
  }

  render () {
    var input = Input({
      onChange: this.handleChange,
      icon: this.props.icon || '✓',
      value: this.props.value
    })

    return Container({
      name: this.props.name || 'Untitled'
    }, input)
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
        class="op0 psa t0 l0 r0 b0 z2 w100 h100 curp"
        checked="${props.value}"
        onchange=${props.onChange}
      >
    `,
    html`
      <label
        class="pen x xjc xac psa t0 r0 fs1-5 tc-black bg-black-lighter"
        style="
          height: 4.5rem;
          width: 4.5rem;
        "
      >
        ${props.value ? props.icon : ''}
      </label>
    `
  ]
}