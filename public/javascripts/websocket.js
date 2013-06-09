var socket = io.connect('http://222.195.93.245:8124'); 

socket.on('connect', function() {
    socket.emit('broswer', "turnon");
});

window.addEventListener('load',function() {
    document.getElementById('left').addEventListener('click',function() {
        socket.emit('move', "left");
    }, false);
}, false);

window.addEventListener('load',function() {
    document.getElementById('down').addEventListener('click',function() {
        socket.emit('move', "down");
    }, false);
}, false);

window.addEventListener('load',function() {
    document.getElementById('up').addEventListener('click',function() {
        socket.emit('move', "up");
    }, false);
}, false);

window.addEventListener('load',function() {
    document.getElementById('right').addEventListener('click',function() {
        socket.emit('move', "right");
    }, false);
}, false);

window.addEventListener('load',function() { 
    document.getElementById('stop').addEventListener('click',function() {
        socket.emit('move', "stop");
    }, false); 
}, false);

window.addEventListener('load',function() { 
    document.getElementById('turnoff').addEventListener('click',function() {
        socket.emit('move', "turnoff");
    }, false); 
}, false);

window.addEventListener('load',function() { 
    document.getElementById('turnon').addEventListener('click',function() {
        socket.emit('move', "turnon");
    }, false); 
}, false);

function keyDown(e) {
        <!-- 72 is H 74 is J 75 is K 76 is L -->
        <!-- 37      40      38      39 -->
        var keycode = e.which;
    var realkey = String.fromCharCode(e.which);
    if (keycode == 72 || keycode == 37) socket.emit('move', "left");
    if (keycode == 74 || keycode == 40) socket.emit('move', "down");
    if (keycode == 75 || keycode == 38) socket.emit('move', "up");
    if (keycode == 76 || keycode == 39) socket.emit('move', "right");
    if (keycode == 32) socket.emit('move', "stop");
        <!-- alert("按键码: " + keycode + " 字符: " + realkey); -->
}

document.body.addEventListener('keydown', keyDown, false);
//document.onkeydown = keyDown;
