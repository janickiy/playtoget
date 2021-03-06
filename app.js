var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('playtoget user connected');

  socket.on('message', function(msg){
    io.emit('message', msg);
  });

  socket.on('typing', function(msg){
    io.emit('typing', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});