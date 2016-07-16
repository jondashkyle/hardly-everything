const html = require('choo/html')

const submit = (event, send) => {
  const inputs = [...event.srcElement.querySelectorAll('input[name]')]
  const result = { }
  inputs.map(input => result[input.name] = input.value)
  send('links:add', result)
  event.preventDefault()
}

module.exports = (state, prev, send) => {
  return html`
    <form
      onsubmit=${event => submit(event, send)}
    >
      <input placeholder="title" type="text" name="title">
      <input placeholder="url" type="text" name="url">
      <input placeholder="tags" type="text" name="tags">
      <input type="submit" value="Submit">
    </form>
  `
}
