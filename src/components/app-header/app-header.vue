<template>
  <div class="app-header">
    <i class="fa fa-microphone" aria-hidden="true"></i>
    <input type="text" placeholder="搜索音乐,歌词,电台">
    <i class="fa fa-headphones" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .app-header
    position: fixed
    height: 44px
    width 100%
    display flex
    align-items center
    color: $color-text
    background $color-background
    i.fa-microphone, i.fa-headphones
      flex 0 0 2.5rem
      text-align center
      font-size 1.5rem
    input 
      flex 1
      width: 100%;
      height: 30px
      line-height: 24px
      font-size: $font-size-small
      color: #666;
      border-radius: 20px
      text-indent: 5%;
</style>
