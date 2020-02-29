import chatAxios from "../../chatAxios";

function Group() {
}

Group.prototype.list = function () {
  return new Promise((resolve, reject) => {
    chatAxios.getInst()
      .get('/group')
      .then(function (res) {
        if (200 === res.status) {
          resolve(res.data)
        } else {
          reject(res.data.error)
        }
      })
      .catch(function (err) {
        console.log(err);
        reject(err.response.data.error)
      });
  })
}

const group = new Group()

export default group