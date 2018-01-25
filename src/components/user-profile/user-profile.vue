<template>
	<div class="user-profile">
		<loading v-show="isLoading">(๑•̀ㅂ•́)و</loading>
		<div class="top" v-if="userProfile.profile" :style="'background-image:url(' +  userProfile.profile.backgroundUrl + ')'">
			<common-header>{{userProfile.profile.nickname}}的资料</common-header>
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
		<mini-player v-show="playType === 1"></mini-player>
		<mini-FM v-show="playType === 2"></mini-FM>		
	</div>
</template>

<script>
import commentTitle from '@/base/comment-title/comment-title'
import miniPlayer from '@/base/mini-player/mini-player'
import commonHeader from '@/base/common-header/common-header'
import miniFM from '@/base/mini-FM/mini-FM'
import loading from '@/base/loading/loading'

export default {
	components: {
		'comment-title': commentTitle,
		'common-header': commonHeader,
		'mini-player': miniPlayer,
		'mini-FM': miniFM,
		loading,
	},
	data () {
		return {
			userID: this.$route.params.id
		}
	},
	computed: {
		playType(){
			return this.$store.state.playType
		},
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
		
	},
	activated () {
		console.log(' 这里是用户信息');
		console.log(this.$route.params.id);
		console.log(this.userID);
		if(this.$route.params.id !== this.userID){
			this.userID = this.$route.params.id
			this.$store.dispatch('getUserProfile', this.$route.params.id)
		}
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
