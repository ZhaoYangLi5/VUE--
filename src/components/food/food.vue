<template>
  <transition name="move-left">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon">&lt;</i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售：{{food.sellCount}}份</span>
            <span class="rating">好评率：{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h3 class="title">商品介绍</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <ratingselect v-on:select="selectAll" v-on:toggleContent="toggleAll" :ratings="food.ratings" :select-type="selectType" :desc="desc" :only-content="onlyContent"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings&&food.ratings.length">
              <li v-show="needShow(rating.rateType ,rating.text)" class="rating-item border-1px" v-for="rating in food.ratings" :key="rating">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb-up':rating.rateType===0,'icon-thumb-down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="food.ratings&&food.ratings.length===0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import cartcontrol from '../cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import {formatDate} from '../../common/js/date'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          postive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst () {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      },
      selectAll (str) {
        this.selectType = str
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleAll (str) {
        this.onlyContent = str
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh-mm')
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .food
    position :fixed
    top:0
    left: 0
    bottom:48px
    width:100%
    box-sizing :border-box
    background :#fff
    transition :all .5s
    &.move-left-enter-active,&.move-left-leave-active
        transform :translate3d(100%,0,0)
    .food-content
      width:100%
      .img-header
        position :relative
        width:100%
        height:0
        padding-top:100%
        img
          position :absolute
          top: 0
          left:0
          width:100%
          height:100%
        .back
          position :absolute
          top:10px
          left:0
          .icon
            display :block
            padding:10px
            font-size: 20px
            color: #fff
      .content
        position :relative
        padding:18px
        .title
          line-height:14px
          margin-bottom:8px
          font-size:14px
          font-weight:700
          color:rgb(7,17,27)
        .detail
          margin-bottom :18px
          line-height:10px
          font-size:10px         
          color:rgb(147,153,159)
          .sell-count
            margin-right:12px
        .price
          line-height:24px
          font-weight:700
          .now
            font-size:14px
            color:rgb(240,20,20)
            margin-right:12px
          .old
            font-size:10px
            color: rgb(147,153,159)
            text-decoration :line-through
        .cartcontrol-wrapper
          position:absolute
          right:12px
          bottom:12px
        .buy
          position:absolute
          right:18px
          bottom:18px
          z-index:10
          height:24px
          line-height:24px
          padding:0 12px
          border-radius: 12px
          font-size: 10px
          color:#fff
          background:rgb(0,160,220)
      .info
        padding:18px
        .title
          line-height:14px
          margin-bottom:6px
          font-size:14px
          color:rgb(7,17,27)
        .text
          line-height:24px
          font-size:12px
          color:rgb(77,85,93)
      .rating
        padding-top:18px
        .title
          line-height:14px
          margin-left:18px
          font-size:14px
          color:rgb(7,17,27)
        .rating-wrapper
          padding:0 18px
          .rating-item
            position:relative
            padding:16px 0
            border-1px(rgba(7,17,27,.1))
            .user
              position:absolute
              right:0
              top:16px
              font-size:0
              line-height:12px
              .name
                display :inline-block
                vertical-align :top
                margin-right:6px
                font-size:10px
                color:rgb(147,153,159)
              .avatar
                border-radius:50%
            .time
              margin-bottom:6px
              line-height:12px
              font-size:10px
              color:rgb(147,153,159)
            .text
              line-height:16px
              font-size:12px
              color:rgb(7,17,27)
          .no-rating
            padding:16px 0
            font-size:12px
            color: rgb(147,153,159)
</style>
