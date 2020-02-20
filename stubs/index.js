const auth = require('./user/repository/user')
const authRoutes = require('./user/routes/auth')
const groupRoutes = require('./group/routes/group')
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static("dist"));
app.use(express.json())

app.use(function (req, res, next) {
  if (
    !req.headers.auth_token
    && 0 === req.originalUrl.indexOf('/api')
    && '/api/login' !== req.originalUrl
    && '/api/register' !== req.originalUrl
  ) {
    res.status(401).send()
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
  if (auth.isAuthenticated(token)) {
    console.log('sockets: successfully authenticated')

    return next();
  }
  console.log('sockets: authentication error')
  return next(new Error('authentication error'));
});

io.on('connection', function(socket){
  console.log('a user connected: ' + socket.handshake.query.token);
  socket.on('disconnect', function(){
    console.log('a user disconnected: ' + socket.handshake.query.token);
  });
});

http.listen(3000, () => console.log("Listening on port 3000!"));

module.exports = app;