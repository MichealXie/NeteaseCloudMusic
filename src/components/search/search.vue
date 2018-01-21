<template>
	<div class="search">
		<loading v-show="isSearching"></loading>
		<div class="search-header">
			<i class="fa fa-microphone" aria-hidden="true"></i>
			<router-link class="router-link" to="/search">
				<input v-model.lazy="keywords" type="text" placeholder="搜索音乐,歌词,电台" ref="search-input">
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
		<div class="default" v-show="!keywords">
			<span class="title"> 热门搜索 </span>
			<ul class="suggestion">
				<li class="item" v-for="song in suggestion" @click="bingKeywords(song)">
					{{song}}
				</li>				
			</ul>
			<ul class="history" v-if="searchHistory">
				<li class="item" v-for="item in searchHistory">
					<span class="word" @click="bingKeywords(item)">{{item}}</span>
					<span class="close" @click="deleteHistory(item)"><i class="fa fa-times" aria-hidden="true"></i></span>
				</li>
			</ul>
		</div>
		<div class="result" v-show="keywords">
			<ul class="songs" v-show="type === 1">
				<li class="item" v-for="(item,index) in searchResult.songs" :key="item.id" @click="playSong(item, index, searchResult.songs)">
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
			suggestion: [
				'Ed sherran',
				'男孩别哭',
				'你被我写在歌里',
				'Sad Season',
				'好妹妹乐队',
				'Isaac Gracie',
				'袁维娅',
				'Maroon 5',
				'Lorde',
				'窦靖童',
				'Fun',
				'谢春花'
			],
			searchHistory: JSON.parse(localStorage.searchHistory)
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
		},
		playSong(item, index, tracks){
			this.$store.commit('setIsPlay', false)
			this.$store.dispatch('getSongUrl',item.id)
			this.$store.commit('setCurrentSongIndex',index)
			this.$store.commit('setSearchSongs',tracks)
			this.$store.commit('setIsPlay', true)
		},
		deleteHistory(item){
			console.log(item);
			
			let searchHistory = this.searchHistory
			let index = searchHistory.indexOf(item)
			if(index >= 0){
				searchHistory.splice(index, 1)
				localStorage.searchHistory = JSON.stringify(searchHistory)
			}
		},
		refreshHistory(){
			this.searchHistory = JSON.parse(localStorage.searchHistory)
		}
	},
	activated () {
		this.keywords = ''
		// this.$refs.searchInput.focus()
	},
	watch: {
		keywords: function(newVal,oldVal){
			if(newVal){
				// 搜索
				this.selectType()
				// 搜索历史
				let searchHistory = this.searchHistory
				// 如果还没有历史, 那么创造一个
				if(!searchHistory) searchHistory = [newVal]
				// 有历史, 且搜索是新的, 那就 push 
				else if(!searchHistory.includes(newVal)) searchHistory.unshift(newVal)
				// 最后再储存到 local 里
				localStorage.searchHistory = JSON.stringify(searchHistory)
			}
		},
	}
}
</script>

<style lang='stylus'>
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
	@import "./search.styl"
	

</style>
