<template>
	<div class="my-profile">
		<loading v-show="isLoading">梦想涌动的声音</loading>
		<div class="top" v-if="myInfo.profile" :style="'background-image:url(' +  myInfo.profile.backgroundUrl + ')'">
			<common-header>我的资料</common-header>
			<div class="avatar"><img v-lazy="myInfo.profile.avatarUrl" alt=""></div>
			<div class="name">{{myInfo.profile.nickname}}</div>
			<div to="/login" class="logout" @click="logout()">退出登录</div>
		</div>
		<div class="my-list">
			<ul class="lists">
				<comment-title>创建的歌单</comment-title>
				<router-link :to="'/song-details/' + item.id" class="item" v-for="item in myPlaylist" :key="item.trackNumberUpdateTime" v-if="item.userId === myId">
					<div class="cover"><img v-lazy="item.coverImgUrl" alt=""></div>
					<div class="info">
						<span class="name">{{item.name}}</span>
						<span class="count">{{item.trackCount}}首, 播放{{item.playCount}}次</span>
					</div>
				</router-link>
				<comment-title>收藏的歌单</comment-title>
				<li class="item" v-for="item in myPlaylist" :key="item.trackNumberUpdateTime" v-if="item.userId !== myId">
					<div class="cover"><img v-lazy="item.coverImgUrl" alt=""></div>
					<div class="info">
						<span class="name">{{item.name}}</span>
						<span class="count">{{item.trackCount}}首, 播放{{item.playCount}}次</span>
					</div>
				</li>
			</ul>
		</div>
		<mini-player v-show="playType === 1"></mini-player>
		<mini-FM v-show="playType === 2"></mini-FM>		
	</div>
</template>

<script>
import commentTitle from '@/base/comment-title/comment-title'
import miniPlayer from '@/base/mini-player/mini-player'
import miniFM from '@/base/mini-FM/mini-FM'
import loading from '@/base/loading/loading'
import commonHeader from '@/base/common-header/common-header'

export default {
	components: {
		loading,
		'comment-title': commentTitle,
		'common-header': commonHeader,
		'mini-player': miniPlayer,
		'mini-FM': miniFM,
	},
	computed: {
		playType(){
			return this.$store.state.playType
		},
		isLoading(){
			return this.$store.state.isLoading
		},
		myId(){
			return this.$store.getters.myId
		},
		myInfo(){
			return this.$store.state.myInfo
		},
		myPlaylist(){
			return this.$store.state.myPlaylist
		}
	},
	methods: {
		logout(){
			// 退出暂停歌曲
			this.$store.commit('setIsPlay', {})
			// 删除现在在播放的歌单
			this.$store.commit('setPlayingList', {})
			// 删除个人信息的歌单
			this.$store.commit('setMyPlaylist', {})
			// 删除我喜欢的歌单
			localStorage.removeItem('myPlaylist')			
			localStorage.removeItem('myInfo')
			this.$store.commit('setIsLogin', false)
			console.log(localStorage)
			this.$router.push('/login')
		},
	},
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
	.my-profile
		.top
			height 300px
			position relative
			background-size cover
			color white		
			dark-cover()
			.avatar
				position absolute
				top 30%
				middleX()
				border-radius 50%
				overflow hidden
				width 70px
				height 70px
				img 
					width 100%
			.name
				position absolute
				top 60%
				middleX()
			.logout
				position absolute
				top 70%
				middleX()
				border 1px solid rgba(255, 255, 255, 0.6)
				padding 6px 14px
				font-size 14px
		.my-list
			padding-bottom 48px
			.lists
				.item
					display flex
					padding 0 10px
					background-color $list-background
					.cover
						flex 0 0 50px
						height 50px
						margin-bottom: 4px
						img 
							width 100%
							height 100%
					.info
						flex 1
						display flex
						flex-direction: column
						justify-content: space-around
						margin-left 10px
						border-1px()
						.name
							song-name()
						.count
							default-singer()
						

</style>
