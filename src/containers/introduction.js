var Component = require('choo/component')
var ov = require('object-values')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = intro

class Countdown extends Component {
  constructor () {
    super()
    this.local = {
      count: 60
    }
  }

  load () {
    this.frame = setInterval(() => {
      this.tick()
    }, 1000)
  }

  unload () {
    clearInterval(this.frame)
  }

  handleFinished () {
    if (this.local.finished && typeof this.local.finished === 'function') {
      clearInterval(this.frame)
      this.local.finished()
    }
  }

  tick () {
    if (this.local.count > 0) {
      this.local.count = this.local.count - 1
    } else {
      this.handleFinished()
    }
  }

  createElement (props) {
    this.local = xtend(this.local, props)
    return html`
      <div class="mono">
        0:${('0' + this.local.count).slice(-2)}
      </div>
    `
  }

  update (props) {
    return false
  }
}

function intro (state, emit) {
  return html`
    <div class="fs1 lh1-5">
      <div class="psf t0 l0 line px1 ${!state.intro.status ? 'dn' : ''}">
        Hardly Everything
      </div>
      <div class="psf t0 r0 line px1">
        ${state.ui.date}
      </div>
      <div class="x xjc ptvh25 pb4-5" sm="pt4-5">
        <div class="mwrem43">
          <div class="p1 copy">
            <p class="mb3 op33"><span class="fwb">Currently Beta</span>: There are no invites, accounts, or mailing lists to subscribe to. Instead, you must wait on this page a full minute before continuing. Below is some reading material, as the time passes…</p>

            <p>The prominent apps and sites often share a common element today; <em>the feed</em>. It looks like Facebook’s timeline, or Buzzfeed’s homepage—an endlessly updating stream of content, designed to keep you returning, and spending more time.</p>

            <p>You frequently hear of us feeling burnt out by this “<em>drinking from a firehose</em>.” Of course, these products know that, and are increasingly implementing steps to filter what you see and what you don’t based in part on what keeps you returning—a perpetually shifting mix, resulting in what has become known as <em>the filter bubble</em>, <em>FOMO</em>, and other things.</p>

            <p class="mb3"><strong>Hardly Everything</strong> attempts to circumnavigate these corporate feeds by supplying you with an <em>anti-feed</em>.</p>

            <p>Your feed closely resembles those already familiar—a scrolling list, at essence. You add things to this list, but when doing so prioritize their importance to you by defining a period of <strong>rest</strong>.</p>

            <p>The notion of a rest is borrowed from musical notation—an extended period of time between notes. Just as music has a cadence, consider your attention’s rhythm while consuming a feed. This is why your feed has a pulse, or a pace, defined by you.</p>

            <p>After clicking an entry, it disappears from your feed for the duration of it’s rest. Your feed updates once per day, there is never something new until tomorrow, a natural cycle, partitioned by a period of another kind of rest.</p>

            <p>Your entries can rest anywhere from a day to a year. Link to a page you like to revisit often, or a page you want to remember in a few months.</p>

            <p>Link directly to someone’s Instagram page, instead of scrolling through Instagram’s feed, and be reminded of it once every two weeks.</p>

            <p class="mb3">Link to something once every year, to free you from the impulse, if you’d like.</p>

            <p>This tool is not a rejection of an interface, but a prompt to question who the interface serves, and why. It is also meant to be immediately useful, and hopefully you will find it that way, too.</p>

            <div
              class="
                ${!state.intro.status ? 'curp' : 'op33 pen curd'}
                mt4 px1 tac bg-black tc-white bro line
              "
            >
              ${state.intro.status === 'waiting' ? elProceed() : 'Get started'}
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  function elProceed () {
    return state
      .cache(Countdown, 'countdown')
      .render({
        finished: () => {
          emit('intro:update', { status: false })
        }
      })
  }
}
