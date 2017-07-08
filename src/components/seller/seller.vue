<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h2 class="title">{{seller.name}}</h2>
        <div class="star-wrapper border-1px">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" :class="{active:favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="bullrtin-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item , index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h2 class="title">
          商家信息
        </h2>
        <ul>
          <li class="info-item" v-for="info in seller.infos" :key="info">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: false
      }
    },
    computed: {
      favoriteText () {
        return this.favorite === true ? '已收藏' : '收藏'
      }
    },
    components: {
      star,
      split
    },
    methods: {
      toggleFavorite () {
        this.favorite = !this.favorite
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      })
    }
  }
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.seller
  position :absolute
  top:174px
  bottom:0
  left:0
  width:100%
  overflow :hidden
  .overview
    padding:18px
    font-size :0
    .title
      margin-bottom:8px
      line-height:14px
      font-size:14px
      color:rgb(7,17,27)
    .star-wrapper
      display :inline-block
      font-size:0
      padding-bottom:18px
      width:100%
      border-1px(rgba(7,17,27,.1))
      .star
        display :inline-block
        margin-right:8px
        vertical-align :top
      .text
        display :inline-block
        vertical-align :top
        margin-right:12px
        line-height:16px
        font-size:10px
        color:rgb(77,85,93)
    .remark
      display :flex
      padding-top:18px
      .block
        flex:1
        text-align :center
        border-left: 1px solid rgba(7,17,27,.1)
        &:first-child
          border-left:none
        .title
          margin-bottom:4px
          line-height :10px
          font-size:10px
          color:rgb(147,153,159)
        .content
          font-size:10px
          color : rgb(7,17,27)
          font-weight :200
          .stress
            font-size:24px
    .favorite
      position :absolute
      right:18px
      top:18px
      width:50px
      text-align :center
      .icon-favorite
        display :block
        width:20px
        height:20px
        margin:0 auto 4px
        border-radius:50%
        background:#ccc
        text-align :center
        &.active
          background :#f66
      .text
        line-height:10px
        font-size:10px
        color:rgb(77,85,93)
  .bulletin
    padding: 18px 18px 0 18px
    .title
      margin-bottom:8px
      line-height :14px
      font-size:14px
      color: rgb(7,17,27)
    .bullrtin-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7,17,27,.1))
      .content
        line-height:24px
        font-size:12px
        font-weight :200
        color: rgb(240,20,20)
    .supports
      .support-item
        padding:16px 12px
        border-1px(rgba(7,17,27,.1))
        font-size:0
        &:last-child
          margin-bottom:0
          border-none()
        .icon
          display:inline-block
          width:16px
          height:16px
          vertical-align:top
          margin-right: 6px
          background-size:16px 16px
          background-repeat:no-repeat
          &.invoice
            bg-img('invoice_2')
          &.special
            bg-img('special_2')
          &.discount
            bg-img('discount_2')
          &.decrease
            bg-img('decrease_2')
          &.guarantee
            bg-img('guarantee_2')
        .text
          line-height:16px
          font-size:12px
  .pics
    padding: 18px
    .title
      margin-bottom: 12px
      line-height :14px
      font-size:14px
      color: rgb(7,17,27)
    .pic-wrapper
      width:100%
      overflow :hidden
      white-space :nowrap
      .pic-list
        font-size:0
        .pic-item
          display :inline-block
          margin-right:6px
          width: 120px
          height: 90px
          &:last-child
            margin-right:0
  .info
    padding: 18px
    .title
      padding-bottom:12px
      line-height:14px
      font-size:14px
      color: rgb(7,17,27)
      border-1px(rgba(7,17,27,.1))
    .info-item
      padding:16px 12px
      line-height:16px
      font-size:12px
      color:rgb(7,17,27)
      border-1px(rgba(7,17,27,.1))





</style>
