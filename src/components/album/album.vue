<template>
	<div class="album">
		<loading v-show="!albumSongs.length"></loading>
		<div class="detail-header">
			<common-header>专辑</common-header>
			<div class="detail-info">
				<div class="img-ct">
					<img v-if="albumInfo" :src="albumInfo.blurPicUrl">
				</div>
				<div class="list-creator">
						<span class="name" v-if="albumInfo">{{albumInfo.name}}</span>
						<span class="singer" v-if="albumSongs[0]">歌手: {{albumSongs[0].ar[0].name}}</span>
				</div>
			</div>
			<div class="list-data">
				<div class="icon-ct">
					<i class="fa fa-plus-square-o" aria-hidden="true"></i>
					<p v-if="albumInfo.info">{{albumInfo.info.resourceId | playcount}}</p>
				</div>
				<div class="icon-ct">
					<i class="fa fa-commenting-o" aria-hidden="true"></i>
					<p v-if="albumInfo.info">{{albumInfo.info.commentCount | playcount}}</p>
				</div>
				<div class="icon-ct">
					<i class="fa fa-share-square-o" aria-hidden="true"></i>
					<p v-if="albumInfo.info">{{albumInfo.info.shareCount | playcount}}</p>					
				</div>
			</div>
		</div>
		<div class="detail-list">
			<ul class="songs">
				<li class="song" v-for="(item, index) in albumSongs" :key="item.id" @click="playIndexSong(albumSongs[index].id,index, albumSongs)">
					<span class="index">{{index + 1}}</span>
					<div class="info">
						<div class="name">{{item.name}}</div>
						<div class="singer">{{item.ar[0].name}}</div>
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
import miniFM from '@/base/mini-FM/mini-FM'
import miniPlayer from '@/base/mini-player/mini-player'

import {mapState} from 'vuex'

export default {
	components:{
		loading,
		'common-header': commonHeader,
		'mini-player': miniPlayer,
		'mini-FM': miniFM,
	},
	methods: {
		goback(){
			history.back()
		}
	},
	computed: {
		...mapState([
			'playType',
			'albumSongs',
			'albumInfo',
		]),
		player(){
			return document.getElementById("player")
		},
	},
	methods: {
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
		this.$store.dispatch('getAlbum',this.$route.params.id)
	}
}
</script>

<style lang='stylus' scoped>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

	.album
		.detail-header
			color rgba(255,255,255,0.9)
			background-color #222225
			background-size cover
			.detail-info
				display flex
				padding-top 48px
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
					display flex
					flex-direction column
					justify-content center
					.name
						font-size 20px
						padding 8px 0
					.singer
						default-singer()
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
				padding-bottom 48px			
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
