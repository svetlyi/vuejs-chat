import chatAxios from "../../chatAxios";

function User() {
}

User.prototype.getToken = function () {
  return localStorage.getItem('auth_token')
}

User.prototype.isAuthenticated = function () {
  return localStorage.getItem('auth_token') !== null
}

User.prototype.login = function (name, password) {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .post('/login', {name: name, password: password})
      .then(function (res) {
        if (200 === res.status) {
          localStorage.setItem('auth_token', res.data.token)
          resolve()
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })
}

User.prototype.logout = function () {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('auth_token')
    resolve()
  })
}

User.prototype.register = function (name, password) {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .post('/register', {name: name, password: password})
      .then(function (res) {
        if (200 === res.status) {
          localStorage.setItem('auth_token', res.data.token)
          resolve()
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })
}

User.prototype.list = function () {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .get('/user')
      .then(function (res) {
        if (200 === res.status) {
          resolve(res.data)
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })
}

const user = new User()

export default user