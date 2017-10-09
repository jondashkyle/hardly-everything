var html = require('rooch/html')
var h = require('rooch/h')
var TokenInput = require('preact-token-input')
var Component = require('rooch/component')

module.exports = class Tags extends Component {
  constructor () {
    super()

    this.state = {
      value: [ ]
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (data) {
    this.setState({ value: data.value })
    if (this.props && this.props.onChange) {
      this.props.onChange({
        value: data.value
      })
    }
  }

  render () {
    var input =  h(TokenInput, {
      class: '',
      placeholder: this.props.name || 'Untitled',
      value: this.props.value,
      onChange: this.handleChange
    })

    return Container({
      name: this.props.name || 'Untitled'
    }, input)
  }
}

function Container (props, children) {
  return html`
    <div class="psr line usn bg-white">
      ${children}
    </div>
  ` 
}
