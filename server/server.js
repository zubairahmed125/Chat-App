const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const axios = require('axios');

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

  socket.on('createMsg', function(msg, callback){
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback({
      msg:'data received by server successfully'
    });
  });

  socket.on('geoloc', function(loc, callback){
    //Getting Location
    url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lan}&sensor=true`;
    axios.get(url).then((res) =>{
      console.log(res.data.results[0].formatted_address);
      //Get Latitude,Longitude
      io.emit('sendLoc', {Latitude: loc.lat, longitude: loc.lan, Address: res.data.results[0].formatted_address});
    }).catch((e) =>{
      console.log(e);
    });
  });
});


app.use(express.static(publicPath));

server.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});
