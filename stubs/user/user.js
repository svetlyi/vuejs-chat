function User(username, password) {
  this.username = username
  this.password = password
}

User.prototype.setToken = function (token) {
  this.token = token
}

module.exports = User