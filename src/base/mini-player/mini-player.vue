<template>
	<div class="mini-player">
		<div class="img-ct">
			<img class="cover" src="http://p3.music.126.net/SpOw9nHtbBKnNhUYKevOaw==/7880199836658654.jpg">
		</div>
		<div class="name"></div>
		<div class="play-btn">
			<i class="fa" :class="{'fa-play-circle-o': isPlay,'fa-pause-circle-o': !isPlay}" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		isPlay(){
			return this.$store.state.isPlay
		}
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"

	.mini-player
		position fixed
		bottom 0
		z-index 100
		height 48px
		width 100%
		background rgba(255, 255, 255, 0.9)
		display flex
		.img-ct
			flex 0 0 56px
			flex-center()
			.cover
				width 80%
				height 80%
		.name
			flex 1
		.play-btn
			flex 0 0 56px
			font-size 30px
			flex-center()
</style>
