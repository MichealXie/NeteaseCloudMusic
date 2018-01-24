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
		id(){
			if(this.playingList[this.currentSongIndex]) return this.playingList[this.currentSongIndex].id
		},
		isPlay(){
			return this.$store.state.isPlay
		},
		player(){
			return document.getElementById('player')
		},
		playType(){
			return this.$store.state.playType
		}
	},
	methods: {
		nextSong(){
			// FM 模式
			if(this.playType === 2){
				this.$store.dispatch('getFM')
			}
			// 歌单模式
			else if(this.playType === 1){
				// 单曲循环直接重新开始放
				if(this.playMode === 0){
					this.player.currentTime = 0 
					return
				}
				else{
					// 先暂停...再决定下一个的 index 最后拿 url, 拿到歌曲后在 store 里设置 isPlay 为 true
					this.player.pause()
					// 时间归 0, 好看点
					this.player.currentTime = 0 
					this.$store.commit('changeSongIndex')
					this.$store.commit('setIsPlay', false)
					this.$store.dispatch('getSongUrl', this.id)
				}
			}
		},
		prevSong(){
			this.player.pause()
			// 时间归 0, 好看点
			this.player.currentTime = 0 
			this.$store.commit('songIndexReduceOne')
			this.$store.commit('setIsPlay', false)
			this.$store.dispatch('getSongUrl', this.id)
		},
		addVolume(){
			if(this.$refs.player.volume <= 0.9) this.$refs.player.volume += 0.1
		},
		reduceVolume(){
			if(this.$refs.player.volume >= 0.1) this.$refs.player.volume -= 0.1
		}
	},
	mounted () {
		this.$refs.player.volume = 0.5
	},
	watch: {
		// 歌曲 url 改变, 马上播放
		currentSong: function(newV,oldV) {
			this.$nextTick( () => {
				this.$refs.player.play()
			})
		},
		
	},
}
</script>

<style>

</style>
