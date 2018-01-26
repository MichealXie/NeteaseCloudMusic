<template>
  <div id="app">
    <transition name="">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <app-audio ref="player"></app-audio>
    <transition name="slide-fade">
      <keep-alive>
        <error v-show="isError"></error>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import appAudio from '@/components/app-audio/app-audio'
import error from '@/base/error/error'

export default {
  name: 'app',
  components: {
    'app-audio': appAudio,
    error,
  },
  computed: {
    isError(){
      return this.$store.state.isError
    },
    isLogin(){
      return this.$store.state.isLogin
    },
    lovedSongs(){
      return this.$store.state.lovedSongs
    }
  },
  created () {
  },
  mounted () {
    // 我们去哪?
    if(this.isLogin) this.$router.push('/home')
    else this.$router.push('/login')
    // 快捷键绑定
    window.addEventListener('keypress', (e) => {
      if(e.key === 'l' && e.ctrlKey){
        this.$refs.player.nextSong()
      }
      if(e.key === 'j' && e.ctrlKey){
        this.$refs.player.prevSong()
      }
      if(e.key === 'i' && e.ctrlKey){
        this.$refs.player.addVolume()
      }
      if(e.key === 'k' && e.ctrlKey){
        this.$refs.player.reduceVolume()
      }
    })
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

    .slide-fade-enter-active 
      transition: all .3s ease;

    .slide-fade-leave-active 
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

    .slide-fade-enter, .slide-fade-leave-to
      transform: translateX(-5px);
      opacity: 0;

    // chrome 自动填充input 会变黄, 很讨厌啊
    input:-webkit-autofill 
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      -webkit-text-fill-color: #333;
</style>
