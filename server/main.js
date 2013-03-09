"use strict";
var express=require('express');
var app = express();
var server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path'),
    exec = require('child_process').exec,
    fs = require('fs');
server.listen(8124);
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});
app.get('/',function(req,res) {
    res.sendfile(__dirname + '/index.html');
    });

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
