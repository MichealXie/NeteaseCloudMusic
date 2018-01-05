<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player v-show="isPlayerShow"></player>
  </div>
</template>

<script>

import player from '@/components/player/player'

export default {
  name: 'app',
  components: {
    player,
    //还有个人信息界面
  },
  computed: {
    isPlayerShow(){
      return this.$store.state.isPlayerShow
    }
  }

}
</script>

<style lang='stylus'>
  @import './common/stylus/variable'
  @import './common/stylus/reset'
  #app
    color: $color-theme
    font-family: Microsoft Yahei, sans-serif
</style>
