<template>
	<div class="player">
		<audio :src="currentSong" ref="player"></audio>
		<div class="header">
			<div class="goback" @click="hidePlayer()">
				<i class="fa fa-angle-left" aria-hidden="true"></i>
			</div>
			<div class="info">
				<span class="song" v-if="playingList[currentSongIndex]">{{playingList[currentSongIndex].name}}</span>
				<span class="singer" v-if="playingList[currentSongIndex]">{{playingList[currentSongIndex].ar[0].name}}</span>
			</div>
			<div class="share">
				<i class="fa fa-share-alt" aria-hidden="true"></i>
			</div>
		</div>
		<div class="music-center">
			<div class="black-circle">
				<img :src="playingList[currentSongIndex].al.picUrl" alt="">
			</div>
		</div>
		<div class="control-center">
			<div class="music-info">
				<i class="fa fa-heart-o" aria-hidden="true"></i>
				<i class="fa fa-download" aria-hidden="true"></i>
				<i class="fa fa-commenting-o" aria-hidden="true"></i>
				<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
			</div>
			<div class="progress-bar">
				<span class="playedTime">{{min}} : {{sec}}</span>
				<div class="full-progress" @click="setTime($event)" ref="progressBar">
					<div class="current-progress" ref="currentProgress"></div>
				</div>
				<span class="restTime">{{fullTime}}</span>
			</div>
			<div class="music-ctrl">
				<i class="fa fa-random" aria-hidden="true"></i>
				<i class="fa fa-step-backward" aria-hidden="true"></i>
				<i class="fa play-btn" :class="{'fa-play-circle-o': !isPlay,'fa-pause-circle-o': isPlay}" @click="togglePlay()" aria-hidden="true"></i>
				<i class="fa fa-step-forward" aria-hidden="true"></i>
				<i class="fa fa-list" aria-hidden="true"></i>
			</div>
		</div>
		<div class="background" :style="'background-image:url(' +  playingList[currentSongIndex].al.picUrl + ')'"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			min:'',
			sec: '',
			fullTime: ''
		}
	},
	computed: {
		currentSong(){
			return this.$store.state.currentSong
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
		progressBarLength(){
			return getComputedStyle(this.$refs.player).width
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
		},
		setTime($event){
			//点击进度条设置时间
			let percentage = $event.offsetX / parseInt(this.progressBarLength)
			this.$refs.player.currentTime = percentage * this.$refs.player.duration
			this.$refs.currentProgress.style.width = $event.offsetX + 'px'
		},
		 moveProgress(){
			this.$refs.currentProgress.style.width = (this.$refs.player.currentTime / this.$refs.player.duration) * parseInt(this.progressBarLength) + "px"
		},
		setPlayedTime(){
			this.min = Math.floor(this.$refs.player.currentTime / 60)
			let sec = Math.floor(this.$refs.player.currentTime % 60)
			if(sec < 10) this.sec = '0' + sec
			else this.sec = sec
		},
		setFulltTime(){
			let min = Math.floor(this.$refs.player.duration / 60)
			let sec = Math.floor(this.$refs.player.duration % 60)
			if(sec < 10) sec = '0' + sec
			console.log(min + ':' + sec)
			this.fullTime =  min + ':' + sec
		}
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
	mounted () {
		this.$nextTick( () => {
			this.$refs.player.addEventListener('timeupdate', () => {
				this.moveProgress()
				this.setPlayedTime()
				this.setFulltTime()
			})
		})
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
	.player
		position fixed
		z-index 999
		background white
		top 0
		height 100vh
		width 100%
		overflow hidden
		.background
			position fixed
			top 0 
			left 0
			width 375px
			height 100vh
			z-index -2
			overflow hidden
			background-size cover
			background-position top 25% left 25% 
			filter: blur(20px) brightness(80%)
		.header
			height 48px
			width 100%
			display flex
			border-1px()
			.goback, .share
				flex 0 0 48px
				flex-center()
				font-size 28px
			.goback
				font-size 36px
			.info
				flex 1
				display flex
				flex-direction column
				justify-content space-around
				.song
					color white
					font-size $font-size-large-x
				.singer
					color $not-important
		.music-center
			flex-center()
			.black-circle
				position relative
				padding-top 50%
				border 20px solid black
				border-radius 50%
				overflow hidden
				width 50%
				height 50%
				img 
					position absolute
					top 0
					left 0
					width 100%
					height 100%
		.control-center
			position absolute
			bottom 20px
			width 100%
			.music-info, .music-ctrl
				display flex
				justify-content space-around
				align-items center
				color $list-background
				font-size 24px
			.music-info
				height 35px
				padding 0 15px
			.progress-bar
				display flex
				align-items center
				margin 20px 0 
				.full-progress
					flex 1
					background white
					height 4px
					.current-progress
						background $color-background
						height 4px
						width 0
				.playedTime, .restTime
					flex 0 0 60px
					flex-center()
					font-size $font-size-small
					color $list-background
			.music-ctrl
				height 50px
				.play-btn
					font-size 50px
		
			
					

</style>
