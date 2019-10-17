<template>
  <div :class="cssClass" :style="{ top: positionY + 'px' }"></div>
</template>

<script>
import Move from 'move-js'
export default {
    name: 'PongPlayer',
    props: {
        position: String,
        positionY: Number
    },
    computed: {
        // a computed getter
        cssClass: function () {
            return "player " + this.position
        }
    },
    mounted() {
      // the player has to move only on the y-axis
      let t = new Move(this.$el);
      t.y(400).ease('linear').end();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player {
  position: absolute;
  top: 10px;

  background-color: white;
  width: 10px;
  height: 60px;
}

.player.left {
    left: 10px;
}

.player.right {
    right: 10px;
}
</style>
