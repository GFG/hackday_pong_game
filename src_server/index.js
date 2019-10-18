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


app.post('/leave-match', function (req, res) {
    game = {
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
    res.send(game);
});
app.post('/register', function(req, res) {

    let playerSide;

    if (game.playerLeft.name === null) {
        game.playerLeft.name = req.body.player;
        playerSide = 'left';
    } else if (game.playerRight.name === null) {
        game.playerRight.name = req.body.player;
        game.status = "ready";
        playerSide = 'right';

    } else {
        res.status(400).send({"message": "Can't join the game!"});
        return
    }
    res.send({
        game: game,
        playerAddedToSide: playerSide
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('start-game', function(){
        console.log('Send signal to start the game to all clients - game is ready to start');
        game.status = 'startGame';
        io.emit('load-board', game);
    });
    socket.on('player-moved', function (payload) {

        if (payload.positionPlayer === 'left') {
            game.playerLeft.positionY = payload.playerY
        } else {
            game.playerRight.positionY = payload.playerY
        }
       io.emit('update-board', game);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});