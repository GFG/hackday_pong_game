<template>
  <div class="board_outer">
    <div class="board">
      <PongPlayer position="left" :positionY="game.playerLeft.positionY" />
      <PongPlayer position="right" :positionY="game.playerRight.positionY" />
      <PongBall :destination="game.ball.destination" v-on:ready="gameStartBallMove" v-on:position="handleBallPosition" />
    </div>
    <div class="board-legend">
      <div class="player-left-name">{{game.playerLeft.name}}</div>
      <div class="game-status">{{game.playerLeft.points}}:{{game.playerRight.points}}</div>
      <div class="player-right-name">{{game.playerRight.name}}</div>
      <p>w - move player up, s - move player down</p>
    </div>
    <div class="game-over" v-if="game.status === 'over'">
      <h1>Game over</h1>
      <p>{{winnerName}} has won</p>
    </div>
  </div>
</template>

<script>
import PongPlayer from './PongPlayer.vue'
import PongBall from './PongBall.vue'

export default {
  name: 'PongBoard',
  props: {
    initialGame: Object,
    mySide: String,
    socketConnection: Object
  },
  data: function () {
      return {
          game: this.initialGame
      }
  },
  computed: {
      winnerName: function () {
          return (this.game.playerLeft.points == 10) ? this.game.playerLeft.name : this.game.playerRight.name;
      }
  },
  components: {
      PongPlayer,
      PongBall
  },
  mounted() {
    // move my player bar on keypress
    window.addEventListener("keypress", e => {
        if ('w' == String.fromCharCode(e.keyCode)) {
            this.MovePlayer(this.mySide, -25)
        } else if ('s' == String.fromCharCode(e.keyCode)) {
            this.MovePlayer(this.mySide, 25)
        }
    });

    // listen to game changes from socket
    this.socketConnection.on('update-board', (game) =>  {
      console.log(game);
      this.game = game;
    })
  },

  //@todo beforeDestroy removeEventListener

  methods: {
      // ball -----------------------------
      gameStartBallMove: function () {
          if (this.mySide == 'right') { // make left player the master
              return;
          }

          const ballDirection = (Math.random() >= 0.5) ? 'left' : 'right';

          setTimeout(() => {
              this.moveBall(ballDirection);
          }, 2000);
      },

      randomY: function() {
          return getRandomInt(0, 540);
      },

      moveBall: function (ballDirection) {
          this.socketConnection.on('move-ball', {
              destination: {
                  newX: (ballDirection == 'right') ? 800 : 0,
                  newY: this.randomY()
              },
              direction: ballDirection
          });
      },

      handleBallPosition: function (ball) {
          if (this.mySide == 'right') { // make left player the master
              return;
          }

          if (this.game.ball.direction == 'left') {
              this.checkPlayerHit(ball, 15, 25, this.game.playerLeft, 'left', 'right');
          }

          this.checkPlayerHit(ball, 765, 775, this.game.playerRight, 'right', 'left');
      },

      checkPlayerHit: function (ball, xMin, xMax, player, playerPosition, otherPlayerPosition) {
          if (ball.x > xMin && ball.x < xMax) {
              if (ball.y >= player.positionY && ball.y + 10 <= player.positionY + 60) {
                  console.log("HIT " + playerPosition + " =================");
                  this.moveBall(otherPlayerPosition);
              } else {
                  console.log("FAIL " + playerPosition + " =================");
                  this.gamePoint(otherPlayerPosition);
              }
          }
      },

      // player -----------------------------
      MovePlayer: function(position, step) {
        let player = this.getPlayerByPosition(position);
        player.positionY = this.calculateNewPlayerPosition(step, player.positionY);
        this.socketConnection.emit("player-moved", {
          "positionPlayer": position,
          "playerY": player.positionY
        });
      },

      gamePoint: function(position) {
          let player = this.getPlayerByPosition(position);
          console.log(player);
          player.points = player.points + 1 ;

          this.socketConnection.emit("player-made-point", {
              "positionPlayer": position,
              "points": player.points
          });

          if (player.points == 10) {
              console.log(" ******* GAME OVER ***********");

              this.socketConnection.emit("game-over", {});

          } else {
              this.moveBall(position);
          }
      },

      calculateNewPlayerPosition: function(step, currentPosition) {
          let newPosition = currentPosition + step;

          if (newPosition < 0) {
              newPosition = 0
          } else if (newPosition > 490) {
              newPosition = 490
          }

          return newPosition
      },

      getPlayerByPosition: function(position) {
          if (position == 'left') {
              return this.game.playerLeft
          }

          return this.game.playerRight
      }
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 40px;
  overflow: hidden;

  border: 1px solid white;
}

.board-legend {
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.player-left-name {
  width: 40%;
  display: inline-block;
  text-align: left;
}

.game-status {
  width: 20%;
  display: inline-block;
  text-align: center;
}

.player-right-name {
  width: 40%;
  display: inline-block;
  text-align: right;
}
</style>
