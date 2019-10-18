let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

let game = {
    "gameId": null,
    "status": "pending",
    "playerLeft": {
        "name": null,
        "positionY": 50,
        "points": 0
    },
    "playerRight": {
        "name": null,
        "positionY": 50,
        "points": 0
    },
    "ball": {
        "destination": {
            "newX": 0,
            "newY": 0,
            "direction": "left"
        }
    }
};

app.get('/', function(req, res){
    /*res.sendFile(__dirname + '/index.html');*/
    res.sendFile(path.resolve('/home/ubuntu/hackday_pong_game/dist/index.html'));
});

app.get('/css*', function(req, res) {
    res.sendFile(path.resolve('/home/ubuntu/hackday_pong_game/dist/' + req.url))
});
app.get('/js*', function(req, res) {
    res.sendFile(path.resolve('/home/ubuntu/hackday_pong_game/dist/' + req.url))
});

app.post('/register', function(req, res) {

    if (game.playerLeft.name === null) {
        game.playerLeft.name = req.body.player;
        console.log('Player left successful added');
    } else if (game.playerRight.name === null) {
        game.playerRight.name = req.body.player;
        game.status = "startGame";
        console.log('Player right successful added');

    } else {
        res.status(400).send({"message": "Can't join the game!"});
        return
    }
    console.log('Ready to start game!');
    res.send(game);
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