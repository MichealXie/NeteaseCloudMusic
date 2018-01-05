<template>
	<div class="search">
		<loading v-show="isSearching"></loading>
		<div class="search-header">
			<i class="fa fa-microphone" aria-hidden="true"></i>
			<router-link class="router-link" to="/search">
				<input v-model.lazy="keywords" type="text" placeholder="搜索音乐,歌词,电台">
			</router-link>
			<!-- TODO 变换层, 取消或搜索 -->
			<div class="goback" @click="goback()">取消</div>
		</div>
		<div class="search-tab"  v-show="keywords">
			<div class="song" :class="{'active': type === 1}" @click="selectType(1,'songs')">单曲</div>
			<div class="album" :class="{'active': type === 10}" @click="selectType(10,'albums')">专辑</div>
			<div class="singer" :class="{'active': type === 100}" @click="selectType(100,'artists')">歌手</div>
			<div class="songlist" :class="{'active': type === 1000}" @click="selectType(1000,'playlists')">歌单</div>
			<div class="user" :class="{'active': type === 1002}" @click="selectType(1002,'userprofiles')">用户</div>
		</div>
		<div class="suggestion" v-show="!keywords">
			<span class="title"> 热门搜索 </span>
			<ul>
				<li class="item" v-for="song in hotTop3" :key="song.id" @click="bingKeywords(song.name)">
					{{song.name}}
				</li>				
				<li class="item" v-for="singer in originalTop3" :key="singer.id" @click="bingKeywords(singer.ar[0].name)">
					{{singer.ar[0].name}}
				</li>
				<li class="item" v-for="singer in newTop3" :key="singer.id" @click="bingKeywords(singer.ar[0].name)">
					{{singer.ar[0].name}}
				</li>
			</ul>
			<!-- TODO 可以加一个搜索历史(体力活) -->
		</div>
		<div class="result" v-show="keywords">
			<ul class="songs" v-show="type === 1">
				<li v-for="item in searchResult.songs" :key="item.id">
					<div class="info">
						<div class="name">
							{{item.name}}
						</div>
						<div class="singer">
							{{item.artists[0].name}} - {{item.album.name}}
						</div>
					</div>
				</li>
			</ul>
			<ul class="albums" v-show="type === 10">
				<router-link class="item" :to="'album/' + item.id" v-for="item in searchResult.albums" :key="item.id">
					<div class="cover">
						<img v-lazy="item.picUrl" alt="">
					</div>
					<div class="info">
						<div class="name">
							{{item.name}}
						</div>
						<div class="singer">
							<!-- TODO 也许可以加个时间 filter? -->
							{{item.artist.name}}
						</div>
					</div>
				</router-link>
			</ul>
			<ul class="artists" v-show="type === 100">
				<li v-for="item in searchResult.artists" :key="item.id">
					<div class="cover">
						<img v-lazy="item.img1v1Url" alt="">
					</div>
					<div class="name">
						<!-- TODO 翻译名字也可以写出来 -->
						{{item.name}}
					</div>
				</li>
			</ul>
			<ul class="playlists" v-show="type === 1000">
				<router-link :to="'/song-details/' + item.id" class="item" v-for="item in searchResult.playlists" :key="item.id">
					<div class="cover">
						<img v-lazy="item.coverImgUrl" alt="">
					</div>
					<div class="info">
						<span class="name">{{item.name}}</span>
						<span class="more">{{item.trackCount}}首 by {{item.creator.nickname}}, 播放{{item.playCount | playcount}}次</span>
					</div>
				</router-link>
			</ul>
			<ul class="userprofiles" v-show="type === 1002">
				<li v-for="item in searchResult.userprofiles" :key="item.id">
					<div class="cover">
						<img v-lazy="item.avatarUrl" alt="">
					</div>
					<div class="info">
						<div class="name">
							{{item.nickname}} <i class="fa" :class="{'fa-venus': item.gender === 0, 'fa-mars': item.gender === 1}" aria-hidden="true"></i>
						</div>
						<div class="signature">{{item.signature}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import loading from '@/base/loading/loading'

export default {
	components: {
		loading,
	},
	data () {
		return {
			type: 1,
			keywords: '',
			name: 'songs',
		}
	},
	computed: {
		searchResult(){
			return this.$store.state.searchResult
		},
		searchOption(){
			return {
				type: this.type,
				keywords: this.keywords,
				name: this.name
			}
		},
		isSearching(){
			return this.$store.state.isSearching
		},
		hotTop3(){
			return this.$store.getters.hotTop3
		},
		originalTop3(){
			return this.$store.getters.originalTop3
		},
		newTop3(){
			return this.$store.getters.newTop3
		},
	},
	methods: {
		goback(){
			history.back()
		},
		selectType(type,name){
			if(type) this.type = type
			if(name) this.name = name
			if(this.keywords) this.$store.dispatch('getSongSearch',this.searchOption)
		},
		bingKeywords(val){
			this.keywords = val
			this.selectType()
		}
	},
	watch: {
		keywords: function(newVal,oldVal){
			if(newVal) this.selectType()
		},
	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
	@import "./search.styl"
	

</style>
