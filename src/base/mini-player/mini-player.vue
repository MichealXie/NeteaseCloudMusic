<template>
	<div class="mini-player">
		<router-link to="/player" class="img-ct">
			<img class="cover" :src="img">
		</router-link>
		<router-link to="/player" class="info">
			<span class="song">{{song}}</span>
			<span class="singer">{{singer}}</span>
		</router-link>
		<div class="play-btn" @click="togglePlay()">
			<i class="fa" :class="{'fa-play-circle-o': !isPlay,'fa-pause-circle-o': isPlay}" aria-hidden="true"></i>
		</div>
		<div class="next-btn" @click="nextSong()">
			<i class="fa fa-step-forward" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		img(){
			if(this.playingList[this.currentSongIndex]) return this.playingList[this.currentSongIndex].al.picUrl
			else{
				return ''
			}
		},
		song(){
			if(this.playingList[this.currentSongIndex]) return this.playingList[this.currentSongIndex].name
			else{
				return "oops!"
			}
		},
		singer(){
			if(this.playingList[this.currentSongIndex]) return this.playingList[this.currentSongIndex].ar[0].name
			else{
				return "当前未播放~"
			}
		},
		player(){
			return document.getElementById('player')
		},
		isPlay(){
			return this.$store.state.isPlay
		},
		currentSongIndex(){
			return this.$store.state.currentSongIndex
		},
		playingList(){
			return this.$store.state.playingList
		},
	},
	methods: {
		togglePlay(){
			this.$store.commit('togglePlay')
			if(this.isPlay) this.player.pause()
			if(!this.isPlay) this.player.play()
		},
		nextSong(){
			this.$store.commit('setIsPlay', false)			
			this.$store.commit('songIndexAddOne')
			let id = this.playingList[this.currentSongIndex].id
			this.$store.dispatch('getSongUrl', id)
			this.$store.commit('setIsPlay', true)
		},
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
		.info
			flex 1
			display flex
			flex-direction column
			justify-content space-around
			.song
				song-name()
				padding 0
			.singer
				default-singer()
		.play-btn, .next-btn
			flex 0 0 56px
			font-size 30px
			flex-center()
</style>
