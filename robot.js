var io = require('socket.io-client'),
    exec = require('child_process').exec,
    fs = require('fs'),
    http = require('http');

var socket = io.connect('http://222.195.93.245:8124');
var count = 0 ;

socket.on('connect', function(data) {
    socket.emit('robot',"this is from robot");
});

socket.on('move', function(data) {
    // need to add checks here
    exec("./bin/" + data);
    socket.emit('result',"executed " + data);
    console.log(data + " received");
});

setInterval(function(){
    socket.emit('result',"robot keep alive " + count);
    count ++;
    },1000);

