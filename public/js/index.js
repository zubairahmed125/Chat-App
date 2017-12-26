var socket = io();
  socket.on('connect', () =>{
    console.log('connected to server');

    socket.on('newUser', function(msg){
      console.log(msg);
    });

  });

    socket.on('newMessage', function(msg){
      console.log('from client', msg);
      var li = jQuery('<li></li>');
      li.text(`${msg.from}: ${msg.text}`);
      jQuery('#messages').append(li);
    });

    socket.on('newJoin', function(msg){
      console.log(msg);
      var li = jQuery('<li></li>');
      li.text(`${msg.from}: ${msg.text}`);
      jQuery('#newUser').append(li);
    });

    // socket.emit('createMsg', {
    //   from:'Ammu',
    //   text:'Waleykumsalaam'
    //
    // }, function(data){
    //   console.log('Got it', data);
    // });


  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMsg', {
      from:'User',
      text: jQuery('[name=message]').val()
    }, function(){

    });
  });

  socket.on('disconnect', function(){
    console.log('disconnected from server');
  });
