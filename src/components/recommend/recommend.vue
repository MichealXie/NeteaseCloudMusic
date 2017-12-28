<template>
	<div class="recommend">
		<div class="recommend-content">
			<div class="slider-wrapper">
				<slider v-if="recommendList[1]">
					<div v-for="item in recommendList">
						<a :href="item.url">
							<img :src="item.pic">
						</a>
					</div>
				</slider>
			</div>
			<div class="top-list">
				<h3 class="title">推荐歌单
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</h3>
				<ul>
					<li class="top-item" v-for="item in topList">
						<img :src="item.coverImgUrl">
						<span class="count">
							<i class="fa fa-music" aria-hidden="true"></i>
							{{ item.playCount }}</span>
						<div class="name">{{item.name}}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import slider from '@/base/slider/slider'

export default {
	components: {
		slider,
	},
	data () {
		return {
			recommendList: [],
			topList:[]
		}
	},
	created () {
		//获取轮播图片
		this.$http.get('http://localhost:3000/banner')
		.then( (data) => {
			console.log(data)
			this.recommendList = data.data.banners
		})
		//获取推荐歌单
		this.$http.get('http://localhost:3000/top/playlist')
		.then( (data) => {
			console.log(data.data)
			this.topList = data.data.playlists.slice(0,6)
		})
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
