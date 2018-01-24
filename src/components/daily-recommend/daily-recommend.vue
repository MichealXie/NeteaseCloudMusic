<template>
	<div class="daily-recommend">
		<common-header>每日推荐</common-header>
		<div class="play-all" @click="playSong(songListDetail.trackIds, songListDetail.tracks)">
			<i class="fa fa-play-circle-o" aria-hidden="true"></i>
			<div class="play">
				播放全部
				<span class="count">(共20首)</span>
			</div>
		</div>
		<ul v-if="dailyRecommend.length">
			<li class="item" v-for="item in dailyRecommend" :key="item.id">
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
	</div>
</template>

<script>
import commonHeader from '@/base/common-header/common-header'

export default {
	components: {
		'common-header': commonHeader,
	},
	computed: {
		isLogin(){
			return this.$store.state.isLogin
		},
		dailyRecommend(){
			return this.$store.state.dailyRecommend
		},
		// 妈的数据格式不一样...
		songListDetail(){
			if(this.dailyRecommend){
				let trackIds = []
				for(let i of this.dailyRecommend){
					trackIds.push({id: i.id})
				}
				return {
					tracks:this.dailyRecommend,
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
	},
	created () {
		if(this.$store.state.isLogin) this.$store.dispatch('getDailyRecommend')
		else this.$router.push('login')
	}
}
</script>

<style lang="stylus">
				.play-all
					display flex
					.fa
						flex 0 0 40px
						height 50px
						font-size 24px
						color $not-important
						flex-center()
					.play
						flex 1
						width calc(100% - 80px)
						border-1px()
						display flex
						align-items center
						.count
							default-singer()
</style>
