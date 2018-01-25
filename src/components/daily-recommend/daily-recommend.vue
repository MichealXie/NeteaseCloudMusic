<template>
	<div class="daily-recommend">
		<loading v-show="!Object.keys(songLists).length">ԅ(¯﹃¯ԅ)</loading>
		<common-header>每日歌曲推荐</common-header>
		<div class="banner">
			<img v-if="recommendMV[0]" :src="recommendMV[0].picUrl" alt="">
		</div>
		<play-all :songListDetail="songListDetail"></play-all>
		<ul v-if="dailyRecommend.length" class="daily-list">
			<li class="item" v-for="(item, index) in dailyRecommend" :key="item.id"  @click="playIndexSong(songListDetail.trackIds[index].id,index, songListDetail.tracks)">
				<div class="cover">
					<img v-lazy="item.album.picUrl" alt="">
				</div>
				<div class="info">
					<div class="name">
						{{item.name}}
					</div>
					<div class="singer">
						<!-- TODO 也许可以加个时间 filter? -->
						{{item.artists[0].name}}
					</div>
				</div>
			</li>
		</ul>
		<mini-player v-show="playType === 1"></mini-player>
		<mini-FM v-show="playType === 2"></mini-FM>		
	</div>
</template>

<script>
import commonHeader from '@/base/common-header/common-header'
import miniPlayer from '@/base/mini-player/mini-player'
import miniFM from '@/base/mini-FM/mini-FM'
import playAll from '@/base/play-all/play-all'
import loading from '@/base/loading/loading'

export default {
	components: {
		'common-header': commonHeader,
		'mini-player': miniPlayer,
		'mini-FM': miniFM,
		'play-all': playAll,
		loading,
	},
	computed: {
		playType(){
			return this.$store.state.playType
		},
		isLoading(){
			return this.$store.state.isLoading
		},
		isLogin(){
			return this.$store.state.isLogin
		},
		player(){
			return document.getElementById("player")
		},
		// 偷图片
		recommendMV(){
			return this.$store.state.recommendMV
		},
		dailyRecommend(){
			return this.$store.state.dailyRecommend
		},
		// 妈的数据格式不一样... 手动转换...
		songListDetail(){
			if(this.dailyRecommend){
				let trackIds = []
				for(let i of this.dailyRecommend){
					trackIds.push({id: i.id})
				}
				let tracks = []
				for(let j of this.dailyRecommend){
					tracks.push({
						al: {
							picUrl: j.album.picUrl
						},
						ar: [
							{name: j.artists[0].name}
						],
						name: j.name,
						id: j.id
					}) 
				}
				return {
					tracks: tracks,
					trackIds: trackIds
				}
			}
		}
	},
	methods: {
		playSong(trackIds, tracks){
			let id = trackIds[0].id,
			index = 0
			if(this.playMode === 2) {
				index = Math.round(Math.random() * tracks.length)
				id = tracks[index].id
			}
			// 设置为歌单模式
			this.$store.commit('setPlayType', 1)	
			this.player.pause()
			this.$store.commit('setIsPlay', false)
			this.$store.dispatch('getSongUrl',id)
			this.$store.commit('setPlayingList',tracks)
			this.$store.commit('setCurrentSongIndex',index)
			this.$store.commit('setIsPlay', true)
		},
		playIndexSong(id, index, tracks){
			this.player.pause()
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
		if(this.$store.state.isLogin) this.$store.dispatch('getDailyRecommend')
		else if(this.dailyRecommend) return
		else this.$router.push('login')
	},
	deactivated () {
		this.$store.commit('setIsLoading', false)
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"

	.daily-recommend
		background-color $list-background
		min-height 100vh
		color white
		.banner
			img 
				width 100%
		.daily-list
			padding-bottom 48px
			.item
				display flex
				padding 0 10px
				.cover
					flex 0 0 50px
					height 50px
					margin-bottom: 4px
					img 
						width 100%
						height 100%
				.info
					flex 1
					margin-left 10px
					padding-top 5px
					border-1px()
					.name
						song-name()
					.singer
						default-singer()
</style>
