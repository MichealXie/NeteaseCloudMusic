<template>
	<div class="user-info">
		<div class="top" :style="'background-image:url(' +  userInfo.profile.backgroundUrl + ')'">
			<div class="back" @click="goBack()"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
			<router-link to="/home/recommend" class="home">
				<i class="fa fa-home" aria-hidden="true"></i>
			</router-link>
			<div class="avatar"><img :src="userInfo.profile.avatarUrl" alt=""></div>
			<div class="name">{{userInfo.profile.nickname}}</div>
		</div>
		<div class="my-list">
			<ul class="lists">
				<div class="title">我的歌单</div>
				<router-link :to="'/song-details/' + item.id" class="item" v-for="item in userPlaylist" :key="item.trackNumberUpdateTime" v-if="item.userId === userID">
					<div class="cover"><img :src="item.coverImgUrl" alt=""></div>
					<div class="info">
						<span class="name">{{item.name}}</span>
						<span class="count">{{item.trackCount}}首, 播放{{item.playCount}}次</span>
					</div>
				</router-link>
				<div class="title">收藏的歌单</div>
				<li class="item" v-for="item in userPlaylist" :key="item.trackNumberUpdateTime" v-if="item.userId !== userID">
					<div class="cover"><img :src="item.coverImgUrl" alt=""></div>
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
export default {
	computed: {
		userID(){
			return this.$store.getters.userID
		},
		userInfo(){
			return this.$store.state.userInfo
		},
		userPlaylist(){
			return this.$store.state.userPlaylist
		}
	},
	methods: {
		goBack(){
			this.$router.go(-1)
		}
	},
	created () {
		this.$store.dispatch('getUserPlaylist')
	}
}
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"
	.user-info
		.top
			height 300px
			position relative
			background-size cover
			color white		
			dark-cover()
			.back
				position fixed
				left 10px
				top 5px
				font-size 30px
			.home
				position fixed
				right 10px
				top 5px
				font-size 24px
				color white
			.avatar
				position absolute
				top 30%
				left 50%
				transform translateX(-50%)
				border-radius 50%
				overflow hidden
				width 70px
				height 70px
				img 
					width 100%
			.name
				position absolute
				top 60%
				left 50%
				transform translateX(-50%)
		.my-list
			.lists
				.title
					height 20px
					font-size 12px
					color black
					padding 0 10px
					background-color lightgrey
					display flex
					align-items center
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
