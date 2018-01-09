<template>
	<audio :src="currentSong" ref="player" id="player" @ended="nextSong()"></audio>
</template>

<script>
export default {
	computed: {
		currentSong(){
			return this.$store.state.currentSong
		},
		playingList(){
			return this.$store.state.playingList
		},
		currentSongIndex(){
			return this.$store.state.currentSongIndex
		},
		isPlay(){
			return this.$store.state.isPlay
		},
	},
	methods: {
		nextSong(){
			this.$store.commit('songIndexAddOne')
			let id = this.playingList[this.currentSongIndex].id
			this.$store.dispatch('getSongUrl', id)
		},
	},
	watch: {
		isPlay: function(newV, oldV){
			if(newV === true){
				this.$nextTick( () => {
					this.$refs.player.play()
					console.log(this.$refs.player.duration)
					console.log(this.$refs.player.currentTime)
				})
			}
			else{
				this.$refs.player.pause()
			}
		},
		// 歌曲 url 改变, 马上播放
		currentSong: function(newV,oldV) {
				this.$nextTick( () => {
					this.$refs.player.play()
				})
		}
	},
}
</script>

<style>

</style>
