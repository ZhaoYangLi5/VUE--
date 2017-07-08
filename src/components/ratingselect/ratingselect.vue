<template>
  <div class="ratingselect">
    <div class="rating-type">
        <span @click="select(2,event)" class="block all" :class="{'active':selectType ===2 }">{{desc.all}} <span class="count">{{ratings.length}}</span> </span>
        <span @click="select(0,event)" class="block postive" :class="{'active':selectType ===0 }">{{desc.postive}} <span class="count">{{postives.length}}</span></span>
        <span @click="select(1,event)" class="block negative" :class="{'active':selectType ===1 }">{{desc.negative}} <span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click = "toggleContent" class="switch" :class="{'on':onlyContent}">
        <i class="icon-check-circle"></i>
        <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          postive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data () {
    return {
      ratings: [],
      selectType: '',
      onlyContent: '',
      desc: ''
    }
  },
  methods: {
    select (type, event) {
      this.selectType = type
      this.$emit('select', type)
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$emit('toggleContent', this.onlyContent)
    }
  },
  computed: {
    postives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>
<style lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7,17,27,.1))
      font-size:0
      .block
        display:inline-block
        padding:8px 12px
        margin-right:8px 
        border-radius:1px
        color:rgb(77,85,93)
        font-size:12px
        &.active
          color:#fff
        .count
          line-height:16px
          margin-left:2px
          font-size:8px
        &.postive
          background :rgba(0,160,220,.2)
          &.active
            background:rgb(0,160,220)
        &.negative
          background :rgba(77,85,93,.2)
          &.active
            background:rgb(77,85,93)
        &.all
          background : rgba(0,160,220,.2)
          &.active
            background:rgb(0,160,220)
    .switch
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgb(147,153,159)
      font-size:0
      &.on
        .icon-check-circle
          border-color: #00c850
      .icon-check-circle
        display :inline-block
        width :12px
        height:12px
        margin-right:4px
        border-radius :6px
        border:1px solid #ccc
      .text
        line-height :24px
        font-size:12px
        color:rgb(147,153,159)

</style>

