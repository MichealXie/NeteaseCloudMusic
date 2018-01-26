<template>
	<div class="play-all" @click="playSong(songListDetail.trackIds, songListDetail.tracks)">
		<i class="fa fa-play-circle-o" aria-hidden="true"></i>
		<div class="play">
			播放全部
			<span class="count" v-if="songListDetail.trackIds">(共{{songListDetail.trackIds.length}}首)</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		songListDetail: Object
	},
	methods: {
		playSong(trackIds, tracks){
			let id = trackIds[0].id,
			index = 0
			if(this.playMode === 2) {
				index = Math.round(Math.random() * tracks.length)
				id = tracks[index].id
			}
			// 设置为歌单模式
			this.$store.commit('setPlayType', 1)	
			this.$store.commit('setIsPlay', false)
			this.$store.dispatch('getSongUrl',id)
			this.$store.commit('setPlayingList',tracks)
			this.$store.commit('setCurrentSongIndex',index)
			this.$store.commit('setIsPlay', true)
		},
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"

	.play-all
		display flex
		color black
		.fa
			flex 0 0 40px
			height 50px
			font-size 24px
			color $not-important
			flex-center()
		.play
			flex 1
			width calc(100% - 80px)
			border-1px()
			display flex
			align-items center
			.count
				default-singer()
</style>
