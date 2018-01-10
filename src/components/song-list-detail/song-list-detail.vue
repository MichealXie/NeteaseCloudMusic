<template>
	<div class="song-list-detail">
		<loading v-show="isLoading"></loading>
		<div class="detail-header">
			<div class="top">
				<div class="icon" @click="goback()">
					<i class="fa fa-chevron-left" aria-hidden="true"></i>
				</div>
				<p class="title">歌单</p>
				<router-link to="/player" class="icon">
					<i aria-hidden="true" class="fa fa-headphones"></i>
				</router-link>
			</div>
			<div class="detail-info" v-if="songListDetail && songListDetail.creator">
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
						<img v-lazy="songListDetail.creator.avatarUrl">
						<span class="nickname">{{songListDetail.creator.nickname}}</span>
					</div>
				</div>
			</div>
			<div class="list-data" v-if="songListDetail">
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
		<div class="detail-list" v-if="songListDetail">
			<ul class="songs">
				<li class="song" v-for="(item, index) in songListDetail.tracks" :key="item.id" @click="playSong(songListDetail.trackIds[index].id,index, songListDetail.tracks)">
					<span class="index">{{index + 1}}</span>
					<div class="info">
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.ar[0].name}} - {{item.al.name}}</div>
					</div>
					<span class="placeholder"></span>
				</li>
			</ul>
		</div>
		<mini-player></mini-player>
	</div>
</template>

<script>
import loading from '@/base/loading/loading'
import miniPlayer from '@/base/mini-player/mini-player'

export default {
	components:{
		loading,
		'mini-player': miniPlayer
	},
	computed: {
		isLoading(){
			return this.$store.state.isLoading
		},
		songListDetail(){
			return this.$store.state.songListDetail
		},
		listId(){
			return this.$route.params.id
		}
	},
	methods:{
		goback(){
			this.$router.go(-1)
		},
		playSong(id, index, tracks){
			this.$store.commit('setIsPlay', false)
			this.$store.dispatch('getSongUrl',id)
			this.$store.commit('setPlayingList',tracks)
			this.$store.commit('setCurrentSongIndex',index)
			this.$store.commit('setIsPlay', true)
		}
	},
	created () {
		this.$store.dispatch('getSongListDetail', this.listId)
	},
	watch: {
		listId:function(newV,oldV){
			this.$store.dispatch('getSongListDetail', this.listId)
		}
	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.song-list-detail
		padding-bottom 48px
		.detail-header
			color rgba(255,255,255,0.9)
			background-image url('./background.png')
			background-size cover
			.top
				display flex
				align-items center
				height 48px
				width 100%
				background url('./background.png')
				background-size cover				
				position fixed
				z-index 2
				.title
					flex 1
					text-align center
				.icon
					flex 0 0 24px
					padding 10px
					font-size 24px
					color white
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
			background $list-background
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
