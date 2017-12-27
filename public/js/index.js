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
        jQuery('[name=message]').val('')
    });
  });

var geopostion = jQuery("#geoBtn");
  geopostion.on('click', function(e){
    if(!navigator.geolocation){
      return alert('Your Browser does not support geo location');
    }
    geopostion.attr('disabled', 'disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    socket.emit('geoloc', {
      lat: position.coords.latitude,
      lan: position.coords.longitude
    });
    geopostion.removeAttr('disabled').text('sending location');
    }, function(){
        geopostion.removeAttr('disabled').text('sending location');
      alert('Unable to fetch location');
    });
  });

  socket.on('sendLoc', function(msg) {

    var url = `https://www.google.com/maps?q=${msg.Latitude},${msg.longitude}`;
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location </a>');
    var add = msg.Address;
    a.attr('href', url);
    li.append(a);
    li.append(add);

    jQuery('#geoLocationmsg').append(li);

  });

  socket.on('disconnect', function(){
    console.log('disconnected from server');
  });
