const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();

const server = http.createServer(app);

var io = socketIO(server);


io.on('connection', (socket) =>{
  console.log('New User Connected');

  socket.emit('newUser', generateMessage('Admin', 'Welcome to Chat App'));

  socket.broadcast.emit('newJoin', generateMessage('Admin', 'New User Joined'));

  socket.on('disconnect', () =>{
    console.log('disconnected from server');
  });

  socket.on('createMsg', function(msg){
    console.log('Create Message', msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));
  });
});


app.use(express.static(publicPath));

server.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});
