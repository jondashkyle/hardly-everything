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

module.exports = (state, prev, send, event) => {
  const messages = ov(state[namespace].intro.messages)
  const position = state[namespace].intro.position

  return messages.length > position
    ? h`<div
        class="psf t0 l0 r0 b0 x xac xjc tac p2 curp usn bg-black tc-white"
        onclick=${e => handleContainerClick(state, prev, send, e)}
      >
        <div class="fs1 sans fwn">
          ${messages[position].map(line => h`<div class="p0-5">${line}</div>`)}
        </div>
        <div class="psa b0 r0 p1 lh1">
          →
        </div>
      </div>`
    : h`<div class="psf t0 l0 r0 b0 x xjc xac bg-black">
        <form
          class="c6"
          onsubmit=${e => handlePasswordSubmit(state, prev, send, e)}
        >
          <input
            autofocus
            class="tac sans fwn bg-black tc-white p0 c12"
            style="outline: none; border: 0; font-size: 4rem"
            type="password"
            placeholder="••••••••"
            value=${state[namespace].intro.value}
            oninput=${e => handlePasswordInput(state, prev, send, e)}
          ></input>
        </form>
      </div>`
}
