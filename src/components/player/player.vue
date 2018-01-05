<template>
	<div class="player">
		<audio :src="currentSong" ref="player"></audio>
		<div class="header">
			<div class="goback" @click="hidePlayer()">
				<i class="fa fa-angle-left" aria-hidden="true"></i>
			</div>
			<div class="name">
				<span class="song"></span>
				<span class="singer"></span>
			</div>
		</div>
		<i class="fa" :class="{'fa-play-circle-o': isPlay,'fa-pause-circle-o': !isPlay}" @click="togglePlay()" aria-hidden="true"></i>
	</div>
</template>

<script>
export default {
	computed: {
		currentSong(){
			return this.$store.state.currentSong
		},
		isPlay(){
			return this.$store.state.isPlay
		},
	},
	methods:{
		togglePlay(){
			this.$store.commit('togglePlay')
			if(this.isPlay) this.$refs.player.pause()
			if(!this.isPlay) this.$refs.player.play()
		},
		hidePlayer(){
			this.$store.commit('hidePlayer')
		}
	}
}
</script>

<style lang="stylus">
	.player
		position fixed
		z-index 999
		background white
		top 0
		height 100vh
		width 100%
</style>
