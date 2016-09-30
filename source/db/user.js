const a = require('axios')
const fb = require('firebase')

const login = (email, password) => {
  fb
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => console.warn(error))
}

const logout = () => {
  fb
    .auth()
    .signOut()
    .catch(error => console.warn(error))
}

module.exports = {
  login,
  logout
}
