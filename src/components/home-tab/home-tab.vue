<template>
	<div class="tab">
		<router-link tag="div" to="/home/recommend" class="tab-item">
			<span class="tab-link">个性推荐</span>
		</router-link>
		<router-link tag="div" to="/home/song-lists" class="tab-item">
			<span class="tab-link">歌单</span>
		</router-link>
		<router-link tag="div" to="/home/rank" class="tab-item">
			<span class="tab-link">排行榜</span>
		</router-link>
	</div>
</template>

<script>
export default {

}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  .tab
    position fixed
    display: flex
    width 100%
    height: 40px
    line-height: 44px
    font-size: $font-size-medium
    z-index: 999
    background: white
    margin-top 48px
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 7px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-background
          border-bottom: 2px solid $color-background
</style>
