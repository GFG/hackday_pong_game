/*const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});*/

let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
/*let path = require('path')(http);*/

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    /*res.sendFile(path.realpath('/../public/index.html'));*/
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});