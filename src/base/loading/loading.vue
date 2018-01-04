<template>
	<div class="loading">
		<i class="fa fa-cog fa-spin fa-3x fa-fw margin-bottom"></i>
		<span>加载中</span>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped lang='stylus'>
  @import "../../common/stylus/mixin"

	.loading
		position: fixed
		top: 50%
		left 50%
		transform translate(-50%,-100%)
		display flex
		justify-content space-around
		align-items center
		flex-direction column
		width 91px
		height 104px
		background rgba(17, 17, 17, 0.7)
		color white
		z-index 999
		span 
			font-size 14px
</style>
