<template>
  <div id="app">
    <template v-if="initialGame.status === 'register'">
      <RegisterPlayer v-on:register="onRegisterPlayer" />
    </template>
    <template v-else-if="initialGame.status === 'pending'">
      <div class="waiting">Please wait for player joining ....</div>
    </template>
    <template v-else-if="initialGame.status === 'ready'">
      <div class="waiting">Loading game ....</div>
    </template>
    <template v-else>
      <PongBoard
              :initialGame="initialGame"
              :mySide="mySide"
              :socketConnection="socketConnection" />
    </template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> HELLLOOOOO //-->
  </div>
</template>

<script>
import io from 'socket.io'
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
            initialGame: {
                gameId: '',
                status: 'register',
                playerLeft: {
                    name: 'Super Mario',
                    positionY: 50,
                    points  : 0
                },
                playerRight: {
                    name: 'Donkey',
                    positionY: 100,
                    points: 0
                },
                ball: {
                    destination: {
                        newX: 0,
                        newY: 0,
                    },
                    direction: 'left'
                }
            },
            mySide: '',
            socketConnection: null
        }
    },
    mounted() {
      this.socketConnection = io();
    },
    methods: {
        onRegisterPlayer: function (event) {
            axios.post('/register', {
                player: event.player
            })
            .then((response) => {
                this.initialGame = response.data.game;
                this.mySide = response.data.playerAddedToSide;
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
