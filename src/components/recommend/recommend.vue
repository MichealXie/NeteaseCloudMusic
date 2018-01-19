<template>
	<div class="recommend">
		<loading v-show="!banners.length"></loading>
		<div class="recommend-content">
			<slider></slider>
			<div class="top-list">
				<app-title>推荐歌单</app-title>
				<ul>
					<router-link :to="'/song-details/' + item.id" class="top-item" v-for="item in partlyList" :key="item.id" @click="passAndGetList(item.id)">
						<img :src="item.coverImgUrl">
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
						<img class="private-img" v-lazy="item.sPicUrl">
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
							<img class="img" v-lazy="item.picUrl">
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
								<img class="img" v-lazy="item.picUrl">
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
		banners(){
			return this.$store.state.banners
		},
		partlyList(){
			return this.$store.getters.partlyList
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
		//获取轮播图片
		this.$store.dispatch('getBanners')
		//获取推荐歌单
		this.$store.dispatch('getTopLists')
		//获取独家放送
		this.$store.dispatch('getPrivateContent')
		//获取推荐 MV
		this.$store.dispatch('getRecommendMV')
		//获取推荐电台
		this.$store.dispatch('getRecommendDJ')

	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
.recommend
	padding-bottom 48px
	.slider-img
		width 375px
	.slider-wrapper
		padding-top 88px
	.top-list
		background $list-background
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
		background $list-background
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
				.private-img
					width 100%
				.private-name
					default-font()
				i
					position absolute
					top 5px
					left 5px
					color $not-important
					font-size 22px
		.private-ad
			width 100%
			img 
				width 100%
			p
				default-font()
	.recommend-mv
		background $list-background
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
					width 100%
				.name
					default-font()
					no-wrap()
				.singer
					color: $not-important
					padding 0 8px
				.mv-info
					position absolute
					top 5px
					right 5px
					color white
	.djs
		background $list-background
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
				img 
					width 100%
				.info
					position absolute
					bottom 5px
					left 5px
					color white
					font-size $font-size-small-s
					width 100%
					no-wrap()
			.name
				default-font()
					



						
</style>
