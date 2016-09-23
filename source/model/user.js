const uuid = require('uuid')

const state = {
  id: uuid.v4(),
  name: '',
  email: '',
  photo: ''
}

module.exports = {
  namespace: 'user',
  state: state
}
