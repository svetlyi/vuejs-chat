import chatAxios from "../../chatAxios";

function User() {
}

User.prototype.getToken = function () {
  return localStorage.getItem('auth_token')
}

User.prototype.isAuthenticated = function () {
  return localStorage.getItem('auth_token') !== null
}

function saveToken(token) {
  localStorage.setItem('auth_token', token)
}

User.prototype.login = function (name, password) {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .post('/login', {name: name, password: password})
      .then(function (res) {
        if (200 === res.status) {
          saveToken(res.data.token)
          resolve()
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err.response.data.error);
        reject(err.response.data.error)
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
          saveToken(res.data.token)
          resolve()
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err)
        reject(err.response.data.error)
      });
  })
}

User.prototype.save = function (user) {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .put('/user', {name: user.name, age: user.age, password: user.password})
      .then(function (res) {
        if (200 === res.status) {
          resolve({name: name, age: user.age})
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err)
        reject(err.response.data.error)
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
        reject(err.response.data.error)
        console.log(err);
      });
  })
}

User.prototype.getUser = function () {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .get('/user/current')
      .then(function (res) {
        if (200 === res.status) {
          resolve(res.data)
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        reject(err.response.data.error)
        console.log(err);
      });
  })
}

const user = new User()

export default user