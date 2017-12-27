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

var geopostion = jQuery("#geoBtn");
  geopostion.on('click', function(e){
    if(!navigator.geolocation){
      return alert('Your Browser does not support geo location');
    }
    navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('geoloc', {
      lat: position.coords.latitude,
      lan: position.coords.longitude
    });

    }, function(){
      alert('Unable to fetch location');
    });
  });

  socket.on('sendLoc', function(msg) {
    console.log(msg);
    var url = `https://www.google.com/maps?q=${msg.Latitude},${msg.Longitude}`;
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location </a>');
    a.attr('href', url);
    li.append(a);
    jQuery('#geoLocationmsg').append(li);

  });

  socket.on('disconnect', function(){
    console.log('disconnected from server');
  });
