<template>
	<div class="player">
		<div class="header">
			<div class="goback" @click="goback()">
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
			<img src="../../assets/play-controler.png" alt="" class="hook">
			<div class="black-circle" :class="{'spin': isPlay}">
				<img v-if="playingList[currentSongIndex]" :src="playingList[currentSongIndex].al.picUrl" alt="">
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
				<div class="full-progress" @click="setTime($event)" id="progressBar">
					<div class="current-progress" ref="currentProgress"></div>
				</div>
				<span class="restTime">{{fullTime}}</span>
			</div>
			<div class="music-ctrl">
				<i class="fa fa-random" aria-hidden="true"></i>
				<i class="fa fa-step-backward" aria-hidden="true" @click="prevSong()"></i>
				<i class="fa play-btn" :class="{'fa-play-circle-o': !isPlay,'fa-pause-circle-o': isPlay}" @click="togglePlay()" aria-hidden="true"></i>
				<i class="fa fa-step-forward" aria-hidden="true" @click="nextSong()"></i>
				<i class="fa fa-list" aria-hidden="true"></i>
			</div>
		</div>
		<div class="background" v-if="playingList[currentSongIndex]" :style="'background-image:url(' +  playingList[currentSongIndex].al.picUrl + ')'"></div>
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
		progressBarLength(){
			let progressBar = document.getElementById('progressBar')
			return getComputedStyle(progressBar).width
		},
	},
	methods:{
		togglePlay(){
			this.$store.commit('togglePlay')
		},
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
		goback(){
			this.$router.go(-1)
		},
		setTime($event){
			//点击进度条设置时间
			let percentage = $event.offsetX / parseInt(this.progressBarLength)
			console.log(percentage)
			this.player.currentTime = percentage * this.player.duration
			console.log(this.player.currentTime)
			console.log(this.player.duration)
			this.$refs.currentProgress.style.width = $event.offsetX + 'px'
		},
		 moveProgress(){
			this.$refs.currentProgress.style.width = (this.player.currentTime / this.player.duration) * parseInt(this.progressBarLength) + "px"
		},
		setPlayedTime(){
			this.min = Math.floor(this.player.currentTime / 60)
			let sec = Math.floor(this.player.currentTime % 60)
			if(sec < 10) this.sec = '0' + sec
			else this.sec = sec
		},
		setFulltTime(){
			let min = Math.floor(this.player.duration / 60)
			let sec = Math.floor(this.player.duration % 60)
			if(sec < 10) sec = '0' + sec
			this.fullTime =  min + ':' + sec
		},
	},
	mounted () {
		this.$nextTick( () => {
			this.player.addEventListener('timeupdate', () => {
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
		background-image url('./background.png')
		background-size cover
		background-repeat no-repeat
		.background
			position fixed
			top 0 
			left 0
			width 375px
			height 100vh
			z-index -2
			overflow hidden
			background-size cover
			background-position 50%
			filter: blur(20px) brightness(80%)
			transition opacity .3s linear
		.header
			height 48px
			width 100%
			display flex
			border-1px()
			color white
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
					font-weight 300
					no-wrap()
					width 279px
				.singer
					color $not-important
					font-weight 300
					font-size 14px	
					no-wrap()
					width 279px				
		.music-center
			position relative
			overflow hidden
			height 500px
			.hook
				position absolute
				top -20px
				left 50%
				transform translateX(-20%)
				height 180px
				z-index 10
			.black-circle
				position absolute
				top 88px
				left calc(50% - 150px)
				background-image url('../../assets/cd-wrapper.png')
				background-size contain
				background-repeat no-repeat
				width 300px
				height 300px
				overflow hidden
				margin 0 auto
				flex-center()
				&.spin
					animation fa-spin 20s infinite linear
				img 
					width 65%
					height 65%
					border-radius 50%
					// background-image url('../../assets/loading.png')
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
