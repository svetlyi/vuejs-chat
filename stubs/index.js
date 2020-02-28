const userRepository = require('./user/repository/user')
const authRoutes = require('./user/routes/auth')
const groupRoutes = require('./group/routes/group')
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const crypto = require("crypto");

app.use(express.static("dist"));
app.use(express.json())

app.use(function (req, res, next) {
  if (
    !req.headers.auth_token
    && 0 === req.originalUrl.indexOf('/api')
    && '/api/login' !== req.originalUrl
    && '/api/register' !== req.originalUrl
  ) {
    res.status(401).header('Content-Type', 'application/json').send({error: 'you\'re not authorized'})
  } else {
    next()
  }
})

app.use('/api', authRoutes)
app.use('/api', groupRoutes)

app.get('/app/*', function (req, res) {
  let reqPath = path.join(__dirname, "./");
  res.sendFile(
    path.resolve(reqPath, "index.html")
  );
})

// sockets
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
  console.log('a user connected: ' + socket.handshake.query.token);
  userRepository.setSocketId(socket.handshake.query.token, socket.id)
  socket.on('disconnect', function(){
    console.log('a user disconnected: ' + socket.handshake.query.token);
  });
  socket.on('join-group', function(data, callback){
    let sender = userRepository.getUserByToken(socket.handshake.query.token)
    console.log(sender.name, 'joined group', data.groupId)
    socket.join(data.groupId);
    callback()
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
    socket.to(room).emit('chat-message', message)
    callback(message)
  });
});

http.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;