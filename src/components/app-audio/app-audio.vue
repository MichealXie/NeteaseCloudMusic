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
			this.$store.commit('setIsPlay', false)			
			this.$store.commit('songIndexAddOne')
			let id = this.playingList[this.currentSongIndex].id
			this.$store.dispatch('getSongUrl', id)
			this.$store.commit('setIsPlay', true)			
		},
		prevSong(){
			this.$store.commit('setIsPlay', false)
			this.$store.commit('songIndexReduceOne')
			let id = this.playingList[this.currentSongIndex].id
			this.$store.dispatch('getSongUrl', id)
			this.$store.commit('setIsPlay', true)
		},
		addVolumn(){
			this.$refs.player.volume += 0.1
		},
		reduceVolumn(){
			this.$refs.player.volume -= 0.1
		}
	},
	mounted () {
		this.$refs.player.volume = 0.5
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
