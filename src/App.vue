<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link to="/goods"  class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller" ></router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  const ERROR_OK = 0
  export default {
    components: {
      'v-header': header
    },
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        console.log(response.errno)
        if (response.errno === ERROR_OK) {
          this.seller = response.data
        }
      })
    }
  }
  
</script>

<style lang="stylus">
  #app
    .tab
      display:flex
      width:100%
      height: 40px
      line-height: 40px
      border-bottom: 1px solid rgba(7,17,27,.1)
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77,85,93)
        &.active
          color: rgb(240,20,20)
</style>

