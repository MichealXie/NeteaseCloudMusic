<template>
	<p class="error">
		Oops, 网络好像出了点问题
	</p>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"
  @import "../../common/stylus/variable"

	.error
		position fixed
		top 40%
		middleX()
		padding 10px
		line-height 1.2
		width 70%
		text-align center 
		border-radius 4px
		color $color-background
		background-color rgba(55, 55, 55, 0.3)
		
</style>
