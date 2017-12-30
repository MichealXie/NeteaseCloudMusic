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
				<h3 class="title" @click="toggleTopListsShow()">推荐歌单
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</h3>
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
		</div>
		<top-lists v-if="isTopListsShow"></top-lists>
		<playlist v-if="isPlayListShow"></playlist>
	</div>
</template>

<script>
import slider from '@/base/slider/slider'
import topLists from '@/components/top-lists/top-lists'
import playlist from '@/components/playlist/playlist'

export default {
	components: {
		slider,
		'top-lists':topLists,
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
		isTopListsShow(){
			return this.$store.state.isTopListsShow
		},
		isPlayListShow(){
			return this.$store.state.isPlayListShow
		}
	},
	methods:{
		toggleTopListsShow(){
			this.$store.commit('toggleTopListsShow')
		},
		commitIdAndShow(id){
			console.log(id)
		}
	},
	created () {
		//获取轮播图片
		this.$store.dispatch('getBanners')
		//获取推荐歌单
		this.$store.dispatch('getTopLists')
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
