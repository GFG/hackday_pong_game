<template>
  <div :class="cssClass" :style="{ top: positionY + 'px' }"></div>
</template>

<script>
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
