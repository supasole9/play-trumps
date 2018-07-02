<template>
  <div>
    <div class="relative" v-for="card in Hi" v-bind:key="card.id">
      <card :card="card"
        :name="card.name"
        :suit="card.suit"
        :value="card.value"
        :symbol="card.symbol"
        v-on:chosen="play($event)"
      ></card>
    </div>
  </div>
</template>

<script>
import Card from "./card.vue";

  export default {
    props:['Hi'],
    data () {
      return {
        hand: this.Hi,
        cardSelected: this.selected
      }
    },
    methods:{
      play: function(data){
        this.cardSelected = data;
        this.$emit('playCard', this.cardSelected);
        for (let i = 0; i < this.hand.length; i++){
          if (this.hand[i] === this.cardSelected) {

          } else {

          }
        }
      }
    },
    components:{
      'card': Card
    }
  }
</script>

<style>
.relative{
  display: inline-block;
}
</style>
