<template>
	<div class="recommend">
		<div class="recommend-content">
			<div class="slider-wrapper">
				<slider v-if="banners[1]">
					<div v-for="item in banners" :key="item.key">
						<a :href="item.url">
							<img :src="item.pic">
						</a>
					</div>
				</slider>
			</div>
			<div class="top-list">
				<app-title @click="toggleTopListsShow()">推荐歌单</app-title>
				<ul>
					<li class="top-item" v-for="item in partlyList" :key="item.id" @click="commitIdAndShow(item.id)">
						<img :src="item.coverImgUrl">
						<span class="count">
							<i class="fa fa-music" aria-hidden="true"></i>
							{{ item.playCount }}</span>
						<div class="name">{{item.name}}</div>
					</li>
				</ul>
			</div>
			<div class="private-content" v-if="privateContent">
				<app-title>独家放送</app-title>
				<ul class="partly-private">
					<li class="private-item" v-for="item in partlyPrivate" :key="item.id">
						<!-- url 有问题, 是个 id -->
						<a :href="item.url">
							<img class="private-img" :src="item.sPicUrl">
							<p class="private-name">{{item.name}}</p>
						</a>
						<i class="fa fa-play-circle-o" aria-hidden="true"></i>
					</li>
				</ul>
				<div class="private-ad">
					<!-- 很奇怪这里的 ad 要加v-if, 不加会报错, 但没有任何影响 -->
					<a :href="privateAd.url" v-if="privateAd">
						<img :src="privateAd.picUrl">
						<p>{{privateAd.name}}</p>
					</a>
				</div>
				<div class="recommend-mv">
					<app-title>推荐 MV</app-title>
					<ul class="mvs">
						<li class="mv" v-for="item in recommendMV" :key="item.id">
							<img class="img" :src="item.picUrl">
							<p class="name"> {{item.name}}</p>
							<p class="singer"> {{item.artists[0].name}}</p>
							<div class="mv-info">
								<i class="fa fa-video-camera" aria-hidden="true"></i>
								{{item.playCount}}
							</div>
						</li>
					</ul>
				</div>
				<div class="recommend-DJ">
					<app-title>推荐电台</app-title>
					<ul class="djs">
						<li class="dj" v-for="item in recommendDJ" :key="item.id">
							<div class="img-ct">
								<img class="img" :src="item.picUrl">
								<p class="info"> {{item.copywriter}}</p>
							</div>
							<p class="name">{{item.name}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<top-lists v-if="isTopListsShow"></top-lists>
		<playlist v-if="isPlayListShow"></playlist>
	</div>
</template>

<script>
import slider from '@/base/slider/slider'
import topLists from '@/components/top-lists/top-lists'
import playlist from '@/components/playlist/playlist'
import appTitle from '@/components/app-title/app-title'
//万一有点用呢...
import recommendMV from '@/components/recommend-mv/recommend-mv'

export default {
	components: {
		slider,
		'top-lists':topLists,
		'playlist': playlist,
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
		isTopListsShow(){
			return this.$store.state.isTopListsShow
		},
		isPlayListShow(){
			return this.$store.state.isPlayListShow
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
		toggleTopListsShow(){
			this.$store.commit('toggleTopListsShow')
		},
		commitIdAndShow(id){
			this.$store.commit('togglePlayListShow', id)
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

	.top-list
		ul
			display flex
			flex-wrap wrap
			li.top-item
				width 33.33%
				position relative
				box-sizing border-box
				padding-right 2px
				margin-bottom 1rem
				&:nth-child(3n)
					padding 0
				img 
					width 100%
				.count
					position absolute
					right .3rem
					top .2rem
					font-size 10px
					color white
				.name
					default-font()
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
				a
					.private-img
						width 100%
					.private-name
						default-font()
				i
					position absolute
					top .2rem
					left .3rem
					color $not-important
					font-size 1.2rem
		.private-ad
			width 100%
			a
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
					width 100%
				.name
					default-font()
					no-wrap()
				.singer
					color: $not-important
					padding 0 .4rem
				.mv-info
					position absolute
					top .2rem
					right .3rem
					color white
	.djs
			display flex
			flex-wrap wrap
			.dj
				width 33.33%
				position relative
				box-sizing border-box
				padding-right 2px
				margin-bottom 1rem
				&:nth-child(3n)
					padding 0
				.img-ct
					position relative
					img 
						width 100%
					.info
						position absolute
						bottom .3rem
						left .2rem
						color white
						font-size $font-size-small-s
						no-wrap()
				.name
					default-font()
					



						
</style>
