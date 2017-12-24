var socket = io();
  socket.on('connect', () =>{
    console.log('connected to server');

    socket.on('newMessage', function(msg){
      console.log('from server', msg);
    });

    socket.on('newUser', function(msg){
      console.log(msg);
    });

    socket.on('newJoin', function(msg){
      console.log(msg);
    });
  });
  socket.on('disconnect', function(){
    console.log('disconnected from server');
  });
