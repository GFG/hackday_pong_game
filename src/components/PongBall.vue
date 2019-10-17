<template>
  <div class="pong-ball"></div>
</template>

<script>
import Move from 'move-js'
export default {
    name: 'PongBall',
    props: {
      position: String
    },
    mounted() {
      // the ball has to move on the y- and x-axis.
      // We need as well a smooth and linear slide animation of the ball
        var t = new Move(this.$el);
        t.y(-80).duration(1200).x(-388).ease('linear').end();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pong-ball {
  position: absolute;
  top: 50%;
  left: 50%;

  background-color: white;
  width: 10px;
  height: 10px;
}

</style>
