<template>
  <div class="board_outer">
    <div class="board">
      <PongPlayer position="left" :positionY="playerLeft.positionY" />
      <PongPlayer position="right" :positionY="playerRight.positionY" />
      <PongBall />
    </div>
    <div class="board-legend">
      <div class="player-left-name">{{playerLeft.name}}</div>
      <div class="game-status">{{playerLeft.points}}:{{playerRight.points}}</div>
      <div class="player-right-name">{{playerRight.name}}</div>
    </div>
  </div>
</template>

<script>
import PongPlayer from './PongPlayer.vue'
import PongBall from './PongBall.vue'

export default {
  name: 'PongBoard',
  props: {
    Game: Object
  },
  data: function () {
      return {
          playerLeft: {
              name: 'Super Mario',
              positionY: 50,
              points: 0
          },
          playerRight: {
              name: 'Donkey',
              positionY: 100,
              points: 0
          }
      }
  },
  components: {
      PongPlayer,
      PongBall
  },
  mounted() {
    window.addEventListener("keypress", e => {
        if ('w' == String.fromCharCode(e.keyCode)) {
            this.MovePlayer('left', -25)
        } else if ('s' == String.fromCharCode(e.keyCode)) {
            this.MovePlayer('left', 25)
        }
    });
  },
  methods: {
      MovePlayer: function(position, step) {
        if (position == 'left') {
            this.playerLeft.positionY = this.calculateNewPosition(step, position)
        } else {
            this.playerRight.positionY  = this.calculateNewPosition(step, position)
        }
      },

      calculateNewPosition: function(step, position) {
          let currentPosition = this.getPlayerPosition(position);
          let newPosition = currentPosition + step;

          if (newPosition < 0) {
              newPosition = 0
          } else if (newPosition > 490) {
              newPosition = 490
          }

          return newPosition
      },

      getPlayerPosition: function(position) {
          let currentPosition
          if (position == 'left') {
              currentPosition = this.playerLeft.positionY
          } else {
              currentPosition = this.playerRight.positionY
          }

          return currentPosition
      }
  }
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
