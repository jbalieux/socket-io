// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const io = require('socket.io')(fastify.server);
const mysql = require('mysql');

fastify.listen(3001, '::');

const con = mysql.createConnection({
  host: 'vps663399.ovh.net',
  port: '3307',
  user: 'root',
  password: 'KQqm318bWltNGWB5',
  database: 'sf4'
});

let listUsers = [];
let users = [];
const sql = 'select username from user';
con.connect(function(err) {
  if (err) throw err;
  con.query(sql, function(err, result, fields) {
    if (err) throw err;
    result.forEach(el => {
      listUsers.push(el.username);
    });
  });
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
  socket.on('send-nickname', function(user) {
    if (!listUsers.indexOf(user.username)) {
      socket.disconnect();
    }
    socket.nickname = user.username;
    users.push(socket.nickname);
    console.log(users);
  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', socket.nickname + ': ' + msg);
  });
});
