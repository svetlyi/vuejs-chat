import chatAxios from "../chatAxios";

function Auth() {
}

Auth.prototype.getToken = function () {
  return localStorage.getItem('auth_token')
}

Auth.prototype.isAuthenticated = function () {
  return localStorage.getItem('auth_token') !== null
}

Auth.prototype.login = function (username, password) {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .post('/login', {username: username, password: password})
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

Auth.prototype.logout = function () {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('auth_token')
    resolve()
  })
}

Auth.prototype.register = function (username, password) {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .post('/register', {username: username, password: password})
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

const auth = new Auth()

export default auth