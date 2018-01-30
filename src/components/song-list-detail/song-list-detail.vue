<template>
	<div class="song-list-detail">
		<loading v-show="isLoading">∠( ᐛ 」∠)＿</loading>
		<div class="detail-header">
			<common-header>歌单</common-header>
			<router-link :to="'/user-profile/' + songListDetail.creator.userId" class="detail-info" v-if="songListDetail && songListDetail.creator">
				<div class="img-ct">
					<div class="img"><img v-lazy="songListDetail.coverImgUrl"></div>
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
			</router-link>
			<div class="list-data" v-if="songListDetail">
				<div class="icon-ct">
					<i class="fa fa-plus-square-o" aria-hidden="true"></i>
					<p>{{songListDetail.subscribedCount | playcount}}</p>
				</div>
				<router-link :to="'/comments/playlist/' + listId" class="icon-ct" >
					<i class="fa fa-commenting-o" aria-hidden="true"></i>
					<p>{{songListDetail.commentCount | playcount}}</p>
				</router-link>
				<div class="icon-ct">
					<i class="fa fa-share-square-o" aria-hidden="true"></i>
					<p>{{songListDetail.shareCount | playcount}}</p>					
				</div>
			</div>
		</div>
		<div class="detail-list" v-if="songListDetail">
			<ul class="songs">
				<play-all :songListDetail="songListDetail"></play-all>
				<li class="song" v-for="(item, index) in songListDetail.tracks" :key="item.id" @click="playIndexSong(songListDetail.trackIds[index].id,index, songListDetail.tracks)">
					<span class="index">{{index + 1}}</span>
					<div class="info">
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.ar[0].name}} - {{item.al.name}}</div>
					</div>
					<span class="placeholder"></span>
				</li>
			</ul>
		</div>
		<mini-player v-show="playType === 1"></mini-player>
		<mini-FM v-show="playType === 2"></mini-FM>		
	</div>
</template>

<script>
import loading from '@/base/loading/loading'
import commonHeader from '@/base/common-header/common-header'
import miniPlayer from '@/base/mini-player/mini-player'
import miniFM from '@/base/mini-FM/mini-FM'
import playAll from '@/base/play-all/play-all'

import {mapState} from 'vuex'

export default {
	components:{
		loading,
		'common-header': commonHeader,
		'mini-player': miniPlayer,
		'mini-FM': miniFM,
		'play-all': playAll,
	},
	props:[],
	computed: {
		player(){
			return document.getElementById("player")
		},
		listId(){
			return this.$route.params.id
		},
		...mapState([
			'playType',
			'playMode',
			'isLoading',
			'songListDetail',
		])
	},
	methods:{
		playIndexSong(id, index, tracks){
			// 设置为歌单模式
			this.$store.commit('setPlayType', 1)
			this.$store.commit('setIsPlay', false)
			this.$store.dispatch('getSongUrl',id)
			this.$store.commit('setPlayingList',tracks)
			this.$store.commit('setCurrentSongIndex',index)
			this.$store.commit('setIsPlay', true)
		}
	},
	activated () {
		if(this.listId !== this.$store.state.currentListId ) this.$store.dispatch('getSongListDetail', this.listId)
	},
	deactivated () {
		this.$store.commit('setIsLoading', false)
	}
}
</script>

<style lang='stylus' scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.song-list-detail
		padding-bottom 48px
		.detail-header
			color rgba(255,255,255,0.9)
			background-image url('../../assets/background.png')
			background-size cover
			.detail-info
				padding-top 48px
				display flex
				.img-ct
					flex 1
					position relative
					margin 10px 0 0 20px
					.img
						position relative
						gradient-cover()					
						width 100%
						img
							width 100%
					.count
						position absolute
						top 5px 
						right 5px
						font-size 12px
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
