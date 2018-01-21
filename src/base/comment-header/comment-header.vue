<template>
	<div class="comment-header">
		<div class="back" @click="goback()"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>
		<div class="info">评论({{comments.total}})</div>
	</div>
</template>

<script>
export default {
	computed: {
		comments(){
			return this.$store.state.comments
		}	
	},
	methods: {
		goback(){
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.comment-header
		display flex
		align-items center 
		position fixed
		top 0
		width 100%
		height 48px
		background-color $color-background
		color white
		.back
			flex 0 0 58px
			flex-center()
			font-size 24px
</style>
