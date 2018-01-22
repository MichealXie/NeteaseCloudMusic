<template>
	<div class="user-profile">
		<loading v-show="isLoading"></loading>
		<mini-player></mini-player>
		<div class="top" v-if="userProfile.profile" :style="'background-image:url(' +  userProfile.profile.backgroundUrl + ')'">
			<div class="header">
				<div class="back" @click="goBack()"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
				<div class="title">{{userProfile.profile.nickname}}的资料</div>
				<router-link to="/player" class="player">
					<i class="fa fa-headphones" aria-hidden="true"></i>
				</router-link>
			</div>
			<div class="avatar" v-if="userProfile.profile" ><img v-lazy="userProfile.profile.avatarUrl" alt=""></div>
			<div class="name">{{userProfile.profile.nickname}}</div>
		</div>
		<div class="user-list">
			<ul class="lists">
				<comment-title>他的歌单</comment-title>
				<router-link :to="'/song-details/' + item.id" class="item" v-for="item in userPlaylist" :key="item.trackNumberUpdateTime" v-if="item.userId === userProfile.profile.userId">
					<div class="cover"><img v-lazy="item.coverImgUrl" alt=""></div>
					<div class="info">
						<span class="name">{{item.name}}</span>
						<span class="count">{{item.trackCount}}首, 播放{{item.playCount}}次</span>
					</div>
				</router-link>
				<comment-title>收藏的歌单</comment-title>
				<li class="item" v-for="item in userPlaylist" :key="item.trackNumberUpdateTime" v-if="item.userId !== userProfile.profile.userId">
					<div class="cover"><img v-lazy="item.coverImgUrl" alt=""></div>
					<div class="info">
						<span class="name">{{item.name}}</span>
						<span class="count">{{item.trackCount}}首, 播放{{item.playCount}}次</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import commentTitle from '@/base/comment-title/comment-title'
import miniPlayer from '@/base/mini-player/mini-player'
import loading from '@/base/loading/loading'

export default {
	components: {
		'comment-title': commentTitle,
		'mini-player': miniPlayer,
		loading,
	},
	computed: {
		isLoading(){
			return this.$store.state.isLoading
		},
		userProfile(){
			return this.$store.state.userProfile
		},
		userPlaylist(){
			return this.$store.state.userPlaylist
		}
	},
	methods: {
		goBack(){
			this.$router.go(-1)
		},
	},
	activated () {
		this.$store.dispatch('getUserProfile', this.$route.params.id)
	},
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
	.user-profile
		.top
			height 300px
			position relative
			background-size cover
			color white		
			dark-cover()
			.header
				position fixed
				top 0 
				width 100%
				height 48px
				display flex
				align-items center
				background-color rgba(255, 255, 255, 0.1)
				z-index 2
				.back, .player
					flex 0 0 56px
					flex-center()
					font-size 30px
					color white
				.player
					font-size 24px
				.title
					flex  1
					text-align center 
					font-size 16px
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
		.user-list
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
