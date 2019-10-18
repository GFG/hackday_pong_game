<template>
  <form class="register" @submit.prevent="handleSubmit">
    <label for="player-name">Enter player name</label>
    <input type="text" id="player-name" name="player" v-model="playerName" class="txt-input" />
    <input type="submit" class="btn" value="start game" />
  </form>
</template>

<script>
export default {
    name: 'RegisterPlayer',
    props: {
    },
    data: function () {
        return {
            playerName: ''
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('register', { player: this.playerName})
        }
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
label, .txt-input, .btn {
  margin: 0 10px 0 0;
  font-size: 16px;
}

.txt-input{
  border: none;
  padding: 4px;
}

.btn {
  margin: 0;
  padding: 4px 12px;
  border: none;
  background-color: white;
  color: black;
}

</style>
