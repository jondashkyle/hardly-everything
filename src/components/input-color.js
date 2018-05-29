var ColorPicker = require('simple-color-picker')
var Component = require('choo/component')
var tinycolor = require('tinycolor2')
var html = require('choo/html')
var xtend = require('xtend')

class Picker extends Component {
  constructor (name, state, emit) {
    super()

    this.frame
    this.local = {
      active: false,
      color: ''
    }

    this.handleClickSwatch = this.handleClickSwatch.bind(this)
  }

  load (element) {
    var self = this

    // skip if we have a color picker
    if (this.colorPicker) return

    this.colorPicker = new ColorPicker({
      color: tinycolor(this.local.color).toHexString(),
      el: element,
      width: 200,
      height: 200
    })

    this.colorPicker.onChange(function (data) {
      // clearTimeout(self.frame)
      // self.frame = setTimeout(function () {
      self.local.color = tinycolor(data)
      if (typeof self.local.handleChange === 'function') {
        self.local.handleChange({
          rgb: self.local.color.toRgb()
        })
      }
      // }, 20)
    })

    this.colorPicker.$el.style.display = 'none'
  }

  unload () {
    this.local.active = false
    this.colorPicker.$el.style.display = 'none'
  }

  handleClickSwatch () {
    var cover = this.element.querySelector('[data-cover]')
    this.local.active = !this.local.active
    this.colorPicker.$el.style.display = this.local.active ? '' : 'none'
    if (cover) cover.style.display = this.local.active ? 'block' : 'none'
  }

  elCover () {
    return html`
      <div
        class="psf t0 l0 r0 b0 dn"
        onclick=${this.handleClickSwatch}
        style="z-index: 999;"
        data-cover
      ></div>
    `
  }

  elCurrent () {
    var color = this.local.color
    return html`
      <div
        class="curp bg-white line tc-black px1 psr"
        onclick=${this.handleClickSwatch}
      >
        ${this.local.data.name}
        <div
          class="b2b psa t0 r0"
          style="
            border-radius: 50%;
            background: rgb(${color.r}, ${color.g}, ${color.b});
            margin: 1rem;
            height: 2.5rem;
            width: 2.5rem;
          "
          data-swatch
        ></div> 
      </div>
    `
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    return html`
      <div class="psr">
        ${this.elCurrent()}
        ${this.colorPicker ? this.colorPicker.$el : ''}
        ${this.elCover()}
      </div>
    `
  }

  update (props) {
    var elSwatch = this.element.querySelector('[data-swatch]')
    elSwatch.style.background = `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`
    return false
  }
}

module.exports = Picker
