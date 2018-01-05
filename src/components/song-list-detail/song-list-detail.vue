<template>
	<div class="song-list-detail">
		<loading v-show="!Object.keys(songListDetail).length"></loading>
		<div class="detail-header">
			<div class="top">
				<div class="icon" @click="goback()">
					<i class="fa fa-chevron-left" aria-hidden="true"></i>
				</div>
				<p class="title">歌单</p>
				<div class="icon">
					<i aria-hidden="true" class="fa fa-headphones"></i>
				</div>
			</div>
			<div class="detail-info">
				<div class="img-ct">
					<img v-lazy="songListDetail.creator.backgroundUrl">
					<span class="count">
						<i class="fa fa-headphones" aria-hidden="true"></i>
						{{songListDetail.playCount  | playcount}}
					</span>
				</div>
				<div class="list-creator">
						{{songListDetail.name}}
					<div class="creator-info">
						<img v-lazy="songListDetail.creator.avatarUrl" alt="">
						<span class="nickname">{{songListDetail.creator.nickname}}</span>
					</div>
				</div>
			</div>
			<div class="list-data">
				<div class="icon-ct">
					<i class="fa fa-plus-square-o" aria-hidden="true"></i>
					<p>{{songListDetail.subscribedCount | playcount}}</p>
				</div>
				<div class="icon-ct">
					<i class="fa fa-commenting-o" aria-hidden="true"></i>
					<p>{{songListDetail.trackCount | playcount}}</p>
				</div>
				<div class="icon-ct">
					<i class="fa fa-share-square-o" aria-hidden="true"></i>
					<p>{{songListDetail.shareCount | playcount}}</p>					
				</div>
			</div>
		</div>
		<div class="detail-list">
			<ul class="songs">
				<li class="song" v-for="(item, index) in songListDetail.tracks" :key="item.id">
					<span class="index">{{index + 1}}</span>
					<div class="info">
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.ar[0].name}} - {{item.al.name}}</div>
					</div>
					<span class="placeholder"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import loading from '@/base/loading/loading'

export default {
	components:{
		loading,
	},
	computed: {
		songListDetail(){
			return this.$store.state.songListDetail
		}
	},
	methods:{
		goback(){
			history.back()
		}
	},
	activated () {
		this.$store.dispatch('getSongListDetail',this.$route.params.id)
	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.song-list-detail
		.detail-header
			color rgba(255,255,255,0.9)
			background url('./background.png')
			.top
				display flex
				align-items center
				height 48px
				width 100%
				background url('./background.png') no-repeat
				position fixed
				z-index 2
				.title
					flex 1
					text-align center
				.icon
					flex 0 0 24px
					padding 10px
			.detail-info
				padding-top 48px
				display flex
				.img-ct
					flex 1
					position relative
					margin 10px 0 0 20px
					img 
						width 100%
					.count
						position absolute
						top 5px 
						right 5px
				.list-creator
					flex 2
					margin-left 20px
					padding-top 25px
					.creator-info
						display flex
						align-items center
						margin-top 20px
						img 
							width 30px
							border-radius 50%
						.nickname
							padding 5px
							font-size: $font-size-medium
							color rgba(255,255,255,0.7)
			.list-data
				display flex
				.icon-ct
					flex 1
					display flex
					align-items center
					flex-direction column
					padding 8px 0
					font-size $font-size-small				
					i 
						font-size $font-size-large-x
						padding 8px 0
		.detail-list
			.songs
				.song
					display flex
					no-wrap()
					.index
						flex 0 0 40px
						height 50px
						color $not-important
						flex-center()
					.info
						flex 1
						display flex
						flex-direction column
						justify-content center
						width calc(100% - 80px)
						border-1px()
						.name
							width 100%
							song-name()
							no-wrap()
						.singer
							width 100%
							default-singer()
							no-wrap()
					.placeholder
						flex 20px
						border-1px()


						
						



		
</style>
