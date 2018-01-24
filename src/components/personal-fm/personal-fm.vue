<template>
	<div class="player">
		<div class="header">
			<div class="goback" @click="goback()">
				<i class="fa fa-angle-left" aria-hidden="true"></i>
			</div>
			<div class="info">
				<i class="fa fa-heartbeat" aria-hidden="true"></i>
				<div class="name">私人FM</div>
			</div>
		</div>
		<div class="music-center">
			<div class="img"><img v-if="FM" v-lazy="FM.album.picUrl" alt=""></div>
			<span class="song">{{song}}</span>
			<span class="singer">{{singer}}</span>
		</div>
		<div class="control-center">
			<div class="progress-bar">
				<span class="playedTime">{{min}} : {{sec}}</span>
				<div class="full-progress" @click="setTime($event)" id="progressBar">
					<div class="current-progress" ref="currentProgress"></div>
				</div>
				<span class="restTime">{{fullTime}}</span>
			</div>
			<div class="music-ctrl">
				<div class="btn">
					<i class="fa fa-trash" aria-hidden="true"></i>
				</div>
				<div class="btn" @click="toggleLoved()">
					<i class="fa"
					 :class="{
						 'fa-heart-o':!isLoved,
						 'fa-heart loved':isLoved,
					 }"
					 aria-hidden="true"></i>			
				</div>
				<div class="btn">
					<i class="fa play-btn" :class="{'fa-play-circle-o': !isPlay,'fa-pause-circle-o': isPlay}" @click="togglePlay()" aria-hidden="true"></i>
				</div>
				<div class="btn">
					<i class="fa fa-step-forward" aria-hidden="true" @click="nextFM()"></i>
				</div>
				<router-link :to="'/comments/music/' + id" class="btn comment">
					<span class="count">
						{{comments.total | commentCount}}
					</span>
					<i class="fa fa-commenting-o" aria-hidden="true"></i>
				</router-link>
			</div>
		</div>
		<div class="background"><img v-if="FM" :src="FM.album.picUrl" alt=""></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			min:'0',
			sec: '00',
			fullTime: '0: 00',
			commentCount: 0,
		}
	},
	computed: {
		playType(){
			return this.$store.state.playType
		},
		comments(){
			return this.$store.state.comments
		}	,
		id(){
			if(this.FM) return this.FM.id
		},
		song(){
			if(this.FM) return this.FM.name
			else return 'oops'
		},
    lovedSongs(){
      return this.$store.state.lovedSongs
		},
		isLoved(){
			return this.lovedSongs.includes(this.id)
		},
		singer(){
			if(this.FM) return this.FM.artists[0].name
			else return '当前无 FM 播放~'
		},
		player(){
			return document.getElementById('player')
		},
		isPlay(){
			return this.$store.state.isPlay
		},
		FM(){
			return this.$store.state.FM
		},
		progressBarLength(){
			let progressBar = document.getElementById('progressBar')
			if(getComputedStyle(progressBar)) return getComputedStyle(progressBar).width
		},
	},
	methods:{
		togglePlay(){
			this.$store.commit('togglePlay')
		},
		nextFM(){
			this.player.pause()
			// 时间归 0, 好看点
			this.player.currentTime = 0 
			this.$store.dispatch('getFM')
		},
		goback(){
			this.$router.go(-1)
		},
		setTime($event){
			//点击进度条设置时间
			let percentage = $event.offsetX / parseInt(this.progressBarLength)
			this.player.currentTime = percentage * this.player.duration
			this.$refs.currentProgress.style.width = $event.offsetX + 'px'
			this.$store.commit('setIsPlay',true)
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
		getComments(){
			// 歌曲信息里没评论数量, 还得手动获取评论...真滴无语
			let payload = {
				type: 'music',
				id: this.id,
				limit: 1
			}
			this.$store.dispatch('getComments', payload)
		},
		toggleLoved(){
			let payload = {
				isLoved: this.isLoved,
				id: this.id
			}
			this.$store.dispatch('toggleLoved', payload)
		}
	},
	activated () {
		// getFM 会设置playType为2
		if(this.playType === 1) this.$store.dispatch('getFM')
		
		this.$nextTick( () => {
			this.player.addEventListener('timeupdate', () => {
				this.moveProgress()
				this.setPlayedTime()
				this.setFulltTime()
			})
		})
	},
	watch: {
		id: function(newVal){
			this.$nextTick( () => {
				this.getComments()
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
	.player
		height 100vh
		width 100%
		overflow hidden
		background-size cover
		background-repeat no-repeat
		.background
			position fixed
			top 0 
			left 0
			right 0 
			bottom 0
			min-width 375px
			min-height 100vh
			z-index -2
			overflow hidden
			background-size cover
			background-position 50%
			background-color #555
			filter: blur(20px) brightness(80%)
			transition 1s all linear
			gradient-cover()
			margin -30px
			// 没有歌曲时的背景
			background: url('./background.png')
			img
				height 100%
				width 100%
		.header
			height 48px
			width 100%
			display flex
			color white
			.goback
				flex 0 0 48px
				flex-center()
				font-size 28px
			.goback
				font-size 36px
			.info
				flex 1
				display flex
				align-items center
				font-size 20px
				&>*
					padding-left 20px
		.music-center
			position relative
			overflow hidden
			height 450px
			.img
				padding-top 50px
				flex-center()
				img 
					width 90%
					transition 1s all linear
			.song, .singer
				position absolute
				middleX()
				width 80%
				text-align center
			.song
				top 88%
				color white
			.singer
				top 95%
				color $not-important
				font-size 14px
		.control-center
			position absolute
			bottom 50px
			width 100%
			.progress-bar
				display flex
				align-items center
				margin 20px 0 
				.full-progress
					flex 1
					background white
					height 4px
					.current-progress
						position relative
						background $color-background
						height 4px
						width 0
						transition .3s 
						&:after
							content ''
							position absolute
							right 0
							top 0
							transform translate(30%, -40%)
							border 5px solid white
							border-radius 50%
							background $color-background
							width 4px
							height 4px
				.playedTime, .restTime
					flex 0 0 60px
					flex-center()
					font-size $font-size-small
					color $list-background
			.music-ctrl
				display flex
				justify-content space-around
				align-items center
				color $list-background
				font-size 24px
				height 50px
				.btn
					position relative
					height 50px
					width 20%
					flex-center()
					.play-btn
						font-size 50px
					i 
						transition .5s all linear
					.loved
						color #f33
					.count
						position absolute
						top 5px
						left 50%
						font-size 12px
</style>
