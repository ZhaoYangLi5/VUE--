<template>
  <div class="cart-control">
      <transition name="move">
        <div class="cartcontrol-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner">-</span>
        </div>
      </transition>
      <div class="cartcontrol-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cartcontrol-add " @click.stop.prevent="addCart">+</div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count ++
      }
      console.log('click')
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count --
      }
    }
  }
}
</script>
<style lang="stylus">
  .cart-control
    font-size:0
    .cartcontrol-decrease
        display :inline-block
        transition :all .4s linear
        &.move-transition
          opacity :1
          transform :translate3D(0,0,0)
        .inner
          display :inline-block
          line-height:24px
          padding: 6px
          font-size:24px
          color: rgb(0,160,220)
          transition :all .4s linear
          transform :rotate(0)
        &.move-enter, &.move-leave
          opacity :0
          transform :translate3D(24px,0,0)
        .inner
          transform :rotate(180deg)
    .cartcontrol-count
        display :inline-block
        vertical-align :top
        width:12px
        padding-top:6px
        line-height :24px
        text-align :center
        font-size:10px
        color :rgb(147,153,159)
    .cartcontrol-add
        display :inline-block
        padding: 6px
        line-height:24px
        font-size:24px
        color: rgb(0,160,220)
</style>

