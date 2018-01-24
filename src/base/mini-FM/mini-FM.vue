<template>
	<div class="mini-FM">
		<router-link to="/personal-fm" class="img-ct">
			<img class="cover" :src="img">
		</router-link>
		<router-link to="/personal-fm" class="info">
			<span class="song">{{song}}</span>
			<span class="singer">{{singer}}</span>
		</router-link>
		<div class="btn" @click="toggleLoved()">
			<i class="fa" :class="{ 'fa-heart-o':!isLoved, 'fa-heart loved':isLoved, }" aria-hidden="true"></i>			
		</div>
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
		id(){
			if(this.FM) return this.FM.id
		},
		FM(){
			return this.$store.state.FM
		},
		song(){
			if(this.FM) return this.FM.name
			else return 'oops'
		},
		singer(){
			if(this.FM) return this.FM.artists[0].name
			else return '当前无 FM 播放~'
		},
    lovedSongs(){
      return this.$store.state.lovedSongs
		},
		isLoved(){
			return this.lovedSongs.includes(this.id)
		},
		img(){
			if(this.FM) return this.FM.album.picUrl
		},
		player(){
			return document.getElementById('player')
		},
		isPlay(){
			return this.$store.state.isPlay
		},
	},
	methods: {
		toggleLoved(){
			let payload = {
				isLoved: this.isLoved,
				id: this.id
			}
			this.$store.dispatch('toggleLoved', payload)
		},
		togglePlay(){
			this.$store.commit('togglePlay')
		},
		nextSong(){
			this.$store.dispatch('getFM')
		},
	}
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"

	.mini-FM
		position fixed
		bottom 0
		z-index 100
		height 48px
		width 100%
		background rgba(255, 255, 255, 0.9)
		display flex
		border-1px()
		.img-ct
			flex 0 0 56px
			flex-center()
			.cover
				width 40px
				height 40px
				background-image url('../../assets/loading.png')
				background-size contain
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
		.play-btn, .next-btn, .btn
			flex 0 0 56px
			font-size 30px
			flex-center()
			color $not-important
		.next-btn, .btn
			font-size 24px
			i 
				transition .5s all linear
			.loved
				color #f33
</style>
