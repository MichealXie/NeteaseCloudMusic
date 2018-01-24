<template>
	<div class="recommend">
		<loading v-show="isLoading"></loading>
		<div class="recommend-content">
			<slider></slider>
			<div class="personal">
				<router-link to="/personal-fm" class="item">
					<div class="icon fa-stack">
						<i class="fa fa-heartbeat" aria-hidden="true"></i>
					</div>
					<div class="title">私人 FM</div>
				</router-link>
				<router-link to="/daily-recommend" class="item">
					<div class="icon fa-stack">
						<i class="fa fa-calendar-o" aria-hidden="true"></i>
					</div>
					<div class="title">每日推荐</div>
				</router-link>
				<div class="item">
					<router-link to="/daily-recommend" class="icon fa-stack">
						<i class="fa fa-list-ul" aria-hidden="true"></i>
					</router-link>
					<div class="title">推荐歌单</div>
				</div>
				<router-link to="/daily-recommend" class="item">
					<div class="icon fa-stack">
						<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
					</div>
					<div class="title">排行榜</div>
				</router-link>
			</div>
			<div class="top-list" ref="top-list">
				<app-title>推荐歌单</app-title>
				<ul>
					<router-link :to="'/song-details/' + item.id" class="top-item" v-for="item in topLists" :key="item.id" @click="passAndGetList(item.id)">
						<div class="img"><img v-lazy="item.coverImgUrl"></div>
						<span class="count">
							<i class="fa fa-music" aria-hidden="true"></i>
							{{ item.playCount | playcount}}</span>
						<div class="name">{{item.name}}</div>
					</router-link>
				</ul>
			</div>
			<div class="private-content" v-if="privateContent">
				<app-title>独家放送</app-title>
				<ul class="partly-private">
					<li class="private-item" v-for="item in partlyPrivate" :key="item.id">
						<div class="img"><img v-lazy="item.sPicUrl"></div>
						<p class="private-name">{{item.name}}</p>
						<i class="fa fa-play-circle-o" aria-hidden="true"></i>
					</li>
				</ul>
				<a :href="privateContent[0].url" class="private-ad" v-if="Object.keys(privateContent).length">
					<img v-lazy="privateContent[0].picUrl">
					<p>{{privateContent[0].name}}</p>
				</a>
			</div>				
				<div class="recommend-mv">
					<app-title>推荐 MV</app-title>
					<ul class="mvs">
						<li class="mv" v-for="item in recommendMV" :key="item.id">
							<div class="img"><img v-lazy="item.picUrl"></div>
							<p class="name"> {{item.name}}</p>
							<p class="singer"> {{item.artists[0].name}}</p>
							<div class="mv-info">
								<i class="fa fa-video-camera" aria-hidden="true"></i>
								{{item.playCount | playcount}}
							</div>
						</li>
					</ul>
				</div>
				<div class="recommend-DJ">
					<app-title>推荐电台</app-title>
					<ul class="djs">
						<li class="dj" v-for="item in recommendDJ" :key="item.id">
							<div class="img-ct">
								<div class="img"><img v-lazy="item.picUrl"></div>
								<p class="info"> {{item.copywriter}}</p>
							</div>
							<p class="name">{{item.name}}</p>
						</li>
					</ul>
				</div>
		</div>
	</div>
</template>

<script>
import slider from '@/base/slider/slider'
import loading from '@/base/loading/loading'
import appTitle from '@/components/app-title/app-title'

export default {
	components: {
		slider,
		loading,
		'app-title': appTitle,
	},
	data () {
		return {
			
		}
	},
	computed: {
		isLogin(){
			return this.$store.state.isLogin
		},
		isLoading(){
			return this.$store.state.isLoading
		},
		topLists(){
			return this.$store.state.topLists
		},
		privateContent(){
			return this.$store.state.privateContent
		},
		partlyPrivate(){
			return this.$store.getters.partlyPrivate
		},
		privateAd(){
			return this.$store.getters.privateAd
		},
		recommendMV(){
			return this.$store.state.recommendMV
		},
		recommendDJ(){
			return this.$store.state.recommendDJ
		}
	},
	methods:{
		passAndGetList(id){
			this.$store.commit('passSongList', id)
			this.$store.dispatch('getPlayList')
		}
	},
	created () {
		this.$store.dispatch('getRecommend')
		// 检测是否登录
    if(localStorage.myInfo && !this.isLogin){
      let info = JSON.parse(localStorage.myInfo)
      this.$store.dispatch('login', info)
    }
	},
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
.recommend
	padding-bottom 48px
	min-height calc(100vh - 48px)
	background $list-background
	.personal
		display flex
		height 80px
		border-1px()
		.item
			width 25%
			display flex
			flex-direction column
			justify-content center 
			align-items center
			font-size 20px
			color black
			.icon
				color $color-background
				flex-center()
				border 1px solid 
				border-radius 50%
				width 2em
			.title
				font-size 12px
				padding-top 10px
				text-align center
	.top-list
		ul
			display flex
			flex-wrap wrap
			.top-item
				width 33.33%
				position relative
				box-sizing border-box
				padding-right 2px
				margin-bottom 5px
				&:nth-child(3n)
					padding 0
				.img
					position relative
					gradient-cover()					
					width 100%
					img
						width 100%
				.count
					position absolute
					right 5px
					top 5px
					font-size 10px
					color white
				.name
					default-font()
					no-wrap()
	.private-content
		.partly-private
			display flex
			.private-item
				position relative
				width 50%
				box-sizing border-box
				font-size $font-size-small
				//奇怪的处理方法
				&:nth-child(odd)
					padding-right 1px
				&:nth-child(even)
					padding-left 1px
				.img
					position relative
					gradient-cover()					
					width 100%
					img
						width 100%
				.private-name
					default-font()
				i
					position absolute
					top 5px
					left 5px
					color $not-important
					font-size 22px
					color white
		.private-ad
			width 100%
			img 
				width 100%
			p
				default-font()
	.recommend-mv
		.mvs
			display flex
			flex-wrap wrap
			.mv
				position relative
				width 50%
				box-sizing border-box
				font-size $font-size-small
				//奇怪的处理方法
				&:nth-child(odd)
					padding-right 1px
				&:nth-child(even)
					padding-left 1px
				.img
					position relative
					gradient-cover()					
					width 100%
					img
						width 100%
				.name
					default-font()
					no-wrap()
				.singer
					color: $not-important
					padding 4px 8px
				.mv-info
					position absolute
					top 5px
					right 5px
					color white
	.djs
		display flex
		flex-wrap wrap
		.dj
			width 33.33%
			position relative
			box-sizing border-box
			padding-right 2px
			margin-bottom 10px
			&:nth-child(3n)
				padding 0
			.img-ct
				position relative
				.img
					position relative
					gradient-cover()					
					width 100%
					img
						width 100%
				.info
					position absolute
					bottom 5px
					left 5px
					color white
					font-size $font-size-small-s
					no-wrap()
					width: 90%
			.name
				default-font()
				no-wrap()
					



						
</style>
