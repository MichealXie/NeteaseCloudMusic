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

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"

	.app-title
		position relative
		font-size $font-size-medium-x
		padding 10px 0
		background $list-background
		.red-block
			position absolute
			height $font-size-medium
			border 1px solid $color-background
		.title
			padding-left 7px
			font-size 15px
			font-weight 400
			i
				padding-left 5px
				font-weight 100 
				font-size $font-size-medium-x
				color grey

</style>
