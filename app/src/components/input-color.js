var Component = require('rooch/component')
var html = require('rooch/html')
var H = require('rooch/h')
var colorpicker = require('coloreact').default
var tinycolor = require('tinycolor2')
var throttle = require('lodash.throttle')
var { Map, Slider } = require('coloreact')

class Picker extends Component {
  constructor (props) {
    super(props)

    var c = tinycolor(props.color).toHsv()

    this.state = {
      active: false,
      color: this.toPercentage(c)
    }

    this.throttle = throttle(function (fn, data) {
      fn(data)
    }, 100)

    this.handleClickSwatch = this.handleClickSwatch.bind(this)

    this.handleSaturationValueChange = this.handleSaturationValueChange.bind(this)
    this.handleHueChange = this.handleHueChange.bind(this)
    this.handleAlphaChange = this.handleAlphaChange.bind(this)
    this.showLastValue = this.showLastValue.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!tinycolor.equals(nextProps.color, this.state.color)) {
      const c = tinycolor(nextProps.color).toHsv();
      this.setState({
        color: this.toPercentage(c)
      })
    }
  }

  toPercentage (hsv) {
    var { h, s, v, a } = hsv;
    return {
      h,
      s: s * 100,
      v: v * 100,
      a
    }
  }

  handleHueChange (h) {
    var {s, v, a} = this.state.color;
    this.update({h, s, v, a});
  }

  handleSaturationValueChange(s, v) {
    var { h, a } = this.state.color;
    this.update({h, s, v, a});
  }

  handleAlphaChange (a) {
    var { h, s, v } = this.state.color;
    this.update({ h, s, v, a });
  }

  getAlpha () {
    return this.state.color.a === undefined ? 1 : this.state.color.a;
  }

  getBackgroundHue () {
    return tinycolor({
      h: this.state.color.h,
      s: 100,
      v: 100 }).toRgbString();
  }

  handleClickSwatch () {
    this.setState({ active: !this.state.active })
  }

  update (color) {
    this.setState({ color })
    if (
      this.props.handleChange &&
      typeof this.props.handleChange === 'function'
    ) {
      this.throttle(this.props.handleChange, this.output())
    }
  }

  output () {
    const c = tinycolor(this.state.color);
    return {
      hsl: c.toHsl(),
      hex: c.toHex(),
      hexString: c.toHexString(),
      rgb: c.toRgb(),
      rgbString: c.toRgbString(),
    }
  }

  showLastValue () {
    this.props.onComplete && this.props.onComplete(this.output());
  }

  elPicker () {
    var { h, s, v, a } = this.state.color
    return html`
      <div class="x psr c12 bg-white" style="margin-top: 2px; height: 15rem;">
        ${H(Map, {
          x: s,
          y: v,
          backgroundColor: this.getBackgroundHue(),
          style: {
            height: '100%',
            width: '90%'
          },
          pointerStyle: {
            borderColor: tinycolor(this.state.color).isDark() ? "#fff" : "#000"
          },
          onChange: this.handleSaturationValueChange,
          onComplete: this.showLastValue
        })}
        ${H(Slider, {
          vertical: true,
          value: h,
          max: 360,
          style: {
            right: 0,
            left: 'auto'
          },
          onChange: this.handleHueChange,
          onComplete: this.showLastValue,
          pointerStyle: {
            boxShadow: '0',
            background: '#000',
            borderRadius: '0',
          },
          trackStyle: {
            background: `linear-gradient(to bottom,
              #FF0000 0%,
              #FF0099 10%,
              #CD00FF 20%,
              #3200FF 30%,
              #0066FF 40%,
              #00FFFD 50%,
              #00FF66 60%,
              #35FF00 70%,
              #CDFF00 80%,
              #FF9900 90%,
              #FF0000 100%
            )`
          }
        })}
      </div>
    `
  }

  elCover () {
    return html`
      <div class="psf t0 l0 r0 b0" onclick=${this.handleClickSwatch}></div>
    `
  }

  elCurrent () {
    return html`
      <div
        class="curp bg-white line tc-black px1 psr"
        onclick=${this.handleClickSwatch}
      >
        ${this.props.data.name}
        <div
          class="b2b psa t0 r0"
          style="
            border-radius: 50%;
            background: ${this.props.color};
            margin: 1rem;
            height: 2.5rem;
            width: 2.5rem;
          "
        ></div> 
      </div>
    `
  }

  render () {
    return html`
      <div class="psr">
        ${this.elCurrent()}
        ${this.state.active ? this.elPicker() : ''}
      </div>
    `
  }
}

module.exports = Picker