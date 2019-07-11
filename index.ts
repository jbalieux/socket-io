// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const io = require('socket.io')(fastify.server);
const mysql = require('mysql');
const jwt_decode = require('jwt-decode');
var xhr = require('xmlhttprequest').XMLHttpRequest;

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
    if (socket.nickname === undefined) {
      // socket.disconnect();
    }
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket) {
  socket.on('send-nickname', function(userToken) {
    const user = jwt_decode(userToken);
    socket.nickname = user.username;
    users.push(socket.nickname);
    console.log(users);
  });
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    const currentDate = JSON.stringify(new Date());
    io.emit('chat message', { author: socket.nickname, message: msg, createdAt: currentDate, updatedAt: currentDate });

    const body = { author: 'api/users/27', message: msg };
    const http = new xhr();
    http.open('POST', 'http://api.senapi.fr/api/chat_service_messages');
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(body));
  });
});
