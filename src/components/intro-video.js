var Component = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var Plyr = require('plyr')

css('plyr/dist/plyr.css')

module.exports = class IntroVideo extends Component {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit
    this.local = { }
  }

  createElement (props) {
    return html`
      <video class="psa t0 l0 r0 b0 h100 w100" style="opacity: 0; object-fit: cover;" poster="/path/to/poster.jpg" playsinline controls>
        <source src="/content/intro/loop.mp4" type="video/mp4">
        <track kind="captions" label="English captions" src="/content/intro/loop.vtt" srclang="en" default>
      </video>
    `
  }

  update (props) {
    return false
  }

  load (element) {
    setTimeout(() => {
      element.style.opacity = 1
      this.player = new Plyr(element, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'captions'],
        settings: false
      })
    }, 400)
  }

  unload (element) {
    this.player.destroy()
    delete this.player
  }
}
