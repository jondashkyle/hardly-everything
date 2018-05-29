var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Tags extends Component {
  constructor (name, state, emit) {
    super()

    this.local = {
      value: [ ]
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (data) {
    this.local.value = data.value
    if (this.local && this.local.onChange) {
      this.local.onChange({
        value: data.value
      })
    }
  }

  load () {
    // this.input = 
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    return Container({
      name: this.local.name || 'Untitled'
    }, this.input)
  }

  update (props) {
    return true
  }
}

function Container (props, children) {
  return html`
    <div class="psr line usn bg-white">
      ${children}
    </div>
  ` 
}
