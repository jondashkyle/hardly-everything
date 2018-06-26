var objectValues = require('object-values')
var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

var typography = require('../design/typography')

class Typography extends Component {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit

    this.local = {
      active: false
    }

    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleCurrentClick = this.handleCurrentClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleOptionClick (data, event) {
    if (this.local.handleOptionClick) {
      this.local.handleOptionClick(data)
    }
  }

  handleCurrentClick (data, event) {
    if (this.local.handleCurrentClick) {
      this.local.handleCurrentClick()
    }
    this.local.active = !this.local.active
    this.rerender()
  }

  handleScroll (event) {
    event.stopPropagation()
  }

  elOption (data) {
    return html`
      <div
        class="x px1 curp fs1-5 line bb1-lighter ophc design-font-uppercase wsnw"
        onclick=${event => this.handleOptionClick(data, event)}
        style="
          font-family: ${data.value}, sans-serif;
          font-weight: ${data.weight || 400};
          font-style: ${data.style || 'normal'};
        "
      >
        <div class="xx">${data.name}</div>
        ${data.author
          ? html`
              <div class="op0 ophc33 oph100">
                <a
                  href="${data.author.url}"
                  target="_blank"
                  class="tc-black mono fs1-5 arrow-ext"
                ></a>
              </div>
            `
          : ''
        }
      </div> 
    `
  }

  elContainer () {
    var options = objectValues(this.local.options)
    return html`
      <div
        class="
          bg-white tc-black bt2b input-dropdown-options
          ${this.local.active ? 'db' : 'dn'}
        "
      >
        ${this.local.children}
        ${options.map(option => this.elOption(option))}
      </div>
    `
  }

  elCurrent () {
    return html`
      <div
        class="psr c12 curp x xje line"
        onclick=${event => this.handleCurrentClick({ }, event)}
      >
        <label class="psa t0 l0 px1 pen">
          Font
        </label>
        <div class="px1 fs1-5 design-font design-font-uppercase">
          ${this.local.current.name}
        </div>
      </div>
    `
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    return html`
      <div class="usn c12 psr">
        ${this.elCurrent()}
        ${this.elContainer()}
      </div>
    `
  }

  update (props) {
    return true
  }
}

module.exports = Typography
