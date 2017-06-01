var html = require('rooch/html')
var ov = require('object-values')

module.exports = intro

function intro (state, emit) {
  return html`
    <div class="x xjc fs1 ptvh25 lh1-5" sm="pt4-5">
      <div class="psf t0 r0 line px1">
        ${state.ui.date}
      </div>
      <div class="mwrem43">
        <div class="tac fwb fs2 p1">
          Hardly Everything
        </div>
        <div class="p1 copy">
          <p><em>Currently Beta</em>: There are no invites, accounts, or mailing lists to subscribe to. Instead, you must wait on this page a full minute before proceeding.</p>

          <p>Below is some reading material, as the time passes…</p>
          <p class="tac">—</p>
          <p>The prominent apps and sites often share a common element today; <em>the feed</em>. It looks like Facebook’s timeline, or Buzzfeed’s homepage—an endlessly updating stream of content, catering to the loudest, designed to keep you returning, and spending more time.</p>

          <p>A lot of us feel burnt out by this “<em>drinking from a firehose</em>.” Of course, these services know that, and have implemented algorithms to filter what you see and what you don’t based in part on what keeps you returning—a perpetual mix of what has become known as <em>the filter bubble</em> and <em>FOMO</em>.</p>

          <p><strong>Hardly Everything</strong> attempts to circumnavigate these corperate feeds by supplying you with an <em>anti-feed</em>.</p>

          <div style="padding-bottom: 65.50%" class="bg-black"></div>

          <p>Your feed closely resembles those already familiar—a scrolling list, at essence. You add things to this list, but when doing so prioritize their importance to you by defining a period of <strong>rest</strong>.</p>

          <p>The word rest is borrowed from musical notation—the period of time between notes. Just as music has a cadence, imagine your attention’s cadence and rythym when using Instagram, or Twitter. This is why your feed has a pulse, or a pace, defined by you.</p>

          <p>After clicking an entry, it dissapears from your feed for the duration of it’s rest. Your feed updates once per day, there is never something new until tomorrow.</p>

          <p>Your entries can rest anywhere from a day to a year. Link to a page you like to revisit often, or a page you want to remember in a few months. Link directly to someone’s Instagram page, instead of scrolling through Instagram’s feed, and be reminded of it once every two weeks. Link to something once ever year, to free you from the impulse, if you’d like.</p>

          <p></p>

        </div>
      </div>
    </div>
  `

  function elContinue () {
    return html` 
      <div onclick=${handleContinueClick}>
        auth
      </div>
    `
  }

  function handleContinueClick () {
    emit('user:analytics', { authenticated: true })
  }
}