<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> HELLLOOOOO //-->
    <PongBoard />
  </div>
</template>

<script>
import PongBoard from './components/PongBoard.vue'
export default {
  name: 'app',
  components: {
      PongBoard
  }
}
</script>

<style>
body {
  background-color: black;
  color: white;
}

#app {
  position: relative;
  margin: 10% auto;
  width: 800px;
  height: 600px;
}
</style>
