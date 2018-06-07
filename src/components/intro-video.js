var Component = require('choo/component')
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
      <div class="psa t0 l0 r0 b0 h100 w100" style="opacity: 0">
        <video class="psa t0 l0 r0 b0 h100 w100" style="object-fit: cover;" poster="/assets/img/posterframe.jpg" playsinline controls>
          <source src="/content/intro/loop.mp4" type="video/mp4">
          <track kind="captions" label="English captions" src="/content/intro/loop.vtt" srclang="en" default>
        </video>
      </div>
    `
  }

  update (props) {
    return false
  }

  load (element) {
    setTimeout(() => {
      element.style.opacity = 1
      this.player = new Plyr(element.querySelector('video'), {
        controls: ['progress', /*'mute',*/ 'fullscreen'],
        captions: { active: true },
        settings: false,
        loadSprite: false,
        iconUrl: '/assets/plyr.svg'
      })

      this.player.toggleControls(false)

      this.player.on('play', () => {
        this.emit(this.state.events.UI_UPDATE, { introActive: true, introStarted: true })
      })

      this.player.on('pause', () => {
        this.emit(this.state.events.UI_UPDATE, { introActive: false })
      })

      this.player.on('controlsshown', () => {
        if (this.player.stopped) this.player.toggleControls(false)
      })
    }, 400)
  }

  unload (element) {
    delete this.player
  }
}
