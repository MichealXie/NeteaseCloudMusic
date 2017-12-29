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
				<h3 class="title" @click="showList()">推荐歌单
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
		<song-list v-if="listShow" :topList="topList" @emitSelectedId="showplayList"></song-list>
		<playlist v-if="playlistShow" :id="id"></playlist>
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
			banners: [],
			topList:[],
			listShow: false,
			id: "",
			playlistShow: false
		}
	},
	computed: {
		partlyList(){
			return this.topList.slice(0,6)
		},
	},
	methods:{
		showList(){
			this.listShow = !this.listShow
		},
		showplayList(id){
			console.log('showplayList')
			this.playlistShow = true
			this.id = id
		}
	},
	created () {
		//获取轮播图片
		this.$http.get('http://localhost:3000/banner')
		.then( (data) => {
			console.log(data)
			this.banners = data.data.banners
		})
		//获取推荐歌单
		this.$http.get(' https://easy-mock.com/mock/5a464f96f0010a43ffbe743e/cloudmusic/top/playlist')
		.then( (data) => {
			console.log(data.data)
			this.topList = data.data.playlists
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
