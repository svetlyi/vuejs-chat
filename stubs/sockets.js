const crypto = require("crypto");
const userRepository = require('./user/repository/user')

let messagesInRooms = [];

module.exports = function(io) {
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    if (userRepository.isAuthenticated(token)) {
      console.log('sockets: successfully authenticated')

      return next();
    }
    console.log('sockets: authentication error')
    return next(new Error('authentication_error'));
  });

  io.on('connection', function(socket){
    console.log('a user connected with token', socket.handshake.query.token);
    userRepository.setSocketId(socket.handshake.query.token, socket.id)
    socket.on('disconnect', function(){
      console.log('a user disconnected with token', socket.handshake.query.token);
    });
    socket.on('join-group', function(data, callback){
      let sender = userRepository.getUserByToken(socket.handshake.query.token)
      console.log(sender.name, 'joined group', data.groupId)
      socket.join(data.groupId);
      if (!messagesInRooms[data.groupId]) {
        messagesInRooms[data.groupId] = []
      }
      callback(messagesInRooms[data.groupId])
    });
    socket.on('chat-message', function(message, callback){
      let room = Object.keys(socket.rooms).filter(room => room !== socket.id).pop()
      console.log({'chat-message data': message, room: room})
      let sender = userRepository.getUserByToken(socket.handshake.query.token)
      message['date'] = Date.now()
      message['id'] = crypto.randomBytes(16).toString("hex")
      message['user'] = {
        name: sender.name
      }
      if (!messagesInRooms[room]) {
        messagesInRooms[room] = []
      }
      messagesInRooms[room].push(message)
      socket.to(room).emit('chat-message', message)
      callback(message)
    });
  });
}