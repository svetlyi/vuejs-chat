function User(name, password) {
  this.name = name
  this.password = password
}

User.prototype.setToken = function (token) {
  this.token = token
}

module.exports = User