"use strict";
var express = require('express'),
    routes = require('./routes'),
    settings = require('./settings'),
    MongoStore = require('connect-mongo'),
    app = module.exports = express.createServer(),
    io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  // routes are in /routes
  app.use(express.router(routes));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.dynamicHelpers({
  user: function(req, res) {
    return req.session.user;
  },
  error: function(req, res) {
    var err = req.flash('error');
    if (err.length)
      return err;
    else
      return null;
  },
  success: function(req, res) {
    var succ = req.flash('success');
    if (succ.length)
      return succ;
    else
      return null;
  }
});

app.listen(8124);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

io.sockets.on('connection', function (socket) {

  socket.on('broswer', function (data) {
    socket.name = "broswer";
    //        io.sockets.emit('move',"turnon");
    console.log("broswer on");
  });

  socket.on('robot', function (data) {
    socket.name = "tpb";
    //        io.sockets.emit('move',"turnon");
    socket.emit('move',"turnon");
    console.log("tpb" + data);});

  socket.on('move', function (data) { 
    //        io.sockets.emit('move', data);
    socket.broadcast.emit('move', data);
    console.log(data + " sent");
  });

  socket.on('result', function (data) {
    console.log(data); 
  });

  socket.on('keepalive', function (data) {
    socket.emit('alive',data);
    console.log("robot keep alive " + data); 
  });

  socket.on('disconnect', function (data) {
    console.log(socket.name + "disconnect");
  });
});
