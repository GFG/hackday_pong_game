<template>
  <div id="app">
    <template v-if="gameStatus === 'register'">
      <RegisterPlayer v-on:register="onRegisterPlayer" />
    </template>
    <template v-else-if="gameStatus === 'pending'">
      <label>Email</label>
      <input placeholder="Enter your email address">
    </template>
    <template v-else>
      <PongBoard />
    </template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> HELLLOOOOO //-->

  </div>
</template>

<script>
import axios from 'axios'
import PongBoard from './components/PongBoard.vue'
import RegisterPlayer from './components/RegisterPlayer.vue'
export default {
    name: 'app',
    components: {
        PongBoard,
        RegisterPlayer
    },
    data: function () {
        return {
            gameStatus: 'register'
        }
    },
    methods: {
        onRegisterPlayer: function (event) {
            axios.post('/register', {
                player: event.player
            })
            .then((response) => {
              console.log(response);
            }, (error) => {
              console.log(error);
            });
        },
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
