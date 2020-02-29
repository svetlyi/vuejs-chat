import userRepo from 'user/repository/user'
import socketio from "socket.io-client";
import notification from "./notification";
import errors from "./errors";
import router from './router'
import config from "./config";

let socket = null

function Socket() {}

Socket.prototype.getInst = () => {
  return new Promise((resolve, reject) => {
    if (null === socket) {
      let token = userRepo.getToken()
      if (null !== token) {
        console.log('socket token', token)
        socket = socketio(config.socketsAddress + '/?token=' + token)
        socket.on('connect_error', (err) => {
          socket = null
          console.log('socket: connect_error', err)
          notification.send('socket connection error', 'danger')
          reject(err)
        })
        socket.on('error', err => {
          socket = null
          if (errors.authenticationError === err) {
            userRepo.logout()
            router.push('authorization')
          }
          console.log('socket: error', err)
          reject(err)
        })
        socket.on('connect', () => {
          console.log('socket: successfully connected')
          resolve(socket)
        })
      }
    } else {
      resolve(socket)
    }
  })
}

let socketInst = new Socket()

export default socketInst