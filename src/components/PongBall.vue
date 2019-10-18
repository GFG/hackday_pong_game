<template>
  <div class="pong-ball"></div>
</template>

<script>
import transition from 'transitionjs'
export default {
    name: 'PongBall',
    props: {
        destination: Object
    },
    watch: {
        destination: function (newDestination) {
            this.move(newDestination.newX, newDestination.newY)
        }
    },
    mounted() {
        this.watchBallPosition();
        this.$emit('ready');
    },
    beforeDestroy() {
        clearInterval(this.idInterval);
    },
    methods: {
        move: function(newX, newY) {
            transition.begin(this.$el, [
                {
                    property: "left",
                    from: this.$el.style.left + "px",
                    to: newX + "px"
                },
                {
                    property: "top",
                    from: this.$el.offsetTop + "px",
                    to: newY + "px"
                },
            ], {
                duration: "4000ms",
                timingFunction: "linear"
            })
        },

        watchBallPosition: function() {
            if (this.idInterval) {
                clearInterval(this.idInterval);
            }
            this.idInterval = setInterval(() => {
                this.$emit(
                    'position',
                    {
                        x: this.$el.offsetLeft,
                        y: this.$el.offsetTop
                    }
                );

              /*console.log("Left: " + this.$el.offsetLeft + ", Top: " + this.$el.offsetTop);*/
            }, 65)
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

</style>
