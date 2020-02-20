const crypto = require("crypto");

const User = require('../user.js')

function UserRepository() {}

let users = []

UserRepository.prototype.usernameExists = function (username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return true
    }
  }
  return false
}

UserRepository.prototype.isAuthenticated = function (token) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      return true
    }
  }
  return false
}

UserRepository.prototype.getUserByToken = function (token) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      return users[i]
    }
  }
  return null
}

UserRepository.prototype.getAll = function () {
  return users
}

UserRepository.prototype.login = function (username, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      let token = crypto.randomBytes(20).toString('hex');
      users[i].setToken(token)
      return token
    }
  }
  return null
}

UserRepository.prototype.logout = function (username, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      users[i].setToken(null)
      return true
    }
  }
  return false
}

UserRepository.prototype.register = function (username, password) {
  let user = new User(username, password);
  users.push(user)
}

const userRepository = new UserRepository()

module.exports = userRepository