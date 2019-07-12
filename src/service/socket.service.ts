import { UserService } from './user.service';

const fastify = require('fastify')({ logger: true });
const io = require('socket.io')(fastify.server);
var xhr = require('xmlhttprequest').XMLHttpRequest;
const jwt_decode = require('jwt-decode');

export class SocketService {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  start() {
    fastify.listen(3001, '::');

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
        this.userService.users.push(socket.nickname);
        console.log(this.userService.users);
      });
    });

    io.on('connection', function(socket) {
      socket.on('chat message', function(msg) {
        if (socket.nickname) {
          const currentDate = new Date();
          io.emit('chat message', {
            author: socket.nickname,
            message: msg,
            createdAt: currentDate,
            updatedAt: currentDate
          });

          const body = { author: 'api/users/27', message: msg };
          const http = new xhr();
          http.open('POST', 'http://api.senapi.fr/api/chat_service_messages');
          http.setRequestHeader('Content-Type', 'application/json');
          http.send(JSON.stringify(body));
        }
      });
    });
  }
}
