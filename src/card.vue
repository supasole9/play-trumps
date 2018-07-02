<template>
  <div class="card" v-bind:class="[{red: isRed}, {select: selected}]">
    <span v-on:click="isSelected" > {{ Name }} </span> <br>
    <span v-html="SSymbol"></span> <br>
    <button type="button" v-if="selected" v-on:click="$emit('chosen', Card)" >
      Play
    </button>
  </div>
</template>

<script>
import { eBus } from './main.js';

  export default {
    props: ['card','name', 'suit', 'value', 'symbol'],
    data () {
      return {
        Suit: this.suit,
        Value: this.value,
        Name: this.name,
        SSymbol: this.symbol,
        selected: false,
        isRed: false,
        Card: this.card
      }
    },
    methods: {
      isSelected: function(){
        if (this.selected){
          this.selected = false;
        } else {
          eBus.$emit('selected', false );
          this.selected = true;
        }
      }
    },
    created: function () {
      eBus.$on('selected', (data) => {
        this.selected = data;
      });
      if (this.suit == "Hearts" || this.suit == "Diamonds") {
        this.isRed = true
      } else {
        this.isRed = false
      }
    }
  }
</script>

<style>

.card {
  border-color: #808080 #000000 #000000 #808080;
  border-width: 1px;
  border-style: solid;
  color: #000000;
  font-size: 2rem;
  width:  3.75em;
  height: 5.00em;
  background-color: white;
  margin-left: -50px;
}

.red{
  color: red;
}

.select{
  color: blue;
  z-index: 100;
}

</style>
