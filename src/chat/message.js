function Message() {}

Message.prototype.send = function (message) {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

const message = new Message()

export default message