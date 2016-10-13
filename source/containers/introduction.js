const h = require('choo/html')
const ov = require('object.values')

const namespace = 'ui'

const handleContainerClick = (state, prev, send, event) => {
  const position = state[namespace].intro.position + 1
  send(namespace + ':intro', { position: position })
}

const handlePasswordInput = (state, prev, send, event) => {
  send(namespace + ':intro', { value: event.target.value })
}

const handlePasswordSubmit = (state, prev, send, event) => {
  const isCorrect =
    state[namespace].intro.value ===
    state[namespace].intro.password

  if (isCorrect) {
    send('user:analytics', { authenticated: true })
  } else {
    send(namespace + ':intro', { value: '' })
  }

  event.preventDefault()
}

const elPassword = (state, prev, send) => h`
  <div
    class="psf t0 l0 r0 b0 x xjc xac bg-black curt"
    onclick=${e => e.currentTarget.querySelector('input').focus()}
  >
    <form
      class="c6"
      onsubmit=${e => handlePasswordSubmit(state, prev, send, e)}
    >
      <input
        autofocus
        class="tac sans fwn bg-black tc-white p0 c12 fs1"
        style="outline: none; border: 0;"
        placeholder="password"
        value=${state[namespace].intro.value}
        oninput=${e => handlePasswordInput(state, prev, send, e)}
      />
    </form>
  </div>
`

module.exports = (state, prev, send) => {
  const messages = ov(state[namespace].intro.messages)
  const position = state[namespace].intro.position
  
  const elMessages = () => h`<div
    class="psf t0 l0 r0 b0 x xac xjc p2 curp usn bg-black tc-white"
    onclick=${e => handleContainerClick(state, prev, send, e)}
  >
    <div class="fs1 sans fwn">
      ${messages[position].map(line => h`<div>${line}</div>`)}
    </div>
    <div class="psf b0 l0 r0 p0-5 x xjc fs2 lh1">
      ${messages.map((message, i) => h`
        <div class="${i === position ? 'op100' : 'op20'}">•</div>
      `)}
    </div>
  </div>`

  return messages.length > position
    ? elMessages()
    : elPassword(state, prev, send)
}
