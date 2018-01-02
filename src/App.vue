<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>

import player from '@/components/player/player'

export default {
  name: 'app',
  components: {
    player,
    //还有个人信息界面
  }

}
</script>

<style lang='stylus'>
  @import './common/stylus/variable'
  @import './common/stylus/reset'
  #app
    color: $color-theme
</style>
