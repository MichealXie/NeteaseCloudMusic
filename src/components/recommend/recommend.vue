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
					</li>
				</ul>
				<div class="private-ad">
					<!-- 很奇怪这里的 ad 要加v-if, 不加会报错, 但没有任何影响 -->
					<a :href="privateAd.url" v-if="privateAd">
						<img :src="privateAd.picUrl">
						<p>{{privateAd.name}}</p>
					</a>
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
					font-size $font-size-small
	.private-content
		.partly-private
			display flex
			.private-item
				width 50%
				box-sizing border-bo
				font-size $font-size-small
				//奇怪的处理方法
				&:nth-child(odd)
					padding-right 1px
				&:nth-child(even)
					padding-left 1px
				a
					default-font()
					.private-img
						width 100%
		.private-ad
			width 100%
			a
				img 
					width 100%
				p
					default-font()


						
</style>
