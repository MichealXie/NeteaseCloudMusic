<template>
	<div class="comment-info">
		<div class="img"><img v-lazy="songListDetail.coverImgUrl"></div>
		<div class="info">
			<div class="list-name">{{songListDetail.name}}</div>
			<div class="nickname">{{songListDetail.creator.nickname}}</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		songListDetail(){
			return this.$store.state.songListDetail
		},
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.comment-info
		padding-top 48px
		display flex
		align-items center		
		background-color $list-background
		.img
			flex 0 0 72px
			img 
				width 56px
				height 56px
				padding 8px
		.info
			flex 1
			display flex
			flex-direction column
			padding-left 10px
			.list-name
				padding 3px
			.nickname
				font-size 12px
				color $not-important
</style>
