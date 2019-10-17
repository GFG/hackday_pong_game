<template>
  <div class="board_outer">
    <div class="board">
      <PongPlayer position="left" />
      <PongPlayer position="right" />
      <PongBall />
    </div>
    <div class="board-legend">
      <div class="player-left-name">Mario</div>
      <div class="game-status">1:4</div>
      <div class="player-right-name">Donkey</div>
    </div>
  </div>
</template>

<script>
import PongPlayer from './PongPlayer.vue'
import PongBall from './PongBall.vue'

export default {
  name: 'PongBoard',
  props: {
    msg: String
  },
  components: {
      PongPlayer,
      PongBall
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
