<template>
  <div class="pong-ball"></div>
</template>

<script>
export default {
    name: 'PongBall',
    props: {
      position: String
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pong-ball {
  position: absolute;
  top: 200px;
  left: 200px;

  background-color: white;
  width: 10px;
  height: 10px;
}

</style>
