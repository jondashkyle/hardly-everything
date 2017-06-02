var html = require('rooch/html')
var h = require('rooch/h')
var Component = require('rooch/component')
var ov = require('object-values')

module.exports = intro

class Countdown extends Component {
  constructor () {
    super()
    this.state = {
      count: 60
    }
  }

  componentDidMount () {
    this.frame = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.frame) 
  }

  handleFinished () {
    if (this.props.finished && typeof this.props.finished === 'function') {
      clearInterval(this.frame)
      this.props.finished()
    }
  }

  tick () {
    if (this.state.count > 0) {
      this.setState({ count: this.state.count - 1 }) 
    } else {
      this.handleFinished()
    }
  }

  render () {
    return html`
      <div class="mono">
        0:${('0' + this.state.count).slice(-2)}
      </div>
    `
  }
}

function intro (state, emit) {
  return html`
    <div class="fs1 lh1-5">
      <div class="psf t0 r0 line px1">
        ${state.ui.date}
      </div>
      <div class="psf b0 r0">
        ${state.intro.status === 'waiting' ? elProceed() : ''}
      </div>
      <div class="x xjc ptvh25 pb4-5" sm="pt4-5">
        <div class="mwrem43">
          <div class="tac fwb fs2 p1">
            Hardly Everything
          </div>
          <div class="p1 copy">
            <p><em>Currently Beta: There are no invites, accounts, or mailing lists to subscribe to. Instead, you must wait on this page a full minute before proceeding. Below is some reading material, as the time passes…</em></p>

            <p>The prominent apps and sites often share a common element today; <em>the feed</em>. It looks like Facebook’s timeline, or Buzzfeed’s homepage—an endlessly updating stream of content, catering to the loudest, designed to keep you returning, and spending more time.</p>

            <p>A lot of us feel burnt out by this “<em>drinking from a firehose</em>.” Of course, these services know that, and have implemented algorithms to filter what you see and what you don’t based in part on what keeps you returning—a perpetual mix of what has become known as <em>the filter bubble</em> and <em>FOMO</em>.</p>

            <p><strong>Hardly Everything</strong> attempts to circumnavigate these corperate feeds by supplying you with an <em>anti-feed</em>.</p>

            <div style="height: 26rem" class="x xjc xac tc-white bg-black">Your<br>Feed</div>

            <p>Your feed closely resembles those already familiar—a scrolling list, at essence. You add things to this list, but when doing so prioritize their importance to you by defining a period of <strong>rest</strong>.</p>

            <p>The notion of a rest is borrowed from musical notation—an extended period of time between notes. Just as music has a cadence, imagine your attention’s cadence and rythym when consuming a feed. This is why your feed has a pulse, or a pace, defined by you.</p>

            <p>After clicking an entry, it dissapears from your feed for the duration of it’s rest. Your feed updates once per day, there is never something new until tomorrow, a natural cycle, partitioned by a period of rest—the sleep cycle.</p>

            <p>Your entries can rest anywhere from a day to a year. Link to a page you like to revisit often, or a page you want to remember in a few months.</p>

            <p>Link directly to someone’s Instagram page, instead of scrolling through Instagram’s feed, and be reminded of it once every two weeks.</p>

            <p>Link to something once ever year, to free you from the impulse, if you’d like.</p>

            <p>This tool is meant to be both useful, and to prompt a line of questioning about your habitual behaviour.</p>
          </div>
          <div class="p1  ? 'db' : 'dn'}">
            ${state.intro.status === 'waiting'
              ? 'Just a bit more waiting, now…'
              : 'Click anywhere to get started.'
            }
          </div>
        </div>
      </div>
    </div>
  `

  function elProceed () {
    return html`
      <div class="p1 lh1">
        ${h(Countdown, {
          finished: () => {
            emit('intro:update', { status: false })
          }
        })}
      </div>
    `
  }
}
