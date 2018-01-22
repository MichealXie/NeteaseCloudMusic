<template>
  <div id="app">
    <transition name="">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <app-audio ref="player"></app-audio>
  </div>
</template>

<script>
import appAudio from '@/components/app-audio/app-audio'

export default {
  name: 'app',
  components: {
    'app-audio': appAudio
  },
  computed: {
    lovedSongs(){
      return this.$store.state.lovedSongs
    }
  },
  methods: {
  },
  created () {
    if(localStorage.myInfo){
      let info = JSON.parse(localStorage.myInfo)
      this.$store.commit('setIsLogin', true)
      this.$store.dispatch('login', info)
      this.$router.push('/home/recommend')
    }
    else{
      this.$router.push('/login')
    }
  },
  mounted () {
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
    // chrome 自动填充input 会变黄, 很讨厌啊
    input:-webkit-autofill 
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      -webkit-text-fill-color: #333;
</style>
