<template>
	<audio :src="currentSong" ref="player" id="player"></audio>
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
	watch: {
		isPlay: function(newV, oldV){
			if(newV === true){
				this.$nextTick( () => {
					this.$refs.player.play()
					console.log(this.$refs.player)
					console.log(this.$refs.player.duration)
					console.log(this.$refs.player.currentTime)
					console.log(this.$refs.player.duration)					
				})
			}
			else{
				this.$refs.player.pause()
			}
		},
		currentSong: function(newV,oldV) {
			if(oldV !== ''){
				this.$nextTick( () => {
					this.$refs.player.play()
				})
			}
		}
	},
}
</script>

<style>

</style>
