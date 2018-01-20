<template>
  <div class="home-header">
    <div class="btn">
      <router-link to="/userInfo"><i class="fa fa-user-circle-o" aria-hidden="true"></i></router-link>
    </div>
    <router-link class="router-link" to="/search">
      <input type="text" placeholder="搜索音乐,歌词,电台">
    </router-link>
    <router-link to="/player" class="btn">
      <i class="fa fa-headphones" aria-hidden="true"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    showPlayer(){
      this.$store.commit('showPlayer')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  a
    color white
  .home-header
    position: fixed
    height: 48px
    width 100%
    display flex
    align-items center
    color: $color-text
    background $color-background
    z-index 100
    .btn
      flex 0 0 56px
      text-align center
      font-size 24px
    .router-link
      flex 1
      input 
        width: 100%;
        height: 32px
        line-height: 24px
        font-size: $font-size-small
        color: #666;
        border-radius: 20px
        text-align center
        outline none
</style>
