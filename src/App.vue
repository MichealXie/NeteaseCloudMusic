<template>
  <div id="app">
    <app-header></app-header>
    <app-tab></app-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import appHeader from '@/components/app-header/app-header'
import appTab from '@/components/tab/tab'

export default {
  name: 'app',
  components: {
    'app-header': appHeader,
    'app-tab': appTab,

  }

}
</script>

<style lang='stylus'>
  @import './common/stylus/variable'
  @import './common/stylus/reset'
  #app
    color: $color-theme
    background-color black
</style>
