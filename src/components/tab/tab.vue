<template>
	<div class="tab">
		<router-link tag="div" to="/recommend" class="tab-item">
			<span class="tab-link">个性推荐</span>
		</router-link>
		<router-link tag="div" to="/song-list" class="tab-item">
			<span class="tab-link">歌单</span>
		</router-link>
		<router-link tag="div" to="/rank" class="tab-item">
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
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-background
          border-bottom: 2px solid $color-background
</style>
