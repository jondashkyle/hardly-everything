var Component = require('choo/component')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Slideshow extends Component {
  constructor (name, state, emit) {
    super()

    this.local = {
      index: 0,
      src: [
        '/assets/img/screenshot.png',
        '/assets/img/screenshot-2.png',
        '/assets/img/screenshot-3.png',
        '/assets/img/screenshot-4.png',
        '/assets/img/screenshot-5.png',
        '/assets/img/screenshot-6.png'
      ]
    }

    // randomize the starting point
    this.local.index = Math.floor(Math.random() * this.local.src.length)

    // events
    this.handleClick = this.handleClick.bind(this)
  }

  load (element) {
    this.start()
  }

  unload (element) {
    this.stop()
  }

  start () {
    this.tick = setInterval(() => {
      this.local.index += 1
      this.rerender()
    }, 2000)
  }

  stop () {
    clearInterval(this.tick)
  }

  createElement (props) {
    props = props || { }
    this.local = xtend(this.local, props)

    var slide = mod(this.local.index, this.local.src.length)
    var next = mod(this.local.index + 1, this.local.src.length)

    return html`
      <div>
        <img
          src="${this.local.src[slide]}"
          class="${props.style}"
          onclick=${this.handleClick}
        >
        <img src="${this.local.src[next]}" class="psa t0 l0 op0 pen">
      </div>
    `
  }

  handleClick () {
    this.local.index += 1
    this.stop()
    this.start() 
    this.rerender()
  }

  update (props) {
    return false
  }
}

function mod (num, mod) {
  var remain = num % mod
  return Math.floor(remain >= 0 ? remain : remain + mod)
}
