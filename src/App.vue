<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <app-audio></app-audio>
  </div>
</template>

<script>
import appAudio from '@/components/app-audio/app-audio'

export default {
  name: 'app',
  components: {
    'app-audio': appAudio
  },
  created () {
    this.$store.dispatch('login')
  }
}
</script>

<style lang='stylus'>
  @import './common/stylus/variable'
  @import './common/stylus/reset'
  #app
    color: $color-theme
    font-family: Microsoft Yahei, sans-serif
    font-size 16px
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
