<template>
	<div class="recommend">
		<div class="recommend-content">
			<div class="slider-wrapper">
				<slider v-if="banners[1]">
					<div v-for="item in banners">
						<a :href="item.url">
							<img :src="item.pic">
						</a>
					</div>
				</slider>
			</div>
			<div class="top-list">
				<h3 class="title" @click="toggleTopList()">推荐歌单
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</h3>
				<ul>
					<li class="top-item" v-for="item in partlyList">
						<img :src="item.coverImgUrl">
						<span class="count">
							<i class="fa fa-music" aria-hidden="true"></i>
							{{ item.playCount }}</span>
						<div class="name">{{item.name}}</div>
					</li>
				</ul>
			</div>
		</div>
		<song-list v-if="isTopListShow"></song-list>
		<playlist v-if="isPlayListShow"></playlist>
	</div>
</template>

<script>
import slider from '@/base/slider/slider'
import songList from '@/components/song-list/song-list'
import playlist from '@/components/playlist/playlist'

export default {
	components: {
		slider,
		'song-list':songList,
		'playlist': playlist
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
		isTopListShow(){
			return this.$store.state.isTopListShow
		},
		isPlayListShow(){
			return this.$store.state.isPlayListShow
		}
	},
	methods:{
		toggleTopList(){
			this.$store.commit('toggleTopListShow')
		}
	},
	created () {
		//获取轮播图片
		this.$store.dispatch('getBanners')
		//获取推荐歌单
		this.$store.dispatch('getTopList')
	}
}
</script>

<style lang='stylus'>
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
</style>
