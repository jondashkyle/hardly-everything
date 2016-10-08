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
        class="psf t0 l0 r0 b0 x xjc xac"
        onclick=${e => handleContainerClick(state, prev, send, e)}
      >
        <div class="fs2 sans fwn">
          ${messages[position]}
        </div>
      </div>`
    : h`<div class="psf t0 l0 r0 b0 x xjc xac bg-black">
        <form
          onsubmit=${e => handlePasswordSubmit(state, prev, send, e)}
        >
          <input
            autofocus
            class="tac sans fwn bg-white tc-black fs2 p1"
            style="outline: none; border: 0;"
            type="password"
            placeholder="••••••••"
            value=${state[namespace].intro.value}
            oninput=${e => handlePasswordInput(state, prev, send, e)}
          ></input>
        </form>
      </div>`
}
