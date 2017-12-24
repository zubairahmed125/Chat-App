const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();

const server = http.createServer(app);

var io = socketIO(server);


io.on('connection', (socket) =>{
  console.log('New User Connected');

  socket.on('disconnect', () =>{
    console.log('disconnected from server');
  });

  socket.emit('newMessage', {
    from:'Ammu',
    text:'Asalaamualeykum from server',
    createAt: 123
  });

  socket.on('createMsg', function(msg){
    console.log('Create Message', msg);
  });
});


app.use(express.static(publicPath));

server.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});
