import chatAxios from "../../chatAxios";

function User() {
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

const group = new User()

export default group