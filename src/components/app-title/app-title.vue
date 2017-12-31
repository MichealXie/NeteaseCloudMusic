<template>
	<div class="app-title">
		<span class="red-block"></span>
		<h3 class="title">
			<slot></slot>
			<i class="fa fa-angle-right" aria-hidden="true"></i>
		</h3>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"

	.app-title
		position relative
		font-size $font-size-medium-x
		padding .5rem 0
		.red-block
			position absolute
			height $font-size-medium
			border 1px solid $color-background
		.title
			padding-left .7rem
			font-size $font-size-medium
			font-weight 350
			i
				font-weight 100 
				font-size $font-size-large
				color grey

</style>
