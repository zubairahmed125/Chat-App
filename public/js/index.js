var socket = io();
  socket.on('connect', () =>{
    console.log('connected to server');
    socket.emit('createMsg',{
      from:'zubi',
      text:'Asalaamualeykum'
    });
    socket.on('newMessage', function(msg){
      console.log('from server', msg);
    })
  });
  socket.on('disconnect', function(){
    console.log('disconnected from server');
  });
