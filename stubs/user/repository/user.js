const crypto = require("crypto");

const User = require('../user.js')

function UserRepository() {}

let users = []

UserRepository.prototype.nameExists = function (name) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
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

UserRepository.prototype.findAll = function () {
  return users
}

UserRepository.prototype.setSocketId = function (token, socketId) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      users[i].socketId = socketId
      return null
    }
  }
  return null
}

UserRepository.prototype.login = function (name, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name && users[i].password === password) {
      let token = crypto.randomBytes(20).toString('hex');
      users[i].token = token
      return token
    }
  }
  return null
}

UserRepository.prototype.logout = function (name, password) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name && users[i].password === password) {
      users[i].token = null
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

UserRepository.prototype.updateByToken = function (token, name, password, age) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      users[i].name = name
      users[i].password = password
      users[i].age = age
      return true
    }
  }
  return false
}

UserRepository.prototype.register = function (name, password) {
  let user = new User(name, password);
  users.push(user)
}

const userRepository = new UserRepository()

module.exports = userRepository